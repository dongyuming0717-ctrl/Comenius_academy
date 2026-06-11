import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProctor } from '../sdk/useProctor';
import { TopNav } from '../components/TopNav';
import { supabase } from '../supabase';
import { useLocale } from '../i18n/LocaleContext';

interface ClassRow {
  id: string;
  title: string;
  name: string;
  code: string;
  created_at: string;
  student_count: number;
}

export function TeacherDashboard() {
  const { t } = useLocale();
  const { user } = useProctor();
  const navigate = useNavigate();
  const [classes, setClasses] = useState<ClassRow[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchClasses = useCallback(async () => {
    if (!user) return;

    const { data: profile } = await supabase
      .from('users')
      .select('id, role')
      .eq('auth_id', user.id)
      .single();

    if (!profile || (profile.role !== 'teacher' && profile.role !== 'admin')) {
      navigate('/select-role');
      return;
    }
    const { data: classData } = await supabase
      .from('classes')
      .select('id, title, name, code, created_at')
      .eq('teacher_id', profile.id || '')
      .order('created_at', { ascending: false });

    if (!classData) { setLoading(false); return; }

    // Get student counts
    const enriched: ClassRow[] = [];
    for (const c of classData) {
      const { count } = await supabase
        .from('class_students')
        .select('*', { count: 'exact', head: true })
        .eq('class_id', c.id);
      enriched.push({ ...c, student_count: count || 0 } as ClassRow);
    }

    setClasses(enriched);
    setLoading(false);
  }, [user, navigate]);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: '#ffffff' }}>
      {/* Top Nav */}
      <TopNav currentPage="teacher" />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 20px 60px' }}>
        {/* Header */}
        <h1 style={{ margin: '0 0 4px', fontSize: 26, fontWeight: 600, color: '#111' }}>
          {t('teacherDashboard.pageTitle')}
        </h1>
        <p style={{ margin: '0 0 32px', fontSize: 15, color: '#6b7280' }}>
          {t('teacherDashboard.subtitle')}
        </p>

        {/* Action Cards */}
        <div style={{ display: 'flex', gap: 20, marginBottom: 40 }}>
          {/* Student Monitoring Card */}
          <div style={{
            flex: 1, background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb',
            padding: '28px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          }}>
            <h3 style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 600, color: '#1f2937' }}>
              {t('teacherDashboard.studentMonitoringCardTitle')}
            </h3>
            <p style={{ margin: '0 0 20px', fontSize: 14, color: '#6b7280', lineHeight: 1.5 }}>
              {t('teacherDashboard.studentMonitoringCardDesc')}
            </p>
            <button
              onClick={() => navigate('/admin')}
              style={{
                padding: '8px 24px', background: '#1e40af', color: '#fff',
                border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14, fontWeight: 500,
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              }}
            >
              {t('teacherDashboard.viewSessionsButton')}
            </button>
          </div>

          {/* Create Class Card */}
          <div style={{
            flex: 1, background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb',
            padding: '28px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          }}>
            <h3 style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 600, color: '#1f2937' }}>
              {t('teacherDashboard.createClassCardTitle')}
            </h3>
            <p style={{ margin: '0 0 20px', fontSize: 14, color: '#6b7280', lineHeight: 1.5 }}>
              {t('teacherDashboard.createClassCardDesc')}
            </p>
            <button
              onClick={() => navigate('/teacher/class/new')}
              style={{
                padding: '8px 24px', background: '#1e40af', color: '#fff',
                border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14, fontWeight: 500,
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              }}
            >
              {t('teacherDashboard.newClassButton')}
            </button>
          </div>
        </div>

        {/* Existing Classes */}
        <div>
          <h2 style={{ margin: '0 0 4px', fontSize: 18, fontWeight: 600, color: '#1f2937' }}>
            {t('teacherDashboard.existingClassesSection')}
            {classes.length > 0 && (
              <span style={{
                marginLeft: 10, fontSize: 12, fontWeight: 600, color: '#fff',
                background: '#1e40af', padding: '2px 10px', borderRadius: 99,
                verticalAlign: 'middle',
              }}>
                {classes.length}
              </span>
            )}
          </h2>

          {loading ? (
            <p style={{ color: '#9ca3af', padding: '24px 0', fontSize: 13 }}>{t('teacherDashboard.loading')}</p>
          ) : classes.length === 0 ? (
            <p style={{ color: '#9ca3af', padding: '24px 0', fontSize: 13 }}>
              {t('teacherDashboard.noClasses')}
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
              {classes.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => navigate(`/teacher/class/${c.id}`)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '14px 20px', background: '#fafafa',
                      borderRadius: 8, border: '1px solid #eee',
                      fontSize: 14, cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, color: '#1f2937' }}>{c.name}</div>
                      <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>
                        {c.title} &middot; {t('classDetail.codeLabel')} <span style={{ fontWeight: 600, color: '#1e40af' }}>{c.code}</span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#1e40af' }}>
                        {c.student_count} student{c.student_count !== 1 ? 's' : ''}
                      </div>
                      <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>
                        {new Date(c.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
