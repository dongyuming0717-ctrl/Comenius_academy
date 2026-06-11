import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Achievement } from '../services/gamification';

interface Props {
  achievement: Achievement;
  onDismiss: () => void;
}

export function AchievementToast({ achievement, onDismiss }: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(onDismiss, 300);
    }, 3000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{
            position: 'fixed', top: 80, right: 20, zIndex: 150,
            background: '#fff', borderRadius: 12,
            padding: '14px 18px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            display: 'flex', alignItems: 'center', gap: 10,
            maxWidth: 300, cursor: 'pointer',
            fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
          }}
          onClick={() => { setVisible(false); setTimeout(onDismiss, 300); }}
        >
          <span style={{ fontSize: 24 }}>
            {achievement.icon === 'flame' ? '🔥' :
             achievement.icon === 'crown' ? '👑' :
             achievement.icon === 'diamond' ? '💎' :
             achievement.icon === 'star' ? '⭐' :
             achievement.icon === 'bolt' ? '⚡' : '🏆'}
          </span>
          <div>
            <div style={{ fontWeight: 600, fontSize: 13, color: '#1f2937' }}>
              Achievement Unlocked!
            </div>
            <div style={{ fontSize: 12, color: '#6b7280' }}>
              {achievement.title}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
