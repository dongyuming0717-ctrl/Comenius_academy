import { useState, useEffect } from 'react';
import { MathText } from './MathText';
import type { TopicTag } from '../data/tagColors';
import { TAG_LABEL } from '../data/tagColors';

interface QuestionEntry {
  year: number; paperNumber: 1|2; questionIndex: number;
  text: string; correctAnswer: number;
  userAnswer: number | null;
  status: 'correct'|'incorrect'|'not_attempted';
  topic: TopicTag;
  question: { image_url?: string; options: string[]; topic?: string };
}

export function PracticeModal({ entry: q, allEntries, onClose, onAnswer }: {
  entry: QuestionEntry;
  allEntries: QuestionEntry[];
  onClose: () => void;
  onAnswer?: (id: string, selected: number, correct: boolean) => void;
}) {
  const currentIdx = allEntries.findIndex(e => e.year===q.year && e.paperNumber===q.paperNumber && e.questionIndex===q.questionIndex);
  const [idx, setIdx] = useState(Math.max(0, currentIdx));
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const cur = allEntries[idx] || q;
  const options = Array.isArray(cur.question.options) ? cur.question.options : [];
  const hasPrev = idx > 0; const hasNext = idx < allEntries.length - 1;

  useEffect(() => { setSelected(null); setRevealed(false); }, [idx]);

  const handleCheck = () => {
    if (selected === null || revealed) return;
    setRevealed(true);
    onAnswer?.(`${cur.year}p${cur.paperNumber}q${cur.questionIndex+1}`, selected, selected === cur.correctAnswer);
  };

  const isCorrect = revealed && selected === cur.correctAnswer;

  return (
    <div style={{position:'fixed',inset:0,zIndex:1000,background:'#fff',display:'flex',flexDirection:'column',fontFamily:"'Inter',system-ui,-apple-system,sans-serif"}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 24px',height:48,flexShrink:0,background:'#1e40af'}}>
        <span style={{fontSize:14,fontWeight:500,color:'#fff'}}>Practice — Q{idx+1} of {allEntries.length}</span>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <span style={{fontSize:12,color:'rgba(255,255,255,0.7)'}}>{cur.year} P{cur.paperNumber} · {TAG_LABEL[cur.topic]}</span>
          <button onClick={onClose} style={{background:'none',border:'none',color:'#fff',fontSize:20,cursor:'pointer'}}>×</button>
        </div>
      </div>
      <div style={{flex:1,overflowY:'auto',padding:'32px',background:'#f8fafc'}}>
        <div style={{maxWidth:720,margin:'0 auto'}}>
          <div style={{background:'#fff',borderRadius:12,border:'1px solid #e2e8f0',overflow:'hidden'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 24px',background:'#fafafa',borderBottom:'1px solid #e2e8f0'}}>
              <span style={{fontSize:15,fontWeight:600,color:'#1e293b'}}>Question {idx+1}</span>
              {revealed && <span style={{fontSize:13,fontWeight:600,padding:'3px 12px',borderRadius:4,color:isCorrect?'#16a34a':'#dc2626',background:isCorrect?'#dcfce7':'#fef2f2'}}>{isCorrect?'✅ Correct!':'❌ Incorrect'}</span>}
            </div>
            <div style={{padding:'24px 28px'}}>
              <p style={{fontSize:15,fontWeight:500,lineHeight:1.75,color:'#1e293b',margin:'0 0 20px'}}><MathText text={cur.text}/></p>
              {cur.question.image_url && <img src={cur.question.image_url} alt="Figure" style={{width:'100%',maxWidth:400,display:'block',margin:'0 auto 20px',borderRadius:8}}/>}
              <div style={{display:'flex',flexDirection:'column',gap:10}}>
                {options.map((opt,i) => {
                  let bg='#fff', border='2px solid #e5e7eb', dotBorder='#e2e8f0', dotBg='transparent', textColor='#374151';
                  if (revealed && i===cur.correctAnswer) { bg='#dcfce7'; border='2px solid #16a34a'; dotBorder='#16a34a'; dotBg='#16a34a'; textColor='#16a34a'; }
                  else if (revealed && selected===i && i!==cur.correctAnswer) { bg='#fef2f2'; border='2px solid #dc2626'; dotBorder='#dc2626'; dotBg='#dc2626'; textColor='#dc2626'; }
                  else if (!revealed && selected===i) { bg='#eff6ff'; border='2px solid #3b82f6'; dotBorder='#3b82f6'; dotBg='#3b82f6'; textColor='#1e40af'; }
                  return (
                    <div key={i} onClick={() => { if(!revealed) setSelected(i); }} style={{display:'flex',alignItems:'center',gap:14,padding:'12px 18px',background:bg,border,borderRadius:8,cursor:revealed?'default':'pointer'}}>
                      <span style={{width:20,height:20,borderRadius:'50%',border:`2px solid ${dotBorder}`,background:dotBg,flexShrink:0}}/>
                      <span style={{flex:1,fontSize:14,color:textColor,lineHeight:1.5}}><MathText text={opt}/></span>
                      {revealed && i===cur.correctAnswer && <span style={{fontSize:12,color:'#16a34a',fontWeight:600}}>Correct</span>}
                      {revealed && selected===i && i!==cur.correctAnswer && <span style={{fontSize:12,color:'#dc2626',fontWeight:600}}>Your Answer</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {!revealed && (
            <div style={{marginTop:20,textAlign:'center'}}>
              <button onClick={handleCheck} disabled={selected===null} style={{padding:'12px 48px',fontSize:15,fontWeight:600,color:'#fff',background:selected!==null?'#1e40af':'#cbd5e1',border:'none',borderRadius:8,cursor:selected!==null?'pointer':'default',fontFamily:"'Inter',system-ui,-apple-system,sans-serif"}}>Check Answer</button>
            </div>
          )}
          {revealed && (
            <div style={{marginTop:16,display:'flex',gap:8,justifyContent:'center'}}>
              <button onClick={() => { setSelected(null); setRevealed(false); }} style={{padding:'8px 18px',fontSize:12,fontWeight:500,color:'#d97706',background:'#fffbeb',border:'1px solid #fcd34d',borderRadius:6,cursor:'pointer',fontFamily:"'Inter',system-ui,-apple-system,sans-serif"}}>🔄 Retry</button>
            </div>
          )}
        </div>
      </div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 24px',flexShrink:0,background:'#fff',borderTop:'1px solid #e2e8f0'}}>
        <button onClick={onClose} style={{padding:'8px 24px',borderRadius:6,border:'1px solid #d1d5db',background:'#fff',cursor:'pointer',fontSize:14,color:'#374151',fontFamily:"'Inter',system-ui,-apple-system,sans-serif"}}>Close</button>
        <div style={{display:'flex',gap:12}}>
          <button disabled={!hasPrev} onClick={() => setIdx(i=>i-1)} style={{padding:'8px 24px',borderRadius:6,border:'1px solid #d1d5db',background:'#fff',cursor:hasPrev?'pointer':'default',opacity:hasPrev?1:.4,fontSize:14,color:'#374151',fontFamily:"'Inter',system-ui,-apple-system,sans-serif"}}>← Previous</button>
          <button disabled={!hasNext} onClick={() => setIdx(i=>i+1)} style={{padding:'8px 24px',borderRadius:6,background:'#1e40af',color:'#fff',border:'none',cursor:hasNext?'pointer':'default',opacity:hasNext?1:.4,fontSize:14,fontWeight:500,fontFamily:"'Inter',system-ui,-apple-system,sans-serif"}}>Next →</button>
        </div>
      </div>
    </div>
  );
}
