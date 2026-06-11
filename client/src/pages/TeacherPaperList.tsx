import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TopNav } from '../components/TopNav';
import { supabase } from '../supabase';
import type { Paper } from '../sdk/types';
import { useLocale } from '../i18n/LocaleContext';

export function TeacherPaperList() {
  const { t } = useLocale();
  const navigate = useNavigate();
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPapers = async () => {
    setLoading(true);
    setError('');
    const { data, error: err } = await supabase
      .from('papers')
      .select('id, title, paper_number, year, sitting, duration_minutes, total_marks, topics, created_at')
      .order('year', { ascending: false })
      .order('paper_number');

    if (err) {
      setError(err.message);
    } else if (data) {
      setPapers(data as Paper[]);
    }
    setLoading(false);
  };

  useEffect(() => { fetchPapers(); }, []);

  const handleDelete = async (paper: Paper) => {
    if (!window.confirm(t('teacherPaperList.deleteConfirm').replace('{title}', paper.title))) return;
    const { error: err } = await supabase.from('papers').delete().eq('id', paper.id);
    if (err) { alert(err.message); return; }
    setPapers(prev => prev.filter(p => p.id !== paper.id));
  };

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: '#ffffff' }}>
      <TopNav currentPage="teacher" />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 20px 60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <h1 style={{ margin: '0 0 4px', fontSize: 26, fontWeight: 600, color: '#111' }}>
              {t('teacherPaperList.pageTitle')}
            </h1>
            <p style={{ margin: 0, fontSize: 14, color: '#6b7280' }}>
              {papers.length} paper{papers.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Link to="/teacher/papers/new" style={{
            padding: '10px 22px', background: '#1e40af', color: '#fff', textDecoration: 'none',
            borderRadius: 6, fontSize: 14, fontWeight: 500,
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          }}>
            {t('teacherPaperList.newPaperLink')}
          </Link>
        </div>

        {error && (
          <div style={{
            padding: '10px 14px', background: '#fef2f2', borderRadius: 8,
            border: '1px solid #fecaca', color: '#dc2626', fontSize: 13, marginBottom: 16,
          }}>{error}</div>
        )}

        {loading ? (
          <p style={{ color: '#9ca3af', fontSize: 13 }}>{t('teacherPaperList.loading')}</p>
        ) : papers.length === 0 ? (
          <p style={{ color: '#9ca3af', fontSize: 13 }}>{t('teacherPaperList.noPapers')}</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {papers.map(p => (
              <div key={p.id} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 20px', background: '#fff', borderRadius: 8,
                border: '1px solid #e5e7eb', boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
              }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#1f2937' }}>{p.title}</div>
                  <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 3 }}>
                    Paper {p.paper_number} &middot; {p.year} {p.sitting} &middot; {p.duration_minutes} min &middot; {p.total_marks} marks
                    {p.topics && p.topics.length > 0 && (
                      <span> &middot; {p.topics.slice(0, 3).join(', ')}{p.topics.length > 3 ? '...' : ''}</span>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => navigate(`/teacher/papers/${p.id}/edit`)} style={{
                    padding: '5px 14px', background: '#1e40af', color: '#fff', border: 'none',
                    borderRadius: 5, cursor: 'pointer', fontSize: 12, fontWeight: 500,
                    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                  }}>{t('teacherPaperList.editButton')}</button>
                  <button onClick={() => handleDelete(p)} style={{
                    padding: '5px 14px', background: '#fff', color: '#ef4444',
                    border: '1px solid #fecaca', borderRadius: 5, cursor: 'pointer', fontSize: 12,
                    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                  }}>{t('teacherPaperList.deleteButton')}</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
