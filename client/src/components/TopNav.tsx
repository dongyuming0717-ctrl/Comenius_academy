import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProctor } from '../sdk/useProctor';
import { useLocale } from '../i18n/LocaleContext';
import { supabase } from '../supabase';
import { StreakFlame } from './StreakFlame';
import { colors, typography, radii, nav as navTokens } from '../theme/tokens';

type PageKey = 'home' | 'topics' | 'random' | 'class-mode' | 'teacher' | 'profile' | 'analytics' | 'papers' | 'past-papers' | 'admission-tests' | 'exam' | 'checkin' | 'leaderboard' | 'users' | 'mcqs';

interface Props {
  currentPage?: PageKey;
  minimal?: boolean;
  scrolled?: boolean;
}

interface Props {
  currentPage?: PageKey;
  minimal?: boolean;
}

let navCachedRole: string | null = null;
let navCachedUserId: string | null = null;

const font = typography.fontFamily;

const navContainerStyle: React.CSSProperties = {
  position: 'sticky',
  top: 0,
  zIndex: 50,
  borderBottom: navTokens.border,
  background: navTokens.bg,
  backdropFilter: navTokens.blur,
  WebkitBackdropFilter: navTokens.blur,
};

const navInnerStyle: React.CSSProperties = {
  maxWidth: 1280,
  margin: '0 auto',
  padding: '0 24px',
  height: navTokens.height,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const navLinkStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  padding: '0 12px',
  height: 32,
  borderRadius: radii.md,
  fontSize: typography.size.base,
  fontWeight: typography.weight.medium,
  textDecoration: 'none',
  color: colors.foreground,
  transition: 'all 0.15s',
  fontFamily: font,
};

const navLinkActiveStyle: React.CSSProperties = {
  ...navLinkStyle,
  background: colors.secondary,
};

const mobileLinksShadow = '0 10px 30px rgba(0,0,0,0.08)';

const mobileLinksStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: navTokens.height,
  left: 0,
  right: 0,
  background: colors.card,
  borderBottom: `1px solid ${colors.border}`,
  padding: '12px 24px',
  gap: 4,
  zIndex: 49,
  boxShadow: mobileLinksShadow,
};

// -- SVG icons (inline) --
const BookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);

const PastPaperIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/>
  </svg>
);

const McqIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
  </svg>
);

const AdmissionIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.1 2.7 2 6 2s6-.9 6-2v-5"/>
  </svg>
);

const DashboardIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
);

const ClassIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const AnalyticsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);

const UsersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const HamburgerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/>
  </svg>
);

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

export function TopNav({ currentPage, minimal = false, scrolled = false }: Props) {
  const { user } = useProctor();
  const { t, locale, setLocale } = useLocale();
  const [role, setRole] = useState<string | null>(
    navCachedUserId === user?.id ? navCachedRole : null,
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');
  const [streakCount, setStreakCount] = useState(0);

  const isTeacher = role === 'teacher' || role === 'admin';
  const isStudent = role === 'student' || (!role && !isTeacher);
  const userInitial = user?.email?.charAt(0).toUpperCase() || '?';

  // Fetch streak for students
  useEffect(() => {
    if (!user || isTeacher) return;
    supabase
      .from('users')
      .select('id')
      .eq('auth_id', user.id)
      .single()
      .then(({ data: profile }) => {
        if (!profile) return;
        supabase
          .from('streaks')
          .select('current_streak')
          .eq('user_id', profile.id)
          .maybeSingle()
          .then(({ data: streakData }) => {
            if (streakData) setStreakCount(streakData.current_streak ?? 0);
          });
      });
  }, [user, isTeacher]);

  useEffect(() => {
    if (!user) return;
    if (navCachedUserId === user.id && navCachedRole) {
      setRole(navCachedRole);
      return;
    }
    supabase
      .from('users')
      .select('role')
      .eq('auth_id', user.id)
      .single()
      .then(({ data, error }) => {
        if (error || !data) return;
        navCachedRole = data.role;
        navCachedUserId = user.id;
        setRole(data.role);
      });
  }, [user]);

  useEffect(() => {
    const onClick = () => setUserMenuOpen(false);
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const link = (active: boolean): React.CSSProperties =>
    active ? navLinkActiveStyle : navLinkStyle;

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    applyTheme(next);
  };

  const applyTheme = (dark: boolean) => {
    const root = document.documentElement;
    if (dark) {
      root.style.filter = 'invert(1) hue-rotate(180deg)';
      document.querySelectorAll('img, video, canvas, iframe').forEach((el) => {
        (el as HTMLElement).style.filter = 'invert(1) hue-rotate(180deg)';
      });
    } else {
      root.style.filter = '';
      document.querySelectorAll('img, video, canvas, iframe').forEach((el) => {
        (el as HTMLElement).style.filter = '';
      });
    }
  };

  // Apply theme on mount
  useEffect(() => {
    applyTheme(isDark);
  }, []);

  const btnGhostStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    padding: 0,
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    borderRadius: radii.md,
    color: colors.foreground,
  };

  const dropdownMenuStyle: React.CSSProperties = {
    position: 'absolute',
    right: 0,
    top: '100%',
    marginTop: 8,
    background: colors.card,
    border: `1px solid ${colors.border}`,
    borderRadius: radii.lg,
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
    minWidth: 224,
    padding: 4,
    zIndex: 100,
    display: userMenuOpen ? 'block' : 'none',
  };

  const dropdownItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 12px',
    borderRadius: radii.md,
    fontSize: typography.size.base,
    cursor: 'pointer',
    border: 'none',
    background: 'none',
    width: '100%',
    textAlign: 'left' as const,
    color: colors.foreground,
    fontFamily: font,
  };

  const avatarStyle: React.CSSProperties = {
    width: 40,
    height: 40,
    borderRadius: '50%',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: colors.primary,
    color: colors.primaryForeground,
    fontWeight: typography.weight.semibold,
    fontSize: typography.size.base,
    cursor: 'pointer',
    border: 'none',
    fontFamily: font,
  };

  const navStyle: React.CSSProperties = {
    ...navContainerStyle,
    background: scrolled ? 'rgba(255,255,255,0.85)' : navTokens.bg,
    boxShadow: scrolled ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
    transition: 'background 0.3s ease, box-shadow 0.3s ease',
  };

  return (
    <nav style={navStyle}>
      <style>{`
        .nav-btn {
          position: relative;
          padding: 5px 14px;
          border-radius: 7px;
          border: none;
          font-size: 12px;
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 1px;
          background: transparent;
          color: #000;
          overflow: hidden;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          box-shadow: 0 0 0 0 transparent;
          transition: all 0.2s ease-in;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }
        .nav-btn:hover {
          background: rgb(61, 106, 255);
          color: #fff;
          box-shadow: 0 0 18px 3px rgba(0, 142, 236, 0.45);
          transition: all 0.2s ease-out;
        }
        .nav-btn:hover::before {
          animation: nav-sh02 0.5s 0s linear;
        }
        .nav-btn::before {
          content: '';
          display: block;
          width: 0px;
          height: 86%;
          position: absolute;
          top: 7%;
          left: 0%;
          opacity: 0;
          background: #fff;
          box-shadow: 0 0 50px 30px #fff;
          transform: skewX(-20deg);
        }
        .nav-btn:active {
          box-shadow: 0 0 0 0 transparent;
          transition: box-shadow 0.2s ease-in;
        }
        .nav-btn-active {
          background: rgb(61, 106, 255);
          color: #fff;
        }
        @keyframes nav-sh02 {
          from { opacity: 0; left: 0%; }
          50% { opacity: 1; }
          to { opacity: 0; left: 100%; }
        }
      `}</style>
      {locale === 'zh' && <style>{`
        .nav-btn { font-size: 13px; letter-spacing: 0.5px; }
      `}</style>}
      <div style={navInnerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <div style={{
              width: 32, height: 32, borderRadius: radii.lg,
              background: colors.primary,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <BookIcon />
            </div>
            <span style={{ fontWeight: 600, fontSize: 18, color: colors.foreground, fontFamily: font }}>
              Comenius
            </span>
          </Link>

          {/* Hamburger */}
          <button
            style={{ ...btnGhostStyle, display: 'flex' } as React.CSSProperties}
            className="nav-hamburger"
            onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
            aria-label="Toggle navigation menu"
          >
            <HamburgerIcon />
          </button>

          {/* Desktop nav links */}
          {!minimal && (
            <div className="nav-desktop-links" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Link to="/mcqs" className={`nav-btn ${currentPage === 'mcqs' ? 'nav-btn-active' : ''}`}>
                <McqIcon />{t('topnav.mcqs')}
              </Link>
              <Link to="/past-papers" className={`nav-btn ${currentPage === 'past-papers' ? 'nav-btn-active' : ''}`}>
                <PastPaperIcon />{t('topnav.pastPapers')}
              </Link>
              <Link to="/admission-tests" className={`nav-btn ${currentPage === 'admission-tests' ? 'nav-btn-active' : ''}`}>
                <AdmissionIcon />{t('topnav.admissionTests')}
              </Link>
              {!isTeacher && (
                <Link to="/class-mode" className={`nav-btn ${currentPage === 'class-mode' ? 'nav-btn-active' : ''}`}>
                  <ClassIcon />{t('topnav.classMode')}
                </Link>
              )}
              {(!isTeacher || role === 'admin') && (
                <>
                  <Link to="/analytics" className={`nav-btn ${currentPage === 'analytics' ? 'nav-btn-active' : ''}`}>
                    <AnalyticsIcon />{t('topnav.studentDashboard')}
                  </Link>
                  <Link to="/profile" className={`nav-btn ${currentPage === 'profile' ? 'nav-btn-active' : ''}`}>
                    <span style={{ fontSize: 14 }}>🔥</span> {t('topnav.myProgress')}
                  </Link>
                </>
              )}
              {isTeacher && (
                <>
                  <Link to="/teacher" style={link(currentPage === 'teacher')}>
                    <DashboardIcon />{t('topnav.teacherDashboard')}
                  </Link>
                  <Link to="/admin/users" style={link(currentPage === 'users')}>
                    <UsersIcon /> {t('topnav.users')}
                  </Link>
                </>
              )}
            </div>
          )}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Streak indicator */}
          {user && !isTeacher && streakCount > 0 && (
            <Link
              to="/profile"
              style={{
                display: 'flex', alignItems: 'center', gap: 4,
                padding: '2px 8px', borderRadius: 16,
                background: streakCount >= 7 ? '#fff7ed' : '#f8fafc',
                border: streakCount >= 7 ? '1px solid #fed7aa' : '1px solid #e2e8f0',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
            >
              <StreakFlame streak={streakCount} size="sm" />
              <span style={{
                fontSize: 12, fontWeight: 600,
                color: streakCount >= 7 ? '#ea580c' : '#64748b',
              }}>
                {streakCount}
              </span>
            </Link>
          )}

          {/* Theme toggle */}
          <button style={btnGhostStyle} onClick={toggleTheme} aria-label="Toggle theme">
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Language toggle */}
          <button
            onClick={() => setLocale(locale === 'en' ? 'zh' : 'en')}
            style={{
              ...btnGhostStyle,
              width: 'auto',
              padding: '0 8px',
              fontSize: typography.size.sm,
              fontWeight: typography.weight.medium,
            }}
          >
            {locale === 'en' ? '中文' : 'EN'}
          </button>

          {user ? (
            <>
              {/* User dropdown */}
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <button
                  style={avatarStyle}
                  onClick={(e) => { e.stopPropagation(); setUserMenuOpen(!userMenuOpen); }}
                >
                  {userInitial}
                </button>
                <div style={dropdownMenuStyle}>
                  <Link to="/profile-settings" style={{ ...dropdownItemStyle, textDecoration: 'none' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    {t('topnav.profile')}
                  </Link>
                  <div style={{ height: 1, background: colors.border, margin: '4px 0' }} />
                  <button
                    style={dropdownItemStyle}
                    onClick={() => {
                      if (window.confirm(t('topnav.signOutConfirm'))) {
                        supabase.auth.signOut();
                      }
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    {t('topnav.signOut')}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" style={{ ...navLinkStyle, background: colors.primary, color: colors.primaryForeground, padding: '6px 12px', height: 32 }}>
                {t('topnav.login')}
              </Link>
              <Link to="/signup" style={{ ...navLinkStyle, background: colors.secondary, color: colors.secondaryForeground, padding: '6px 12px', height: 32 }}>
                {t('topnav.signUp')}
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {!minimal && menuOpen && (
        <div style={mobileLinksStyle}>
          <Link to="/mcqs" className={`nav-btn ${currentPage === 'mcqs' ? 'nav-btn-active' : ''}`} onClick={() => setMenuOpen(false)}>
            <McqIcon />{t('topnav.mcqs')}
          </Link>
          <Link to="/past-papers" className={`nav-btn ${currentPage === 'past-papers' ? 'nav-btn-active' : ''}`} onClick={() => setMenuOpen(false)}>
            <PastPaperIcon />{t('topnav.pastPapers')}
          </Link>
          <Link to="/admission-tests" className={`nav-btn ${currentPage === 'admission-tests' ? 'nav-btn-active' : ''}`} onClick={() => setMenuOpen(false)}>
            <AdmissionIcon />{t('topnav.admissionTests')}
          </Link>
          {!isTeacher && (
            <Link to="/class-mode" className={`nav-btn ${currentPage === 'class-mode' ? 'nav-btn-active' : ''}`} onClick={() => setMenuOpen(false)}>
              <ClassIcon />{t('topnav.classMode')}
            </Link>
          )}
          {(!isTeacher || role === 'admin') && (
            <>
              <Link to="/analytics" className={`nav-btn ${currentPage === 'analytics' ? 'nav-btn-active' : ''}`} onClick={() => setMenuOpen(false)}>
                <AnalyticsIcon />{t('topnav.studentDashboard')}
              </Link>
              <Link to="/profile" className={`nav-btn ${currentPage === 'profile' ? 'nav-btn-active' : ''}`} onClick={() => setMenuOpen(false)}>
                <span style={{ fontSize: 14 }}>🔥</span> {t('topnav.myProgress')}
              </Link>
            </>
          )}
          {isTeacher && (
            <>
              <Link to="/teacher" style={link(currentPage === 'teacher')} onClick={() => setMenuOpen(false)}>
                <DashboardIcon />{t('topnav.teacherDashboard')}
              </Link>
              <Link to="/admin/users" style={link(currentPage === 'users')} onClick={() => setMenuOpen(false)}>
                <UsersIcon /> {t('topnav.users')}
              </Link>
            </>
          )}
        </div>
      )}

      {/* Responsive CSS */}
      <style>{`
        .nav-desktop-links { display: none !important; }
        .nav-hamburger { display: flex !important; }
        @media (min-width: 768px) {
          .nav-desktop-links { display: flex !important; }
          .nav-hamburger { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
