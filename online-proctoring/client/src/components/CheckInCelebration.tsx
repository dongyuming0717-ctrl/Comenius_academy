import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StreakFlame } from './StreakFlame';
import type { Achievement } from '../services/gamification';
import { AchievementToast } from './AchievementToast';

interface Props {
  streak: number;
  xpEarned: number;
  newAchievements: Achievement[];
  onDismiss: () => void;
}

const confettiColors = ['#58cc02', '#1cb0f6', '#ff9600', '#ce82ff', '#ff4b4b', '#fbbf24', '#1e40af'];

function randomConfetti(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 320,
    y: (Math.random() - 0.5) * 400 - 60,
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    rotation: Math.random() * 720 - 360,
    size: 6 + Math.random() * 8,
    delay: Math.random() * 0.3,
    duration: 1.5 + Math.random() * 1,
    shape: Math.random() > 0.5 ? 'circle' : 'rect',
  }));
}

export function CheckInCelebration({ streak, xpEarned, newAchievements, onDismiss }: Props) {
  const [phase, setPhase] = useState<'confetti' | 'text' | 'done'>('confetti');
  const [showAchievements, setShowAchievements] = useState(false);
  const confetti = randomConfetti(50);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('text'), 400);
    const t2 = setTimeout(() => setShowAchievements(newAchievements.length > 0), 1200);
    const t3 = setTimeout(() => setPhase('done'), 3000);
    const t4 = setTimeout(onDismiss, 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [newAchievements.length, onDismiss]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onDismiss}
        style={{
          position: 'fixed', inset: 0, zIndex: 200,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        }}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          style={{
            background: '#fff', borderRadius: 20, padding: '48px 40px',
            textAlign: 'center', maxWidth: 400, width: '90%',
            position: 'relative', overflow: 'hidden',
            boxShadow: '0 25px 80px rgba(0,0,0,0.25)',
          }}
        >
          {/* Confetti particles */}
          {confetti.map((c) => (
            <motion.div
              key={c.id}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0, rotate: 0 }}
              animate={{
                x: c.x, y: c.y, opacity: [1, 1, 0],
                scale: [0, 1.5, 0], rotate: c.rotation,
              }}
              transition={{ duration: c.duration, delay: c.delay, ease: 'easeOut' }}
              style={{
                position: 'absolute', top: '50%', left: '50%',
                width: c.size, height: c.size,
                borderRadius: c.shape === 'circle' ? '50%' : 2,
                background: c.color,
              }}
            />
          ))}

          {/* Flame */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.3, 1] }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{ marginBottom: 16 }}
          >
            <StreakFlame streak={streak} size="lg" />
          </motion.div>

          {/* Streak counter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{ fontSize: 28, fontWeight: 700, color: '#1f2937', marginBottom: 4 }}
          >
            {streak} Day Streak!
          </motion.div>

          {/* XP earned */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '6px 16px', borderRadius: 20,
              background: '#fef3c7', color: '#d97706',
              fontSize: 16, fontWeight: 600, marginTop: 8,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"/>
            </svg>
            +{xpEarned} XP
          </motion.div>

          {/* Achievement toasts */}
          {showAchievements && newAchievements.map((ach, i) => (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 + i * 0.2 }}
              style={{
                marginTop: 12, padding: '10px 14px',
                background: '#f0fdf4', borderRadius: 10,
                border: '1px solid #bbf7d0',
                display: 'flex', alignItems: 'center', gap: 8,
              }}
            >
              <span style={{ fontSize: 20 }}>{
                ach.icon === 'flame' ? '🔥' :
                ach.icon === 'crown' ? '👑' :
                ach.icon === 'diamond' ? '💎' :
                ach.icon === 'star' ? '⭐' :
                ach.icon === 'bolt' ? '⚡' : '🏆'
              }</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: '#166534' }}>Achievement Unlocked!</div>
                <div style={{ fontSize: 13, color: '#15803d' }}>{ach.title}</div>
              </div>
            </motion.div>
          ))}

          {/* Dismiss hint */}
          {phase === 'done' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ marginTop: 20, fontSize: 12, color: '#9ca3af' }}
            >
              Tap anywhere to continue
            </motion.p>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
