import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Atom, TrendingUp, FlaskConical, ArrowRight, CheckCircle2, Home } from 'lucide-react';
import { TopNav } from '../components/TopNav';
import { useLocale } from '../i18n/LocaleContext';

const subjects = [
  {
    id: 'physics',
    name: 'Physics',
    board: 'CIE A-Level',
    code: '9702',
    icon: Atom,
    iconBg: 'bg-blue-100 dark:bg-blue-950/30',
    bgColor: 'bg-card',
    borderColor: 'border-blue-100 dark:border-blue-800',
    iconColor: 'text-blue-500 dark:text-blue-400',
    topics: ['Mechanics', 'Electricity', 'Waves', 'Thermal Physics', 'Nuclear Physics'],
    questionCount: 1240,
  },
  {
    id: 'economics',
    name: 'Economics',
    board: 'CIE A-Level',
    code: '9708',
    icon: TrendingUp,
    iconBg: 'bg-green-100 dark:bg-green-950/30',
    bgColor: 'bg-card',
    borderColor: 'border-green-100 dark:border-green-800',
    iconColor: 'text-green-500 dark:text-green-400',
    topics: ['Microeconomics', 'Macroeconomics', 'International Trade', 'Development Economics'],
    questionCount: 980,
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    board: 'CIE A-Level',
    code: '9701',
    icon: FlaskConical,
    iconBg: 'bg-purple-100 dark:bg-purple-950/30',
    bgColor: 'bg-card',
    borderColor: 'border-purple-100 dark:border-purple-800',
    iconColor: 'text-purple-500 dark:text-purple-400',
    topics: ['Physical Chemistry', 'Organic Chemistry', 'Inorganic Chemistry', 'Analytical Chemistry'],
    questionCount: 1150,
  },
];

export function MCQs() {
  const navigate = useNavigate();
  const { t } = useLocale();

  return (
    <div className="min-h-screen bg-background">
      <TopNav currentPage="mcqs" />
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <Home className="w-4 h-4" />
            {t('mcqs.returnHome')}
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {t('mcqs.multipleChoice')}
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">{t('mcqs.selectSubject')}</h1>
          <p className="text-muted-foreground">
            {t('mcqs.subtitle')}
          </p>
        </div>

        {/* Subject Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subjects.map((subject) => {
            const Icon = subject.icon;
            return (
              <button
                key={subject.id}
                onClick={() => navigate(`/mcqs/${subject.id}`)}
                className={`group text-left rounded-2xl border ${subject.borderColor} ${subject.bgColor} p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40`}
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${subject.iconBg} mb-5`}>
                  <Icon className={`w-6 h-6 ${subject.iconColor}`} />
                </div>

                {/* Title & Board */}
                <div className="mb-3">
                  <h2 className="text-xl font-bold text-foreground">{subject.name}</h2>
                  <p className={`text-sm font-medium ${subject.iconColor}`}>
                    {subject.board} · {subject.code}
                  </p>
                </div>

                {/* Topics */}
                <ul className="space-y-1 mb-5">
                  {subject.topics.map((topic) => (
                    <li key={topic} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <span className={`w-1 h-1 rounded-full ${subject.iconColor} bg-current`} />
                      {topic}
                    </li>
                  ))}
                </ul>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {subject.questionCount.toLocaleString()} questions
                  </span>
                  <span className={`inline-flex items-center gap-1 text-sm font-medium ${subject.iconColor} group-hover:gap-2 transition-all`}>
                    {t('mcqs.start')} <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Info Banner */}
        <div className="mt-10 rounded-xl border border-border bg-muted/30 px-6 py-4 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">{t('mcqs.examStyle')}</p>
            <p className="text-sm text-muted-foreground mt-0.5">
              {t('mcqs.examStyleDesc')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
