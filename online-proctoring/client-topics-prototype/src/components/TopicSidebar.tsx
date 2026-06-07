import { TAG_LIST, TAG_LABEL, TAG_COLOR, TAG_BG, type TopicTag, type TopicMastery } from '../data/types';

interface Props {
  selectedTag: TopicTag;
  onSelectTag: (tag: TopicTag) => void;
  tagCounts: Record<string, number>;
  mastery: TopicMastery[];
  showMastery: boolean;
  onToggleView: () => void;
}

export function TopicSidebar({ selectedTag, onSelectTag, tagCounts, mastery, showMastery, onToggleView }: Props) {
  const masteryMap = new Map(mastery.map(m => [m.topic, m]));

  return (
    <div style={{
      width: 240, flexShrink: 0,
      background: '#fff', borderRadius: 12,
      border: '1px solid #e2e8f0',
      padding: '8px 0', overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 16px',
        fontSize: 11, fontWeight: 600, color: '#94a3b8',
        textTransform: 'uppercase', letterSpacing: '0.5px',
      }}>
        <span>Topics</span>
        <button onClick={onToggleView}
          style={{
            padding: '2px 8px', fontSize: 10, fontWeight: 500,
            color: '#1e40af', background: '#eff6ff', border: 'none',
            borderRadius: 10, cursor: 'pointer',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          }}>
          {showMastery ? 'Count View' : 'Mastery View'}
        </button>
      </div>

      {TAG_LIST.map(tag => {
        const count = tagCounts[tag] || 0;
        const m = masteryMap.get(tag);
        const isActive = selectedTag === tag;
        const masteryLevel = m?.masteryLevel ?? 0;
        const confidence = m?.confidence ?? 0;
        const attempts = m?.totalAttempts ?? 0;

        // Cold-start display logic
        const showPercent = attempts >= 5;
        const needMore = attempts > 0 && attempts < 5;

        return (
          <div key={tag} onClick={() => onSelectTag(tag)}
            style={{
              display: 'flex', flexDirection: 'column',
              padding: '9px 16px', cursor: 'pointer',
              background: isActive ? TAG_BG : 'transparent',
              borderRight: isActive ? `3px solid ${TAG_COLOR}` : '3px solid transparent',
              transition: 'all 0.15s',
            }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{
                display: 'flex', alignItems: 'center', gap: 8,
                fontSize: 13, fontWeight: isActive ? 600 : 400,
                color: isActive ? TAG_COLOR : '#1e293b',
              }}>
                <span style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: isActive ? TAG_COLOR : '#d4d4d8',
                  flexShrink: 0,
                }} />
                {TAG_LABEL[tag]}
              </span>
              <span style={{
                fontSize: 11, fontWeight: 500,
                color: isActive ? TAG_COLOR : '#94a3b8',
                background: isActive ? '#dbeafe' : '#f3f4f6',
                padding: '1px 8px', borderRadius: 10,
              }}>{count}</span>
            </div>

            {/* Mastery bar */}
            {showMastery && (
              <div style={{ marginTop: 6 }}>
                {attempts === 0 ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ flex: 1, height: 4, borderRadius: 2, background: '#f1f5f9' }} />
                    <span style={{ fontSize: 10, color: '#cbd5e1', marginLeft: 8 }}>—</span>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ flex: 1, height: 4, borderRadius: 2, background: '#e2e8f0', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', width: `${Math.max(4, masteryLevel)}%`,
                        borderRadius: 2,
                        background: masteryLevel >= 70 ? '#16a34a' : masteryLevel >= 40 ? '#d97706' : '#dc2626',
                        transition: 'width 0.3s ease',
                      }} />
                    </div>
                    <span style={{
                      fontSize: 10, fontWeight: 600, marginLeft: 8,
                      color: needMore ? '#94a3b8' : '#64748b',
                    }}>
                      {showPercent ? `${masteryLevel}%` : '—'}
                    </span>
                  </div>
                )}
                {needMore && (
                  <div style={{ fontSize: 9, color: '#cbd5e1', marginTop: 2 }}>
                    need {5 - attempts} more
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
