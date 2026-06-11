import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, BookOpen, Clock, BarChart2 } from 'lucide-react';
import { Button } from '../ui/button';
import { subjectData } from './MCQSubject';
import { TopNav } from '../components/TopNav';
import { useLocale } from '../i18n/LocaleContext';

const difficultyKeys: Record<string, string> = {
  Easy: 'mcqChapters.difficultyEasy',
  Medium: 'mcqChapters.difficultyMedium',
  Hard: 'mcqChapters.difficultyHard',
};

const difficultyColors: Record<string, string> = {
  Easy: 'bg-green-100 text-green-500 dark:bg-green-900/20 dark:text-green-400',
  Medium: 'bg-orange-100 text-orange-500 dark:bg-orange-900/20 dark:text-orange-400',
  Hard: 'bg-pink-100 text-pink-500 dark:bg-pink-900/20 dark:text-pink-400',
};

export function MCQChapters() {
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

  const { name, code, Icon, iconBg, bgColor, borderColor, iconColor, chapters } = data;

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
            <h1 className="text-2xl font-bold text-foreground">{name} — Chapter Questions</h1>
            <p className={`text-sm font-medium ${iconColor}`}>CIE A-Level · {code}</p>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-center">
            <div>
              <p className="text-xl font-bold text-foreground">{chapters.length}</p>
              <p className="text-xs text-muted-foreground">{t('mcqChapters.chapters')}</p>
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">
                {chapters.reduce((s, c) => s + c.questions, 0).toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">{t('mcqChapters.questions')}</p>
            </div>
          </div>
        </div>

        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">{t('mcqChapters.chooseChapter')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {chapters.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => navigate(`/mcqs/${subject}/${level}/chapters/${chapter.id}`)}
              className="group text-left rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all duration-200 p-5 focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <BookOpen className={`w-4 h-4 ${iconColor} shrink-0 mt-0.5`} />
                  <span className="font-semibold text-foreground">{chapter.name}</span>
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${difficultyColors[chapter.difficulty]}`}>
                  {t(difficultyKeys[chapter.difficulty])}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <BarChart2 className="w-3 h-3" />
                  {chapter.questions} {t('mcqChapters.questions')}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  ~{Math.round(chapter.questions * 1.2)} {t('mcqChapters.min')}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
