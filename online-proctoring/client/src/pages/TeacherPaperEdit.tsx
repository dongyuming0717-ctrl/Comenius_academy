import { useEffect, useState, type FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TopNav } from '../components/TopNav';
import { supabase } from '../supabase';
import type { Question } from '../sdk/types';
import { useLocale } from '../i18n/LocaleContext';

const TOPIC_OPTIONS = [
  'algebra', 'geometry', 'trigonometry', 'calculus', 'statistics',
  'number_theory', 'logic', 'functions', 'sequences', 'probability',
  'general',
];

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 14px', border: '1px solid #d1d5db',
  borderRadius: 8, fontSize: 14, outline: 'none',
  fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: '#374151',
};

function blankQuestion(): Question {
  return {
    id: crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    text: '',
    options: ['', '', '', ''],
    answer: 0,
    topic: 'algebra',
  };
}

export function TeacherPaperEdit() {
  const { t } = useLocale();
  const { paperId } = useParams<{ paperId?: string }>();
  const navigate = useNavigate();
  const isEdit = !!paperId;

  // Paper metadata
  const [title, setTitle] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [sitting, setSitting] = useState('');
  const [paperNumber, setPaperNumber] = useState<1 | 2>(1);
  const [duration, setDuration] = useState(75);
  const [totalMarks, setTotalMarks] = useState(20);
  const [topicsStr, setTopicsStr] = useState('');

  // Questions
  const [questions, setQuestions] = useState<Question[]>([]);
  const [expandedQ, setExpandedQ] = useState<number | null>(null);

  // State
  const [loading, setLoading] = useState(true);
  const [savingMeta, setSavingMeta] = useState(false);
  const [savingQuestions, setSavingQuestions] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [paperSaved, setPaperSaved] = useState(false);

  useEffect(() => {
    if (!isEdit) { setLoading(false); setPaperSaved(false); return; }
    async function load() {
      const { data, error: err } = await supabase
        .from('papers').select('*').eq('id', paperId).single();
      if (err || !data) {
        setError(err?.message || t('teacherPaperEdit.paperNotFound'));
        setLoading(false);
        return;
      }
      setTitle(data.title);
      setYear(data.year);
      setSitting(data.sitting);
      setPaperNumber(data.paper_number);
      setDuration(data.duration_minutes);
      setTotalMarks(data.total_marks);
      setTopicsStr((data.topics || []).join(', '));
      setQuestions(data.questions || []);
      setPaperSaved(true);
      setLoading(false);
    }
    load();
  }, [paperId, isEdit]);

  const handleSaveMeta = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSavingMeta(true);

    const topics = topicsStr.split(',').map(t => t.trim()).filter(Boolean);
    const payload = {
      title,
      year,
      sitting,
      paper_number: paperNumber,
      duration_minutes: duration,
      total_marks: totalMarks,
      topics,
      questions: isEdit ? undefined : [], // don't overwrite existing questions on edit
    };

    let result;
    if (isEdit) {
      result = await supabase.from('papers').update(payload).eq('id', paperId!).select('id').single();
    } else {
      result = await supabase.from('papers').insert({ ...payload, questions: [] }).select('id').single();
    }

    setSavingMeta(false);

    if (result.error) {
      setError(result.error.message);
    } else {
      setSuccess(t('teacherPaperEdit.metaSavedSuccess'));
      setPaperSaved(true);
      // If new paper, redirect to edit mode
      if (!isEdit && result.data) {
        navigate(`/teacher/papers/${result.data.id}/edit`, { replace: true });
      }
    }
  };

  const handleSaveQuestions = async () => {
    if (!paperId) return;
    setError('');
    setSuccess('');
    setSavingQuestions(true);

    // Validate questions
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.text.trim()) { setError(t('teacherPaperEdit.validationNoText').replace('{n}', String(i + 1))); setSavingQuestions(false); return; }
      if (q.options.some(o => !o.trim())) { setError(t('teacherPaperEdit.validationEmptyOptions').replace('{n}', String(i + 1))); setSavingQuestions(false); return; }
      if (q.answer < 0 || q.answer >= q.options.length) { setError(t('teacherPaperEdit.validationInvalidAnswer').replace('{n}', String(i + 1))); setSavingQuestions(false); return; }
    }

    const { error: err } = await supabase
      .from('papers')
      .update({ questions })
      .eq('id', paperId);

    setSavingQuestions(false);
    if (err) { setError(err.message); }
    else { setSuccess(t('teacherPaperEdit.questionsSavedSuccess')); }
  };

  const handleQuestionChange = (index: number, field: keyof Question, value: any) => {
    setQuestions(prev => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleOptionChange = (qIndex: number, optIndex: number, value: string) => {
    setQuestions(prev => {
      const next = [...prev];
      const opts = [...next[qIndex].options];
      opts[optIndex] = value;
      next[qIndex] = { ...next[qIndex], options: opts };
      return next;
    });
  };

  const handleAddOption = (qIndex: number) => {
    setQuestions(prev => {
      const next = [...prev];
      next[qIndex] = { ...next[qIndex], options: [...next[qIndex].options, ''] };
      return next;
    });
  };

  const handleRemoveOption = (qIndex: number, optIndex: number) => {
    setQuestions(prev => {
      const next = [...prev];
      const opts = next[qIndex].options.filter((_, i) => i !== optIndex);
      let answer = next[qIndex].answer;
      if (answer === optIndex) answer = 0;
      else if (answer > optIndex) answer--;
      next[qIndex] = { ...next[qIndex], options: opts, answer };
      return next;
    });
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', fontFamily: "'Geist', system-ui, -apple-system, sans-serif", background: '#ffffff' }}>
        <TopNav currentPage="teacher" />
        <div style={{ padding: 40, textAlign: 'center', color: '#9ca3af' }}>{t('teacherPaperEdit.loading')}</div>
      </div>
    );
  }

  const cardStyle: React.CSSProperties = {
    background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb',
    padding: '24px 28px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', marginBottom: 20,
  };

  const sectionH2: React.CSSProperties = {
    margin: '0 0 16px', fontSize: 16, fontWeight: 600, color: '#1f2937',
    fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
  };

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Geist', system-ui, -apple-system, sans-serif", background: '#ffffff' }}>
      <TopNav currentPage="teacher" />

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px 20px 60px' }}>
        <button onClick={() => navigate('/teacher/papers')} style={{
          background: 'none', border: 'none', color: '#1e40af', cursor: 'pointer',
          fontSize: 13, padding: 0, marginBottom: 16,
          fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
        }}>&larr; {t('teacherPaperEdit.backToPapers')}</button>

        <h1 style={{ margin: '0 0 20px', fontSize: 24, fontWeight: 600, color: '#111' }}>
          {isEdit ? t('teacherPaperEdit.editPaperTitle') : t('teacherPaperEdit.newPaperTitle')}
        </h1>

        {/* Paper Metadata Form */}
        <div style={cardStyle}>
          <h2 style={sectionH2}>{t('teacherPaperEdit.paperDetailsSection')}</h2>
          <form onSubmit={handleSaveMeta} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', gap: 14 }}>
              <div style={{ flex: 2 }}>
                <label style={labelStyle}>{t('teacherPaperEdit.titleLabel')}</label>
                <input value={title} onChange={e => setTitle(e.target.value)} required
                  placeholder={t('teacherPaperEdit.titlePlaceholder')} style={inputStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>{t('teacherPaperEdit.sittingLabel')}</label>
                <input value={sitting} onChange={e => setSitting(e.target.value)} required
                  placeholder={t('teacherPaperEdit.sittingPlaceholder')} style={inputStyle} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 14 }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>{t('teacherPaperEdit.yearLabel')}</label>
                <input type="number" value={year} onChange={e => setYear(Number(e.target.value))} required
                  min={2000} max={2100} style={inputStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>{t('teacherPaperEdit.paperNumberLabel')}</label>
                <select value={paperNumber} onChange={e => setPaperNumber(Number(e.target.value) as 1 | 2)}
                  style={{ ...inputStyle, cursor: 'pointer' }}>
                  <option value={1}>{t('teacherPaperEdit.paper1Option')}</option>
                  <option value={2}>{t('teacherPaperEdit.paper2Option')}</option>
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>{t('teacherPaperEdit.durationLabel')}</label>
                <input type="number" value={duration} onChange={e => setDuration(Number(e.target.value))}
                  min={1} max={300} style={inputStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>{t('teacherPaperEdit.totalMarksLabel')}</label>
                <input type="number" value={totalMarks} onChange={e => setTotalMarks(Number(e.target.value))}
                  min={1} max={200} style={inputStyle} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>{t('teacherPaperEdit.topicsLabel')}</label>
              <input value={topicsStr} onChange={e => setTopicsStr(e.target.value)}
                placeholder={t('teacherPaperEdit.topicsPlaceholder')} style={inputStyle} />
            </div>

            {error && (
              <div style={{
                padding: '10px 14px', background: '#fef2f2', borderRadius: 8,
                border: '1px solid #fecaca', color: '#dc2626', fontSize: 13,
              }}>{error}</div>
            )}
            {success && (
              <div style={{
                padding: '10px 14px', background: '#f0fdf4', borderRadius: 8,
                border: '1px solid #bbf7d0', color: '#16a34a', fontSize: 13,
              }}>{success}</div>
            )}

            <button type="submit" disabled={savingMeta} style={{
              alignSelf: 'flex-start', padding: '10px 24px', background: savingMeta ? '#93c5fd' : '#1e40af',
              color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer',
              fontSize: 14, fontWeight: 500,
              fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
            }}>{savingMeta ? t('teacherPaperEdit.savingMetaButton') : isEdit ? t('teacherPaperEdit.savePaperButton') : t('teacherPaperEdit.createPaperButton')}</button>
          </form>
        </div>

        {/* Questions Editor */}
        {paperSaved && (
          <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ ...sectionH2, marginBottom: 0 }}>{t('teacherPaperEdit.questionsSection').replace('{count}', String(questions.length))}</h2>
              <button onClick={handleSaveQuestions} disabled={savingQuestions} style={{
                padding: '8px 18px', background: savingQuestions ? '#93c5fd' : '#1e40af',
                color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer',
                fontSize: 13, fontWeight: 500,
                fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
              }}>{savingQuestions ? t('teacherPaperEdit.savingQuestionsButton') : t('teacherPaperEdit.saveQuestionsButton')}</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {questions.map((q, qi) => {
                const isExpanded = expandedQ === qi;
                return (
                  <div key={q.id} style={{
                    border: isExpanded ? '2px solid #306ca0' : '1px solid #e5e7eb',
                    borderRadius: 8, overflow: 'hidden',
                  }}>
                    {/* Question header */}
                    <div onClick={() => setExpandedQ(isExpanded ? null : qi)} style={{
                      padding: '12px 16px', background: isExpanded ? '#eff6ff' : '#fafafa',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12,
                    }}>
                      <span style={{
                        width: 26, height: 26, borderRadius: '50%', background: '#1e40af', color: '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 12, fontWeight: 600, flexShrink: 0,
                      }}>{qi + 1}</span>
                      <span style={{ flex: 1, fontSize: 13, color: '#1f2937', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {q.text || t('teacherPaperEdit.emptyQuestionText')}
                      </span>
                      <span style={{
                        fontSize: 11, padding: '2px 8px', borderRadius: 10,
                        background: '#eff6ff', color: '#1e40af', fontWeight: 500,
                      }}>{q.topic}</span>
                      <span style={{ fontSize: 12, color: '#9ca3af' }}>{t('teacherPaperEdit.optionsCount').replace('{count}', String(q.options.length))}</span>
                      <button onClick={e => {
                        e.stopPropagation();
                        setQuestions(prev => prev.filter((_, i) => i !== qi));
                        if (isExpanded) setExpandedQ(null);
                      }} style={{
                        padding: '2px 8px', background: '#fee2e2', color: '#ef4444',
                        border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 11,
                        fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
                      }}>{t('teacherPaperEdit.deleteQuestionButton')}</button>
                    </div>

                    {/* Expanded editor */}
                    {isExpanded && (
                      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div>
                          <label style={labelStyle}>{t('teacherPaperEdit.questionTextLabel')}</label>
                          <input value={q.text} onChange={e => handleQuestionChange(qi, 'text', e.target.value)}
                            placeholder={t('teacherPaperEdit.questionTextPlaceholder')} style={inputStyle} />
                        </div>
                        <div>
                          <label style={labelStyle}>{t('teacherPaperEdit.imageUrlLabel')}</label>
                          <input value={q.image_url || ''} onChange={e => handleQuestionChange(qi, 'image_url', e.target.value || undefined)}
                            placeholder={t('teacherPaperEdit.imageUrlPlaceholder')} style={inputStyle} />
                        </div>
                        <div style={{ display: 'flex', gap: 14 }}>
                          <div style={{ flex: 1 }}>
                            <label style={labelStyle}>{t('teacherPaperEdit.topicLabel')}</label>
                            <select value={q.topic || 'general'} onChange={e => handleQuestionChange(qi, 'topic', e.target.value)}
                              style={{ ...inputStyle, cursor: 'pointer' }}>
                              {TOPIC_OPTIONS.map(t => (
                                <option key={t} value={t}>{t}</option>
                              ))}
                            </select>
                          </div>
                          <div style={{ flex: 1 }}>
                            <label style={labelStyle}>{t('teacherPaperEdit.correctAnswerLabel')}</label>
                            <input type="number" value={q.answer} onChange={e => handleQuestionChange(qi, 'answer', Number(e.target.value))}
                              min={0} max={q.options.length - 1} style={inputStyle} />
                          </div>
                        </div>

                        {/* Options */}
                        <div>
                          <label style={labelStyle}>{t('teacherPaperEdit.optionsLabel')}</label>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            {q.options.map((opt, oi) => (
                              <div key={oi} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span style={{
                                  width: 22, height: 22, borderRadius: '50%',
                                  background: q.answer === oi ? '#16a34a' : '#e2e8f0',
                                  color: q.answer === oi ? '#fff' : '#6b7280',
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  fontSize: 11, fontWeight: 600, flexShrink: 0,
                                }}>{String.fromCharCode(65 + oi)}</span>
                                <input value={opt} onChange={e => handleOptionChange(qi, oi, e.target.value)}
                                  placeholder={t('teacherPaperEdit.optionPlaceholder').replace('{letter}', String.fromCharCode(65 + oi))}
                                  style={{ ...inputStyle, flex: 1 }} />
                                {q.options.length > 2 && (
                                  <button onClick={() => handleRemoveOption(qi, oi)} style={{
                                    padding: '4px 8px', background: '#fee2e2', color: '#ef4444',
                                    border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 11,
                                    fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
                                  }}>x</button>
                                )}
                              </div>
                            ))}
                          </div>
                          <button onClick={() => handleAddOption(qi)} style={{
                            marginTop: 8, padding: '4px 12px', background: '#f0f0f0', color: '#374151',
                            border: '1px dashed #d1d5db', borderRadius: 4, cursor: 'pointer', fontSize: 12,
                            fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
                          }}>{t('teacherPaperEdit.addOptionButton')}</button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <button onClick={() => {
              setQuestions(prev => [...prev, blankQuestion()]);
              setExpandedQ(questions.length);
            }} style={{
              marginTop: 12, width: '100%', padding: '10px', background: '#f0f0f0', color: '#374151',
              border: '1px dashed #d1d5db', borderRadius: 6, cursor: 'pointer', fontSize: 13,
              fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
            }}>{t('teacherPaperEdit.addQuestionButton')}</button>
          </div>
        )}
      </div>
    </div>
  );
}
