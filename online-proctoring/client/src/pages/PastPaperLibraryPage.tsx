import { useState, useEffect, useMemo } from 'react';
import { TopNav } from '../components/TopNav';

interface Paper {
  id: number; subject_code: string; subject_name: string;
  year: number; season: string; paper_number: string;
  type: 'qp' | 'ms' | 'er' | 'ir' | 'in' | 'gt';
  filename: string; relative_path: string; file_size: number;
}
interface Subject { subject_code: string; subject_name: string; }
interface Group {
  subject_code: string; subject_name: string; year: number; season: string; paper_number: string;
  qp: Paper | null; ms: Paper | null; er: Paper | null; ir: Paper | null; in: Paper | null;
}

const API = '/cie-papers/api';

const TYPE_INFO = {
  qp: { label: 'QP', full: 'Question Paper' },
  ms: { label: 'MS', full: 'Marking Scheme' },
  er: { label: 'ER', full: 'Examiner Report' },
  ir: { label: 'IR', full: 'Investigator Report' },
  in: { label: 'IN', full: 'Insert' },
} as const;

export function PastPaperLibraryPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [subject, setSubject] = useState('');
  const [year, setYear] = useState('');
  const [season, setSeason] = useState('');
  const [sort, setSort] = useState('relevance');
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [preview, setPreview] = useState<{ path: string; title: string } | null>(null);

  // Init: load subjects + years + total count (original init())
  useEffect(() => {
    Promise.all([
      fetch(`${API}/subjects`).then(r => r.json()),
      fetch(`${API}/years`).then(r => r.json()),
      fetch(`${API}/papers?search=`).then(r => r.json()).then(d => setTotalCount((d as Paper[]).length)),
    ]).then(([s, y]) => {
      setSubjects(s as Subject[]);
      setYears(y as number[]);
    });
  }, []);

  // Search: fetch papers (original loadAndRender())
  function search() {
    setLoading(true);
    const params = new URLSearchParams();
    if (subject) params.set('subject', subject);
    if (year) params.set('year', year);
    if (season) params.set('season', season);
    fetch(`${API}/papers?${params}`)
      .then(r => r.json())
      .then(d => { setPapers(d as Paper[]); setLoading(false); setSearched(true); })
      .catch(() => setLoading(false));
  }

  // Group papers (original groupPapers())
  const groups = useMemo(() => {
    const map = new Map<string, Group>();
    for (const p of papers) {
      const key = `${p.subject_code}|${p.year}|${p.season}|${p.paper_number}`;
      if (!map.has(key)) {
        map.set(key, { subject_code: p.subject_code, subject_name: p.subject_name, year: p.year, season: p.season, paper_number: p.paper_number, qp: null, ms: null, er: null, ir: null, in: null });
      }
      const g = map.get(key)!;
      if (p.type === 'qp') g.qp = p; else if (p.type === 'ms') g.ms = p; else if (p.type === 'er') g.er = p; else if (p.type === 'ir') g.ir = p; else if (p.type === 'in') g.in = p;
    }
    let arr = [...map.values()];
    if (sort === 'newest') arr.sort((a, b) => b.year - a.year || a.subject_code.localeCompare(b.subject_code));
    else if (sort === 'oldest') arr.sort((a, b) => a.year - b.year || a.subject_code.localeCompare(b.subject_code));
    return arr;
  }, [papers, sort]);

  const s: React.CSSProperties = { padding: '10px 14px', fontSize: 14, border: '1px solid #d1d5db', borderRadius: 8, outline: 'none', background: '#fff', fontFamily: "'Inter', system-ui, -apple-system, sans-serif", color: '#374151' };

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
      <TopNav currentPage="past-papers" />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 80px' }}>
        {/* Header — original .page-header */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 28, fontWeight: 600, color: '#111827', margin: '0 0 8px' }}>Past Paper Library</h1>
          <p style={{ fontSize: 14, color: '#6b7280', margin: 0 }}>
            Browse and download past papers with marking schemes
            {totalCount > 0 && ` — ${totalCount.toLocaleString()} CIE papers`}
          </p>
        </div>

        {/* Filter Bar — original .filter-bar */}
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', padding: '16px 20px', marginBottom: 20, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontSize: 12, color: '#6b7280', fontWeight: 500 }}>Subject</label>
            <select value={subject} onChange={e => setSubject(e.target.value)} style={{ ...s, minWidth: 180 }}>
              <option value="">All Subjects</option>
              {subjects.map(s => <option key={s.subject_code} value={s.subject_code}>{s.subject_code} — {s.subject_name}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontSize: 12, color: '#6b7280', fontWeight: 500 }}>Year</label>
            <select value={year} onChange={e => setYear(e.target.value)} style={{ ...s, minWidth: 120 }}>
              <option value="">All Years</option>
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontSize: 12, color: '#6b7280', fontWeight: 500 }}>Session</label>
            <select value={season} onChange={e => setSeason(e.target.value)} style={{ ...s, minWidth: 140 }}>
              <option value="">All Sessions</option>
              {['Spring','Summer','Winter'].map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <button onClick={search} style={{ padding: '10px 20px', fontSize: 14, fontWeight: 500, color: '#fff', background: '#1e40af', border: 'none', borderRadius: 8, cursor: 'pointer', fontFamily: "'Inter', system-ui, -apple-system, sans-serif", display: 'flex', alignItems: 'center', gap: 6 }}>
            <SearchIcon /> Search
          </button>
        </div>

        {/* Results info — original .results-info */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ fontSize: 14, color: '#6b7280' }}>
            {!searched ? 'Use the filters above and click Search to browse past papers'
              : loading ? 'Loading...'
              : `Showing ${groups.length} past papers`}
          </span>
          <select value={sort} onChange={e => setSort(e.target.value)} style={{ ...s, minWidth: 130, fontSize: 13 }}>
            <option value="relevance">Most Relevant</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        {/* Paper list */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#9ca3af' }}>Loading...</div>
        ) : searched && groups.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#9ca3af' }}>No papers found matching your filters.</div>
        ) : !searched ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#9ca3af' }}>
            Select your subject, year, and session, then click <strong>Search</strong> to find past papers.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {groups.map((g, i) => {
              const code = `${g.subject_code}/${g.year}/${g.season}${g.paper_number ? `/P${g.paper_number}` : ''}`;
              return (
                <div key={i} style={{ background: '#fff', borderRadius: 8, border: '1px solid #e5e7eb', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: '#6b7280', marginBottom: 4 }}>{code}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{g.subject_name}</span>
                      <span style={{ fontSize: 10, color: '#1e40af', background: '#eff6ff', padding: '2px 6px', borderRadius: 8 }}>{g.subject_code.startsWith('97') || g.subject_code.startsWith('96') ? 'A-Level' : 'IGCSE'}</span>
                      {(g.qp || g.ms || g.er || g.ir || g.in) && (['qp','ms','er','ir','in'] as const).filter(t => g[t]).map(t => (
                        <span key={t} style={{ fontSize: 10, fontWeight: 600, padding: '2px 6px', borderRadius: 4, background: t === 'qp' ? '#eff6ff' : t === 'ms' ? '#fef3c7' : t === 'er' ? '#f0fdf4' : '#fdf2f8', color: t === 'qp' ? '#1e40af' : t === 'ms' ? '#d97706' : t === 'er' ? '#16a34a' : '#be185d' }}>{TYPE_INFO[t].label}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                    {(['qp','ms','er','ir','in'] as const).filter(t => g[t]).map(t => (
                      <div key={t} style={{ display: 'flex' }}>
                        <button onClick={() => setPreview({ path: g[t]!.relative_path, title: `${code} — ${TYPE_INFO[t].full}` })} style={{ padding: '6px 10px', fontSize: 12, border: '1px solid #d1d5db', borderRadius: '6px 0 0 6px', background: '#fff', cursor: 'pointer', fontFamily: "'Inter', system-ui, -apple-system, sans-serif", color: '#374151' }}><ViewIcon /> View {TYPE_INFO[t].label}</button>
                        <a href={`${API}/download/${encodeURI(g[t]!.relative_path)}`} style={{ padding: '6px 10px', fontSize: 12, background: '#1e40af', color: '#fff', borderRadius: '0 6px 6px 0', textDecoration: 'none', fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}><DlIcon /></a>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Preview Modal — original #previewModal */}
        {preview && (
          <div onClick={() => setPreview(null)} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 12, width: '90%', maxWidth: 900, height: '85vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 25px 80px rgba(0,0,0,0.2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', borderBottom: '1px solid #e5e7eb' }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{preview.title}</span>
                <button onClick={() => setPreview(null)} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#6b7280' }}>&times;</button>
              </div>
              <iframe src={`${API}/pdf/${encodeURI(preview.path)}`} style={{ flex: 1, border: 'none' }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SearchIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>; }
function ViewIcon() { return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>; }
function DlIcon() { return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>; }
