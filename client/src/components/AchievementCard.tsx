import type { Achievement } from '../services/gamification';

interface Props {
  achievement: Achievement;
  earned: boolean;
}

const iconEmoji: Record<string, string> = {
  flame: '🔥',
  crown: '👑',
  diamond: '💎',
  star: '⭐',
  bolt: '⚡',
  book: '📚',
  trophy: '🏆',
};

export function AchievementCard({ achievement, earned }: Props) {
  const emoji = iconEmoji[achievement.icon] || iconEmoji.trophy;

  return (
    <div
      style={{
        padding: '16px 14px',
        borderRadius: 12,
        border: earned ? '1px solid #e2e8f0' : '1px solid #f1f5f9',
        background: earned ? '#fff' : '#f8fafc',
        textAlign: 'center',
        opacity: earned ? 1 : 0.45,
        transition: 'all 0.2s',
        cursor: earned ? 'default' : 'default',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      <div style={{ fontSize: 28, marginBottom: 6, position: 'relative' }}>
        {earned ? emoji : (
          <>
            <span style={{ filter: 'grayscale(1)', opacity: 0.3 }}>{emoji}</span>
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: 12, color: '#9ca3af',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
          </>
        )}
      </div>
      <div style={{ fontWeight: 600, fontSize: 13, color: earned ? '#1f2937' : '#9ca3af' }}>
        {achievement.title}
      </div>
      <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2, lineHeight: 1.3 }}>
        {achievement.description}
      </div>
      {earned && achievement.earnedAt && (
        <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 4 }}>
          {new Date(achievement.earnedAt).toLocaleDateString()}
        </div>
      )}
    </div>
  );
}
