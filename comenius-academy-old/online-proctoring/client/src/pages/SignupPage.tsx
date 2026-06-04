import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TopNav } from '../components/TopNav';
import { supabase } from '../supabase';
import { useLocale } from '../i18n/LocaleContext';
import { colors, typography, radii } from '../theme/tokens';

const font = typography.fontFamily;

export function SignupPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { t } = useLocale();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError(t('signup.errorPasswordMismatch'));
      return;
    }

    if (!agreeTerms) {
      setError(t('signup.errorAgreeTerms'));
      return;
    }

    setLoading(true);

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    setSuccess(t('signup.success'));
    setTimeout(() => navigate('/login'), 1500);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '8px 12px', border: `1px solid ${colors.border}`,
    borderRadius: radii.md, fontSize: typography.size.base, outline: 'none',
    fontFamily: font, boxSizing: 'border-box',
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
      <TopNav minimal />

      <div style={{ maxWidth: 440, margin: '40px auto', padding: '0 20px' }}>
        <div style={{
          background: colors.card, borderRadius: radii.lg, padding: '40px 36px',
          border: `1px solid ${colors.borderAlpha}`, boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 12, background: `rgba(30,64,175,0.1)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
            </div>
            <h2 style={{ margin: '0 0 6px', fontSize: 24, fontWeight: 600, color: colors.foreground }}>
              {t('signup.createAccount')}
            </h2>
            <p style={{ margin: 0, fontSize: typography.size.base, color: colors.mutedForeground }}>
              {t('signup.subtitle')}
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: typography.size.base, fontWeight: 500, marginBottom: 6, color: colors.foreground }}>
                {t('signup.fullNameLabel')}
              </label>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}
                required placeholder={t('signup.fullNamePlaceholder')}
                style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: typography.size.base, fontWeight: 500, marginBottom: 6, color: colors.foreground }}>
                {t('signup.emailLabel')}
              </label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                required placeholder={t('signup.emailPlaceholder')}
                style={inputStyle} onFocus={focusStyle} onBlur={blurStyle} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: typography.size.base, fontWeight: 500, marginBottom: 6, color: colors.foreground }}>
                {t('signup.passwordLabel')}
              </label>
              <div style={{ position: 'relative' }}>
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
                  required placeholder={t('signup.passwordPlaceholder')} minLength={6}
                  style={{ ...inputStyle, paddingRight: 40 }} onFocus={focusStyle} onBlur={blurStyle} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: colors.mutedForeground, padding: 4, display: 'flex' }}
                  aria-label="Toggle password visibility">
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19M14.12 14.12a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: typography.size.base, fontWeight: 500, marginBottom: 6, color: colors.foreground }}>
                {t('signup.confirmPasswordLabel')}
              </label>
              <div style={{ position: 'relative' }}>
                <input type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                  required placeholder={t('signup.confirmPasswordPlaceholder')} minLength={6}
                  style={{ ...inputStyle, paddingRight: 40 }} onFocus={focusStyle} onBlur={blurStyle} />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: colors.mutedForeground, padding: 4, display: 'flex' }}
                  aria-label="Toggle password visibility">
                  {showConfirmPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19M14.12 14.12a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
            </div>

            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: typography.size.base, color: colors.mutedForeground, cursor: 'pointer' }}>
              <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)}
                style={{ width: 15, height: 15, cursor: 'pointer', marginTop: 1 }} />
              <span>
                {t('signup.agreeToTerms')}{' '}
                <Link to="/terms" target="_blank" style={{ color: colors.primary, fontWeight: 500, textDecoration: 'underline' }}>{t('signup.termsOfService')}</Link>
                {' '}{t('signup.and')}{' '}
                <Link to="/privacy" target="_blank" style={{ color: colors.primary, fontWeight: 500, textDecoration: 'underline' }}>{t('signup.privacyPolicy')}</Link>
              </span>
            </label>

            {error && (
              <div style={{
                padding: '10px 14px', background: colors.destructiveBg, borderRadius: radii.lg,
                border: `1px solid ${colors.destructiveBorder}`, color: colors.destructive, fontSize: typography.size.sm,
              }}>
                {error}
              </div>
            )}

            {success && (
              <div style={{
                padding: '10px 14px', background: colors.successBg, borderRadius: radii.lg,
                border: `1px solid ${colors.successBorder}`, color: colors.success, fontSize: typography.size.sm,
              }}>
                {success}
              </div>
            )}

            <button
              type="submit" disabled={loading}
              style={{
                width: '100%', padding: '10px 20px', background: loading ? '#93c5fd' : colors.primary,
                color: colors.primaryForeground, border: 'none', borderRadius: radii.md, cursor: 'pointer',
                fontSize: typography.size.base, fontWeight: 500, fontFamily: font,
              }}
            >
              {loading ? t('signup.loading') : t('signup.submitButton')}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 24, fontSize: typography.size.base, color: colors.mutedForeground }}>
            {t('signup.hasAccount')}{' '}
            <Link to="/login" style={{ color: colors.primary, textDecoration: 'underline', fontWeight: 500 }}>
              {t('signup.loginLink')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
