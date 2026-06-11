import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TopNav } from '../components/TopNav';
import { supabase } from '../supabase';
import { useLocale } from '../i18n/LocaleContext';
import { colors, typography, radii } from '../theme/tokens';

const font = typography.fontFamily;

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { t } = useLocale();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    navigate('/select-role');
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '8px 12px', border: `1px solid ${colors.border}`,
    borderRadius: radii.md, fontSize: typography.size.base, outline: 'none',
    fontFamily: font, boxSizing: 'border-box',
  };

  return (
    <div style={{ minHeight: '100vh', fontFamily: font, background: colors.background }}>
      <TopNav minimal />

      <div style={{ maxWidth: 420, margin: '60px auto', padding: '0 20px' }}>
        <div style={{
          background: colors.card, borderRadius: radii.lg, padding: '40px 36px',
          border: `1px solid ${colors.borderAlpha}`, boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 12, background: `rgba(30,64,175,0.1)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
            </div>
            <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 600, color: colors.foreground }}>
              {t('login.welcomeBack')}
            </h2>
            <p style={{ margin: 0, fontSize: typography.size.base, color: colors.mutedForeground }}>
              {t('login.subtitle')}
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: typography.size.base, fontWeight: 500, marginBottom: 6, color: colors.foreground }}>
                {t('login.emailLabel')}
              </label>
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                required placeholder={t('login.emailPlaceholder')}
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = colors.primary; e.target.style.boxShadow = '0 0 0 2px rgba(30,64,175,0.2)'; }}
                onBlur={(e) => { e.target.style.borderColor = colors.border; e.target.style.boxShadow = 'none'; }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: typography.size.base, fontWeight: 500, marginBottom: 6, color: colors.foreground }}>
                {t('login.passwordLabel')}
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
                  required placeholder={t('login.passwordPlaceholder')} minLength={6}
                  style={{ ...inputStyle, paddingRight: 40 }}
                  onFocus={(e) => { e.target.style.borderColor = colors.primary; e.target.style.boxShadow = '0 0 0 2px rgba(30,64,175,0.2)'; }}
                  onBlur={(e) => { e.target.style.borderColor = colors.border; e.target.style.boxShadow = 'none'; }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: colors.mutedForeground,
                    padding: 4, display: 'flex',
                  }}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19M14.12 14.12a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Link to="/reset-password" style={{ fontSize: typography.size.base, color: colors.primary, textDecoration: 'none' }}>
                {t('login.forgotPassword')}
              </Link>
            </div>

            {error && (
              <div style={{
                padding: '10px 14px', background: colors.destructiveBg, borderRadius: radii.lg,
                border: `1px solid ${colors.destructiveBorder}`, color: colors.destructive, fontSize: typography.size.sm,
              }}>
                {error}
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
              {loading ? t('login.loading') : t('login.submitButton')}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 24, fontSize: typography.size.base, color: colors.mutedForeground }}>
            {t('login.noAccount')}{' '}
            <Link to="/signup" style={{ color: colors.primary, textDecoration: 'underline', fontWeight: 500 }}>
              {t('login.signUpLink')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
