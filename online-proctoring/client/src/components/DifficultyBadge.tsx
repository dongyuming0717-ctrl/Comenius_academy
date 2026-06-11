type Difficulty = 'easy' | 'medium' | 'hard';

interface Props {
  difficulty: Difficulty;
  size?: 'sm' | 'md';
}

const CONFIG: Record<Difficulty, { label: string; color: string; bg: string }> = {
  easy: { label: '⭐ Easy', color: '#16a34a', bg: '#dcfce7' },
  medium: { label: '⭐ Medium', color: '#d97706', bg: '#fef3c7' },
  hard: { label: '⭐⭐ Hard', color: '#dc2626', bg: '#fef2f2' },
};

export function DifficultyBadge({ difficulty, size = 'sm' }: Props) {
  const cfg = CONFIG[difficulty] || CONFIG.medium;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 2,
      padding: size === 'sm' ? '2px 8px' : '3px 10px',
      fontSize: size === 'sm' ? 10 : 11, fontWeight: 600,
      color: cfg.color, background: cfg.bg, borderRadius: 10, whiteSpace: 'nowrap',
      fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
    }}>{cfg.label}</span>
  );
}
