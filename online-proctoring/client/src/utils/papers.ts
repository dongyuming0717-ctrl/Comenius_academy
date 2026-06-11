import type { Paper } from '../sdk/types';

export function filterTMUA(papers: Paper[]): Paper[] {
  return papers.filter(p => {
    const title = (p.title || '').toLowerCase();
    const subject = (p.subject || '').toLowerCase();
    // Keep only TMUA papers — exclude economics, ENGAA, ESAT
    return (
      title.includes('tmua') ||
      subject === 'tmua'
    );
  });
}
