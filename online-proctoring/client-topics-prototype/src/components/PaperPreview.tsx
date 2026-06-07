import type { Question, TopicTag, GeneratedPaper } from '../data/types';
import { TAG_LABEL } from '../data/types';
import { DifficultyBadge } from './DifficultyBadge';

interface Props {
  paper: GeneratedPaper;
  onStart: () => void;
  onRegenerate: () => void;
  onClear: () => void;
}

export function PaperPreview({ paper, onStart, onRegenerate, onClear }: Props) {
  return (
    <div style={{
      background: '#fff', borderRadius: 12,
      border: '1px solid #1e40af',  // blue border to distinguish
      padding: '20px 24px', marginBottom: 24,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#1e293b' }}>
            {paper.title}
          </h3>
          <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>
            Paper {paper.paperNumber} · {paper.mode} · 20 questions · 75 minutes
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onRegenerate}
            style={{
              padding: '8px 16px', fontSize: 12, fontWeight: 500,
              color: '#1e40af', background: '#eff6ff',
              border: '1px solid #bfdbfe', borderRadius: 6, cursor: 'pointer',
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            }}>Regenerate</button>
          <button onClick={onClear}
            style={{
              padding: '8px 16px', fontSize: 12, fontWeight: 500,
              color: '#dc2626', background: '#fff',
              border: '1px solid #fca5a5', borderRadius: 6, cursor: 'pointer',
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            }}>Clear</button>
        </div>
      </div>

      {/* Difficulty profile */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 16, fontSize: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ color: '#64748b' }}>Difficulty:</span>
          <span style={{
            padding: '2px 10px', borderRadius: 8, fontWeight: 600,
            color: '#16a34a', background: '#dcfce7',
          }}>Easy {paper.difficultyProfile.easy}</span>
          <span style={{
            padding: '2px 10px', borderRadius: 8, fontWeight: 600,
            color: '#d97706', background: '#fef3c7',
          }}>Medium {paper.difficultyProfile.medium}</span>
          <span style={{
            padding: '2px 10px', borderRadius: 8, fontWeight: 600,
            color: '#dc2626', background: '#fef2f2',
          }}>Hard {paper.difficultyProfile.hard}</span>
        </div>
        {paper.mode === 'adaptive' && (
          <span style={{
            display: 'flex', alignItems: 'center', gap: 4,
            color: '#1e40af', fontWeight: 500,
            padding: '2px 8px', background: '#eff6ff', borderRadius: 8,
          }}>
            🎯 Focus on your weakest topics
          </span>
        )}
      </div>

      {/* Topic distribution */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
        {Object.entries(paper.distribution).map(([tag, count]) => (
          <span key={tag} style={{
            padding: '2px 10px', borderRadius: 10, fontSize: 11,
            color: '#1e40af', background: '#dbeafe',
          }}>
            {TAG_LABEL[tag as TopicTag] || tag}: {count}
          </span>
        ))}
      </div>

      {/* Question list */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 3,
        maxHeight: 300, overflowY: 'auto',
        padding: '12px 16px',
        background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0',
        marginBottom: 16,
      }}>
        {paper.questions.map((q, idx) => (
          <div key={idx} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '5px 8px', borderRadius: 4, fontSize: 12, color: '#64748b',
          }}>
            <span style={{ fontWeight: 600, color: '#1e293b', minWidth: 28 }}>Q{idx + 1}</span>
            <span>{q.year} P{q.paperNumber} · Q{q.questionIndex + 1}</span>
            <DifficultyBadge difficulty={q.difficulty} />
            <span style={{ marginLeft: 'auto', fontSize: 11, color: '#1e40af' }}>
              {TAG_LABEL[q.primary_topic]}
              {q.topics.length > 1 && <span style={{ color: '#94a3b8' }}> +{q.topics.length - 1}</span>}
            </span>
          </div>
        ))}
      </div>

      <button onClick={onStart}
        style={{
          width: '100%', padding: '12px 0', fontSize: 15, fontWeight: 600,
          color: '#fff', background: '#16a34a', border: 'none',
          borderRadius: 8, cursor: 'pointer',
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        }}>
        Start Exam — Paper {paper.paperNumber}
      </button>
    </div>
  );
}
