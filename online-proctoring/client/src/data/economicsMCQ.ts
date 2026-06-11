import { economicsIGCSEPapers, getPaperQuestions as getIG } from './economicsIGCSE';
import { economicsASPapers, getPaperQuestions as getAS } from './economicsAS';
import { economicsA2Papers, getPaperQuestions as getA2 } from './economicsA2';
import type { MCQPaper, MCQQuestion } from './economicsIGCSE';

export type { MCQPaper, MCQQuestion };

const levelMap: Record<string, MCQPaper[]> = {
  igcse: economicsIGCSEPapers,
  'as-level': economicsASPapers,
  'a2-level': economicsA2Papers,
};

export function getPapersForLevel(level: string): MCQPaper[] {
  return levelMap[level] || [];
}

export function getPaperQuestions(paperId: string): MCQQuestion[] | null {
  return getIG(paperId) || getAS(paperId) || getA2(paperId);
}
