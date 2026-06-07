import { useState, useMemo, useCallback } from 'react';
import type { TopicTag, Question, TopicMastery } from '../data/types';
import { TAG_LIST, TAG_LABEL, TAG_COLOR } from '../data/types';
import { MOCK_QUESTIONS, MOCK_MASTERY, generateMockMastery } from '../data/mockData';
import { TopicSidebar } from '../components/TopicSidebar';
import { MasteryHeader } from '../components/MasteryHeader';
import { GeneratePanel, type GenerateConfig } from '../components/GeneratePanel';
import { PaperPreview } from '../components/PaperPreview';
import { QuestionList } from '../components/QuestionList';
import { PracticeModal } from '../components/PracticeModal';
import type { GeneratedPaper } from '../data/types';

type FilterMode = 'all' | 'correct' | 'incorrect' | 'not_attempted';
type PaperFilter = 'all' | 1 | 2;

export function TopicsPage() {
  const [selectedTag, setSelectedTag] = useState<TopicTag>(TAG_LIST[0]);
  const [paperFilter, setPaperFilter] = useState<PaperFilter>('all');
  const [statusFilter, setStatusFilter] = useState<FilterMode>('all');
  const [search, setSearch] = useState('');
  const [showMastery, setShowMastery] = useState(true);
  const [mastery, setMastery] = useState<TopicMastery[]>(MOCK_MASTERY);
  const [userAnswers, setUserAnswers] = useState<Record<string, number | null>>({});
  const [generatedPaper, setGeneratedPaper] = useState<GeneratedPaper | null>(null);
  const [practiceQuestion, setPracticeQuestion] = useState<Question | null>(null);

  // Filter questions by current filters
  const filteredQuestions = useMemo(() => {
    return MOCK_QUESTIONS.filter(q => {
      if (selectedTag !== 'general' && !q.topics.includes(selectedTag)) return false;
      if (paperFilter !== 'all' && q.paperNumber !== paperFilter) return false;
      const ua = userAnswers[q.id];
      if (statusFilter === 'correct' && ua !== q.answer) return false;
      if (statusFilter === 'incorrect' && (ua === undefined || ua === null || ua === q.answer)) return false;
      if (statusFilter === 'not_attempted' && ua !== undefined && ua !== null) return false;
      if (search) {
        const label = `${q.year} P${q.paperNumber} Q${q.questionIndex + 1}`.toLowerCase();
        if (!label.includes(search.toLowerCase())) return false;
      }
      return true;
    });
  }, [selectedTag, paperFilter, statusFilter, search, userAnswers]);

  // Tag counts (by multi-topic)
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const q of MOCK_QUESTIONS) {
      for (const t of q.topics) {
        counts[t] = (counts[t] || 0) + 1;
      }
    }
    return counts;
  }, []);

  const paperCounts = useMemo(() => {
    let p1 = 0, p2 = 0;
    for (const q of MOCK_QUESTIONS) { if (q.paperNumber === 1) p1++; else p2++; }
    return { p1, p2 };
  }, []);

  const statusCounts = useMemo(() => {
    const relevant = selectedTag === 'general'
      ? MOCK_QUESTIONS
      : MOCK_QUESTIONS.filter(q => q.topics.includes(selectedTag));
    let correct = 0, incorrect = 0, notAttempted = 0;
    for (const q of relevant) {
      const ua = userAnswers[q.id];
      if (ua === undefined || ua === null) notAttempted++;
      else if (ua === q.answer) correct++;
      else incorrect++;
    }
    return { correct, incorrect, notAttempted };
  }, [selectedTag, userAnswers]);

  // Handle generate
  const handleGenerate = useCallback((questions: Question[], config: GenerateConfig) => {
    const diffCounts = { easy: 0, medium: 0, hard: 0 };
    const dist: Record<string, number> = {};
    for (const q of questions) {
      diffCounts[q.difficulty]++;
      dist[q.primary_topic] = (dist[q.primary_topic] || 0) + 1;
    }

    const paper: GeneratedPaper = {
      id: `gen-${Date.now()}`,
      title: config.mode === 'random'
        ? `Random Paper ${config.paperNumber}`
        : config.mode === 'adaptive'
        ? `Adaptive Paper ${config.paperNumber}`
        : `Diagnostic Paper ${config.paperNumber}`,
      paperNumber: config.paperNumber,
      mode: config.mode,
      distribution: dist,
      questions,
      difficultyProfile: diffCounts,
      createdAt: new Date().toISOString(),
    };
    setGeneratedPaper(paper);
  }, []);

  const handleAnswer = useCallback((questionId: string, selected: number, correct: boolean) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: selected }));
    // Simulate mastery update
    const q = MOCK_QUESTIONS.find(qq => qq.id === questionId);
    if (q) {
      setMastery(prev => prev.map(m => {
        if (!q.topics.includes(m.topic)) return m;
        const newTotal = m.totalAttempts + 1;
        const newCorrect = m.totalCorrect + (correct ? 1 : 0);
        const newConfidence = Math.min(1, newTotal / 15);
        return {
          ...m,
          totalAttempts: newTotal,
          totalCorrect: newCorrect,
          confidence: newConfidence,
          masteryLevel: Math.round((newCorrect / newTotal) * 100 * newConfidence),
        };
      }));
    }
  }, []);

  const btnStyle = (active: boolean) => ({
    padding: '6px 16px', fontSize: 12, fontWeight: active ? 600 : 400,
    color: active ? '#fff' : '#94a3b8',
    background: active ? TAG_COLOR : '#fff',
    border: `1px solid ${active ? TAG_COLOR : '#e2e8f0'}`,
    borderRadius: 20, cursor: 'pointer',
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  });

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: '#f8fafc' }}>
      {/* Page Header */}
      <div style={{
        background: '#fff', borderBottom: '1px solid #e2e8f0',
        padding: '16px 24px', position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#1e293b' }}>Topics &amp; Generate</h1>
            <p style={{ margin: '2px 0 0', fontSize: 13, color: '#94a3b8' }}>Browse questions by topic or generate practice papers</p>
          </div>
          <input
            type="text" placeholder="Search by year, paper, or number..."
            value={search} onChange={e => setSearch(e.target.value)}
            style={{
              width: 240, padding: '8px 16px', fontSize: 13,
              border: '1px solid #e2e8f0', borderRadius: 8,
              outline: 'none', background: '#f8fafc',
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            }}
          />
        </div>
      </div>

      {/* Mastery Header */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 24px 0' }}>
        <MasteryHeader mastery={mastery} onStartAdaptive={() => {}} />
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 60px', display: 'flex', gap: 24 }}>
        {/* Left Sidebar */}
        <TopicSidebar
          selectedTag={selectedTag}
          onSelectTag={tag => { setSelectedTag(tag); setPaperFilter('all'); setStatusFilter('all'); }}
          tagCounts={tagCounts}
          mastery={mastery}
          showMastery={showMastery}
          onToggleView={() => setShowMastery(v => !v)}
        />

        {/* Right Panel */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Filters */}
          <div style={{
            display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20,
            alignItems: 'center',
          }}>
            {(['all', 1, 2] as const).map(v => (
              <button key={v} onClick={() => setPaperFilter(v)} style={btnStyle(paperFilter === v)}>
                {v === 'all' ? `All (${MOCK_QUESTIONS.length})` : `Paper ${v} (${v === 1 ? paperCounts.p1 : paperCounts.p2})`}
              </button>
            ))}
            <span style={{ borderLeft: '1px solid #e2e8f0', height: 20 }} />
            {(['all', 'correct', 'incorrect', 'not_attempted'] as const).map(v => (
              <button key={v} onClick={() => setStatusFilter(v)} style={btnStyle(statusFilter === v)}>
                {v === 'all' ? 'All Status' : v === 'correct' ? `✓ ${statusCounts.correct}` : v === 'incorrect' ? `✗ ${statusCounts.incorrect}` : `— ${statusCounts.notAttempted}`}
              </button>
            ))}
          </div>

          {/* Generate Panel */}
          <GeneratePanel
            allQuestions={MOCK_QUESTIONS}
            mastery={mastery}
            onGenerate={handleGenerate}
          />

          {/* Generated Paper Preview */}
          {generatedPaper && (
            <PaperPreview
              paper={generatedPaper}
              onStart={() => alert('In production, this navigates to the Exam page with the generated paper.')}
              onRegenerate={() => {
                // Regenerate with same config
                setGeneratedPaper(null);
              }}
              onClear={() => setGeneratedPaper(null)}
            />
          )}

          {/* Question List */}
          <div style={{
            background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0',
            padding: '20px 24px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#1e293b' }}>
                {TAG_LABEL[selectedTag]}
                <span style={{ fontWeight: 400, color: '#94a3b8', marginLeft: 8, fontSize: 14 }}>
                  ({filteredQuestions.length} Qs)
                </span>
              </h2>
            </div>
            <QuestionList
              questions={filteredQuestions}
              userAnswers={userAnswers}
              onReview={q => setPracticeQuestion(q)}
            />
          </div>
        </div>
      </div>

      {/* Practice Modal (overlay) */}
      {practiceQuestion && (
        <PracticeModal
          question={practiceQuestion}
          questions={filteredQuestions}
          onClose={() => setPracticeQuestion(null)}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
}
