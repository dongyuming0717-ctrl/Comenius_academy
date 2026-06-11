import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../supabase';
import type { LeaderboardEntry } from '../services/gamification';
import { getLeaderboard } from '../services/gamification';

interface Props {
  type: 'weekly' | 'all_time';
  classId?: string;
  currentUserId?: string;
}

export function LeaderboardCard({ type, classId, currentUserId }: Props) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLeaderboard(type, 10, classId).then((data) => {
      setEntries(data);
      setLoading(false);
    });
  }, [type, classId]);

  if (loading) {
    return (
      <div style={{ padding: 16, textAlign: 'center', color: '#9ca3af', fontSize: 13 }}>
        Loading...
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div style={{ padding: 24, textAlign: 'center', color: '#9ca3af', fontSize: 13 }}>
        No data yet. Start studying to appear here!
      </div>
    );
  }

  const medal = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return null;
  };

  return (
    <div style={{ fontFamily: "'Geist', system-ui, -apple-system, sans-serif" }}>
      {entries.map((entry, i) => {
        const isMe = currentUserId === entry.userId;
        return (
          <motion.div
            key={entry.userId}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 14px', borderRadius: 8,
              background: isMe ? '#eff6ff' : 'transparent',
              border: isMe ? '1px solid #dbeafe' : '1px solid transparent',
              marginBottom: 4,
            }}
          >
            <div style={{
              width: 24, textAlign: 'center', fontWeight: 600,
              fontSize: 13, color: entry.rank <= 3 ? '#f59e0b' : '#9ca3af',
            }}>
              {medal(entry.rank) || entry.rank}
            </div>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: colors[entry.rank - 1] || '#e2e8f0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 600, color: '#fff',
              flexShrink: 0,
            }}>
              {entry.fullName.charAt(0).toUpperCase()}
            </div>
            <div style={{ flex: 1, fontSize: 13, fontWeight: isMe ? 600 : 400, color: '#1f2937' }}>
              {entry.fullName}
              {isMe && <span style={{ fontSize: 11, color: '#9ca3af', marginLeft: 6 }}>(You)</span>}
            </div>
            <div style={{
              fontSize: 13, fontWeight: 600, color: '#d97706',
              display: 'flex', alignItems: 'center', gap: 3,
            }}>
              <span style={{ fontSize: 10 }}>⚡</span>
              {entry.xp.toLocaleString()}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

const colors = ['#ef4444', '#f97316', '#eab308', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6', '#f43f5e', '#0ea5e9', '#84cc16'];
