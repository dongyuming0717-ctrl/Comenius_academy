#!/bin/bash
# Comprehensive pre-deploy check for Comenius
# Usage: ./scripts/check-all.sh
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PASS=0
FAIL=0

check() {
  local label="$1"; shift
  if "$@" > /dev/null 2>&1; then
    echo "  ✅ $label"
    PASS=$((PASS + 1))
  else
    echo "  ❌ $label"
    FAIL=$((FAIL + 1))
  fi
}

echo ""
echo "╔══════════════════════════════════╗"
echo "║   Comenius Pre-Flight Check     ║"
echo "╚══════════════════════════════════╝"
echo ""

# ── Frontend ──
echo "── Frontend ──"
cd "$ROOT/online-proctoring/client"

check "TypeScript type check"  npx tsc --noEmit
check "Vite production build" npx vite build
check "Unit tests"             npx vitest run --reporter=dot
check "Chat-widget in index.html" grep -q chat-widget index.html
check "Chat-widget in dist/index.html" grep -q chat-widget dist/index.html 2>/dev/null || { cp public/chat-widget.* dist/ 2>/dev/null; grep -q chat-widget dist/index.html; }

# Smoke test (needs dev server)
echo "  ── Smoke test ──"
lsof -ti:5199 | xargs kill 2>/dev/null; sleep 0.5
npx vite --host 0.0.0.0 --port 5199 &
VITE_PID=$!
sleep 3

for route in "/" "/login" "/past-papers" "/admission-tests" "/topics" "/analytics" "/profile"; do
  code=$(curl -sk -o /dev/null -w "%{http_code}" "https://localhost:5199$route" 2>/dev/null || echo "000")
  if [ "$code" = "200" ]; then
    echo "    ✅ $route"
    PASS=$((PASS + 1))
  else
    echo "    ❌ $route ($code)"
    FAIL=$((FAIL + 1))
  fi
done
kill $VITE_PID 2>/dev/null

# ── Backend ──
echo ""
echo "── Backend (Past Paper Library) ──"
cd "$ROOT/past-paper-library"

lsof -ti:8080 | xargs kill 2>/dev/null; sleep 0.5
python3 app.py &
FLASK_PID=$!
sleep 3

check "Flask starts on :8080"  curl -sk -o /dev/null -w "%{http_code}" http://localhost:8080/ | grep -q 200
check "Papers API returns data" "curl -s http://localhost:8080/api/papers?subject=9709&year=2024 | python3 -c \"import sys,json; assert len(json.load(sys.stdin))>0\""
check "Static files served" curl -sk http://localhost:8080/style.css -o /dev/null -w "%{http_code}" | grep -q 200
kill $FLASK_PID 2>/dev/null

# ── Special checks ──
echo ""
echo "── Special Checks ──"

check "No leftover .bak files in src"  test -z "$(find "$ROOT/online-proctoring/client/src" -name '*.bak' 2>/dev/null)"
check "No console.error in committed code"  test -z "$(grep -rn 'console.error' "$ROOT/online-proctoring/client/src" --include='*.tsx' --include='*.ts' 2>/dev/null || true)"

# ── Result ──
echo ""
echo "════════════════════════════════"
echo "  Passed: $PASS  Failed: $FAIL"
echo "════════════════════════════════"

if [ "$FAIL" -gt 0 ]; then
  echo "❌ DEPLOY BLOCKED — fix $FAIL issue(s) above"
  exit 1
else
  echo "✅ All clear — ready to deploy"
fi
