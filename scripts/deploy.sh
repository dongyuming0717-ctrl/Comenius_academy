#!/bin/bash
# Deploy to comenius.cn — with mandatory pre-flight checks
set -e

echo "=== 1. Build ==="
cd "$(dirname "$0")/../online-proctoring/client"
npx vite build

echo ""
echo "=== 2. Pre-flight checks ==="

# Check 1: chat-widget referenced in index.html
if ! grep -q "chat-widget" dist/index.html; then
  echo "❌ FAIL: chat-widget NOT in dist/index.html"
  echo "   Fix: Add <link href='/chat-widget.css'> and <script src='/chat-widget.js'> to client/index.html"
  exit 1
fi
echo "  ✅ chat-widget in index.html"

# Check 2: chat-widget files exist
if [ ! -f dist/chat-widget.css ] || [ ! -f dist/chat-widget.js ]; then
  echo "  ⚠️  chat-widget files missing from dist/, copying from public/"
  cp public/chat-widget.* dist/ 2>/dev/null || {
    echo "❌ FAIL: No chat-widget.* files in dist/ or public/"
    exit 1
  }
fi
echo "  ✅ chat-widget files present"

# Check 3: build size is reasonable
SIZE=$(du -sh dist | cut -f1)
echo "  ✅ dist size: $SIZE"

echo ""
echo "=== 3. Smoke test ==="
cd "$(dirname "$0")/.."
./scripts/smoke-test.sh || {
  echo "❌ FAIL: Smoke test failed"
  exit 1
}

echo ""
echo "=== 4. Deploy ==="
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
