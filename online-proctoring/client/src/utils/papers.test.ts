import { describe, it, expect } from 'vitest';
import { filterTMUA } from './papers';

describe('filterTMUA', () => {
  it('removes economics papers', () => {
    const papers = [
      { id: '1', title: 'TMUA 2023', subject: 'tmua' },
      { id: '2', title: 'Economics 0455', subject: 'economics' },
      { id: '3', title: 'TMUA 2022', subject: 'tmua' },
    ] as any;

    const result = filterTMUA(papers);
    expect(result).toHaveLength(2);
    expect(result.every(p => p.subject !== 'economics')).toBe(true);
  });

  it('returns empty when all are economics', () => {
    const papers = [
      { id: '1', title: 'Econ 1', subject: 'economics' },
      { id: '2', title: 'Econ 2', subject: 'economics' },
    ] as any;

    expect(filterTMUA(papers)).toHaveLength(0);
  });

  it('returns all when no economics', () => {
    const papers = [
      { id: '1', title: 'TMUA 1', subject: 'tmua' },
      { id: '2', title: 'TMUA 2', subject: 'tmua' },
    ] as any;

    expect(filterTMUA(papers)).toHaveLength(2);
  });
});
