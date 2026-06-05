#!/usr/bin/env python3
"""MCQ Parser — .docx or .html → standard MCQ Markdown."""
import sys, os, re

INPUT = sys.argv[1]
OUTDIR = sys.argv[2] if len(sys.argv) > 2 else os.path.join(os.path.dirname(INPUT), 'parsed')
EXT = INPUT.rsplit('.', 1)[-1].lower()

items = []

# ── Input: .docx ──
if EXT == 'docx':
    from docx import Document
    from docx.oxml.ns import qn
    doc = Document(INPUT)
    pi = ti = 0
    for child in doc.element.body:
        if child.tag == qn('w:p'):
            t = doc.paragraphs[pi].text.strip()
            pi += 1
            if t:
                items.append(('p', t))
        elif child.tag == qn('w:tbl') and ti < len(doc.tables):
            tbl = doc.tables[ti]
            ti += 1
            rows = []
            for row in tbl.rows:
                cells = [cell.text.strip() for cell in row.cells]
                rows.append('| ' + ' | '.join(cells) + ' |')
            if rows:
                md = rows[0] + '\n|' + '|'.join(['---'] * len(rows[0].split('|'))) + '|'
                for r in rows[1:]:
                    md += '\n' + r
                items.append(('table', md))

# ── Input: .html ──
elif EXT == 'html':
    from html.parser import HTMLParser

    class MCQHTMLParser(HTMLParser):
        def __init__(self):
            super().__init__()
            self.items = []
            self.cur = ''
            self.ip = False
            self.td = 0
            self.trs = []
            self.tcs = []
            self.ir = False

        def handle_starttag(self, tag, attrs):
            if tag == 'p':
                self.ip = True
                self.cur = ''
            elif tag == 'img':
                for k, v in attrs:
                    if k == 'src':
                        self.items.append(('img', v))
            elif tag == 'table':
                self.td += 1
                self.trs = []
            elif tag == 'tr' and self.td > 0:
                self.ir = True
                self.tcs = []
            elif tag in ('td', 'th') and self.ir:
                self.cur = ''

        def handle_endtag(self, tag):
            if tag == 'p':
                self.ip = False
                t = self.cur.strip()
                if t:
                    self.items.append(('p', t))
            elif tag == 'table':
                self.td -= 1
                if self.td == 0 and self.trs:
                    ls = []
                    for ri, r in enumerate(self.trs):
                        ls.append('| ' + ' | '.join(r) + ' |')
                        if ri == 0 and r:
                            ls.append('|' + '|'.join(['---'] * len(r)) + '|')
                    self.items.append(('table', '\n'.join(ls)))
            elif tag == 'tr':
                self.ir = False
                if self.tcs:
                    self.trs.append(self.tcs)
            elif tag in ('td', 'th'):
                self.tcs.append(self.cur.strip())

        def handle_data(self, data):
            if self.ip:
                self.cur += data
            elif self.ir:
                self.cur += data

    with open(INPUT, encoding='utf-8') as f:
        html = f.read()
    p = MCQHTMLParser()
    p.feed(html)
    items = p.items

else:
    print(f"Unsupported format: .{EXT}")
    sys.exit(1)

# ── Find first question ──
start = 0
for i, (tag, text) in enumerate(items):
    if tag == 'p' and re.match(r'^\d{1,2}\s+[A-Z]', text):
        start = i
        break
items = items[start:]

# ── Group by question number ──
blocks, cur = [], []
for el in items:
    tag, text = el
    if tag == 'p' and re.match(r'^\d{1,2}\s+[A-Z]', text) and cur:
        blocks.append(cur)
        cur = [el]
    else:
        cur.append(el)
if cur:
    blocks.append(cur)

# ── Parse each block: A/B/C/D = options, rest = question ──
questions = []
for block in blocks:
    if not block or block[0][0] != 'p':
        continue
    m = re.match(r'^(\d{1,2})\s+', block[0][1])
    if not m:
        continue
    num = int(m.group(1))
    if not (1 <= num <= 30):
        continue

    qbody = [re.sub(r'^\d{1,2}\s+', '', block[0][1])]
    opts = []

    for tag, text in block[1:]:
        if tag == 'img':
            qbody.append(f'![image]({text})')
        elif tag == 'table':
            qbody.append(f'\n{text}\n')
        elif tag == 'p':
            t = text.strip()
            if not t or re.match(r'^\d+$', t):
                continue
            m2 = re.match(r'^([A-D])\s+(.+)', t)
            if m2:
                opts.append((m2.group(1), m2.group(2)))
            else:
                qbody.append(t)

    # Fallback: if <4 labeled options, use last N text items from qbody
    if len(opts) < 4:
        text_only = [x for x in qbody if not x.startswith('![') and not x.startswith('\n|')]
        need = 4 - len(opts)
        if len(text_only) >= need:
            fallback = text_only[-need:]
            qbody = [x for x in qbody if x not in fallback]
            for t in fallback:
                opts.append((chr(65 + len(opts)), t))

    qt = ' '.join(qbody).strip()
    while len(opts) < 4:
        opts.append(('?', ''))
    questions.append((num, qt, opts[:4]))

# ── Group papers (Q1 = new paper) ──
papers, cp = [], []
for q in questions:
    if q[0] == 1 and cp:
        papers.append(cp)
        cp = []
    cp.append(q)
if cp:
    papers.append(cp)

# ── Save ──
os.makedirs(OUTDIR, exist_ok=True)
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
    else:
        code, session, year = ('0455_XX', 'Unknown', f'P{pi+1}')
    fname = f"{code.replace('/','_')}_{session.replace('/','')}_{year}.md"
    path = os.path.join(OUTDIR, fname)
    complete = sum(1 for _, _, o in paper if o[3][1])

    with open(path, 'w', encoding='utf-8') as f:
        f.write(f"## {code} {session} {year} · IGCSE Economics Paper 1\n\n")
        letters = 'ABCD'
        for num, qt, opts in paper:
            missing = sum(1 for _, t in opts if not t)
            f.write(f"### Q{num}")
            if missing:
                f.write(f" ⚠️ missing {missing}")
            f.write(f"\n{qt}\n\n")
            for li, (_, t) in enumerate(opts):
                if t:
                    f.write(f"- {letters[li]}) {t}\n")
                else:
                    f.write(f"- {letters[li]}) ⚠️ MISSING\n")
            f.write(f"\n> Answer: ?\n\n")

    imgs = sum(1 for _, qt, _ in paper if '![' in qt)
    tbls = sum(1 for _, qt, _ in paper if '|---' in qt)
    print(f"  {fname}: {len(paper)} Qs ({complete} OK), {imgs} img, {tbls} tbl")

total = sum(len(p) for p in papers)
print(f"\nTotal: {total} questions in {len(papers)} papers")
print(f"Saved: {OUTDIR}")
