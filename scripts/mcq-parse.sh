#!/bin/bash
# MCQ Parser — converts messy HTML to standard MCQ format
# Uses POSITIONAL inference (not regex) for reliable option extraction
# Usage: ./scripts/mcq-parse.sh <input.html> [output_dir]
set -e

INPUT="${1:?Usage: ./scripts/mcq-parse.sh <input.html> [output_dir]}"
OUTDIR="${2:-$(dirname "$INPUT")/parsed}"

echo "=== MCQ Positional Parser ==="
echo "Input:  $INPUT"

python3 - "$INPUT" "$OUTDIR" << 'PYEOF'
import re, os, sys

INPUT = sys.argv[1]
OUTDIR = sys.argv[2]

with open(INPUT, encoding='utf-8') as f:
    html = f.read()

p_tags = re.findall(r'<p>(.*?)</p>', html, re.DOTALL)
p_tags = [p.strip() for p in p_tags if p.strip()]

start = 0
for i, p in enumerate(p_tags):
    if re.match(r'^\d{1,2}\s+[A-Z]', p):
        start = i; break

elements = p_tags[start:]

q_blocks = []; current = []
for p in elements:
    if re.match(r'^\d{1,2}\s+[A-Z]', p) and current:
        q_blocks.append(current); current = [p]
    else: current.append(p)
if current: q_blocks.append(current)

questions = []
for block in q_blocks:
    if not block: continue
    m = re.match(r'^(\d{1,2})\s+', block[0])
    if not m: continue
    num = int(m.group(1))
    if not (1 <= num <= 30): continue

    body_text = re.sub(r'^\d+\s+', '', block[0])
    clean = []
    for r in block[1:]:
        r = r.strip()
        if r and not re.match(r'^\d+$', r): clean.append(r)

    all_items = [body_text] + clean
    if len(all_items) < 4: continue

    n_opts = min(4, len(all_items) - 1)
    q_text = ' '.join(all_items[:-n_opts])
    raw_opts = all_items[-n_opts:]

    options = []
    for raw in raw_opts:
        parts = re.split(r'\s+(?=[A-D]\s)', raw)
        if len(parts) >= 3:
            for part in parts:
                opt = re.sub(r'^[A-D]\s+', '', part).strip()
                if opt and opt not in options: options.append(opt)
        else:
            opt = re.sub(r'^[A-D]\s+', '', raw).strip()
            if opt: options.append(opt)

    opts = (options + ['']*4)[:4]
    if sum(1 for o in opts if not o) >= 2: continue
    questions.append((num, q_text, opts))

papers = []; cp = []
for q in questions:
    if q[0] == 1 and cp: papers.append(cp); cp = []
    cp.append(q)
if cp: papers.append(cp)

os.makedirs(OUTDIR, exist_ok=True)

# Known paper codes extracted from HTML source
KNOWN = [
    ('0455/11', 'May/June', '2021'), ('0455/12', 'May/June', '2021'),
    ('0455/13', 'May/June', '2021'), ('0455/11', 'Oct/Nov', '2021'),
    ('0455/12', 'Oct/Nov', '2021'), ('0455/13', 'Oct/Nov', '2021'),
    ('0455/11', 'May/June', '2022'), ('0455/12', 'May/June', '2022'),
    ('0455/13', 'May/June', '2022'), ('0455/11', 'Oct/Nov', '2022'),
]

for pi, paper in enumerate(papers):
    if pi < len(KNOWN):
        code, session, year = KNOWN[pi]
        code_safe = code.replace('/', '_')
        sess_safe = session.replace('/', '')
        fname = f"{code_safe}_{sess_safe}_{year}.md"
        title = f"{code} {session} {year}"
    else:
        seq = pi - len(KNOWN) + 1
        fname = f"0455_Paper_{pi+1:02d}_2023_2025.md"
        title = f"0455 Paper {pi+1} (2023-2025)"
    path = os.path.join(OUTDIR, fname)
    path = os.path.join(OUTDIR, fname)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(f"## {title} · IGCSE Economics Paper 1\n\n")
        letters = 'ABCD'
        for num, qt, opts in paper:
            valid = sum(1 for o in opts if o)
            if valid >= 3:
                f.write(f"### Q{num}\n{qt}\n\n")
                for li, t in enumerate(opts):
                    if t: f.write(f"- {letters[li]}) {t}\n")
                f.write(f"\n> Answer: ?\n\n")
    valid_qs = sum(1 for _,_,o in paper if sum(1 for x in o if x)>=3)
    print(f"  {fname}: {valid_qs} Qs")

total = sum(1 for _,_,o in questions if sum(1 for x in o if x)>=3)
print(f"\nTotal: {total} valid questions in {len(papers)} papers")
print(f"Saved: {OUTDIR}")
PYEOF
