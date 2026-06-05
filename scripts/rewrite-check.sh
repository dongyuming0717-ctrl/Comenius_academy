#!/bin/bash
# Rewrite checklist — run BEFORE rewriting any UI component
# Usage: ./scripts/rewrite-check.sh <component-name>

NAME="${1:-unknown}"
echo "=== Rewrite Checklist: $NAME ==="
echo ""

# Check 1: Original exists
echo "1. 📸 Take screenshot of current version"
echo "   npx playwright test tests/visual.spec.ts --update-snapshots"
echo ""

# Check 2: Read original
echo "2. 📖 Read original source code"
echo "   git show HEAD:path/to/component.tsx"
echo ""

# Check 3: Plan steps
echo "3. 📋 Break into ≤5 small steps"
echo "   Step 1: data loading only"
echo "   Step 2: basic render"
echo "   Step 3: interaction"
echo "   Step 4: styling"
echo "   Step 5: polish"
echo ""

# Check 4: Compare after
echo "4. 🔍 After each step, compare screenshots"
echo "   npx playwright test tests/visual.spec.ts"
echo ""

echo "=== DO NOT: ==="
echo "❌ Write 200+ lines at once"
echo "❌ Invent new design — copy original CSS"
echo "❌ Skip testing between steps"
echo "❌ Commit until all 5 steps pass"
echo ""

echo "✅ Ready to start? [y/N]"
