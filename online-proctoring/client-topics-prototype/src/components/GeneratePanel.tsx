import { useState } from 'react';
import type { TopicTag, Question } from '../data/types';
import { TAG_LABEL, TAG_LIST, TAG_COLOR } from '../data/types';

interface Props {
  allQuestions: Question[];
  mastery: { topic: TopicTag; masteryLevel: number; confidence: number }[];
  onGenerate: (questions: Question[], config: GenerateConfig) => void;
}

export interface GenerateConfig {
  paperNumber: 1 | 2;
  mode: 'random' | 'adaptive' | 'diagnostic';
  difficultyFilter?: 'any' | 'easy' | 'medium+' | 'hard';
  focusTopics?: TopicTag[];
}

const PAPER1_DISTRIBUTION: Partial<Record<TopicTag, number>> = {
  algebra: 2, quadratics_polynomials: 2, inequalities: 1,
  functions: 2, transformations_graphs: 1, exponentials_logs: 2,
  trigonometry: 2, differentiation: 2, integration: 2,
  sequences_series: 1, coordinate_geometry: 2, number_theory: 1,
};
const PAPER2_DISTRIBUTION: Partial<Record<TopicTag, number>> = {
  algebra: 1, quadratics_polynomials: 1, inequalities: 1,
  functions: 1, transformations_graphs: 1, exponentials_logs: 1,
  trigonometry: 2, differentiation: 2, integration: 2,
  sequences_series: 1, coordinate_geometry: 2, number_theory: 2, logic_proof: 3,
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function GeneratePanel({ allQuestions, mastery, onGenerate }: Props) {
  const [paperNum, setPaperNum] = useState<1 | 2>(1);
  const [mode, setMode] = useState<GenerateConfig['mode']>('random');
  const [difficulty, setDifficulty] = useState<GenerateConfig['difficultyFilter']>('any');
  const [focusTopics, setFocusTopics] = useState<TopicTag[]>([]);

  const toggleFocusTopic = (tag: TopicTag) => {
    setFocusTopics(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const generate = () => {
    const distribution = paperNum === 1 ? PAPER1_DISTRIBUTION : PAPER2_DISTRIBUTION;
    let pool = allQuestions.filter(q => q.paperNumber === paperNum);

    // Difficulty filter
    if (difficulty === 'easy') pool = pool.filter(q => q.difficulty === 'easy');
    else if (difficulty === 'medium+') pool = pool.filter(q => q.difficulty !== 'easy');
    else if (difficulty === 'hard') pool = pool.filter(q => q.difficulty === 'hard');

    // Focus topics filter (narrow pool to selected topics)
    if (focusTopics.length > 0) {
      pool = pool.filter(q => focusTopics.some(t => q.topics.includes(t)));
    }

    const byTopic: Record<string, Question[]> = {};
    for (const q of pool) {
      if (!byTopic[q.primary_topic]) byTopic[q.primary_topic] = [];
      byTopic[q.primary_topic].push(q);
    }

    // Adjust distribution for adaptive mode
    let finalDist: Partial<Record<TopicTag, number>>;
    if (mode === 'random') {
      finalDist = { ...distribution };
    } else if (mode === 'adaptive') {
      finalDist = {};
      const masterMap = new Map(mastery.map(m => [m.topic, m]));
      for (const [tag] of Object.entries(distribution)) {
        const m = masterMap.get(tag as TopicTag);
        const priority = m ? (100 - m.masteryLevel) * m.confidence + (1 - m.confidence) * 50 : 50;
        // Map priority 0-100 to count: weak topics get +1-2 extra
        const base = distribution[tag as TopicTag] || 1;
        const extra = priority > 70 ? 2 : priority > 50 ? 1 : 0;
        finalDist[tag as TopicTag] = base + extra;
      }
    } else { // diagnostic: ensure coverage of all topics
      finalDist = {};
      const tags = focusTopics.length > 0 ? focusTopics : TAG_LIST.filter(t => t !== 'general');
      const perTopic = Math.max(1, Math.floor(18 / tags.length));
      for (const tag of tags) {
        finalDist[tag] = (distribution as any)[tag] ? Math.max((distribution as any)[tag], 1) : 1;
      }
    }

    const selected: Question[] = [];
    const usedIds = new Set<string>();

    for (const [tag, count] of Object.entries(finalDist)) {
      const candidates = (byTopic[tag] || []).filter(q => !usedIds.has(q.id));
      const picked = shuffle(candidates).slice(0, count);
      for (const q of picked) { selected.push(q); usedIds.add(q.id); }
    }

    // Fill remaining to reach 20
    const remaining = 20 - selected.length;
    if (remaining > 0) {
      const restPool = pool.filter(q => !usedIds.has(q.id));
      for (const q of shuffle(restPool).slice(0, remaining)) { selected.push(q); }
    }

    onGenerate(shuffle(selected), { paperNumber: paperNum, mode, difficultyFilter: difficulty, focusTopics });
  };

  const btnStyle = (active: boolean) => ({
    padding: '6px 16px', fontSize: 12, fontWeight: active ? 600 : 400,
    color: active ? '#fff' : '#64748b',
    background: active ? TAG_COLOR : '#f1f5f9',
    border: 'none', borderRadius: 20, cursor: 'pointer',
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  });

  return (
    <div style={{
      background: '#fff', borderRadius: 12,
      border: '1px solid #e2e8f0',
      padding: '20px 24px', marginBottom: 24,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: '#1e293b' }}>Generate Practice Paper</h3>
          <p style={{ margin: '2px 0 0', fontSize: 12, color: '#94a3b8' }}>
            {mode === 'random' && 'Balanced distribution matching the real TMUA exam'}
            {mode === 'adaptive' && 'More questions from your weakest topics'}
            {mode === 'diagnostic' && 'Covers every topic to find your blind spots'}
          </p>
        </div>
        <button onClick={generate}
          style={{
            padding: '10px 28px', fontSize: 14, fontWeight: 600,
            color: '#fff', background: TAG_COLOR, border: 'none',
            borderRadius: 8, cursor: 'pointer',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          }}>
          Generate 20 Questions
        </button>
      </div>

      {/* Mode selectors */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500, marginRight: 4 }}>Mode:</span>
        {(['random', 'adaptive', 'diagnostic'] as const).map(m => (
          <button key={m} onClick={() => setMode(m)} style={btnStyle(mode === m)}>
            {m === 'random' ? '🎲 Random' : m === 'adaptive' ? '🎯 Adaptive' : '🔍 Diagnostic'}
          </button>
        ))}

        <span style={{ width: 1, height: 20, background: '#e2e8f0', margin: '0 8px' }} />

        <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500, marginRight: 4 }}>Paper:</span>
        <button onClick={() => setPaperNum(1)} style={btnStyle(paperNum === 1)}>Paper 1</button>
        <button onClick={() => setPaperNum(2)} style={btnStyle(paperNum === 2)}>Paper 2</button>

        <span style={{ width: 1, height: 20, background: '#e2e8f0', margin: '0 8px' }} />

        <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500, marginRight: 4 }}>Difficulty:</span>
        {(['any', 'easy', 'medium+', 'hard'] as const).map(d => (
          <button key={d} onClick={() => setDifficulty(d)} style={btnStyle(difficulty === d)}>
            {d === 'any' ? 'Any' : d === 'medium+' ? 'Medium+ Only' : d.charAt(0).toUpperCase() + d.slice(1)}
          </button>
        ))}
      </div>

      {/* Focus topics */}
      <div>
        <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500, marginBottom: 6 }}>Focus Topics (optional — leave empty for full syllabus):</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {TAG_LIST.filter(t => t !== 'general').map(tag => (
            <button key={tag} onClick={() => toggleFocusTopic(tag)}
              style={{
                padding: '3px 12px', fontSize: 11, fontWeight: focusTopics.includes(tag) ? 600 : 400,
                color: focusTopics.includes(tag) ? '#fff' : '#64748b',
                background: focusTopics.includes(tag) ? TAG_COLOR : '#f8fafc',
                border: `1px solid ${focusTopics.includes(tag) ? TAG_COLOR : '#e2e8f0'}`,
                borderRadius: 14, cursor: 'pointer',
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              }}>
              {TAG_LABEL[tag]}
            </button>
          ))}
        </div>
      </div>

      {/* Distribution preview */}
      <div style={{ fontSize: 11, color: '#cbd5e1', marginTop: 12 }}>
        {Object.entries(paperNum === 1 ? PAPER1_DISTRIBUTION : PAPER2_DISTRIBUTION)
          .map(([tag, count]) => `${TAG_LABEL[tag as TopicTag] || tag} ×${count}`).join(' · ')}
      </div>
    </div>
  );
}
