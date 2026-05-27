#!/bin/bash
# One-click deploy: build locally, upload to ECS, restart services.
# Usage: ./deploy.sh <ECS_IP> [SSH_USER]
set -e

ECS_IP="${1:?Usage: ./deploy.sh <ECS_IP> [SSH_USER]}"
SSH_USER="${2:-root}"
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
REMOTE_DIR="/opt/online-proctoring"

echo "=== Building client ==="
cd "$PROJECT_DIR/client"
npm install --legacy-peer-deps
npm run build

echo "=== Building server ==="
cd "$PROJECT_DIR/server"
npm install
npm run build

echo "=== Uploading to ECS ($SSH_USER@$ECS_IP) ==="
rsync -avz --delete \
  "$PROJECT_DIR/client/dist/" \
  "$SSH_USER@$ECS_IP:$REMOTE_DIR/client/dist/"

rsync -avz --delete \
  "$PROJECT_DIR/server/dist/" \
  "$PROJECT_DIR/server/package.json" \
  "$PROJECT_DIR/server/package-lock.json" \
  "$SSH_USER@$ECS_IP:$REMOTE_DIR/server/"

rsync -avz \
  "$PROJECT_DIR/nginx.conf" \
  "$PROJECT_DIR/ecosystem.config.js" \
  "$SSH_USER@$ECS_IP:$REMOTE_DIR/"

echo "=== Installing server dependencies on ECS ==="
ssh "$SSH_USER@$ECS_IP" "cd $REMOTE_DIR/server && npm install --omit=dev"

echo "=== Deploying nginx config ==="
ssh "$SSH_USER@$ECS_IP" "cp $REMOTE_DIR/nginx.conf /etc/nginx/conf.d/proctoring.conf && nginx -t && systemctl reload nginx"

echo "=== Restarting PM2 ==="
ssh "$SSH_USER@$ECS_IP" "cd $REMOTE_DIR && pm2 startOrReload ecosystem.config.js && pm2 save"

echo "=== Deploy complete! ==="
echo "Visit: https://$ECS_IP"
