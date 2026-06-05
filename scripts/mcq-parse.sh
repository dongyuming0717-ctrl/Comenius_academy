#!/bin/bash
# MCQ Parser — HTML DOM. Keep everything, flag incomplete questions.
# Usage: ./scripts/mcq-parse.sh <input.html> [output_dir]
set -e
INPUT="${1:?Usage: ./scripts/mcq-parse.sh <input.html> [output_dir]}"
OUTDIR="${2:-$(dirname "$INPUT")/parsed}"
echo "=== MCQ Parser ===" && echo "Input: $INPUT"

python3 - "$INPUT" "$OUTDIR" << 'PYEOF'
import sys, os, re
from html.parser import HTMLParser

INPUT, OUTDIR = sys.argv[1], sys.argv[2]

class Parser(HTMLParser):
    def __init__(self):
        super().__init__(); self.items = []
        self.cur = ''; self.in_p = False
        self.tdepth = 0; self.trows = []; self.tcells = []; self.in_row = False
    def handle_starttag(self, tag, attrs):
        if tag == 'p': self.in_p = True; self.cur = ''
        elif tag == 'img':
            for k, v in attrs:
                if k == 'src': self.items.append(('img', v))
        elif tag == 'table': self.tdepth += 1; self.trows = []
        elif tag == 'tr' and self.tdepth > 0: self.in_row = True; self.tcells = []
        elif tag in ('td', 'th') and self.in_row: self.cur = ''
    def handle_endtag(self, tag):
        if tag == 'p':
            self.in_p = False; t = self.cur.strip()
            if t: self.items.append(('p', t))
        elif tag == 'table':
            self.tdepth -= 1
            if self.tdepth == 0 and self.trows:
                lines = []
                for ri, row in enumerate(self.trows):
                    lines.append('| ' + ' | '.join(row) + ' |')
                    if ri == 0 and row: lines.append('|' + '|'.join(['---']*len(row)) + '|')
                self.items.append(('table', '\n'.join(lines)))
        elif tag == 'tr':
            self.in_row = False
            if self.tcells: self.trows.append(self.tcells)
        elif tag in ('td', 'th'): self.tcells.append(self.cur.strip())
    def handle_data(self, data):
        if self.in_p: self.cur += data
        elif self.in_row: self.cur += data

with open(INPUT, encoding='utf-8') as f: html = f.read()
p = Parser(); p.feed(html)
items = p.items

# Find first question
start = 0
for i, (tag, text) in enumerate(items):
    if tag == 'p' and re.match(r'^\d{1,2}\s+[A-Z]', text): start = i; break
items = items[start:]

# Group by question number boundary
blocks, cur = [], []
for el in items:
    tag, text = el
    if tag == 'p' and re.match(r'^\d{1,2}\s+[A-Z]', text) and cur:
        blocks.append(cur); cur = [el]
    else: cur.append(el)
if cur: blocks.append(cur)

# Parse each block — keep everything, flag when <4 options
questions = []
for block in blocks:
    if not block or block[0][0] != 'p': continue
    m = re.match(r'^(\d{1,2})\s+', block[0][1])
    if not m: continue
    num = int(m.group(1))
    if not (1 <= num <= 30): continue

    qbody = [re.sub(r'^\d{1,2}\s+', '', block[0][1])]
    opts = []

    for tag, text in block[1:]:
        if tag == 'img': qbody.append(f'![image]({text})')
        elif tag == 'table': qbody.append(f'\n{text}\n')
        elif tag == 'p':
            t = text.strip()
            if not t or re.match(r'^\d+$', t): continue
            m2 = re.match(r'^([A-D])\s+(.+)', t)
            if m2: opts.append((m2.group(1), m2.group(2)))
            else: qbody.append(t)

    # If <4 labeled options, try positional fallback on qbody tail
    if len(opts) < 4:
        text_items = [x for x in qbody if not x.startswith('![') and not x.startswith('\n|')]
        need = 4 - len(opts)
        if len(text_items) >= need:
            # Move last N text items from qbody to options
            fallback = text_items[-need:]
            qbody = [x for i, x in enumerate(qbody) if x not in fallback]
            for t in fallback:
                opts.append((chr(65 + len(opts)), t))

    qt = ' '.join(qbody).strip()
    while len(opts) < 4: opts.append(('?', ''))
    questions.append((num, qt, opts[:4]))

# Group into papers
papers, cp = [], []
for q in questions:
    if q[0] == 1 and cp: papers.append(cp); cp = []
    cp.append(q)
if cp: papers.append(cp)

os.makedirs(OUTDIR, exist_ok=True)

KNOWN = [('0455/11','May/June','2021'),('0455/12','May/June','2021'),('0455/13','May/June','2021'),
         ('0455/11','Oct/Nov','2021'),('0455/12','Oct/Nov','2021'),('0455/13','Oct/Nov','2021'),
         ('0455/11','May/June','2022'),('0455/12','May/June','2022'),('0455/13','May/June','2022'),
         ('0455/11','Oct/Nov','2022')]

for pi, paper in enumerate(papers):
    if pi < len(KNOWN): code, session, year = KNOWN[pi]
    else: code, session, year = ('0455_XX','Unknown',f'Seq{pi-9}')
    fname = f"{code.replace('/','_')}_{session.replace('/','')}_{year}.md"
    path = os.path.join(OUTDIR, fname)
    complete = sum(1 for _,_,o in paper if o[3][1])
    with open(path, 'w', encoding='utf-8') as f:
        f.write(f"## {code} {session} {year} · IGCSE Economics Paper 1\n\n")
        letters = 'ABCD'
        for num, qt, opts in paper:
            missing = sum(1 for _, t in opts if not t)
            f.write(f"### Q{num}")
            if missing: f.write(f" ⚠️ missing {missing} option(s)")
            f.write(f"\n{qt}\n\n")
            for li, t in enumerate(opts):
                if t: f.write(f"- {letters[li]}) {t}\n")
                else: f.write(f"- {letters[li]}) ⚠️ MISSING\n")
            f.write(f"\n> Answer: ?\n\n")

    imgs = sum(1 for _,qt,_ in paper if '![' in qt)
    tbls = sum(1 for _,qt,_ in paper if '|---' in qt)
    print(f"  {fname}: {len(paper)} Qs ({complete} complete), {imgs} img, {tbls} tbl")

total = sum(len(p) for p in papers)
print(f"\nTotal: {total} questions in {len(papers)} papers")
PYEOF
