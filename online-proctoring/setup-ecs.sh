#!/bin/bash
# ECS first-time setup script for CentOS/RHEL. Run ONCE on the ECS server as root.
set -e

echo "=== Installing Node.js 20 ==="
curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -
yum install -y nodejs

echo "=== Installing nginx ==="
yum install -y nginx
systemctl enable nginx
systemctl start nginx

echo "=== Installing PM2 ==="
npm install -g pm2

echo "=== Creating directory structure ==="
mkdir -p /opt/online-proctoring/{client/dist,server,logs}

echo "=== Generate self-signed SSL cert (replace with real cert later) ==="
mkdir -p /etc/nginx/ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/nginx/ssl/proctoring.key \
  -out /etc/nginx/ssl/proctoring.crt \
  -subj "/CN=localhost"

echo "=== Deploying nginx config ==="
cp /opt/online-proctoring/nginx.conf /etc/nginx/conf.d/proctoring.conf
nginx -t && systemctl reload nginx

echo "=== Done ==="
echo "Now upload project files to /opt/online-proctoring/, then run:"
echo "  cd /opt/online-proctoring && pm2 start ecosystem.config.js"
echo "  pm2 save && pm2 startup"
