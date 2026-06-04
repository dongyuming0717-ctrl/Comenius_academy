#!/bin/bash
# Data integrity guard — prevents AI from silently deleting/corrupting data
# Run BEFORE committing any data file changes
set -e

DATA_DIR="$1"
if [ -z "$DATA_DIR" ]; then
  echo "Usage: ./scripts/data-guard.sh <data-file-or-dir>"
  echo "Example: ./scripts/data-guard.sh papers/"
  exit 1
fi

GIT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$GIT_ROOT"

echo "=== Data Guard: $DATA_DIR ==="

# Rule 1: File counts — MUST not decrease
BEFORE_FILES=$(git show HEAD:"$DATA_DIR" 2>/dev/null | wc -l || echo "NEW")
AFTER_FILES=$(find "$DATA_DIR" -type f 2>/dev/null | wc -l)
echo "  Files: $AFTER_FILES (was: $BEFORE_FILES)"
if [ "$BEFORE_FILES" != "NEW" ] && [ "$AFTER_FILES" -lt "$BEFORE_FILES" ]; then
  echo "  ❌ BLOCKED: $((BEFORE_FILES - AFTER_FILES)) files were deleted"
  echo "     Run: git diff --stat HEAD -- $DATA_DIR"
  exit 1
fi

# Rule 2: Total size — MUST not shrink > 10%
BEFORE_SIZE=$(git show HEAD:"$DATA_DIR" 2>/dev/null | wc -c || echo 0)
AFTER_SIZE=$(find "$DATA_DIR" -type f -exec wc -c {} + 2>/dev/null | tail -1 | awk '{print $1}' || echo 0)
if [ "$BEFORE_SIZE" != "0" ] && [ "$AFTER_SIZE" -gt 0 ]; then
  CHANGE=$(( (AFTER_SIZE - BEFORE_SIZE) * 100 / BEFORE_SIZE ))
  echo "  Size: $AFTER_SIZE bytes ($CHANGE%)"
  if [ "$CHANGE" -lt -10 ]; then
    echo "  ❌ BLOCKED: data shrunk by $((-CHANGE))% — suspicious deletion"
    exit 1
  fi
fi

# Rule 3: Detect AI hallucination patterns
# AI often repeats itself or adds placeholder text when confused
if find "$DATA_DIR" -type f -name "*.tex" -o -name "*.md" -o -name "*.json" 2>/dev/null | xargs grep -l "TODO\|FIXME\|PLACEHOLDER\|TBD\|insert here\|add content" 2>/dev/null; then
  echo "  ⚠️  WARNING: AI placeholder text detected (TODO/FIXME/placeholder)"
  echo "     AI might have left incomplete data. Review the files above."
fi

echo "  ✅ Data guard passed"
