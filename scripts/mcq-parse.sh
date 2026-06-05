#!/bin/bash
# MCQ Hybrid Parser — HTML structure + Markdown fallback
# Positional inference from HTML, table recovery from Markdown
# Images preserved inline, no data structure changes
# Usage: ./scripts/mcq-parse.sh <input.html> [input.md] [output_dir]
set -e
HTML="${1:?Usage: ./scripts/mcq-parse.sh <input.html> [input.md] [output_dir]}"
MD="${2:-}"
OUTDIR="${3:-$(dirname "$HTML")/parsed}"
echo "=== MCQ Hybrid Parser ==="
[ -n "$MD" ] && echo "Markdown fallback: $MD" || echo "HTML only (no markdown fallback)"

python3 - "$HTML" "$MD" "$OUTDIR" << 'PYEOF'
import re, os, sys
HTML = sys.argv[1]
MD = sys.argv[2] if len(sys.argv) > 2 and sys.argv[2] else None
OUTDIR = sys.argv[3]

with open(HTML, encoding='utf-8') as f:
    html = f.read()

def extract_options(text_lines):
    clean = [l.strip() for l in text_lines if l.strip() and not re.match(r'^\d+$', l.strip())]
    if len(clean) < 4: return []
    opts = clean[-4:]
    result = []
    for raw in opts:
        parts = re.split(r'\s+(?=[A-D]\s)', raw)
        if len(parts) >= 3:
            for part in parts:
                opt = re.sub(r'^[A-D]\s+', '', part).strip()
                if opt and opt not in result: result.append(opt)
        else:
            opt = re.sub(r'^[A-D]\s+', '', raw).strip()
            if opt: result.append(opt)
    return result[:4]

# ── HTML parse ──
items = []
for m in re.finditer(r'<p>(.*?)</p>|<img\s+src="([^"]+)"', html, re.DOTALL):
    if m.group(1) is not None:
        t = m.group(1).strip()
        if t: items.append(('p', t))
    elif m.group(2) is not None: items.append(('img', m.group(2)))

start = 0
for i, (tag, text) in enumerate(items):
    if tag == 'p' and re.match(r'^\d{1,2}\s+[A-Z]', text): start = i; break
items = items[start:]

q_blocks, current = [], []
for el in items:
    tag, text = el
    if tag == 'p' and re.match(r'^\d{1,2}\s+[A-Z]', text) and current:
        q_blocks.append(current); current = [el]
    else: current.append(el)
if current: q_blocks.append(current)

questions = []
for block in q_blocks:
    if not block or block[0][0] != 'p': continue
    m = re.match(r'^(\d{1,2})\s+', block[0][1])
    if not m: continue
    num = int(m.group(1))
    if not (1 <= num <= 30): continue
    body = [re.sub(r'^\d+\s+', '', block[0][1])]
    text_lines = []
    for tag, text in block[1:]:
        if tag == 'img': body.append(f'![image]({text})')
        elif tag == 'p':
            t = text.strip()
            if t and not re.match(r'^\d+$', t): text_lines.append(t)
    opts = extract_options(text_lines)
    questions.append((num, ' '.join(body), opts))

# ── Markdown fallback for table-heavy questions ──
if MD and os.path.exists(MD):
    with open(MD, encoding='utf-8') as f:
        md = f.read()
    md_lines = md.split('\n')
    md_blocks = {}
    i = 0
    while i < len(md_lines):
        m = re.match(r'^(\d{1,2})\s+[A-Z]', md_lines[i].strip())
        if m:
            num = int(m.group(1))
            if 1 <= num <= 30:
                block = [md_lines[i].strip()]
                i += 1
                while i < len(md_lines) and not re.match(r'^\d{1,2}\s+[A-Z]', md_lines[i].strip()):
                    block.append(md_lines[i].strip()); i += 1
                md_blocks[num] = block
                continue
        i += 1

    # Apply fallback for questions with <4 valid options
    fixed = 0
    for idx, (num, qt, opts) in enumerate(questions):
        valid = sum(1 for o in opts if o)
        if valid >= 4: continue
        if num in md_blocks:
            md_opts = extract_options(md_blocks[num])
            if len(md_opts) >= 4 and sum(1 for o in md_opts if o) >= 4:
                questions[idx] = (num, qt, md_opts)
                fixed += 1
    print(f"  Markdown fallback fixed: {fixed} questions")

# ── Group papers ──
papers, cp = [], []
for q in questions:
    if q[0] == 1 and cp: papers.append(cp); cp = []
    if sum(1 for o in q[2] if o) >= 4: cp.append(q)
if cp: papers.append(cp)

os.makedirs(OUTDIR, exist_ok=True)
KNOWN = [('0455/11','May/June','2021'),('0455/12','May/June','2021'),('0455/13','May/June','2021'),('0455/11','Oct/Nov','2021'),('0455/12','Oct/Nov','2021'),('0455/13','Oct/Nov','2021'),('0455/11','May/June','2022'),('0455/12','May/June','2022'),('0455/13','May/June','2022'),('0455/11','Oct/Nov','2022')]

total_qs = 0
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
            f.write(f"### Q{num}\n{qt}\n\n")
            for li, t in enumerate(opts):
                if t: f.write(f"- {letters[li]}) {t}\n")
            f.write(f"\n> Answer: ?\n\n")
    imgs = sum(1 for _,qt,_ in paper if '![' in qt)
    print(f"  {fname}: {len(paper)} Qs, {imgs} images")
    total_qs += len(paper)

print(f"\nTotal: {total_qs} questions in {len(papers)} papers")
print(f"Saved: {OUTDIR}")
PYEOF
