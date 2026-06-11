import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, ArrowRight, Clock, Flag, CheckCircle2, XCircle, Pause, Play, RotateCcw, BarChart2 } from 'lucide-react';
import { Button } from '../ui/button';
import { getPaperQuestions } from '../data/economicsMCQ';
import { useLocale } from '../i18n/LocaleContext';

interface Question {
  id: number;
  text: string;
  image?: string;
  table?: string;
  options: { label: string; text: string }[];
  correct: string;
}

const generateQuestions = (subject: string, count = 20): Question[] => {
  const banks: Record<string, Question[]> = {
    physics: [
      {
        id: 1,
        text: 'A ball is thrown vertically upward with an initial velocity of 20 m/s. Taking g = 10 m/s², what is the maximum height reached by the ball?',
        options: [
          { label: 'A', text: '10 m' },
          { label: 'B', text: '20 m' },
          { label: 'C', text: '40 m' },
          { label: 'D', text: '80 m' },
        ],
        correct: 'B',
      },
      {
        id: 2,
        text: 'A resistor of 4 Ω is connected in parallel with a resistor of 12 Ω. What is the combined resistance?',
        options: [
          { label: 'A', text: '1 Ω' },
          { label: 'B', text: '3 Ω' },
          { label: 'C', text: '8 Ω' },
          { label: 'D', text: '16 Ω' },
        ],
        correct: 'B',
      },
      {
        id: 3,
        text: 'Which of the following correctly describes the photoelectric effect?',
        options: [
          { label: 'A', text: 'Electrons are emitted when light of any frequency hits a metal surface' },
          { label: 'B', text: 'Electrons are emitted only when light intensity exceeds a threshold value' },
          { label: 'C', text: 'Electrons are emitted only when light frequency exceeds a threshold value' },
          { label: 'D', text: 'The kinetic energy of emitted electrons depends only on the intensity of light' },
        ],
        correct: 'C',
      },
      {
        id: 4,
        text: 'A wave has a frequency of 500 Hz and a wavelength of 0.68 m. What is the speed of the wave?',
        options: [
          { label: 'A', text: '170 m/s' },
          { label: 'B', text: '340 m/s' },
          { label: 'C', text: '500 m/s' },
          { label: 'D', text: '680 m/s' },
        ],
        correct: 'B',
      },
      {
        id: 5,
        text: 'The half-life of a radioactive isotope is 8 days. What fraction of the original sample remains after 24 days?',
        options: [
          { label: 'A', text: '1/4' },
          { label: 'B', text: '1/8' },
          { label: 'C', text: '1/16' },
          { label: 'D', text: '1/3' },
        ],
        correct: 'B',
      },
      {
        id: 6,
        text: 'Which quantity is conserved in all types of collisions?',
        options: [
          { label: 'A', text: 'Kinetic energy only' },
          { label: 'B', text: 'Momentum only' },
          { label: 'C', text: 'Both kinetic energy and momentum' },
          { label: 'D', text: 'Neither kinetic energy nor momentum' },
        ],
        correct: 'B',
      },
      {
        id: 7,
        text: 'A wire carrying a current is placed in a uniform magnetic field. The force on the wire is maximum when the angle between the wire and the field is:',
        options: [
          { label: 'A', text: '0°' },
          { label: 'B', text: '30°' },
          { label: 'C', text: '60°' },
          { label: 'D', text: '90°' },
        ],
        correct: 'D',
      },
      {
        id: 8,
        text: 'In simple harmonic motion, the acceleration of a particle is:',
        options: [
          { label: 'A', text: 'Constant and directed towards the centre' },
          { label: 'B', text: 'Proportional to displacement and directed towards the centre' },
          { label: 'C', text: 'Proportional to velocity and directed away from the centre' },
          { label: 'D', text: 'Proportional to displacement and directed away from the centre' },
        ],
        correct: 'B',
      },
    ],
    economics: [
      {
        id: 1,
        text: 'When the price of a good rises and the quantity demanded falls, this is an example of:',
        options: [
          { label: 'A', text: 'A change in demand' },
          { label: 'B', text: 'A movement along the demand curve' },
          { label: 'C', text: 'An increase in supply' },
          { label: 'D', text: 'A decrease in supply' },
        ],
        correct: 'B',
      },
      {
        id: 2,
        text: 'Which of the following is a characteristic of a public good?',
        options: [
          { label: 'A', text: 'Rivalry and excludability' },
          { label: 'B', text: 'Non-rivalry and excludability' },
          { label: 'C', text: 'Non-rivalry and non-excludability' },
          { label: 'D', text: 'Rivalry and non-excludability' },
        ],
        correct: 'C',
      },
      {
        id: 3,
        text: 'If the income elasticity of demand for a good is −0.6, the good is classified as:',
        options: [
          { label: 'A', text: 'A luxury good' },
          { label: 'B', text: 'A normal good' },
          { label: 'C', text: 'An inferior good' },
          { label: 'D', text: 'A Giffen good' },
        ],
        correct: 'C',
      },
      {
        id: 4,
        text: 'Which policy tool would a central bank use to reduce inflation?',
        options: [
          { label: 'A', text: 'Decrease the interest rate' },
          { label: 'B', text: 'Increase government spending' },
          { label: 'C', text: 'Increase the interest rate' },
          { label: 'D', text: 'Reduce taxation' },
        ],
        correct: 'C',
      },
      {
        id: 5,
        text: 'Comparative advantage in international trade is based on:',
        options: [
          { label: 'A', text: 'Absolute differences in production costs' },
          { label: 'B', text: 'Opportunity costs of production' },
          { label: 'C', text: 'Total factor productivity' },
          { label: 'D', text: "The size of the country's labour force" },
        ],
        correct: 'B',
      },
      {
        id: 6,
        text: 'Price discrimination is possible only when:',
        options: [
          { label: 'A', text: 'The market is perfectly competitive' },
          { label: 'B', text: 'Consumers have identical elasticities of demand' },
          { label: 'C', text: 'Markets can be separated and resale is prevented' },
          { label: 'D', text: 'The firm is a price taker' },
        ],
        correct: 'C',
      },
    ],
    chemistry: [
      {
        id: 1,
        text: 'What is the electron configuration of Fe²⁺?',
        options: [
          { label: 'A', text: '[Ar] 3d⁶ 4s²' },
          { label: 'B', text: '[Ar] 3d⁶' },
          { label: 'C', text: '[Ar] 3d⁴' },
          { label: 'D', text: '[Ar] 3d⁵ 4s¹' },
        ],
        correct: 'B',
      },
      {
        id: 2,
        text: 'Which type of bond is present in diamond?',
        options: [
          { label: 'A', text: 'Ionic bonding' },
          { label: 'B', text: 'Metallic bonding' },
          { label: 'C', text: 'Covalent bonding' },
          { label: 'D', text: 'Hydrogen bonding' },
        ],
        correct: 'C',
      },
      {
        id: 3,
        text: 'In the reaction N₂ + 3H₂ ⇌ 2NH₃, increasing the pressure will:',
        options: [
          { label: 'A', text: 'Shift equilibrium to the left' },
          { label: 'B', text: 'Shift equilibrium to the right' },
          { label: 'C', text: 'Have no effect on the equilibrium position' },
          { label: 'D', text: 'Increase the value of Kc' },
        ],
        correct: 'B',
      },
      {
        id: 4,
        text: 'Which reagent is used to test for the presence of a C=C double bond?',
        options: [
          { label: 'A', text: "Fehling's solution" },
          { label: 'B', text: 'Bromine water' },
          { label: 'C', text: 'Acidified potassium dichromate' },
          { label: 'D', text: 'Silver nitrate solution' },
        ],
        correct: 'B',
      },
      {
        id: 5,
        text: 'The enthalpy change of combustion of methane is −890 kJ/mol. How much energy is released when 4 g of methane is burned? (Mr of CH₄ = 16)',
        options: [
          { label: 'A', text: '55.6 kJ' },
          { label: 'B', text: '222.5 kJ' },
          { label: 'C', text: '445 kJ' },
          { label: 'D', text: '3560 kJ' },
        ],
        correct: 'B',
      },
      {
        id: 6,
        text: 'Which of the following exhibits optical isomerism?',
        options: [
          { label: 'A', text: 'CH₃CH₂OH' },
          { label: 'B', text: 'CH₃CHClCH₃' },
          { label: 'C', text: 'CH₃CH(OH)CH₂CH₃' },
          { label: 'D', text: 'CH₂ClCH₂Cl' },
        ],
        correct: 'C',
      },
    ],
  };

  const base = banks[subject] ?? banks['physics'];
  const questions: Question[] = [];
  for (let i = 0; i < count; i++) {
    const src = base[i % base.length];
    questions.push({ ...src, id: i + 1 });
  }
  return questions;
};

const formatTime = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
};

const formatTimeShort = (s: number) => {
  if (s < 60) return `${s}s`;
  return `${Math.floor(s / 60)}m ${s % 60}s`;
};

// ── Results Screen ──────────────────────────────────────────────
function ResultsScreen({
  questions,
  answers,
  questionTimes,
  totalTime,
  onRetry,
  onBack,
}: {
  questions: Question[];
  answers: Record<number, string>;
  questionTimes: Record<number, number>;
  totalTime: number;
  onRetry: () => void;
  onBack: () => void;
}) {
  const { t } = useLocale();
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());
  const toggleExpanded = (id: number) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const total = questions.length;
  const correct = questions.filter((q) => answers[q.id] === q.correct).length;
  const pct = Math.round((correct / total) * 100);

  const scoreColor =
    pct >= 80 ? 'text-green-500 dark:text-green-400'
    : pct >= 60 ? 'text-orange-500 dark:text-orange-400'
    : 'text-pink-500 dark:text-pink-400';

  const ringColor =
    pct >= 80 ? 'stroke-green-500'
    : pct >= 60 ? 'stroke-orange-500'
    : 'stroke-pink-500';

  const circumference = 2 * Math.PI * 54;
  const dash = (pct / 100) * circumference;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button onClick={onBack} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>

        {/* Score card */}
        <div className="rounded-2xl border border-border bg-card p-8 mb-8 flex flex-col sm:flex-row items-center gap-8">
          {/* Circular progress */}
          <div className="relative shrink-0">
            <svg width="128" height="128" className="-rotate-90">
              <circle cx="64" cy="64" r="54" fill="none" stroke="currentColor" strokeWidth="10" className="text-muted/30" />
              <circle
                cx="64" cy="64" r="54" fill="none"
                strokeWidth="10"
                strokeDasharray={`${dash} ${circumference}`}
                strokeLinecap="round"
                className={`transition-all duration-1000 ${ringColor}`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-3xl font-bold ${scoreColor}`}>{pct}%</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-foreground mb-1">{t('mcqExam.results')}</h1>
            <p className="text-muted-foreground mb-5">Here is how you performed on this session.</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-6">
              <div>
                <p className={`text-3xl font-bold ${scoreColor}`}>{correct}/{total}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{t('mcqExam.correctAnswers')}</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">{total - correct}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{t('mcqExam.incorrectSkipped')}</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">{formatTimeShort(totalTime)}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{t('mcqExam.totalTime')}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 shrink-0">
            <Button onClick={onRetry} variant="outline" className="gap-2">
              <RotateCcw className="w-4 h-4" /> Retry
            </Button>
            <Button onClick={onBack} className="gap-2">
              <BarChart2 className="w-4 h-4" /> Done
            </Button>
          </div>
        </div>

        {/* Per-question breakdown */}
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">{t('mcqExam.questionBreakdown')}</h2>
        <div className="space-y-1.5">
          {questions.map((q, idx) => {
            const userAns = answers[q.id];
            const isCorrect = userAns === q.correct;
            const skipped = !userAns;
            const timeTaken = questionTimes[q.id] ?? 0;
            const isExpanded = expandedIds.has(q.id);
            const barBg = skipped ? 'bg-muted/50 border-border'
              : isCorrect ? 'bg-green-50 border-green-300 dark:bg-green-950/20 dark:border-green-700'
              : 'bg-pink-50 border-pink-300 dark:bg-pink-950/20 dark:border-pink-700';

            return (
              <div key={q.id} className={`rounded-lg border ${barBg} overflow-hidden`}>
                {/* Collapsed bar */}
                <button
                  onClick={() => toggleExpanded(q.id)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  {/* Status icon */}
                  <span className="shrink-0">
                    {skipped ? (
                      <span className="w-5 h-5 rounded-full bg-muted-foreground/20 flex items-center justify-center text-[10px] font-bold text-muted-foreground">{idx + 1}</span>
                    ) : isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-pink-500" />
                    )}
                  </span>
                  {/* Question number */}
                  <span className="text-sm font-semibold text-foreground shrink-0 w-12">Q{idx + 1}</span>
                  {/* Your answer */}
                  <span className="text-xs text-muted-foreground shrink-0 w-16">
                    Your: <span className={`font-semibold ${skipped ? '' : isCorrect ? 'text-green-600' : 'text-pink-600'}`}>{skipped ? '—' : userAns}</span>
                  </span>
                  {/* Correct answer */}
                  <span className="text-xs text-muted-foreground shrink-0 w-16">
                    Correct: <span className="font-semibold text-green-600">{q.correct}</span>
                  </span>
                  {/* Time */}
                  <span className="text-xs text-muted-foreground shrink-0 ml-auto mr-2">
                    <Clock className="w-3 h-3 inline mr-1" />{formatTimeShort(timeTaken)}
                  </span>
                  {/* Expand chevron */}
                  <svg className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-border/50">
                    {/* Question text */}
                    <p className="text-sm text-foreground leading-relaxed mt-3 mb-3">{q.text}</p>
                    {q.image && (
                      <div className="mb-3 flex justify-center">
                        <img src={q.image} alt="Diagram" className="max-w-full h-auto rounded-lg border border-border" style={{ maxHeight: 200 }} />
                      </div>
                    )}
                    {q.table && (
                      <div className="mb-3 overflow-x-auto exam-table-wrapper" dangerouslySetInnerHTML={{ __html: q.table }} />
                    )}
                    {/* Options */}
                    <div className="flex flex-wrap gap-2">
                      {q.options.map((opt) => {
                        const isUser = opt.label === userAns;
                        const isRight = opt.label === q.correct;
                        let cls = 'border-border text-muted-foreground bg-background';
                        if (isRight) cls = 'border-green-300 bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400';
                        if (isUser && !isRight) cls = 'border-pink-200 bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400';
                        return (
                          <span
                            key={opt.label}
                            className={`inline-flex items-center gap-1.5 border rounded-full px-3 py-1 text-xs font-medium ${cls}`}
                          >
                            <span className="font-bold">{opt.label}.</span>
                            {opt.text}
                            {isRight && <CheckCircle2 className="w-3 h-3" />}
                            {isUser && !isRight && <XCircle className="w-3 h-3" />}
                          </span>
                        );
                      })}
                    </div>
                    {skipped && (
                      <p className="text-xs text-muted-foreground mt-3 italic">{t('mcqExam.notAnswered')}</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Exam Screen ─────────────────────────────────────────────────
export function MCQExam() {
  const { subject, level, chapterId, paperId } = useParams<{ subject: string; level: string; chapterId?: string; paperId?: string }>();
  const navigate = useNavigate();
  const { t } = useLocale();

  const [questions] = useState<Question[]>(() => {
    if (paperId) {
      const realQuestions = getPaperQuestions(paperId);
      if (realQuestions) return realQuestions;
    }
    return generateQuestions(subject ?? 'physics', 20);
  });
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [elapsed, setElapsed] = useState(0);
  const [paused, setPaused] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Per-question time tracking
  const [questionTimes, setQuestionTimes] = useState<Record<number, number>>({});
  const questionStart = useRef<number>(Date.now());
  const pausedAt = useRef<number | null>(null);

  useEffect(() => {
    if (paused || submitted) return;
    const timer = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(timer);
  }, [paused, submitted]);

  // Flush time for current question when moving away or submitting
  const flushCurrentTime = () => {
    const now = Date.now();
    const spent = Math.round((now - questionStart.current) / 1000);
    setQuestionTimes((prev) => ({
      ...prev,
      [questions[current].id]: (prev[questions[current].id] ?? 0) + spent,
    }));
    questionStart.current = now;
  };

  const backPath = chapterId
    ? `/mcqs/${subject}/${level}/chapters`
    : `/mcqs/${subject}/${level}/full-papers`;

  const q = questions[current];
  const answered = Object.keys(answers).length;
  const total = questions.length;

  const selectAnswer = (label: string) => {
    setAnswers((prev) => ({ ...prev, [q.id]: label }));
  };

  const toggleFlag = () => {
    setFlagged((prev) => {
      const next = new Set(prev);
      next.has(q.id) ? next.delete(q.id) : next.add(q.id);
      return next;
    });
  };

  const jumpTo = (index: number) => {
    flushCurrentTime();
    setCurrent(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = () => {
    flushCurrentTime();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetry = () => {
    setAnswers({});
    setFlagged(new Set());
    setElapsed(0);
    setQuestionTimes({});
    setCurrent(0);
    setSubmitted(false);
    questionStart.current = Date.now();
  };

  const getStatusColor = (index: number) => {
    const id = questions[index].id;
    if (index === current) return 'bg-primary text-primary-foreground shadow-md scale-105';
    if (flagged.has(id)) return 'bg-orange-200 text-orange-800 dark:bg-orange-400';
    if (answers[id]) return 'bg-green-500 text-white dark:bg-green-600';
    return 'bg-muted text-muted-foreground hover:bg-muted/80';
  };

  if (submitted) {
    return (
      <ResultsScreen
        questions={questions}
        answers={answers}
        questionTimes={questionTimes}
        totalTime={elapsed}
        onRetry={handleRetry}
        onBack={() => navigate(backPath)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <style>{`
        .exam-table-wrapper table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }
        .exam-table-wrapper td, .exam-table-wrapper th {
          border: 1px solid #d4d4d8;
          padding: 6px 10px;
          text-align: left;
        }
        .exam-table-wrapper th {
          background: #f4f4f5;
          font-weight: 600;
        }
      `}</style>
      {/* Top bar */}
      <div className="border-b border-border bg-background/95 backdrop-blur-md sticky top-14 z-40">
        <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between gap-4">
          <button
            onClick={() => navigate(backPath)}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            {chapterId ? 'Chapters' : 'Full Papers'}
          </button>

          <div className="flex items-center gap-3 text-sm">
            <span className="text-muted-foreground hidden sm:inline">
              {answered}/{total} answered
            </span>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="font-mono">{formatTime(elapsed)}</span>
            </div>
            <button
              onClick={() => setPaused((p) => !p)}
              className={`inline-flex items-center gap-1.5 px-3 h-7 rounded-full text-xs font-medium border transition-colors ${
                paused
                  ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90'
                  : 'bg-background border-border text-muted-foreground hover:text-foreground hover:border-foreground/30'
              }`}
            >
              {paused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
              {paused ? t('mcqExam.resume') : t('mcqExam.pauseTimer')}
            </button>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className={`flex-1 max-w-7xl mx-auto w-full px-4 py-6 flex gap-6 items-start relative transition-all duration-300 ${paused ? 'select-none' : ''}`}>
        {/* Pause overlay */}
        {paused && (
          <div
            onClick={() => setPaused(false)}
            className="absolute inset-0 z-30 flex items-center justify-center rounded-xl cursor-pointer"
            style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', background: 'rgba(var(--background-rgb, 255,255,255), 0.5)' }}
          >
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Pause className="w-6 h-6 text-primary" />
              </div>
              <p className="font-semibold text-foreground">{t('mcqExam.timerPaused')}</p>
              <p className="text-sm text-muted-foreground">{t('mcqExam.clickToContinue')}</p>
            </div>
          </div>
        )}

        {/* ── Left: question + options ── */}
        <div className="flex-1 min-w-0">
          <div className="h-1 rounded-full bg-muted mb-6 overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${(answered / total) * 100}%` }}
            />
          </div>

          <div className="rounded-2xl border border-border bg-card p-7 mb-5">
            <div className="flex items-start justify-between gap-4 mb-5">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Question {current + 1} of {total}
              </span>
              <button
                onClick={toggleFlag}
                className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full transition-colors ${
                  flagged.has(q.id)
                    ? 'bg-orange-100 text-orange-500 dark:bg-orange-900/20 dark:text-orange-400'
                    : 'bg-muted text-muted-foreground hover:bg-orange-50 hover:text-orange-500 dark:hover:bg-orange-900/20'
                }`}
              >
                <Flag className="w-3 h-3" />
                {flagged.has(q.id) ? 'Flagged' : 'Flag'}
              </button>
            </div>
            <p className="text-foreground leading-relaxed text-base">{q.text}</p>
            {q.image && (
              <div className="my-4 flex justify-center">
                <img src={q.image} alt="Diagram" className="max-w-full h-auto rounded-lg border border-border" style={{ maxHeight: 320 }} />
              </div>
            )}
            {q.table && (
              <div className="mt-4 overflow-x-auto exam-table-wrapper" dangerouslySetInnerHTML={{ __html: q.table }} />
            )}
          </div>

          <div className="space-y-3 mb-8">
            {q.options.map((opt) => {
              const selected = answers[q.id] === opt.label;
              return (
                <button
                  key={opt.label}
                  onClick={() => selectAnswer(opt.label)}
                  className={`w-full text-left flex items-start gap-4 rounded-xl border px-5 py-4 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                    selected
                      ? 'border-primary bg-primary/8 shadow-sm'
                      : 'border-border bg-card hover:border-primary/40 hover:bg-muted/30'
                  }`}
                >
                  <span className={`shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-colors ${
                    selected
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border text-muted-foreground'
                  }`}>
                    {opt.label}
                  </span>
                  <span className={`text-sm leading-relaxed mt-0.5 ${selected ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {opt.text}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => jumpTo(Math.max(0, current - 1))}
              disabled={current === 0}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
            {current < total - 1 ? (
              <Button onClick={() => jumpTo(current + 1)} className="gap-2">
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="gap-2 bg-green-500 hover:bg-green-600 text-white"
              >
                <CheckCircle2 className="w-4 h-4" />
                Submit
              </Button>
            )}
          </div>
        </div>

        {/* ── Right: question navigator ── */}
        <div className="hidden lg:block w-60 shrink-0 sticky top-28">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">{t('mcqExam.questions')}</h3>

            <div className="grid grid-cols-5 gap-2 mb-5">
              {questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => jumpTo(index)}
                  className={`w-9 h-9 rounded-lg text-xs font-semibold transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary/40 ${getStatusColor(index)}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <div className="space-y-1.5 border-t border-border pt-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="w-3 h-3 rounded-sm bg-primary shrink-0" />Current
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="w-3 h-3 rounded-sm bg-green-500 shrink-0" />Answered
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="w-3 h-3 rounded-sm bg-orange-200 shrink-0" />Flagged
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="w-3 h-3 rounded-sm bg-muted border border-border shrink-0" />Unanswered
              </div>
            </div>

            <div className="mt-4 border-t border-border pt-4 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">{t('mcqExam.answered')}</span>
                <span className="font-medium text-foreground">{answered}/{total}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">{t('mcqExam.flagged')}</span>
                <span className="font-medium text-orange-500">{flagged.size}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">{t('mcqExam.remaining')}</span>
                <span className="font-medium text-foreground">{total - answered}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <Button
                onClick={handleSubmit}
                className="w-full gap-2 bg-green-500 hover:bg-green-600 text-white"
                size="sm"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Submit
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
