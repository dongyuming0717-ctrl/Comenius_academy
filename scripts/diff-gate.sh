#!/bin/bash
# Diff gate — blocks AI if it deleted too much.
# Run AFTER AI changes, BEFORE you commit.
# Usage: ./scripts/diff-gate.sh [max_delete_percent]
set -e

MAX_DELETE="${1:-10}"  # default: block if AI deleted >10%

GIT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$GIT_ROOT"

RED='\033[0;31m'; GREEN='\033[0;32m'; NC='\033[0m'

# Get diff stats
STATS=$(git diff --stat HEAD 2>/dev/null)
if [ -z "$STATS" ]; then
  echo "No changes to check."
  exit 0
fi

echo "=== Diff Gate (max $MAX_DELETE% deletion) ==="
echo "$STATS"
echo ""

# Check each changed file
FAIL=0
while IFS= read -r line; do
  FILE=$(echo "$line" | awk '{print $1}')
  ADDED=$(echo "$line" | grep -o '[0-9]* insertion' | grep -o '[0-9]*' || echo 0)
  DELETED=$(echo "$line" | grep -o '[0-9]* deletion' | grep -o '[0-9]*' || echo 0)

  if [ "$DELETED" -gt 0 ]; then
    TOTAL=$((ADDED + DELETED))
    if [ "$TOTAL" -gt 0 ]; then
      PCT=$((DELETED * 100 / TOTAL))
      if [ "$PCT" -gt "$MAX_DELETE" ]; then
        echo -e "  ${RED}❌ $FILE${NC}: $DELETED lines deleted ($PCT% — exceeds $MAX_DELETE%)"
        FAIL=1
      else
        echo -e "  ${GREEN}✅ $FILE${NC}: $DELETED deleted, $ADDED added ($PCT%)"
      fi
    fi
  else
    echo -e "  ${GREEN}✅ $FILE${NC}: additions only"
  fi
done < <(echo "$STATS" | tail -n +1 | head -n -1)

echo ""
if [ "$FAIL" -eq 1 ]; then
  echo -e "${RED}❌ DIFF GATE FAILED — AI deleted too much. Review with:${NC}"
  echo "   git diff HEAD"
  echo "   git reset --hard HEAD  # to undo all AI changes"
  exit 1
else
  echo -e "${GREEN}✅ Diff gate passed${NC}"
fi
