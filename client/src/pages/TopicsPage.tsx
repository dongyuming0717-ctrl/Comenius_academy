import { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useProctor } from '../sdk/useProctor';
import { useLocale } from '../i18n/LocaleContext';
import { TopNav } from '../components/TopNav';
import { TAG_LIST, TAG_LABEL, TAG_COLOR, TAG_BG, type TopicTag } from '../data/tagColors';
import type { Paper, Question } from '../sdk/types';

type PaperFilter = 'all' | 1 | 2;
type StatusFilter = 'all' | 'correct' | 'incorrect' | 'not_attempted';

interface QuestionEntry {
  year: number;
  paperNumber: 1 | 2;
  paperId: string;
  questionIndex: number;
  questionId: string;
  text: string;
  topic: TopicTag;
  correctAnswer: number;
  userAnswer: number | null;
  status: 'correct' | 'incorrect' | 'not_attempted';
  question: Question; // full question object
}

const PAPERS_CACHE_KEY = 'tmua_papers_cache_v2';
const CACHE_TTL_MS = 5 * 60 * 1000;
const PDF_BOOKLET = '/tmua-booklet.pdf';

// PDF page where each paper starts (1-indexed PDF page number)
const PAPER_START_PAGES: Record<string, number> = {
  '2016-1': 3, '2016-2': 19,
  '2017-1': 39, '2017-2': 63,
  '2018-1': 87, '2018-2': 111,
  '2019-1': 135, '2019-2': 159,
  '2020-1': 183, '2020-2': 207,
  '2021-1': 231, '2021-2': 255,
  '2022-1': 279, '2022-2': 303,
  '2023-1': 327, '2023-2': 351,
};

function getPdfPage(year: number, paperNumber: 1 | 2, questionIndex: number): number {
  const key = `${year}-${paperNumber}`;
  const start = PAPER_START_PAGES[key] || 3;
  return start + 2 + questionIndex; // skip cover + blank/instructions page
}

function openPdfReview(year: number, paperNumber: 1 | 2, questionIndex: number) {
  const page = getPdfPage(year, paperNumber, questionIndex);
  window.open(`${PDF_BOOKLET}#page=${page}`, '_blank');
}

function loadCachedPapers(): Paper[] | null {
  try {
    const raw = localStorage.getItem(PAPERS_CACHE_KEY);
    if (!raw) return null;
    const { papers, ts } = JSON.parse(raw);
    if (Date.now() - ts < CACHE_TTL_MS) return papers;
  } catch { /* ignore */ }
  return null;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function TopicsPage() {
  const { supabase, user } = useProctor();
  const { t } = useLocale();
  const navigate = useNavigate();
  const location = useLocation();
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<TopicTag>(TAG_LIST[0]);
  const [paperFilter, setPaperFilter] = useState<PaperFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [search, setSearch] = useState('');
  const [userAnswers, setUserAnswers] = useState<Record<string, Record<string, number>>>({});
  const [appliedPaperId, setAppliedPaperId] = useState(false);

  // Fetch papers and user answers
  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const cached = loadCachedPapers();
        if (cached) setPapers(cached);

        const { data: paperData, error: paperErr } = await supabase
          .from('papers')
          .select('*')
          .order('year', { ascending: false })
          .order('paper_number');

        if (!paperErr && paperData) {
          setPapers(paperData as Paper[]);
          try {
            localStorage.setItem(PAPERS_CACHE_KEY, JSON.stringify({ papers: paperData, ts: Date.now() }));
          } catch { /* ignore */ }
        }

        if (user) {
          const { data: profileData } = await supabase
            .from('users')
            .select('id')
            .eq('email', user.email)
            .single();

          if (profileData) {
            const { data: sessions } = await supabase
              .from('exam_sessions')
              .select('paper_id, answers')
              .eq('user_id', profileData.id)
              .eq('status', 'completed');

            if (sessions) {
              const ans: Record<string, Record<string, number>> = {};
              for (const s of sessions) {
                ans[s.paper_id] = s.answers || {};
              }
              setUserAnswers(ans);
            }
          }
        }
      } catch { /* ignore */ }
      setLoading(false);
    }
    load();
  }, [supabase, user]);

  // Apply paperId from navigation state (e.g. from "View Latest Record" on ExamPage)
  useEffect(() => {
    const paperId = (location.state as any)?.paperId as string | undefined;
    if (paperId && !appliedPaperId && papers.length > 0) {
      const paper = papers.find(p => p.id === paperId);
      if (paper) {
        setPaperFilter(paper.paper_number as PaperFilter);
      }
      setAppliedPaperId(true);
    }
  }, [papers, location.state, appliedPaperId]);

  // Build flat question list with status
  const allQuestions = useMemo(() => {
    const entries: QuestionEntry[] = [];
    for (const paper of papers) {
      const qs = paper.questions as Question[];
      if (!qs || !Array.isArray(qs)) continue;
      const paperAnswers = userAnswers[paper.id] || {};
      for (let i = 0; i < qs.length; i++) {
        const q = qs[i];
        const qid = q.id || `q${i + 1}`;
        const topic = (q.topic || 'general') as TopicTag;
        const userAnswer = paperAnswers[qid] !== undefined ? paperAnswers[qid] : null;
        let status: QuestionEntry['status'] = 'not_attempted';
        if (userAnswer !== null) {
          status = userAnswer === q.answer ? 'correct' : 'incorrect';
        }
        entries.push({
          year: paper.year,
          paperNumber: paper.paper_number as 1 | 2,
          paperId: paper.id,
          questionIndex: i,
          questionId: qid,
          text: q.text || `${paper.title} Question ${i + 1}`,
          topic,
          correctAnswer: q.answer,
          userAnswer,
          status,
          question: q,
        });
      }
    }
    return entries;
  }, [papers, userAnswers]);

  // Filter questions by selected tag, paper, status, search
  const filteredQuestions = useMemo(() => {
    return allQuestions.filter(q => {
      if (q.topic !== selectedTag) return false;
      if (paperFilter !== 'all' && q.paperNumber !== paperFilter) return false;
      if (statusFilter !== 'all' && q.status !== statusFilter) return false;
      if (search) {
        const s = search.toLowerCase();
        const label = `${q.year} paper ${q.paperNumber} q${q.questionIndex + 1} ${q.text}`.toLowerCase();
        if (!label.includes(s)) return false;
      }
      return true;
    });
  }, [allQuestions, selectedTag, paperFilter, statusFilter, search]);

  // Tag counts
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const q of allQuestions) {
      counts[q.topic] = (counts[q.topic] || 0) + 1;
    }
    return counts;
  }, [allQuestions]);

  // Paper 1/2 counts
  const paperCounts = useMemo(() => {
    let p1 = 0, p2 = 0;
    for (const q of allQuestions) {
      if (q.paperNumber === 1) p1++;
      else p2++;
    }
    return { p1, p2 };
  }, [allQuestions]);

  // Status counts for current selection
  const statusCounts = useMemo(() => {
    const relevant = selectedTag
      ? allQuestions.filter(q => {
          if (q.topic !== selectedTag) return false;
          if (paperFilter !== 'all' && q.paperNumber !== paperFilter) return false;
          return true;
        })
      : allQuestions;
    let correct = 0, incorrect = 0, notAttempted = 0;
    for (const q of relevant) {
      if (q.status === 'correct') correct++;
      else if (q.status === 'incorrect') incorrect++;
      else notAttempted++;
    }
    return { correct, incorrect, notAttempted };
  }, [allQuestions, selectedTag, paperFilter]);

  const handleQuestionClick = (_entry: QuestionEntry) => {
    // navigate to home — user picks the paper from there
    navigate('/');
  };

  const filterBtnStyle = (active: boolean) => ({
    padding: '4px 14px',
    fontSize: 12,
    fontWeight: active ? 600 : 400,
    color: active ? '#fff' : '#555',
    background: active ? TAG_COLOR : '#f0f0f0',
    border: 'none',
    borderRadius: 14,
    cursor: 'pointer' as const,
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  });

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: '#ffffff' }}>
      {/* Top Bar */}
      <TopNav currentPage="topics" />

      {/* Search Bar */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 20px 0' }}>
        <input
          type="text"
          placeholder={t('topicsPage.searchPlaceholder')}
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%', padding: '8px 16px', fontSize: 13, border: '1px solid #ddd',
            borderRadius: 6, outline: 'none', fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Filters */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '12px 20px 0', display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: '#888', fontWeight: 600 }}>{t('topicsPage.paperFilterLabel')}</span>
        <button onClick={() => setPaperFilter('all')} style={filterBtnStyle(paperFilter === 'all')}>
          {t('topicsPage.statusAll')} ({allQuestions.length})
        </button>
        <button onClick={() => setPaperFilter(1)} style={filterBtnStyle(paperFilter === 1)}>
          Paper 1 ({paperCounts.p1})
        </button>
        <button onClick={() => setPaperFilter(2)} style={filterBtnStyle(paperFilter === 2)}>
          Paper 2 ({paperCounts.p2})
        </button>

        <span style={{ width: 16 }} />

        <span style={{ fontSize: 12, color: '#888', fontWeight: 600 }}>{t('topicsPage.statusFilterLabel')}</span>
        <button onClick={() => setStatusFilter('all')} style={filterBtnStyle(statusFilter === 'all')}>
          {t('topicsPage.statusAll')}
        </button>
        <button onClick={() => setStatusFilter('correct')} style={filterBtnStyle(statusFilter === 'correct')}>
          {t('topicsPage.statusCorrect').replace('{count}', String(statusCounts.correct))}
        </button>
        <button onClick={() => setStatusFilter('incorrect')} style={filterBtnStyle(statusFilter === 'incorrect')}>
          {t('topicsPage.statusIncorrect').replace('{count}', String(statusCounts.incorrect))}
        </button>
        <button onClick={() => setStatusFilter('not_attempted')} style={filterBtnStyle(statusFilter === 'not_attempted')}>
          {t('topicsPage.statusNotAttempted').replace('{count}', String(statusCounts.notAttempted))}
        </button>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '16px 20px 60px', display: 'flex', gap: 24 }}>
        {/* Left Sidebar - Tags */}
        <div style={{ width: 220, flexShrink: 0 }}>
          <div style={{
            fontSize: 13, fontWeight: 600, color: '#333', marginBottom: 8,
            padding: '0 12px',
          }}>
            {t('topicsPage.sidebarTitle')}
          </div>
          {TAG_LIST.map(tag => {
            const count = tagCounts[tag] || 0;
            const isActive = selectedTag === tag;
            return (
              <div
                key={tag}
                onClick={() => { setSelectedTag(tag); setPaperFilter('all'); setStatusFilter('all'); }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '8px 12px', marginBottom: 2, borderRadius: 6,
                  cursor: 'pointer',
                  background: isActive ? TAG_BG : 'transparent',
                  borderLeft: isActive ? `3px solid ${TAG_COLOR}` : '3px solid transparent',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? TAG_COLOR : '#444',
                  fontSize: 13,
                  transition: 'background 0.15s',
                }}
              >
                <span>{TAG_LABEL[tag]}</span>
                <span style={{
                  fontSize: 11, color: isActive ? TAG_COLOR : '#999',
                  background: isActive ? '#dbeafe' : '#f3f3f3',
                  padding: '1px 8px', borderRadius: 10,
                  fontWeight: 500,
                }}>
                  {count}
                </span>
              </div>
            );
          })}
        </div>

        {/* Right Panel */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* ── Question List ── */}
          <div style={{
            fontSize: 14, fontWeight: 600, color: '#333', marginBottom: 12,
          }}>
            {TAG_LABEL[selectedTag]}
            <span style={{ fontWeight: 400, color: '#888', marginLeft: 8, fontSize: 13 }}>
              ({filteredQuestions.length} questions)
            </span>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: 60, color: '#888' }}>
              <div style={{
                width: 32, height: 32, margin: '0 auto 12px',
                border: '3px solid #e0e0e0', borderTopColor: TAG_COLOR,
                borderRadius: '50%', animation: 'spin 0.8s linear infinite',
              }} />
              {t('topicsPage.loading')}
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          ) : filteredQuestions.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 40, color: '#888', fontSize: 13 }}>
              {t('topicsPage.noResults')}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {filteredQuestions.map((q) => {
                const statusColors: Record<string, { color: string; bg: string }> = {
                  correct: { color: '#16a34a', bg: '#f0fdf4' },
                  incorrect: { color: '#dc2626', bg: '#fef2f2' },
                  not_attempted: { color: '#888', bg: '#fafafa' },
                };
                const sc = statusColors[q.status];
                const statusLabel = q.status === 'correct' ? t('topicsPage.statusLabelCorrect') : q.status === 'incorrect' ? t('topicsPage.statusLabelIncorrect') : t('topicsPage.statusLabelNotAttempted');

                return (
                  <div
                    key={`${q.paperId}-${q.questionIndex}`}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '10px 16px', borderRadius: 6,
                      background: '#fafafa', border: '1px solid #eee',
                      fontSize: 13,
                    }}
                  >
                    <span
                      onClick={() => handleQuestionClick(q)}
                      style={{
                        fontSize: 11, fontWeight: 600, color: sc.color,
                        background: sc.bg, padding: '2px 10px', borderRadius: 10,
                        minWidth: 80, textAlign: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      {statusLabel}
                    </span>
                    <span
                      onClick={() => handleQuestionClick(q)}
                      style={{ color: '#333', fontWeight: 500, cursor: 'pointer' }}
                    >
                      {q.year} Paper {q.paperNumber}
                    </span>
                    <span
                      onClick={() => handleQuestionClick(q)}
                      style={{ color: '#888', cursor: 'pointer' }}
                    >
                      Question {q.questionIndex + 1}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openPdfReview(q.year, q.paperNumber, q.questionIndex);
                      }}
                      style={{
                        marginLeft: 'auto',
                        padding: '3px 12px',
                        fontSize: 11,
                        fontWeight: 500,
                        color: TAG_COLOR,
                        background: '#fff',
                        border: `1px solid ${TAG_COLOR}`,
                        borderRadius: 4,
                        cursor: 'pointer',
                        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                      }}
                    >
                      {t('topicsPage.reviewButton')}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
