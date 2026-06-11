import { useEffect, useState, useCallback, type FormEvent } from 'react';
import { useProctor } from '../sdk/useProctor';
import { TopNav } from '../components/TopNav';
import { supabase } from '../supabase';
import { useLocale } from '../i18n/LocaleContext';
import { StreakFlame } from '../components/StreakFlame';
import { CalendarHeatmap } from '../components/CalendarHeatmap';
import { AchievementCard } from '../components/AchievementCard';
import { AchievementToast } from '../components/AchievementToast';
import { CheckInCelebration } from '../components/CheckInCelebration';
import { LeaderboardCard } from '../components/LeaderboardCard';
import {
  checkInToday,
  getUserGamificationData,
  type CheckInResult,
  type GamificationData,
  type Achievement,
} from '../services/gamification';
import { motion } from 'framer-motion';

export function ProfilePage() {
  const { user } = useProctor();
  const { t, locale } = useLocale();

  // Profile form state
  const [fullName, setFullName] = useState('');
  const [targetUni, setTargetUni] = useState('');
  const [email, setEmail] = useState('');
  const [profileId, setProfileId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Password change
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  // Legacy stats
  const [stats, setStats] = useState({ examsTaken: 0, questionsDone: 0, avgScore: 0, memberSince: '' });

  // Gamification
  const [gamData, setGamData] = useState<GamificationData | null>(null);
  const [checkingIn, setCheckingIn] = useState(false);
  const [celebration, setCelebration] = useState<CheckInResult | null>(null);
  const [toastAchievement, setToastAchievement] = useState<Achievement | null>(null);

  const loadData = useCallback(async () => {
    if (!profileId) return;
    const gd = await getUserGamificationData(profileId, locale);
    setGamData(gd);
  }, [profileId, locale]);

  useEffect(() => {
    if (!user) return;
    async function load() {
      const { data: profile } = await supabase
        .from('users')
        .select('id, full_name, email, target_uni, created_at')
        .eq('auth_id', user!.id)
        .single();

      if (profile) {
        setProfileId(profile.id);
        setFullName(profile.full_name || '');
        setEmail(profile.email || '');
        setTargetUni(profile.target_uni || '');

        const { data: sessions } = await supabase
          .from('exam_sessions')
          .select('id, answers, score, paper_id')
          .eq('user_id', profile.id)
          .eq('status', 'completed');

        if (sessions) {
          let totalQuestions = 0;
          let totalScore = 0;
          for (const s of sessions) {
            totalQuestions += Object.keys(s.answers || {}).length;
            totalScore += s.score || 0;
          }
          setStats({
            examsTaken: sessions.length,
            questionsDone: totalQuestions,
            avgScore: sessions.length > 0 ? Math.round((totalScore / sessions.length) * 100) / 100 : 0,
            memberSince: profile.created_at
              ? new Date(profile.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
              : t('profile.na'),
          });
        }
      }
      setLoading(false);
    }
    load();
  }, [user, t]);

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

  const handleSaveProfile = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);
    const { error: updateError } = await supabase
      .from('users')
      .update({ full_name: fullName, target_uni: targetUni || null })
      .eq('auth_id', user!.id);
    setSaving(false);
    if (updateError) {
      setError(updateError.message);
    } else {
      setSuccess(t('profile.profileUpdated'));
    }
  };

  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');
    if (newPassword !== confirmNewPassword) {
      setPasswordError(t('profile.passwordsDoNotMatch'));
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError(t('profile.passwordTooShort'));
      return;
    }
    setChangingPassword(true);
    const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
    setChangingPassword(false);
    if (updateError) {
      setPasswordError(updateError.message.includes('re-authenticate')
        ? t('profile.sessionExpired')
        : updateError.message);
    } else {
      setPasswordSuccess(t('profile.passwordChanged'));
      setNewPassword('');
      setConfirmNewPassword('');
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: '#ffffff' }}>
        <TopNav currentPage="profile" />
        <div style={{ padding: 40, textAlign: 'center', color: '#9ca3af' }}>{t('profile.loading')}</div>
      </div>
    );
  }

  const cardStyle: React.CSSProperties = {
    background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb',
    padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    marginBottom: 20,
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 14px', border: '1px solid #d1d5db',
    borderRadius: 8, fontSize: 14, outline: 'none',
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: '#374151',
  };

  const currentStreak = gamData?.currentStreak ?? 0;
  const checkedInToday = gamData?.checkedInToday ?? false;

  const streakMessage =
    currentStreak >= 30 ? t('profile.streakMessage30') :
    currentStreak >= 7 ? t('profile.streakMessage7') :
    currentStreak >= 3 ? t('profile.streakMessage3') :
    t('profile.streakMessage0');

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: '#ffffff' }}>
      <TopNav currentPage="profile" />

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '32px 20px 60px' }}>
        {/* Hero — Streak */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: 24 }}
        >
          <StreakFlame streak={currentStreak} size="lg" />
          <h1 style={{
            fontSize: 36, fontWeight: 700, color: '#111',
            margin: '12px 0 4px', letterSpacing: -0.5,
          }}>
            {currentStreak} {currentStreak !== 1 ? t('profile.days') : t('profile.day')}
          </h1>
          <p style={{ fontSize: 15, color: '#6b7280', margin: 0 }}>
            {streakMessage}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 16 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 600, color: '#1e40af' }}>{gamData?.longestStreak ?? 0}</div>
              <div style={{ fontSize: 11, color: '#9ca3af' }}>{t('profile.longestStreak')}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 600, color: '#d97706' }}>{gamData?.totalXP?.toLocaleString() ?? '0'}</div>
              <div style={{ fontSize: 11, color: '#9ca3af' }}>{t('profile.totalXP')}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 600, color: '#16a34a' }}>{gamData?.freezeAvailable ?? 0}</div>
              <div style={{ fontSize: 11, color: '#9ca3af' }}>{t('profile.freezes')}</div>
            </div>
          </div>
        </motion.div>

        {/* Check-in Button */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
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
              {t('profile.checkedInToday')}
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
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                opacity: checkingIn ? 0.7 : 1,
              }}
            >
              {checkingIn ? t('profile.checkingIn') : t('profile.checkInToday')}
            </motion.button>
          )}
        </div>

        {/* XP Progress */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: '#374151' }}>{t('profile.xpThisWeek')}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#d97706' }}>{gamData?.weeklyXP ?? 0} / 500 XP</span>
          </div>
          <div style={{ width: '100%', height: 8, borderRadius: 4, background: '#f1f5f9', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(((gamData?.weeklyXP ?? 0) / 500) * 100, 100)}%` }}
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
            {t('profile.activityCalendar')}
          </h3>
          {(gamData?.checkInDates?.length ?? 0) === 0 ? (
            <p style={{ fontSize: 13, color: '#9ca3af', textAlign: 'center', padding: 16 }}>
              {t('profile.emptyCalendar')}
            </p>
          ) : (
            <CalendarHeatmap checkInDates={gamData?.checkInDates ?? []} />
          )}
        </div>

        {/* Achievements */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1f2937', margin: '0 0 16px' }}>
            {t('profile.achievements')} ({gamData?.achievements?.length ?? 0}/{gamData?.allAchievements?.length ?? 0})
          </h3>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: 10,
          }}>
            {(gamData?.allAchievements ?? []).map((ach) => (
              <AchievementCard
                key={ach.id}
                achievement={ach}
                earned={gamData?.achievements?.some((a: Achievement) => a.id === ach.id) ?? false}
              />
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1f2937', margin: '0 0 8px' }}>
            {t('profile.weeklyLeaderboard')}
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
          onDismiss={() => setCelebration(null)}
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
