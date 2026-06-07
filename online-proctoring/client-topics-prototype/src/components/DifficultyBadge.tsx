import type { Question } from '../data/types';

interface Props {
  difficulty: Question['difficulty'];
  size?: 'sm' | 'md';
}

const DIFFICULTY_CONFIG = {
  easy: { label: '⭐ Easy', color: '#16a34a', bg: '#dcfce7' },
  medium: { label: '⭐ Medium', color: '#d97706', bg: '#fef3c7' },
  hard: { label: '⭐⭐ Hard', color: '#dc2626', bg: '#fef2f2' },
};

export function DifficultyBadge({ difficulty, size = 'sm' }: Props) {
  const cfg = DIFFICULTY_CONFIG[difficulty];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 2,
      padding: size === 'sm' ? '2px 8px' : '3px 10px',
      fontSize: size === 'sm' ? 10 : 11,
      fontWeight: 600,
      color: cfg.color, background: cfg.bg,
      borderRadius: 10, whiteSpace: 'nowrap',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    }}>
      {cfg.label}
    </span>
  );
}
