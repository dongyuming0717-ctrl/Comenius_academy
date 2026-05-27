import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { TopNav } from '../components/TopNav';
import { useProctor } from '../sdk/useProctor';
import { supabase } from '../supabase';
import { colors, typography, radii } from '../theme/tokens';
import type { Paper as SupabasePaper, Question } from '../sdk/types';

const GENERATED_PAPER_KEY = 'tmua_generated_paper';

function loadGeneratedPaper(): SupabasePaper | null {
  try {
    const raw = localStorage.getItem(GENERATED_PAPER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SupabasePaper;
  } catch { return null; }
}

const font = typography.fontFamily;

// ── Test definitions ──────────────────────────────────────────────
interface AdmissionTest {
  id: string;
  name: string;
  fullName: string;
  description: string;
  papers: number;
  difficulty: 'Hard' | 'Very Hard';
  duration: string;
}

const TESTS: AdmissionTest[] = [
  {
    id: 'tmua', name: 'TMUA', fullName: 'Test of Mathematics for University Admission',
    description: 'Required for Mathematics and related courses at Cambridge, Durham, and other universities',
    papers: 42, difficulty: 'Hard', duration: '150 minutes',
  },
  {
    id: 'esat', name: 'ESAT', fullName: 'Engineering and Science Admissions Test',
    description: 'Required for Engineering and Science courses at Cambridge University',
    papers: 38, difficulty: 'Hard', duration: '120 minutes',
  },
  {
    id: 'step', name: 'STEP', fullName: 'Sixth Term Examination Paper',
    description: 'Essential for Mathematics applicants to Cambridge and Warwick',
    papers: 65, difficulty: 'Very Hard', duration: '180 minutes',
  },
  {
    id: 'tara', name: 'TARA', fullName: 'Thinking and Reasoning Assessment',
    description: 'Required for Natural Sciences, Engineering, and Computer Science at Oxford',
    papers: 28, difficulty: 'Hard', duration: '90 minutes',
  },
];

// ── TMUA actual PDF data ──────────────────────────────────────────
interface TMUAPDFPaper {
  label: string;
  filename: string;
}

interface TMUAPDFYear {
  yearLabel: string;
  folder: string;
  papers: TMUAPDFPaper[];
}

function buildTMUAPDFs(): TMUAPDFYear[] {
  const years = ['2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016'];
  const result: TMUAPDFYear[] = [];
  for (const y of years) {
    result.push({
      yearLabel: y,
      folder: y,
      papers: [
        { label: 'Paper 1', filename: `TMUA-${y}-paper-1.pdf` },
        { label: 'Paper 2', filename: `TMUA-${y}-paper-2.pdf` },
        { label: 'Answer Keys', filename: `TMUA-${y}-answer-keys.pdf` },
        { label: 'Paper 1 — Worked Answers', filename: `TMUA-${y}-paper-1-worked-answers.pdf` },
        { label: 'Paper 2 — Worked Answers', filename: `TMUA-${y}-paper-2-worked-answers.pdf` },
      ],
    });
  }
  result.push({
    yearLabel: 'Specimen',
    folder: 'Specimen',
    papers: [
      { label: 'Paper 1', filename: 'TMUA-early-specimen-paper-1.pdf' },
      { label: 'Paper 2', filename: 'TMUA-early-specimen-paper-2.pdf' },
      { label: 'Answer Keys', filename: 'TMUA-early-specimen-answer-keys.pdf' },
      { label: 'Paper 1 — Worked Answers', filename: 'TMUA-early-specimen-paper-1-worked-answers.pdf' },
      { label: 'Paper 2 — Worked Answers', filename: 'TMUA-early-specimen-paper-2-worked-answers.pdf' },
    ],
  });
  return result;
}

const TMUA_PDFS = buildTMUAPDFs();

// ── Mock paper data ───────────────────────────────────────────────
interface Paper {
  id: number;
  subject: string;
  level: string;
  year: number;
  session: string;
  subjectCode: string;
  paperNumber: string;
  pages: number;
}

const MOCK_PAPERS: Record<string, Paper[]> = {
  tmua: [
    { id: 1, subject: 'Mathematics', level: 'AS', year: 2024, session: 'Winter', subjectCode: 'TMUA', paperNumber: '1', pages: 20 },
    { id: 2, subject: 'Mathematics', level: 'AS', year: 2024, session: 'Winter', subjectCode: 'TMUA', paperNumber: '2', pages: 20 },
    { id: 3, subject: 'Mathematics', level: 'AS', year: 2024, session: 'Summer', subjectCode: 'TMUA', paperNumber: '1', pages: 20 },
    { id: 4, subject: 'Mathematics', level: 'AS', year: 2024, session: 'Summer', subjectCode: 'TMUA', paperNumber: '2', pages: 20 },
    { id: 5, subject: 'Mathematics', level: 'A2', year: 2023, session: 'Winter', subjectCode: 'TMUA', paperNumber: '1', pages: 20 },
    { id: 6, subject: 'Mathematics', level: 'A2', year: 2023, session: 'Winter', subjectCode: 'TMUA', paperNumber: '2', pages: 20 },
    { id: 7, subject: 'Mathematics', level: 'A2', year: 2023, session: 'Summer', subjectCode: 'TMUA', paperNumber: '1', pages: 18 },
    { id: 8, subject: 'Mathematics', level: 'A2', year: 2023, session: 'Summer', subjectCode: 'TMUA', paperNumber: '2', pages: 18 },
    { id: 9, subject: 'Mathematics', level: 'A2', year: 2022, session: 'Winter', subjectCode: 'TMUA', paperNumber: '1', pages: 20 },
    { id: 10, subject: 'Mathematics', level: 'A2', year: 2022, session: 'Winter', subjectCode: 'TMUA', paperNumber: '2', pages: 20 },
  ],
  esat: [
    { id: 11, subject: 'Engineering', level: 'A2', year: 2024, session: 'Summer', subjectCode: 'ESAT', paperNumber: '1', pages: 22 },
    { id: 12, subject: 'Engineering', level: 'A2', year: 2024, session: 'Summer', subjectCode: 'ESAT', paperNumber: '2', pages: 20 },
    { id: 13, subject: 'Engineering', level: 'A2', year: 2023, session: 'Winter', subjectCode: 'ESAT', paperNumber: '1', pages: 24 },
    { id: 14, subject: 'Engineering', level: 'A2', year: 2023, session: 'Winter', subjectCode: 'ESAT', paperNumber: '2', pages: 22 },
  ],
  step: [
    { id: 21, subject: 'Mathematics', level: 'A2', year: 2024, session: 'Summer', subjectCode: 'STEP', paperNumber: 'I', pages: 16 },
    { id: 22, subject: 'Mathematics', level: 'A2', year: 2024, session: 'Summer', subjectCode: 'STEP', paperNumber: 'II', pages: 16 },
    { id: 23, subject: 'Mathematics', level: 'A2', year: 2024, session: 'Summer', subjectCode: 'STEP', paperNumber: 'III', pages: 16 },
  ],
  tara: [
    { id: 31, subject: 'General', level: 'A2', year: 2024, session: 'Summer', subjectCode: 'TARA', paperNumber: '1', pages: 18 },
    { id: 32, subject: 'General', level: 'A2', year: 2023, session: 'Winter', subjectCode: 'TARA', paperNumber: '1', pages: 18 },
  ],
};

const YEARS = ['2024', '2023', '2022', '2021', '2020'];
const SESSIONS = ['Summer', 'Winter', 'Spring'];
const PAPER_NUMBERS: Record<string, string[]> = {
  tmua: ['1', '2'],
  esat: ['1', '2'],
  step: ['I', 'II', 'III'],
  tara: ['1'],
};

// ── Shared styles ─────────────────────────────────────────────────
const btnPrimary: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 8,
  padding: '10px 20px', borderRadius: 6, fontSize: 14, fontWeight: 500,
  cursor: 'pointer', border: 'none', background: colors.primary,
  color: colors.primaryForeground, fontFamily: font, transition: 'all 0.2s',
  textDecoration: 'none', whiteSpace: 'nowrap',
};

const btnOutline: React.CSSProperties = {
  ...btnPrimary, background: 'transparent', color: colors.foreground,
  border: `1px solid ${colors.border}`, fontWeight: 400,
};

const btnSm: React.CSSProperties = { padding: '6px 12px', fontSize: 13, height: 32 };

const cardStyle: React.CSSProperties = {
  background: colors.card, border: `1px solid rgba(226,232,240,0.5)`,
  borderRadius: 8, overflow: 'hidden',
};

const cardHeader: React.CSSProperties = { padding: '24px 24px 16px' };
const cardContent: React.CSSProperties = { padding: '0 24px 24px' };

const badgeBase: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 4,
  padding: '2px 8px', borderRadius: 4, fontSize: 12, fontWeight: 500,
  border: '1px solid',
};

const badgeHard: React.CSSProperties = {
  ...badgeBase, background: '#fff7ed', color: '#9a3412', borderColor: '#fed7aa',
};

const badgeVeryHard: React.CSSProperties = {
  ...badgeBase, background: '#fee2e2', color: '#991b1b', borderColor: '#fecaca',
};

const selectStyle: React.CSSProperties = {
  padding: '8px 12px', borderRadius: 6, border: `1px solid ${colors.border}`,
  fontSize: 14, background: colors.background, color: colors.foreground,
  fontFamily: font, cursor: 'pointer', width: '100%', outline: 'none',
};

const pageContainer: React.CSSProperties = {
  minHeight: '100vh', fontFamily: font, background: colors.background,
};

const container: React.CSSProperties = {
  maxWidth: 1280, margin: '0 auto', padding: '32px 24px',
};

// ── Test listing view ─────────────────────────────────────────────
function TestList() {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div style={pageContainer}>
      <TopNav currentPage="admission-tests" />
      <div style={container}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.1 2.7 2 6 2s6-.9 6-2v-5"/>
            </svg>
            <h1 style={{ margin: 0, fontSize: 30, fontWeight: 600, color: colors.foreground }}>
              Admission Tests
            </h1>
          </div>
          <p style={{ margin: 0, fontSize: 18, color: colors.mutedForeground }}>
            Comprehensive preparation for UK university admission tests
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(520px, 1fr))', gap: 24 }}>
          {TESTS.map((t) => (
            <div key={t.id} style={{
              ...cardStyle, cursor: 'pointer',
              transform: hoveredId === t.id ? 'translateY(-4px)' : 'translateY(0)',
              boxShadow: hoveredId === t.id ? '0 20px 25px rgba(0,0,0,0.1)' : 'none',
              borderColor: hoveredId === t.id ? colors.primary : 'rgba(226,232,240,0.5)',
              transition: 'all 0.25s ease',
            }} onMouseEnter={() => setHoveredId(t.id)} onMouseLeave={() => setHoveredId(null)}>
              <div style={cardHeader}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 12 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                      <h3 style={{ margin: 0, fontSize: 24, fontWeight: 600, color: colors.foreground }}>{t.name}</h3>
                      <span style={t.difficulty === 'Very Hard' ? badgeVeryHard : badgeHard}>{t.difficulty}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: 16, color: colors.mutedForeground }}>{t.fullName}</p>
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: 14, color: colors.mutedForeground }}>{t.description}</p>
              </div>
              <div style={cardContent}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, fontSize: 14, marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.mutedForeground} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                    </svg>
                    <span style={{ color: colors.mutedForeground }}>{t.papers} Past Papers</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.mutedForeground} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <span style={{ color: colors.mutedForeground }}>{t.duration}</span>
                  </div>
                </div>
                <button
                  style={{ ...btnPrimary, width: '100%', justifyContent: 'center' }}
                  onClick={() => navigate(`/admission-tests/${t.id}`)}
                >
                  View Past Papers
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info card */}
        <div style={{ marginTop: 32, ...cardStyle, borderColor: 'rgba(30,64,175,0.5)', background: 'rgba(219,234,254,0.3)' }}>
          <div style={cardHeader}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
              </svg>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: colors.foreground }}>Why Practice Admission Tests?</h3>
            </div>
          </div>
          <div style={cardContent}>
            <p style={{ margin: '0 0 12px', fontSize: 14, color: colors.mutedForeground }}>
              Admission tests are a crucial part of the application process for top UK universities. These tests assess your aptitude and readiness for university-level study.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }}>
              {[
                'Practice with authentic past papers from recent years',
                'Detailed solutions and mark schemes for every question',
                'Timed mock exams that simulate real test conditions',
                'AI-powered insights to identify weak areas and improve',
              ].map((text) => (
                <div key={text} style={{ display: 'flex', gap: 8 }}>
                  <span style={{ color: colors.primary }}>•</span>
                  <span style={{ color: colors.mutedForeground }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Test detail view ──────────────────────────────────────────────
function TestDetail() {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const { user } = useProctor();
  const test = TESTS.find((t) => t.id === testId);

  const [papers, setPapers] = useState<SupabasePaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState<{ mocksTaken: number; questionsDone: number; avgAccuracy: number; avgScore: number } | null>(null);
  const [paperStats, setPaperStats] = useState<Record<string, { completionRate: number; accuracy: number; score: number | null; hasRecord: boolean }>>({});
  const [showPDFModal, setShowPDFModal] = useState(false);
  const [userProfileId, setUserProfileId] = useState<string | null>(null);

  const isTMUA = testId === 'tmua';
  const generatedPaper = isTMUA ? loadGeneratedPaper() : null;

  useEffect(() => {
    if (!isTMUA) { setLoading(false); return; }
    setLoading(true);
    supabase.from('papers').select('*')
      .order('year', { ascending: false })
      .order('paper_number')
      .then(({ data, error }) => {
        if (!error && data) setPapers(data as SupabasePaper[]);
        setLoading(false);
      });
  }, [testId]);

  // Fetch user profile for stats
  useEffect(() => {
    if (!user || !isTMUA) { setUserProfileId(null); return; }
    supabase.from('users').select('id').eq('auth_id', user.id).single()
      .then(async ({ data, error }) => {
        if (!error && data) { setUserProfileId(data.id); return; }
        // Only auto-create if row is genuinely missing, not for other errors (e.g. RLS recursion)
        if (error && error.code !== 'PGRST116') return;
        const { data: created } = await supabase
          .from('users').upsert({ auth_id: user.id, email: user.email, full_name: user.email || user.email }, { onConflict: 'auth_id', ignoreDuplicates: true })
          .select('id').single();
        setUserProfileId(created?.id || user.id);
      });
  }, [user, isTMUA]);

  // Fetch user exam stats
  useEffect(() => {
    if (!userProfileId || !isTMUA) return;
    supabase.from('exam_sessions')
      .select('id, paper_id, answers, score')
      .eq('user_id', userProfileId)
      .eq('status', 'completed')
      .then(({ data: sessions }) => {
        if (!sessions || sessions.length === 0) return;
        let totalQuestionsDone = 0;
        let totalCorrect = 0;
        let totalScore = 0;
        let sessionsWithScore = 0;
        for (const s of sessions) {
          totalQuestionsDone += Object.keys(s.answers || {}).length;
          // Approximate: count answers as done
        }
        setUserStats({
          mocksTaken: sessions.length,
          questionsDone: totalQuestionsDone,
          avgAccuracy: 0,
          avgScore: 0,
        });
        // Store for later processing with papers
        (window as any).__tmuaSessions = sessions;
      });
  }, [userProfileId, isTMUA]);

  // Compute per-paper stats when papers and sessions are both loaded
  useEffect(() => {
    const sessions = (window as any).__tmuaSessions;
    if (!sessions || papers.length === 0) return;

    let totalCorrectAll = 0;
    let totalAnsweredAll = 0;
    let totalScoreAll = 0;
    let sessionsWithScore = 0;
    const pStats: Record<string, { completionRate: number; accuracy: number; score: number | null; hasRecord: boolean }> = {};

    for (const paper of papers) {
      const paperQs = (paper.questions as Question[]) || [];
      const qCount = paperQs.length;
      const paperSessions = sessions.filter((s: any) => s.paper_id === paper.id);

      if (paperSessions.length === 0) {
        pStats[paper.id] = { completionRate: 0, accuracy: 0, score: null, hasRecord: false };
        continue;
      }

      let bestAccuracy = 0;
      let bestScore: number | null = null;
      let bestScoreVal = -1;
      let maxAnswered = 0;

      for (const s of paperSessions) {
        const answers = s.answers || {};
        let correct = 0;
        for (const q of paperQs) {
          const ans = answers[q.id];
          if (ans !== undefined && ans !== null && ans === q.answer) correct++;
        }
        const answered = Object.keys(answers).length;
        if (answered > maxAnswered) maxAnswered = answered;
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
        completionRate: qCount > 0 ? Math.round((maxAnswered / qCount) * 100) : 0,
        accuracy: Math.round(bestAccuracy * 100),
        score: bestScore,
        hasRecord: true,
      };
    }

    const avgAcc = totalAnsweredAll > 0 ? Math.round((totalCorrectAll / totalAnsweredAll) * 100) : 0;
    const avgScore = sessionsWithScore > 0 ? Math.round(totalScoreAll / sessionsWithScore) : 0;

    setUserStats(prev => prev ? { ...prev, avgAccuracy: avgAcc, avgScore } : null);
    setPaperStats(pStats);
    delete (window as any).__tmuaSessions;
  }, [papers]);

  const sortedPapers = useMemo(() => papers, [papers]);

  if (!test) {
    return (
      <div style={pageContainer}>
        <TopNav currentPage="admission-tests" />
        <div style={{ ...container, textAlign: 'center' }}>
          <h2 style={{ color: colors.mutedForeground }}>Test not found</h2>
          <Link to="/admission-tests" style={{ color: colors.primary }}>Back to Admission Tests</Link>
        </div>
      </div>
    );
  }

  const paperTagStyle = (num: number): React.CSSProperties => ({
    display: 'inline-flex', alignItems: 'center', gap: 4,
    padding: '2px 8px', borderRadius: 4, fontSize: 12, fontWeight: 500,
    background: num === 1 ? colors.successBg : '#fff7ed',
    color: num === 1 ? colors.success : '#9a3412',
    border: `1px solid ${num === 1 ? colors.successBorder : '#fed7aa'}`,
  });

  const tagStyle = (bg: string, color: string) => ({
    fontSize: 10, fontWeight: 600, color, background: bg,
    padding: '2px 10px', borderRadius: 10,
  } as const);

  const statCards = [
    { label: 'Mocks Taken', value: userStats ? userStats.mocksTaken : 0 },
    { label: 'Questions Done', value: userStats ? userStats.questionsDone : 0 },
    { label: 'Average Accuracy', value: userStats ? `${userStats.avgAccuracy}%` : '0%' },
    { label: 'Average Score', value: userStats ? `${userStats.avgScore}/20` : '0/20' },
  ];

  return (
    <div style={pageContainer}>
      <TopNav currentPage="admission-tests" />
      <div style={container}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <button
            onClick={() => navigate('/admission-tests')}
            style={{ ...btnOutline, ...btnSm, marginBottom: 16 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            Back
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.1 2.7 2 6 2s6-.9 6-2v-5"/>
            </svg>
            <h1 style={{ margin: 0, fontSize: 30, fontWeight: 600, color: colors.foreground }}>
              {test.name}
            </h1>
            <span style={test.difficulty === 'Very Hard' ? badgeVeryHard : badgeHard}>{test.difficulty}</span>
          </div>
          <p style={{ margin: 0, fontSize: 18, color: colors.mutedForeground }}>
            {test.fullName} — {papers.length || test.papers} past papers available
          </p>
        </div>

        {/* TMUA-only: Stats + Video + Actions */}
        {isTMUA && (
          <>
            {/* Stats Cards */}
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
                  <div style={{ fontSize: 24, fontWeight: 700, color: colors.primary }}>{stat.value}</div>
                </div>
              ))}
            </div>

            {/* Demo Video */}
            <div style={{
              background: '#fafafa', borderRadius: 12,
              border: '1px solid #e0e0e0', padding: '24px 28px',
              marginBottom: 32,
            }}>
              <h2 style={{
                margin: '0 0 6px 0', fontSize: 18, fontWeight: 600, color: '#333',
                fontFamily: font,
              }}>
                Exam Simulator Demo
              </h2>
              <p style={{
                margin: '0 0 16px 0', fontSize: 13, color: '#888',
                fontFamily: font,
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

            {/* Action buttons: Topics / Generate / Past Paper */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
              <button style={{ ...btnPrimary, flex: 1, justifyContent: 'center', padding: '16px 24px', fontSize: 16, fontWeight: 600 }} onClick={() => navigate('/topics')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
                </svg>
                Topics
              </button>
              <button style={{ ...btnPrimary, flex: 1, justifyContent: 'center', padding: '16px 24px', fontSize: 16, fontWeight: 600 }} onClick={() => navigate('/random')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/>
                </svg>
                Generate
              </button>
              <button style={{ ...btnOutline, flex: 1, justifyContent: 'center', padding: '16px 24px', fontSize: 16, fontWeight: 600 }} onClick={() => setShowPDFModal(true)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                </svg>
                Past Paper
              </button>
            </div>

            {/* Generated Papers */}
            {generatedPaper && (
              <div style={{ marginBottom: 32 }}>
                <h2 style={{
                  margin: '0 0 16px 0', fontSize: 20, fontWeight: 600, color: '#333',
                  fontFamily: font,
                }}>
                  Generated Papers
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div style={{
                    background: '#fff', borderRadius: 10,
                    border: '1px solid #e0e0e0', padding: '20px 24px',
                  }}>
                    <div style={{ marginBottom: 12 }}>
                      <span style={tagStyle('#eff6ff', '#1e40af')}>GENERATED</span>
                    </div>
                    <h3 style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 600, color: '#333' }}>
                      {generatedPaper.title}
                    </h3>
                    <div style={{ fontSize: 12, color: '#888', marginBottom: 12 }}>
                      {generatedPaper.duration_minutes} min &middot; {(generatedPaper.questions as Question[]).length} questions
                    </div>
                    <button
                      onClick={() => navigate('/exam', { state: { paperId: generatedPaper.id } })}
                      style={{
                        padding: '10px 16px', fontSize: 13, fontWeight: 600,
                        color: '#fff', background: colors.primary, border: 'none',
                        borderRadius: 6, cursor: 'pointer', width: '100%',
                        fontFamily: font,
                      }}
                    >
                      Start Mock Exam
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Available Mock Examinations */}
        {isTMUA && (
          <h2 style={{
            margin: '24px 0 16px 0', fontSize: 20, fontWeight: 600, color: '#333',
            fontFamily: font,
          }}>
            Available Mock Examinations
          </h2>
        )}

        {/* Results header */}
        <div style={{ display: 'flex', alignItems: 'center', margin: '0 0 16px 0' }}>
          <div style={{ fontSize: 14, color: colors.mutedForeground }}>
            {loading ? 'Loading...' : `${papers.length} past papers available`}
          </div>
        </div>

        {/* Paper list — 2-column grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {loading && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 48, color: colors.mutedForeground }}>Loading papers...</div>
          )}
          {!loading && sortedPapers.map((p) => {
            const stats = paperStats[p.id];
            const qCount = (p.questions as Question[]).length;
            const hasRecord = stats?.hasRecord || false;
            return (
              <div key={p.id} style={{
                background: '#fff', borderRadius: 10,
                border: '1px solid #e0e0e0', padding: '20px 24px',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}>
                {/* Tags */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                  <span style={tagStyle('#eff6ff', '#1e40af')}>Past Papers</span>
                  <span style={p.paper_number === 1
                    ? tagStyle('#f0fdf4', '#16a34a')
                    : tagStyle('#fef3c7', '#d97706')
                  }>
                    Paper {p.paper_number}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{
                  margin: '0 0 4px', fontSize: 17, fontWeight: 600, color: '#1f2937',
                  fontFamily: font,
                }}>
                  {p.title}
                </h3>

                {/* Meta */}
                <div style={{
                  fontSize: 12, color: '#888', marginBottom: 14,
                  display: 'flex', gap: 16, flexWrap: 'wrap',
                }}>
                  <span>{p.sitting || p.year}</span>
                  <span>{p.duration_minutes} min</span>
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
                      <span style={{ color: '#888' }}>Completion: </span>
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
                    onClick={() => navigate('/exam', { state: { paperId: p.id } })}
                    style={{
                      flex: 1, padding: '10px 16px', fontSize: 13, fontWeight: 600,
                      color: '#fff', background: colors.primary, border: 'none',
                      borderRadius: 6, cursor: 'pointer',
                      fontFamily: font,
                    }}
                  >
                    Start Mock Exam
                  </button>
                  <button
                    onClick={() => { if (hasRecord) navigate('/topics', { state: { paperId: p.id } }); }}
                    disabled={!hasRecord}
                    style={{
                      flex: 1, padding: '10px 16px', fontSize: 13, fontWeight: 500,
                      color: hasRecord ? colors.primary : '#ccc',
                      background: '#fff',
                      border: `1px solid ${hasRecord ? colors.primary : '#e0e0e0'}`,
                      borderRadius: 6, cursor: hasRecord ? 'pointer' : 'default',
                      fontFamily: font,
                    }}
                  >
                    View Latest Record
                  </button>
                </div>
              </div>
            );
          })}
          {!loading && testId !== 'tmua' && (
            <div style={{ textAlign: 'center', padding: 48, color: colors.mutedForeground }}>
              <p style={{ fontSize: 18, fontWeight: 500, marginBottom: 8 }}>Coming Soon</p>
              <p>Interactive mock exams for {test?.name} are being prepared.</p>
              <p style={{ marginTop: 8 }}>Check back soon or browse PDF past papers in the <Link to="/past-papers" style={{ color: colors.primary }}>Past Paper Library</Link>.</p>
            </div>
          )}
          {!loading && testId === 'tmua' && sortedPapers.length === 0 && (
            <div style={{ textAlign: 'center', padding: 48, color: colors.mutedForeground }}>
              No papers available.
            </div>
          )}
        </div>
      </div>

      {/* Past Paper PDF Modal */}
      {showPDFModal && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          onClick={() => setShowPDFModal(false)}
        >
          <div
            style={{
              background: '#fff', width: '92vw', maxWidth: 900, height: '92vh',
              borderRadius: 10, overflow: 'hidden',
              display: 'flex', flexDirection: 'column',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '16px 24px', borderBottom: '1px solid #e0e0e0',
              fontFamily: font,
            }}>
              <span style={{ fontWeight: 600, fontSize: 18, color: '#333' }}>TMUA Past Papers (PDF)</span>
              <button
                onClick={() => setShowPDFModal(false)}
                style={{
                  background: 'none', border: 'none', fontSize: 24,
                  cursor: 'pointer', color: '#888', lineHeight: 1,
                }}
              >
                &times;
              </button>
            </div>
            <div style={{ flex: 1, overflow: 'auto', padding: '24px' }}>
              {TMUA_PDFS.map((yr) => (
                <div key={yr.yearLabel} style={{ marginBottom: 28 }}>
                  <h3 style={{
                    margin: '0 0 12px 0', fontSize: 20, fontWeight: 600,
                    color: colors.foreground, fontFamily: font,
                    borderBottom: `2px solid ${colors.primary}`, paddingBottom: 8,
                  }}>
                    {yr.yearLabel}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {yr.papers.map((paper) => {
                      const pdfUrl = `/tmua-papers/${yr.folder}/${paper.filename}`;
                      return (
                        <div key={paper.filename} style={{
                          background: '#fafafa', borderRadius: 8,
                          border: '1px solid #e0e0e0', padding: '14px 18px',
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          fontFamily: font,
                        }}>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 15, fontWeight: 600, color: '#333', marginBottom: 4 }}>
                              {paper.label}
                            </div>
                            <div style={{ fontSize: 13, color: '#888' }}>
                              {paper.filename}
                            </div>
                          </div>
                          <button
                            onClick={() => window.open(pdfUrl, '_blank')}
                            style={{
                              padding: '8px 16px', fontSize: 13, fontWeight: 600,
                              color: '#fff', background: colors.primary, border: 'none',
                              borderRadius: 6, cursor: 'pointer', whiteSpace: 'nowrap',
                              fontFamily: font, marginLeft: 16,
                            }}
                          >
                            View PDF
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Router ────────────────────────────────────────────────────────
export function AdmissionTestsPage() {
  const { testId } = useParams<{ testId?: string }>();
  if (testId) return <TestDetail />;
  return <TestList />;
}
