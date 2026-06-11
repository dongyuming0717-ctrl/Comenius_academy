import { useEffect, useState, useCallback } from 'react';
import { TopNav } from '../components/TopNav';
import { useProctor } from '../sdk/useProctor';
import { useLocale } from '../i18n/LocaleContext';
import { supabase } from '../supabase';
import { StreakFlame } from '../components/StreakFlame';
import { CalendarHeatmap } from '../components/CalendarHeatmap';
import { AchievementCard } from '../components/AchievementCard';
import { AchievementToast } from '../components/AchievementToast';
import { CheckInCelebration } from '../components/CheckInCelebration';
import { LeaderboardCard } from '../components/LeaderboardCard';
import {
  checkInToday,
  getUserGamificationData,
  useFreeze,
  type CheckInResult,
  type GamificationData,
  type Achievement,
} from '../services/gamification';
import { motion } from 'framer-motion';

export function CheckInPage() {
  const { user } = useProctor();
  const { t, locale } = useLocale();
  const [profileId, setProfileId] = useState<string | null>(null);
  const [data, setData] = useState<GamificationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkingIn, setCheckingIn] = useState(false);
  const [celebration, setCelebration] = useState<CheckInResult | null>(null);
  const [toastAchievement, setToastAchievement] = useState<Achievement | null>(null);

  const loadData = useCallback(async () => {
    if (!profileId) return;
    const gd = await getUserGamificationData(profileId, locale);
    setData(gd);
    setLoading(false);
  }, [profileId, locale]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from('users')
      .select('id')
      .eq('auth_id', user.id)
      .single()
      .then(({ data: profile }) => {
        if (profile) setProfileId(profile.id);
      });
  }, [user]);

  useEffect(() => {
    if (profileId) loadData();
  }, [profileId, loadData]);

  const handleCheckIn = async () => {
    if (!profileId || checkingIn) return;
    setCheckingIn(true);
    try {
      const result = await checkInToday(profileId, 'manual');
      if (!result.alreadyCheckedIn) {
        setCelebration(result);
        if (result.newAchievements.length > 0) {
          setToastAchievement(result.newAchievements[0]);
        }
      }
      await loadData();
    } catch (e) {
      console.error('Check-in failed:', e);
    }
    setCheckingIn(false);
  };

  const handleDismissCelebration = () => {
    setCelebration(null);
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', fontFamily: "'Geist', system-ui, -apple-system, sans-serif", background: '#fff' }}>
        <TopNav currentPage="checkin" />
        <div style={{ padding: 40, textAlign: 'center', color: '#9ca3af' }}>Loading...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ minHeight: '100vh', fontFamily: "'Geist', system-ui, -apple-system, sans-serif", background: '#fff' }}>
        <TopNav currentPage="checkin" />
        <div style={{ padding: 40, textAlign: 'center', color: '#9ca3af' }}>No data available.</div>
      </div>
    );
  }

  const {
    currentStreak,
    longestStreak,
    weeklyXP,
    totalXP,
    checkInDates,
    achievements,
    allAchievements,
    freezeAvailable,
    checkedInToday,
  } = data;

  const streakMessage =
    currentStreak >= 30 ? "You're on fire! 🔥" :
    currentStreak >= 7 ? 'Keep it going!' :
    currentStreak >= 3 ? 'Warming up!' :
    currentStreak > 0 ? 'Start your streak today!' :
    'Start your streak today!';

  const pageStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: '#fff',
    fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
  };

  const cardStyle: React.CSSProperties = {
    background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb',
    padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    marginBottom: 20,
  };

  return (
    <div style={pageStyle}>
      <TopNav currentPage="checkin" />

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 20px 60px' }}>
        {/* Streak Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: 28 }}
        >
          <StreakFlame streak={currentStreak} size="lg" />
          <h1 style={{
            fontSize: 36, fontWeight: 700, color: '#111',
            margin: '12px 0 4px', letterSpacing: -0.5,
          }}>
            {currentStreak} Day{currentStreak !== 1 ? 's' : ''}
          </h1>
          <p style={{ fontSize: 15, color: '#6b7280', margin: 0 }}>
            {streakMessage}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 16 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 600, color: '#1e40af' }}>{longestStreak}</div>
              <div style={{ fontSize: 11, color: '#9ca3af' }}>Longest Streak</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 600, color: '#d97706' }}>{totalXP.toLocaleString()}</div>
              <div style={{ fontSize: 11, color: '#9ca3af' }}>Total XP</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 600, color: '#16a34a' }}>{freezeAvailable}</div>
              <div style={{ fontSize: 11, color: '#9ca3af' }}>Freezes</div>
            </div>
          </div>
        </motion.div>

        {/* Check-in Button */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          {checkedInToday ? (
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 32px', borderRadius: 16,
                background: '#dcfce7', border: '1px solid #bbf7d0',
                color: '#16a34a', fontSize: 16, fontWeight: 600,
                cursor: 'default',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Checked In Today
            </motion.div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              onClick={handleCheckIn}
              disabled={checkingIn}
              style={{
                padding: '16px 40px', borderRadius: 16,
                border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
                color: '#fff', fontSize: 18, fontWeight: 700,
                boxShadow: '0 4px 20px rgba(30,64,175,0.3)',
                fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
                opacity: checkingIn ? 0.7 : 1,
              }}
            >
              {checkingIn ? 'Checking In...' : 'Check In Today'}
            </motion.button>
          )}
        </div>

        {/* XP Progress */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: '#374151' }}>XP This Week</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#d97706' }}>{weeklyXP} / 500 XP</span>
          </div>
          <div style={{ width: '100%', height: 8, borderRadius: 4, background: '#f1f5f9', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((weeklyXP / 500) * 100, 100)}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{
                height: '100%', borderRadius: 4,
                background: 'linear-gradient(90deg, #fbbf24, #f59e0b)',
              }}
            />
          </div>
        </div>

        {/* Activity Calendar */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1f2937', margin: '0 0 16px' }}>
            Activity Calendar
          </h3>
          {checkInDates.length === 0 ? (
            <p style={{ fontSize: 13, color: '#9ca3af', textAlign: 'center', padding: 16 }}>
              Start studying to fill your calendar!
            </p>
          ) : (
            <CalendarHeatmap checkInDates={checkInDates} />
          )}
        </div>

        {/* Achievements */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1f2937', margin: '0 0 16px' }}>
            Achievements ({achievements.length}/{allAchievements.length})
          </h3>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: 10,
          }}>
            {allAchievements.map((ach) => (
              <AchievementCard
                key={ach.id}
                achievement={ach}
                earned={achievements.some((a) => a.id === ach.id)}
              />
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div style={cardStyle}>
          <h3 style={{
            fontSize: 15, fontWeight: 600, color: '#1f2937', margin: '0 0 8px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            Weekly Leaderboard
            <a href="/leaderboard" style={{ fontSize: 12, color: '#3b82f6', textDecoration: 'none' }}>
              View All →
            </a>
          </h3>
          <LeaderboardCard type="weekly" currentUserId={profileId ?? undefined} />
        </div>
      </div>

      {/* Celebration overlay */}
      {celebration && (
        <CheckInCelebration
          streak={celebration.streak}
          xpEarned={celebration.xpEarned}
          newAchievements={celebration.newAchievements}
          onDismiss={handleDismissCelebration}
        />
      )}

      {/* Achievement toast */}
      {toastAchievement && (
        <AchievementToast
          achievement={toastAchievement}
          onDismiss={() => setToastAchievement(null)}
        />
      )}
    </div>
  );
}
