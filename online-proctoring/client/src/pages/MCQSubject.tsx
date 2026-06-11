import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Atom, TrendingUp, FlaskConical, BookOpen, FileText, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';
import { useLocale } from '../i18n/LocaleContext';
import { TopNav } from '../components/TopNav';
import { getPapersForLevel } from '../data/economicsMCQ';

export const subjectData: Record<string, {
  name: string;
  code: string;
  Icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  bgColor: string;
  borderColor: string;
  iconColor: string;
  chapters: { id: string; name: string; questions: number; difficulty: 'Easy' | 'Medium' | 'Hard' }[];
  papers: { id: string; year: number; session: 'May/June' | 'Oct/Nov' | 'Feb/March'; variant: number; questions: number }[];
}> = {
  physics: {
    name: 'Physics',
    code: '9702',
    Icon: Atom,
    iconBg: 'bg-blue-100 dark:bg-blue-950/30',
    bgColor: 'bg-card',
    borderColor: 'border-blue-100 dark:border-blue-800',
    iconColor: 'text-blue-500 dark:text-blue-400',
    chapters: [
      { id: 'mechanics', name: 'Mechanics', questions: 180, difficulty: 'Medium' },
      { id: 'electricity', name: 'Electricity & Magnetism', questions: 210, difficulty: 'Hard' },
      { id: 'waves', name: 'Waves & Optics', questions: 155, difficulty: 'Medium' },
      { id: 'thermal', name: 'Thermal Physics', questions: 130, difficulty: 'Medium' },
      { id: 'nuclear', name: 'Nuclear Physics', questions: 120, difficulty: 'Hard' },
      { id: 'kinematics', name: 'Kinematics', questions: 145, difficulty: 'Easy' },
      { id: 'circular', name: 'Circular Motion & Gravitation', questions: 160, difficulty: 'Hard' },
      { id: 'quantum', name: 'Quantum Physics', questions: 140, difficulty: 'Hard' },
    ],
    papers: [
      { id: 'p2023mj1', year: 2023, session: 'May/June', variant: 1, questions: 40 },
      { id: 'p2023mj2', year: 2023, session: 'May/June', variant: 2, questions: 40 },
      { id: 'p2023on1', year: 2023, session: 'Oct/Nov', variant: 1, questions: 40 },
      { id: 'p2022mj1', year: 2022, session: 'May/June', variant: 1, questions: 40 },
      { id: 'p2022mj2', year: 2022, session: 'May/June', variant: 2, questions: 40 },
      { id: 'p2022on1', year: 2022, session: 'Oct/Nov', variant: 1, questions: 40 },
      { id: 'p2021mj1', year: 2021, session: 'May/June', variant: 1, questions: 40 },
      { id: 'p2021fm1', year: 2021, session: 'Feb/March', variant: 1, questions: 40 },
    ],
  },
  economics: {
    name: 'Economics',
    code: '9708',
    Icon: TrendingUp,
    iconBg: 'bg-green-100 dark:bg-green-950/30',
    bgColor: 'bg-card',
    borderColor: 'border-green-100 dark:border-green-800',
    iconColor: 'text-green-500 dark:text-green-400',
    chapters: [
      { id: 'micro-basics', name: 'Basic Economic Ideas', questions: 110, difficulty: 'Easy' },
      { id: 'supply-demand', name: 'Supply & Demand', questions: 145, difficulty: 'Easy' },
      { id: 'market-failure', name: 'Market Failure', questions: 130, difficulty: 'Medium' },
      { id: 'macro', name: 'Macroeconomic Indicators', questions: 160, difficulty: 'Medium' },
      { id: 'monetary', name: 'Monetary Policy', questions: 140, difficulty: 'Hard' },
      { id: 'fiscal', name: 'Fiscal Policy', questions: 125, difficulty: 'Hard' },
      { id: 'trade', name: 'International Trade', questions: 135, difficulty: 'Medium' },
      { id: 'development', name: 'Development Economics', questions: 135, difficulty: 'Hard' },
    ],
    papers: [
      { id: 'p2023mj1', year: 2023, session: 'May/June', variant: 1, questions: 30 },
      { id: 'p2023mj2', year: 2023, session: 'May/June', variant: 2, questions: 30 },
      { id: 'p2023on1', year: 2023, session: 'Oct/Nov', variant: 1, questions: 30 },
      { id: 'p2022mj1', year: 2022, session: 'May/June', variant: 1, questions: 30 },
      { id: 'p2022mj2', year: 2022, session: 'May/June', variant: 2, questions: 30 },
      { id: 'p2022on1', year: 2022, session: 'Oct/Nov', variant: 1, questions: 30 },
      { id: 'p2021mj1', year: 2021, session: 'May/June', variant: 1, questions: 30 },
      { id: 'p2021fm1', year: 2021, session: 'Feb/March', variant: 1, questions: 30 },
    ],
  },
  chemistry: {
    name: 'Chemistry',
    code: '9701',
    Icon: FlaskConical,
    iconBg: 'bg-purple-100 dark:bg-purple-950/30',
    bgColor: 'bg-card',
    borderColor: 'border-purple-100 dark:border-purple-800',
    iconColor: 'text-purple-500 dark:text-purple-400',
    chapters: [
      { id: 'atomic', name: 'Atomic Structure', questions: 120, difficulty: 'Easy' },
      { id: 'bonding', name: 'Chemical Bonding', questions: 150, difficulty: 'Medium' },
      { id: 'energetics', name: 'Energetics', questions: 130, difficulty: 'Medium' },
      { id: 'kinetics', name: 'Chemical Kinetics', questions: 145, difficulty: 'Hard' },
      { id: 'equilibrium', name: 'Equilibrium', questions: 160, difficulty: 'Hard' },
      { id: 'organic', name: 'Organic Chemistry', questions: 200, difficulty: 'Hard' },
      { id: 'inorganic', name: 'Inorganic Chemistry', questions: 135, difficulty: 'Medium' },
      { id: 'analytical', name: 'Analytical Chemistry', questions: 110, difficulty: 'Medium' },
    ],
    papers: [
      { id: 'p2023mj1', year: 2023, session: 'May/June', variant: 1, questions: 40 },
      { id: 'p2023mj2', year: 2023, session: 'May/June', variant: 2, questions: 40 },
      { id: 'p2023on1', year: 2023, session: 'Oct/Nov', variant: 1, questions: 40 },
      { id: 'p2022mj1', year: 2022, session: 'May/June', variant: 1, questions: 40 },
      { id: 'p2022mj2', year: 2022, session: 'May/June', variant: 2, questions: 40 },
      { id: 'p2022on1', year: 2022, session: 'Oct/Nov', variant: 1, questions: 40 },
      { id: 'p2021mj1', year: 2021, session: 'May/June', variant: 1, questions: 40 },
      { id: 'p2021fm1', year: 2021, session: 'Feb/March', variant: 1, questions: 40 },
    ],
  },
};

export function MCQSubject() {
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
            <p className="text-muted-foreground mb-4">{t('mcqSubject.subjectNotFound')}</p>
            <Button onClick={() => navigate('/mcqs')}>{t('mcqSubject.backToMCQs')}</Button>
          </div>
        </div>
      </div>
    );
  }

  const { name, code, Icon, iconBg, bgColor, borderColor, iconColor, chapters, papers } = data;
  const totalChapterQuestions = chapters.reduce((sum, c) => sum + c.questions, 0);
  const isEconWithPapers = subject === 'economics' && level;
  const realPapers = isEconWithPapers ? getPapersForLevel(level!) : [];
  const paperCount = realPapers.length > 0 ? realPapers.length : papers.length;

  const modes = [
    {
      id: 'chapters',
      label: t('mcqSubject.chapterQuestions'),
      description: t('mcqSubject.chapterQuestionsDesc'),
      icon: BookOpen,
      stat: `${chapters.length} chapters · ${totalChapterQuestions.toLocaleString()} questions`,
      path: `/mcqs/${subject}/${level}/chapters`,
    },
    {
      id: 'full-papers',
      label: t('mcqSubject.fullPapers'),
      description: t('mcqSubject.fullPapersDesc'),
      icon: FileText,
      stat: `${paperCount} ${t('mcqSubject.papersAvailable')}`,
      path: `/mcqs/${subject}/${level}/full-papers`,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <TopNav currentPage="mcqs" />
      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Back */}
        <button
          onClick={() => navigate(`/mcqs/${subject}`)}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Subject Header */}
        <div className={`rounded-2xl border ${borderColor} ${bgColor} p-6 mb-10 flex items-center gap-5`}>
          <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${iconBg} shrink-0`}>
            <Icon className={`w-7 h-7 ${iconColor}`} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{name}</h1>
            <p className={`text-sm font-medium ${iconColor}`}>CIE A-Level · {code}</p>
          </div>
        </div>

        {/* Mode Selection */}
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">{t('mcqSubject.chooseMode')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {modes.map((mode) => {
            const ModeIcon = mode.icon;
            return (
              <button
                key={mode.id}
                onClick={() => navigate(mode.path)}
                className="group text-left rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 p-6 focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${iconBg} mb-4`}>
                  <ModeIcon className={`w-5 h-5 ${iconColor}`} />
                </div>
                <h3 className="font-bold text-foreground mb-1.5">{mode.label}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{mode.description}</p>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {mode.stat}
                  </span>
                  <span className={`inline-flex items-center gap-1 text-sm font-medium ${iconColor} group-hover:gap-2 transition-all`}>
                    Start <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
