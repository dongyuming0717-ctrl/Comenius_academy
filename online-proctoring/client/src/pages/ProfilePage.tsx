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
import { ShopItemCard } from '../components/ShopItemCard';
import { RedeemModal } from '../components/RedeemModal';
import {
  checkInToday,
  getUserGamificationData,
  redeemBB8Theme,
  getUserUnlocks,
  redeemAstronaut,
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

  // BB-8 unlock
  const [bb8Unlocked, setBb8Unlocked] = useState(() => localStorage.getItem('bb8_unlocked') === 'true');
  const [bb8Enabled, setBb8Enabled] = useState(() => localStorage.getItem('bb8_enabled') !== 'false');
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [redeeming, setRedeeming] = useState(false);

  // Astronaut unlock
  const [astronautUnlocked, setAstronautUnlocked] = useState(() => localStorage.getItem('astronaut_unlocked') === 'true');
  const [astronautEnabled, setAstronautEnabled] = useState(() => localStorage.getItem('astronaut_enabled') !== 'false');
  const [showAstronautRedeemModal, setShowAstronautRedeemModal] = useState(false);
  const [astronautRedeeming, setAstronautRedeeming] = useState(false);

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

  // Sync BB-8 unlock from database
  useEffect(() => {
    if (!profileId) return;
    getUserUnlocks(profileId).then((unlocks) => {
      const hasBB8 = unlocks.some((u) => u.unlock_key === 'bb8_theme');
      const hasAstronaut = unlocks.some((u) => u.unlock_key === 'astronaut_home');
      setBb8Unlocked(hasBB8);
      setAstronautUnlocked(hasAstronaut);
      localStorage.setItem('bb8_unlocked', hasBB8 ? 'true' : 'false');
      localStorage.setItem('astronaut_unlocked', hasAstronaut ? 'true' : 'false');
    });
  }, [profileId]);

  const handleRedeem = async () => {
    if (!profileId || redeeming) return;
    setRedeeming(true);
    setError('');
    try {
      const result = await redeemBB8Theme();
      if (result.success) {
        setBb8Unlocked(true);
        localStorage.setItem('bb8_unlocked', 'true');
        setShowRedeemModal(false);
        await loadData();
      } else {
        setError(result.error === 'insufficient_xp' ? t('shop.insufficientXP') : t('shop.alreadyUnlocked'));
      }
    } catch {
      setError(t('shop.redeemError'));
    }
    setRedeeming(false);
  };

  const handleAstronautRedeem = async () => {
    if (!profileId || astronautRedeeming) return;
    setAstronautRedeeming(true);
    setError('');
    try {
      const result = await redeemAstronaut();
      if (result.success) {
        setAstronautUnlocked(true);
        setAstronautEnabled(true);
        localStorage.setItem('astronaut_unlocked', 'true');
        localStorage.setItem('astronaut_enabled', 'true');
        setShowAstronautRedeemModal(false);
        await loadData();
      } else {
        setError(result.error === 'insufficient_xp' ? t('shop.insufficientXP') : t('shop.alreadyUnlocked'));
      }
    } catch {
      setError(t('shop.redeemError'));
    }
    setAstronautRedeeming(false);
  };

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
    currentStreak >= 30 ? "You're on fire!" :
    currentStreak >= 7 ? 'Keep it going!' :
    currentStreak >= 3 ? 'Warming up!' :
    'Start your streak today!';

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
            {currentStreak} Day{currentStreak !== 1 ? 's' : ''}
          </h1>
          <p style={{ fontSize: 15, color: '#6b7280', margin: 0 }}>
            {streakMessage}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 16 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 600, color: '#1e40af' }}>{gamData?.longestStreak ?? 0}</div>
              <div style={{ fontSize: 11, color: '#9ca3af' }}>Longest Streak</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 600, color: '#d97706' }}>{gamData?.totalXP?.toLocaleString() ?? '0'}</div>
              <div style={{ fontSize: 11, color: '#9ca3af' }}>Total XP</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 600, color: '#16a34a' }}>{gamData?.freezeAvailable ?? 0}</div>
              <div style={{ fontSize: 11, color: '#9ca3af' }}>Freezes</div>
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
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                opacity: checkingIn ? 0.7 : 1,
              }}
            >
              {checkingIn ? 'Checking In...' : 'Check In Today'}
            </motion.button>
          )}
        </div>

        {/* BB-8 Theme Toggle Unlock */}
        <ShopItemCard
          icon="🤖"
          gradient="#f59e0b, #fbbf24"
          title={t('shop.bb8Title')}
          description={bb8Unlocked ? t('shop.bb8Unlocked') : t('shop.bb8Locked')}
          cost={100}
          unlocked={bb8Unlocked}
          enabled={bb8Enabled}
          canAfford={(gamData?.totalXP ?? 0) >= 100}
          onToggle={() => {
            const next = !bb8Enabled;
            setBb8Enabled(next);
            localStorage.setItem('bb8_enabled', next ? 'true' : 'false');
            window.dispatchEvent(new Event('bb8-toggle-changed'));
          }}
          onRedeem={() => setShowRedeemModal(true)}
        />

        {/* Astronaut Homepage Effect */}
        <ShopItemCard
          icon="🧑‍🚀"
          gradient="#6366f1, #a78bfa"
          title={t('shop.astronautTitle')}
          description={astronautUnlocked ? t('shop.astronautUnlocked') : t('shop.astronautLocked')}
          cost={50}
          unlocked={astronautUnlocked}
          enabled={astronautEnabled}
          canAfford={(gamData?.totalXP ?? 0) >= 50}
          onToggle={() => {
            const next = !astronautEnabled;
            setAstronautEnabled(next);
            localStorage.setItem('astronaut_enabled', next ? 'true' : 'false');
            window.dispatchEvent(new Event('astronaut-toggle-changed'));
          }}
          onRedeem={() => setShowAstronautRedeemModal(true)}
        />

        {/* XP Progress */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: '#374151' }}>XP This Week</span>
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
            Activity Calendar
          </h3>
          {(gamData?.checkInDates?.length ?? 0) === 0 ? (
            <p style={{ fontSize: 13, color: '#9ca3af', textAlign: 'center', padding: 16 }}>
              Start studying to fill your calendar!
            </p>
          ) : (
            <CalendarHeatmap checkInDates={gamData?.checkInDates ?? []} />
          )}
        </div>

        {/* Achievements */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1f2937', margin: '0 0 16px' }}>
            Achievements ({gamData?.achievements?.length ?? 0}/{gamData?.allAchievements?.length ?? 0})
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
            Weekly Leaderboard
          </h3>
          <LeaderboardCard type="weekly" currentUserId={profileId ?? undefined} />
        </div>

        {/* Profile Form */}
        <div style={{ ...cardStyle, marginBottom: 20 }}>
          <h2 style={{ margin: '0 0 20px', fontSize: 16, fontWeight: 600, color: '#1f2937' }}>
            {t('profile.profileInformation')}
          </h2>
          <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={labelStyle}>{t('profile.fullName')}</label>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>{t('profile.email')}</label>
              <input type="email" value={email} disabled style={{ ...inputStyle, background: '#f9fafb', color: '#9ca3af' }} />
              <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 4 }}>{t('profile.emailCannotBeChanged')}</div>
            </div>
            <div>
              <label style={labelStyle}>{t('profile.targetUniversity')}</label>
              <input
                type="text" value={targetUni}
                onChange={(e) => setTargetUni(e.target.value)}
                placeholder={t('profile.targetUniversityPlaceholder')}
                style={inputStyle}
              />
            </div>
            {error && (
              <div style={{ padding: '10px 14px', background: '#fef2f2', borderRadius: 8, border: '1px solid #fecaca', color: '#dc2626', fontSize: 13 }}>
                {error}
              </div>
            )}
            {success && (
              <div style={{ padding: '10px 14px', background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0', color: '#16a34a', fontSize: 13 }}>
                {success}
              </div>
            )}
            <button
              type="submit"
              disabled={saving}
              style={{
                padding: '10px 24px', background: saving ? '#93c5fd' : '#1e40af',
                color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer',
                fontSize: 14, fontWeight: 500, alignSelf: 'flex-start',
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              }}
            >
              {saving ? t('profile.saving') : t('profile.saveChanges')}
            </button>
          </form>
        </div>

        {/* Change Password */}
        <div style={cardStyle}>
          <h2 style={{ margin: '0 0 20px', fontSize: 16, fontWeight: 600, color: '#1f2937' }}>
            {t('profile.changePassword')}
          </h2>
          <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={labelStyle}>{t('profile.newPassword')}</label>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required minLength={6} placeholder={t('profile.newPasswordPlaceholder')} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>{t('profile.confirmNewPassword')}</label>
              <input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} required minLength={6} placeholder={t('profile.confirmPasswordPlaceholder')} style={inputStyle} />
            </div>
            {passwordError && (
              <div style={{ padding: '10px 14px', background: '#fef2f2', borderRadius: 8, border: '1px solid #fecaca', color: '#dc2626', fontSize: 13 }}>
                {passwordError}
              </div>
            )}
            {passwordSuccess && (
              <div style={{ padding: '10px 14px', background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0', color: '#16a34a', fontSize: 13 }}>
                {passwordSuccess}
              </div>
            )}
            <button
              type="submit"
              disabled={changingPassword}
              style={{
                padding: '10px 24px', background: changingPassword ? '#93c5fd' : '#1e40af',
                color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer',
                fontSize: 14, fontWeight: 500, alignSelf: 'flex-start',
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              }}
            >
              {changingPassword ? t('profile.updating') : t('profile.updatePassword')}
            </button>
          </form>
        </div>
      </div>

      {/* Redemption modal */}
      {showRedeemModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowRedeemModal(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff', borderRadius: 20, padding: '40px 36px',
              maxWidth: 420, width: '90%', textAlign: 'center',
              boxShadow: '0 25px 80px rgba(0,0,0,0.25)',
            }}
          >
            <div style={{ fontSize: 64, marginBottom: 16 }}>🤖</div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1f2937', margin: '0 0 8px' }}>
              {t('shop.redeemBB8Title')}
            </h2>
            <p style={{ fontSize: 14, color: '#6b7280', margin: '0 0 20px', lineHeight: 1.5 }}>
              {t('shop.redeemBB8Description')}
            </p>
            <div style={{
              padding: '10px 16px', borderRadius: 10,
              background: '#fef3c7', marginBottom: 24,
              display: 'flex', justifyContent: 'space-between',
            }}>
              <span style={{ fontSize: 13, color: '#92400e' }}>{t('shop.cost')}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#d97706' }}>100 XP</span>
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button
                onClick={() => setShowRedeemModal(false)}
                style={{
                  padding: '10px 24px', borderRadius: 10,
                  border: '1px solid #d1d5db', background: '#fff',
                  color: '#374151', fontSize: 14, fontWeight: 500, cursor: 'pointer',
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                }}
              >
                {t('shop.cancel')}
              </button>
              <button
                onClick={handleRedeem}
                disabled={redeeming}
                style={{
                  padding: '10px 24px', borderRadius: 10, border: 'none',
                  background: redeeming ? '#93c5fd' : '#1e40af',
                  color: '#fff', fontSize: 14, fontWeight: 600, cursor: redeeming ? 'default' : 'pointer',
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                }}
              >
                {redeeming ? t('shop.redeeming') : t('shop.redeem')}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Astronaut redemption modal */}
      {showAstronautRedeemModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowAstronautRedeemModal(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff', borderRadius: 20, padding: '40px 36px',
              maxWidth: 420, width: '90%', textAlign: 'center',
              boxShadow: '0 25px 80px rgba(0,0,0,0.25)',
            }}
          >
            <div style={{ fontSize: 64, marginBottom: 16 }}>🧑‍🚀</div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1f2937', margin: '0 0 8px' }}>
              {t('shop.redeemAstronautTitle')}
            </h2>
            <p style={{ fontSize: 14, color: '#6b7280', margin: '0 0 20px', lineHeight: 1.5 }}>
              {t('shop.redeemAstronautDescription')}
            </p>
            <div style={{
              padding: '10px 16px', borderRadius: 10,
              background: '#ede9fe', marginBottom: 24,
              display: 'flex', justifyContent: 'space-between',
            }}>
              <span style={{ fontSize: 13, color: '#6d28d9' }}>{t('shop.cost')}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#7c3aed' }}>50 XP</span>
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button
                onClick={() => setShowAstronautRedeemModal(false)}
                style={{
                  padding: '10px 24px', borderRadius: 10,
                  border: '1px solid #d1d5db', background: '#fff',
                  color: '#374151', fontSize: 14, fontWeight: 500, cursor: 'pointer',
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                }}
              >
                {t('shop.cancel')}
              </button>
              <button
                onClick={handleAstronautRedeem}
                disabled={astronautRedeeming}
                style={{
                  padding: '10px 24px', borderRadius: 10, border: 'none',
                  background: astronautRedeeming ? '#c4b5fd' : '#6366f1',
                  color: '#fff', fontSize: 14, fontWeight: 600, cursor: astronautRedeeming ? 'default' : 'pointer',
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                }}
              >
                {astronautRedeeming ? t('shop.redeeming') : t('shop.redeem')}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

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
