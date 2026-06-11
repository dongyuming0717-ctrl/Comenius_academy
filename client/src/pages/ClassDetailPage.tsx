import { useEffect, useState, useCallback, type FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TopNav } from '../components/TopNav';
import { supabase } from '../supabase';
import type { Paper, Question } from '../sdk/types';
import { useLocale } from '../i18n/LocaleContext';

interface ClassInfo {
  id: string;
  title: string;
  name: string;
  code: string;
  password: string;
  teacher_id: string;
  created_at: string;
}

interface StudentRow {
  id: string;
  full_name: string;
  email: string;
  joined_at: string;
  student_id: string;
}

interface AssignedPaper {
  id: string;
  class_id: string;
  paper_id: string;
  assigned_at: string;
  due_at: string | null;
  papers: { id: string; title: string; paper_number: number; questions: Question[] };
}

interface ActiveSession {
  id: string;
  user_id: string;
  started_at: string;
  answers: Record<string, number> | null;
  status: string;
  users: { full_name: string; email: string };
  papers: { title: string; paper_number: number; questions: Question[] };
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 14px', border: '1px solid #d1d5db',
  borderRadius: 8, fontSize: 14, outline: 'none',
  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: '#374151',
};

export function ClassDetailPage() {
  const { t } = useLocale();
  const { classId } = useParams<{ classId: string }>();
  const navigate = useNavigate();

  const [cls, setCls] = useState<ClassInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Edit mode
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [editError, setEditError] = useState('');
  const [editSuccess, setEditSuccess] = useState('');

  // Students
  const [students, setStudents] = useState<StudentRow[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(false);

  // Assigned papers
  const [assignedPapers, setAssignedPapers] = useState<AssignedPaper[]>([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [allPapers, setAllPapers] = useState<Paper[]>([]);
  const [selectedPaperIds, setSelectedPaperIds] = useState<Set<string>>(new Set());
  const [dueDate, setDueDate] = useState('');
  const [assigning, setAssigning] = useState(false);
  const [assignError, setAssignError] = useState('');
  const [assignSuccess, setAssignSuccess] = useState('');

  // Live proctoring
  const [showLiveProctor, setShowLiveProctor] = useState(false);
  const [activeSessions, setActiveSessions] = useState<ActiveSession[]>([]);
  const [liveViolations, setLiveViolations] = useState<{ sessionId: string; type: string; time: string }[]>([]);
  const [terminatingSession, setTerminatingSession] = useState<string | null>(null);

  // Completion stats
  const [completionStats, setCompletionStats] = useState<Record<string, { completed: number; total: number }>>({});

  const fetchClass = useCallback(async () => {
    if (!classId) return;
    const { data, error: err } = await supabase
      .from('classes').select('*').eq('id', classId).single();
    if (err || !data) {
      setError(err?.message || t('classDetail.classNotFound'));
      setLoading(false);
      return;
    }
    setCls(data);
    setEditName(data.name);
    setEditTitle(data.title);
    setEditPassword(data.password);
  }, [classId]);

  const fetchStudents = useCallback(async () => {
    if (!classId) return;
    setLoadingStudents(true);
    const { data: enrollments } = await supabase
      .from('class_students').select('student_id, joined_at').eq('class_id', classId);
    if (enrollments && enrollments.length > 0) {
      const ids = enrollments.map(e => e.student_id);
      const { data: users } = await supabase
        .from('users').select('id, full_name, email').in('id', ids);
      if (users) {
        setStudents(users.map(u => {
          const enr = enrollments.find(e => e.student_id === u.id);
          return { ...u, student_id: u.id, joined_at: enr?.joined_at || '' };
        }));
      }
    } else {
      setStudents([]);
    }
    setLoadingStudents(false);
  }, [classId]);

  const fetchAssignedPapers = useCallback(async () => {
    if (!classId) return;
    const { data } = await supabase
      .from('class_papers')
      .select('id, class_id, paper_id, assigned_at, due_at, papers(id, title, paper_number, questions)')
      .eq('class_id', classId)
      .order('assigned_at', { ascending: false });
    if (!data || data.length === 0) { setAssignedPapers([]); return; }
    // If join works, use it directly
    const first = data[0] as any;
    if (first.papers) {
      setAssignedPapers(data as unknown as AssignedPaper[]);
      return;
    }
    // Fallback: fetch papers separately when FK join isn't configured
    const paperIds = data.map((r: any) => r.paper_id);
    const { data: paperData } = await supabase
      .from('papers').select('id, title, paper_number, questions').in('id', paperIds);
    const paperMap: Record<string, any> = {};
    if (paperData) paperData.forEach((p: any) => { paperMap[p.id] = p; });
    setAssignedPapers(data.map((r: any) => ({
      ...r,
      papers: paperMap[r.paper_id] || null,
    })) as unknown as AssignedPaper[]);
  }, [classId]);

  const fetchCompletionStats = useCallback(async () => {
    if (!classId || students.length === 0 || assignedPapers.length === 0) return;
    const studentIds = students.map(s => s.student_id);
    const stats: Record<string, { completed: number; total: number }> = {};

    for (const ap of assignedPapers) {
      const { count } = await supabase
        .from('exam_sessions')
        .select('*', { count: 'exact', head: true })
        .eq('paper_id', ap.paper_id)
        .eq('status', 'completed')
        .in('user_id', studentIds);
      stats[ap.paper_id] = { completed: count || 0, total: students.length };
    }
    setCompletionStats(stats);
  }, [classId, students, assignedPapers]);

  const fetchActiveSessions = useCallback(async () => {
    if (!classId || students.length === 0) return;
    const studentIds = students.map(s => s.student_id);
    if (studentIds.length === 0) { setActiveSessions([]); return; }
    const { data } = await supabase
      .from('exam_sessions')
      .select('id, user_id, started_at, answers, status, users(full_name, email), papers(title, paper_number, questions)')
      .in('user_id', studentIds)
      .eq('status', 'active')
      .order('started_at', { ascending: false });
    setActiveSessions((data || []) as unknown as ActiveSession[]);
  }, [classId, students]);

  // Initial load
  useEffect(() => { fetchClass(); }, [fetchClass]);
  useEffect(() => {
    if (!cls) return;
    setLoading(false);
    fetchStudents();
    fetchAssignedPapers();
    // Fetch all papers for the assign modal
    supabase.from('papers').select('id, title, paper_number, year, sitting, duration_minutes, total_marks')
      .order('year', { ascending: false }).order('paper_number')
      .then(({ data }) => { if (data) setAllPapers(data as Paper[]); });
  }, [cls, fetchStudents, fetchAssignedPapers]);

  // Live proctoring polling
  useEffect(() => {
    if (!showLiveProctor) return;
    fetchActiveSessions();
    const id = setInterval(fetchActiveSessions, 10000);
    // Subscribe to exam_logs
    const channel = supabase
      .channel(`proctor_${classId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'exam_logs' }, (payload: any) => {
        setLiveViolations(prev => [...prev.slice(-49), {
          sessionId: payload.new.session_id,
          type: payload.new.event_type,
          time: payload.new.recorded_at,
        }]);
      })
      .subscribe();
    return () => { clearInterval(id); supabase.removeChannel(channel); };
  }, [showLiveProctor, classId, fetchActiveSessions]);

  // Completion stats
  useEffect(() => { fetchCompletionStats(); }, [fetchCompletionStats]);

  const handleSaveEdit = async (e: FormEvent) => {
    e.preventDefault();
    setEditError('');
    setEditSuccess('');
    setSaving(true);
    const { error: err } = await supabase
      .from('classes')
      .update({ name: editName, title: editTitle, password: editPassword })
      .eq('id', classId!);
    setSaving(false);
    if (err) { setEditError(err.message); return; }
    setEditSuccess(t('classDetail.classUpdatedSuccess'));
    setCls(prev => prev ? { ...prev, name: editName, title: editTitle, password: editPassword } : prev);
    setEditing(false);
  };

  const handleRegenerateCode = async () => {
    const newCode = Array.from({ length: 6 }, () =>
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'[Math.floor(Math.random() * 36)]
    ).join('');
    const { error: err } = await supabase.from('classes').update({ code: newCode }).eq('id', classId!);
    if (!err) setCls(prev => prev ? { ...prev, code: newCode } : prev);
  };

  const handleDeleteClass = async () => {
    if (!window.confirm(t('classDetail.deleteConfirmMessage'))) return;
    await supabase.from('classes').delete().eq('id', classId!);
    navigate('/teacher');
  };

  const handleRemoveStudent = async (studentId: string) => {
    if (!window.confirm(t('classDetail.removeStudentConfirm'))) return;
    await supabase.from('class_students').delete().eq('class_id', classId!).eq('student_id', studentId);
    setStudents(prev => prev.filter(s => s.student_id !== studentId));
  };

  const handleAssignPapers = async () => {
    if (selectedPaperIds.size === 0) return;
    setAssigning(true);
    setAssignError('');
    setAssignSuccess('');
    const rows = Array.from(selectedPaperIds).map(pid => ({
      class_id: classId!,
      paper_id: pid,
      due_at: dueDate || null,
    }));
    const { error: err } = await supabase.from('class_papers').insert(rows);
    setAssigning(false);
    if (err) { setAssignError(err.message); return; }
    setAssignSuccess(`Successfully assigned ${rows.length} paper(s)`);
    setSelectedPaperIds(new Set());
    setDueDate('');
    fetchAssignedPapers();
    setTimeout(() => {
      setShowAssignModal(false);
      setAssignSuccess('');
    }, 1500);
  };

  const handleTerminateSession = async (sessionId: string) => {
    if (!window.confirm(t('classDetail.terminateConfirm'))) return;
    setTerminatingSession(sessionId);
    await supabase.from('exam_sessions').update({ status: 'terminated', ended_at: new Date().toISOString() }).eq('id', sessionId);
    setTerminatingSession(null);
    fetchActiveSessions();
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: '#ffffff' }}>
        <TopNav currentPage="teacher" />
        <div style={{ padding: 40, textAlign: 'center', color: '#9ca3af' }}>{t('classDetail.loading')}</div>
      </div>
    );
  }

  if (error || !cls) {
    return (
      <div style={{ minHeight: '100vh', fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: '#ffffff' }}>
        <TopNav currentPage="teacher" />
        <div style={{ maxWidth: 500, margin: '60px auto', textAlign: 'center' }}>
          <p style={{ color: '#dc2626' }}>{error || t('classDetail.classNotFound')}</p>
          <button onClick={() => navigate('/teacher')} style={{
            padding: '6px 20px', background: '#1e40af', color: '#fff', border: 'none',
            borderRadius: 6, cursor: 'pointer', fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          }}>{t('classDetail.backToDashboard')}</button>
        </div>
      </div>
    );
  }

  const cardStyle: React.CSSProperties = {
    background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb',
    padding: '24px 28px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', marginBottom: 20,
  };

  const sectionH2: React.CSSProperties = {
    margin: '0 0 16px', fontSize: 16, fontWeight: 600, color: '#1f2937',
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  };

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: '#ffffff' }}>
      <TopNav currentPage="teacher" />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 20px 60px' }}>
        {/* Back link */}
        <button onClick={() => navigate('/teacher')} style={{
          background: 'none', border: 'none', color: '#1e40af', cursor: 'pointer',
          fontSize: 13, padding: 0, marginBottom: 16,
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        }}>&larr; {t('classDetail.backToDashboard')}</button>

        {/* Class Info Header */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 600, color: '#111' }}>{cls.name}</h1>
              <p style={{ margin: 0, fontSize: 14, color: '#6b7280' }}>{cls.title}</p>
              <div style={{ marginTop: 8, fontSize: 13, color: '#9ca3af' }}>
                {t('classDetail.codeLabel')} <span style={{ fontFamily: 'monospace', fontWeight: 600, color: '#1e40af', fontSize: 15 }}>{cls.code}</span>
                <span style={{ marginLeft: 16 }}>{t('classDetail.passwordLabel')} <strong>{cls.password}</strong></span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setEditing(!editing)} style={{
                padding: '6px 16px', background: '#1e40af', color: '#fff', border: 'none',
                borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 500,
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              }}>{editing ? t('classDetail.cancelButton') : t('classDetail.editButton')}</button>
              <button onClick={handleDeleteClass} style={{
                padding: '6px 16px', background: '#fff', color: '#ef4444', border: '1px solid #ef4444',
                borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 500,
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              }}>{t('classDetail.deleteButton')}</button>
            </div>
          </div>

          {/* Edit Form */}
          {editing && (
            <form onSubmit={handleSaveEdit} style={{
              marginTop: 20, padding: '20px', background: '#fafafa', borderRadius: 8,
              display: 'flex', flexDirection: 'column', gap: 14,
            }}>
              <div style={{ display: 'flex', gap: 14 }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>{t('classDetail.classNameLabel')}</label>
                  <input value={editName} onChange={e => setEditName(e.target.value)} required style={inputStyle} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>{t('classDetail.titleLabel')}</label>
                  <input value={editTitle} onChange={e => setEditTitle(e.target.value)} required style={inputStyle} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-end' }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>{t('classDetail.passwordFieldLabel')}</label>
                  <input value={editPassword} onChange={e => setEditPassword(e.target.value)} required style={inputStyle} />
                </div>
                <button type="button" onClick={handleRegenerateCode} style={{
                  padding: '10px 16px', background: '#fff', color: '#1e40af', border: '1px solid #306ca0',
                  borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 500,
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                }}>{t('classDetail.regenerateCode')}</button>
              </div>
              {editError && (
                <div style={{ padding: '8px 12px', background: '#fef2f2', borderRadius: 6, border: '1px solid #fecaca', color: '#dc2626', fontSize: 13 }}>{editError}</div>
              )}
              {editSuccess && (
                <div style={{ padding: '8px 12px', background: '#f0fdf4', borderRadius: 6, border: '1px solid #bbf7d0', color: '#16a34a', fontSize: 13 }}>{editSuccess}</div>
              )}
              <button type="submit" disabled={saving} style={{
                alignSelf: 'flex-start', padding: '8px 24px', background: saving ? '#93c5fd' : '#1e40af',
                color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14, fontWeight: 500,
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              }}>{saving ? t('classDetail.saving') : t('classDetail.saveChanges')}</button>
            </form>
          )}
        </div>

        {/* Students Section */}
        <div style={cardStyle}>
          <h2 style={sectionH2}>Students ({students.length})</h2>
          {loadingStudents ? (
            <span style={{ fontSize: 13, color: '#9ca3af' }}>{t('classDetail.loading')}</span>
          ) : students.length === 0 ? (
            <p style={{ fontSize: 13, color: '#9ca3af' }}>{t('classDetail.noStudents')}</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {students.map(s => (
                <div key={s.student_id} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 14px', background: '#fafafa', borderRadius: 8, border: '1px solid #eee',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%', background: '#eff6ff', color: '#1e40af',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 600,
                    }}>{s.full_name?.charAt(0)?.toUpperCase() || '?'}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#1f2937' }}>{s.full_name}</div>
                      <div style={{ fontSize: 11, color: '#9ca3af' }}>{s.email}</div>
                    </div>
                  </div>
                  <button onClick={() => handleRemoveStudent(s.student_id)} style={{
                    padding: '4px 12px', background: '#fff', color: '#ef4444', border: '1px solid #fecaca',
                    borderRadius: 4, cursor: 'pointer', fontSize: 12,
                    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                  }}>{t('classDetail.removeStudentButton')}</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Assigned Papers Section */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ ...sectionH2, marginBottom: 0 }}>{t('classDetail.assignedPapersSection')}</h2>
            <button onClick={() => setShowAssignModal(true)} style={{
              padding: '6px 16px', background: '#1e40af', color: '#fff', border: 'none',
              borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 500,
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            }}>{t('classDetail.assignPapersButton')}</button>
          </div>
          {assignedPapers.length === 0 ? (
            <p style={{ fontSize: 13, color: '#9ca3af' }}>{t('classDetail.noPapersAssigned')}</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {assignedPapers.map(ap => {
                const stats = completionStats[ap.paper_id];
                return (
                  <div key={ap.id} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '10px 14px', background: '#fafafa', borderRadius: 8, border: '1px solid #eee',
                  }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#1f2937' }}>
                        {ap.papers?.title || t('classDetail.unknownPaper')}
                      </div>
                      <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>
                        Paper {ap.papers?.paper_number} &middot; {ap.papers?.questions?.length || '?'} questions
                        {ap.due_at && <span> &middot; Due: {new Date(ap.due_at).toLocaleDateString()}</span>}
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>
                      {stats ? `${stats.completed}/${stats.total} completed` : '...'}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Live Proctoring Section */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ ...sectionH2, marginBottom: 0 }}>{t('classDetail.liveProctoringSection')}</h2>
            <button onClick={() => setShowLiveProctor(!showLiveProctor)} style={{
              padding: '6px 16px', background: showLiveProctor ? '#ef4444' : '#1e40af', color: '#fff',
              border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 500,
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            }}>{showLiveProctor ? t('classDetail.stopMonitoring') : t('classDetail.startMonitoring')}</button>
          </div>

          {showLiveProctor && (
            <>
              {/* Active Sessions */}
              {activeSessions.length === 0 ? (
                <p style={{ fontSize: 13, color: '#9ca3af' }}>{t('classDetail.noActiveSessions')}</p>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12, marginBottom: 16 }}>
                  {activeSessions.map(s => {
                    const answered = s.answers ? Object.keys(s.answers).length : 0;
                    const total = s.papers?.questions?.length || 0;
                    const elapsed = Math.floor((Date.now() - new Date(s.started_at).getTime()) / 60000);
                    return (
                      <div key={s.id} style={{
                        padding: '14px 16px', background: '#fffbeb', borderRadius: 8,
                        border: '1px solid #fde68a',
                      }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#1f2937' }}>{s.users?.full_name}</div>
                        <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>{s.papers?.title}</div>
                        <div style={{ marginTop: 6, display: 'flex', gap: 12, fontSize: 11, color: '#6b7280' }}>
                          <span>{answered}/{total} answered</span>
                          <span>{elapsed} min elapsed</span>
                        </div>
                        <div style={{ marginTop: 6, display: 'flex', gap: 8 }}>
                          <button onClick={() => navigate(`/admin/student/${s.id}`)} style={{
                            padding: '3px 10px', background: '#1e40af', color: '#fff', border: 'none',
                            borderRadius: 4, cursor: 'pointer', fontSize: 11,
                            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                          }}>{t('classDetail.viewButton')}</button>
                          <button onClick={() => handleTerminateSession(s.id)} disabled={terminatingSession === s.id} style={{
                            padding: '3px 10px', background: '#ef4444', color: '#fff', border: 'none',
                            borderRadius: 4, cursor: 'pointer', fontSize: 11,
                            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                          }}>{terminatingSession === s.id ? '...' : t('classDetail.terminateButton')}</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Violation Feed */}
              {liveViolations.length > 0 && (
                <div>
                  <h3 style={{ fontSize: 13, fontWeight: 600, color: '#374151', margin: '0 0 8px' }}>
                    {t('classDetail.recentViolations')}
                  </h3>
                  <div style={{ maxHeight: 200, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {liveViolations.slice().reverse().map((v, i) => (
                      <div key={i} style={{
                        padding: '6px 10px', fontSize: 12, background: '#fef2f2', borderRadius: 4,
                        border: '1px solid #fecaca', color: '#dc2626',
                      }}>
                        <span style={{ fontWeight: 600 }}>{v.type.replace(/_/g, ' ')}</span>
                        <span style={{ color: '#9ca3af', marginLeft: 8 }}>{new Date(v.time).toLocaleTimeString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Assign Papers Modal */}
      {showAssignModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999,
        }}>
          <div style={{
            background: '#fff', borderRadius: 12, width: 540, maxWidth: '90vw',
            maxHeight: '80vh', overflow: 'hidden', display: 'flex', flexDirection: 'column',
          }}>
            <div style={{
              padding: '16px 24px', borderBottom: '1px solid #eee',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
                {t('classDetail.assignModalTitle')}
              </h3>
              <button onClick={() => { setShowAssignModal(false); setAssignError(''); setAssignSuccess(''); }} style={{
                background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: '#9ca3af',
              }}>x</button>
            </div>
            <div style={{ padding: '16px 24px', overflowY: 'auto', flex: 1 }}>
              <div style={{ marginBottom: 14 }}>
                <label style={labelStyle}>{t('classDetail.dueDateOptional')}</label>
                <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} style={inputStyle} />
              </div>
              <label style={labelStyle}>{t('classDetail.selectPapers')}</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {allPapers.map(p => (
                  <label key={p.id} style={{
                    display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px',
                    background: selectedPaperIds.has(p.id) ? '#eff6ff' : '#fafafa',
                    borderRadius: 6, border: selectedPaperIds.has(p.id) ? '1px solid #306ca0' : '1px solid #eee',
                    cursor: 'pointer', fontSize: 13,
                  }}>
                    <input
                      type="checkbox"
                      checked={selectedPaperIds.has(p.id)}
                      onChange={() => {
                        setSelectedPaperIds(prev => {
                          const next = new Set(prev);
                          if (next.has(p.id)) next.delete(p.id); else next.add(p.id);
                          return next;
                        });
                      }}
                      style={{ width: 15, height: 15, cursor: 'pointer' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: '#1f2937' }}>{p.title}</div>
                      <div style={{ fontSize: 11, color: '#9ca3af' }}>Paper {p.paper_number} &middot; {p.year} {p.sitting}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            {assignError && (
              <div style={{ padding: '8px 12px', margin: '0 24px', background: '#fef2f2', borderRadius: 6, border: '1px solid #fecaca', color: '#dc2626', fontSize: 13 }}>
                {assignError}
              </div>
            )}
            {assignSuccess && (
              <div style={{ padding: '8px 12px', margin: '0 24px', background: '#f0fdf4', borderRadius: 6, border: '1px solid #bbf7d0', color: '#16a34a', fontSize: 13 }}>
                {assignSuccess}
              </div>
            )}
            <div style={{ padding: '12px 24px', borderTop: '1px solid #eee', textAlign: 'right' }}>
              <button onClick={() => { setShowAssignModal(false); setAssignError(''); setAssignSuccess(''); }} style={{
                padding: '8px 18px', background: '#fff', color: '#374151', border: '1px solid #d1d5db',
                borderRadius: 6, cursor: 'pointer', fontSize: 13, marginRight: 8,
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              }}>{t('classDetail.assignModalCancel')}</button>
              <button onClick={handleAssignPapers} disabled={assigning || selectedPaperIds.size === 0} style={{
                padding: '8px 18px', background: assigning ? '#93c5fd' : '#1e40af', color: '#fff',
                border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 500,
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              }}>{assigning ? t('classDetail.assigning') : t('classDetail.assignButton')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
