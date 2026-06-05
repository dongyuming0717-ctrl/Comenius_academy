#!/bin/bash
# ─────────────────────────────────────────────────────────────
# Comenius Content Workflow — AI Data Processing SOP
# Covers: MCQ import, LaTeX conversion, question bank updates
# Run BEFORE giving any content to AI
# ─────────────────────────────────────────────────────────────
set -e

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'
echo ""
echo "╔══════════════════════════════════════════╗"
echo "║   Content Workflow — AI Data Processing  ║"
echo "╚══════════════════════════════════════════╝"
echo ""

TASK="${1:?Usage: ./scripts/content-workflow.sh <task-name> [input-file]}"
INPUT="${2}"
GIT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$GIT_ROOT"

# ── Phase 0: Snapshot ──
echo "── Phase 0: Git Snapshot ──"
git add -A
git commit -m "🤖 snapshot: before $TASK — $(date +%Y%m%d_%H%M%S)" --allow-empty
echo -e "  ${GREEN}✅${NC} Snapshot saved — undo: git reset --hard HEAD~1"
echo ""

# ── Phase 1: Validate Input ──
echo "── Phase 1: Input Validation ──"

if [ -n "$INPUT" ] && [ -f "$INPUT" ]; then
  case "$INPUT" in
    *.md)
      echo "  📄 Markdown detected"
      PAPERS=$(grep -c "^## " "$INPUT" 2>/dev/null || true)
      PAPERS=${PAPERS:-0}
      QS=$(grep -c "^### Q" "$INPUT" 2>/dev/null || true)
      QS=${QS:-0}
      echo "  Papers: $PAPERS"
      echo "  Questions: $QS"
      # Validate with content validator
      "./scripts/validate-questions.sh" "$INPUT" && echo -e "  ${GREEN}✅${NC} Content validation passed" || {
        echo -e "  ${RED}❌${NC} Content validation failed — fix before giving to AI"
        exit 1
      }
      ;;
    *.tex)
      echo "  📜 LaTeX detected"
      echo -e "  ${YELLOW}⚠️${NC} LaTeX needs format conversion before AI processing"
      echo "  Run: ./scripts/content-workflow.sh $TASK <converted>.md"
      exit 1
      ;;
    *.pdf)
      echo "  📕 PDF detected"
      echo -e "  ${YELLOW}⚠️${NC} PDF needs OCR before AI processing"
      exit 1
      ;;
    *)
      echo -e "  ${YELLOW}⚠️${NC} Unknown format — proceeding with manual review"
      ;;
  esac
else
  echo "  ⚠️  No input file — skipping input validation"
fi
echo ""

# ── Phase 2: Batching Plan ──
echo "── Phase 2: Batching Plan ──"
if [ -n "$QS" ] && [ "$QS" -gt 0 ]; then
  BATCHES=$(( (QS + 19) / 20 ))
  echo "  Total questions: $QS"
  echo "  Batch size: 20 questions"
  echo "  Batches: $BATCHES"
  echo ""
  echo "  📋 Process Plan:"
  for i in $(seq 1 $BATCHES); do
    start=$(( (i-1) * 20 + 1 ))
    echo "    Batch $i: Questions $start–$((start+19))"
  done
else
  BATCHES=1
  echo "  Single batch — all questions at once"
fi
echo ""

# ── Phase 3: Review Checklist ──
echo "── Phase 3: Review Checklist ──"
echo "  Before each batch, confirm:"
echo "    [ ] Source file read and understood"
echo "    [ ] Target format confirmed (standard markdown)"
echo "    [ ] Images folder accessible"
echo "    [ ] Answer key available"
echo ""
echo "  After each batch, confirm:"
echo "    [ ] Run: ./scripts/validate-questions.sh <output>.md"
echo "    [ ] Run: ./scripts/diff-gate.sh 5"
echo "    [ ] Spot-check 3 random questions against source"
echo "    [ ] Question count matches expected (30 per paper)"
echo ""

# ── Phase 4: Integration Plan ──
echo "── Phase 4: Integration ──"
echo "  After all batches pass validation:"
echo "    1. Merge all batch outputs into final file"
echo "    2. Run final validation: ./scripts/validate-questions.sh final.md"
echo "    3. Run data-guard: ./scripts/data-guard.sh final.md"
echo "    4. Commit: git commit -m \"feat: add $TASK\""
echo "    5. Push to GitHub"
echo "    6. Deploy if needed: ./scripts/deploy.sh"
echo ""

# ── Phase 5: AI Prompt Template ──
echo "── Phase 5: AI Prompt Template ──"
if [ -n "$INPUT" ] && [ -f "$INPUT" ]; then
  cat << PROMPT
  Copy this prompt for the AI (replace [ ] with actual values):

  ---
  Convert the following Economics MCQ questions to standard markdown format.

  Source: [describe source — e.g., "0455/11 May/June 2021 Paper 1"]
  Number of questions: [N]
  Batch: [1/5]

  Standard format:
  ## <paper code> <session> <year> · <syllabus> Paper <number>

  ### Q1
  <question text>

  - A) <option>
  - B) <option>
  - C) <option>
  - D) <option>

  > Answer: <letter>

  Rules:
  - Exactly 4 options per question (A/B/C/D)
  - Every question MUST have an answer
  - Every \includegraphics → ![desc](images/filename.jpg)
  - Every table → markdown table
  - Do NOT invent or delete content
  - Do NOT skip questions
  - Output 20 questions per response

  Questions:
  [paste source content here]
  ---
PROMPT
fi

echo "════════════════════════════════════════════"
echo -e "  ${GREEN}✅ Content workflow ready for: $TASK${NC}"
echo "════════════════════════════════════════════"
