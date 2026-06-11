import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProctor } from '../sdk/useProctor';
import { TopNav } from '../components/TopNav';
import { MathText } from '../components/MathText';
import { supabase } from '../supabase';
import type { Question } from '../sdk/types';

interface SessionSummary {
  id: string;
  paper_id: string;
  score: number | null;
  answers: Record<string, number> | null;
  question_times: Record<string, number> | null;
  started_at: string;
  papers: { title: string; paper_number: number; year: number; questions: Question[] };
}

interface TopicStat {
  topic: string;
  accuracy: number;
  correct: number;
  total: number;
}

interface WrongQuestion {
  qid: string;
  text: string;
  topic: string;
  userAns: number;
  correctAns: number;
  paperTitle: string;
  options: string[];
  image_url?: string;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// -- inline SVG icons (simple geometric shapes, no emoji) --
const ExamsIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
  </svg>
);

const QuestionsIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const AvgIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);

const BestIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export function StudentAnalyticsPage() {
  const { user } = useProctor();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState<SessionSummary[]>([]);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [groupMode, setGroupMode] = useState<'topic' | 'paper'>('topic');
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!user) return;
    async function load() {
      const { data: profile } = await supabase
        .from('users').select('id').eq('auth_id', user!.id).single();
      if (!profile) { setLoading(false); return; }

      const { data: sessionData } = await supabase
        .from('exam_sessions')
        .select('id, paper_id, score, answers, question_times, started_at, papers(title, paper_number, year, questions)')
        .eq('user_id', profile.id)
        .eq('status', 'completed')
        .order('started_at', { ascending: false });

      const tmua = (sessionData || []).filter((s: any) =>
        s.papers?.title?.toLowerCase?.().includes('tmua')
      );
      setSessions(tmua as unknown as SessionSummary[]);
      setLoading(false);
    }
    load();
  }, [user]);

  const stats = useMemo(() => {
    if (sessions.length === 0) return null;

    let totalQuestions = 0;
    let totalScore = 0;
    let bestScore = 0;
    let bestPaper = '';
    let bestSessionId = '';
    let totalTimeSec = 0;

    const scoreTrend = sessions.map(s => {
      const d = new Date(s.started_at);
      const times = s.question_times || {};
      const timeSec = Object.values(times).reduce((sum, t) => sum + t, 0);
      totalTimeSec += timeSec;
      const qCount = s.papers?.questions?.length || 0;
      return {
        sessionId: s.id,
        paperId: s.paper_id,
        date: `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`,
        paperTitle: s.papers?.title || 'Unknown',
        score: s.score || 0,
        total: qCount,
        pct: qCount > 0 ? Math.round(((s.score || 0) / qCount) * 100) : 0,
        timeMin: Math.round(timeSec / 60),
      };
    });

    const topicStats: Record<string, { correct: number; total: number }> = {};

    for (const s of sessions) {
      const questions = s.papers?.questions || [];
      const answers = s.answers || {};
      totalQuestions += Object.keys(answers).length;
      totalScore += s.score || 0;

      if ((s.score || 0) > bestScore) {
        bestScore = s.score || 0;
        bestPaper = s.papers?.title || '';
        bestSessionId = s.id;
      }

      for (const q of questions) {
        const userAns = answers[q.id];
        if (userAns === undefined || userAns === null) continue;
        const topic = q.topic || 'general';
        if (!topicStats[topic]) topicStats[topic] = { correct: 0, total: 0 };
        topicStats[topic].total++;
        if (userAns === q.answer) topicStats[topic].correct++;
      }
    }

    const topicBreakdown: TopicStat[] = Object.entries(topicStats)
      .map(([topic, { correct, total }]) => ({
        topic,
        accuracy: Math.round((correct / total) * 100),
        correct,
        total,
      }))
      .sort((a, b) => a.accuracy - b.accuracy);

    const avgScore = Math.round((totalScore / sessions.length) * 100) / 100;
    const avgPct = totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0;

    // Performance rating
    let rating: { label: string; color: string; bg: string } = { label: 'Keep Going', color: '#f59e0b', bg: '#fffbeb' };
    if (avgPct >= 85) rating = { label: 'Excellent', color: '#16a34a', bg: '#f0fdf4' };
    else if (avgPct >= 70) rating = { label: 'Great', color: '#2563eb', bg: '#eff6ff' };
    else if (avgPct >= 50) rating = { label: 'Good', color: '#f59e0b', bg: '#fffbeb' };

    return {
      totalExams: sessions.length,
      totalQuestions,
      avgScore,
      bestScore,
      bestPaper,
      bestSessionId,
      avgPct,
      totalTimeMin: Math.round(totalTimeSec / 60),
      scoreTrend,
      topicBreakdown,
      rating,
    };
  }, [sessions]);

  // Wrong answer book: grouped by year → topic
  const wrongBook = useMemo(() => {
    const byYear: Record<string, Record<string, WrongQuestion[]>> = {};
    const seen = new Set<string>();

    for (const s of sessions) {
      const year = String(s.papers?.year || 'Unknown');
      const paperTitle = s.papers?.title || 'Unknown';
      const questions = s.papers?.questions || [];
      const answers = s.answers || {};

      for (const q of questions) {
        const userAns = answers[q.id];
        if (userAns === undefined || userAns === null) continue;
        if (userAns === q.answer) continue;
        if (seen.has(q.id)) continue;
        seen.add(q.id);

        const topic = q.topic || 'general';
        if (!byYear[year]) byYear[year] = {};
        if (!byYear[year][topic]) byYear[year][topic] = [];
        byYear[year][topic].push({
          qid: q.id,
          text: q.text,
          topic,
          userAns,
          correctAns: q.answer,
          paperTitle,
          options: q.options,
          image_url: q.image_url,
        });
      }
    }

    const entries = Object.entries(byYear)
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map(([year, topics]) => ({
        year,
        total: Object.values(topics).reduce((s, arr) => s + arr.length, 0),
        topics: Object.entries(topics)
          .sort((a, b) => b[1].length - a[1].length)
          .map(([topic, questions]) => ({ topic, questions })),
      }));

    return entries;
  }, [sessions]);

  // Wrong answer book: grouped by year → paper
  const wrongBookByPaper = useMemo(() => {
    const byYear: Record<string, Record<string, WrongQuestion[]>> = {};
    const seenByPaper = new Map<string, Set<string>>();

    for (const s of sessions) {
      const year = String(s.papers?.year || 'Unknown');
      const paperTitle = s.papers?.title || 'Unknown';
      const questions = s.papers?.questions || [];
      const answers = s.answers || {};

      if (!byYear[year]) byYear[year] = {};
      if (!byYear[year][paperTitle]) byYear[year][paperTitle] = [];
      if (!seenByPaper.has(paperTitle)) seenByPaper.set(paperTitle, new Set());

      for (const q of questions) {
        const userAns = answers[q.id];
        if (userAns === undefined || userAns === null) continue;
        if (userAns === q.answer) continue;
        if (seenByPaper.get(paperTitle)!.has(q.id)) continue;
        seenByPaper.get(paperTitle)!.add(q.id);

        byYear[year][paperTitle].push({
          qid: q.id,
          text: q.text,
          topic: q.topic || 'general',
          userAns,
          correctAns: q.answer,
          paperTitle,
          options: q.options,
          image_url: q.image_url,
        });
      }
    }

    const entries = Object.entries(byYear)
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map(([year, papers]) => ({
        year,
        total: Object.values(papers).reduce((s, arr) => s + arr.length, 0),
        papers: Object.entries(papers)
          .sort((a, b) => b[1].length - a[1].length)
          .map(([paperTitle, questions]) => ({ paperTitle, questions })),
      }));

    return entries;
  }, [sessions]);

  // Auto-select first year for wrong book
  const activeBook = groupMode === 'topic' ? wrongBook : wrongBookByPaper;
  useEffect(() => {
    if (activeBook.length > 0 && !selectedYear) {
      setSelectedYear(activeBook[0].year);
    }
  }, [activeBook, selectedYear]);

  const toggleGroup = (key: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const handleRedoWrong = (questions: WrongQuestion[], label: string) => {
    const paperQs = questions.map((q) => ({
      id: q.qid,
      text: q.text,
      options: q.options,
      answer: q.correctAns,
      topic: q.topic,
      image_url: q.image_url,
    }));
    const paper = {
      id: 'generated_wrong_redo',
      title: `Wrong Questions — ${label}`,
      paper_number: 1 as const,
      year: Number(selectedYear) || 2025,
      sitting: 'Practice',
      duration_minutes: Math.max(10, paperQs.length * 2),
      total_marks: paperQs.length,
      topics: [...new Set(questions.map(q => q.topic))],
      questions: paperQs,
      created_at: new Date().toISOString(),
    };
    localStorage.setItem('tmua_generated_paper', JSON.stringify(paper));
    navigate('/exam');
  };

  const currentBook = groupMode === 'topic' ? wrongBook : wrongBookByPaper;
  const selectedYearData = currentBook.find(w => w.year === selectedYear);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', fontFamily: "'Geist', system-ui, -apple-system, sans-serif", background: '#f8fafc' }}>
        <TopNav currentPage="analytics" />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', border: '3px solid #e5e7eb', borderTopColor: '#1e40af', animation: 'spin 0.8s linear infinite', margin: '0 auto 12px' }} />
            <div style={{ fontSize: 14, color: '#9ca3af' }}>Loading your dashboard...</div>
          </div>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // ====== Style constants ======
  const pageBg = '#f8fafc';
  const accent = '#1e40af';
  const accentLight = '#dbeafe';
  const textMain = '#0f172a';
  const textSub = '#64748b';
  const borderColor = '#e2e8f0';
  const cardBg = '#ffffff';
  const radiusSm = 8;
  const radiusMd = 12;
  const radiusLg = 16;
  const shadow = '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)';
  const shadowMd = '0 4px 12px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)';

  const sectionTitle: React.CSSProperties = {
    fontSize: 17, fontWeight: 600, color: textMain, margin: '0 0 16px',
    fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
  };

  const cardBase: React.CSSProperties = {
    background: cardBg, borderRadius: radiusMd, border: `1px solid ${borderColor}`, boxShadow: shadow,
  };

  // Accuracy bar color
  const accuracyColor = (pct: number) =>
    pct >= 80 ? '#16a34a' : pct >= 50 ? '#f59e0b' : '#ef4444';

  const accuracyBg = (pct: number) =>
    pct >= 80 ? '#f0fdf4' : pct >= 50 ? '#fffbeb' : '#fef2f2';

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Geist', system-ui, -apple-system, sans-serif", background: pageBg }}>
      <TopNav currentPage="analytics" />

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '28px 20px 80px' }}>
        {/* ====== Hero Header Card ====== */}
        <div style={{
          ...cardBase,
          padding: '28px 32px',
          marginBottom: 24,
          borderRadius: radiusLg,
          background: `linear-gradient(135deg, ${accent} 0%, #1e3a8a 100%)`,
          border: 'none',
          boxShadow: '0 4px 24px rgba(30,64,175,0.15)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.7)', marginBottom: 4, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                TMUA Dashboard
              </div>
              <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: '#fff' }}>
                Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}!
              </h1>
            </div>
            {stats && (
              <button
                onClick={() => {
                  if (stats.avgPct >= 70) navigate(`/my-session/${stats.bestSessionId}`);
                  else document.getElementById('wrong-answer-book')?.scrollIntoView({ behavior: 'smooth' });
                }}
                title={stats.avgPct >= 70 ? 'View best session' : 'Review your mistakes'}
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: 99,
                  padding: '8px 18px',
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  border: '1px solid rgba(255,255,255,0.2)',
                  cursor: 'pointer',
                  fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.25)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)'; }}
              >
                <span style={{
                  display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
                  background: stats.rating.color,
                }} />
                {stats.rating.label} · {stats.avgPct}%
              </button>
            )}
          </div>

          {/* Stat cards inside hero */}
          {stats && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginTop: 24 }}>
              {[
                { icon: <ExamsIcon />, label: 'Exams', value: stats.totalExams, sub: 'completed', action: () => document.getElementById('score-trend')?.scrollIntoView({ behavior: 'smooth' }) },
                { icon: <QuestionsIcon />, label: 'Questions', value: stats.totalQuestions, sub: 'answered', action: () => document.getElementById('wrong-answer-book')?.scrollIntoView({ behavior: 'smooth' }) },
                { icon: <AvgIcon />, label: 'Avg Score', value: `${stats.avgPct}%`, sub: `${stats.avgScore} pts`, action: () => document.getElementById('score-trend')?.scrollIntoView({ behavior: 'smooth' }) },
                { icon: <BestIcon />, label: 'Best Score', value: `${stats.bestScore}`, sub: stats.bestPaper.length > 20 ? stats.bestPaper.slice(0, 20) + '...' : stats.bestPaper, action: () => navigate(`/my-session/${stats.bestSessionId}`) },
              ].map((s, i) => (
                <div key={i}
                  onClick={s.action}
                  title={i === 3 ? 'View best session' : `Jump to ${s.label.toLowerCase()}`}
                  style={{
                    background: 'rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: radiusMd,
                    padding: '16px 18px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.22)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ color: 'rgba(255,255,255,0.7)' }}>{s.icon}</div>
                  <div style={{ fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>{s.label}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>{s.sub}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {!stats ? (
          <div style={{
            ...cardBase, padding: 48, textAlign: 'center', borderRadius: radiusLg,
          }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: accentLight, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/>
              </svg>
            </div>
            <p style={{ fontSize: 15, fontWeight: 600, color: textMain, margin: '0 0 6px' }}>No completed TMUA exams yet</p>
            <p style={{ fontSize: 13, color: textSub, margin: 0 }}>Complete a mock exam to see your analytics here.</p>
          </div>
        ) : (
          <>
            {/* ====== Score Trend — Card Timeline ====== */}
            <div id="score-trend" style={{ ...cardBase, padding: '24px 28px', marginBottom: 24, borderRadius: radiusLg }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <h2 style={sectionTitle}>Score Trend</h2>
                <span style={{ fontSize: 12, color: textSub, fontWeight: 500 }}>
                  {stats.totalExams} exams · {Math.round(stats.totalTimeMin / 60)}h {stats.totalTimeMin % 60}m total
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {stats.scoreTrend.map((t, i) => (
                  <div key={i}
                    className="score-trend-row"
                    onClick={() => navigate(`/my-session/${t.sessionId}`)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      padding: '13px 16px', borderRadius: radiusSm,
                      background: i === 0 ? '#f8fafc' : 'transparent',
                      border: i === 0 ? `1px solid ${borderColor}` : '1px solid transparent',
                      cursor: 'pointer',
                    }}>
                    {/* Date */}
                    <div style={{ minWidth: 120, fontSize: 12, color: textSub, fontWeight: 500 }}>
                      {t.date}
                    </div>
                    {/* Paper title */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: textMain, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {t.paperTitle}
                      </div>
                      {t.timeMin > 0 && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                          <ClockIcon />
                          <span style={{ fontSize: 11, color: textSub }}>{t.timeMin} min</span>
                        </div>
                      )}
                    </div>
                    {/* Score bar */}
                    <div style={{ width: 140, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ flex: 1, height: 6, borderRadius: 3, background: '#f1f5f9', overflow: 'hidden' }}>
                        <div style={{
                          height: '100%', borderRadius: 3,
                          width: `${Math.min(t.pct, 100)}%`,
                          background: accuracyColor(t.pct),
                          transition: 'width 0.4s ease',
                        }} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: textMain, minWidth: 36, textAlign: 'right' }}>
                        {t.pct}%
                      </span>
                    </div>
                    {/* Score */}
                    <div style={{ minWidth: 56, textAlign: 'right' }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: textMain }}>{t.score}/{t.total}</span>
                    </div>
                    {/* Status indicator */}
                    <div style={{ minWidth: 20, textAlign: 'center' }}>
                      {t.pct >= 80 ? (
                        <span style={{ color: '#16a34a' }}><CheckIcon /></span>
                      ) : (
                        <span style={{ width: 16, height: 16, display: 'inline-block' }} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ====== Wrong Answer Book ====== */}
            {(wrongBook.length > 0 || wrongBookByPaper.length > 0) && (
              <div id="wrong-answer-book" style={{
                ...cardBase, padding: '32px 32px', marginBottom: 24, borderRadius: radiusLg,
                borderLeft: `4px solid #dc2626`, boxShadow: shadowMd,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 700, color: textMain, margin: 0 }}>
                      Wrong Answer Book
                    </h2>
                    {selectedYearData && selectedYearData.total > 0 && (
                      <button
                        onClick={() => {
                          const all: WrongQuestion[] = [];
                          if (groupMode === 'topic' && 'topics' in selectedYearData) {
                            selectedYearData.topics.forEach(t => all.push(...t.questions));
                          } else if (groupMode === 'paper' && 'papers' in selectedYearData) {
                            selectedYearData.papers.forEach(p => all.push(...p.questions));
                          }
                          handleRedoWrong(all, `All ${selectedYear} Mistakes`);
                        }}
                        style={{
                          fontSize: 11, fontWeight: 600, color: '#fff', background: accent,
                          border: 'none', borderRadius: 6, padding: '5px 12px', cursor: 'pointer',
                          fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
                        }}
                      >
                        Redo All →
                      </button>
                    )}
                  </div>
                  <span style={{
                    fontSize: 13, color: '#dc2626', background: '#fef2f2',
                    padding: '4px 14px', borderRadius: 99, fontWeight: 600,
                  }}>
                    {currentBook.reduce((s, y) => s + y.total, 0)} mistakes
                  </span>
                </div>
                <p style={{ margin: '0 0 20px', fontSize: 13, color: textSub }}>
                  Review every question you got wrong. Group by topic or by paper to focus your revision.
                </p>

                {/* Group mode toggle + Year tabs in one row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, flexWrap: 'wrap', gap: 10 }}>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {currentBook.map(({ year, total }) => (
                      <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        style={{
                          padding: '8px 16px',
                          borderRadius: 99,
                          border: selectedYear === year ? `2px solid ${accent}` : `1px solid ${borderColor}`,
                          background: selectedYear === year ? accentLight : cardBg,
                          color: selectedYear === year ? accent : textSub,
                          fontSize: 13,
                          fontWeight: selectedYear === year ? 600 : 500,
                          cursor: 'pointer',
                          fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
                          transition: 'all 0.15s',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                        }}
                      >
                        {year}
                        <span style={{
                          fontSize: 11, fontWeight: 500,
                          color: selectedYear === year ? accent : textSub,
                          background: selectedYear === year ? 'rgba(30,64,175,0.1)' : '#f1f5f9',
                          padding: '1px 7px',
                          borderRadius: 99,
                        }}>
                          {total}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Group mode pills */}
                  <div style={{
                    display: 'flex', borderRadius: 8, overflow: 'hidden',
                    border: `1px solid ${borderColor}`, fontSize: 12,
                  }}>
                    <button
                      onClick={() => { setGroupMode('topic'); setExpandedGroups(new Set()); }}
                      style={{
                        padding: '5px 14px', border: 'none', cursor: 'pointer',
                        background: groupMode === 'topic' ? accent : cardBg,
                        color: groupMode === 'topic' ? '#fff' : textSub,
                        fontWeight: groupMode === 'topic' ? 600 : 500,
                        fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
                        fontSize: 12, transition: 'all 0.15s',
                      }}
                    >
                      By Topic
                    </button>
                    <button
                      onClick={() => { setGroupMode('paper'); setExpandedGroups(new Set()); }}
                      style={{
                        padding: '5px 14px', border: 'none', cursor: 'pointer',
                        background: groupMode === 'paper' ? accent : cardBg,
                        color: groupMode === 'paper' ? '#fff' : textSub,
                        fontWeight: groupMode === 'paper' ? 600 : 500,
                        fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
                        fontSize: 12, transition: 'all 0.15s',
                      }}
                    >
                      By Paper
                    </button>
                  </div>
                </div>

                {/* Accordion: topics or papers for selected year */}
                {selectedYearData && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {groupMode === 'topic' && 'topics' in selectedYearData && (
                      selectedYearData.topics.map(({ topic, questions }: { topic: string; questions: WrongQuestion[] }) => {
                        const isOpen = expandedGroups.has(topic);
                        return (
                          <div key={topic} style={{
                            borderRadius: radiusSm,
                            border: `1px solid ${borderColor}`,
                            overflow: 'hidden',
                          }}>
                            <div
                              onClick={() => toggleGroup(topic)}
                              style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                padding: '11px 16px', cursor: 'pointer',
                                background: isOpen ? '#f8fafc' : '#fff',
                                userSelect: 'none',
                                transition: 'background 0.1s',
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <span style={{
                                  fontSize: 12, color: textSub,
                                  transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                                  transition: 'transform 0.2s',
                                  display: 'inline-block',
                                }}>
                                  ▶
                                </span>
                                <span style={{
                                  fontSize: 13, fontWeight: 600, color: textMain,
                                  textTransform: 'capitalize',
                                }}>
                                  {topic.replace(/_/g, ' ')}
                                </span>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <button
                                  onClick={(e) => { e.stopPropagation(); handleRedoWrong(questions, `${topic.replace(/_/g, ' ')} (${selectedYear})`); }}
                                  style={{
                                    fontSize: 11, fontWeight: 600, color: accent, background: accentLight,
                                    border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer',
                                    fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
                                  }}
                                >
                                  Redo →
                                </button>
                                <span style={{
                                  fontSize: 12, color: '#dc2626', background: '#fef2f2',
                                  padding: '2px 9px', borderRadius: 99, fontWeight: 500,
                                }}>
                                  {questions.length} wrong
                                </span>
                              </div>
                            </div>
                            {isOpen && (
                              <div style={{ borderTop: `1px solid ${borderColor}` }}>
                                {questions.map((q: WrongQuestion, qi: number) => (
                                  <div key={q.qid} style={{
                                    padding: '13px 16px 13px 42px',
                                    borderBottom: qi < questions.length - 1 ? `1px solid #f1f5f9` : 'none',
                                  }}>
                                    <div style={{
                                      fontSize: 11, color: textSub, marginBottom: 4,
                                    }}>
                                      {q.paperTitle}
                                    </div>
                                    <div style={{
                                      fontSize: 13, color: '#334155', lineHeight: 1.65, marginBottom: 8,
                                    }}>
                                      <MathText text={q.text} />
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12 }}>
                                      <span style={{
                                        color: '#dc2626', fontWeight: 500,
                                        background: '#fef2f2', padding: '2px 8px', borderRadius: 4,
                                      }}>
                                        Your: {String.fromCharCode(65 + q.userAns)}
                                      </span>
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                                      </svg>
                                      <span style={{
                                        color: '#16a34a', fontWeight: 600,
                                        background: '#f0fdf4', padding: '2px 8px', borderRadius: 4,
                                      }}>
                                        Correct: {String.fromCharCode(65 + q.correctAns)}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                    {groupMode === 'paper' && 'papers' in selectedYearData && (
                      selectedYearData.papers.map(({ paperTitle, questions }: { paperTitle: string; questions: WrongQuestion[] }) => {
                        const isOpen = expandedGroups.has(paperTitle);
                        return (
                          <div key={paperTitle} style={{
                            borderRadius: radiusSm,
                            border: `1px solid ${borderColor}`,
                            overflow: 'hidden',
                          }}>
                            <div
                              onClick={() => toggleGroup(paperTitle)}
                              style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                padding: '11px 16px', cursor: 'pointer',
                                background: isOpen ? '#f8fafc' : '#fff',
                                userSelect: 'none',
                                transition: 'background 0.1s',
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <span style={{
                                  fontSize: 12, color: textSub,
                                  transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                                  transition: 'transform 0.2s',
                                  display: 'inline-block',
                                }}>
                                  ▶
                                </span>
                                <span style={{
                                  fontSize: 13, fontWeight: 600, color: textMain,
                                }}>
                                  {paperTitle}
                                </span>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <button
                                  onClick={(e) => { e.stopPropagation(); handleRedoWrong(questions, `${paperTitle} (${selectedYear})`); }}
                                  style={{
                                    fontSize: 11, fontWeight: 600, color: accent, background: accentLight,
                                    border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer',
                                    fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
                                  }}
                                >
                                  Redo →
                                </button>
                                <span style={{
                                  fontSize: 12, color: '#dc2626', background: '#fef2f2',
                                  padding: '2px 9px', borderRadius: 99, fontWeight: 500,
                                }}>
                                  {questions.length} wrong
                                </span>
                              </div>
                            </div>
                            {isOpen && (
                              <div style={{ borderTop: `1px solid ${borderColor}` }}>
                                {questions.map((q: WrongQuestion, qi: number) => (
                                  <div key={q.qid} style={{
                                    padding: '13px 16px 13px 42px',
                                    borderBottom: qi < questions.length - 1 ? `1px solid #f1f5f9` : 'none',
                                  }}>
                                    <div style={{
                                      fontSize: 11, color: textSub, marginBottom: 4, textTransform: 'capitalize',
                                    }}>
                                      {q.topic.replace(/_/g, ' ')}
                                    </div>
                                    <div style={{
                                      fontSize: 13, color: '#334155', lineHeight: 1.65, marginBottom: 8,
                                    }}>
                                      <MathText text={q.text} />
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12 }}>
                                      <span style={{
                                        color: '#dc2626', fontWeight: 500,
                                        background: '#fef2f2', padding: '2px 8px', borderRadius: 4,
                                      }}>
                                        Your: {String.fromCharCode(65 + q.userAns)}
                                      </span>
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                                      </svg>
                                      <span style={{
                                        color: '#16a34a', fontWeight: 600,
                                        background: '#f0fdf4', padding: '2px 8px', borderRadius: 4,
                                      }}>
                                        Correct: {String.fromCharCode(65 + q.correctAns)}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
      <style>{`
        .score-trend-row:hover {
          background: #f1f5f9 !important;
        }
      `}</style>
    </div>
  );
}
