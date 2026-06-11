import * as fs from 'fs';

const configs = [
  {
    name: 'IGCSE', level: 'igcse',
    file: '/Users/wushuang/Desktop/Econ_P1_2021-2025_All-20260602095035/Econ_P1_2021-2025_All.tex',
    imagePrefix: '/images/econ-mcq/',
    outputFile: '/Users/wushuang/Desktop/comenius_academy-main/client/src/data/economicsIGCSE.ts',
    exportName: 'economicsIGCSEPapers',
  },
  {
    name: 'AS', level: 'as-level',
    file: '/Users/wushuang/Desktop/1/Econ_AS_P1_2021-2025_Merged.tex',
    imagePrefix: '/images/econ-as-mcq/',
    outputFile: '/Users/wushuang/Desktop/comenius_academy-main/client/src/data/economicsAS.ts',
    exportName: 'economicsASPapers',
  },
  {
    name: 'A2', level: 'a2-level',
    file: '/Users/wushuang/Desktop/Econ_P3_2021-2025_Merged-20260602094945/Econ_P3_2021-2025_Merged.tex',
    imagePrefix: '/images/econ-a2-mcq/',
    outputFile: '/Users/wushuang/Desktop/comenius_academy-main/client/src/data/economicsA2.ts',
    exportName: 'economicsA2Papers',
  },
];

function extractImageFilename(line) {
  const m = line.match(/includegraphics.*\{images\/(.+?)\}/);
  return m ? m[1] : null;
}

function parseQuestions(lines, imagePrefix) {
  const questions = [];
  let currentQ = null;
  let inTable = false;
  let tableLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Image detection — MUST come before generic LaTeX skip
    const imgName = extractImageFilename(line);
    if (imgName && currentQ) {
      currentQ.image = imagePrefix + imgName;
      continue;
    }

    // Table collection — MUST come before generic LaTeX skip
    if (line.startsWith('\\begin{tabular}')) {
      inTable = true;
      tableLines = [line];
      continue;
    }
    if (inTable) {
      tableLines.push(line);
      if (line.startsWith('\\end{tabular}')) {
        inTable = false;
        const tableHtml = latexTableToHtml(tableLines.join('\n'));
        // Classify: option table vs data table
        const isOption = /\\textbf\{([A-D])\}/.test(tableLines.join('\n')) || /^[A-D]\s/.test(tableLines.join('\n'));
        if (isOption) {
          // Parse options from table
          const rows = tableLines.join('\n').split('\\\\');
          for (const row of rows) {
            const om = row.match(/^([A-D])\s+(.+)/);
            if (om && currentQ && currentQ.options.length < 4) {
              currentQ.options.push({ label: om[1], text: om[2].replace(/\\\\/g, '').replace(/&/g, ' | ').replace(/\\hline/, '').trim() });
            }
          }
        } else {
          if (currentQ) currentQ.table = tableHtml;
        }
        tableLines = [];
      }
      continue;
    }

    // Skip other LaTeX commands (but image detection already handled above)
    if (line.match(/^\\/)) continue;

    // Question start: number followed by space and text
    const qm = line.match(/^(\d{1,2})\s+([A-Z].+)/);
    if (qm && parseInt(qm[1]) >= 1 && parseInt(qm[1]) <= 30) {
      if (currentQ && currentQ.options.length >= 4 && currentQ.text.length > 5) {
        questions.push(currentQ);
      }
      currentQ = { id: parseInt(qm[1]), text: qm[2], options: [], correct: '' };
      continue;
    }
    if (!currentQ) continue;

    // Option
    const om = line.match(/^([A-D])\s+(.+)/);
    if (om) {
      // Prevent duplicate labels
      if (!currentQ.options.some(o => o.label === om[1])) {
        currentQ.options.push({ label: om[1], text: om[2] });
      }
      continue;
    }

    // OCR-damaged option: "3 text" where 3 is actually B (OCR misread)
    const damagedOm = line.match(/^([3-9])\s+(.+)/);
    if (damagedOm && currentQ.options.length > 0 && currentQ.options.length < 4) {
      const labels = currentQ.options.map(o => o.label);
      const expected = ['A', 'B', 'C', 'D'];
      const next = expected.find(l => !labels.includes(l));
      if (next && !line.match(/^\d+\s+[A-Z]/) && damagedOm[2].length > 3) {
        if (!currentQ.options.some(o => o.label === next)) {
          currentQ.options.push({ label: next, text: damagedOm[2] });
        }
        continue;
      }
    }

    // OCR-damaged option (missing label entirely): text without A-D prefix
    if (currentQ.options.length > 0 && currentQ.options.length < 4 && line.length > 3 && !line.match(/^\d+$/)) {
      const labels = currentQ.options.map(o => o.label);
      const expected = ['A', 'B', 'C', 'D'];
      const next = expected.find(l => !labels.includes(l));
      if (next && !line.match(/^\d+\s+[A-Z]/) && !line.match(/^\\/)) {
        if (!currentQ.options.some(o => o.label === next)) {
          currentQ.options.push({ label: next, text: line });
        }
        continue;
      }
    }

    // Continuation text (append to question if no options yet)
    if (currentQ.options.length === 0 && line && !line.startsWith('Permission') && !line.match(/^\d+$/)) {
      currentQ.text += ' ' + line;
    }
  }
  if (currentQ && currentQ.options.length >= 4 && currentQ.text.length > 5) {
    questions.push(currentQ);
  }
  return questions;
}

function latexTableToHtml(latex) {
  let cleaned = latex;
  // Remove \hline, \cline{...}
  cleaned = cleaned.replace(/\\hline\b/g, '');
  cleaned = cleaned.replace(/\\cline\{[^}]*\}/g, '');
  // Remove \phantom{...}
  cleaned = cleaned.replace(/\\phantom\{[^}]*\}/g, '');
  // Remove \textbf{...} → keep content
  cleaned = cleaned.replace(/\\textbf\{([^}]*)\}/g, '$1');
  // Remove \textit{...} → keep content
  cleaned = cleaned.replace(/\\textit\{([^}]*)\}/g, '$1');
  // Remove multi-column span markers {1-2}, {1-4} etc
  cleaned = cleaned.replace(/\{[0-9]+-[0-9]+\}/g, '');
  // Remove \adjustbox{...}{
  cleaned = cleaned.replace(/\\adjustbox\{[^}]*\}\{/g, '');
  // Remove \begin{center}, \end{center}
  cleaned = cleaned.replace(/\\begin\{center\}/g, '');
  cleaned = cleaned.replace(/\\end\{center\}/g, '');
  // Remove trailing }
  cleaned = cleaned.replace(/\}\s*$/gm, '');
  // Remove \begin{tabular}...{...} and \end{tabular}
  cleaned = cleaned.replace(/\\begin\{tabular\}\{[^}]*\}/g, '');
  cleaned = cleaned.replace(/\\end\{tabular\}/g, '');
  // Remove remaining LaTeX commands like \rowcolor, \cellcolor etc
  cleaned = cleaned.replace(/\\[a-zA-Z]+\b/g, '');
  // Remove remaining { and } that were part of LaTeX commands
  cleaned = cleaned.replace(/[{}]/g, '');
  // Clean up whitespace
  cleaned = cleaned.replace(/\n\s*\n/g, '\n').trim();

  const rows = cleaned.split('\\\\').filter(r => r.trim());
  let html = '<table>';
  for (const row of rows) {
    const cells = row.split('&');
    const cleanCells = cells.map(c => c.trim()).filter(c => c);
    if (cleanCells.length === 0) continue;
    html += '<tr>';
    for (const cell of cleanCells) {
      html += `<td>${cell.trim()}</td>`;
    }
    html += '</tr>';
  }
  html += '</table>';
  return html;
}

function extractPaperCode(lines) {
  for (const line of lines) {
    const m = line.trim().match(/^(0455|9708)\/\d{2}(\/[OMF]\/[JNS]\/\d{2})?/);
    if (m) return m[0];
  }
  return '';
}

function parsePaperDate(code) {
  if (!code) return { year: 0, session: 'Unknown' };
  const m = code.match(/\/([OMF])\/([JNS])\/(\d{2})$/);
  if (!m) return { year: 0, session: 'Unknown' };
  const sm = { M: 'May/June', J: 'May/June', O: 'Oct/Nov', N: 'Oct/Nov', F: 'Feb/March' };
  return { year: 2000 + parseInt(m[3]), session: sm[m[1]] || 'Unknown' };
}

// ─── Main ──────────────────────────────────────────────────────────
for (const cfg of configs) {
  console.log(`\n=== Processing ${cfg.name} LaTeX ===`);
  const tex = fs.readFileSync(cfg.file, 'utf8');

  // Remove preamble
  const body = tex.replace(/\\documentclass[\s\S]*?\\begin\{document\}/, '');
  const clean = body.replace(/\\end\{document\}[\s\S]*$/, '');
  const allLines = clean.split('\n');

  // Find Q1 starts as paper boundaries
  const q1Candidates = [];
  for (let i = 0; i < allLines.length; i++) {
    const line = allLines[i].trim();
    // Must match "1 CapitalLetter..." with at least 25 chars
    if (/^1\s+[A-Z]/.test(line) && line.length > 25) {
      q1Candidates.push(i);
    }
  }
  console.log(`  Found ${q1Candidates.length} Q1 candidates`);

  // Validate Q1 candidates: filter out false positives (sub-items within questions)
  // A real Q1 must have at least 15 questions before the next Q1
  const q1Starts = [];
  for (let bi = 0; bi < q1Candidates.length; bi++) {
    const start = q1Candidates[bi];
    const end = bi + 1 < q1Candidates.length ? q1Candidates[bi + 1] : allLines.length;
    const sectionLines = allLines.slice(start, end);
    // Count question starts in this section
    let qCount = 0;
    for (const line of sectionLines) {
      if (/^\d{1,2}\s+[A-Z]/.test(line.trim()) && line.trim().length > 10) qCount++;
    }
    // Also count distinct question numbers (handles renumbered questions)
    const qNums = new Set();
    for (const line of sectionLines) {
      const m = line.trim().match(/^(\d{1,2})\s+[A-Z]/);
      if (m) qNums.add(parseInt(m[1]));
    }
    if (qCount >= 15 || qNums.size >= 15) {
      q1Starts.push(start);
    } else {
      console.log(`  Reject false Q1 at line ${start + 1}: only ${qCount} questions (${qNums.size} distinct)`);
    }
  }
  console.log(`  After validation: ${q1Starts.length} real Q1 boundaries`);

  const papers = [];

  for (let bi = 0; bi < q1Starts.length; bi++) {
    const start = q1Starts[bi];
    const end = bi + 1 < q1Starts.length ? q1Starts[bi + 1] : allLines.length;
    const paperLines = allLines.slice(start, end);

    // Extract paper code from context before Q1
    const ctxStart = Math.max(0, start - 30);
    const contextLines = allLines.slice(ctxStart, start);
    let paperCode = '';
    for (const cl of contextLines) {
      const m = cl.trim().match(/^(0455|9708)\/\d{2}(\/[OMF]\/[JNS]\/\d{2})?/);
      if (m) { paperCode = m[0]; break; }
    }

    let questions = parseQuestions(paperLines, cfg.imagePrefix);

    if (questions.length >= 15) {
      const { year, session } = parsePaperDate(paperCode);

      // Split merged papers (>35 questions = two papers merged)
      if (questions.length > 35) {
        const internalQ1Idx = questions.findIndex((q, i) => i > 5 && q.id === 1);
        if (internalQ1Idx > 5) {
          const firstHalf = questions.slice(0, internalQ1Idx);
          const secondHalf = questions.slice(internalQ1Idx);
          console.log(`  Splitting merged: ${firstHalf.length} + ${secondHalf.length} questions`);

          firstHalf.forEach((q, idx) => { q.id = idx + 1; });
          papers.push({
            id: `econ-${cfg.level}-paper-${String(papers.length + 1).padStart(2, '0')}`,
            year: year || 2021, session: session || 'Unknown',
            paperCode: paperCode || `Paper ${String(papers.length + 1).padStart(2, '0')}`,
            questionData: firstHalf,
          });

          secondHalf.forEach((q, idx) => { q.id = idx + 1; });
          questions = secondHalf;
        }
      }

      questions.forEach((q, idx) => { q.id = idx + 1; });
      const paperId = paperCode
        ? `econ-${cfg.level}-${paperCode.replace(/\//g, '-')}`
        : `econ-${cfg.level}-paper-${String(papers.length + 1).padStart(2, '0')}`;

      papers.push({
        id: paperId, year: year || 2021, session: session || 'Unknown',
        paperCode: paperCode || `Paper ${String(papers.length + 1).padStart(2, '0')}`,
        questionData: questions,
      });
      const flag = questions.length < 25 ? ' (partial)' : '';
      console.log(`  ${paperCode || '(no code)'}: ${questions.length} questions${flag}`);
    }
  }

  // Dedup
  const seen = new Set();
  const deduped = [];
  for (const p of papers) {
    const fp = p.questionData.slice(0, 3).map(q => q.text.toLowerCase()).join('|||');
    if (seen.has(fp)) { console.log(`  DEDUP: ${p.paperCode}`); continue; }
    seen.add(fp);
    deduped.push(p);
  }

  // Validate
  let totalQ = 0;
  for (const p of deduped) {
    totalQ += p.questionData.length;
    const bad = p.questionData.filter(q => q.options.length !== 4);
    if (bad.length) console.log(`  WARN: ${p.paperCode} — ${bad.length} questions without 4 options`);
  }
  console.log(`  Total: ${deduped.length} papers, ${totalQ} questions`);

  // Generate TypeScript
  const lines = [];
  lines.push(`export interface MCQQuestion {`);
  lines.push(`  id: number;`);
  lines.push(`  text: string;`);
  lines.push(`  image?: string;`);
  lines.push(`  table?: string;`);
  lines.push(`  options: { label: string; text: string }[];`);
  lines.push(`  correct: string;`);
  lines.push(`}`);
  lines.push('');
  lines.push(`export interface MCQPaper {`);
  lines.push(`  id: string;`);
  lines.push(`  year: number;`);
  lines.push(`  session: string;`);
  lines.push(`  paperCode: string;`);
  lines.push(`  questionData: MCQQuestion[];`);
  lines.push(`}`);
  lines.push('');

  deduped.forEach((p, idx) => {
    const vn = `paper_${String(idx + 1).padStart(2, '0')}`;
    lines.push(`const ${vn}: MCQQuestion[] = ${JSON.stringify(p.questionData)};`);
    lines.push('');
  });

  lines.push(`export const ${cfg.exportName}: MCQPaper[] = [`);
  deduped.forEach((p, idx) => {
    const vn = `paper_${String(idx + 1).padStart(2, '0')}`;
    lines.push(`  { id: ${JSON.stringify(p.id)}, year: ${p.year}, session: ${JSON.stringify(p.session)}, paperCode: ${JSON.stringify(p.paperCode)}, questionData: ${vn} },`);
  });
  lines.push(`];`);
  lines.push('');
  lines.push(`export function getPaperQuestions(paperId: string): MCQQuestion[] | null {`);
  lines.push(`  const paper = ${cfg.exportName}.find(p => p.id === paperId);`);
  lines.push(`  return paper ? paper.questionData : null;`);
  lines.push(`}`);

  fs.writeFileSync(cfg.outputFile, lines.join('\n'));
  console.log(`  -> ${cfg.outputFile}`);
}

console.log('\n=== Done ===');
