import type { TopicMastery } from '../data/types';
import { TAG_LABEL } from '../data/types';

interface Props {
  mastery: TopicMastery[];
  onStartAdaptive: () => void;
}

export function MasteryHeader({ mastery, onStartAdaptive }: Props) {
  const totalCorrect = mastery.reduce((s, m) => s + m.totalCorrect, 0);
  const totalAttempts = mastery.reduce((s, m) => s + m.totalAttempts, 0);
  const overallAccuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;

  // Sort by mastery level (ascending) — weakest first
  const sorted = [...mastery].sort((a, b) => a.masteryLevel - b.masteryLevel);
  const weakest = sorted.slice(0, 2);
  const strongest = sorted.slice(-2).reverse();

  const formatMastery = (m: TopicMastery): string => {
    if (m.totalAttempts === 0) return '—';
    if (m.totalAttempts < 5) return `${m.masteryLevel}%`;
    return `${m.masteryLevel}%`;
  };

  const cardStyle: React.CSSProperties = {
    background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0',
    padding: '20px 24px', marginBottom: 24,
  };

  const barContainer: React.CSSProperties = {
    height: 8, borderRadius: 4, background: '#e2e8f0',
    overflow: 'hidden', width: 200,
  };

  return (
    <div style={cardStyle}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        {/* Overall */}
        <div>
          <div style={{ fontSize: 12, color: '#64748b', fontWeight: 500, marginBottom: 4 }}>Overall Mastery</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={barContainer}>
              <div style={{ height: '100%', width: `${overallAccuracy}%`, borderRadius: 4, background: '#1e40af', transition: 'width 0.5s ease' }} />
            </div>
            <span style={{ fontSize: 20, fontWeight: 700, color: '#1e293b' }}>{overallAccuracy}%</span>
          </div>
          <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>
            {totalCorrect}/{totalAttempts} correct · {mastery.filter(m => m.confidence >= 0.9).length}/14 topics confident
          </div>
        </div>

        {/* Weakest / Strongest */}
        <div style={{ display: 'flex', gap: 24, fontSize: 12 }}>
          <div>
            <div style={{ color: '#dc2626', fontWeight: 600, marginBottom: 4 }}>⚡ Weakest</div>
            {weakest.map(m => (
              <div key={m.topic} style={{ color: '#64748b', marginBottom: 2 }}>
                {TAG_LABEL[m.topic]}: <strong>{formatMastery(m)}</strong>
                {m.totalAttempts < 5 && ' · low data'}
              </div>
            ))}
          </div>
          <div>
            <div style={{ color: '#16a34a', fontWeight: 600, marginBottom: 4 }}>🔥 Strongest</div>
            {strongest.map(m => (
              <div key={m.topic} style={{ color: '#64748b', marginBottom: 2 }}>
                {TAG_LABEL[m.topic]}: <strong>{formatMastery(m)}</strong>
              </div>
            ))}
          </div>
        </div>

        <button onClick={onStartAdaptive}
          style={{
            padding: '10px 22px', fontSize: 13, fontWeight: 600,
            color: '#fff', background: '#1e40af', border: 'none',
            borderRadius: 8, cursor: 'pointer', whiteSpace: 'nowrap',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          }}>
          Start Adaptive Practice
        </button>
      </div>
    </div>
  );
}
