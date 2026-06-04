#!/bin/bash
# Run before letting AI modify anything.
# Takes a snapshot so you can always rollback.

TS=$(date +%Y%m%d_%H%M%S)
MSG="🤖 snapshot: before AI changes — $TS"
git add -A && git commit -m "$MSG" --allow-empty && echo "✅ Snapshot saved: $MSG" && echo "Rollback: git reset --hard HEAD~1"
