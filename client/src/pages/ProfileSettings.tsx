import { useState, type FormEvent } from 'react';
import { useProctor } from '../sdk/useProctor';
import { TopNav } from '../components/TopNav';
import { useLocale } from '../i18n/LocaleContext';
import { colors, typography, radii } from '../theme/tokens';

const font = typography.fontFamily;

export function ProfileSettings() {
  const { user } = useProctor();
  const { t } = useLocale();

  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || '');
  const [targetUni, setTargetUni] = useState('');
  const [email] = useState(user?.email || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const handleSaveProfile = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSuccess(t('profile.profileUpdated'));
    }, 300);
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
    setTimeout(() => {
      setChangingPassword(false);
      setNewPassword('');
      setConfirmNewPassword('');
      setPasswordSuccess(t('profile.passwordChanged'));
    }, 300);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '8px 12px', border: `1px solid ${colors.border}`,
    borderRadius: radii.md, fontSize: typography.size.base, outline: 'none',
    fontFamily: font, boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: typography.size.base, fontWeight: 500,
    marginBottom: 6, color: colors.foreground, fontFamily: font,
  };

  const cardStyle: React.CSSProperties = {
    background: colors.card, borderRadius: radii.lg, padding: '32px',
    border: `1px solid ${colors.borderAlpha}`, boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    marginBottom: 20,
  };

  const focusStyle = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = colors.primary;
    e.target.style.boxShadow = '0 0 0 2px rgba(30,64,175,0.2)';
  };
  const blurStyle = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = colors.border;
    e.target.style.boxShadow = 'none';
  };

  return (
    <div style={{ minHeight: '100vh', fontFamily: font, background: colors.background }}>
      <TopNav currentPage="profile" />
      <div style={{ maxWidth: 560, margin: '60px auto', padding: '0 20px' }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, color: colors.foreground, marginBottom: 32 }}>
          {t('profileSettings.title')}
        </h1>

        {/* Profile Information */}
        <div style={cardStyle}>
          <h2 style={{ margin: '0 0 20px', fontSize: 16, fontWeight: 600, color: colors.foreground }}>
            {t('profile.profileInformation')}
          </h2>
          <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={labelStyle}>{t('profile.fullName')}</label>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
            </div>
            <div>
              <label style={labelStyle}>{t('profile.email')}</label>
              <input type="email" value={email} disabled style={{ ...inputStyle, background: '#f9fafb', color: '#9ca3af' }} />
              <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 4 }}>{t('profile.emailCannotBeChanged')}</div>
            </div>
            <div>
              <label style={labelStyle}>{t('profile.targetUniversity')}</label>
              <input type="text" value={targetUni} onChange={(e) => setTargetUni(e.target.value)} placeholder={t('profile.targetUniversityPlaceholder')} style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
            </div>
            {error && (
              <div style={{ padding: '10px 14px', background: colors.destructiveBg, borderRadius: 8, border: `1px solid ${colors.destructiveBorder}`, color: colors.destructive, fontSize: 13 }}>{error}</div>
            )}
            {success && (
              <div style={{ padding: '10px 14px', background: colors.successBg, borderRadius: 8, border: `1px solid ${colors.successBorder}`, color: colors.success, fontSize: 13 }}>{success}</div>
            )}
            <button type="submit" disabled={saving}
              style={{ padding: '10px 24px', background: saving ? '#93c5fd' : colors.primary, color: colors.primaryForeground, border: 'none', borderRadius: radii.md, cursor: 'pointer', fontSize: 14, fontWeight: 500, alignSelf: 'flex-start', fontFamily: font }}>
              {saving ? t('profile.saving') : t('profile.saveChanges')}
            </button>
          </form>
        </div>

        {/* Change Password */}
        <div style={cardStyle}>
          <h2 style={{ margin: '0 0 20px', fontSize: 16, fontWeight: 600, color: colors.foreground }}>
            {t('profile.changePassword')}
          </h2>
          <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={labelStyle}>{t('profile.newPassword')}</label>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required minLength={6} placeholder={t('profile.newPasswordPlaceholder')} style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
            </div>
            <div>
              <label style={labelStyle}>{t('profile.confirmNewPassword')}</label>
              <input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} required minLength={6} placeholder={t('profile.confirmPasswordPlaceholder')} style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
            </div>
            {passwordError && (
              <div style={{ padding: '10px 14px', background: colors.destructiveBg, borderRadius: 8, border: `1px solid ${colors.destructiveBorder}`, color: colors.destructive, fontSize: 13 }}>{passwordError}</div>
            )}
            {passwordSuccess && (
              <div style={{ padding: '10px 14px', background: colors.successBg, borderRadius: 8, border: `1px solid ${colors.successBorder}`, color: colors.success, fontSize: 13 }}>{passwordSuccess}</div>
            )}
            <button type="submit" disabled={changingPassword}
              style={{ padding: '10px 24px', background: changingPassword ? '#93c5fd' : colors.primary, color: colors.primaryForeground, border: 'none', borderRadius: radii.md, cursor: 'pointer', fontSize: 14, fontWeight: 500, alignSelf: 'flex-start', fontFamily: font }}>
              {changingPassword ? t('profile.updating') : t('profile.updatePassword')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
