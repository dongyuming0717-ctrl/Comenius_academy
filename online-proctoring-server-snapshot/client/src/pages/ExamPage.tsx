import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useProctor } from '../sdk/useProctor';
import { TabSwitchDetector } from '../sdk/TabSwitchDetector';
import { WebcamCapture } from '../sdk/WebcamCapture';
import { ViolationLog } from './ViolationLog';
import { PreExamCheck } from './PreExamCheck';
import { MathText } from '../components/MathText';
import { TopNav } from '../components/TopNav';
import { generateExamReport } from '../utils/generateReport';
import { rawToScale, scaleScoreLabel } from '../data/tmuaConversion';
import type { Paper, Question } from '../sdk/types';

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

function saveCachedPapers(papers: Paper[]) {
  try {
    localStorage.setItem(PAPERS_CACHE_KEY, JSON.stringify({ papers, ts: Date.now() }));
  } catch { /* ignore */ }
}

function loadGeneratedPaper(): Paper | null {
  try {
    const raw = localStorage.getItem(GENERATED_PAPER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Paper;
  } catch { return null; }
}

function mergeGeneratedPaper(dbPapers: Paper[]): Paper[] {
  const gen = loadGeneratedPaper();
  if (!gen) return dbPapers;
  const filtered = dbPapers.filter(p => !p.id.startsWith('generated_'));
  return [gen, ...filtered];
}

function removeGeneratedPaper() {
  localStorage.removeItem(GENERATED_PAPER_KEY);
}

export function ExamPage() {
  const { supabase, user, status, sessionId, startSession, endSession, resetSession } = useProctor();
  const navigate = useNavigate();

  const [papers, setPapers] = useState<Paper[]>(() => loadCachedPapers() || []);
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [examStarted, setExamStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [userProfileId, setUserProfileId] = useState<string | null>(null);
  const [fetchState, setFetchState] = useState<'loading' | 'done' | 'error'>('loading');
  const [showPreCheck, setShowPreCheck] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [scoreDetails, setScoreDetails] = useState<{ qid: string; text: string; topic: string; correct: number; yours: number | null }[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const questionTimesRef = useRef<Record<string, number>>({});
  const activeQStartRef = useRef<number>(0);
  const isTabHiddenRef = useRef<boolean>(false);
  const examModeRef = useRef<'timed' | 'practice'>('timed');
  const finishExamRef = useRef<() => void>();
  const [finalQuestionTimes, setFinalQuestionTimes] = useState<Record<string, number>>({});
  const [reviewQuestionIndex, setReviewQuestionIndex] = useState<number | null>(null);
  const [showEndTestDialog, setShowEndTestDialog] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set());
  const [showExamConfirm, setShowExamConfirm] = useState(false);
  const [resultsView, setResultsView] = useState<'table' | 'score'>('table');
  const [userStats, setUserStats] = useState<{ mocksTaken: number; questionsDone: number; avgAccuracy: number; avgScore: number } | null>(null);
  const [paperStats, setPaperStats] = useState<Record<string, { completionRate: number; accuracy: number; score: number | null; hasRecord: boolean }>>({});
  const [showNavigator, setShowNavigator] = useState(false);
  const [examMode, setExamMode] = useState<'timed' | 'practice' | null>(null);
  const [showModeDialog, setShowModeDialog] = useState(false);
  const [isOvertime, setIsOvertime] = useState(false);
  const [practiceElapsed, setPracticeElapsed] = useState(0);

  const toggleFlag = useCallback((qId: string) => {
    setFlaggedQuestions(prev => {
      const next = new Set(prev);
      if (next.has(qId)) next.delete(qId);
      else next.add(qId);
      return next;
    });
  }, []);

  // Accept paperId from navigation state (e.g. from ClassModePage)
  const location = useLocation();
  const incomingPaperId = (location.state as any)?.paperId as string | undefined;
  useEffect(() => {
    if (!incomingPaperId || papers.length === 0) return;
    const paper = papers.find(p => p.id === incomingPaperId);
    if (paper) {
      setSelectedPaper(paper);
      setExamMode('timed');
      setShowPreCheck(true);
      // Clear the state so it doesn't re-trigger on re-renders
      window.history.replaceState({}, '');
    }
  }, [incomingPaperId, papers]);

  // Fetch papers from Supabase (with cache + timeout)
  useEffect(() => {
    const cached = loadCachedPapers();
    if (cached) {
      setPapers(mergeGeneratedPaper(cached));
      setFetchState('done');
    }

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 5000);

    async function load() {
      try {
        const { data, error } = await supabase
          .from('papers')
          .select('*')
          .order('year', { ascending: false })
          .order('paper_number')
          .abortSignal(ctrl.signal);

        if (!error && data) {
          const merged = mergeGeneratedPaper(data as Paper[]);
          setPapers(merged);
          saveCachedPapers(data as Paper[]);
          setFetchState('done');
        } else if (!cached) {
          setFetchState('error');
        }
      } catch {
        if (!cached) setFetchState('error');
      }
      clearTimeout(timer);
    }

    if (!cached) load();
    return () => { clearTimeout(timer); ctrl.abort(); };
  }, [supabase]);

  const retryFetch = useCallback(async () => {
    setFetchState('loading');
    try {
      const { data, error } = await supabase.from('papers').select('*')
        .order('year', { ascending: false })
        .order('paper_number');
      if (!error && data) {
        setPapers(mergeGeneratedPaper(data as Paper[]));
        saveCachedPapers(data as Paper[]);
        setFetchState('done');
      } else {
        setFetchState('error');
      }
    } catch {
      setFetchState('error');
    }
  }, [supabase]);

  // Fetch app-level user profile ID when auth user changes
  useEffect(() => {
    if (!user) { setUserProfileId(null); return; }
    supabase.from('users').select('id').eq('auth_id', user.id).single()
      .then(async ({ data, error }) => {
        if (error) { console.error('Failed to fetch user profile:', error); }
        if (data) { setUserProfileId(data.id); return; }
        // Try to auto-create user record (trigger may not have fired)
        const { data: created, error: insertErr } = await supabase
          .from('users')
          .insert({ auth_id: user.id, email: user.email, full_name: user.email || user.email, role: 'student' })
          .select('id').single();
        if (insertErr) { console.error('Failed to create user profile:', insertErr); }
        // Fallback: use auth user ID so exam can still start
        setUserProfileId(created?.id || user.id);
      });
  }, [user, supabase]);

  // Fetch user exam stats
  useEffect(() => {
    if (!userProfileId) return;
    async function fetchStats() {
      const { data: sessions } = await supabase
        .from('exam_sessions')
        .select('id, paper_id, answers, score, question_times')
        .eq('user_id', userProfileId)
        .eq('status', 'completed');

      if (!sessions || sessions.length === 0) return;

      let totalQuestionsDone = 0;
      for (const s of sessions) {
        totalQuestionsDone += Object.keys(s.answers || {}).length;
      }

      setUserStats({
        mocksTaken: sessions.length,
        questionsDone: totalQuestionsDone,
        avgAccuracy: 0,
        avgScore: 0,
      });

      // Store raw session stats for later processing with papers
      (window as any).__rawSessionStats = sessions;
    }
    fetchStats();
  }, [userProfileId, supabase]);

  // Compute per-paper stats when papers and sessions are both loaded
  useEffect(() => {
    const rawSessions = (window as any).__rawSessionStats;
    if (!rawSessions || papers.length === 0) return;

    const pStats: Record<string, { completionRate: number; accuracy: number; score: number | null; hasRecord: boolean }> = {};
    let totalCorrectAll = 0;
    let totalAnsweredAll = 0;
    let totalScoreAll = 0;
    let sessionsWithScore = 0;

    for (const paper of papers) {
      const paperQs = (paper.questions as Question[]) || [];
      const qCount = paperQs.length;
      const paperSessions = rawSessions.filter((s: any) => s.paper_id === paper.id);

      if (paperSessions.length === 0) {
        pStats[paper.id] = { completionRate: 0, accuracy: 0, score: null, hasRecord: false };
        continue;
      }

      let bestAccuracy = 0;
      let bestScore: number | null = null;
      let bestScoreVal = -1;

      for (const s of paperSessions) {
        const answers = s.answers || {};
        let correct = 0;
        for (const q of paperQs) {
          const ans = answers[q.id];
          if (ans !== undefined && ans !== null && ans === q.answer) correct++;
        }
        const answered = Object.keys(answers).length;
        const acc = answered > 0 ? correct / answered : 0;
        if (acc > bestAccuracy) bestAccuracy = acc;

        totalCorrectAll += correct;
        totalAnsweredAll += answered;

        if (s.score !== null && s.score !== undefined) {
          totalScoreAll += s.score;
          sessionsWithScore++;
          if (s.score > bestScoreVal) {
            bestScoreVal = s.score;
            bestScore = s.score;
          }
        }
      }

      pStats[paper.id] = {
        completionRate: qCount > 0 ? Math.round((bestAccuracy * answeredCheck(paperSessions, paperQs)) / qCount * 100) : 0,
        accuracy: Math.round(bestAccuracy * 100),
        score: bestScore,
        hasRecord: true,
      };
    }

    // Recompute per-paper stats with proper completion rate
    for (const paper of papers) {
      const paperQs = (paper.questions as Question[]) || [];
      const qCount = paperQs.length;
      const paperSessions = rawSessions.filter((s: any) => s.paper_id === paper.id);
      if (paperSessions.length === 0) continue;

      // Find session with most answers
      let maxAnswered = 0;
      for (const s of paperSessions) {
        const answered = Object.keys(s.answers || {}).length;
        if (answered > maxAnswered) maxAnswered = answered;
        // Also track for completion rate
      }

      const latestSession = paperSessions[paperSessions.length - 1];
      const answered = Object.keys(latestSession.answers || {}).length;
      pStats[paper.id].completionRate = qCount > 0 ? Math.round((answered / qCount) * 100) : 0;
    }

    // Compute overall stats
    const avgAcc = totalAnsweredAll > 0 ? Math.round((totalCorrectAll / totalAnsweredAll) * 100) : 0;
    const avgScore = sessionsWithScore > 0 ? Math.round(totalScoreAll / sessionsWithScore) : 0;

    setUserStats(prev => prev ? {
      ...prev,
      avgAccuracy: avgAcc,
      avgScore,
    } : null);

    setPaperStats(pStats);
    delete (window as any).__rawSessionStats;
  }, [papers]);

  function answeredCheck(sessions: any[], questions: Question[]): number {
    if (sessions.length === 0) return 0;
    const last = sessions[sessions.length - 1];
    return Math.min(Object.keys(last.answers || {}).length, questions.length);
  }

  // Start exam — immediately activate everything, Supabase is async in background
  const beginExam = useCallback(() => {
    if (!selectedPaper || !userProfileId) {
      if (!userProfileId) alert('Unable to load your user profile. Please try refreshing the page.');
      return;
    }

    const qs = selectedPaper.questions as Question[];
    setQuestions(qs);
    setAnswers({});
    setCurrentQ(0);
    setSelected(null);
    setExamStarted(true);
    setTimeLeft(selectedPaper.duration_minutes * 60);
    setPracticeElapsed(0);
    setIsOvertime(false);
    examModeRef.current = examMode || 'timed';

    questionTimesRef.current = {};
    activeQStartRef.current = Date.now();
    isTabHiddenRef.current = false;

    startSession(selectedPaper.id, userProfileId);
  }, [selectedPaper, userProfileId, startSession, examMode]);

  const accumulateCurrentQTime = useCallback(() => {
    if (!examStarted || isTabHiddenRef.current) return;
    const qId = questions[currentQ]?.id;
    if (!qId) return;
    const now = Date.now();
    const elapsed = now - activeQStartRef.current;
    questionTimesRef.current[qId] = (questionTimesRef.current[qId] || 0) + elapsed;
    activeQStartRef.current = now;
  }, [examStarted, questions, currentQ]);

  // Timer — runs independently, driven by examStarted + timeLeft
  useEffect(() => {
    if (!examStarted || timeLeft <= 0) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          if (examModeRef.current === 'practice') setIsOvertime(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [examStarted]);

  // Pause per-question timing when tab is hidden
  useEffect(() => {
    if (!examStarted) return;

    const handleVisibility = () => {
      if (document.hidden) {
        accumulateCurrentQTime();
        isTabHiddenRef.current = true;
      } else {
        isTabHiddenRef.current = false;
        activeQStartRef.current = Date.now();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [examStarted, accumulateCurrentQTime]);

  // Auto-save to Supabase every 30s
  useEffect(() => {
    if (!examStarted || !sessionId) return;

    const id = setInterval(() => {
      supabase
        .from('exam_sessions')
        .update({ answers })
        .eq('id', sessionId)
        .then(() => {});
    }, 30000);

    return () => clearInterval(id);
  }, [examStarted, sessionId, answers, supabase]);

  // Time's up → submit (timed mode only)
  useEffect(() => {
    if (examStarted && timeLeft <= 0 && examModeRef.current === 'timed') {
      finishExam();
    }
  }, [timeLeft]);

  // Practice mode overtime counter
  useEffect(() => {
    if (!isOvertime) return;

    const id = setInterval(() => {
      setPracticeElapsed((prev) => {
        const next = prev + 1;
        if (next >= 2700) finishExamRef.current?.();
        return next;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [isOvertime]);

  const selectAnswer = useCallback(
    (questionId: string, optionIndex: number) => {
      setSelected(optionIndex);
      setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    },
    [],
  );

  const finishExam = useCallback(() => {
    if (!selectedPaper) return;

    accumulateCurrentQTime();
    const qTimes = { ...questionTimesRef.current };

    const qs = selectedPaper.questions as Question[];
    let score = 0;
    const details = qs.map((q) => {
      const isCorrect = answers[q.id] === q.answer;
      if (isCorrect) score++;
      return { qid: q.id, text: q.text, topic: q.topic || 'general', correct: q.answer, yours: answers[q.id] ?? null };
    });

    setFinalScore(score);
    setFinalTotal(qs.length);
    setScoreDetails(details);
    setFinalQuestionTimes(qTimes);
    setResultsView('table');

    if (sessionId) {
      supabase
        .from('exam_sessions')
        .update({ answers, score, question_times: qTimes, status: 'completed', ended_at: new Date().toISOString() })
        .eq('id', sessionId)
        .then(() => {});
    }

    endSession();
    if (timerRef.current) clearInterval(timerRef.current);

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  }, [selectedPaper, sessionId, answers, supabase, endSession, accumulateCurrentQTime]);
  finishExamRef.current = finishExam;

  // ---- Auth Gate: require login before anything ----
  if (!user) {
    return <Navigate to="/login" />;
  }

  // ---- Pre-Exam Check Screen ----
  if (showPreCheck && !examStarted) {
    return (
      <PreExamCheck
        onComplete={() => {
          setShowPreCheck(false);
          setShowExamConfirm(true);
        }}
        onBack={() => setShowPreCheck(false)}
      />
    );
  }

  // ---- Exam Confirmation Page (after PreExamCheck) ----
  if (showExamConfirm && !examStarted && selectedPaper) {
    const qCount = (selectedPaper.questions as Question[]).length;
    return (
      <div style={{
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        minHeight: '100vh', background: '#ffffff',
      }}>
        {/* Blue Top Bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 32px', height: 48,
          background: '#1e40af',
        }}>
          <span style={{
            fontSize: 18, fontWeight: 400, color: '#ffffff',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            letterSpacing: '0.3px',
          }}>
            {selectedPaper?.title?.includes('TMUA') ? 'Test of Mathematics for University Admission' : 'Comenius'}
          </span>
        </div>

        {/* Content */}
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 20px' }}>
          <h1 style={{
            fontSize: 22, fontWeight: 400, color: '#333',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            textAlign: 'center', marginBottom: 32,
          }}>
            Examination Confirmation
          </h1>

          <div style={{
            background: '#fafafa', borderRadius: 8,
            border: '1px solid #e0e0e0', padding: '28px 32px',
            marginBottom: 28,
          }}>
            <div style={{ marginBottom: 20 }}>
              <h3 style={{
                margin: '0 0 4px 0', fontSize: 16, fontWeight: 600, color: '#333',
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              }}>
                {selectedPaper.title}
              </h3>
              <p style={{ margin: 0, fontSize: 13, color: '#888' }}>
                {selectedPaper.year} — Paper {selectedPaper.paper_number}
              </p>
            </div>

            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: '12px 24px', marginBottom: 20,
            }}>
              <div>
                <span style={{ fontSize: 12, color: '#888' }}>Duration</span>
                <p style={{ margin: '2px 0 0', fontSize: 14, fontWeight: 600, color: '#333' }}>
                  {selectedPaper.duration_minutes} minutes
                </p>
              </div>
              <div>
                <span style={{ fontSize: 12, color: '#888' }}>Total Questions</span>
                <p style={{ margin: '2px 0 0', fontSize: 14, fontWeight: 600, color: '#333' }}>
                  {qCount}
                </p>
              </div>
              <div>
                <span style={{ fontSize: 12, color: '#888' }}>Total Marks</span>
                <p style={{ margin: '2px 0 0', fontSize: 14, fontWeight: 600, color: '#333' }}>
                  {selectedPaper.total_marks}
                </p>
              </div>
              <div>
                <span style={{ fontSize: 12, color: '#888' }}>Topics</span>
                <p style={{ margin: '2px 0 0', fontSize: 14, fontWeight: 600, color: '#333' }}>
                  {selectedPaper.topics?.join(', ') || 'Mathematics'}
                </p>
              </div>
            </div>

            <div style={{
              background: '#fff', borderRadius: 6, border: '1px solid #e0e0e0',
              padding: '16px 20px',
            }}>
              <h4 style={{
                margin: '0 0 10px 0', fontSize: 13, fontWeight: 600, color: '#333',
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              }}>
                Important Information
              </h4>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: '#555', lineHeight: 1.8 }}>
                <li>Once you begin, the timer will start immediately</li>
                <li>You must remain in fullscreen mode for the entire duration</li>
                <li>Your webcam and microphone must remain active</li>
                <li>Do not switch tabs, windows, or applications</li>
                <li>You may flag questions to review later</li>
                <li>Submit your exam when you have answered all questions</li>
              </ul>
            </div>
          </div>

          <div style={{ textAlign: 'center', display: 'flex', gap: 16, justifyContent: 'center' }}>
            <button
              onClick={() => setShowExamConfirm(false)}
              style={{
                padding: '12px 40px', fontSize: 15, fontWeight: 400,
                background: '#fff', color: '#333',
                border: '1px solid #ccc', borderRadius: 4, cursor: 'pointer',
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              }}
            >
              Back
            </button>
            <button
              onClick={() => {
                setShowExamConfirm(false);
                beginExam();
              }}
              style={{
                padding: '12px 40px', fontSize: 15, fontWeight: 400,
                background: '#1e40af', color: '#fff',
                border: 'none', borderRadius: 4, cursor: 'pointer',
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              }}
            >
              Confirm & Start Exam
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---- Paper Selection Screen ----
  if (!examStarted) {
    const realPapers = papers.filter(p => !p.id.startsWith('generated_'));
    const generatedPapers = papers.filter(p => p.id.startsWith('generated_'));

    const statCards = [
      { label: 'Mocks Taken', value: userStats ? userStats.mocksTaken : 0 },
      { label: 'Questions Done', value: userStats ? userStats.questionsDone : 0 },
      { label: 'Average Accuracy', value: userStats ? `${userStats.avgAccuracy}%` : '0%' },
      { label: 'Average Score', value: userStats ? `${userStats.avgScore}/20` : '0/20' },
    ];

    const tagStyle = (color: string, bg: string) => ({
      fontSize: 10, fontWeight: 600, color, background: bg,
      padding: '2px 10px', borderRadius: 10,
    } as const);

    return (
      <div style={{ minHeight: '100vh', fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: '#ffffff' }}>
        {/* Blue Top Bar */}
        <TopNav currentPage="home" />

        {/* Main Content */}
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 20px 60px' }}>
          {/* Back link */}
          <div style={{ marginBottom: 16 }}>
            <span
              onClick={() => navigate('/')}
              style={{
                fontSize: 13, color: '#1e40af', cursor: 'pointer',
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              }}
            >
              &larr; Back to Admission Tests
            </span>
          </div>

          {/* Title */}
          <h1 style={{
            margin: '0 0 4px 0', fontSize: 30, fontWeight: 700, color: '#111',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          }}>
            TMUA
          </h1>
          <p style={{
            margin: '0 0 28px 0', fontSize: 16, color: '#666',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          }}>
            Test of Mathematics for University Admission
          </p>

          {/* Stats Cards */}
          {userStats && (
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 16, marginBottom: 32,
            }}>
              {statCards.map((stat) => (
                <div key={stat.label} style={{
                  background: '#fafafa', borderRadius: 10,
                  border: '1px solid #e0e0e0', padding: '16px 20px',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>{stat.label}</div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: '#1e40af' }}>{stat.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Demo Video */}
          <div style={{
            background: '#fafafa', borderRadius: 12,
            border: '1px solid #e0e0e0', padding: '24px 28px',
            marginBottom: 32,
          }}>
            <h2 style={{
              margin: '0 0 6px 0', fontSize: 18, fontWeight: 600, color: '#333',
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            }}>
              Exam Simulator Demo
            </h2>
            <p style={{
              margin: '0 0 16px 0', fontSize: 13, color: '#888',
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            }}>
              Experience our premium mock examination platform in action
            </p>
            <video
              src="/exam-simulator-demo.mp4"
              controls
              style={{
                width: '100%', borderRadius: 8,
                background: '#000',
              }}
            />
          </div>

          {/* Loading / Error states */}
          {fetchState === 'error' ? (
            <div style={{
              textAlign: 'center', padding: 40, borderRadius: 8,
              background: '#fef2f2', border: '1px solid #fecaca',
            }}>
              <p style={{ color: '#dc2626', marginBottom: 8 }}>Failed to load papers</p>
              <button onClick={retryFetch} style={{
                padding: '8px 24px', background: '#dc2626', color: '#fff',
                border: 'none', borderRadius: 4, cursor: 'pointer',
                fontSize: 13, fontWeight: 600,
              }}>Retry</button>
            </div>
          ) : fetchState === 'loading' && papers.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 80, color: '#888' }}>
              <div style={{
                width: 48, height: 48, margin: '0 auto 16px',
                border: '3px solid #e0e0e0', borderTopColor: '#1e40af',
                borderRadius: '50%', animation: 'spin 0.8s linear infinite',
              }} />
              <p style={{ fontSize: 14 }}>Loading papers...</p>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          ) : (
            <>
              {/* Generated Papers */}
              {generatedPapers.length > 0 && (
                <div style={{ marginBottom: 32 }}>
                  <h2 style={{
                    margin: '0 0 16px 0', fontSize: 20, fontWeight: 600, color: '#333',
                    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                  }}>
                    Generated Papers
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    {generatedPapers.map((paper) => {
                      const isSelected = selectedPaper?.id === paper.id;
                      const qCount = (paper.questions as Question[]).length;
                      const stats = paperStats[paper.id];
                      return (
                        <div key={paper.id} style={{
                          background: '#fff', borderRadius: 10,
                          border: isSelected ? '2px solid #306ca0' : '1px solid #e0e0e0',
                          padding: '20px 24px',
                        }}>
                          <div style={{ marginBottom: 12 }}>
                            <span style={tagStyle('#1e40af', '#eff6ff')}>GENERATED</span>
                          </div>
                          <h3 style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 600, color: '#333' }}>
                            {paper.title}
                          </h3>
                          <div style={{ fontSize: 12, color: '#888', marginBottom: 12 }}>
                            {paper.duration_minutes} min &middot; {qCount} questions
                          </div>
                          {stats && (
                            <div style={{ display: 'flex', gap: 20, marginBottom: 16, fontSize: 12, color: '#555' }}>
                              <span><span style={{ color: '#888' }}>Accuracy: </span><strong>{stats.accuracy}%</strong></span>
                              <span><span style={{ color: '#888' }}>Completion: </span><strong>{stats.completionRate}%</strong></span>
                              {stats.score !== null && <span><span style={{ color: '#888' }}>Score: </span><strong>{stats.score}/{qCount}</strong></span>}
                            </div>
                          )}
                          <div style={{ display: 'flex', gap: 10 }}>
                            <button
                              onClick={() => { setSelectedPaper(paper); setExamMode('timed'); setShowPreCheck(true); }}
                              style={{
                                flex: 1, padding: '10px 16px', fontSize: 13, fontWeight: 600,
                                color: '#fff', background: '#1e40af', border: 'none',
                                borderRadius: 6, cursor: 'pointer',
                                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                              }}
                            >
                              Start Mock Exam
                            </button>
                            <button
                              onClick={() => {
                                removeGeneratedPaper();
                                if (isSelected) setSelectedPaper(null);
                                setPapers(prev => prev.filter(p => p.id !== paper.id));
                              }}
                              style={{
                                padding: '10px 16px', fontSize: 13, fontWeight: 500,
                                color: '#dc2626', background: '#fff',
                                border: '1px solid #dc2626', borderRadius: 6, cursor: 'pointer',
                                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Available Mock Examinations */}
              <h2 style={{
                margin: '0 0 16px 0', fontSize: 20, fontWeight: 600, color: '#333',
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              }}>
                Available Mock Examinations
              </h2>

              {realPapers.length === 0 ? (
                <div style={{
                  textAlign: 'center', padding: 60, borderRadius: 8,
                  background: '#fafafa', border: '1px solid #e0e0e0',
                }}>
                  <p style={{ color: '#888', fontSize: 14 }}>No papers available yet.</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  {realPapers.map((paper) => {
                    const isSelected = selectedPaper?.id === paper.id;
                    const qCount = (paper.questions as Question[]).length;
                    const stats = paperStats[paper.id];
                    const hasRecord = stats?.hasRecord || false;

                    return (
                      <div key={paper.id} style={{
                        background: '#fff', borderRadius: 10,
                        border: isSelected ? '2px solid #306ca0' : '1px solid #e0e0e0',
                        padding: '20px 24px',
                        transition: 'border-color 0.2s, box-shadow 0.2s',
                        boxShadow: isSelected ? '0 4px 16px rgba(48,108,160,0.12)' : 'none',
                      }}>
                        {/* Tags */}
                        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                          <span style={tagStyle('#1e40af', '#eff6ff')}>Past Papers</span>
                          <span style={paper.paper_number === 1
                            ? tagStyle('#16a34a', '#f0fdf4')
                            : tagStyle('#d97706', '#fef3c7')
                          }>
                            Paper {paper.paper_number}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 style={{
                          margin: '0 0 4px', fontSize: 17, fontWeight: 600, color: '#1f2937',
                          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                        }}>
                          {paper.title}
                        </h3>

                        {/* Meta */}
                        <div style={{
                          fontSize: 12, color: '#888', marginBottom: 14,
                          display: 'flex', gap: 16, flexWrap: 'wrap',
                        }}>
                          <span>{paper.sitting || paper.year}</span>
                          <span>{paper.duration_minutes} min</span>
                          <span>{qCount} Qs</span>
                        </div>

                        {/* Stats */}
                        {stats && (
                          <div style={{
                            display: 'flex', gap: 20, marginBottom: 16,
                            fontSize: 12, color: '#555',
                          }}>
                            <div>
                              <span style={{ color: '#888' }}>Accuracy: </span>
                              <strong>{stats.accuracy}%</strong>
                            </div>
                            <div>
                              <span style={{ color: '#888' }}>Completion Rate: </span>
                              <strong>{stats.completionRate}%</strong>
                            </div>
                            {stats.score !== null && (
                              <div>
                                <span style={{ color: '#888' }}>Score: </span>
                                <strong>{stats.score}/{qCount}</strong>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Buttons */}
                        <div style={{ display: 'flex', gap: 10 }}>
                          <button
                            onClick={() => { setSelectedPaper(paper); setExamMode('timed'); setShowPreCheck(true); }}
                            style={{
                              flex: 1, padding: '10px 16px', fontSize: 13, fontWeight: 600,
                              color: '#fff', background: '#1e40af', border: 'none',
                              borderRadius: 6, cursor: 'pointer',
                              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                            }}
                          >
                            Start Mock Exam
                          </button>
                          <button
                            onClick={() => { if (hasRecord) navigate('/topics', { state: { paperId: paper.id } }); }}
                            disabled={!hasRecord}
                            style={{
                              flex: 1, padding: '10px 16px', fontSize: 13, fontWeight: 500,
                              color: hasRecord ? '#1e40af' : '#ccc',
                              background: '#fff',
                              border: `1px solid ${hasRecord ? '#1e40af' : '#e0e0e0'}`,
                              borderRadius: 6, cursor: hasRecord ? 'pointer' : 'default',
                              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                            }}
                          >
                            View Latest Record
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  // ---- Exam Ended Screen ----
  if (status === 'ended') {
    // Review mode: show a specific question read-only
    if (reviewQuestionIndex !== null && selectedPaper) {
      const qs = selectedPaper.questions as Question[];
      const rq = qs[reviewQuestionIndex];
      const userAns = answers[rq?.id] ?? null;
      const isCorrect = userAns === rq?.answer;
      const letter = userAns !== null ? String.fromCharCode(65 + userAns) : null;
      const correctLetter = String.fromCharCode(65 + rq?.answer);

      return (
        <div style={{
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          userSelect: 'none', width: '100vw', height: '100vh',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          background: '#ffffff',
        }}>
          {/* Blue Top Bar */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 32px', height: 48, flexShrink: 0,
            background: '#1e40af',
          }}>
            <span style={{
              fontSize: 18, fontWeight: 400, color: '#ffffff',
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              letterSpacing: '0.3px',
            }}>
              {selectedPaper?.title?.includes('TMUA') ? 'Test of Mathematics for University Admission' : 'Comenius'}
            </span>
            <span style={{
              fontSize: 18, fontWeight: 400, color: '#ffffff',
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            }}>
              Review Mode
            </span>
          </div>

          {/* Review content */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px', background: '#f5f5f5' }}>
            <div style={{
              maxWidth: 800, margin: '0 auto', background: '#fff',
              borderRadius: 8, border: '1px solid #e0e0e0',
              overflow: 'hidden',
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 20px', background: '#fafafa',
                borderBottom: '1px solid #e0e0e0',
              }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: '#333', fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
                  Question {reviewQuestionIndex + 1}
                </span>
                <span style={{
                  fontSize: 13, fontWeight: 600,
                  color: isCorrect ? '#16a34a' : '#dc2626',
                  padding: '3px 12px', borderRadius: 4,
                  background: isCorrect ? '#dcfce7' : '#fef2f2',
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                }}>
                  {isCorrect ? 'Correct' : 'Incorrect'}
                </span>
              </div>

              <div style={{ padding: '24px 28px' }}>
                  <p style={{
                    fontSize: 17, fontWeight: 500, margin: '0 0 20px 0',
                    lineHeight: 1.75, color: '#1e293b',
                  }}>
                    <MathText text={rq.text} />
                  </p>
                  {rq.image_url && (
                    <img
                      src={rq.image_url}
                      alt={`Figure for question ${reviewQuestionIndex + 1}`}
                      style={{ width: '100%', maxWidth: 400, display: 'block', margin: '0 auto 20px' }}
                    />
                  )}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {rq.options.map((opt: string, i: number) => {
                      const isUserSel = userAns === i;
                      const isCorrectAns = rq.answer === i;
                      let bg = '#fff';
                      let border = '2px solid #e5e7eb';
                      let dotBorder = '#e2e8f0';
                      let dotBg = 'transparent';
                      let textColor = '#374151';
                      if (isCorrectAns) { bg = '#dcfce7'; border = '2px solid #16a34a'; dotBorder = '#16a34a'; dotBg = '#16a34a'; textColor = '#16a34a'; }
                      if (isUserSel && !isCorrectAns) { bg = '#fef2f2'; border = '2px solid #dc2626'; dotBorder = '#dc2626'; dotBg = '#dc2626'; textColor = '#dc2626'; }
                      return (
                        <div key={i} style={{
                          display: 'flex', alignItems: 'center', gap: 14,
                          padding: '14px 18px', background: bg,
                          border, borderRadius: 8,
                        }}>
                          <span style={{
                            width: 18, height: 18, borderRadius: '50%',
                            border: `2px solid ${dotBorder}`,
                            background: dotBg,
                            flexShrink: 0,
                          }} />
                          <span style={{ flex: 1, fontSize: 15, color: textColor, lineHeight: 1.5 }}>
                            <MathText text={opt} />
                          </span>
                          {isCorrectAns && <span style={{ fontSize: 12, color: '#16a34a', fontWeight: 600 }}>Correct Answer</span>}
                          {isUserSel && !isCorrectAns && <span style={{ fontSize: 12, color: '#dc2626', fontWeight: 600 }}>Your Answer</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
            </div>

            {/* Your answer + correct answer summary */}
            <div style={{
              maxWidth: 800, margin: '16px auto 0', display: 'flex', gap: 16,
              justifyContent: 'center', fontSize: 14, color: '#555',
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            }}>
              <span>Your answer: <strong style={{ color: isCorrect ? '#16a34a' : '#dc2626' }}>{letter ?? 'Not answered'}</strong></span>
              <span>Correct answer: <strong style={{ color: '#16a34a' }}>{correctLetter}</strong></span>
            </div>
          </div>

          {/* Bottom nav */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '10px 24px', flexShrink: 0,
            background: '#fff', borderTop: '1px solid #e0e0e0',
          }}>
            <button
              onClick={() => setReviewQuestionIndex(null)}
              style={{
                padding: '8px 28px', borderRadius: 4,
                border: '1px solid #ccc', background: '#fff',
                cursor: 'pointer', fontSize: 15, fontWeight: 400,
                color: '#333', fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              }}
            >
              Back to Results
            </button>
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                disabled={reviewQuestionIndex === 0}
                onClick={() => setReviewQuestionIndex((i) => (i ?? 0) - 1)}
                style={{
                  padding: '8px 28px', borderRadius: 4,
                  border: '1px solid #ccc', background: '#fff',
                  cursor: reviewQuestionIndex === 0 ? 'default' : 'pointer',
                  opacity: reviewQuestionIndex === 0 ? 0.4 : 1,
                  fontSize: 15, fontWeight: 400, color: '#333',
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                }}
              >
                Previous
              </button>
              <button
                disabled={reviewQuestionIndex === qs.length - 1}
                onClick={() => setReviewQuestionIndex((i) => (i ?? 0) + 1)}
                style={{
                  padding: '8px 28px', borderRadius: 4,
                  background: '#1e40af', border: 'none',
                  cursor: reviewQuestionIndex === qs.length - 1 ? 'default' : 'pointer',
                  opacity: reviewQuestionIndex === qs.length - 1 ? 0.6 : 1,
                  fontSize: 15, fontWeight: 400, color: '#fff',
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Results Table (截屏4): Page | Title | Status | Flag | Review
    if (resultsView === 'table') {
      const qs = (selectedPaper?.questions as Question[]) || [];
      const answeredCount = qs.filter((q) => answers[q.id] !== undefined).length;
      const unseenCount = qs.length - answeredCount;

      return (
        <div style={{
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          userSelect: 'none', width: '100vw', height: '100vh',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          background: '#ffffff',
        }}>
          {/* Blue Top Bar */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 24px', height: 48, flexShrink: 0,
            background: '#1e40af',
          }}>
            <span style={{
              fontSize: 18, fontWeight: 400, color: '#ffffff',
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              letterSpacing: '0.3px',
            }}>
              {selectedPaper?.title?.includes('TMUA') ? 'Test of Mathematics for University Admission' : 'Comenius'}
            </span>
            <span style={{
              fontSize: 15, fontWeight: 400, color: '#ffffff',
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            }}>
              Results
            </span>
          </div>

          {/* Content */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px', background: '#f5f5f5' }}>
            <div style={{ maxWidth: 960, margin: '0 auto' }}>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginBottom: 20,
              }}>
                <h2 style={{
                  margin: 0, fontSize: 20, fontWeight: 400, color: '#333',
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                }}>
                  Question Status
                </h2>
                <div style={{ display: 'flex', gap: 16, fontSize: 13, color: '#666', fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#16a34a' }} />
                    Completed ({answeredCount})
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#d97706' }} />
                    Unseen ({unseenCount})
                  </span>
                </div>
              </div>

              {/* Table */}
              <div style={{
                background: '#fff', borderRadius: 8,
                border: '1px solid #e0e0e0', overflow: 'hidden',
              }}>
                {/* Header row */}
                <div style={{
                  display: 'flex', alignItems: 'center',
                  padding: '10px 20px', background: '#fafafa',
                  borderBottom: '2px solid #e0e0e0',
                  fontSize: 13, fontWeight: 600, color: '#555',
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                }}>
                  <span style={{ width: 60 }}>Page</span>
                  <span style={{ flex: 1 }}>Title</span>
                  <span style={{ width: 100, textAlign: 'center' }}>Status</span>
                  <span style={{ width: 60, textAlign: 'center' }}>Flag</span>
                  <span style={{ width: 90, textAlign: 'right' }}>Review</span>
                </div>

                {qs.map((q, i) => {
                  const isAnswered = answers[q.id] !== undefined;
                  const isFlagged = flaggedQuestions.has(q.id);
                  return (
                    <div key={q.id} style={{
                      display: 'flex', alignItems: 'center',
                      padding: '10px 20px',
                      borderBottom: i < qs.length - 1 ? '1px solid #f0f0f0' : 'none',
                      fontSize: 14, fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                    }}>
                      <span style={{ width: 60, fontWeight: 600, color: '#333' }}>
                        {i + 1}
                      </span>
                      <span style={{
                        flex: 1, color: '#555', overflow: 'hidden',
                        textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}>
                        Paper {selectedPaper?.paper_number || '?'} - Question {i + 1}
                      </span>
                      <span style={{
                        width: 100, textAlign: 'center', fontWeight: 600,
                        color: isAnswered ? '#16a34a' : '#d97706',
                      }}>
                        {isAnswered ? 'Completed' : 'Unseen'}
                      </span>
                      <span style={{ width: 60, textAlign: 'center' }}>
                        {isFlagged && (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="#d97706" stroke="#d97706" strokeWidth="2">
                            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
                            <line x1="4" y1="22" x2="4" y2="15"/>
                          </svg>
                        )}
                      </span>
                      <span style={{ width: 90, textAlign: 'right' }}>
                        <button
                          onClick={() => setReviewQuestionIndex(i)}
                          style={{
                            padding: '5px 16px', borderRadius: 4,
                            background: '#1e40af', border: 'none',
                            cursor: 'pointer', fontSize: 12, fontWeight: 400,
                            color: '#fff', fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                          }}
                        >
                          Review
                        </button>
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Submit button */}
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
                <button
                  onClick={() => setResultsView('score')}
                  style={{
                    padding: '10px 40px', borderRadius: 4,
                    background: '#1e40af', border: 'none',
                    cursor: 'pointer', fontSize: 15, fontWeight: 400,
                    color: '#fff', fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Final Score Page
    {
      const pct = finalTotal > 0 ? Math.round((finalScore / finalTotal) * 100) : 0;
      const tmuaScale = rawToScale(selectedPaper!.year, selectedPaper!.paper_number, finalScore);
      const gradeLabel = tmuaScale
        ? scaleScoreLabel(tmuaScale)
        : (pct >= 80 ? 'Excellent' : pct >= 50 ? 'Good Effort' : 'Keep Practicing');

      return (
        <div style={{
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          userSelect: 'none', width: '100vw', height: '100vh',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          background: '#ffffff',
        }}>
          {/* Blue Top Bar */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 24px', height: 48, flexShrink: 0,
            background: '#1e40af',
          }}>
            <span style={{
              fontSize: 18, fontWeight: 400, color: '#ffffff',
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              letterSpacing: '0.3px',
            }}>
              {selectedPaper?.title?.includes('TMUA') ? 'Test of Mathematics for University Admission' : 'Comenius'}
            </span>
            <span style={{
              fontSize: 15, fontWeight: 400, color: '#ffffff',
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            }}>
              Results
            </span>
          </div>

          <div style={{
            flex: 1, overflowY: 'auto', display: 'flex',
            justifyContent: 'flex-start',
            padding: '32px 20px 40px 20px', background: '#f5f5f5',
          }}>
            <div style={{ width: '100%', maxWidth: 800 }}>
              {/* Score Circle */}
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <div style={{
                  width: 140, height: 140, borderRadius: '50%', margin: '0 auto 16px',
                  background: '#1e40af',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{
                    width: 114, height: 114, borderRadius: '50%',
                    background: '#fff',
                    border: '2px solid #e0e0e0',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ fontSize: 32, fontWeight: 700, color: '#1e40af', lineHeight: 1 }}>{pct}%</span>
                    <span style={{ fontSize: 11, color: '#888', fontWeight: 500, marginTop: 2 }}>
                      {finalScore}/{finalTotal} correct
                    </span>
                  </div>
                </div>

                <h1 style={{ margin: 0, fontSize: 22, fontWeight: 400, color: '#333', fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
                  Exam Submitted
                </h1>
                <span style={{
                  display: 'inline-block', marginTop: 6, padding: '3px 12px',
                  borderRadius: 20, fontSize: 11, fontWeight: 600,
                  background: '#e8f0f8', color: '#1e40af',
                }}>
                  {gradeLabel}
                </span>
                <div style={{ marginTop: 12 }}>
                  <span style={{
                    fontSize: 14, color: '#888',
                    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                  }}>
                    TMUA Scale Score:{' '}
                  </span>
                  <span style={{
                    fontSize: 24, fontWeight: 700, color: '#1e40af',
                    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                  }}>
                    {tmuaScale !== undefined ? tmuaScale.toFixed(1) : '--'}
                  </span>
                </div>
                {sessionId && (
                  <p style={{ color: '#aaa', fontSize: 11, marginTop: 8 }}>
                    Session: {sessionId.slice(0, 8)}...
                  </p>
                )}
              </div>

              {/* Question Breakdown */}
              <div style={{
                background: '#fff', borderRadius: 8,
                border: '1px solid #e0e0e0',
                overflow: 'hidden', marginBottom: 16,
              }}>
                <div style={{
                  padding: '12px 20px', fontSize: 13, fontWeight: 600, color: '#555',
                  background: '#fafafa', borderBottom: '1px solid #e0e0e0',
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                }}>
                  Question Breakdown
                </div>
                {scoreDetails.map((d, i) => (
                  <div key={d.qid} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 20px',
                    borderBottom: i < scoreDetails.length - 1 ? '1px solid #f0f0f0' : 'none',
                    cursor: 'pointer',
                  }}
                    onClick={() => setReviewQuestionIndex(i)}
                  >
                    <span style={{
                      width: 24, height: 24, borderRadius: '50%', display: 'flex',
                      alignItems: 'center', justifyContent: 'center', fontSize: 11,
                      fontWeight: 700, flexShrink: 0,
                      background: d.yours === d.correct ? '#dcfce7' : '#fef2f2',
                      color: d.yours === d.correct ? '#16a34a' : '#dc2626',
                    }}>
                      {d.yours === d.correct ? '✓' : '✗'}
                    </span>
                    <span style={{
                      flex: 1, fontSize: 12, color: '#555',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      Q{i + 1}: <MathText text={d.text} />
                    </span>
                    {d.topic && d.topic !== 'general' && (
                      <span style={{
                        fontSize: 9, fontWeight: 500, color: '#1e40af',
                        background: '#eff6ff', padding: '1px 8px', borderRadius: 8,
                        flexShrink: 0,
                      }}>
                        {d.topic.replace(/_/g, ' ')}
                      </span>
                    )}
                    <span style={{ fontSize: 10, color: '#aaa', flexShrink: 0 }}>
                      {d.yours !== null ? `You: ${String.fromCharCode(65 + d.yours)}` : 'Skipped'}
                      {' · '}
                      Ans: {String.fromCharCode(65 + d.correct)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button
                  onClick={() => {
                    const paperQs = selectedPaper!.questions as Question[];
                    const details = paperQs.map((q, i) => ({
                      qid: q.id,
                      questionLabel: `Q${i + 1}`,
                      text: q.text,
                      timeMs: finalQuestionTimes[q.id] || 0,
                      correctAnswer: q.answer,
                      yourAnswer: answers[q.id] ?? null,
                      isCorrect: answers[q.id] === q.answer,
                    }));
                    generateExamReport({
                      paperTitle: selectedPaper!.title,
                      paperDuration: selectedPaper!.duration_minutes,
                      completedAt: new Date(),
                      totalQuestions: paperQs.length,
                      score: finalScore,
                      maxScore: finalTotal,
                      questionDetails: details,
                    });
                  }}
                  style={{
                    width: '100%', padding: '12px',
                    background: '#1e40af',
                    color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer',
                    fontSize: 14, fontWeight: 400,
                    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                  }}
                >
                  Download Report (PDF)
                </button>

                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    onClick={() => setResultsView('table')}
                    style={{
                      flex: 1, padding: '12px',
                      background: '#fff', color: '#333',
                      border: '1px solid #ccc', borderRadius: 4,
                      cursor: 'pointer', fontSize: 14, fontWeight: 400,
                      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                    }}
                  >
                    Back to Results
                  </button>
                  <button
                    onClick={() => { setExamStarted(false); resetSession(); setSelectedPaper(null); setReviewQuestionIndex(null); setResultsView('table'); }}
                    style={{
                      flex: 1, padding: '12px',
                      background: '#fff', color: '#333',
                      border: '1px solid #ccc', borderRadius: 4,
                      cursor: 'pointer', fontSize: 14, fontWeight: 400,
                      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                    }}
                  >
                    Back to Papers
                  </button>
                </div>
              </div>

              {/* Violations summary */}
              <div style={{ marginTop: 16 }}>
                <ViolationLog />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  // ---- Active Exam Screen ----
  const q = questions[currentQ];
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const overtimeMin = Math.floor(practiceElapsed / 60);
  const overtimeSec = practiceElapsed % 60;
  const answeredCount = Object.keys(answers).length;
  const progressPct = questions.length > 0 ? Math.round((answeredCount / questions.length) * 100) : 0;
  const isLastQ = currentQ === questions.length - 1;
  const isFirstQ = currentQ === 0;

  return (
    <div style={{
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      userSelect: 'none', width: '100vw', height: '100vh',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
      background: '#ffffff',
    }}>
      <TabSwitchDetector />

      {/* ═══════════ Blue Top Bar ═══════════ */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', height: 48, flexShrink: 0,
        background: '#1e40af',
      }}>
        <span style={{
          fontSize: 18, fontWeight: 400, color: '#ffffff',
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          letterSpacing: '0.3px',
        }}>
          {selectedPaper?.title?.includes('TMUA') ? 'Test of Mathematics for University Admission' : 'Comenius'}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <span
            onClick={() => q && toggleFlag(q.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              cursor: 'pointer', userSelect: 'none',
              color: '#ffffff', fontSize: 15, fontWeight: 400,
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              opacity: q && flaggedQuestions.has(q.id) ? 1 : 0.8,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill={q && flaggedQuestions.has(q.id) ? '#fff' : 'none'} stroke="#fff" strokeWidth="2">
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
              <line x1="4" y1="22" x2="4" y2="15"/>
            </svg>
            Flag
          </span>
          <span style={{
            fontSize: 15, fontWeight: 400, fontVariantNumeric: 'tabular-nums',
            color: isOvertime ? '#ff6b6b' : '#ffffff',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          }}>
            {isOvertime
              ? `Overtime: +${overtimeMin}:${overtimeSec.toString().padStart(2, '0')}`
              : `Time: ${minutes}:${seconds.toString().padStart(2, '0')}`
            }
          </span>
        </div>
      </div>

      {/* ═══════════ Main Content ═══════════ */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' }}>

        {/* ── Center: Question Content ── */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0,
          background: '#f1f5f9',
        }}>
          {/* Question area */}
          <div style={{
            flex: 1, overflowY: 'auto', padding: '16px 24px',
          }}>
            {q && (
              <div style={{
                background: '#fff', borderRadius: 16,
                border: '1px solid #e2e8f0',
                boxShadow: 'none',
                overflow: 'hidden',
              }}>
                {/* Question header */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '14px 20px',
                  background: '#f8fafc',
                  borderBottom: '1px solid #e2e8f0',
                }}>
                  <span style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: '#1e40af',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontSize: 13, fontWeight: 700, flexShrink: 0,
                  }}>
                    {currentQ + 1}
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>
                    {selectedPaper?.paper_number === 1 ? 'Paper 1 — Mathematical Thinking' : 'Paper 2 — Mathematical Reasoning'}
                  </span>
                  {q.topic && (
                    <span style={{
                      fontSize: 10, fontWeight: 500, color: '#1e40af',
                      background: '#eff6ff', padding: '2px 10px', borderRadius: 10,
                      marginLeft: 'auto',
                    }}>
                      {q.topic.replace(/_/g, ' ')}
                    </span>
                  )}
                </div>

                <div style={{ padding: '24px 28px' }}>
                    <p style={{
                      fontSize: 17, fontWeight: 500, margin: '0 0 20px 0',
                      lineHeight: 1.75, color: '#1e293b',
                    }}>
                      <MathText text={q.text} />
                    </p>
                    {q.image_url && (
                      <img
                        src={q.image_url}
                        alt={`Figure for question ${currentQ + 1}`}
                        style={{ width: '100%', maxWidth: 400, display: 'block', margin: '0 auto 20px' }}
                      />
                    )}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {q.options.map((opt, i) => {
                        const isSel = selected === i;
                        return (
                          <button
                            key={i}
                            onClick={() => selectAnswer(q.id, i)}
                            style={{
                              display: 'flex', alignItems: 'center', gap: 14,
                              padding: '14px 18px', width: '100%',
                              background: isSel
                                ? '#eff6ff'
                                : '#fff',
                              border: `2px solid ${isSel ? '#1e40af' : '#e2e8f0'}`,
                              borderRadius: 12, cursor: 'pointer',
                              textAlign: 'left' as const,
                              transition: 'all 0.15s ease',
                              boxShadow: 'none',
                            }}
                            onMouseEnter={(e) => {
                              if (!isSel) {
                                e.currentTarget.style.borderColor = '#1e40af';
                                e.currentTarget.style.background = '#f8faff';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isSel) {
                                e.currentTarget.style.borderColor = '#e2e8f0';
                                e.currentTarget.style.background = '#fff';
                              }
                            }}
                          >
                            <span style={{
                              width: 18, height: 18, borderRadius: '50%',
                              border: isSel ? '2px solid #306ca0' : '2px solid #e2e8f0',
                              background: isSel ? '#1e40af' : 'transparent',
                              flexShrink: 0,
                              transition: 'all 0.15s ease',
                            }} />
                            <span style={{
                              flex: 1, fontSize: 15, color: isSel ? '#1e40af' : '#374151',
                              fontWeight: isSel ? 600 : 400, lineHeight: 1.5,
                            }}>
                              <MathText text={opt} />
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
              </div>
            )}
          </div>

          {/* Bottom Blue Bar */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 24px', height: 48, flexShrink: 0,
            background: '#1e40af',
          }}>
            <span
              onClick={() => setShowEndTestDialog(true)}
              style={{
                color: '#ffffff', fontSize: 15, fontWeight: 400,
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                cursor: 'pointer', userSelect: 'none',
              }}
            >
              End Exam
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
              <span
                onClick={() => {
                  if (!isFirstQ) {
                    accumulateCurrentQTime();
                    setCurrentQ((c) => c - 1);
                    setSelected(answers[questions[currentQ - 1]?.id] ?? null);
                    activeQStartRef.current = Date.now();
                  }
                }}
                style={{
                  color: '#ffffff', fontSize: 15, fontWeight: 400,
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                  cursor: isFirstQ ? 'default' : 'pointer',
                  opacity: isFirstQ ? 0.4 : 1,
                  userSelect: 'none',
                }}
              >
                Previous
              </span>
              <span
                onClick={() => setShowNavigator(true)}
                style={{
                  color: '#ffffff', fontSize: 15, fontWeight: 400,
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                  cursor: 'pointer', userSelect: 'none',
                }}
              >
                Navigator
              </span>
              <span
                onClick={() => {
                  if (!isLastQ) {
                    accumulateCurrentQTime();
                    setCurrentQ((c) => c + 1);
                    setSelected(answers[questions[currentQ + 1]?.id] ?? null);
                    activeQStartRef.current = Date.now();
                  } else {
                    const unanswered = questions.filter((q) => answers[q.id] === undefined).length;
                    if (unanswered > 0) {
                      setShowEndTestDialog(true);
                    } else {
                      setShowEndTestDialog(true);
                    }
                  }
                }}
                style={{
                  color: '#ffffff', fontSize: 15, fontWeight: 400,
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                  cursor: 'pointer', userSelect: 'none',
                }}
              >
                {isLastQ ? 'Submit' : 'Next'}
              </span>
            </div>
          </div>
        </div>

        {/* ── Right Sidebar: Webcam + Status ── */}
        <div style={{
          width: 280, flexShrink: 0,
          display: 'flex', flexDirection: 'column', gap: 12,
          padding: '16px 14px',
          background: '#f5f5f5',
          borderLeft: '1px solid #e0e0e0',
          overflowY: 'auto',
        }}>
          {/* Webcam Card */}
          <div style={{
            background: '#fff', borderRadius: 10,
            border: '1px solid #e0e0e0',
            overflow: 'hidden',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '10px 14px',
              background: '#fafafa',
              borderBottom: '1px solid #eee',
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: '#ef4444',
                boxShadow: 'none',
                animation: 'pulse 2s infinite',
              }} />
              <span style={{ fontSize: 10, fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: 1 }}>
                Live Camera
              </span>
            </div>
            <div style={{ padding: 0 }}>
              <WebcamCapture />
            </div>
          </div>
        </div>
      </div>

      {/* Pulse animation for recording indicator */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>

      {/* ── Navigator Popup ── */}
      {showNavigator && (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9998,
        }}
          onClick={() => setShowNavigator(false)}
        >
          <div style={{
            background: '#fff', borderRadius: 12,
            boxShadow: 'none',
            width: 480, maxWidth: '90vw', padding: 24,
          }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginBottom: 16,
            }}>
              <h3 style={{
                margin: 0, fontSize: 16, fontWeight: 600, color: '#333',
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              }}>
                Question Palette
              </h3>
              <span style={{
                fontSize: 12, color: '#888',
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              }}>
                {answeredCount}/{questions.length} answered
              </span>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 14, fontSize: 11, color: '#888' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: '#22c55e' }} />
                Answered
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: '#e0e0e0', border: '1px solid #ccc' }} />
                Pending
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="#d97706" stroke="#d97706" strokeWidth="2">
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
                  <line x1="4" y1="22" x2="4" y2="15"/>
                </svg>
                Flagged
              </span>
            </div>

            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)',
              gap: 5,
            }}>
              {questions.map((_, i) => {
                const qId = questions[i]?.id;
                const isAnswered = answers[qId] !== undefined;
                const isCurrent = currentQ === i;
                const isFlagged = qId && flaggedQuestions.has(qId);
                return (
                  <button
                    key={i}
                    onClick={() => {
                      if (i !== currentQ) {
                        accumulateCurrentQTime();
                        setCurrentQ(i);
                        setSelected(answers[qId] ?? null);
                        activeQStartRef.current = Date.now();
                      }
                      setShowNavigator(false);
                    }}
                    style={{
                      aspectRatio: '1',
                      border: isCurrent
                        ? '2px solid #306ca0'
                        : isAnswered
                          ? '1px solid #22c55e'
                          : '1px solid #d0d0d0',
                      borderRadius: 4,
                      background: isCurrent
                        ? '#dbeafe'
                        : isAnswered
                          ? '#dcfce7'
                          : '#fff',
                      cursor: 'pointer',
                      fontSize: 12, fontWeight: isCurrent ? 700 : 500,
                      color: isCurrent ? '#1e40af' : isAnswered ? '#166534' : '#666',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      position: 'relative' as const,
                    }}
                    title={isFlagged ? 'Flagged' : undefined}
                  >
                    {i + 1}
                    {isFlagged && (
                      <svg style={{ position: 'absolute', top: 1, right: 1 }} width="8" height="8" viewBox="0 0 24 24" fill="#d97706" stroke="#d97706" strokeWidth="2">
                        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setShowNavigator(false)}
              style={{
                width: '100%', marginTop: 16, padding: '8px',
                background: '#1e40af', color: '#fff', border: 'none',
                borderRadius: 4, cursor: 'pointer', fontSize: 14,
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

            {/* ── Mode Selection Dialog ── */}
      {showModeDialog && (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999,
        }} onClick={() => setShowModeDialog(false)}>
          <div style={{
            background: '#fff', borderRadius: 16, padding: '36px 32px',
            maxWidth: 480, width: '90%',
            boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
          }} onClick={e => e.stopPropagation()}>
            <h2 style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 600, color: '#1f2937', textAlign: 'center' }}>
              Choose Exam Mode
            </h2>
            <p style={{ margin: '0 0 28px', fontSize: 13, color: '#6b7280', textAlign: 'center' }}>
              Select how you want to take this exam
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* Timed Mode */}
              <div
                onClick={() => { setExamMode('timed'); setShowModeDialog(false); setShowPreCheck(true); }}
                style={{
                  border: '2px solid #306ca0', borderRadius: 12, padding: '20px 24px',
                  cursor: 'pointer', background: '#f8faff',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 16, fontWeight: 600, color: '#1f2937' }}>Timed Mode</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#1e40af', background: '#e8f0fe', padding: '3px 10px', borderRadius: 10 }}>Recommended</span>
                </div>
                <p style={{ margin: 0, fontSize: 13, color: '#6b7280', lineHeight: 1.5 }}>
                  75-minute countdown timer. Exam auto-submits when time runs out. Simulates real exam conditions.
                </p>
              </div>

              {/* Practice Mode */}
              <div
                onClick={() => { setExamMode('practice'); setShowModeDialog(false); setShowPreCheck(true); }}
                style={{
                  border: '2px solid #e5e7eb', borderRadius: 12, padding: '20px 24px',
                  cursor: 'pointer', background: '#fafafa',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 16, fontWeight: 600, color: '#1f2937' }}>Practice Mode</span>
                </div>
                <p style={{ margin: 0, fontSize: 13, color: '#6b7280', lineHeight: 1.5 }}>
                  Timer counts down from 75 min then turns red and continues. Exam auto-submits at 120 min total. No pressure — take your time to review.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowModeDialog(false)}
              style={{
                display: 'block', margin: '20px auto 0', padding: '8px 24px',
                fontSize: 13, fontWeight: 500, color: '#6b7280', background: 'transparent',
                border: 'none', cursor: 'pointer',
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ── End Test Dialog ── */}
      {showEndTestDialog && (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999,
        }}>
          <div style={{
            background: '#fff', borderRadius: 12,
            boxShadow: 'none',
            width: 480, maxWidth: '90vw',
            overflow: 'hidden',
          }}>
            {/* Dialog header */}
            <div style={{
              padding: '20px 24px 16px',
              borderBottom: '1px solid #eee',
            }}>
              <h3 style={{
                margin: 0, fontSize: 18, fontWeight: 600, color: '#333',
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              }}>
                End Test
              </h3>
            </div>

            {/* Dialog body — mini Question Status panel */}
            <div style={{ padding: '0' }}>
              <div style={{
                maxHeight: 320, overflowY: 'auto',
                borderBottom: '1px solid #eee',
              }}>
                {questions.map((q, i) => {
                  const isAnswered = answers[q.id] !== undefined;
                  const isFlagged = flaggedQuestions.has(q.id);
                  return (
                    <div key={q.id} style={{
                      display: 'flex', alignItems: 'center',
                      padding: '8px 24px',
                      borderBottom: i < questions.length - 1 ? '1px solid #f5f5f5' : 'none',
                      fontSize: 13, fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                      cursor: 'pointer',
                      background: 'transparent',
                    }}
                      onClick={() => {
                        if (i !== currentQ) {
                          accumulateCurrentQTime();
                          setCurrentQ(i);
                          setSelected(answers[q.id] ?? null);
                          activeQStartRef.current = Date.now();
                        }
                        setShowEndTestDialog(false);
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#fafafa')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <span style={{ width: 36, fontWeight: 600, color: '#333' }}>
                        {i + 1}
                      </span>
                      <span style={{
                        flex: 1, fontWeight: 600,
                        color: isAnswered ? '#16a34a' : '#d97706',
                      }}>
                        {isAnswered ? 'Completed' : 'Unseen'}
                      </span>
                      <span style={{ width: 36, textAlign: 'center' }}>
                        {isFlagged && (
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="#d97706" stroke="#d97706" strokeWidth="2">
                            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
                            <line x1="4" y1="22" x2="4" y2="15"/>
                          </svg>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div style={{ padding: '16px 24px' }}>
                {(() => {
                  const unansweredCount = questions.filter((q) => answers[q.id] === undefined).length;
                  if (unansweredCount > 0) {
                    return (
                      <p style={{
                        margin: '0 0 4px 0', fontSize: 13, color: '#d97706',
                        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                      }}>
                        You have <strong>{unansweredCount}</strong> unanswered question{unansweredCount > 1 ? 's' : ''}.
                      </p>
                    );
                  }
                  return null;
                })()}
                <p style={{
                  margin: 0, fontSize: 13, color: '#888',
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                }}>
                  Are you sure you want to end the test? You will not be able to change your answers after submission.
                </p>
              </div>
            </div>

            {/* Dialog footer */}
            <div style={{
              padding: '16px 24px',
              borderTop: '1px solid #eee',
              display: 'flex', justifyContent: 'flex-end', gap: 12,
            }}>
              <button
                onClick={() => setShowEndTestDialog(false)}
                style={{
                  padding: '8px 24px', borderRadius: 4,
                  border: '1px solid #ccc', background: '#fff',
                  cursor: 'pointer', fontSize: 14, fontWeight: 400,
                  color: '#333', fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowEndTestDialog(false);
                  finishExam();
                }}
                style={{
                  padding: '8px 24px', borderRadius: 4,
                  background: '#1e40af', border: 'none',
                  cursor: 'pointer', fontSize: 14, fontWeight: 400,
                  color: '#fff', fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                }}
              >
                End Test
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
