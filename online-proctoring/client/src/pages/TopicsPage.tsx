import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useProctor } from '../sdk/useProctor';
import { useLocale } from '../i18n/LocaleContext';
import { TopNav } from '../components/TopNav';
import { TAG_LIST, TAG_LABEL, TAG_COLOR, TAG_BG, type TopicTag } from '../data/tagColors';
import type { Paper, Question } from '../sdk/types';
import { MathText } from '../components/MathText';
import { PracticeModal } from '../components/PracticeModal';

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

const PAPERS_CACHE_KEY = 'tmua_papers_cache_v3';
const CACHE_TTL_MS = 5 * 60 * 1000;
const GENERATED_PAPER_KEY = 'tmua_generated_paper';

const PAPER1_DISTRIBUTION: Partial<Record<TopicTag, number>> = {
  algebra: 2, quadratics_polynomials: 2, inequalities: 1,
  functions: 2, transformations_graphs: 1, exponentials_logs: 2,
  trigonometry: 2, differentiation: 2, integration: 2,
  sequences_series: 1, coordinate_geometry: 2, number_theory: 1,
};
const PAPER2_DISTRIBUTION: Partial<Record<TopicTag, number>> = {
  algebra: 1, quadratics_polynomials: 1, inequalities: 1,
  functions: 1, transformations_graphs: 1, exponentials_logs: 1,
  trigonometry: 2, differentiation: 2, integration: 2,
  sequences_series: 1, coordinate_geometry: 2, number_theory: 2, logic_proof: 3,
};

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
  const [reviewEntry, setReviewEntry] = useState<QuestionEntry | null>(null);
  const [genMsg, setGenMsg] = useState('');
  const [genPaperNum, setGenPaperNum] = useState<1 | 2>(1);
  const [generatedQuestions, setGeneratedQuestions] = useState<QuestionEntry[] | null>(null);

  // Fetch papers and user answers
  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const cached = loadCachedPapers();
        if (cached) setPapers(cached.filter(p => p.subject !== 'economics'));

        const { data: paperData, error: paperErr } = await supabase
          .from('papers')
          .select('*')
          .order('year', { ascending: false })
          .order('paper_number');

        if (!paperErr && paperData) {
          const tmuaOnly = (paperData as Paper[]).filter(p => p.subject !== 'economics');
          setPapers(tmuaOnly);
          try {
            localStorage.setItem(PAPERS_CACHE_KEY, JSON.stringify({ papers: tmuaOnly, ts: Date.now() }));
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

  const generateRandomPaper = () => {
    const distribution = genPaperNum === 1 ? PAPER1_DISTRIBUTION : PAPER2_DISTRIBUTION;
    const pool = allQuestions.filter(q => q.paperNumber === genPaperNum);
    const byTopic: Record<string, QuestionEntry[]> = {};
    for (const q of pool) {
      if (!byTopic[q.topic]) byTopic[q.topic] = [];
      byTopic[q.topic].push(q);
    }
    const selected: QuestionEntry[] = [];
    const usedIds = new Set<string>();
    for (const [tag, count] of Object.entries(distribution)) {
      const candidates = byTopic[tag] || [];
      const available = candidates.filter(q => !usedIds.has(`${q.paperId}-${q.questionIndex}`));
      const picked = shuffle(available).slice(0, count);
      for (const q of picked) { selected.push(q); usedIds.add(`${q.paperId}-${q.questionIndex}`); }
    }
    const remaining = 20 - selected.length;
    if (remaining > 0) {
      const restPool = pool.filter(q => !usedIds.has(`${q.paperId}-${q.questionIndex}`));
      for (const q of shuffle(restPool).slice(0, remaining)) { selected.push(q); }
    }
    setGeneratedQuestions(shuffle(selected));
  };

  const startGeneratedExam = () => {
    if (!generatedQuestions || generatedQuestions.length === 0) return;
    const genPaper = {
      id: `generated_p${genPaperNum}`,
      title: `Random Paper ${genPaperNum}`,
      paper_number: genPaperNum,
      year: 0, sitting: 'Generated', duration_minutes: 75, total_marks: generatedQuestions.length,
      topics: [...new Set(generatedQuestions.map(q => q.topic))],
      created_at: new Date().toISOString(),
      questions: generatedQuestions.map((q, i) => ({ ...q.question, id: `gq${i + 1}` })),
    };
    localStorage.setItem(GENERATED_PAPER_KEY, JSON.stringify(genPaper));
    navigate('/');
  };

  const pageBg = '#f8fafc';
  const cardBg = '#ffffff';
  const borderColor = '#e2e8f0';
  const textMain = '#1e293b';
  const textMuted = '#94a3b8';
  const accent = TAG_COLOR;
  const accentBg = TAG_BG;

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: pageBg }}>
      <TopNav currentPage="topics-generate" />

      {/* Practice Modal — overlay, no page shift */}
      {reviewEntry && (
        <PracticeModal
          entry={reviewEntry}
          allEntries={filteredQuestions}
          onClose={() => setReviewEntry(null)}
        />
      )}

      {/* ── Page Header ── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: textMain }}>Topics &amp; Generate</h1>
            <p style={{ margin: '4px 0 0', fontSize: 14, color: textMuted }}>Browse TMUA questions by topic or generate practice papers</p>
          </div>
          {/* Search */}
          <input
            type="text"
            placeholder={t('topicsPage.searchPlaceholder')}
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: 240, padding: '10px 16px', fontSize: 13,
              border: `1px solid ${borderColor}`, borderRadius: 8,
              outline: 'none', background: cardBg,
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            }}
          />
        </div>

        {/* ── Filters Pills ── */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
          {(['all', 1, 2] as const).map(v => (
            <button key={v} onClick={() => setPaperFilter(v)}
              style={{
                padding: '6px 16px', fontSize: 12, fontWeight: paperFilter === v ? 600 : 400,
                color: paperFilter === v ? '#fff' : textMuted,
                background: paperFilter === v ? accent : cardBg,
                border: `1px solid ${paperFilter === v ? accent : borderColor}`,
                borderRadius: 20, cursor: 'pointer',
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              }}>
              {v === 'all' ? `All (${allQuestions.length})` : `Paper ${v} (${v === 1 ? paperCounts.p1 : paperCounts.p2})`}
            </button>
          ))}
          <span style={{ width: 8, borderLeft: `1px solid ${borderColor}` }} />
          {(['all', 'correct', 'incorrect', 'not_attempted'] as const).map(v => (
            <button key={v} onClick={() => setStatusFilter(v)}
              style={{
                padding: '6px 16px', fontSize: 12, fontWeight: statusFilter === v ? 600 : 400,
                color: statusFilter === v ? '#fff' : textMuted,
                background: statusFilter === v ? accent : cardBg,
                border: `1px solid ${statusFilter === v ? accent : borderColor}`,
                borderRadius: 20, cursor: 'pointer',
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              }}>
              {v === 'all' ? t('topicsPage.statusAll') : v === 'correct' ? `✓ ${statusCounts.correct}` : v === 'incorrect' ? `✗ ${statusCounts.incorrect}` : `— ${statusCounts.notAttempted}`}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main Content ── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px 60px', display: 'flex', gap: 24 }}>
        {/* Left Sidebar */}
        <div style={{ width: 220, flexShrink: 0 }}>
          <div style={{
            background: cardBg, borderRadius: 12, border: `1px solid ${borderColor}`,
            padding: '8px 0', overflow: 'hidden',
          }}>
            <div style={{ padding: '10px 16px', fontSize: 11, fontWeight: 600, color: textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {t('topicsPage.sidebarTitle')}
            </div>
            {TAG_LIST.map(tag => {
              const count = tagCounts[tag] || 0;
              const isActive = selectedTag === tag;
              return (
                <div key={tag} onClick={() => { setSelectedTag(tag); setPaperFilter('all'); setStatusFilter('all'); }}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '9px 16px', cursor: 'pointer',
                    background: isActive ? accentBg : 'transparent',
                    color: isActive ? accent : textMain,
                    fontWeight: isActive ? 600 : 400,
                    fontSize: 13,
                    borderRight: isActive ? `3px solid ${accent}` : '3px solid transparent',
                    transition: 'all 0.15s',
                  }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: isActive ? accent : '#d4d4d8',
                      flexShrink: 0,
                    }} />
                    {TAG_LABEL[tag]}
                  </span>
                  <span style={{
                    fontSize: 11, color: isActive ? accent : textMuted,
                    background: isActive ? '#dbeafe' : '#f3f4f6',
                    padding: '1px 8px', borderRadius: 10, fontWeight: 500,
                  }}>{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Panel */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* ── Random Generator Card ── */}
          <div style={{
            background: cardBg, borderRadius: 12, border: `1px solid ${borderColor}`,
            padding: '20px 24px', marginBottom: 24,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: textMain }}>Random Paper Generator</h3>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: textMuted }}>Balanced 20-question paper matching real TMUA distribution</p>
              </div>
              <button onClick={generateRandomPaper}
                style={{
                  padding: '10px 24px', fontSize: 14, fontWeight: 600,
                  color: '#fff', background: accent, border: 'none',
                  borderRadius: 8, cursor: 'pointer',
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                }}>
                Generate
              </button>
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <button onClick={() => setGenPaperNum(1)}
                style={{
                  padding: '6px 20px', fontSize: 12, fontWeight: genPaperNum === 1 ? 600 : 400,
                  color: genPaperNum === 1 ? '#fff' : textMuted,
                  background: genPaperNum === 1 ? accent : '#f1f5f9',
                  border: 'none', borderRadius: 20, cursor: 'pointer',
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                }}>Paper 1</button>
              <button onClick={() => setGenPaperNum(2)}
                style={{
                  padding: '6px 20px', fontSize: 12, fontWeight: genPaperNum === 2 ? 600 : 400,
                  color: genPaperNum === 2 ? '#fff' : textMuted,
                  background: genPaperNum === 2 ? accent : '#f1f5f9',
                  border: 'none', borderRadius: 20, cursor: 'pointer',
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                }}>Paper 2</button>
            </div>
            <div style={{ fontSize: 11, color: textMuted, lineHeight: 1.6 }}>
              {Object.entries(genPaperNum === 1 ? PAPER1_DISTRIBUTION : PAPER2_DISTRIBUTION)
                .map(([tag, count]) => `${TAG_LABEL[tag as TopicTag] || tag} ×${count}`).join(' · ')}
            </div>

            {generatedQuestions && generatedQuestions.length > 0 && (
              <div style={{
                marginTop: 16, padding: '12px 16px',
                background: '#f8fafc', borderRadius: 8, border: `1px solid ${borderColor}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {(() => {
                      const dist: Record<string, number> = {};
                      for (const q of generatedQuestions) dist[q.topic] = (dist[q.topic] || 0) + 1;
                      return Object.entries(dist).map(([tag, count]) => (
                        <span key={tag} style={{
                          background: accentBg, color: accent,
                          padding: '2px 8px', borderRadius: 8, fontSize: 11,
                        }}>{TAG_LABEL[tag as TopicTag] || tag}: {count}</span>
                      ));
                    })()}
                  </div>
                  <button onClick={startGeneratedExam}
                    style={{
                      padding: '8px 20px', fontSize: 13, fontWeight: 600,
                      color: '#fff', background: '#1e40af', border: 'none',
                      borderRadius: 6, cursor: 'pointer',
                      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                    }}>Start Exam</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {generatedQuestions.map((q, idx) => (
                    <div key={idx} style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '4px 8px', borderRadius: 4, fontSize: 12, color: textMuted,
                    }}>
                      <span style={{ fontWeight: 600, color: textMain, minWidth: 28 }}>Q{idx + 1}</span>
                      <span>{q.year} P{q.paperNumber} · Q{q.questionIndex + 1}</span>
                      <span style={{ marginLeft: 'auto', fontSize: 11, color: accent }}>{TAG_LABEL[q.topic] || q.topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Topic Question Section ── */}
          <div style={{
            background: cardBg, borderRadius: 12, border: `1px solid ${borderColor}`,
            padding: '20px 24px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: textMain }}>
                {TAG_LABEL[selectedTag]}
                <span style={{ fontWeight: 400, color: textMuted, marginLeft: 8, fontSize: 14 }}>({filteredQuestions.length} Qs)</span>
              </h2>
              <button
                disabled={filteredQuestions.length < 5}
                onClick={() => {
                  const pool = filteredQuestions.length > 20 ? shuffle(filteredQuestions).slice(0, 20) : filteredQuestions;
                  const genPaper = {
                    id: `generated_${selectedTag}`,
                    title: `${TAG_LABEL[selectedTag]} Practice Paper`,
                    paper_number: 1 as const, year: 0, sitting: 'Generated',
                    duration_minutes: 75, total_marks: pool.length, topics: [selectedTag],
                    created_at: new Date().toISOString(),
                    questions: pool.map((q, i) => ({ ...q.question, id: `gt${i + 1}` })),
                  };
                  localStorage.setItem(GENERATED_PAPER_KEY, JSON.stringify(genPaper));
                  setGenMsg(`${TAG_LABEL[selectedTag]} paper (${pool.length} Q) generated!`);
                  setTimeout(() => setGenMsg(''), 4000);
                }}
                style={{
                  padding: '8px 18px', fontSize: 12, fontWeight: 600,
                  color: filteredQuestions.length < 5 ? '#cbd5e1' : '#fff',
                  background: filteredQuestions.length < 5 ? '#f1f5f9' : accent,
                  border: 'none', borderRadius: 8, cursor: filteredQuestions.length < 5 ? 'default' : 'pointer',
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                }}>Generate Paper</button>
            </div>

            {genMsg && (
              <div style={{ marginBottom: 12, padding: '10px 16px', borderRadius: 8,
                background: '#dcfce7', color: '#16a34a', fontSize: 13, fontWeight: 500 }}>
                ✓ {genMsg}
              </div>
            )}

            {loading ? (
              <div style={{ textAlign: 'center', padding: 60, color: textMuted }}>
                <div style={{ width: 32, height: 32, margin: '0 auto 12px',
                  border: '3px solid #e0e0e0', borderTopColor: accent,
                  borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                {t('topicsPage.loading')}
                <style>{'@keyframes spin{to{transform:rotate(360deg)}}'}</style>
              </div>
            ) : filteredQuestions.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 40, color: textMuted, fontSize: 13 }}>{t('topicsPage.noResults')}</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {filteredQuestions.map(q => {
                  const sc = q.status === 'correct' ? { color: '#16a34a', bg: '#f0fdf4' }
                    : q.status === 'incorrect' ? { color: '#dc2626', bg: '#fef2f2' }
                    : { color: '#94a3b8', bg: '#f8fafc' };
                  const statusLabel = q.status === 'correct' ? '✓' : q.status === 'incorrect' ? '✗' : '—';

                  return (
                    <div key={`${q.paperId}-${q.questionIndex}`}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        padding: '10px 16px', borderRadius: 8,
                        background: '#f8fafc', border: `1px solid ${borderColor}`,
                        fontSize: 13,
                      }}>
                      <span style={{
                        width: 28, height: 28, borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 12, fontWeight: 700,
                        background: sc.bg, color: sc.color,
                        flexShrink: 0,
                      }}>{statusLabel}</span>
                      <span style={{ color: textMain, fontWeight: 500 }}>{q.year} Paper {q.paperNumber}</span>
                      <span style={{ color: textMuted }}>Q{q.questionIndex + 1}</span>
                      <span style={{
                        marginLeft: 'auto', fontSize: 11,
                        background: accentBg, color: accent,
                        padding: '2px 10px', borderRadius: 10, fontWeight: 500,
                      }}>{TAG_LABEL[q.topic] || q.topic}</span>
                      <button onClick={(e) => { e.stopPropagation(); setReviewEntry(q); }}
                        style={{
                          padding: '4px 14px', fontSize: 11, fontWeight: 500,
                          color: accent, background: '#fff',
                          border: `1px solid ${accent}`, borderRadius: 6, cursor: 'pointer',
                          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                        }}>{t('topicsPage.reviewButton')}</button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
