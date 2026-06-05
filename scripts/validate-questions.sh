#!/bin/bash
# Validate Economics MCQ Markdown files
# Checks: paper count, 4 options per Q, answers present, images exist
# Usage: ./scripts/validate-questions.sh <file.md>
set -e

FILE="${1:?Usage: ./scripts/validate-questions.sh <file.md>}"
DIR="$(dirname "$FILE")"
[ -f "$FILE" ] || { echo "❌ File not found: $FILE"; exit 1; }

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'
PASS=0; FAIL=0; WARN=0

pass() { echo -e "  ${GREEN}✅${NC} $1"; PASS=$((PASS+1)); }
fail() { echo -e "  ${RED}❌${NC} $1"; FAIL=$((FAIL+1)); }
warn() { echo -e "  ${YELLOW}⚠️${NC} $1"; WARN=$((WARN+1)); }

echo ""
echo "╔═══════════════════════════════╗"
echo "║   Econ MCQ Content Validator ║"
echo "╚═══════════════════════════════╝"
echo ""

PAPER_TITLES=$(grep -c "^## " "$FILE" 2>/dev/null || echo 0)
TOTAL_QS=$(grep -c "^### Q" "$FILE" 2>/dev/null || echo 0)

echo "── Overview ──"
echo "  Papers: $PAPER_TITLES"
echo "  Questions: $TOTAL_QS"
echo ""

# Split file by paper boundaries (## headers)
awk '/^## /{if(NR>1) print ""; print; next} {print}' "$FILE" | \
while IFS= read -r line; do true; done  # no-op to make shell happy

# Use Python for reliable parsing
python3 << PYEOF
import re, sys, os

filepath = "$FILE"
d = os.path.dirname(filepath)

with open(filepath) as f:
    text = f.read()

# Split by ## headers
sections = re.split(r'\n(?=## )', text)
papers = [s for s in sections if s.startswith('## ')]

total_pass, total_fail, total_warn = 0, 0, 0

for paper in papers:
    lines = paper.split('\n')
    title = lines[0].replace('## ', '').strip()
    content = '\n'.join(lines[1:])

    questions = re.split(r'\n(?=### Q\d+)', content)
    questions = [q for q in questions if re.match(r'### Q\d+', q)]
    q_nums = []

    issues = []

    for q_block in questions:
        q_match = re.match(r'### Q(\d+)', q_block)
        num = int(q_match.group(1))
        q_nums.append(num)

        q_body = q_block[q_match.end():].strip()

        # Count options
        opts = re.findall(r'^- ([A-D])\)', q_body, re.MULTILINE)
        if len(opts) < 4:
            issues.append(f"Q{num}: only {len(opts)} options (need 4)")

        # Check answer
        ans = re.findall(r'^> Answer: ([A-D])$', q_body, re.MULTILINE)
        if not ans:
            issues.append(f"Q{num}: missing answer")

        # Check images exist
        imgs = re.findall(r'!\[.*?\]\((images/[^)]+)\)', q_body)
        for img in imgs:
            if not os.path.exists(os.path.join(d, img)):
                issues.append(f"Q{num}: image not found — {img}")

    # Print results per paper
    print(f"── {title} ──")
    if len(questions) == 30:
        print(f"  \033[32m✅\033[0m {len(questions)} questions")
        total_pass += 1
    elif len(questions) >= 28:
        print(f"  \033[33m⚠️\033[0m {len(questions)} questions (expected 30)")
        total_warn += 1
        total_pass += 1
    else:
        print(f"  \033[31m❌\033[0m {len(questions)} questions (expected 30)")
        total_fail += 1

    for issue in issues:
        print(f"  \033[31m❌\033[0m {issue}")
        total_fail += 1

    if not issues:
        print(f"  \033[32m✅\033[0m All options present, all answers valid")
        total_pass += 1

    print()

# Summary
print("════════════════════════════════")
print(f"  Passed: \033[32m{total_pass}\033[0m  Warnings: \033[33m{total_warn}\033[0m  Failed: \033[31m{total_fail}\033[0m")
print("════════════════════════════════")

if total_fail > 0:
    print("\033[31m❌ VALIDATION FAILED — fix issues above\033[0m")
    sys.exit(1)
elif total_warn > 0:
    print(f"\033[33m⚠️  VALIDATION PASSED — {total_warn} warning(s) to review\033[0m")
else:
    print("\033[32m✅ PERFECT — all checks passed\033[0m")
PYEOF
