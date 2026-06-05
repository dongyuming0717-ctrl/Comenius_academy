#!/bin/bash
# MCQ Parser — converts messy HTML to standard MCQ format
# Positional inference: last 4 text paragraphs = options
# Images treated as text markers (no data structure change)
# Usage: ./scripts/mcq-parse.sh <input.html> [output_dir]
set -e
INPUT="${1:?Usage: ./scripts/mcq-parse.sh <input.html> [output_dir]}"
OUTDIR="${2:-$(dirname "$INPUT")/parsed}"
echo "=== MCQ Positional Parser ===" && echo "Input:  $INPUT"
python3 - "$INPUT" "$OUTDIR" << 'PYEOF'
import re, os, sys
INPUT, OUTDIR = sys.argv[1], sys.argv[2]
with open(INPUT, encoding='utf-8') as f:
    html = f.read()

# ── Extract <p> text AND <img> URLs, keep all as strings ──
items = []
for m in re.finditer(r'<p>(.*?)</p>|<img\s+src="([^"]+)"', html, re.DOTALL):
    if m.group(1) is not None:
        t = m.group(1).strip()
        if t: items.append(t)
    elif m.group(2) is not None:
        items.append(f'![IMG:{m.group(2)}]')

start = 0
for i, s in enumerate(items):
    if re.match(r'^\d{1,2}\s+[A-Z]', s): start = i; break
items = items[start:]

# ── Group into question blocks ──
q_blocks, current = [], []
for s in items:
    if re.match(r'^\d{1,2}\s+[A-Z]', s) and current: q_blocks.append(current); current = [s]
    else: current.append(s)
if current: q_blocks.append(current)

# ── Positional inference with image-aware option detection ──
questions = []
for block in q_blocks:
    if not block: continue
    m = re.match(r'^(\d{1,2})\s+', block[0])
    if not m: continue
    num = int(m.group(1))
    if not (1 <= num <= 30): continue

    body_text = re.sub(r'^\d+\s+', '', block[0])
    clean = [body_text]
    for r in block[1:]:
        r = r.strip()
        if r.startswith('![IMG:'): clean.append(r)
        elif r and not re.match(r'^\d+$', r): clean.append(r)

    # Last 4 TEXT-ONLY items = options
    text_idx = [j for j, item in enumerate(clean) if not item.startswith('![IMG:')]
    if len(text_idx) < 5: continue
    q_text = ' '.join(clean[:text_idx[-4]])
    raw_opts = [clean[j] for j in text_idx[-4:]]

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
    q_text = re.sub(r'!\[IMG:(.*?)\]', r'![image](\1)', q_text)
    questions.append((num, q_text, opts))

# ── Group into papers ──
papers, cp = [], []
for q in questions:
    if q[0] == 1 and cp: papers.append(cp); cp = []
    cp.append(q)
if cp: papers.append(cp)

os.makedirs(OUTDIR, exist_ok=True)

KNOWN = [('0455/11','May/June','2021'),('0455/12','May/June','2021'),('0455/13','May/June','2021'),('0455/11','Oct/Nov','2021'),('0455/12','Oct/Nov','2021'),('0455/13','Oct/Nov','2021'),('0455/11','May/June','2022'),('0455/12','May/June','2022'),('0455/13','May/June','2022'),('0455/11','Oct/Nov','2022')]

for pi, paper in enumerate(papers):
    if pi < len(KNOWN):
        code, session, year = KNOWN[pi]
        fname = f"{code.replace('/','_')}_{session.replace('/','')}_{year}.md"
        title = f"{code} {session} {year}"
    else:
        fname = f"0455_Paper_{pi+1:02d}.md"; title = f"0455 Paper {pi+1}"
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
    v = sum(1 for _,_,o in paper if sum(1 for x in o if x)>=3)
    i = sum(1 for _,qt,_ in paper if '![' in qt)
    print(f"  {fname}: {v} Qs, {i} images")

total = len(questions)
print(f"\nTotal: {total} questions in {len(papers)} papers")
print(f"Saved: {OUTDIR}")
PYEOF
