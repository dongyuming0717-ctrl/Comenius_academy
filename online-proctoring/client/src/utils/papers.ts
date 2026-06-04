import type { Paper } from '../sdk/types';

export function filterTMUA(papers: Paper[]): Paper[] {
  return papers.filter(p => p.subject !== 'economics');
}
