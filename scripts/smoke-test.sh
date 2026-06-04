#!/bin/bash
# Smoke test — verifies all pages return 200 in dev mode
# Usage: ./scripts/smoke-test.sh [base_url]
set -e

BASE="${1:-https://localhost:5173}"
FAIL=0

ROUTES=(
  "/"
  "/login" "/signup" "/terms" "/privacy"
  "/past-papers" "/admission-tests" "/topics" "/analytics"
  "/profile" "/teacher" "/exam" "/random" "/class-mode"
)

echo "=== Smoke Test: $BASE ==="
for route in "${ROUTES[@]}"; do
  code=$(curl -sk -o /dev/null -w "%{http_code}" "$BASE$route" 2>/dev/null)
  len=$(curl -sk "$BASE$route" 2>/dev/null | wc -c)
  if [ "$code" = "200" ] && [ "$len" -gt 500 ]; then
    echo "  ✅ $route → $code (${len}b)"
  else
    echo "  ❌ $route → $code (${len}b)"
    FAIL=1
  fi
done

# Also test past paper library if running
if curl -sk -o /dev/null -w "%{http_code}" http://localhost:8080/ 2>/dev/null | grep -q 200; then
  echo "  ✅ Past Paper Library → running on :8080"
else
  echo "  ⚠️  Past Paper Library → not running on :8080"
fi

if [ "$FAIL" -eq 0 ]; then
  echo "=== All clear ==="
else
  echo "=== FAILURES DETECTED ==="
  exit 1
fi
