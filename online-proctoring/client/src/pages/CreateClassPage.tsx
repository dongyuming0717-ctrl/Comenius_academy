import { useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useProctor } from '../sdk/useProctor';
import { TopNav } from '../components/TopNav';
import { supabase } from '../supabase';
import { useLocale } from '../i18n/LocaleContext';

function genCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export function CreateClassPage() {
  const { t } = useLocale();
  const { user } = useProctor();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [code, setCode] = useState(genCode);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const regenerateCode = useCallback(() => {
    setCode(genCode());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { data: profile } = await supabase
      .from('users')
      .select('id, role')
      .eq('auth_id', user!.id)
      .single();

    if (!profile || (profile.role !== 'teacher' && profile.role !== 'admin')) {
      setError(t('teacherCreateClass.onlyTeachersError'));
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase.from('classes').insert({
      teacher_id: profile.id,
      title,
      name,
      code,
      password,
    });

    if (insertError) {
      if (insertError.message.includes('unique') || insertError.code === '23505') {
        setError(t('teacherCreateClass.codeExistsError'));
      } else {
        setError(insertError.message);
      }
      setLoading(false);
      return;
    }

    navigate('/teacher');
  };

  const inputStyle = {
    width: '100%', padding: '10px 14px', border: '1px solid #d1d5db',
    borderRadius: 8, fontSize: 14, outline: 'none',
    fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
    boxSizing: 'border-box' as const,
  };

  const hintStyle: React.CSSProperties = {
    fontSize: 11, color: '#9ca3af', marginTop: 4, lineHeight: 1.4,
  };

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Geist', system-ui, -apple-system, sans-serif", background: '#ffffff' }}>
      {/* Top Nav */}
      <TopNav currentPage="teacher" />

      {/* Form */}
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '40px 20px 60px' }}>
        <h1 style={{ margin: '0 0 4px', fontSize: 24, fontWeight: 600, color: '#111' }}>
          {t('teacherCreateClass.pageTitle')}
        </h1>
        <p style={{ margin: '0 0 32px', fontSize: 14, color: '#6b7280' }}>
          {t('teacherCreateClass.subtitle')}
        </p>

        <div style={{
          background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb',
          padding: '32px 28px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        }}>
          <h2 style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 600, color: '#1f2937' }}>
            {t('teacherCreateClass.sectionTitle')}
          </h2>
          <p style={{ margin: '0 0 28px', fontSize: 13, color: '#9ca3af' }}>
            {t('teacherCreateClass.sectionHint')}
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            {/* Title */}
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: '#374151' }}>
                {t('teacherCreateClass.titleLabel')}
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder={t('teacherCreateClass.titlePlaceholder')}
                style={inputStyle}
              />
              <div style={hintStyle}>{t('teacherCreateClass.titleHint')}</div>
            </div>

            {/* Class Name */}
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: '#374151' }}>
                {t('teacherCreateClass.classNameLabel')}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder={t('teacherCreateClass.classNamePlaceholder')}
                style={inputStyle}
              />
              <div style={hintStyle}>{t('teacherCreateClass.classNameHint')}</div>
            </div>

            {/* Class Code */}
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: '#374151' }}>
                {t('teacherCreateClass.classCodeLabel')}
              </label>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  type="text"
                  value={code}
                  readOnly
                  style={{ ...inputStyle, background: '#f9fafb', fontFamily: 'monospace', letterSpacing: '2px', fontWeight: 600, color: '#1e40af', flex: 1 }}
                />
                <button
                  type="button"
                  onClick={regenerateCode}
                  style={{
                    padding: '10px 16px', border: '1px solid #d1d5db', borderRadius: 8,
                    background: '#fff', cursor: 'pointer', fontSize: 18,
                    fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
                  }}
                  title={t('teacherCreateClass.titleTooltip')}
                >
                  ↻
                </button>
              </div>
              <div style={hintStyle}>{t('teacherCreateClass.classCodeHint')}</div>
            </div>

            {/* Class Password */}
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: '#374151' }}>
                {t('teacherCreateClass.classPasswordLabel')}
              </label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder={t('teacherCreateClass.classPasswordPlaceholder')}
                style={inputStyle}
              />
              <div style={hintStyle}>{t('teacherCreateClass.classPasswordHint')}</div>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                padding: '10px 14px', background: '#fef2f2', borderRadius: 8,
                border: '1px solid #fecaca', color: '#dc2626', fontSize: 13,
              }}>
                {error}
              </div>
            )}

            {/* Buttons */}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 8 }}>
              <button
                type="button"
                onClick={() => navigate('/teacher')}
                style={{
                  padding: '10px 28px', border: '1px solid #d1d5db', borderRadius: 6,
                  background: '#fff', cursor: 'pointer', fontSize: 14, color: '#374151',
                  fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
                }}
              >
                {t('teacherCreateClass.cancelButton')}
              </button>
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: '10px 28px', border: 'none', borderRadius: 6,
                  background: loading ? '#93c5fd' : '#1e40af', color: '#fff',
                  cursor: loading ? 'not-allowed' : 'pointer', fontSize: 14, fontWeight: 500,
                  fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
                }}
              >
                {loading ? t('teacherCreateClass.creatingButton') : t('teacherCreateClass.createButton')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
