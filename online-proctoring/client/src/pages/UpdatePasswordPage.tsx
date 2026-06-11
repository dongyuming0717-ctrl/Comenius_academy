import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TopNav } from '../components/TopNav';
import { supabase } from '../supabase';
import { useLocale } from '../i18n/LocaleContext';

export function UpdatePasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { t } = useLocale();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError(t('updatePassword.errorMismatch'));
      return;
    }

    if (password.length < 6) {
      setError(t('updatePassword.errorMinLength'));
      return;
    }

    setLoading(true);

    const { error: updateError } = await supabase.auth.updateUser({ password });

    setLoading(false);
    if (updateError) {
      setError(updateError.message);
    } else {
      setSuccess(t('updatePassword.success'));
      setTimeout(() => navigate('/login'), 2000);
    }
  };

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Geist', system-ui, -apple-system, sans-serif", background: '#ffffff' }}>
      <TopNav minimal />

      <div style={{ maxWidth: 440, margin: '60px auto', padding: '0 20px' }}>
        <div style={{
          background: '#fff', borderRadius: 12, padding: '40px 36px',
          border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <h1 style={{ margin: '0 0 4px', fontSize: 26, fontWeight: 400, color: '#111' }}>
              Comenius
            </h1>
            <h2 style={{ margin: '0 0 6px', fontSize: 22, fontWeight: 600, color: '#1f2937' }}>
              {t('updatePassword.title')}
            </h2>
            <p style={{ margin: 0, fontSize: 14, color: '#6b7280' }}>
              {t('updatePassword.subtitle')}
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: '#374151' }}>
                {t('updatePassword.newPasswordLabel')}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder={t('updatePassword.newPasswordPlaceholder')}
                style={{
                  width: '100%', padding: '10px 14px', border: '1px solid #d1d5db',
                  borderRadius: 8, fontSize: 14, outline: 'none',
                  fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: '#374151' }}>
                {t('updatePassword.confirmPasswordLabel')}
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                placeholder={t('updatePassword.confirmPasswordPlaceholder')}
                style={{
                  width: '100%', padding: '10px 14px', border: '1px solid #d1d5db',
                  borderRadius: 8, fontSize: 14, outline: 'none',
                  fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
                  boxSizing: 'border-box',
                }}
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
              disabled={loading}
              style={{
                width: '100%', padding: '12px', background: loading ? '#93c5fd' : '#1e40af',
                color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer',
                fontSize: 15, fontWeight: 500,
                fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
              }}
            >
              {loading ? t('updatePassword.updating') : t('updatePassword.submitButton')}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 24, fontSize: 13, color: '#6b7280' }}>
            <Link to="/login" style={{ color: '#1e40af', textDecoration: 'underline', fontWeight: 500 }}>
              {t('updatePassword.backToLogin')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
