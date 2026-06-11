import * as fs from 'fs';

const mdFile = '/Users/wushuang/Desktop/Econ_P1_2021-2025_All-20260609125456/Econ_P1_2021-2025_All.md';
const imagePrefix = '/images/econ-mcq/';
const outputFile = '/Users/wushuang/Desktop/comenius_academy-main/client/src/data/economicsIGCSE.ts';

const md = fs.readFileSync(mdFile, 'utf8');
const allLines = md.split('\n');

const igcseOrder = [
  { year: 2023, session: 'Feb/March', variant: 12 },
  { year: 2024, session: 'Feb/March', variant: 12 },
  { year: 2025, session: 'Feb/March', variant: 12 },
  { year: 2021, session: 'May/June', variant: 11 },
  { year: 2021, session: 'May/June', variant: 12 },
  { year: 2021, session: 'May/June', variant: 13 },
  { year: 2022, session: 'May/June', variant: 11 },
  { year: 2022, session: 'May/June', variant: 12 },
  { year: 2022, session: 'May/June', variant: 13 },
  { year: 2023, session: 'May/June', variant: 11 },
  { year: 2023, session: 'May/June', variant: 12 },
  { year: 2023, session: 'May/June', variant: 13 },
  { year: 2024, session: 'May/June', variant: 11 },
  { year: 2024, session: 'May/June', variant: 12 },
  { year: 2024, session: 'May/June', variant: 13 },
  { year: 2025, session: 'May/June', variant: 11 },
  { year: 2025, session: 'May/June', variant: 12 },
  { year: 2025, session: 'May/June', variant: 13 },
  { year: 2021, session: 'Oct/Nov', variant: 11 },
  { year: 2021, session: 'Oct/Nov', variant: 12 },
  { year: 2021, session: 'Oct/Nov', variant: 13 },
  { year: 2022, session: 'Oct/Nov', variant: 11 },
  { year: 2023, session: 'Oct/Nov', variant: 11 },
  { year: 2023, session: 'Oct/Nov', variant: 12 },
  { year: 2023, session: 'Oct/Nov', variant: 13 },
  { year: 2024, session: 'Oct/Nov', variant: 11 },
  { year: 2024, session: 'Oct/Nov', variant: 12 },
  { year: 2025, session: 'Oct/Nov', variant: 11 },
  { year: 2025, session: 'Oct/Nov', variant: 12 },
  { year: 2025, session: 'Oct/Nov', variant: 13 },
];

const orderPapers = igcseOrder.map(o => ({
  year: o.year, session: o.session,
  paperCode: '0455/' + String(o.variant).padStart(2, '0'),
}));

const seasonCode = s => ({ 'Feb/March': 'fm', 'May/June': 'mj', 'Oct/Nov': 'on' }[s] || s.toLowerCase().slice(0, 2));

// Find Q1 starts
const q1s = [];
for (let i = 0; i < allLines.length; i++) {
  const l = allLines[i].trim();
  if (/^1\s+[A-Z]/.test(l) && l.length > 25) {
    q1s.push(i);
    if (q1s.length === 30) break;
  }
}
console.log('Q1 boundaries: ' + q1s.length);

function parsePaper(lines) {
  const qPositions = [];
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i].trim();
    if (/^\d{1,2}\s+[A-Z]/.test(l) && l.length > 10) {
      qPositions.push({ idx: i, num: parseInt(l.match(/^(\d+)/)[1]) });
    }
  }
  const questions = [];
  for (let qi = 0; qi < qPositions.length; qi++) {
    const { idx, num } = qPositions[qi];
    const nextIdx = qi + 1 < qPositions.length ? qPositions[qi + 1].idx : lines.length;
    const block = lines.slice(idx, nextIdx);
    let text = block[0].trim().replace(/^\d+\s+/, '');
    const options = [];
    let image = null;
    let table = null;

    for (let i = 1; i < block.length; i++) {
      const line = block[i].trim();
      if (!line) continue;
      if (line.startsWith('<table>')) {
        const tbl = line;
        if (/<tr><td>([A-D])<\/td>/i.test(tbl) && options.length === 0) {
          const rows = [...tbl.matchAll(/<tr><td>([A-D])<\/td>\s*(.*?)\s*<\/tr>/gis)];
          for (const r of rows) {
            const txt = r[2].replace(/<\/td>\s*<td>/g, ' | ').replace(/<\/?td\s*>/g, '').trim();
            options.push({ label: r[1], text: txt });
          }
        } else {
          table = tbl;
        }
        continue;
      }
      if (line.startsWith('![')) {
        const m = line.match(/images\/(.+?\.(?:jpg|png|jpeg))/);
        if (m) image = imagePrefix + m[1];
        continue;
      }
      const om = line.match(/^([A-D])\s+(.+)/);
      if (om) {
        if (!options.some(o => o.label === om[1])) options.push({ label: om[1], text: om[2] });
        continue;
      }
      // Inline options: split by B/C/D labels
      if (/^A\s+/.test(line) && /\s+B\s+/.test(line) && options.length === 0) {
        let rest = line.replace(/^A\s+/, '');
        const parts = rest.split(/\s+B\s+/);
        if (parts.length >= 2) {
          const aText = parts[0];
          const bcText = parts.slice(1).join(' B ');
          const bcParts = bcText.split(/\s+C\s+/);
          let bText = bcParts[0];
          let cdText = bcParts.length >= 2 ? bcParts.slice(1).join(' C ') : '';
          if (cdText) {
            const cdParts = cdText.split(/\s+D\s+/);
            const cText = cdParts[0];
            const dText = cdParts.slice(1).join(' D ');
            options.push({ label: 'A', text: aText.trim() });
            options.push({ label: 'B', text: bText.trim() });
            options.push({ label: 'C', text: cText.trim() });
            options.push({ label: 'D', text: dText.trim() });
            continue;
          }
        }
      }
      // OCR: 3 → B
      const dmg = line.match(/^([3-9])\s+(.+)/);
      if (dmg && options.length > 0 && options.length < 4) {
        const labels = options.map(o => o.label);
        const next = ['A','B','C','D'].find(l => !labels.includes(l));
        if (next && dmg[2].length > 3 && !options.some(o => o.label === next)) {
          options.push({ label: next, text: dmg[2] });
        }
        continue;
      }
      // Missing label
      if (options.length > 0 && options.length < 4 && line.length > 3 && !/^\d/.test(line)) {
        const labels = options.map(o => o.label);
        const next = ['A','B','C','D'].find(l => !labels.includes(l));
        if (next && !line.match(/^\d+\s+[A-Z]/) && !options.some(o => o.label === next)) {
          options.push({ label: next, text: line });
        }
        continue;
      }
      // Continuation text
      if (options.length === 0 && line && !line.startsWith('Permission') && !line.startsWith('©') && !line.startsWith('© UCLES') && !line.match(/^\d+$/)) {
        text += ' ' + line;
      }
    }
    const q = { id: num, text: text.replace(/\s+/g, ' ').trim(), options, correct: '' };
    if (image) q.image = image;
    if (table) q.table = table;
    if (options.length >= 4 && text.length > 5) questions.push(q);
  }
  return questions;
}

// Parse all papers
const allPapers = [];
for (let bi = 0; bi < q1s.length; bi++) {
  const start = q1s[bi];
  const end = bi + 1 < q1s.length ? q1s[bi + 1] : allLines.length;
  let questions = parsePaper(allLines.slice(start, end));
  if (questions.length > 35) {
    const splitIdx = questions.findIndex((q, i) => i > 5 && q.id === 1);
    if (splitIdx > 5) {
      const first = questions.slice(0, splitIdx);
      const second = questions.slice(splitIdx);
      first.forEach((q, idx) => { q.id = idx + 1; });
      second.forEach((q, idx) => { q.id = idx + 1; });
      allPapers.push(first);
      questions = second;
    }
  }
  if (questions.length >= 15) {
    questions.forEach((q, idx) => { q.id = idx + 1; });
    allPapers.push(questions);
  }
}

const count = Math.min(allPapers.length, orderPapers.length);
console.log('Parsed: ' + allPapers.length + ' papers, ' + allPapers.reduce((s,p)=>s+p.length,0) + ' questions');

// Show paper metadata
for (let i = 0; i < Math.min(10, count); i++) {
  const o = orderPapers[i];
  console.log('  Paper ' + (i+1) + ': ' + o.session + ' ' + o.year + ' ' + o.paperCode + ' - ' + allPapers[i].length + 'qs');
}

// Generate output
const lines = [];
lines.push('export interface MCQQuestion { id: number; text: string; image?: string; table?: string;');
lines.push('  options: { label: string; text: string }[]; correct: string; }');
lines.push('export interface MCQPaper { id: string; year: number; session: string; paperCode: string; questionData: MCQQuestion[]; }');
lines.push('');

for (let i = 0; i < count; i++) {
  const vn = 'paper_' + String(i+1).padStart(2,'0');
  lines.push('const ' + vn + ': MCQQuestion[] = ' + JSON.stringify(allPapers[i]) + ';');
  lines.push('');
}

lines.push('export const economicsIGCSEPapers: MCQPaper[] = [');
for (let i = 0; i < count; i++) {
  const vn = 'paper_' + String(i+1).padStart(2,'0');
  const o = orderPapers[i];
  const sc = seasonCode(o.session);
  const id = 'econ-igcse-0455-' + sc + String(o.year).slice(2) + '-v' + o.variant;
  lines.push('  { id: ' + JSON.stringify(id) + ', year: ' + o.year + ', session: ' + JSON.stringify(o.session) + ', paperCode: ' + JSON.stringify(o.paperCode) + ', questionData: ' + vn + ' },');
}
lines.push('];');
lines.push('');
lines.push('export function getPaperQuestions(paperId: string): MCQQuestion[] | null {');
lines.push('  const paper = economicsIGCSEPapers.find(p => p.id === paperId);');
lines.push('  return paper ? paper.questionData : null;');
lines.push('}');

fs.writeFileSync(outputFile, lines.join('\n'));

let totalQ = 0, tbl = 0, img = 0;
for (const p of allPapers) { totalQ += p.length; for (const q of p) { if (q.table) tbl++; if (q.image) img++; } }
console.log('\nWritten: ' + allPapers.length + ' papers, ' + totalQ + ' questions, ' + tbl + ' tables, ' + img + ' images');
