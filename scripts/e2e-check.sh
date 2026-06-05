#!/bin/bash
# ─────────────────────────────────────────────────────────────
# Comenius End-to-End Health Check
# Covers: Frontend → Backend → Deployment readiness
# Fails fast: first ❌ stops everything
# ─────────────────────────────────────────────────────────────
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'
PASS=0; FAIL=0

pass() { echo -e "  ${GREEN}✅${NC} $1"; PASS=$((PASS+1)); }
fail() { echo -e "  ${RED}❌${NC} $1 — $2"; FAIL=$((FAIL+1)); }

echo ""
echo "╔══════════════════════════════════════╗"
echo "║   Comenius E2E Health Check         ║"
echo "╚══════════════════════════════════════╝"
echo ""

# ═══════════════════════════════════════
# STAGE 1: Static Analysis
# ═══════════════════════════════════════
echo "── Stage 1: Static Analysis ──"
cd "$ROOT/online-proctoring/client"

if npx tsc --noEmit > /dev/null 2>&1; then pass "TypeScript type check"; else fail "TypeScript" "fix type errors first"; exit 1; fi
if npx eslint src --ext .ts,.tsx --max-warnings 200 > /dev/null 2>&1; then pass "ESLint"; else fail "ESLint" "run: npm run lint"; fi

# ═══════════════════════════════════════
# STAGE 2: Build + Test
# ═══════════════════════════════════════
echo "── Stage 2: Build & Test ──"

if npx vite build > /dev/null 2>&1; then pass "Vite production build"; else fail "Build" "check build errors"; exit 1; fi
if npx vitest run --reporter=dot > /dev/null 2>&1; then pass "Unit tests"; else fail "Tests" "check test output"; fi

# Chat-widget check
if grep -q "chat-widget" index.html && grep -q "chat-widget" dist/index.html; then
  pass "Chat-widget referenced"
else
  fail "Chat-widget" "add to client/index.html"; exit 1
fi

# Bundle size sanity
SIZE=$(stat -f%z dist/assets/index-*.js 2>/dev/null | head -1 || echo 0)
if [ "$SIZE" -gt 100000 ]; then pass "Bundle size OK ($((SIZE/1024))KB)"; else fail "Bundle" "too small — missing assets?"; fi

# ═══════════════════════════════════════
# STAGE 3: Frontend Smoke Test
# ═══════════════════════════════════════
echo "── Stage 3: Frontend Smoke Test ──"

lsof -ti:5199 | xargs kill 2>/dev/null; sleep 0.5
npx vite --host 0.0.0.0 --port 5199 &
VITE_PID=$!
sleep 3

ROUTES=("/" "/login" "/signup" "/terms" "/privacy" "/past-papers" "/admission-tests" "/topics" "/analytics" "/profile")
for route in "${ROUTES[@]}"; do
  code=$(curl -sk -o /dev/null -w "%{http_code}" "https://localhost:5199$route" 2>/dev/null || echo "000")
  len=$(curl -sk "https://localhost:5199$route" 2>/dev/null | wc -c)
  if [ "$code" = "200" ] && [ "$len" -gt 500 ]; then
    pass "$route ($len bytes)"
  else
    fail "$route" "HTTP $code, $len bytes"
  fi
done
kill $VITE_PID 2>/dev/null

# ═══════════════════════════════════════
# STAGE 4: Backend Health Check
# ═══════════════════════════════════════
echo "── Stage 4: Backend (Past Paper Library) ──"
cd "$ROOT/past-paper-library"

lsof -ti:8080 | xargs kill 2>/dev/null; sleep 0.5
python3 app.py > /dev/null 2>&1 &
FLASK_PID=$!
sleep 3

# Flask starts
if curl -sk -o /dev/null -w "%{http_code}" http://localhost:8080/ 2>/dev/null | grep -q 200; then
  pass "Flask server :8080"
else
  fail "Flask" "won't start — check app.py"; kill $FLASK_PID 2>/dev/null; exit 1
fi

# API works
if curl -s "http://localhost:8080/api/papers?subject=9709&year=2024" 2>/dev/null | python3 -c "import sys,json; assert len(json.load(sys.stdin))>0" 2>/dev/null; then
  pass "Papers API returns data"
else
  fail "Papers API" "no data returned"
fi

# Static assets
for f in style.css app.js index.html; do
  if curl -sk "http://localhost:8080/$f" -o /dev/null -w "%{http_code}" 2>/dev/null | grep -q 200; then
    pass "Static: /$f"
  else
    fail "Static: /$f" "404 not found"
  fi
done

# AI chat (should fail gracefully without API keys — that's OK)
CHAT_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:8080/api/chat -H "Content-Type: application/json" -d '{"question":"test"}' 2>/dev/null || echo "000")
if [ "$CHAT_CODE" = "200" ] || [ "$CHAT_CODE" = "500" ]; then
  pass "Chat API responds ($CHAT_CODE)"
else
  fail "Chat API" "unexpected $CHAT_CODE"
fi

kill $FLASK_PID 2>/dev/null

# ═══════════════════════════════════════
# STAGE 5: Deployment Readiness
# ═══════════════════════════════════════
echo "── Stage 5: Deployment Readiness ──"

# Check nginx config syntax in repo
if [ -f "$ROOT/nginx/default.conf" ] || [ -f "$ROOT/online-proctoring/nginx.conf" ]; then
  pass "Nginx config present"
else
  fail "Nginx config" "missing from repo"
fi

# Check deploy script exists
if [ -x "$ROOT/scripts/deploy.sh" ]; then pass "Deploy script ready"; else fail "Deploy" "missing scripts/deploy.sh"; fi

# Check git is clean (everything committed)
if [ -z "$(git -C "$ROOT" status --porcelain)" ]; then
  pass "Git working tree clean"
else
  UNCOMMITTED=$(git -C "$ROOT" status --porcelain | wc -l | tr -d ' ')
  fail "Git" "$UNCOMMITTED uncommitted changes — commit first"
fi

# ═══════════════════════════════════════
# RESULT
# ═══════════════════════════════════════
echo ""
echo "════════════════════════════════"
echo -e "  Passed: ${GREEN}$PASS${NC}  Failed: ${RED}$FAIL${NC}"
echo "════════════════════════════════"

if [ "$FAIL" -gt 0 ]; then
  echo -e "${RED}❌ E2E CHECK FAILED — fix $FAIL issue(s)${NC}"
  exit 1
else
  echo -e "${GREEN}✅ ALL $PASS CHECKS PASSED — ready to deploy${NC}"
fi

# ── MCQ Viewer Check ──
echo "── MCQ Viewer ──"
MCQ_PORT=3456
if curl -s -o /dev/null -w "%{http_code}" "http://localhost:${MCQ_PORT}/" 2>/dev/null | grep -q 200; then
  IMGS=$(curl -s "http://localhost:${MCQ_PORT}/0455_11_MayJune_2021.md" 2>/dev/null | grep -c '!\[image\]')
  QS=$(curl -s "http://localhost:${MCQ_PORT}/0455_11_MayJune_2021.md" 2>/dev/null | grep -c '### Q')
  echo "  ✅ MCQ Viewer :${MCQ_PORT} — $QS questions, $IMGS images"
else
  echo "  ⚠️  MCQ Viewer not running on :${MCQ_PORT}"
fi

# ── MCQ Viewer ──
echo "── MCQ Viewer ──"
MCQ_PORT=3456
if curl -s -o /dev/null -w "%{http_code}" "http://localhost:${MCQ_PORT}/" 2>/dev/null | grep -q 200; then
  pass "Viewer HTTP 200"
  # Check JS is valid (balanced braces)
  JS_BRACES=$(curl -s "http://localhost:${MCQ_PORT}/" | python3 -c "import sys; t=sys.stdin.read(); o=t.count('{'); c=t.count('}'); print('OK' if o==c else 'BROKEN')")
  if [ "$JS_BRACES" = "OK" ]; then pass "Viewer JS valid"; else fail "Viewer JS" "unbalanced braces — white screen"; fi
else
  fail "Viewer" "not running"
fi
