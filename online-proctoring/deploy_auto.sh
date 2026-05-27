#!/bin/bash
# Automated deploy to ECS with password via expect
set -e

ECS_IP="47.100.86.4"
ECS_USER="root"
PASS='Spboyy760921!'
PROJECT_DIR="/Users/yumingdong/online-proctoring"
REMOTE_DIR="/opt/online-proctoring"

# Write commands to a temp script, scp it, then execute it on remote
run_remote() {
  local desc="$1" script_content="$2"
  echo "=== $desc ==="
  # Write script to temp file
  echo "$script_content" > /tmp/deploy_remote_step.sh
  # Upload script
  expect -c "
    set timeout 30
    spawn scp -o StrictHostKeyChecking=no /tmp/deploy_remote_step.sh $ECS_USER@$ECS_IP:/tmp/step.sh
    expect { \"assword:\" { send \"$PASS\r\"; exp_continue } \"password:\" { send \"$PASS\r\"; exp_continue } eof }
    catch wait result
    exit [lindex \$result 3]
  " || { echo "SCP failed"; return 1; }
  # Execute script on remote
  expect -c "
    set timeout 300
    spawn ssh -o StrictHostKeyChecking=no $ECS_USER@$ECS_IP bash /tmp/step.sh
    expect { \"assword:\" { send \"$PASS\r\"; exp_continue } \"password:\" { send \"$PASS\r\"; exp_continue } eof }
    catch wait result
    exit [lindex \$result 3]
  " || { echo "Execution failed"; return 1; }
}

upload_file() {
  local desc="$1" local_path="$2" remote_path="$3"
  echo "=== $desc ==="
  expect -c "
    set timeout 120
    spawn scp -o StrictHostKeyChecking=no $local_path $ECS_USER@$ECS_IP:$remote_path
    expect { \"assword:\" { send \"$PASS\r\"; exp_continue } \"password:\" { send \"$PASS\r\"; exp_continue } eof }
    catch wait result
    exit [lindex \$result 3]
  " || { echo "Upload failed"; return 1; }
}

# Step 1: Upload client dist (tar + scp + extract on remote)
echo "=== Uploading client dist ==="
cd "$PROJECT_DIR/client/dist" && tar czf /tmp/client-dist.tar.gz . && cd "$PROJECT_DIR"
upload_file "Upload client archive" /tmp/client-dist.tar.gz "$REMOTE_DIR/client-dist.tar.gz"
run_remote "Extract client dist" "
rm -rf $REMOTE_DIR/client/dist/*
tar xzf $REMOTE_DIR/client-dist.tar.gz -C $REMOTE_DIR/client/dist/
rm -f $REMOTE_DIR/client-dist.tar.gz
echo 'client dist extracted OK'
"

# Step 2: Upload server dist
echo "=== Uploading server dist ==="
cd "$PROJECT_DIR/server" && tar czf /tmp/server-dist.tar.gz dist/ && cd "$PROJECT_DIR"
upload_file "Upload server archive" /tmp/server-dist.tar.gz "$REMOTE_DIR/server/server-dist.tar.gz"
run_remote "Extract server dist" "
cd $REMOTE_DIR/server
tar xzf server-dist.tar.gz
rm -f server-dist.tar.gz
echo 'server dist extracted OK'
"

# Step 3: Upload config files
echo "=== Uploading configs ==="
upload_file "Upload nginx.conf" "$PROJECT_DIR/nginx.conf" "$REMOTE_DIR/nginx.conf"
upload_file "Upload ecosystem.config.js" "$PROJECT_DIR/ecosystem.config.js" "$REMOTE_DIR/ecosystem.config.js"

# Step 4: npm install on remote
run_remote "npm install on ECS" "
cd $REMOTE_DIR/server
npm install --omit=dev
echo 'npm install OK'
"

# Step 5: Deploy nginx config + reload
run_remote "Deploy nginx config" "
cp $REMOTE_DIR/nginx.conf /etc/nginx/conf.d/proctoring.conf
nginx -t
systemctl reload nginx
echo 'nginx reloaded OK'
"

# Step 6: Restart PM2
run_remote "Restart PM2" "
cd $REMOTE_DIR
pm2 startOrReload ecosystem.config.js
pm2 save
echo 'PM2 restarted OK'
"

# Cleanup
rm -f /tmp/client-dist.tar.gz /tmp/server-dist.tar.gz /tmp/deploy_remote_step.sh

echo ""
echo "=== Deploy complete! ==="
echo "Visit: https://$ECS_IP"
