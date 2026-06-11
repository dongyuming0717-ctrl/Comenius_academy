import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useProctor } from '../sdk/useProctor';
import { TopNav } from '../components/TopNav';
import { supabase } from '../supabase';
import { useLocale } from '../i18n/LocaleContext';

export function RoleSelectionPage() {
  const { user } = useProctor();
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [codeLoading, setCodeLoading] = useState(false);
  const { t } = useLocale();

  const INVITE_CODE = 'TMUA_TEACHER_2024';

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    async function fetchRole() {
      const { data } = await supabase
        .from('users')
        .select('role')
        .eq('auth_id', user!.id)
        .single();
      const r = data?.role || 'student';
      setRole(r);
      setLoading(false);

      if (localStorage.getItem('comenius_role_selected') === 'true' && data?.role) {
        navigate(r === 'teacher' || r === 'admin' ? '/teacher' : '/');
      }
    }
    fetchRole();
  }, [user, navigate]);

  const handleTeacherClick = () => {
    if (role === 'teacher' || role === 'admin') {
      localStorage.setItem('comenius_role_selected', 'true');
      navigate('/teacher');
    } else {
      setShowCodeModal(true);
      setCodeError('');
      setInviteCode('');
    }
  };

  const handleVerifyCode = async () => {
    if (inviteCode !== INVITE_CODE) {
      setCodeError(t('roleSelection.errorInvalidCode'));
      return;
    }
    setCodeLoading(true);
    const { error } = await supabase
      .from('users')
      .update({ role: 'teacher' })
      .eq('auth_id', user!.id);
    setCodeLoading(false);

    if (error) {
      setCodeError(error.message);
      return;
    }
    setShowCodeModal(false);
    localStorage.setItem('comenius_role_selected', 'true');
    navigate('/teacher');
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: '#ffffff', color: '#888',
      }}>
        {t('roleSelection.loading')}
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: '#ffffff' }}>
      {/* Top Nav */}
      <TopNav currentPage="home" />

      {/* Role Selection Cards */}
      <div style={{
        maxWidth: 720, margin: '80px auto', padding: '0 20px',
        display: 'flex', gap: 24, justifyContent: 'center',
      }}>
        {/* Student Card */}
        <div
          onClick={() => {
            localStorage.setItem('comenius_role_selected', 'true');
            navigate('/');
          }}
          style={{
            flex: 1, maxWidth: 320, background: '#fff', borderRadius: 12,
            border: '2px solid #e5e7eb', padding: '40px 28px',
            cursor: 'pointer', textAlign: 'center',
            transition: 'border-color 0.2s, box-shadow 0.2s',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#1e40af';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(48,108,160,0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#e2e8f0';
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
          }}
        >
          <div style={{
            width: 64, height: 64, borderRadius: '50%', background: '#eff6ff',
            margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28,
          }}>
            🎓
          </div>
          <h2 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 600, color: '#1f2937' }}>{t('roleSelection.studentTitle')}</h2>
          <p style={{ margin: '0 0 24px', fontSize: 14, color: '#6b7280', lineHeight: 1.6 }}>
            {t('roleSelection.studentDescription')}
          </p>
          <span style={{
            display: 'inline-block', padding: '10px 32px', background: '#1e40af',
            color: '#fff', borderRadius: 6, fontSize: 15, fontWeight: 500,
          }}>
            {t('roleSelection.enterStudent')}
          </span>
        </div>

        {/* Teacher Card */}
        <div
          onClick={handleTeacherClick}
          style={{
            flex: 1, maxWidth: 320, background: '#fff', borderRadius: 12,
            border: '2px solid #e5e7eb', padding: '40px 28px',
            cursor: 'pointer', textAlign: 'center',
            transition: 'border-color 0.2s, box-shadow 0.2s',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#1e40af';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(48,108,160,0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#e2e8f0';
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
          }}
        >
          <div style={{
            width: 64, height: 64, borderRadius: '50%', background: '#eff6ff',
            margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28,
          }}>
            📊
          </div>
          <h2 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 600, color: '#1f2937' }}>{t('roleSelection.teacherTitle')}</h2>
          <p style={{ margin: '0 0 24px', fontSize: 14, color: '#6b7280', lineHeight: 1.6 }}>
            {t('roleSelection.teacherDescription')}
          </p>
          <span style={{
            display: 'inline-block', padding: '10px 32px', background: '#1e40af',
            color: '#fff', borderRadius: 6, fontSize: 15, fontWeight: 500,
          }}>
            {t('roleSelection.enterTeacher')}
          </span>
        </div>
      </div>

      {/* Invite Code Modal */}
      {showCodeModal && (
        <div
          onClick={() => setShowCodeModal(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff', borderRadius: 12, padding: '32px 28px',
              maxWidth: 380, width: '100%', boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            }}
          >
            <h3 style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 600, color: '#1f2937' }}>
              {t('roleSelection.modalTitle')}
            </h3>
            <p style={{ margin: '0 0 20px', fontSize: 13, color: '#6b7280', lineHeight: 1.5 }}>
              {t('roleSelection.modalDescription')}
            </p>
            <input
              type="text"
              value={inviteCode}
              onChange={(e) => { setInviteCode(e.target.value); setCodeError(''); }}
              placeholder={t('roleSelection.modalPlaceholder')}
              onKeyDown={(e) => { if (e.key === 'Enter') handleVerifyCode(); }}
              style={{
                width: '100%', padding: '10px 14px', border: '1px solid #d1d5db',
                borderRadius: 8, fontSize: 14, outline: 'none',
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                boxSizing: 'border-box',
              }}
            />
            {codeError && (
              <div style={{
                marginTop: 12, padding: '10px 12px', background: '#fef2f2',
                borderRadius: 8, border: '1px solid #fecaca', color: '#dc2626', fontSize: 13,
              }}>
                {codeError}
              </div>
            )}
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button
                onClick={() => setShowCodeModal(false)}
                style={{
                  flex: 1, padding: '10px', border: '1px solid #d1d5db', borderRadius: 6,
                  background: '#fff', cursor: 'pointer', fontSize: 14,
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif", color: '#374151',
                }}
              >
                {t('roleSelection.cancel')}
              </button>
              <button
                onClick={handleVerifyCode}
                disabled={codeLoading || !inviteCode}
                style={{
                  flex: 1, padding: '10px', border: 'none', borderRadius: 6,
                  background: codeLoading || !inviteCode ? '#93c5fd' : '#1e40af',
                  color: '#fff', cursor: codeLoading || !inviteCode ? 'not-allowed' : 'pointer',
                  fontSize: 14, fontWeight: 500,
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                }}
              >
                {codeLoading ? t('roleSelection.verifying') : t('roleSelection.verify')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
