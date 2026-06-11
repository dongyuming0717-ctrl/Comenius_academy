import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, FileText, Clock, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { subjectData } from './MCQSubject';
import { TopNav } from '../components/TopNav';
import { getPapersForLevel } from '../data/economicsMCQ';
import { useLocale } from '../i18n/LocaleContext';

const sessionKeys: Record<string, string> = {
  'May/June': 'mcqFullPapers.mayJune',
  'Oct/Nov': 'mcqFullPapers.octNov',
  'Feb/March': 'mcqFullPapers.febMarch',
};

const sessionColors: Record<string, string> = {
  'May/June': 'bg-blue-100 text-blue-500 dark:bg-blue-900/20 dark:text-blue-400',
  'Oct/Nov': 'bg-orange-100 text-orange-500 dark:bg-orange-900/20 dark:text-orange-400',
  'Feb/March': 'bg-pink-100 text-pink-500 dark:bg-pink-900/20 dark:text-pink-400',
};

export function MCQFullPapers() {
  const { subject, level } = useParams<{ subject: string; level: string }>();
  const navigate = useNavigate();
  const { t } = useLocale();

  const data = subject ? subjectData[subject] : null;

  if (!data) {
    return (
      <div className="min-h-screen bg-background">
        <TopNav />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Subject not found.</p>
            <Button onClick={() => navigate('/mcqs')}>Back to MCQs</Button>
          </div>
        </div>
      </div>
    );
  }

  // Use real papers for Economics, generic papers otherwise
  const isEconWithPapers = subject === 'economics' && level;
  const realPapers = isEconWithPapers ? getPapersForLevel(level!) : [];
  const papers = realPapers.length > 0
    ? realPapers.map(p => ({
        id: p.id, year: p.year, session: p.session as 'May/June' | 'Oct/Nov' | 'Feb/March',
        variant: p.paperCode, questions: p.questionData.length, paperCode: p.paperCode,
      }))
    : data.papers.map(p => ({ ...p, paperCode: '' }));

  const { name, code, Icon, iconBg, bgColor, borderColor, iconColor } = data;

  const years = [...new Set(papers.map((p) => p.year))].sort((a, b) => b - a);

  return (
    <div className="min-h-screen bg-background">
      <TopNav currentPage="mcqs" />
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Back */}
        <button
          onClick={() => navigate(`/mcqs/${subject}/${level}`)}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {name}
        </button>

        {/* Header */}
        <div className={`rounded-2xl border ${borderColor} ${bgColor} p-6 mb-8 flex items-center gap-5`}>
          <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${iconBg} shrink-0`}>
            <Icon className={`w-7 h-7 ${iconColor}`} />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-foreground">{name} — Full Papers</h1>
            <p className={`text-sm font-medium ${iconColor}`}>CIE A-Level · {code} · Paper 1 MCQ</p>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-center">
            <div>
              <p className="text-xl font-bold text-foreground">{papers.length}</p>
              <p className="text-xs text-muted-foreground">{t('mcqFullPapers.papers')}</p>
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{years.length}</p>
              <p className="text-xs text-muted-foreground">{t('mcqFullPapers.years')}</p>
            </div>
          </div>
        </div>

        {/* Papers grouped by year */}
        <div className="space-y-8">
          {years.map((year) => {
            const yearPapers = papers.filter((p) => p.year === year);
            return (
              <div key={year}>
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">{year}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {yearPapers.map((paper) => (
                    <button
                      key={paper.id}
                      onClick={() => navigate(`/mcqs/${subject}/${level}/full-papers/${paper.id}`)}
                      className="group text-left rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all duration-200 p-5 focus:outline-none focus:ring-2 focus:ring-primary/40"
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <FileText className={`w-4 h-4 ${iconColor} shrink-0 mt-0.5`} />
                          <span className="font-semibold text-foreground">
                            {year}{paper.paperCode ? ` · ${paper.paperCode}` : ` · Variant ${paper.variant}`}
                          </span>
                        </div>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${sessionColors[paper.session]}`}>
                          {t(sessionKeys[paper.session])}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            {paper.questions} {t('mcqFullPapers.questions')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {level === 'a2-level' ? '75' : level === 'as-level' ? '60' : '45'} {t('mcqFullPapers.min')}
                          </span>
                        </div>
                        <span className={`inline-flex items-center gap-1 text-sm font-medium ${iconColor} group-hover:gap-2 transition-all`}>
                          {t('mcqFullPapers.start')} <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
