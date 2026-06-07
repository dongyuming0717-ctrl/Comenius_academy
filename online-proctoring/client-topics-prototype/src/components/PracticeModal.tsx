import { useState, useEffect } from 'react';
import type { Question, TopicTag } from '../data/types';
import { TAG_LABEL } from '../data/types';
import { DifficultyBadge } from './DifficultyBadge';
import { MathText } from './MathText';

interface Props {
  question: Question;
  questions: Question[];          // all questions in current filtered list
  onClose: () => void;
  onAnswer?: (questionId: string, selected: number, correct: boolean) => void;
}

export function PracticeModal({ question, questions, onClose, onAnswer }: Props) {
  const [currentIdx, setCurrentIdx] = useState(() =>
    questions.findIndex(q => q.id === question.id)
  );
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [showAIHint, setShowAIHint] = useState(false);

  const q = questions[currentIdx] || question;
  const hasPrev = currentIdx > 0;
  const hasNext = currentIdx < questions.length - 1;

  // Reset state when navigating
  useEffect(() => {
    setSelected(null);
    setRevealed(false);
    setShowAIHint(false);
  }, [currentIdx]);

  const handleSelectOption = (idx: number) => {
    if (revealed) return;
    setSelected(idx);
  };

  const handleCheck = () => {
    if (selected === null || revealed) return;
    setRevealed(true);
    onAnswer?.(q.id, selected, selected === q.answer);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft' && hasPrev) setCurrentIdx(c => c - 1);
    if (e.key === 'ArrowRight' && hasNext) setCurrentIdx(c => c + 1);
  };

  const isCorrect = revealed && selected === q.answer;
  const isWrong = revealed && selected !== null && selected !== q.answer;
  const correctLetter = String.fromCharCode(65 + q.answer);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: '#fff', display: 'flex', flexDirection: 'column',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    }} onKeyDown={handleKeyDown} tabIndex={0}>
      {/* Top Bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', height: 48, flexShrink: 0,
        background: '#1e40af',
      }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: '#fff' }}>
          Practice — Q{currentIdx + 1} of {questions.length}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>
            {q.year} P{q.paperNumber} · {TAG_LABEL[q.primary_topic]}
          </span>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer',
            width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>×</button>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '32px', background: '#f8fafc' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          {/* Question card */}
          <div style={{
            background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}>
            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 24px', background: '#fafafa',
              borderBottom: '1px solid #e2e8f0',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: '#1e293b' }}>
                  Question {currentIdx + 1}
                </span>
                <DifficultyBadge difficulty={q.difficulty} size="md" />
              </div>
              {revealed && (
                <span style={{
                  fontSize: 13, fontWeight: 600, padding: '3px 12px', borderRadius: 4,
                  color: isCorrect ? '#16a34a' : '#dc2626',
                  background: isCorrect ? '#dcfce7' : '#fef2f2',
                }}>
                  {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
                </span>
              )}
            </div>

            <div style={{ padding: '24px 28px' }}>
              {/* Question text */}
              <p style={{
                fontSize: 15, fontWeight: 500, lineHeight: 1.75,
                color: '#1e293b', margin: '0 0 20px 0',
              }}>
                <MathText text={q.text} />
              </p>

              {q.image_url && (
                <img src={q.image_url} alt="Figure"
                  style={{ width: '100%', maxWidth: 400, display: 'block', margin: '0 auto 20px', borderRadius: 8 }} />
              )}

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {q.options.map((opt, i) => {
                  const isCorrectAns = i === q.answer;
                  const isUserSel = selected === i;
                  let bg = '#fff', border = '2px solid #e5e7eb', dotBorder = '#e2e8f0', dotBg = 'transparent', textColor = '#374151';

                  if (revealed && isCorrectAns) {
                    bg = '#dcfce7'; border = '2px solid #16a34a'; dotBorder = '#16a34a'; dotBg = '#16a34a'; textColor = '#16a34a';
                  } else if (revealed && isUserSel && !isCorrectAns) {
                    bg = '#fef2f2'; border = '2px solid #dc2626'; dotBorder = '#dc2626'; dotBg = '#dc2626'; textColor = '#dc2626';
                  } else if (!revealed && isUserSel) {
                    bg = '#eff6ff'; border = '2px solid #3b82f6'; dotBorder = '#3b82f6'; dotBg = '#3b82f6'; textColor = '#1e40af';
                  }

                  return (
                    <div key={i} onClick={() => handleSelectOption(i)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 14,
                        padding: '12px 18px', background: bg, border, borderRadius: 8,
                        cursor: revealed ? 'default' : 'pointer',
                        transition: 'all 0.1s',
                      }}>
                      <span style={{
                        width: 20, height: 20, borderRadius: '50%',
                        border: `2px solid ${dotBorder}`, background: dotBg,
                        flexShrink: 0, transition: 'all 0.1s',
                      }} />
                      <span style={{ flex: 1, fontSize: 14, color: textColor, lineHeight: 1.5 }}>
                        <MathText text={opt} />
                      </span>
                      {revealed && isCorrectAns && <span style={{ fontSize: 12, color: '#16a34a', fontWeight: 600 }}>Correct Answer</span>}
                      {revealed && isUserSel && !isCorrectAns && <span style={{ fontSize: 12, color: '#dc2626', fontWeight: 600 }}>Your Answer</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Result area */}
          {revealed && (
            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{
                background: isCorrect ? '#dcfce7' : '#fef2f2',
                border: `1px solid ${isCorrect ? '#86efac' : '#fca5a5'}`,
                borderRadius: 8, padding: '12px 20px',
                fontSize: 14, color: isCorrect ? '#16a34a' : '#dc2626',
                fontWeight: 500,
              }}>
                {isCorrect
                  ? 'Great job! Your answer is correct.'
                  : `Not quite. Your answer was ${String.fromCharCode(65 + selected!)}. The correct answer is ${correctLetter}.`}
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => setShowAIHint(!showAIHint)}
                  style={{
                    padding: '8px 18px', fontSize: 12, fontWeight: 500,
                    color: '#1e40af', background: '#eff6ff',
                    border: '1px solid #bfdbfe', borderRadius: 6, cursor: 'pointer',
                    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                  }}>
                  💡 {showAIHint ? 'Hide' : 'Show'} Hint
                </button>
                <button onClick={() => { setSelected(null); setRevealed(false); }}
                  style={{
                    padding: '8px 18px', fontSize: 12, fontWeight: 500,
                    color: '#d97706', background: '#fffbeb',
                    border: '1px solid #fcd34d', borderRadius: 6, cursor: 'pointer',
                    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                  }}>🔄 Retry</button>
              </div>

              {showAIHint && (
                <div style={{
                  background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8,
                  padding: '14px 18px', fontSize: 13, color: '#64748b', lineHeight: 1.6,
                }}>
                  <strong style={{ color: '#1e293b' }}>AI Hint:</strong>{' '}
                  {q.difficulty === 'easy'
                    ? 'This is a straightforward question. Review the basic concepts and try applying the formula directly.'
                    : q.difficulty === 'medium'
                    ? 'Break the problem into steps. Identify which two concepts are being combined here, and solve each part separately.'
                    : 'This is a challenging question. Try working backwards from the answer choices, or draw a diagram to visualize the problem.'}
                  {' '}Topics: {q.topics.map(t => TAG_LABEL[t]).join(', ')}.
                </div>
              )}
            </div>
          )}

          {/* Submit / Check button */}
          {!revealed && (
            <div style={{ marginTop: 20, textAlign: 'center' }}>
              <button onClick={handleCheck}
                disabled={selected === null}
                style={{
                  padding: '12px 48px', fontSize: 15, fontWeight: 600,
                  color: '#fff',
                  background: selected !== null ? '#1e40af' : '#cbd5e1',
                  border: 'none', borderRadius: 8, cursor: selected !== null ? 'pointer' : 'default',
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                }}>
                Check Answer
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom navigation */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '10px 24px', flexShrink: 0,
        background: '#fff', borderTop: '1px solid #e2e8f0',
      }}>
        <button onClick={onClose} style={{
          padding: '8px 24px', borderRadius: 6, border: '1px solid #d1d5db', background: '#fff',
          cursor: 'pointer', fontSize: 14, color: '#374151',
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        }}>Close</button>
        <div style={{ display: 'flex', gap: 12 }}>
          <button disabled={!hasPrev} onClick={() => setCurrentIdx(c => c - 1)} style={{
            padding: '8px 24px', borderRadius: 6, border: '1px solid #d1d5db', background: '#fff',
            cursor: hasPrev ? 'pointer' : 'default', opacity: hasPrev ? 1 : 0.4,
            fontSize: 14, color: '#374151',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          }}>← Previous</button>
          <button disabled={!hasNext} onClick={() => setCurrentIdx(c => c + 1)} style={{
            padding: '8px 24px', borderRadius: 6,
            background: '#1e40af', color: '#fff',
            border: 'none', cursor: hasNext ? 'pointer' : 'default', opacity: hasNext ? 1 : 0.4,
            fontSize: 14, fontWeight: 500,
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          }}>Next →</button>
        </div>
      </div>
    </div>
  );
}
