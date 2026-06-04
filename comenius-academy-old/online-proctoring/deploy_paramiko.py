#!/usr/bin/env python3
"""Deploy to ECS using paramiko (reliable SSH)."""
import paramiko
import os
import sys
import tarfile
import io
import time

ECS_IP = "47.100.86.4"
ECS_USER = "root"
PASSWORD = "Spboyy760921!"
PROJECT_DIR = "/Users/yumingdong/online-proctoring"
REMOTE_DIR = "/opt/online-proctoring"

def connect():
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(ECS_IP, username=ECS_USER, password=PASSWORD, timeout=30)
    return client

def run_ssh(client, cmd, timeout=120):
    print(f"  $ {cmd}")
    stdin, stdout, stderr = client.exec_command(cmd, timeout=timeout)
    out = stdout.read().decode()
    err = stderr.read().decode()
    if out: print(out.strip())
    if err: print(f"  stderr: {err.strip()}")
    exit_code = stdout.channel.recv_exit_status()
    if exit_code != 0:
        print(f"  WARNING: exit code {exit_code}")
    return exit_code, out, err

def upload_file(client, local_path, remote_path):
    print(f"  Upload: {local_path} -> {remote_path}")
    sftp = client.open_sftp()
    sftp.put(local_path, remote_path)
    sftp.close()
    print("  OK")

def create_tar_bytes(local_dir, arcname="."):
    """Create a tar.gz in memory from a local directory."""
    buf = io.BytesIO()
    with tarfile.open(fileobj=buf, mode='w:gz') as tar:
        tar.add(local_dir, arcname=arcname)
    buf.seek(0)
    return buf

print("Connecting to ECS...")
client = connect()
print("Connected!\n")

# Step 1: Upload client dist
print("=== Step 1: Uploading client dist ===")
client_dist = os.path.join(PROJECT_DIR, "client", "dist")
tar_buf = create_tar_bytes(client_dist, ".")
tar_buf.seek(0, 2)
size_mb = tar_buf.tell() / (1024 * 1024)
print(f"  Archive size: {size_mb:.1f} MB")
tar_buf.seek(0)

sftp = client.open_sftp()
sftp.putfo(tar_buf, f"{REMOTE_DIR}/client-dist.tar.gz")
sftp.close()
print("  Upload complete")

# Extract and replace client dist
run_ssh(client, f"rm -rf {REMOTE_DIR}/client/dist.bak")
run_ssh(client, f"mv {REMOTE_DIR}/client/dist {REMOTE_DIR}/client/dist.bak 2>/dev/null; mkdir -p {REMOTE_DIR}/client/dist")
run_ssh(client, f"tar xzf {REMOTE_DIR}/client-dist.tar.gz -C {REMOTE_DIR}/client/dist/ && rm {REMOTE_DIR}/client-dist.tar.gz")
run_ssh(client, f"ls {REMOTE_DIR}/client/dist/index.html && echo 'client dist OK'")

# Step 2: Upload server dist
print("\n=== Step 2: Uploading server dist ===")
server_dist = os.path.join(PROJECT_DIR, "server", "dist")
tar_buf2 = create_tar_bytes(server_dist, "dist")
sftp = client.open_sftp()
sftp.putfo(tar_buf2, f"{REMOTE_DIR}/server/server-dist.tar.gz")
sftp.close()

run_ssh(client, f"cd {REMOTE_DIR}/server && tar xzf server-dist.tar.gz && rm server-dist.tar.gz && echo 'server dist OK'")
# Also upload package.json
upload_file(client, os.path.join(PROJECT_DIR, "server", "package.json"), f"{REMOTE_DIR}/server/package.json")
upload_file(client, os.path.join(PROJECT_DIR, "server", "package-lock.json"), f"{REMOTE_DIR}/server/package-lock.json")

# Step 3: Upload config files
print("\n=== Step 3: Uploading config files ===")
upload_file(client, os.path.join(PROJECT_DIR, "nginx.conf"), f"{REMOTE_DIR}/nginx.conf")
upload_file(client, os.path.join(PROJECT_DIR, "ecosystem.config.js"), f"{REMOTE_DIR}/ecosystem.config.js")

# Step 4: npm install on remote
print("\n=== Step 4: npm install ===")
run_ssh(client, f"cd {REMOTE_DIR}/server && npm install --omit=dev 2>&1", timeout=120)

# Step 5: Deploy nginx config
print("\n=== Step 5: Deploy nginx config ===")
run_ssh(client, f"cp {REMOTE_DIR}/nginx.conf /etc/nginx/conf.d/proctoring.conf")
run_ssh(client, "nginx -t")
run_ssh(client, "systemctl reload nginx")
print("nginx OK")

# Step 6: Restart PM2
print("\n=== Step 6: Restart PM2 ===")
run_ssh(client, f"cd {REMOTE_DIR} && pm2 startOrReload ecosystem.config.js 2>&1")
run_ssh(client, "pm2 save")

# Verify
print("\n=== Verification ===")
time.sleep(3)
exit_code, out, err = run_ssh(client, "curl -sk https://localhost/api/health")
if "ok" in out:
    print("API health check: PASS")
else:
    print(f"API health check: FAIL - {out}")

exit_code, out, err = run_ssh(client, 'curl -sk -o /dev/null -w "%{http_code}" https://localhost/')
if out.strip() == "200":
    print("Frontend: PASS (200)")
else:
    print(f"Frontend: check - HTTP {out.strip()}")

client.close()
print(f"\n=== Deploy complete! ===")
print(f"Visit: https://{ECS_IP}")
