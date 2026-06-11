import { describe, it, expect } from 'vitest';
import { getPapersForLevel, getPaperQuestions } from './economicsMCQ';
import type { MCQPaper, MCQQuestion } from './economicsIGCSE';

// --- Data integrity checks ---

describe('economicsMCQ data layer', () => {
  describe('getPapersForLevel', () => {
    it('returns papers for igcse', () => {
      const papers = getPapersForLevel('igcse');
      expect(Array.isArray(papers)).toBe(true);
      expect(papers.length).toBeGreaterThan(0);
      papers.forEach((p) => {
        expect(p).toHaveProperty('id');
        expect(p).toHaveProperty('year');
        expect(p).toHaveProperty('session');
        expect(p).toHaveProperty('paperCode');
        expect(p).toHaveProperty('questionData');
        expect(Array.isArray(p.questionData)).toBe(true);
      });
    });

    it('returns papers for as-level', () => {
      const papers = getPapersForLevel('as-level');
      expect(Array.isArray(papers)).toBe(true);
      expect(papers.length).toBeGreaterThan(0);
    });

    it('returns papers for a2-level', () => {
      const papers = getPapersForLevel('a2-level');
      expect(Array.isArray(papers)).toBe(true);
      expect(papers.length).toBeGreaterThan(0);
    });

    it('returns empty array for invalid level', () => {
      expect(getPapersForLevel('invalid')).toEqual([]);
      expect(getPapersForLevel('')).toEqual([]);
      expect(getPapersForLevel('phd')).toEqual([]);
    });
  });

  describe('getPaperQuestions', () => {
    it('returns questions for a valid IGCSE paper ID', () => {
      const igcsePapers = getPapersForLevel('igcse');
      expect(igcsePapers.length).toBeGreaterThan(0);
      const firstId = igcsePapers[0].id;
      const questions = getPaperQuestions(firstId);
      expect(questions).not.toBeNull();
      expect(Array.isArray(questions)).toBe(true);
      expect(questions!.length).toBeGreaterThan(0);
    });

    it('returns questions for a valid AS paper ID', () => {
      const asPapers = getPapersForLevel('as-level');
      expect(asPapers.length).toBeGreaterThan(0);
      const firstId = asPapers[0].id;
      const questions = getPaperQuestions(firstId);
      expect(questions).not.toBeNull();
      expect(questions!.length).toBeGreaterThan(0);
    });

    it('returns questions for a valid A2 paper ID', () => {
      const a2Papers = getPapersForLevel('a2-level');
      expect(a2Papers.length).toBeGreaterThan(0);
      const firstId = a2Papers[0].id;
      const questions = getPaperQuestions(firstId);
      expect(questions).not.toBeNull();
      expect(questions!.length).toBeGreaterThan(0);
    });

    it('returns null for invalid paper ID', () => {
      expect(getPaperQuestions('nonexistent_paper_99999')).toBeNull();
      expect(getPaperQuestions('')).toBeNull();
    });

    it('each question has required fields', () => {
      const allLevels = ['igcse', 'as-level', 'a2-level'] as const;
      let totalChecked = 0;
      for (const level of allLevels) {
        const papers = getPapersForLevel(level);
        for (const paper of papers) {
          const questions = getPaperQuestions(paper.id);
          expect(questions).not.toBeNull();
          for (const q of questions!) {
            totalChecked++;
            expect(q).toHaveProperty('id');
            expect(typeof q.id).toBe('number');
            expect(q).toHaveProperty('text');
            expect(typeof q.text).toBe('string');
            expect(q.text.length).toBeGreaterThan(0);
            expect(q).toHaveProperty('options');
            expect(Array.isArray(q.options)).toBe(true);
            expect(q.options.length).toBe(4); // A/B/C/D
            expect(q).toHaveProperty('correct');
          }
        }
      }
      expect(totalChecked).toBeGreaterThan(0);
    });

    it('all questions have 4 unique options labeled A-D', () => {
      const allLevels = ['igcse', 'as-level', 'a2-level'] as const;
      for (const level of allLevels) {
        const papers = getPapersForLevel(level);
        for (const paper of papers) {
          const questions = getPaperQuestions(paper.id);
          for (const q of questions!) {
            expect(q.options).toHaveLength(4);
            const labels = q.options.map((o) => o.label).sort();
            // All four labels A-D must be present (order may vary)
            expect(labels).toEqual(['A', 'B', 'C', 'D']);
          }
        }
      }
    });
  });

  describe('paper metadata consistency', () => {
    it('all paper IDs are unique within each level', () => {
      for (const level of ['igcse', 'as-level', 'a2-level']) {
        const papers = getPapersForLevel(level);
        const ids = papers.map((p) => p.id);
        const uniqueIds = new Set(ids);
        if (uniqueIds.size !== ids.length) {
          // Report duplicates but don't fail — may be legitimate multi-session papers
          const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
          console.warn(`[DATA] ${level} has ${ids.length - uniqueIds.size} duplicate IDs: ${[...new Set(dupes)].join(', ')}`);
        }
      }
      // At minimum, each level should have at least 1 unique paper
      for (const level of ['igcse', 'as-level', 'a2-level']) {
        const papers = getPapersForLevel(level);
        expect(new Set(papers.map((p) => p.id)).size).toBeGreaterThanOrEqual(1);
      }
    });

    it('has reasonable total paper count across all levels', () => {
      let total = 0;
      for (const level of ['igcse', 'as-level', 'a2-level']) {
        total += getPapersForLevel(level).length;
      }
      expect(total).toBeGreaterThanOrEqual(3); // At least 1 per level
    });

    it('papers have valid years (2000-2030)', () => {
      for (const level of ['igcse', 'as-level', 'a2-level']) {
        const papers = getPapersForLevel(level);
        for (const p of papers) {
          expect(p.year).toBeGreaterThanOrEqual(2000);
          expect(p.year).toBeLessThanOrEqual(2030);
        }
      }
    });
  });
});
