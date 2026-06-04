import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

interface Question {
  id: string;
  image_url: string;
  options: string[];
  answer: number;
  topic: string;
}

interface Paper {
  id: string;
  title: string;
  paper_number: number;
  year: number;
  sitting: string;
  duration_minutes: number;
  total_marks: number;
  topics: string[];
  questions: Question[];
}

export function EconMCQExamPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const paperId = searchParams.get('paperId');

  const [paper, setPaper] = useState<Paper | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentQ, setCurrentQ] = useState(0);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [internalUserId, setInternalUserId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerVisible, setTimerVisible] = useState(true);

  const saveTimerRef = useRef<ReturnType<typeof setInterval>>();
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  // Load paper and session
  useEffect(() => {
    if (!paperId) { setError('No paper specified'); setLoading(false); return; }
    loadPaperAndSession();
  }, [paperId]);

  async function loadPaperAndSession() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) { setError('Please log in first'); setLoading(false); return; }

      const { data: userRow } = await supabase
        .from('users').select('id').eq('auth_id', session.user.id).single();
      const uid = userRow?.id;
      if (!uid) { setError('User profile not found'); setLoading(false); return; }
      setInternalUserId(uid);

      const { data: papers, error: paperErr } = await supabase
        .from('papers').select('*').eq('id', paperId).single();
      if (paperErr || !papers) { setError('Paper not found'); setLoading(false); return; }

      const p = papers as Paper;
      if (typeof p.questions === 'string') p.questions = JSON.parse(p.questions as any);
      setPaper(p);
      setTimerSeconds((p.duration_minutes || 45) * 60);

      const { data: activeSession } = await supabase
        .from('exam_sessions')
        .select('*').eq('user_id', uid).eq('paper_id', paperId).eq('status', 'active')
        .order('started_at', { ascending: false }).limit(1).single();

      if (activeSession) {
        setSessionId(activeSession.id);
        setAnswers(activeSession.answers || {});
        setCurrentQ(activeSession.current_question_index || 0);
      } else {
        const { data: newSession, error: createErr } = await supabase
          .from('exam_sessions').insert({
            user_id: uid, paper_id: paperId, status: 'active',
            answers: {}, current_question_index: 0,
          }).select().single();

        if (createErr) { setError('Failed to start session'); setLoading(false); return; }
        setSessionId(newSession.id);
      }
    } catch (e: any) { setError(e.message); }
    setLoading(false);
  }

  // Auto-save every 15 seconds
  useEffect(() => {
    if (!sessionId || submitted) return;
    saveTimerRef.current = setInterval(() => saveProgress(), 15000);
    return () => { if (saveTimerRef.current) clearInterval(saveTimerRef.current); };
  }, [sessionId, submitted]);

  // Timer countdown
  useEffect(() => {
    if (!sessionId || submitted || isPaused) return;
    timerRef.current = setInterval(() => {
      setTimerSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [sessionId, submitted, isPaused]);

  const saveProgress = useCallback(async () => {
    if (!sessionId || submitted) return;
    await supabase.from('exam_sessions').update({
      answers, current_question_index: currentQ,
    }).eq('id', sessionId);
  }, [sessionId, submitted, answers, currentQ]);

  function selectAnswer(qId: string, optIndex: number) {
    if (submitted || isPaused) return;
    const newAnswers = { ...answers, [qId]: optIndex };
    setAnswers(newAnswers);
    supabase.from('exam_sessions').update({
      answers: newAnswers, current_question_index: currentQ,
    }).eq('id', sessionId);
  }

  function goTo(q: number) {
    if (q >= 0 && q < (paper?.questions.length || 0)) {
      setCurrentQ(q);
    }
  }

  function togglePause() {
    if (submitted) return;
    const newPaused = !isPaused;
    setIsPaused(newPaused);
    if (newPaused) {
      saveProgress();
    }
  }

  async function handleSubmit() {
    if (!paper || !sessionId) return;
    const unanswered = paper.questions.filter(q => answers[q.id] === undefined).length;
    if (unanswered > 0) {
      if (!confirm(`You have ${unanswered} unanswered question(s). Submit anyway?`)) return;
    } else {
      if (!confirm('Submit your answers? You cannot change them after submission.')) return;
    }

    let correct = 0;
    for (const q of paper.questions) {
      if (answers[q.id] === q.answer) correct++;
    }

    await supabase.from('exam_sessions').update({
      answers, score: correct, status: 'completed', ended_at: new Date().toISOString(),
    }).eq('id', sessionId);

    if (saveTimerRef.current) clearInterval(saveTimerRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
    setScore(correct);
    setSubmitted(true);
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (submitted || isPaused) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const total = paper?.questions.length || 0;
      if (e.key === 'ArrowLeft') { e.preventDefault(); if (currentQ > 0) goTo(currentQ - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); if (currentQ < total - 1) goTo(currentQ + 1); }
      if (e.key === 'a' || e.key === 'A') { e.preventDefault(); selectAnswer(paper!.questions[currentQ].id, 0); }
      if (e.key === 'b' || e.key === 'B') { e.preventDefault(); selectAnswer(paper!.questions[currentQ].id, 1); }
      if (e.key === 'c' || e.key === 'C') { e.preventDefault(); selectAnswer(paper!.questions[currentQ].id, 2); }
      if (e.key === 'd' || e.key === 'D') { e.preventDefault(); selectAnswer(paper!.questions[currentQ].id, 3); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQ, isPaused, submitted, paper]);

  // Loading state
  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'Inter, system-ui, sans-serif', color: '#64748b' }}>
        Loading...
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'Inter, system-ui, sans-serif', gap: 12 }}>
        <p style={{ color: '#64748b' }}>{error}</p>
        <button onClick={() => navigate('/econ-mcq')} style={btnSecondary}>Back to Paper List</button>
      </div>
    );
  }

  if (!paper) return null;

  const question = paper.questions[currentQ];
  const answeredCount = Object.keys(answers).length;
  const totalCount = paper.questions.length;
  const isFirst = currentQ === 0;
  const isLast = currentQ === totalCount - 1;

  // Results view
  if (submitted && score !== null) {
    const pct = Math.round((score / totalCount) * 100);
    return (
      <div style={{ fontFamily: 'Inter, system-ui, sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
        <div style={{ background: '#1e40af', color: '#fff', padding: '32px 24px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>Quiz Complete</h1>
          <p style={{ fontSize: 15, opacity: 0.8, marginTop: 8 }}>{paper.title}</p>
        </div>
        <div style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}>
          <div style={{ textAlign: 'center', margin: '32px 0' }}>
            <div style={{
              width: 140, height: 140, borderRadius: '50%', display: 'inline-flex',
              background: `conic-gradient(#22c55e ${pct}%, #e5e7eb ${pct}%)`,
              alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ width: 108, height: 108, borderRadius: '50%', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 36, fontWeight: 700 }}>{score}</span>
                <span style={{ fontSize: 14, color: '#666' }}>/ {totalCount}</span>
              </div>
            </div>
            <p style={{ fontSize: 18, fontWeight: 600, marginTop: 16 }}>{pct}% Correct</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6, marginBottom: 24 }}>
            {paper.questions.map((q, i) => {
              const userAns = answers[q.id];
              const correct = userAns === q.answer;
              return (
                <div key={q.id} style={{
                  padding: '8px 4px', borderRadius: 6, textAlign: 'center', fontSize: 12, fontWeight: 600,
                  background: userAns === undefined ? '#f1f5f9' : correct ? '#dcfce7' : '#fee2e2',
                  color: userAns === undefined ? '#94a3b8' : correct ? '#166534' : '#991b1b',
                }}>
                  Q{i + 1}
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button onClick={() => navigate('/econ-mcq')} style={btnSecondary}>Back to List</button>
          </div>
        </div>
      </div>
    );
  }

  const selected = answers[question.id];
  const min = Math.floor(timerSeconds / 60);
  const sec = timerSeconds % 60;
  const timerStr = `${min}:${sec.toString().padStart(2, '0')}`;

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Inter, system-ui, sans-serif', background: '#f8fafc' }}>
      {/* ===== LEFT SIDEBAR ===== */}
      <div style={{
        width: 260, flexShrink: 0, background: '#fff', borderRight: '1px solid #e2e8f0',
        display: 'flex', flexDirection: 'column', height: '100vh',
      }}>
        {/* Paper title */}
        <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b', lineHeight: 1.3 }}>{paper.title}</div>
          <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>
            {answeredCount}/{totalCount} answered
          </div>
        </div>

        {/* Question grid */}
        <div style={{ flex: 1, overflow: 'auto', padding: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
            {paper.questions.map((q, i) => {
              const isAnswered = answers[q.id] !== undefined;
              const isCurrent = i === currentQ;
              return (
                <button
                  key={q.id}
                  onClick={() => goTo(i)}
                  style={{
                    aspectRatio: '1',
                    borderRadius: 8,
                    border: isCurrent ? '2px solid #1e40af' : '1px solid #e2e8f0',
                    background: isCurrent ? '#eff6ff' : isAnswered ? '#dcfce7' : '#fff',
                    color: isCurrent ? '#1e40af' : isAnswered ? '#166534' : '#94a3b8',
                    fontSize: 13, fontWeight: isCurrent ? 700 : 500,
                    cursor: 'pointer', fontFamily: 'Inter, system-ui, sans-serif',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit button at bottom of sidebar */}
        <div style={{ padding: 12, borderTop: '1px solid #f1f5f9' }}>
          <button
            onClick={handleSubmit}
            style={{
              width: '100%', padding: '10px 0', borderRadius: 8, border: 'none',
              background: '#ef4444', color: '#fff', fontSize: 14, fontWeight: 600,
              cursor: 'pointer', fontFamily: 'Inter, system-ui, sans-serif',
            }}
          >
            Submit Quiz
          </button>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, position: 'relative' }}>
        {/* Top bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 24px', height: 48, flexShrink: 0,
          background: '#fff', borderBottom: '1px solid #e2e8f0',
        }}>
          <span style={{ fontSize: 13, color: '#64748b' }}>
            {answeredCount}/{totalCount} answered
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* Timer */}
            <span
              onClick={() => setTimerVisible(!timerVisible)}
              style={{
                fontSize: 20, fontWeight: 600, color: timerSeconds < 300 ? '#ef4444' : '#1e293b',
                cursor: 'pointer', userSelect: 'none', fontVariantNumeric: 'tabular-nums',
                opacity: timerVisible ? 1 : 0.3,
              }}
              title="Click to show/hide timer"
            >
              {timerVisible ? timerStr : '--:--'}
            </span>

            {/* Pause button */}
            <button
              onClick={togglePause}
              style={{
                width: 36, height: 36, borderRadius: 8, border: '1px solid #e2e8f0',
                background: isPaused ? '#fef3c7' : '#fff', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18,
              }}
              title={isPaused ? 'Resume' : 'Pause'}
            >
              {isPaused ? '▶' : '⏸'}
            </button>
          </div>
        </div>

        {/* Question content */}
        <div style={{ flex: 1, overflow: 'auto', position: 'relative' }}>
          {/* Pause overlay */}
          {isPaused && (
            <div style={{
              position: 'absolute', inset: 0, zIndex: 50,
              backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
              background: 'rgba(255,255,255,0.6)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: '#1e293b', marginBottom: 8 }}>Quiz Paused</div>
              <div style={{ fontSize: 14, color: '#64748b', marginBottom: 24 }}>Your progress has been saved</div>
              <button
                onClick={togglePause}
                style={{
                  padding: '12px 48px', borderRadius: 12, border: 'none',
                  background: '#1e40af', color: '#fff', fontSize: 16, fontWeight: 600,
                  cursor: 'pointer', fontFamily: 'Inter, system-ui, sans-serif',
                }}
              >
                Resume
              </button>
            </div>
          )}

          <div style={{ maxWidth: 800, margin: '0 auto', width: '100%', padding: '20px 24px' }}>
            {/* Topic badge */}
            {question.topic && (
              <span style={{
                display: 'inline-block', fontSize: 11, fontWeight: 500, color: '#1e40af',
                background: '#eff6ff', padding: '2px 10px', borderRadius: 10, marginBottom: 12,
              }}>
                {question.topic}
              </span>
            )}

            {/* Question image */}
            <div style={{
              background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0',
              overflow: 'hidden', marginBottom: 16,
            }}>
              <img
                src={question.image_url}
                alt={`Question ${currentQ + 1}`}
                style={{ width: '100%', display: 'block' }}
              />
            </div>

            {/* Option buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {question.options.map((opt, i) => {
                const isSel = selected === i;
                const label = String.fromCharCode(65 + i);
                return (
                  <button
                    key={i}
                    onClick={() => selectAnswer(question.id, i)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      padding: '13px 18px', width: '100%',
                      background: isSel ? '#eff6ff' : '#fff',
                      border: `2px solid ${isSel ? '#1e40af' : '#e2e8f0'}`,
                      borderRadius: 10, cursor: 'pointer',
                      textAlign: 'left' as const,
                      transition: 'all 0.15s ease',
                      fontFamily: 'Inter, system-ui, sans-serif',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSel) { e.currentTarget.style.borderColor = '#93c5fd'; e.currentTarget.style.background = '#fafbff'; }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSel) { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#fff'; }
                    }}
                  >
                    <span style={{
                      width: 22, height: 22, borderRadius: '50%',
                      border: isSel ? '2px solid #1e40af' : '2px solid #cbd5e1',
                      background: isSel ? '#1e40af' : 'transparent',
                      flexShrink: 0, transition: 'all 0.15s ease',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {isSel && <span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>&#10003;</span>}
                    </span>
                    <span style={{
                      flex: 1, fontSize: 15, color: isSel ? '#1e40af' : '#374151',
                      fontWeight: isSel ? 600 : 400,
                    }}>
                      <span style={{ fontWeight: 600, marginRight: 8, color: isSel ? '#1e40af' : '#94a3b8' }}>
                        {label}
                      </span>
                      {opt}
                    </span>
                    {/* Keyboard hint */}
                    <span style={{ fontSize: 11, color: '#cbd5e1', fontWeight: 400 }}>
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '12px 24px', gap: 24, flexShrink: 0,
          background: '#fff', borderTop: '1px solid #e2e8f0',
        }}>
          <button onClick={() => goTo(currentQ - 1)} disabled={isFirst} style={{
            ...navBtn, opacity: isFirst ? 0.35 : 1, cursor: isFirst ? 'default' : 'pointer',
          }}>
            ← Previous
          </button>

          <span style={{ fontSize: 14, fontWeight: 600, color: '#1e293b', minWidth: 60, textAlign: 'center' }}>
            Q{currentQ + 1} / {totalCount}
          </span>

          <button onClick={() => goTo(currentQ + 1)} disabled={isLast} style={{
            ...navBtn, opacity: isLast ? 0.35 : 1, cursor: isLast ? 'default' : 'pointer',
          }}>
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

const btnSecondary: React.CSSProperties = {
  padding: '10px 24px', borderRadius: 8, border: '1px solid #e2e8f0',
  background: '#fff', color: '#334155', fontSize: 14, fontWeight: 500, cursor: 'pointer',
  fontFamily: 'Inter, system-ui, sans-serif',
};

const navBtn: React.CSSProperties = {
  padding: '8px 20px', borderRadius: 8, border: '1px solid #e2e8f0',
  background: '#fff', color: '#334155', fontSize: 14, fontWeight: 500,
  fontFamily: 'Inter, system-ui, sans-serif', transition: 'all 0.15s ease',
};
