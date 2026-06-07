import type { Question, TopicTag } from '../data/types';
import { TAG_LABEL, TAG_COLOR, TAG_BG } from '../data/types';
import { DifficultyBadge } from './DifficultyBadge';

interface Props {
  questions: Question[];
  userAnswers: Record<string, number | null>;  // question id → selected option or null
  onReview: (q: Question) => void;
}

export function QuestionList({ questions, userAnswers, onReview }: Props) {
  if (questions.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: 40, color: '#94a3b8', fontSize: 13 }}>
        Select a topic from the sidebar to browse questions.
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {questions.map(q => (
        <QuestionRow
          key={q.id}
          question={q}
          userAnswer={userAnswers[q.id] ?? null}
          onReview={() => onReview(q)}
        />
      ))}
    </div>
  );
}

function QuestionRow({ question: q, userAnswer, onReview }: {
  question: Question;
  userAnswer: number | null;
  onReview: () => void;
}) {
  const isCorrect = userAnswer !== null && userAnswer === q.answer;
  const isIncorrect = userAnswer !== null && userAnswer !== q.answer;
  const notAttempted = userAnswer === null;

  const statusStyle = isCorrect
    ? { color: '#16a34a', bg: '#f0fdf4', label: '✓' }
    : isIncorrect
    ? { color: '#dc2626', bg: '#fef2f2', label: '✗' }
    : { color: '#94a3b8', bg: '#f8fafc', label: '—' };

  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '10px 16px', borderRadius: 8,
        background: '#f8fafc', border: '1px solid #e2e8f0',
        fontSize: 13, cursor: 'pointer',
      }}
      onClick={onReview}
    >
      {/* Status indicator */}
      <span style={{
        width: 28, height: 28, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 12, fontWeight: 700,
        background: statusStyle.bg, color: statusStyle.color,
        flexShrink: 0,
      }}>{statusStyle.label}</span>

      {/* Source */}
      <span style={{ color: '#1e293b', fontWeight: 500 }}>{q.year} Paper {q.paperNumber}</span>
      <span style={{ color: '#94a3b8' }}>Q{q.questionIndex + 1}</span>

      {/* Difficulty */}
      <DifficultyBadge difficulty={q.difficulty} />

      {/* Topics — show all, primary first */}
      <span style={{ marginLeft: 'auto', display: 'flex', gap: 4, alignItems: 'center' }}>
        {q.topics.map(t => (
          <span key={t} style={{
            fontSize: 10,
            color: t === q.primary_topic ? TAG_COLOR : '#94a3b8',
            background: t === q.primary_topic ? TAG_BG : '#f1f5f9',
            padding: '2px 8px', borderRadius: 10, fontWeight: 500,
          }}>
            {TAG_LABEL[t]}
          </span>
        ))}
      </span>

      {/* Review button */}
      <button onClick={(e) => { e.stopPropagation(); onReview(); }}
        style={{
          padding: '4px 14px', fontSize: 11, fontWeight: 500,
          color: TAG_COLOR, background: '#fff',
          border: `1px solid ${TAG_COLOR}`, borderRadius: 6, cursor: 'pointer',
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        }}>Review</button>
    </div>
  );
}
