#!/bin/bash
# MCQ Parser — .docx or .html → standard MCQ Markdown
# Usage: ./scripts/mcq-parse.sh <file.docx|.html> [output_dir]
set -e
INPUT="${1:?}"
OUTDIR="${2:-$(dirname "$INPUT")/parsed}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
echo "=== MCQ Parser ==="
python3 "$SCRIPT_DIR/mcq_parse.py" "$INPUT" "$OUTDIR"
