#!/bin/bash
cd "$(dirname "$0")"
echo "=== CIE Past Paper Library ==="
echo ""
echo "Step 1: Building paper index..."
python3 indexer.py
echo ""
echo "Step 2: Starting server..."
echo "Opening http://localhost:8080 ..."
sleep 0.5
open http://localhost:8080
python3 app.py
