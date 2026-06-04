import { useEffect, useState, type FormEvent } from 'react';
import { useProctor } from '../sdk/useProctor';
import { TopNav } from '../components/TopNav';
import { supabase } from '../supabase';
import { useLocale } from '../i18n/LocaleContext';

export function ProfilePage() {
  const { user } = useProctor();
  const { t } = useLocale();
  const [fullName, setFullName] = useState('');
  const [targetUni, setTargetUni] = useState('');
  const [email, setEmail] = useState('');
  const [profileId, setProfileId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Password change
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  // Stats
  const [stats, setStats] = useState({ examsTaken: 0, questionsDone: 0, avgScore: 0, memberSince: '' });

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
  }, [user]);

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
      setCurrentPassword('');
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
    padding: '28px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    marginBottom: 24,
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

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: '#ffffff' }}>
      <TopNav currentPage="profile" />

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '32px 20px 60px' }}>
        <h1 style={{ margin: '0 0 4px', fontSize: 26, fontWeight: 600, color: '#111' }}>
          {t('profile.myProfile')}
        </h1>
        <p style={{ margin: '0 0 32px', fontSize: 14, color: '#6b7280' }}>
          {t('profile.manageAccount')}
        </p>

        {/* Stats summary */}
        <div style={{ display: 'flex', gap: 14, marginBottom: 24 }}>
          {[
            { key: 'profile.examsTaken', value: stats.examsTaken },
            { key: 'profile.questionsDone', value: stats.questionsDone },
            { key: 'profile.averageScore', value: stats.avgScore },
            { key: 'profile.memberSince', value: stats.memberSince },
          ].map((s) => (
            <div key={s.key} style={{
              flex: 1, background: '#fff', borderRadius: 10, border: '1px solid #e5e7eb',
              padding: '18px 16px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            }}>
              <div style={{ fontSize: 22, fontWeight: 600, color: '#1e40af' }}>{s.value}</div>
              <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 4 }}>{t(s.key)}</div>
            </div>
          ))}
        </div>

        {/* Profile Form */}
        <div style={cardStyle}>
          <h2 style={{ margin: '0 0 20px', fontSize: 16, fontWeight: 600, color: '#1f2937' }}>
            {t('profile.profileInformation')}
          </h2>
          <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={labelStyle}>{t('profile.fullName')}</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>{t('profile.email')}</label>
              <input
                type="email"
                value={email}
                disabled
                style={{ ...inputStyle, background: '#f9fafb', color: '#9ca3af' }}
              />
              <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 4 }}>{t('profile.emailCannotBeChanged')}</div>
            </div>
            <div>
              <label style={labelStyle}>{t('profile.targetUniversity')}</label>
              <input
                type="text"
                value={targetUni}
                onChange={(e) => setTargetUni(e.target.value)}
                placeholder={t('profile.targetUniversityPlaceholder')}
                style={inputStyle}
              />
            </div>

            {error && (
              <div style={{
                padding: '10px 14px', background: '#fef2f2', borderRadius: 8,
                border: '1px solid #fecaca', color: '#dc2626', fontSize: 13,
              }}>
                {error}
              </div>
            )}
            {success && (
              <div style={{
                padding: '10px 14px', background: '#f0fdf4', borderRadius: 8,
                border: '1px solid #bbf7d0', color: '#16a34a', fontSize: 13,
              }}>
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
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
                placeholder={t('profile.newPasswordPlaceholder')}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>{t('profile.confirmNewPassword')}</label>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
                minLength={6}
                placeholder={t('profile.confirmPasswordPlaceholder')}
                style={inputStyle}
              />
            </div>

            {passwordError && (
              <div style={{
                padding: '10px 14px', background: '#fef2f2', borderRadius: 8,
                border: '1px solid #fecaca', color: '#dc2626', fontSize: 13,
              }}>
                {passwordError}
              </div>
            )}
            {passwordSuccess && (
              <div style={{
                padding: '10px 14px', background: '#f0fdf4', borderRadius: 8,
                border: '1px solid #bbf7d0', color: '#16a34a', fontSize: 13,
              }}>
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
    </div>
  );
}
