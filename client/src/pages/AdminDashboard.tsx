import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopNav } from '../components/TopNav';
import { useProctor } from '../sdk/useProctor';
import { supabase } from '../supabase';
import type { Paper, Question } from '../sdk/types';
import { useLocale } from '../i18n/LocaleContext';
import { playNotificationSound } from '../utils/playNotification';

interface SessionRow {
  id: string;
  user_id: string;
  paper_id: string;
  status: string;
  score: number | null;
  answers: Record<string, number> | null;
  question_times: Record<string, number> | null;
  started_at: string;
  ended_at: string | null;
  users: { full_name: string; email: string };
  papers: { title: string; paper_number: number; questions: Question[] };
  violation_count: number;
  answered_count?: number;
  total_questions?: number;
}

interface QuestionStat {
  index: number;
  qid: string;
  text: string;
  correctAnswer: number;
  totalAttempts: number;
  wrongCount: number;
  correctCount: number;
  accuracyPct: number;
  avgTimeMs: number;
  maxTimeMs: number;
  minTimeMs: number;
}

export function AdminDashboard() {
  const { t } = useLocale();
  const { user } = useProctor();
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPaper, setFilterPaper] = useState<string>('all');
  const [showStats, setShowStats] = useState(false);
  const [terminating, setTerminating] = useState<string | null>(null);
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(new Set());
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const prevStatusRef = useRef<Record<string, string>>({});

  const handleTerminate = async (sessionId: string) => {
    if (!window.confirm(t('admin.terminateConfirm'))) return;
    setTerminating(sessionId);
    await supabase
      .from('exam_sessions')
      .update({ status: 'terminated', ended_at: new Date().toISOString() })
      .eq('id', sessionId);
    setTerminating(null);
    fetchData();
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');

    // Get current user's profile
    let profileId: string | null = null;
    let role: string | null = null;
    if (user) {
      const { data: profile } = await supabase
        .from('users').select('id, role').eq('auth_id', user.id).single();
      profileId = profile?.id || null;
      role = profile?.role || null;
    }

    // Fetch sessions: admin sees all, teacher sees only own class assignments
    let sessionQuery = supabase
      .from('exam_sessions')
      .select('id, user_id, paper_id, status, score, answers, question_times, started_at, ended_at, users(full_name, email), papers(title, paper_number, questions)')
      .order('started_at', { ascending: false });

    if (role === 'admin') {
      // Admin: no filtering — see all sessions
    } else if (profileId) {
      // Teacher: only see class_assignment sessions for own classes
      const { data: classes } = await supabase
        .from('classes').select('id').eq('teacher_id', profileId);
      const classIds = (classes || []).map(c => c.id);

      if (classIds.length > 0) {
        sessionQuery = sessionQuery
          .eq('origin', 'class_assignment')
          .in('class_id', classIds);
      } else {
        sessionQuery = sessionQuery.eq('origin', '__none__');
      }
    } else {
      // No profile → return empty
      sessionQuery = sessionQuery.eq('origin', '__none__');
    }

    const { data: sessionData, error: sessionError } = await sessionQuery;

    if (sessionError) {
      setError(sessionError.message);
      setLoading(false);
      return;
    }

    // Fetch papers to get question counts
    const { data: paperData } = await supabase.from('papers').select('*');

    // Attach question counts
    const papersMap = new Map<string, Paper>();
    if (paperData) {
      for (const p of paperData) {
        papersMap.set(p.id, p as Paper);
        papers.push(p as Paper);
      }
      setPapers(paperData as Paper[]);
    }

    const enriched = (sessionData || []).map((s: any) => {
      const paper = papersMap.get(s.paper_id);
      return {
        ...s,
        users: s.users as { full_name: string; email: string },
        papers: s.papers as { title: string; paper_number: number; questions: Question[] },
        violation_count: 0,
        total_questions: paper ? (paper.questions as Question[]).length : 0,
        answered_count: s.answers ? Object.keys(s.answers).length : 0,
      };
    });

    setSessions(enriched);

    // Detect newly completed sessions and play notification
    const prev = prevStatusRef.current;
    for (const s of enriched) {
      const prevStatus = prev[s.id];
      if (s.status === 'completed' && prevStatus && prevStatus !== 'completed') {
        playNotificationSound();
      }
    }
    // Update ref with current statuses
    prevStatusRef.current = {};
    for (const s of enriched) {
      prevStatusRef.current[s.id] = s.status;
    }

    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh every 15s for live monitoring
  useEffect(() => {
    const id = setInterval(fetchData, 15000);
    return () => clearInterval(id);
  }, [fetchData]);

  const filtered = sessions.filter((s) => {
    if (filterStatus !== 'all' && s.status !== filterStatus) return false;
    if (filterPaper !== 'all' && s.paper_id !== filterPaper) return false;
    return true;
  });

  const groupedByMonth = useMemo(() => {
    const groups: Record<string, { label: string; sessions: SessionRow[] }> = {};
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    for (const s of filtered) {
      const d = new Date(s.started_at);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (!groups[key]) {
        groups[key] = { label: `${months[d.getMonth()]} ${d.getFullYear()}`, sessions: [] };
      }
      groups[key].sessions.push(s);
    }
    return Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0]));
  }, [filtered]);

  const handleDeleteSelected = async () => {
    if (selectedIds.size === 0) return;
    if (!window.confirm(`Delete ${selectedIds.size} selected record(s)? This cannot be undone.`)) return;
    const ids = Array.from(selectedIds);
    // Delete exam_logs first (foreign key constraint)
    await supabase.from('exam_logs').delete().in('session_id', ids);
    const { error } = await supabase.from('exam_sessions').delete().in('id', ids);
    if (error) {
      alert(`Delete failed: ${error.message}`);
      return;
    }
    setSelectMode(false);
    setSelectedIds(new Set());
    fetchData();
  };

  const toggleMonth = (monthKey: string) => {
    setExpandedMonths((prev) => {
      const next = new Set(prev);
      if (next.has(monthKey)) next.delete(monthKey);
      else next.add(monthKey);
      return next;
    });
  };

  const toggleSelectId = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  const activeCount = sessions.filter((s) => s.status === 'active').length;
  const completedCount = sessions.filter((s) => s.status === 'completed').length;

  // Compute per-question statistics from completed sessions
  const questionStats = useMemo<QuestionStat[]>(() => {
    const paperId = filterPaper !== 'all' ? filterPaper : null;
    const targetPaper = paperId ? papers.find((p) => p.id === paperId) : null;
    if (!targetPaper) return [];

    const questions = targetPaper.questions as Question[];
    const completedSessions = sessions.filter(
      (s) => s.status === 'completed' && s.paper_id === paperId
    );
    if (completedSessions.length === 0) return [];

    return questions.map((q, i) => {
      const times: number[] = [];
      let wrong = 0;
      let correct = 0;

      for (const s of completedSessions) {
        const answer = s.answers?.[q.id];
        if (answer !== undefined && answer !== null) {
          if (answer === q.answer) correct++;
          else wrong++;
        }
        const t = s.question_times?.[q.id];
        if (typeof t === 'number' && t > 0) times.push(t);
      }

      const totalAttempts = correct + wrong;
      const avgTime = times.length > 0 ? times.reduce((a, b) => a + b, 0) / times.length : 0;
      const maxTime = times.length > 0 ? Math.max(...times) : 0;
      const minTime = times.length > 0 ? Math.min(...times) : 0;

      return {
        index: i,
        qid: q.id,
        text: q.text,
        correctAnswer: q.answer,
        totalAttempts,
        wrongCount: wrong,
        correctCount: correct,
        accuracyPct: totalAttempts > 0 ? Math.round((correct / totalAttempts) * 100) : 0,
        avgTimeMs: avgTime,
        maxTimeMs: maxTime,
        minTimeMs: minTime,
      };
    });
  }, [sessions, papers, filterPaper]);

  const statsPaperTitle = filterPaper !== 'all'
    ? papers.find((p) => p.id === filterPaper)?.title || ''
    : '';
  const statsStudentCount = filterPaper !== 'all'
    ? sessions.filter((s) => s.status === 'completed' && s.paper_id === filterPaper).length
    : 0;

  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", minHeight: '100vh', background: '#ffffff' }}>
      {/* Header */}
      <TopNav currentPage="teacher" />

      {/* Sub-bar: session stats + controls */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 32px', background: '#f8fafc', borderBottom: '1px solid #e5e7eb',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#1f2937' }}>{t('admin.studentSessions')}</span>
          <span style={{ fontSize: 12, color: '#6b7280' }}>
            {activeCount} active &middot; {completedCount} completed &middot; {sessions.length} total
          </span>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button
            onClick={() => setShowStats(!showStats)}
            style={{
              padding: '6px 14px', border: '1px solid #d1d5db', borderRadius: 4,
              background: showStats ? '#eff6ff' : '#fff',
              color: '#1e40af', cursor: 'pointer', fontSize: 12,
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            }}
          >
            {t('admin.statistics')}
          </button>
          <button
            onClick={fetchData}
            style={{
              padding: '6px 14px', border: '1px solid #d1d5db', borderRadius: 4,
              background: '#fff', cursor: 'pointer', fontSize: 12, color: '#374151',
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            }}
          >
            {t('admin.refresh')}
          </button>
          {!selectMode ? (
            <button
              onClick={() => { setSelectMode(true); setSelectedIds(new Set()); }}
              style={{
                padding: '6px 14px', border: '1px solid #fecaca', borderRadius: 4,
                background: '#fff', cursor: 'pointer', fontSize: 12, color: '#dc2626',
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              }}
            >
              Delete
            </button>
          ) : (
            <>
              <button
                onClick={() => { setSelectMode(false); setSelectedIds(new Set()); }}
                style={{
                  padding: '6px 14px', border: '1px solid #d1d5db', borderRadius: 4,
                  background: '#fff', cursor: 'pointer', fontSize: 12, color: '#374151',
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteSelected}
                disabled={selectedIds.size === 0}
                style={{
                  padding: '6px 14px', border: 'none', borderRadius: 4,
                  background: selectedIds.size > 0 ? '#dc2626' : '#fecaca',
                  cursor: selectedIds.size > 0 ? 'pointer' : 'default',
                  fontSize: 12, color: selectedIds.size > 0 ? '#fff' : '#f87171',
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                }}
              >
                Delete Selected ({selectedIds.size})
              </button>
            </>
          )}
        </div>
      </div>

      {/* Filters */}
      <div style={{ padding: '12px 24px', display: 'flex', gap: 12 }}>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{
            padding: '6px 12px', border: '1px solid #d1d5db', borderRadius: 6,
            fontSize: 13, background: '#fff',
          }}
        >
          <option value="all">{t('admin.filterAllStatus')}</option>
          <option value="active">{t('admin.filterActive')}</option>
          <option value="completed">{t('admin.filterCompleted')}</option>
          <option value="terminated">{t('admin.filterTerminated')}</option>
        </select>
        <select
          value={filterPaper}
          onChange={(e) => setFilterPaper(e.target.value)}
          style={{
            padding: '6px 12px', border: '1px solid #d1d5db', borderRadius: 6,
            fontSize: 13, background: '#fff',
          }}
        >
          <option value="all">{t('admin.filterAllPapers')}</option>
          {papers.map((p) => (
            <option key={p.id} value={p.id}>{p.title}</option>
          ))}
        </select>
      </div>

      {/* Statistics Panel */}
      {showStats && (
        <div style={{ padding: '0 24px 24px' }}>
          <div style={{
            background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12,
            overflow: 'hidden',
          }}>
            <div style={{
              padding: '14px 20px', borderBottom: '1px solid #e5e7eb',
              background: '#fafafa', display: 'flex', justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>
                {t('admin.examStatistics')}
                {statsPaperTitle && <span style={{ fontWeight: 400, color: '#6b7280', marginLeft: 8 }}>— {statsPaperTitle}</span>}
              </h2>
              {statsStudentCount > 0 && (
                <span style={{ fontSize: 13, color: '#6b7280' }}>
                  {statsStudentCount} student{statsStudentCount !== 1 ? 's' : ''} completed
                </span>
              )}
            </div>

            {filterPaper === 'all' ? (
              <div style={{ padding: 40, textAlign: 'center', color: '#9ca3af' }}>
                {t('admin.selectPaperHint')}
              </div>
            ) : questionStats.length === 0 ? (
              <div style={{ padding: 40, textAlign: 'center', color: '#9ca3af' }}>
                {t('admin.noExamData')}
              </div>
            ) : (
              <>
                {/* Summary Cards */}
                <div style={{
                  display: 'flex', gap: 16, padding: '16px 20px',
                  borderBottom: '1px solid #f3f4f6',
                }}>
                  <div style={{
                    flex: 1, padding: '12px 16px', background: '#f0fdf4',
                    borderRadius: 8, border: '1px solid #bbf7d0',
                  }}>
                    <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>{t('admin.overallAccuracy')}</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: '#16a34a' }}>
                      {questionStats.length > 0
                        ? Math.round(questionStats.reduce((s, q) => s + q.accuracyPct, 0) / questionStats.length)
                        : 0}%
                    </div>
                  </div>
                  <div style={{
                    flex: 1, padding: '12px 16px', background: '#fef2f2',
                    borderRadius: 8, border: '1px solid #fecaca',
                  }}>
                    <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>{t('admin.mostMissedQuestion')}</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: '#ef4444' }}>
                      {(() => {
                        const sorted = [...questionStats].sort((a, b) => b.wrongCount - a.wrongCount);
                        return sorted[0]?.wrongCount > 0 ? `Q${sorted[0].index + 1}` : '—';
                      })()}
                    </div>
                    {(() => {
                      const sorted = [...questionStats].sort((a, b) => b.wrongCount - a.wrongCount);
                      return sorted[0]?.wrongCount > 0
                        ? <div style={{ fontSize: 11, color: '#ef4444', marginTop: 2 }}>{sorted[0].wrongCount} wrong</div>
                        : null;
                    })()}
                  </div>
                  <div style={{
                    flex: 1, padding: '12px 16px', background: '#fff7ed',
                    borderRadius: 8, border: '1px solid #fed7aa',
                  }}>
                    <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>{t('admin.longestAvgTime')}</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: '#f97316' }}>
                      {(() => {
                        const sorted = [...questionStats].sort((a, b) => b.avgTimeMs - a.avgTimeMs);
                        return sorted[0]?.avgTimeMs > 0 ? `Q${sorted[0].index + 1}` : '—';
                      })()}
                    </div>
                    {(() => {
                      const sorted = [...questionStats].sort((a, b) => b.avgTimeMs - a.avgTimeMs);
                      return sorted[0]?.avgTimeMs > 0
                        ? <div style={{ fontSize: 11, color: '#f97316', marginTop: 2 }}>
                            {Math.round(sorted[0].avgTimeMs / 1000)}s avg
                          </div>
                        : null;
                    })()}
                  </div>
                </div>

                {/* Per-Question Table */}
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #e5e7eb', textAlign: 'left' }}>
                        <th style={{ padding: '10px 12px', color: '#6b7280', fontWeight: 600, width: 60 }}>{t('admin.tableHeaderNumber')}</th>
                        <th style={{ padding: '10px 12px', color: '#6b7280', fontWeight: 600 }}>{t('admin.tableHeaderQuestion')}</th>
                        <th style={{ padding: '10px 12px', color: '#6b7280', fontWeight: 600, width: 80, textAlign: 'center' }}>{t('admin.tableHeaderCorrect')}</th>
                        <th style={{ padding: '10px 12px', color: '#6b7280', fontWeight: 600, width: 80, textAlign: 'center' }}>{t('admin.tableHeaderWrong')}</th>
                        <th style={{ padding: '10px 12px', color: '#6b7280', fontWeight: 600, width: 80, textAlign: 'center' }}>{t('admin.tableHeaderAccuracy')}</th>
                        <th style={{ padding: '10px 12px', color: '#6b7280', fontWeight: 600, width: 100, textAlign: 'center' }}>{t('admin.tableHeaderAvgTime')}</th>
                        <th style={{ padding: '10px 12px', color: '#6b7280', fontWeight: 600, width: 100, textAlign: 'center' }}>{t('admin.tableHeaderMaxTime')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {questionStats.map((q) => {
                        const isHardest = q.wrongCount > 0 && q.wrongCount === Math.max(...questionStats.map(x => x.wrongCount));
                        const isLongest = q.avgTimeMs > 0 && q.avgTimeMs === Math.max(...questionStats.map(x => x.avgTimeMs));
                        return (
                          <tr
                            key={q.qid}
                            style={{
                              borderBottom: '1px solid #f3f4f6',
                              background: isHardest ? '#fef2f2' : '#fff',
                            }}
                          >
                            <td style={{ padding: '10px 12px', fontWeight: 600 }}>
                              Q{q.index + 1}
                              {isHardest && (
                                <span style={{ marginLeft: 6, fontSize: 10, color: '#ef4444', fontWeight: 600 }}>
                                  {t('admin.mostWrongTag')}
                                </span>
                              )}
                              {isLongest && (
                                <span style={{ marginLeft: 6, fontSize: 10, color: '#f97316', fontWeight: 600 }}>
                                  {t('admin.slowestTag')}
                                </span>
                              )}
                            </td>
                            <td style={{ padding: '10px 12px', color: '#4b5563', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {q.text}
                            </td>
                            <td style={{ padding: '10px 12px', textAlign: 'center', color: '#16a34a', fontWeight: 600 }}>
                              {q.correctCount}
                            </td>
                            <td style={{
                              padding: '10px 12px', textAlign: 'center',
                              color: q.wrongCount > 0 ? '#ef4444' : '#9ca3af',
                              fontWeight: q.wrongCount > 0 ? 600 : 400,
                            }}>
                              {q.wrongCount}
                            </td>
                            <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                              {/* Accuracy bar */}
                              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <div style={{
                                  flex: 1, height: 6, borderRadius: 3, background: '#f3f4f6',
                                  overflow: 'hidden',
                                }}>
                                  <div style={{
                                    height: '100%', borderRadius: 3,
                                    width: `${q.accuracyPct}%`,
                                    background: q.accuracyPct >= 80 ? '#16a34a' : q.accuracyPct >= 50 ? '#f59e0b' : '#ef4444',
                                  }} />
                                </div>
                                <span style={{ fontSize: 12, fontWeight: 600, width: 36, textAlign: 'right' }}>
                                  {q.accuracyPct}%
                                </span>
                              </div>
                            </td>
                            <td style={{ padding: '10px 12px', textAlign: 'center', color: '#4b5563' }}>
                              {q.avgTimeMs > 0 ? `${Math.round(q.avgTimeMs / 1000)}s` : '—'}
                            </td>
                            <td style={{ padding: '10px 12px', textAlign: 'center', color: '#6b7280' }}>
                              {q.maxTimeMs > 0 ? `${Math.round(q.maxTimeMs / 1000)}s` : '—'}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Table */}
      <div style={{ padding: '0 24px 24px' }}>
        {loading && sessions.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#9ca3af', padding: 40 }}>{t('admin.loading')}</p>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: 40, background: '#fef2f2', borderRadius: 12, color: '#dc2626' }}>
            {error}
            <br />
            <button onClick={fetchData} style={{ marginTop: 8, padding: '6px 20px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>{t('admin.retry')}</button>
          </div>
        ) : filtered.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#9ca3af', padding: 40 }}>{t('admin.noSessionsFound')}</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {groupedByMonth.map(([monthKey, group]) => {
              const isExpanded = expandedMonths.has(monthKey);
              return (
                <div key={monthKey} style={{
                  background: '#fff', borderRadius: 8,
                  border: '1px solid #e5e7eb', overflow: 'hidden',
                }}>
                  {/* Month Header */}
                  <div
                    onClick={() => toggleMonth(monthKey)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '12px 18px', cursor: 'pointer',
                      background: isExpanded ? '#f8fafc' : '#fff',
                      borderBottom: isExpanded ? '1px solid #e5e7eb' : 'none',
                      userSelect: 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{
                        fontSize: 12, color: '#9ca3af',
                        transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s',
                      }}>
                        ▶
                      </span>
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#1f2937' }}>
                        {group.label}
                      </span>
                      <span style={{
                        fontSize: 12, color: '#6b7280',
                        background: '#f3f4f6', padding: '1px 8px', borderRadius: 99,
                      }}>
                        {group.sessions.length}
                      </span>
                    </div>
                  </div>

                  {/* Sessions Table */}
                  {isExpanded && (
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <thead>
                          <tr style={{ borderBottom: '2px solid #e5e7eb', textAlign: 'left' }}>
                            {selectMode && <th style={{ padding: '10px 12px', width: 40 }} />}
                            <th style={{ padding: '10px 12px', color: '#6b7280', fontWeight: 600 }}>{t('admin.tableHeaderStudent')}</th>
                            <th style={{ padding: '10px 12px', color: '#6b7280', fontWeight: 600 }}>{t('admin.tableHeaderPaper')}</th>
                            <th style={{ padding: '10px 12px', color: '#6b7280', fontWeight: 600 }}>{t('admin.tableHeaderStatus')}</th>
                            <th style={{ padding: '10px 12px', color: '#6b7280', fontWeight: 600 }}>{t('admin.tableHeaderProgress')}</th>
                            <th style={{ padding: '10px 12px', color: '#6b7280', fontWeight: 600 }}>{t('admin.tableHeaderScore')}</th>
                            <th style={{ padding: '10px 12px', color: '#6b7280', fontWeight: 600 }}>{t('admin.tableHeaderAction')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {group.sessions.map((s) => (
                            <tr
                              key={s.id}
                              style={{
                                borderBottom: '1px solid #f3f4f6',
                                background: s.status === 'active' ? '#fffbeb' : '#fff',
                              }}
                            >
                              {selectMode && (
                                <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                                  <input
                                    type="checkbox"
                                    checked={selectedIds.has(s.id)}
                                    onChange={() => toggleSelectId(s.id)}
                                    style={{ width: 16, height: 16, cursor: 'pointer' }}
                                  />
                                </td>
                              )}
                              <td style={{ padding: '10px 12px' }}>
                                <div style={{ fontWeight: 600 }}>{s.users?.full_name || t('admin.unknownName')}</div>
                                <div style={{ fontSize: 11, color: '#9ca3af' }}>{s.users?.email}</div>
                              </td>
                              <td style={{ padding: '10px 12px', color: '#4b5563' }}>
                                {s.papers?.title || t('admin.unknownName')}
                              </td>
                              <td style={{ padding: '10px 12px' }}>
                                <span style={{
                                  display: 'inline-block', padding: '2px 10px', borderRadius: 99,
                                  fontSize: 12, fontWeight: 600,
                                  background:
                                    s.status === 'active' ? '#fef3c7' :
                                    s.status === 'completed' ? '#d1fae5' :
                                    s.status === 'terminated' ? '#fee2e2' : '#f3f4f6',
                                  color:
                                    s.status === 'active' ? '#92400e' :
                                    s.status === 'completed' ? '#065f46' :
                                    s.status === 'terminated' ? '#991b1b' : '#6b7280',
                                }}>
                                  {s.status}
                                </span>
                                {s.status === 'active' && (
                                  <span style={{ marginLeft: 8, fontSize: 11, color: '#f59e0b' }}>{t('admin.liveBadge')}</span>
                                )}
                              </td>
                              <td style={{ padding: '10px 12px', color: '#4b5563' }}>
                                {s.answered_count ?? 0}/{s.total_questions ?? '?'}
                              </td>
                              <td style={{ padding: '10px 12px', fontWeight: 600 }}>
                                {s.score !== null ? (
                                  <span style={{ color: s.score >= (s.total_questions || 10) * 0.7 ? '#16a34a' : '#ef4444' }}>
                                    {s.score}/{s.total_questions}
                                  </span>
                                ) : (
                                  <span style={{ color: '#9ca3af' }}>—</span>
                                )}
                              </td>
                              <td style={{ padding: '10px 12px', whiteSpace: 'nowrap' }}>
                                <button
                                  onClick={() => navigate(`/admin/student/${s.id}`)}
                                  style={{
                                    padding: '4px 12px', background: '#1e40af', color: '#fff',
                                    border: 'none', borderRadius: 5, cursor: 'pointer', fontSize: 12,
                                    fontWeight: 500,
                                    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                                  }}
                                >
                                  {t('admin.view')}
                                </button>
                                {s.status === 'active' && (
                                  <button
                                    onClick={() => handleTerminate(s.id)}
                                    disabled={terminating === s.id}
                                    style={{
                                      padding: '4px 12px', background: '#ef4444', color: '#fff',
                                      border: 'none', borderRadius: 5, cursor: 'pointer', fontSize: 12,
                                      fontWeight: 500, marginLeft: 6,
                                      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                                    }}
                                  >
                                    {terminating === s.id ? '...' : t('admin.terminate')}
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
