#!/usr/bin/env python3
"""Deploy built files to Alibaba Cloud ECS via SSH with password auth."""
import os, sys, subprocess, pty, time

ECS_IP = os.environ.get("ECS_IP", "47.100.86.4")
ECS_USER = os.environ.get("ECS_USER", "root")
PASSWORD = os.environ.get("ECS_PASSWORD", "")
PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))
REMOTE_DIR = "/opt/online-proctoring"

def run_with_password(cmd, timeout=120):
    """Run a command that needs SSH password, using pty to handle prompt."""
    master_fd, slave_fd = pty.openpty()
    proc = subprocess.Popen(
        cmd, shell=True, stdin=slave_fd, stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT, text=True, bufsize=1
    )
    os.close(slave_fd)

    # Wait a bit then send password
    time.sleep(1)
    os.write(master_fd, f"{PASSWORD}\n".encode())
    # Send password a few more times in case of multiple prompts
    for _ in range(3):
        time.sleep(2)
        try:
            os.write(master_fd, f"{PASSWORD}\n".encode())
        except OSError:
            break

    os.close(master_fd)
    output, _ = proc.communicate(timeout=timeout)
    return proc.returncode, output

def run_step(desc, cmd):
    print(f"\n{'='*60}")
    print(f">>> {desc}")
    print(f">>> {cmd}")
    sys.stdout.flush()
    rc, out = run_with_password(cmd)
    print(out)
    if rc != 0:
        print(f"WARNING: exit code {rc}")
    return rc, out

# Step 1: Rsync client dist
rc, _ = run_step("Upload client dist",
    f'rsync -avz --delete {PROJECT_DIR}/client/dist/ {ECS_USER}@{ECS_IP}:{REMOTE_DIR}/client/dist/')

# Step 2: Rsync server dist + package files
rc, _ = run_step("Upload server dist",
    f'rsync -avz --delete {PROJECT_DIR}/server/dist/ {PROJECT_DIR}/server/package.json {PROJECT_DIR}/server/package-lock.json {ECS_USER}@{ECS_IP}:{REMOTE_DIR}/server/')

# Step 3: Rsync nginx.conf and ecosystem.config.js
rc, _ = run_step("Upload config files",
    f'rsync -avz {PROJECT_DIR}/nginx.conf {PROJECT_DIR}/ecosystem.config.js {ECS_USER}@{ECS_IP}:{REMOTE_DIR}/')

# Step 4: Install server dependencies on ECS
rc, _ = run_step("Install server dependencies on ECS",
    f'ssh -o StrictHostKeyChecking=no {ECS_USER}@{ECS_IP} "cd {REMOTE_DIR}/server && npm install --omit=dev"')

# Step 5: Deploy nginx config
rc, _ = run_step("Deploy nginx config",
    f'ssh -o StrictHostKeyChecking=no {ECS_USER}@{ECS_IP} "cp {REMOTE_DIR}/nginx.conf /etc/nginx/conf.d/proctoring.conf && nginx -t && systemctl reload nginx"')

# Step 6: Restart PM2
rc, _ = run_step("Restart PM2",
    f'ssh -o StrictHostKeyChecking=no {ECS_USER}@{ECS_IP} "cd {REMOTE_DIR} && pm2 startOrReload ecosystem.config.js && pm2 save"')

# Step 7: Verify
print(f"\n{'='*60}")
print(">>> Verification")
import time as t; t.sleep(3)
rc, out = run_with_password(
    f'ssh -o StrictHostKeyChecking=no {ECS_USER}@{ECS_IP} "curl -sk https://localhost/api/health && echo OK_HEALTH"',
    timeout=15
)
print(out)
print("\n=== Deploy complete! ===")
print(f"Visit: https://{ECS_IP}")
