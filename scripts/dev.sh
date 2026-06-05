#!/bin/bash
# Start all local dev services at once
set -e

echo "=== Comenius Dev ==="

# 1. Flask (past paper library)
lsof -ti:8080 | xargs kill -9 2>/dev/null; sleep 0.5
cd "$(dirname "$0")/../past-paper-library"
python3 app.py > /tmp/flask.log 2>&1 &
sleep 2
curl -sk -o /dev/null http://localhost:8080/ && echo "✅ Flask :8080" || echo "❌ Flask failed"

# 2. Vite (frontend)
lsof -ti:5173 | xargs kill -9 2>/dev/null; sleep 0.5
cd "$(dirname "$0")/../online-proctoring/client"
npx vite --host 0.0.0.0 --port 5173 &
sleep 3
echo "✅ Frontend: https://localhost:5173/"
echo "✅ Papers:   http://localhost:8080/"
echo "Done."
