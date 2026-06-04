#!/bin/bash
# Deploy to comenius.cn — with mandatory pre-flight checks
set -e

echo "=== 1. Full Check ==="
"$(dirname "$0")/check-all.sh"

echo ""
echo "=== 2. Deploy ==="
rsync -avz online-proctoring/client/dist/ root@47.100.86.4:/opt/online-proctoring/client/dist/ --delete

ssh root@47.100.86.4 '
  # Patch chat-widget if missing
  cp /opt/online-proctoring/client/public/chat-widget.* /opt/online-proctoring/client/dist/ 2>/dev/null || true

  # Verify
  if ! grep -q chat-widget /opt/online-proctoring/client/dist/index.html; then
    echo "❌ FAIL: chat-widget missing after deploy"
    exit 1
  fi

  nginx -s reload
  echo "  ✅ nginx reloaded"

  # Quick health check
  for route in "/" "/login" "/past-papers"; do
    code=$(curl -sk -o /dev/null -w "%{http_code}" "https://localhost$route")
    [ "$code" = "200" ] && echo "  ✅ $route" || echo "  ❌ $route ($code)"
  done
'

echo ""
echo "=== Done ==="
