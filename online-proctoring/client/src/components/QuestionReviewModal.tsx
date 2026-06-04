import { MathText } from './MathText';

interface QuestionEntry {
  year: number;
  paperNumber: 1 | 2;
  questionIndex: number;
  text: string;
  correctAnswer: number;
  userAnswer: number | null;
  status: 'correct' | 'incorrect' | 'not_attempted';
  question: {
    image_url?: string;
    options: string[];
    topic?: string;
  };
}

interface QuestionReviewModalProps {
  entry: QuestionEntry;
  allEntries: QuestionEntry[];
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  topicLabel?: string;
  closeLabel?: string;
  nextButtonVariant?: 'primary' | 'secondary';
}

export function QuestionReviewModal({
  entry: q,
  allEntries,
  onClose,
  onPrevious,
  onNext,
  topicLabel,
  closeLabel = 'Close Review',
  nextButtonVariant = 'secondary',
}: QuestionReviewModalProps) {
  const reviewIndex = allEntries.findIndex(
    e => e.year === q.year && e.paperNumber === q.paperNumber && e.questionIndex === q.questionIndex
  );
  const hasPrevious = reviewIndex > 0;
  const hasNext = reviewIndex < allEntries.length - 1;
  const userAns = q.userAnswer;
  const isCorrect = userAns === q.correctAnswer;
  const letter = userAns !== null ? String.fromCharCode(65 + userAns) : null;
  const correctLetter = String.fromCharCode(65 + q.correctAnswer);
  const options = Array.isArray(q.question.options) ? q.question.options : [];

  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#ffffff' }}>
      {/* Blue Top Bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px', height: 48, flexShrink: 0,
        background: '#1e40af',
      }}>
        <span style={{ fontSize: 16, fontWeight: 400, color: '#fff' }}>
          Review — {q.year} Paper {q.paperNumber} · Q{q.questionIndex + 1}
        </span>
        {topicLabel && (
          <span style={{ fontSize: 16, fontWeight: 400, color: '#fff' }}>{topicLabel}</span>
        )}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px', background: '#f5f5f5' }}>
        <div style={{
          maxWidth: 800, margin: '0 auto', background: '#fff',
          borderRadius: 8, border: '1px solid #e0e0e0', overflow: 'hidden',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 20px', background: '#fafafa',
            borderBottom: '1px solid #e0e0e0',
          }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: '#333' }}>
              Question {q.questionIndex + 1}
            </span>
            {q.status !== 'not_attempted' ? (
              <span style={{
                fontSize: 13, fontWeight: 600,
                color: isCorrect ? '#16a34a' : '#dc2626',
                padding: '3px 12px', borderRadius: 4,
                background: isCorrect ? '#dcfce7' : '#fef2f2',
              }}>
                {isCorrect ? 'Correct' : 'Incorrect'}
              </span>
            ) : (
              <span style={{ fontSize: 13, color: '#888' }}>Not Attempted</span>
            )}
          </div>

          <div style={{ padding: '24px 28px' }}>
            <p style={{
              fontSize: 16, fontWeight: 500, margin: '0 0 20px 0',
              lineHeight: 1.75, color: '#1e293b',
            }}>
              <MathText text={q.text} />
            </p>
            {q.question.image_url && (
              <img src={q.question.image_url} alt="Figure"
                style={{ width: '100%', maxWidth: 400, display: 'block', margin: '0 auto 20px' }} />
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {options.map((opt: string, i: number) => {
                const isUserSel = userAns === i;
                const isCorrectAns = q.correctAnswer === i;
                let bg = '#fff', border = '2px solid #e5e7eb', dotBorder = '#e2e8f0', dotBg = 'transparent', textColor = '#374151';
                if (isCorrectAns) { bg = '#dcfce7'; border = '2px solid #16a34a'; dotBorder = '#16a34a'; dotBg = '#16a34a'; textColor = '#16a34a'; }
                if (isUserSel && !isCorrectAns) { bg = '#fef2f2'; border = '2px solid #dc2626'; dotBorder = '#dc2626'; dotBg = '#dc2626'; textColor = '#dc2626'; }
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 18px', background: bg, border, borderRadius: 8 }}>
                    <span style={{ width: 18, height: 18, borderRadius: '50%', border: `2px solid ${dotBorder}`, background: dotBg, flexShrink: 0 }} />
                    <span style={{ flex: 1, fontSize: 14, color: textColor, lineHeight: 1.5 }}>
                      <MathText text={opt} />
                    </span>
                    {isCorrectAns && <span style={{ fontSize: 12, color: '#16a34a', fontWeight: 600 }}>Correct Answer</span>}
                    {isUserSel && !isCorrectAns && <span style={{ fontSize: 12, color: '#dc2626', fontWeight: 600 }}>Your Answer</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {q.status !== 'not_attempted' ? (
          <div style={{ maxWidth: 800, margin: '16px auto 0', display: 'flex', gap: 16, justifyContent: 'center', fontSize: 14, color: '#555' }}>
            <span>Your answer: <strong style={{ color: isCorrect ? '#16a34a' : '#dc2626' }}>{letter ?? '—'}</strong></span>
            <span>Correct answer: <strong style={{ color: '#16a34a' }}>{correctLetter}</strong></span>
          </div>
        ) : (
          <div style={{ maxWidth: 800, margin: '16px auto 0', textAlign: 'center', fontSize: 14, color: '#16a34a' }}>
            Correct answer: <strong>{correctLetter}</strong>
          </div>
        )}
      </div>

      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '10px 24px', flexShrink: 0,
        background: '#fff', borderTop: '1px solid #e0e0e0',
      }}>
        <button onClick={onClose} style={{
          padding: '8px 28px', borderRadius: 4, border: '1px solid #ccc', background: '#fff',
          cursor: 'pointer', fontSize: 15, color: '#333',
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        }}>{closeLabel}</button>
        <div style={{ display: 'flex', gap: 12 }}>
          <button disabled={!hasPrevious} onClick={onPrevious} style={{
            padding: '8px 28px', borderRadius: 4, border: '1px solid #ccc', background: '#fff',
            cursor: hasPrevious ? 'pointer' : 'default', opacity: hasPrevious ? 1 : 0.4,
            fontSize: 15, color: '#333',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          }}>← Previous</button>
          <button disabled={!hasNext} onClick={onNext} style={{
            padding: '8px 28px', borderRadius: 4,
            background: nextButtonVariant === 'primary' ? '#1e40af' : '#fff',
            color: nextButtonVariant === 'primary' ? '#fff' : '#333',
            border: nextButtonVariant === 'primary' ? 'none' : '1px solid #ccc',
            cursor: hasNext ? 'pointer' : 'default', opacity: hasNext ? 1 : 0.4,
            fontSize: 15,
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          }}>Next →</button>
        </div>
      </div>
    </div>
  );
}
