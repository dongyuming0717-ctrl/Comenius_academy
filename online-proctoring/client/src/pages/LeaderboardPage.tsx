import { useEffect, useState } from 'react';
import { TopNav } from '../components/TopNav';
import { useProctor } from '../sdk/useProctor';
import { useLocale } from '../i18n/LocaleContext';
import { supabase } from '../supabase';
import { getLeaderboard } from '../services/gamification';
import type { LeaderboardEntry } from '../services/gamification';
import { motion } from 'framer-motion';

export function LeaderboardPage() {
  const { user } = useProctor();
  const { t } = useLocale();
  const [tab, setTab] = useState<'weekly' | 'all_time' | 'class'>('weekly');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [profileId, setProfileId] = useState<string | null>(null);
  const [classId, setClassId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    supabase.from('users').select('id').eq('auth_id', user.id).single().then(({ data }) => {
      if (data) setProfileId(data.id);
    });
    supabase.from('class_students').select('class_id').eq('student_id', supabase.from('users').select('id').eq('auth_id', user.id)).limit(1).then(({ data: cdata }) => {
      // Just use the first class for the class tab
    });
  }, [user]);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    supabase.from('users').select('id').eq('auth_id', user.id).single().then(async ({ data }) => {
      if (!data) return;
      const uid = data.id;
      let cid: string | undefined;

      if (tab === 'class') {
        const { data: cs } = await supabase.from('class_students').select('class_id').eq('student_id', uid).limit(1);
        if (cs && cs.length > 0) cid = cs[0].class_id;
      }

      const result = await getLeaderboard(tab === 'all_time' ? 'all_time' : 'weekly', 50, cid);
      setEntries(result);
      setLoading(false);
    });
  }, [tab, user]);

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: '8px 20px',
    borderRadius: 8,
    border: 'none',
    background: active ? '#1e40af' : '#f1f5f9',
    color: active ? '#fff' : '#64748b',
    fontSize: 13,
    fontWeight: active ? 600 : 400,
    cursor: 'pointer',
    fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
    transition: 'all 0.15s',
  });

  const medal = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return null;
  };

  const top3 = entries.slice(0, 3);
  const rest = entries.slice(3);

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Geist', system-ui, -apple-system, sans-serif" }}>
      <TopNav currentPage="leaderboard" />
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '32px 20px 60px' }}>
        <h1 style={{ fontSize: 26, fontWeight: 600, color: '#111', margin: '0 0 4px' }}>
          Leaderboard
        </h1>
        <p style={{ fontSize: 14, color: '#6b7280', margin: '0 0 24px' }}>
          Compete with your classmates and stay motivated
        </p>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {(['weekly', 'all_time', 'class'] as const).map((t) => (
            <button key={t} style={tabStyle(tab === t)} onClick={() => setTab(t)}>
              {t === 'weekly' ? 'Weekly' : t === 'all_time' ? 'All Time' : 'Class'}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 40, color: '#9ca3af' }}>Loading...</div>
        ) : entries.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 40, color: '#9ca3af' }}>
            No data yet. Start studying to appear here!
          </div>
        ) : (
          <>
            {/* Podium */}
            <div style={{
              display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
              gap: 16, marginBottom: 32, padding: '0 16px',
            }}>
              {[1, 0, 2].map((idx) => { // 2nd, 1st, 3rd order
                const entry = top3[idx];
                if (!entry) return <div key={idx} style={{ flex: 1 }} />;
                const height = idx === 0 ? 120 : idx === 1 ? 80 : 60;
                return (
                  <motion.div
                    key={entry.userId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.15 }}
                    style={{
                      flex: 1, textAlign: 'center', maxWidth: 140,
                    }}
                  >
                    <div style={{ fontSize: 28, marginBottom: 4 }}>{medal(entry.rank)}</div>
                    <div style={{
                      width: idx === 1 ? 56 : 44, height: idx === 1 ? 56 : 44,
                      borderRadius: '50%', margin: '0 auto 6px',
                      background: idx === 1 ? '#1e40af' : idx === 0 ? '#3b82f6' : '#f97316',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontWeight: 700, fontSize: idx === 1 ? 20 : 16,
                    }}>
                      {entry.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#1f2937' }}>{entry.fullName}</div>
                    <div style={{ fontSize: 12, color: '#d97706', marginTop: 2 }}>
                      ⚡ {entry.xp.toLocaleString()} XP
                    </div>
                    <div style={{
                      height, background: idx === 1 ? '#1e40af' : idx === 0 ? '#3b82f6' : '#f97316',
                      borderRadius: '8px 8px 0 0', marginTop: 8, opacity: 0.15,
                    }} />
                  </motion.div>
                );
              })}
            </div>

            {/* Rank list */}
            <div style={{
              background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0',
              overflow: 'hidden',
            }}>
              {rest.map((entry, i) => {
                const isMe = profileId === entry.userId;
                return (
                  <motion.div
                    key={entry.userId}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '12px 18px',
                      borderBottom: '1px solid #f1f5f9',
                      background: isMe ? '#eff6ff' : '#fff',
                    }}
                  >
                    <div style={{ width: 28, textAlign: 'center', fontSize: 13, fontWeight: 500, color: '#9ca3af' }}>
                      {entry.rank}
                    </div>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: '#e2e8f0', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: 13, fontWeight: 600,
                      color: '#64748b',
                    }}>
                      {entry.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div style={{ flex: 1, fontSize: 14, fontWeight: isMe ? 600 : 400, color: '#1f2937' }}>
                      {entry.fullName}
                      {isMe && <span style={{ fontSize: 11, color: '#9ca3af', marginLeft: 6 }}>(You)</span>}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#d97706' }}>
                      {entry.xp.toLocaleString()} XP
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
