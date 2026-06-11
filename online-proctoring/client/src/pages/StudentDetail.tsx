import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import { MathText } from '../components/MathText';
import { TopNav } from '../components/TopNav';
import { useProctor } from '../sdk/useProctor';
import type { Question } from '../sdk/types';
import { useLocale } from '../i18n/LocaleContext';
import { generateExamReport } from '../utils/generateReport';

interface SessionDetail {
  id: string;
  user_id: string;
  paper_id: string;
  status: string;
  answers: Record<string, number>;
  question_times: Record<string, number>;
  score: number | null;
  started_at: string;
  ended_at: string | null;
  users: { full_name: string; email: string };
  papers: { title: string; paper_number: number; duration_minutes: number; questions: Question[] };
}

interface LogEntry {
  id: number;
  event_type: string;
  detail: any;
  severity: string;
  recorded_at: string;
}

const SEVERITY_COLORS: Record<string, string> = {
  low: '#f59e0b',
  medium: '#f97316',
  high: '#ef4444',
};

export function StudentDetail() {
  const { t } = useLocale();
  const { user } = useProctor();
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const [session, setSession] = useState<SessionDetail | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [terminating, setTerminating] = useState(false);
  const [expandedQs, setExpandedQs] = useState<Set<number>>(new Set());

  const handleTerminate = async () => {
    if (!sessionId) return;
    if (!window.confirm(t('studentDetail.terminateConfirm'))) return;
    setTerminating(true);
    await supabase
      .from('exam_sessions')
      .update({ status: 'terminated', ended_at: new Date().toISOString() })
      .eq('id', sessionId);
    setTerminating(false);
    // Refresh session data
    setSession(prev => prev ? { ...prev, status: 'terminated', ended_at: new Date().toISOString() } : prev);
  };

  useEffect(() => {
    if (!sessionId) return;

    async function load() {
      setLoading(true);
      setError('');

      // Fetch session
      const { data: sessionData, error: sessionError } = await supabase
        .from('exam_sessions')
        .select('id, user_id, paper_id, status, answers, question_times, score, started_at, ended_at, users(full_name, email), papers(title, paper_number, duration_minutes, questions)')
        .eq('id', sessionId)
        .single();

      if (sessionError || !sessionData) {
        setError(sessionError?.message || t('studentDetail.sessionNotFound'));
        setLoading(false);
        return;
      }

      // Ownership check: students can only view their own sessions
      if (user) {
        const { data: profile } = await supabase
          .from('users').select('id, role').eq('auth_id', user.id).single();
        if (profile?.role === 'student' && (sessionData as any).user_id !== profile.id) {
          setError('Session not found');
          setLoading(false);
          return;
        }
      }

      setSession(sessionData as unknown as SessionDetail);

      // Fetch logs
      const { data: logData } = await supabase
        .from('exam_logs')
        .select('*')
        .eq('session_id', sessionId)
        .order('recorded_at', { ascending: false });

      setLogs((logData || []) as LogEntry[]);
      setLoading(false);
    }

    load();
  }, [sessionId]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', fontFamily: "'Geist', system-ui, -apple-system, sans-serif", background: '#ffffff' }}>
        <TopNav currentPage="teacher" />
        <div style={{ padding: 40, textAlign: 'center', color: '#9ca3af' }}>
          {t('studentDetail.loading')}
        </div>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div style={{ minHeight: '100vh', fontFamily: "'Geist', system-ui, -apple-system, sans-serif", background: '#ffffff' }}>
        <TopNav currentPage="teacher" />
        <div style={{ maxWidth: 500, margin: '60px auto', textAlign: 'center' }}>
          <p style={{ color: '#dc2626' }}>{error || t('studentDetail.sessionNotFound')}</p>
          <button
            onClick={() => navigate(-1)}
            style={{
              padding: '6px 20px', background: '#1e40af', color: '#fff',
              border: 'none', borderRadius: 6, cursor: 'pointer', marginTop: 8,
              fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
            }}
          >
            {t('studentDetail.backToDashboard')}
          </button>
        </div>
      </div>
    );
  }

  const questions = session.papers?.questions || [];
  const answers = session.answers || {};
  const questionTimes = session.question_times || {};

  let correctCount = 0;
  const details = questions.map((q, i) => {
    const yours = answers[q.id] ?? null;
    const isCorrect = yours === q.answer;
    if (isCorrect) correctCount++;
    return { ...q, index: i, yours, isCorrect, timeMs: questionTimes[q.id] || 0 };
  });

  const totalQuestions = questions.length;
  const scorePercent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Geist', system-ui, -apple-system, sans-serif", background: '#ffffff' }}>
      <TopNav currentPage="teacher" />

      {/* Student Info Header */}
      <div style={{
        background: '#fff', borderBottom: '1px solid #e5e7eb',
        padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 16,
        fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: '6px 14px', border: '1px solid #d1d5db', borderRadius: 6,
            background: '#fff', cursor: 'pointer', fontSize: 13,
            fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
          }}
        >
          {t('studentDetail.back')}
        </button>
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: 0, fontSize: 18, fontFamily: "'Geist', system-ui, -apple-system, sans-serif" }}>
            {session.users?.full_name || 'Unknown'}
          </h1>
          <p style={{ margin: '2px 0 0', color: '#6b7280', fontSize: 12 }}>
            {session.users?.email} &middot; {session.papers?.title}
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{
            fontSize: 28, fontWeight: 700,
            color: scorePercent >= 80 ? '#16a34a' : scorePercent >= 50 ? '#f59e0b' : '#ef4444',
          }}>
            {correctCount}/{totalQuestions} ({scorePercent}%)
          </div>
          <div style={{ fontSize: 12, color: '#6b7280' }}>
            Status: {session.status} &middot; {session.ended_at ? `Ended ${new Date(session.ended_at).toLocaleString()}` : t('studentDetail.inProgress')}
          </div>
        </div>
        <button
          onClick={() => {
            const paperQs = (session.papers?.questions as Question[]) || [];
            const ans = session.answers || {};
            const times = session.question_times || {};
            const details = paperQs.map((q, i) => ({
              qid: q.id,
              questionLabel: `Q${i + 1}`,
              text: q.text,
              timeMs: times[q.id] || 0,
              correctAnswer: q.answer,
              yourAnswer: ans[q.id] ?? null,
              isCorrect: ans[q.id] === q.answer,
            }));
            generateExamReport({
              paperTitle: session.papers?.title || 'Exam',
              paperDuration: session.papers?.duration_minutes || 0,
              completedAt: session.ended_at ? new Date(session.ended_at) : new Date(),
              totalQuestions: paperQs.length,
              score: correctCount,
              maxScore: totalQuestions,
              questionDetails: details,
            });
          }}
          style={{
            padding: '8px 16px', background: '#1e40af', color: '#fff',
            border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13,
            fontWeight: 600, fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
          }}
        >
          Download Report (PDF)
        </button>
        {session.status === 'active' && (
          <button
            onClick={handleTerminate}
            disabled={terminating}
            style={{
              padding: '8px 16px', background: '#ef4444', color: '#fff',
              border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13,
              fontWeight: 600, fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
            }}
          >
            {terminating ? t('studentDetail.terminating') : t('studentDetail.terminateSession')}
          </button>
        )}
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: 20 }}>
        {/* Answers Breakdown */}
        <h2 style={{ fontSize: 16, margin: '0 0 12px 0', fontFamily: "'Geist', system-ui, -apple-system, sans-serif" }}>{t('studentDetail.answersBreakdown')}</h2>
        {details.map((d) => {
          const isExpanded = expandedQs.has(d.index);
          return (
            <div key={d.id}>
              <div
                onClick={() => {
                  const next = new Set(expandedQs);
                  isExpanded ? next.delete(d.index) : next.add(d.index);
                  setExpandedQs(next);
                }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 14px', marginBottom: isExpanded ? 0 : 6, borderRadius: isExpanded ? '8px 8px 0 0' : 8,
                  background: d.yours === null ? '#f9fafb' : d.isCorrect ? '#f0fdf4' : '#fef2f2',
                  border: `1px solid ${d.yours === null ? '#e2e8f0' : d.isCorrect ? '#bbf7d0' : '#fecaca'}`,
                  borderBottom: isExpanded ? 'none' : `1px solid ${d.yours === null ? '#e2e8f0' : d.isCorrect ? '#bbf7d0' : '#fecaca'}`,
                  cursor: 'pointer', userSelect: 'none',
                }}
              >
                <span style={{
                  width: 28, height: 28, borderRadius: '50%', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', fontSize: 12,
                  fontWeight: 700, flexShrink: 0,
                  background: d.yours === null ? '#e2e8f0' : d.isCorrect ? '#16a34a' : '#ef4444',
                  color: d.yours === null ? '#9ca3af' : '#fff',
                }}>
                  {d.yours === null ? '?' : d.isCorrect ? '✓' : '✗'}
                </span>
                <span style={{ flex: 1, fontSize: 14, fontWeight: 600 }}>
                  Question {d.index + 1}
                </span>
                <span style={{
                  fontSize: 12, fontWeight: 700, color: '#6b7280',
                  transition: 'transform 0.2s',
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                }}>
                  ▼
                </span>
              </div>
              {isExpanded && (
                <div style={{
                  padding: '14px 14px 16px', marginBottom: 6, borderRadius: '0 0 8px 8px',
                  background: '#fff', border: `1px solid ${d.yours === null ? '#e2e8f0' : d.isCorrect ? '#bbf7d0' : '#fecaca'}`,
                  borderTop: 'none', fontSize: 13, lineHeight: 1.7, color: '#374151',
                }}>
                  <div style={{ marginBottom: 10 }}>
                    <MathText text={d.text} />
                  </div>
                  {d.options.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 12 }}>
                      {d.options.map((opt, j) => (
                        <div key={j} style={{
                          padding: '6px 10px', borderRadius: 6, fontSize: 13,
                          background: j === d.answer ? '#dcfce7' : j === d.yours && j !== d.answer ? '#fef2f2' : '#f9fafb',
                          border: `1px solid ${j === d.answer ? '#bbf7d0' : j === d.yours && j !== d.answer ? '#fecaca' : '#e5e7eb'}`,
                        }}>
                          <span style={{ wordBreak: 'break-word' }}><MathText text={opt} /></span>
                          {j === d.answer && <span style={{ marginLeft: 8, color: '#16a34a', fontSize: 11 }}>✓</span>}
                          {j === d.yours && j !== d.answer && <span style={{ marginLeft: 8, color: '#ef4444', fontSize: 11 }}>Your answer</span>}
                        </div>
                      ))}
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: 24, fontSize: 12, color: '#6b7280', borderTop: '1px solid #e5e7eb', paddingTop: 10 }}>
                    <span>{d.yours !== null ? `Your answer: ${String.fromCharCode(65 + d.yours)}` : t('studentDetail.skipped')}</span>
                    <span>Correct: {String.fromCharCode(65 + d.answer)}</span>
                    {d.timeMs > 0 && <span>{Math.round(d.timeMs / 1000)}s spent</span>}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
