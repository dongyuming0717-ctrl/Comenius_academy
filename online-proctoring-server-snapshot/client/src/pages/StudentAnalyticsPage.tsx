import { useEffect, useState, useMemo } from 'react';
import { useProctor } from '../sdk/useProctor';
import { TopNav } from '../components/TopNav';
import { supabase } from '../supabase';
import type { Question } from '../sdk/types';
import { useLocale } from '../i18n/LocaleContext';

interface SessionSummary {
  id: string;
  paper_id: string;
  score: number | null;
  answers: Record<string, number> | null;
  started_at: string;
  papers: { title: string; paper_number: number; questions: Question[] };
}

interface TopicStat {
  topic: string;
  accuracy: number;
  correct: number;
  total: number;
}

export function StudentAnalyticsPage() {
  const { user } = useProctor();
  const { t } = useLocale();
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState<SessionSummary[]>([]);

  useEffect(() => {
    if (!user) return;
    async function load() {
      const { data: profile } = await supabase
        .from('users').select('id').eq('auth_id', user!.id).single();
      if (!profile) { setLoading(false); return; }

      const { data: sessionData } = await supabase
        .from('exam_sessions')
        .select('id, paper_id, score, answers, started_at, papers(title, paper_number, questions)')
        .eq('user_id', profile.id)
        .eq('status', 'completed')
        .order('started_at', { ascending: true });

      setSessions((sessionData || []) as unknown as SessionSummary[]);
      setLoading(false);
    }
    load();
  }, [user]);

  const stats = useMemo(() => {
    if (sessions.length === 0) return null;

    const totalExams = sessions.length;
    let totalQuestions = 0;
    let totalScore = 0;
    let bestScore = 0;
    let bestPaper = '';

    const scoreTrend = sessions.map(s => ({
      date: new Date(s.started_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      paperTitle: s.papers?.title || 'Unknown',
      score: s.score || 0,
      total: s.papers?.questions?.length || 0,
    }));

    let p1Exams = 0, p1Score = 0, p1Best = 0;
    let p2Exams = 0, p2Score = 0, p2Best = 0;

    const topicStats: Record<string, { correct: number; total: number }> = {};

    for (const s of sessions) {
      const questions = s.papers?.questions || [];
      const answers = s.answers || {};
      totalQuestions += Object.keys(answers).length;
      totalScore += s.score || 0;

      if ((s.score || 0) > bestScore) {
        bestScore = s.score || 0;
        bestPaper = s.papers?.title || '';
      }

      const pn = s.papers?.paper_number;
      if (pn === 1) {
        p1Exams++;
        p1Score += s.score || 0;
        if ((s.score || 0) > p1Best) p1Best = s.score || 0;
      } else {
        p2Exams++;
        p2Score += s.score || 0;
        if ((s.score || 0) > p2Best) p2Best = s.score || 0;
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

    return {
      totalExams,
      totalQuestions,
      avgScore: Math.round((totalScore / totalExams) * 100) / 100,
      bestScore,
      bestPaper,
      scoreTrend,
      p1: { exams: p1Exams, avgScore: p1Exams > 0 ? Math.round((p1Score / p1Exams) * 100) / 100 : 0, best: p1Best },
      p2: { exams: p2Exams, avgScore: p2Exams > 0 ? Math.round((p2Score / p2Exams) * 100) / 100 : 0, best: p2Best },
      topicBreakdown,
      weakestTopics: topicBreakdown.filter(t => t.accuracy < 70).slice(0, 5),
    };
  }, [sessions]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: '#ffffff' }}>
        <TopNav currentPage="analytics" />
        <div style={{ padding: 40, textAlign: 'center', color: '#9ca3af' }}>{t('analytics.loading')}</div>
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

  const barStyle = (pct: number) => ({
    height: '100%', borderRadius: 3,
    width: `${Math.min(pct, 100)}%`,
    background: pct >= 80 ? '#16a34a' : pct >= 50 ? '#f59e0b' : '#ef4444',
    transition: 'width 0.3s',
  });

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: '#ffffff' }}>
      <TopNav currentPage="analytics" />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 20px 60px' }}>
        <h1 style={{ margin: '0 0 4px', fontSize: 26, fontWeight: 600, color: '#111' }}>
          {t('analytics.myAnalytics')}
        </h1>
        <p style={{ margin: '0 0 28px', fontSize: 14, color: '#6b7280' }}>
          {t('analytics.subtitle')}
        </p>

        {!stats ? (
          <div style={{
            padding: 40, textAlign: 'center', color: '#9ca3af',
            background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb',
          }}>
            <p style={{ fontSize: 14, marginBottom: 8 }}>{t('analytics.noExams')}</p>
            <p style={{ fontSize: 13 }}>{t('analytics.noExamsHint')}</p>
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div style={{ display: 'flex', gap: 14, marginBottom: 20 }}>
              {[
                { key: 'analytics.totalExams', value: stats.totalExams },
                { key: 'analytics.questionsDone', value: stats.totalQuestions },
                { key: 'analytics.averageScore', value: stats.avgScore },
                { key: 'analytics.bestScore', value: `${stats.bestScore} (${stats.bestPaper.split(' ').slice(0, 3).join(' ')})` },
              ].map(s => (
                <div key={s.key} style={{
                  flex: 1, background: '#fff', borderRadius: 10, border: '1px solid #e5e7eb',
                  padding: '18px 16px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}>
                  <div style={{ fontSize: 22, fontWeight: 600, color: '#1e40af', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 4 }}>{t(s.key)}</div>
                </div>
              ))}
            </div>

            {/* Score Trend */}
            <div style={cardStyle}>
              <h2 style={sectionH2}>{t('analytics.scoreTrend')}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {stats.scoreTrend.map((t, i) => {
                  const pct = t.total > 0 ? Math.round((t.score / t.total) * 100) : 0;
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 12, color: '#9ca3af', width: 50, textAlign: 'right' }}>{t.date}</span>
                      <span style={{ fontSize: 12, fontWeight: 500, color: '#374151', width: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {t.paperTitle}
                      </span>
                      <div style={{ flex: 1, height: 8, borderRadius: 4, background: '#f3f4f6', overflow: 'hidden' }}>
                        <div style={barStyle(pct)} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#1f2937', width: 60, textAlign: 'right' }}>
                        {t.score}/{t.total} ({pct}%)
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Paper 1 vs Paper 2 */}
            <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
              {[
                { key: 'analytics.paper1', ...stats.p1 },
                { key: 'analytics.paper2', ...stats.p2 },
              ].map(p => (
                <div key={p.key} style={{ ...cardStyle, flex: 1, marginBottom: 0 }}>
                  <h2 style={sectionH2}>{t(p.key)}</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#6b7280' }}>{t('analytics.examsTaken')}</span>
                      <span style={{ fontWeight: 600, color: '#1f2937' }}>{p.exams}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#6b7280' }}>{t('analytics.averageScoreLabel')}</span>
                      <span style={{ fontWeight: 600, color: '#1f2937' }}>{p.avgScore}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#6b7280' }}>{t('analytics.bestScoreLabel')}</span>
                      <span style={{ fontWeight: 600, color: '#1f2937' }}>{p.best}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Topic Accuracy Breakdown */}
            <div style={cardStyle}>
              <h2 style={sectionH2}>{t('analytics.topicPerformance')}</h2>
              {stats.topicBreakdown.length === 0 ? (
                <p style={{ fontSize: 13, color: '#9ca3af' }}>{t('analytics.noTopicData')}</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {stats.topicBreakdown.map(t => (
                    <div key={t.topic} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 13, fontWeight: 500, color: '#1f2937', width: 130, textTransform: 'capitalize' }}>
                        {t.topic.replace(/_/g, ' ')}
                      </span>
                      <div style={{ flex: 1, height: 10, borderRadius: 5, background: '#f3f4f6', overflow: 'hidden' }}>
                        <div style={barStyle(t.accuracy)} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#1f2937', width: 50, textAlign: 'right' }}>
                        {t.accuracy}%
                      </span>
                      <span style={{ fontSize: 11, color: '#9ca3af', width: 70, textAlign: 'right' }}>
                        {t.correct}/{t.total}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Weakest Topics */}
            {stats.weakestTopics.length > 0 && (
              <div style={cardStyle}>
                <h2 style={sectionH2}>{t('analytics.areasToImprove')}</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {stats.weakestTopics.map(t => (
                    <div key={t.topic} style={{
                      padding: '10px 14px', background: '#fffbeb', borderRadius: 8,
                      border: '1px solid #fde68a', display: 'flex', alignItems: 'center', gap: 12,
                    }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#92400e', textTransform: 'capitalize', width: 130 }}>
                        {t.topic.replace(/_/g, ' ')}
                      </span>
                      <div style={{ flex: 1, height: 6, borderRadius: 3, background: '#fef3c7', overflow: 'hidden' }}>
                        <div style={{ ...barStyle(t.accuracy), height: '100%' }} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#92400e' }}>{t.accuracy}%</span>
                      <span style={{ fontSize: 11, color: '#a16207' }}>({t.correct}/{t.total})</span>
                      <span style={{ fontSize: 12, color: '#92400e' }}>
                        Try practicing more {t.topic.replace(/_/g, ' ')} questions
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
