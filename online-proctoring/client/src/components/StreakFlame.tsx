import { motion } from 'framer-motion';

interface Props {
  streak: number;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = { sm: 20, md: 36, lg: 64 };

function flameColor(streak: number): { main: string; glow: string; accent: string } {
  if (streak >= 30) return { main: '#dc2626', glow: 'rgba(220,38,38,0.55)', accent: '#fbbf24' };
  if (streak >= 7) return { main: '#ef4444', glow: 'rgba(239,68,68,0.4)', accent: '#f97316' };
  if (streak >= 3) return { main: '#ea580c', glow: 'rgba(234,88,12,0.3)', accent: '#fb923c' };
  if (streak >= 1) return { main: '#f97316', glow: 'rgba(249,115,22,0.2)', accent: '#fcd34d' };
  return { main: '#fbbf24', glow: 'rgba(251,191,36,0.15)', accent: '#fde68a' };
}

export function StreakFlame({ streak, size = 'md' }: Props) {
  const px = sizeMap[size];
  const { main, glow, accent } = flameColor(streak);
  const isRoaring = streak >= 3;

  return (
    <motion.div
      style={{ display: 'inline-flex', position: 'relative', width: px, height: px }}
      animate={{
        scale: isRoaring ? [1, 1.08, 1] : [1, 1.03, 1],
        filter: [
          `drop-shadow(0 0 ${px * 0.15}px ${glow})`,
          `drop-shadow(0 0 ${px * (isRoaring ? 0.5 : 0.25)}px ${glow})`,
          `drop-shadow(0 0 ${px * 0.15}px ${glow})`,
        ],
      }}
      transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
    >
      <svg width={px} height={px} viewBox="0 0 24 24" fill="none">
        {/* Outer flame — main asymmetrical body */}
        <motion.path
          d="M12.6 2.4a1 1 0 0 0-1.2 0C9.6 3.7 4 8.3 4 14c0 3.2 2 6 4.7 7.3A4 4 0 0 1 8 19c0-3.2 3.6-6.9 3.7-7a.5.5 0 0 1 .6 0c.1.1 3.7 3 3.7 7 0 .9-.3 1.6-.7 2.3C18 20 20 17.3 20 14c0-5.9-5.6-10.3-7.4-11.6z"
          fill={accent}
          animate={{ opacity: isRoaring ? [0.45, 0.7, 0.45] : [0.4, 0.55, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        />
        {/* Inner flame — smaller, offset up and left */}
        <motion.path
          d="M12 7c-.5 1-1 1.8-1.2 2.5-.8 2.8-.8 4.5 0 6.5.3.7.8 1.3 1.2 1.8a.4.4 0 0 0 .6 0c.4-.5.9-1.1 1.2-1.8.8-2 .8-3.7 0-6.5-.2-.7-.7-1.5-1.2-2.5z"
          fill={main}
          animate={{ opacity: isRoaring ? [0.8, 1, 0.8] : [0.85, 0.95, 0.85] }}
          transition={{ repeat: Infinity, duration: 1.8, delay: 0.2, ease: 'easeInOut' }}
        />
        {/* Bright core */}
        {streak >= 1 && (
          <motion.ellipse
            cx="12" cy="15" rx="3" ry="2.5"
            fill="#fef08a"
            animate={{ opacity: [0.6, 0.9, 0.6] }}
            transition={{ repeat: Infinity, duration: 1.2, delay: 0.1, ease: 'easeInOut' }}
          />
        )}
      </svg>

      {streak >= 30 && (
        <>
          <motion.div style={{ position: 'absolute', width: 4, height: 4, borderRadius: '50%', background: '#fbbf24', top: -4, left: '50%' }}
            animate={{ opacity: [0, 1, 0], y: [-4, -14] }}
            transition={{ repeat: Infinity, duration: 1.2, delay: 0 }} />
          <motion.div style={{ position: 'absolute', width: 3, height: 3, borderRadius: '50%', background: '#f97316', top: 0, right: -2 }}
            animate={{ opacity: [0, 1, 0], y: [-2, -10], x: [0, 4] }}
            transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} />
          <motion.div style={{ position: 'absolute', width: 3, height: 3, borderRadius: '50%', background: '#fbbf24', bottom: 0, left: -2 }}
            animate={{ opacity: [0, 1, 0], y: [0, -8], x: [0, -4] }}
            transition={{ repeat: Infinity, duration: 1.1, delay: 0.7 }} />
        </>
      )}
    </motion.div>
  );
}
