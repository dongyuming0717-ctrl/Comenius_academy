import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProctor } from '../sdk/useProctor';
import { useLocale } from '../i18n/LocaleContext';
import { TopNav } from '../components/TopNav';
import { supabase } from '../supabase';
import type { Paper } from '../sdk/types';

interface JoinedClass {
  id: string;
  title: string;
  name: string;
  code: string;
  joined_at: string;
}

export function ClassModePage() {
  const { user } = useProctor();
  const { t } = useLocale();
  const navigate = useNavigate();
  const [classCode, setClassCode] = useState('');
  const [classPassword, setClassPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [joinedClass, setJoinedClass] = useState<JoinedClass | null>(null);
  const [myClasses, setMyClasses] = useState<JoinedClass[]>([]);
  const [classPapers, setClassPapers] = useState<Record<string, Paper[]>>({});
  const [expandedClass, setExpandedClass] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    async function fetchMyClasses() {
      const { data: profile } = await supabase
        .from('users')
        .select('id')
        .eq('auth_id', user!.id)
        .single();

      if (!profile) return;

      const { data: enrollments } = await supabase
        .from('class_students')
        .select('class_id, joined_at')
        .eq('student_id', profile.id);

      if (!enrollments || enrollments.length === 0) return;

      const classIds = enrollments.map(e => e.class_id);
      const { data: classData } = await supabase
        .from('classes')
        .select('id, title, name, code')
        .in('id', classIds);

      if (classData) {
        setMyClasses(classData.map(c => ({
          ...c,
          joined_at: enrollments.find(e => e.class_id === c.id)?.joined_at || '',
        })));
      }
    }
    fetchMyClasses();
  }, [user]);

  // Fetch assigned papers when myClasses changes
  useEffect(() => {
    if (myClasses.length === 0) return;
    async function fetchPapers() {
      const map: Record<string, Paper[]> = {};
      for (const c of myClasses) {
        const { data } = await supabase
          .from('class_papers')
          .select('paper_id, papers(id, title, paper_number)')
          .eq('class_id', c.id);
        if (data) {
          map[c.id] = (data as any[])
            .filter(d => d.papers)
            .map(d => d.papers as Paper);
        }
      }
      setClassPapers(map);
    }
    fetchPapers();
  }, [myClasses]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setJoinedClass(null);
    setLoading(true);

    const { data: classData, error: classError } = await supabase
      .from('classes')
      .select('id, title, name, password, code')
      .eq('code', classCode.toUpperCase().trim())
      .single();

    if (classError || !classData) {
      setError(t('classMode.classNotFoundError'));
      setLoading(false);
      return;
    }

    if (classData.password !== classPassword) {
      setError(t('classMode.incorrectPasswordError'));
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from('users')
      .select('id')
      .eq('auth_id', user!.id)
      .single();

    if (!profile) {
      setError(t('classMode.userProfileNotFoundError'));
      setLoading(false);
      return;
    }

    const { error: joinError } = await supabase
      .from('class_students')
      .insert({
        class_id: classData.id,
        student_id: profile.id,
      });

    if (joinError) {
      if (joinError.code === '23505') {
        setError(t('classMode.alreadyJoinedError'));
      } else {
        setError(joinError.message);
      }
      setLoading(false);
      return;
    }

    const newClass: JoinedClass = {
      id: classData.id,
      title: classData.title,
      name: classData.name,
      code: classData.code,
      joined_at: new Date().toISOString(),
    };
    setJoinedClass(newClass);
    setMyClasses(prev => [newClass, ...prev]);
    setSuccess(t('classMode.joinSuccess'));
    setClassCode('');
    setClassPassword('');
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: '#ffffff' }}>
      <TopNav currentPage="class-mode" />

      <div style={{ maxWidth: 560, margin: '0 auto', padding: '40px 20px 60px' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{ margin: '0 0 8px', fontSize: 26, fontWeight: 600, color: '#111' }}>
            {t('classMode.pageTitle')}
          </h1>
          <p style={{ margin: 0, fontSize: 14, color: '#6b7280' }}>
            {t('classMode.subtitle')}
          </p>
        </div>

        {/* My Classes */}
        {myClasses.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <h2 style={{
              margin: '0 0 12px', fontSize: 16, fontWeight: 600, color: '#1f2937',
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            }}>
              {t('classMode.myClasses')}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {myClasses.map((c) => {
                const papers = classPapers[c.id] || [];
                const isExpanded = expandedClass === c.id;
                return (
                  <div key={c.id} style={{
                    background: '#fafafa', borderRadius: 8,
                    border: isExpanded ? '1px solid #306ca0' : '1px solid #e5e7eb',
                    overflow: 'hidden',
                  }}>
                    <div
                      onClick={() => setExpandedClass(isExpanded ? null : c.id)}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '14px 18px', cursor: 'pointer',
                      }}
                    >
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#1f2937' }}>{c.name}</div>
                        <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>
                          {c.title} &middot; {t('classMode.codePrefix')} <span style={{ fontFamily: 'monospace', fontWeight: 600, color: '#1e40af' }}>{c.code}</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 12, color: '#6b7280' }}>
                          {papers.length} paper{papers.length !== 1 ? 's' : ''}
                        </span>
                        <span style={{
                          fontSize: 12, color: '#9ca3af',
                          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s',
                        }}>
                          ▼
                        </span>
                      </div>
                    </div>
                    {isExpanded && (
                      <div style={{
                        borderTop: '1px solid #e5e7eb',
                        background: '#fff',
                      }}>
                        {papers.length === 0 ? (
                          <p style={{
                            padding: '16px 18px', margin: 0, fontSize: 13, color: '#9ca3af',
                          }}>
                            {t('classMode.noPapersAssigned')}
                          </p>
                        ) : (
                          papers.map((p) => (
                            <div key={p.id} style={{
                              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                              padding: '10px 18px',
                              borderBottom: '1px solid #f5f5f5',
                            }}>
                              <div>
                                <div style={{ fontSize: 13, fontWeight: 600, color: '#1f2937' }}>
                                  {p.title}
                                </div>
                                <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 1 }}>
                                  Paper {p.paper_number}
                                </div>
                              </div>
                              <button
                                onClick={() => navigate('/', { state: { paperId: p.id } })}
                                style={{
                                  padding: '6px 16px', fontSize: 12, fontWeight: 500,
                                  color: '#fff', background: '#1e40af',
                                  border: 'none', borderRadius: 4, cursor: 'pointer',
                                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                                }}
                              >
                                {t('classMode.startButton')}
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Success with next steps */}
        {success && joinedClass && (
          <div style={{
            background: '#f0fdf4', borderRadius: 12, border: '1px solid #bbf7d0',
            padding: '24px 28px', marginBottom: 24,
          }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#16a34a', marginBottom: 6 }}>
              {success}
            </div>
            <div style={{ fontSize: 13, color: '#374151', marginBottom: 18 }}>
              {joinedClass.name} — {joinedClass.title}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={() => navigate('/')}
                style={{
                  flex: 1, padding: '10px 16px', fontSize: 13, fontWeight: 600,
                  color: '#fff', background: '#1e40af', border: 'none',
                  borderRadius: 6, cursor: 'pointer',
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                }}
              >
                {t('classMode.startPracticing')}
              </button>
              <button
                onClick={() => navigate('/topics')}
                style={{
                  flex: 1, padding: '10px 16px', fontSize: 13, fontWeight: 500,
                  color: '#1e40af', background: '#fff',
                  border: '1px solid #306ca0', borderRadius: 6, cursor: 'pointer',
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                }}
              >
                {t('classMode.browseTopics')}
              </button>
            </div>
          </div>
        )}

        {/* Join Form */}
        <div style={{
          background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb',
          padding: '36px 28px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        }}>
          <h2 style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 600, color: '#1f2937' }}>
            {myClasses.length > 0 ? t('classMode.joinAnotherClass') : t('classMode.joinClass')}
          </h2>
          <p style={{ margin: '0 0 28px', fontSize: 13, color: '#9ca3af', lineHeight: 1.5 }}>
            {t('classMode.joinHint')}
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: '#374151' }}>
                {t('classMode.classCodeLabel')}
              </label>
              <input
                type="text"
                value={classCode}
                onChange={(e) => setClassCode(e.target.value.toUpperCase())}
                required
                placeholder={t('classMode.classCodePlaceholder')}
                maxLength={6}
                style={{
                  width: '100%', padding: '10px 14px', border: '1px solid #d1d5db',
                  borderRadius: 8, fontSize: 14, outline: 'none',
                  fontFamily: 'monospace', letterSpacing: '2px', fontWeight: 600,
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: '#374151' }}>
                {t('classMode.classPasswordLabel')}
              </label>
              <input
                type="password"
                value={classPassword}
                onChange={(e) => setClassPassword(e.target.value)}
                required
                placeholder={t('classMode.classPasswordPlaceholder')}
                style={{
                  width: '100%', padding: '10px 14px', border: '1px solid #d1d5db',
                  borderRadius: 8, fontSize: 14, outline: 'none',
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
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

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '12px', border: 'none', borderRadius: 6,
                background: loading ? '#93c5fd' : '#1e40af', color: '#fff',
                cursor: loading ? 'not-allowed' : 'pointer', fontSize: 15, fontWeight: 500,
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif", marginTop: 8,
              }}
            >
              {loading ? t('classMode.joiningButton') : t('classMode.joinButton')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
