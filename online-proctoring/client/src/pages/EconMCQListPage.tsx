import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import { TopNav } from '../components/TopNav';

interface Paper {
  id: string;
  title: string;
  year: number;
  sitting: string;
  duration_minutes: number;
  total_marks: number;
  questions: any;
}

interface SessionInfo {
  sessionId: string;
  answered: number;
  total: number;
  currentQ: number;
}

export function EconMCQListPage() {
  const navigate = useNavigate();
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSessions, setActiveSessions] = useState<Record<string, SessionInfo>>({});
  const [pastScores, setPastScores] = useState<Record<string, { score: number; total: number; date: string }>>({});
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) { setLoading(false); return; }
      setUser(session.user);

      // Resolve internal user ID
      const { data: userRow } = await supabase
        .from('users').select('id').eq('auth_id', session.user.id).single();
      const internalUserId = userRow?.id;
      if (!internalUserId) { setLoading(false); return; }

      // Load econ papers
      const { data: papersData } = await supabase
        .from('papers')
        .select('*')
        .eq('subject', 'economics')
        .order('year', { ascending: false })
        .order('sitting', { ascending: false });

      const ps: Paper[] = (papersData || []).map((p: any) => ({
        ...p,
        questions: typeof p.questions === 'string' ? JSON.parse(p.questions) : p.questions,
      }));
      setPapers(ps);

      // Check for active sessions (resume capability)
      const { data: sessions } = await supabase
        .from('exam_sessions')
        .select('*')
        .eq('user_id', internalUserId)
        .eq('status', 'active');

      const activeMap: Record<string, SessionInfo> = {};
      for (const s of (sessions || [])) {
        const pid = s.paper_id;
        const paperQ = ps.find(p => p.id === pid)?.questions || [];
        const total = Array.isArray(paperQ) ? paperQ.length : (typeof paperQ === 'object' ? Object.keys(paperQ).length : 30);
        activeMap[pid] = {
          sessionId: s.id,
          answered: Object.keys(s.answers || {}).length,
          total,
          currentQ: s.current_question_index || 0,
        };
      }
      setActiveSessions(activeMap);

      // Load completed scores
      const { data: completed } = await supabase
        .from('exam_sessions')
        .select('*')
        .eq('user_id', internalUserId)
        .eq('status', 'completed')
        .order('ended_at', { ascending: false })
        .limit(50);

      const scoreMap: Record<string, { score: number; total: number; date: string }> = {};
      for (const s of (completed || [])) {
        if (!scoreMap[s.paper_id]) {
          scoreMap[s.paper_id] = {
            score: s.score || 0,
            total: ps.find(p => p.id === s.paper_id)?.total_marks || 30,
            date: new Date(s.ended_at).toLocaleDateString(),
          };
        }
      }
      setPastScores(scoreMap);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  function startPaper(paperId: string) {
    navigate(`/econ-mcq/exam?paperId=${paperId}`);
  }

  if (loading) {
    return (
      <div>
        <TopNav currentPage="econ-mcq" />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', color: '#666' }}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div>
      <TopNav currentPage="econ-mcq" />
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: 24 }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>IGCSE Economics MCQ</h1>
          <p style={{ fontSize: 16, color: '#64748b' }}>Practice multiple choice questions — Paper 1</p>
        </div>

        {papers.length === 0 && (
          <div style={{ textAlign: 'center', padding: 48, color: '#64748b', fontSize: 16 }}>
            No Economics MCQ papers available yet.
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {papers.map((paper) => {
            const qCount = Array.isArray(paper.questions) ? paper.questions.length : 30;
            const active = activeSessions[paper.id];
            const pastScore = pastScores[paper.id];

            return (
              <div key={paper.id} style={{
                background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
              }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>{paper.title}</div>
                  <div style={{ fontSize: 14, color: '#64748b' }}>
                    {qCount} questions &middot; {paper.duration_minutes} min &middot; {paper.sitting} {paper.year}
                  </div>
                  {active && (
                    <div style={{ marginTop: 8, fontSize: 13, color: '#3b82f6', fontWeight: 500 }}>
                      In progress — {active.answered}/{active.total} answered (Q{active.currentQ + 1})
                    </div>
                  )}
                  {pastScore && !active && (
                    <div style={{ marginTop: 8, fontSize: 13, color: '#22c55e', fontWeight: 500 }}>
                      Last score: {pastScore.score}/{pastScore.total} ({pastScore.date})
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {pastScore && (
                    <button
                      onClick={() => startPaper(paper.id)}
                      style={{
                        padding: '10px 20px', borderRadius: 8, border: '1px solid #e2e8f0',
                        background: '#fff', color: '#334155', fontSize: 14, fontWeight: 500, cursor: 'pointer',
                      }}
                    >
                      {active ? 'Continue' : 'Retry'}
                    </button>
                  )}
                  <button
                    onClick={() => startPaper(paper.id)}
                    style={{
                      padding: '10px 24px', borderRadius: 8, border: 'none',
                      background: active ? '#3b82f6' : '#1e40af', color: '#fff',
                      fontSize: 14, fontWeight: 600, cursor: 'pointer',
                    }}
                  >
                    {active ? 'Continue' : 'Start'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
