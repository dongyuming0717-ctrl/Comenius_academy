import { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProctor } from '../sdk/useProctor';
import { useLocale } from '../i18n/LocaleContext';
import { TopNav } from '../components/TopNav';
import { TAG_LIST, TAG_LABEL, TAG_COLOR, TAG_BG, type TopicTag } from '../data/tagColors';
import type { Paper, Question } from '../sdk/types';

interface QuestionEntry {
  year: number;
  paperNumber: 1 | 2;
  paperId: string;
  questionIndex: number;
  questionId: string;
  text: string;
  topic: TopicTag;
  question: Question;
}

const PAPER1_DISTRIBUTION: Partial<Record<TopicTag, number>> = {
  algebra: 2,
  quadratics_polynomials: 2,
  inequalities: 1,
  functions: 2,
  transformations_graphs: 1,
  exponentials_logs: 2,
  trigonometry: 2,
  differentiation: 2,
  integration: 2,
  sequences_series: 1,
  coordinate_geometry: 2,
  number_theory: 1,
};

const PAPER2_DISTRIBUTION: Partial<Record<TopicTag, number>> = {
  algebra: 1,
  quadratics_polynomials: 1,
  inequalities: 1,
  functions: 1,
  transformations_graphs: 1,
  exponentials_logs: 1,
  trigonometry: 2,
  differentiation: 2,
  integration: 2,
  sequences_series: 1,
  coordinate_geometry: 2,
  number_theory: 2,
  logic_proof: 3,
};

const PAPERS_CACHE_KEY = 'tmua_papers_cache_v2';
const GENERATED_PAPER_KEY = 'tmua_generated_paper';
const CACHE_TTL_MS = 5 * 60 * 1000;

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

export function RandomPage() {
  const { supabase, user } = useProctor();
  const { t } = useLocale();
  const navigate = useNavigate();
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const [genPaperNum, setGenPaperNum] = useState<1 | 2>(1);
  const [generatedQuestions, setGeneratedQuestions] = useState<QuestionEntry[] | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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
      } catch { /* ignore */ }
      setLoading(false);
    }
    load();
  }, [supabase]);

  const allQuestions = useMemo(() => {
    const entries: QuestionEntry[] = [];
    for (const paper of papers) {
      const qs = paper.questions as Question[];
      if (!qs || !Array.isArray(qs)) continue;
      for (let i = 0; i < qs.length; i++) {
        const q = qs[i];
        entries.push({
          year: paper.year,
          paperNumber: paper.paper_number as 1 | 2,
          paperId: paper.id,
          questionIndex: i,
          questionId: q.id || `q${i + 1}`,
          text: q.text || `${paper.title} Question ${i + 1}`,
          topic: (q.topic || 'general') as TopicTag,
          question: q,
        });
      }
    }
    return entries;
  }, [papers]);

  const generatePaper = useCallback(() => {
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
      for (const q of picked) {
        selected.push(q);
        usedIds.add(`${q.paperId}-${q.questionIndex}`);
      }
    }

    const remaining = 20 - selected.length;
    if (remaining > 0) {
      const restPool = pool.filter(q => !usedIds.has(`${q.paperId}-${q.questionIndex}`));
      const extra = shuffle(restPool).slice(0, remaining);
      for (const q of extra) {
        selected.push(q);
        usedIds.add(`${q.paperId}-${q.questionIndex}`);
      }
    }

    setGeneratedQuestions(shuffle(selected));
  }, [allQuestions, genPaperNum]);

  const startGeneratedExam = useCallback(() => {
    if (!generatedQuestions || generatedQuestions.length === 0) return;

    const paperNum = genPaperNum;
    const title = `Random Paper ${paperNum}`;

    const genPaper = {
      id: `generated_p${paperNum}`,
      title,
      paper_number: paperNum,
      year: 0,
      sitting: 'Generated',
      duration_minutes: 75,
      total_marks: 20,
      topics: [...new Set(generatedQuestions.map(q => q.topic))],
      questions: generatedQuestions.map((q, i) => ({
        ...q.question,
        id: `gq${i + 1}`,
      })),
    };

    localStorage.setItem(GENERATED_PAPER_KEY, JSON.stringify(genPaper));
    navigate('/');
  }, [generatedQuestions, genPaperNum, navigate]);

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

  const paperLabel = (n: 1 | 2) => n === 1 ? t('randomPage.paperLabel1') : t('randomPage.paperLabel2');

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: '#ffffff' }}>
      {/* Top Bar */}
      <TopNav currentPage="random" />

      {/* Main Content */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#888' }}>
            {t('randomPage.loading')}
          </div>
        ) : (
          <>
            {/* Generator Controls */}
            <div style={{
              background: '#fafafa', border: '1px solid #e0e0e0', borderRadius: 10,
              padding: '24px 28px', marginBottom: 24,
            }}>
              <h2 style={{ margin: '0 0 16px', fontSize: 18, fontWeight: 600, color: '#333' }}>
                {t('randomPage.generatorTitle')}
              </h2>
              <p style={{ margin: '0 0 20px', fontSize: 13, color: '#666', lineHeight: 1.6 }}>
                {t('randomPage.generatorDescription')}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                <button onClick={() => setGenPaperNum(1)} style={filterBtnStyle(genPaperNum === 1)}>
                  {t('randomPage.paper1Button')}
                </button>
                <button onClick={() => setGenPaperNum(2)} style={filterBtnStyle(genPaperNum === 2)}>
                  {t('randomPage.paper2Button')}
                </button>
                <button
                  onClick={generatePaper}
                  style={{
                    padding: '8px 28px', fontSize: 14, fontWeight: 600,
                    color: '#fff', background: TAG_COLOR, border: 'none',
                    borderRadius: 6, cursor: 'pointer',
                    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                  }}
                >
                  {t('randomPage.generateButton')}
                </button>
              </div>

              {/* Distribution reference */}
              <div style={{ fontSize: 11, color: '#999', lineHeight: 1.6 }}>
                <span style={{ fontWeight: 600 }}>{t(genPaperNum === 1 ? 'randomPage.paper1Button' : 'randomPage.paper2Button')} distribution: </span>
                {Object.entries(genPaperNum === 1 ? PAPER1_DISTRIBUTION : PAPER2_DISTRIBUTION)
                  .map(([tag, count]) => `${TAG_LABEL[tag as TopicTag] || tag} ×${count}`)
                  .join(', ')}
              </div>
            </div>

            {/* Generated Paper */}
            {generatedQuestions && generatedQuestions.length > 0 && (
              <div style={{
                background: '#fff', border: '1px solid #e0e0e0', borderRadius: 10,
                padding: '24px 28px',
              }}>
                <h3 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 600, color: '#333' }}>
                  Random Paper {genPaperNum}
                </h3>
                <div style={{ fontSize: 11, color: '#999', marginBottom: 16 }}>
                  {paperLabel(genPaperNum)} &middot; {t('randomPage.paperMeta')}
                </div>

                {/* Topic distribution */}
                <div style={{ fontSize: 11, color: '#888', marginBottom: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {(() => {
                    const dist: Record<string, number> = {};
                    for (const q of generatedQuestions) {
                      dist[q.topic] = (dist[q.topic] || 0) + 1;
                    }
                    return Object.entries(dist).map(([tag, count]) => (
                      <span key={tag} style={{
                        background: TAG_BG, color: TAG_COLOR,
                        padding: '2px 10px', borderRadius: 10, fontSize: 11,
                      }}>
                        {TAG_LABEL[tag as TopicTag] || tag}: {count}
                      </span>
                    ));
                  })()}
                </div>

                {/* Question list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 20 }}>
                  {generatedQuestions.map((q, idx) => (
                    <div key={idx} style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '8px 14px', borderRadius: 6,
                      background: '#fafafa', border: '1px solid #eee',
                      fontSize: 13,
                    }}>
                      <span style={{
                        width: 26, height: 26, borderRadius: '50%',
                        background: TAG_COLOR, color: '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 11, fontWeight: 600, flexShrink: 0,
                      }}>
                        {idx + 1}
                      </span>
                      <span style={{ color: '#333', fontWeight: 500 }}>
                        {q.year} P{q.paperNumber} Q{q.questionIndex + 1}
                      </span>
                      <span style={{
                        fontSize: 10, color: TAG_COLOR,
                        background: TAG_BG, padding: '1px 8px', borderRadius: 8,
                        marginLeft: 'auto',
                      }}>
                        {TAG_LABEL[q.topic]}
                      </span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                  <button
                    onClick={startGeneratedExam}
                    style={{
                      padding: '12px 48px', fontSize: 15, fontWeight: 600,
                      color: '#fff', background: '#16a34a', border: 'none',
                      borderRadius: 6, cursor: 'pointer',
                      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                    }}
                  >
                    Start Exam — {paperLabel(genPaperNum)}
                  </button>
                  <button
                    onClick={() => setShowDeleteDialog(true)}
                    style={{
                      padding: '12px 20px', fontSize: 14, fontWeight: 500,
                      color: '#dc2626', background: '#fff',
                      border: '1px solid #fca5a5', borderRadius: 6, cursor: 'pointer',
                      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                    }}
                  >
                    {t('randomPage.deleteButton')}
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Delete Confirmation Dialog */}
        {showDeleteDialog && (
          <div style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000,
          }} onClick={() => setShowDeleteDialog(false)}>
            <div style={{
              background: '#fff', borderRadius: 12, padding: '32px 36px',
              maxWidth: 420, width: '90%',
              boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
            }} onClick={e => e.stopPropagation()}>
              <h3 style={{ margin: '0 0 12px', fontSize: 18, fontWeight: 600, color: '#1f2937' }}>
                {t('randomPage.confirmDeleteTitle')}
              </h3>
              <p style={{ margin: '0 0 24px', fontSize: 14, color: '#6b7280', lineHeight: 1.6 }}>
                {t('randomPage.confirmDeleteMessage')}
              </p>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setShowDeleteDialog(false)}
                  style={{
                    padding: '10px 24px', fontSize: 14, fontWeight: 500,
                    color: '#374151', background: '#f3f4f6', border: 'none',
                    borderRadius: 6, cursor: 'pointer',
                    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                  }}
                >
                  {t('randomPage.confirmDeleteCancel')}
                </button>
                <button
                  onClick={() => {
                    setGeneratedQuestions(null);
                    setShowDeleteDialog(false);
                  }}
                  style={{
                    padding: '10px 24px', fontSize: 14, fontWeight: 600,
                    color: '#fff', background: '#dc2626', border: 'none',
                    borderRadius: 6, cursor: 'pointer',
                    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                  }}
                >
                  {t('randomPage.confirmDeleteConfirm')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
