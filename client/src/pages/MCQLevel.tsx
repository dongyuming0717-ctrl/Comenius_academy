import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, GraduationCap, BookOpen, Award } from 'lucide-react';
import { TopNav } from '../components/TopNav';
import { subjectData } from './MCQSubject';
import { useLocale } from '../i18n/LocaleContext';

const getLevels = (t: (k: string) => string) => [
  {
    id: 'igcse',
    name: t('mcqLevel.igcse'),
    description: t('mcqLevel.igcseDesc'),
    icon: GraduationCap,
  },
  {
    id: 'as-level',
    name: t('mcqLevel.asLevel'),
    description: t('mcqLevel.asLevelDesc'),
    icon: BookOpen,
  },
  {
    id: 'a2-level',
    name: t('mcqLevel.a2Level'),
    description: t('mcqLevel.a2LevelDesc'),
    icon: Award,
  },
];

export function MCQLevel() {
  const { subject } = useParams<{ subject: string }>();
  const navigate = useNavigate();
  const { t } = useLocale();
  const levels = getLevels(t);

  const data = subject ? subjectData[subject] : null;

  if (!data) {
    return (
      <div className="min-h-screen bg-background">
        <TopNav />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">{t('mcqSubject.subjectNotFound')}</p>
            <button
              onClick={() => navigate('/mcqs')}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {t('mcqSubject.backToMCQs')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { name, Icon, iconBg, iconColor } = data;

  return (
    <div className="min-h-screen bg-background">
      <TopNav currentPage="mcqs" />
      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Back */}
        <button
          onClick={() => navigate('/mcqs')}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('mcqLevel.allSubjects')}
        </button>

        {/* Subject Header */}
        <div className={`rounded-2xl border p-6 mb-10 flex items-center gap-5 bg-card border-border`}>
          <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${iconBg} shrink-0`}>
            <Icon className={`w-7 h-7 ${iconColor}`} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{name}</h1>
            <p className="text-sm font-medium text-muted-foreground">{t('mcqLevel.selectLevel')}</p>
          </div>
        </div>

        {/* Level Selection */}
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">{t('mcqLevel.chooseLevel')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {levels.map((level) => {
            const LevelIcon = level.icon;
            return (
              <button
                key={level.id}
                onClick={() => navigate(`/mcqs/${subject}/${level.id}`)}
                className="group text-left rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 p-6 focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${iconBg} mb-5`}>
                  <LevelIcon className={`w-6 h-6 ${iconColor}`} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{level.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{level.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
