import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useProctor } from '../sdk/useProctor';
import { useLocale } from '../i18n/LocaleContext';
import { supabase } from '../supabase';
import { StreakFlame } from './StreakFlame';
import { getUserUnlocks } from '../services/gamification';
import { colors, typography, radii, nav as navTokens } from '../theme/tokens';

type PageKey = 'home' | 'topics-generate' | 'random' | 'class-mode' | 'teacher' | 'profile' | 'analytics' | 'papers' | 'past-papers' | 'admission-tests' | 'exam' | 'checkin' | 'leaderboard' | 'users' | 'mcqs';

interface Props {
  currentPage?: PageKey;
  minimal?: boolean;
  scrolled?: boolean;
}

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

// -- SVG icons (extracted to ./icons.tsx) --
import { BookIcon, PastPaperIcon, AdmissionIcon, DashboardIcon, ClassIcon, AnalyticsIcon, UsersIcon, McqIcon, HamburgerIcon } from './icons';


export function TopNav({ currentPage, minimal = false, scrolled = false }: Props) {
  const { user } = useProctor();
  const { t, locale, setLocale } = useLocale();
  const roleCacheRef = useRef<{ role: string; userId: string } | null>(null);
  const [role, setRole] = useState<string | null>(
    roleCacheRef.current?.userId === user?.id ? (roleCacheRef.current?.role ?? null) : null,
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');
  const [bb8Unlocked, setBb8Unlocked] = useState(() => localStorage.getItem('bb8_unlocked') === 'true');
  const [bb8Enabled, setBb8Enabled] = useState(() => localStorage.getItem('bb8_enabled') !== 'false');
  const [streakCount, setStreakCount] = useState(0);

  const isTeacher = role === 'teacher' || role === 'admin';
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
    if (roleCacheRef.current?.userId === user.id && roleCacheRef.current?.role) {
      setRole(roleCacheRef.current?.role ?? null);
      return;
    }
    supabase
      .from('users')
      .select('role')
      .eq('auth_id', user.id)
      .single()
      .then(({ data, error }) => {
        if (error || !data) return;
        roleCacheRef.current = { role: data.role, userId: user.id };
        setRole(data.role);
      });
  }, [user]);

  useEffect(() => {
    const onClick = () => setUserMenuOpen(false);
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  // Listen for BB-8 toggle changes from ProfilePage
  useEffect(() => {
    const handler = () => {
      setBb8Enabled(localStorage.getItem('bb8_enabled') !== 'false');
    };
    window.addEventListener('bb8-toggle-changed', handler);
    return () => window.removeEventListener('bb8-toggle-changed', handler);
  }, []);

  // Sync BB-8 unlock from database
  useEffect(() => {
    if (!user) return;
    supabase
      .from('users')
      .select('id')
      .eq('auth_id', user.id)
      .single()
      .then(({ data: profile }) => {
        if (!profile) return;
        getUserUnlocks(profile.id).then((unlocks) => {
          const has = unlocks.some((u) => u.unlock_key === 'bb8_theme');
          setBb8Unlocked(has);
          localStorage.setItem('bb8_unlocked', has ? 'true' : 'false');
        });
      });
  }, [user]);

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
              <Link to="/past-papers" style={link(currentPage === 'past-papers')}>
                <PastPaperIcon />{t('topnav.pastPapers')}
              </Link>
              <Link to="/topics" style={link(currentPage === 'topics-generate')}>
                <BookIcon />{t('topnav.topicsGenerate')}
              </Link>
              <Link to="/admission-tests" style={link(currentPage === 'admission-tests')}>
                <AdmissionIcon />{t('topnav.admissionTests')}
              </Link>
              {!isTeacher && (
                <Link to="/class-mode" style={link(currentPage === 'class-mode')}>
                  <ClassIcon />{t('topnav.classMode')}
                </Link>
              )}
              {(!isTeacher || role === 'admin') && (
                <>
                  <Link to="/analytics" style={link(currentPage === 'analytics')}>
                    <AnalyticsIcon />{t('topnav.studentDashboard')}
                  </Link>
                  <Link to="/profile" style={link(currentPage === 'profile')}>
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
          {bb8Unlocked && bb8Enabled ? (
            <>
              <style>{`
                .bb8-toggle { --toggle-size: 9px; --toggle-width: 10.625em; --toggle-height: 5.625em; --toggle-offset: calc((var(--toggle-height) - var(--bb8-diameter)) / 2); --toggle-bg: linear-gradient(#2c4770, #070e2b 35%, #628cac 50% 70%, #a6c5d4) no-repeat; --bb8-diameter: 4.375em; --radius: 99em; --transition: 0.4s; --accent: #de7d2f; --bb8-bg: #fff; }
                .bb8-toggle, .bb8-toggle *, .bb8-toggle *::before, .bb8-toggle *::after { -webkit-box-sizing: border-box; box-sizing: border-box; }
                .bb8-toggle { cursor: pointer; font-size: var(--toggle-size); }
                .bb8-toggle__checkbox { -webkit-appearance: none; appearance: none; display: none; }
                .bb8-toggle__container { width: var(--toggle-width); height: var(--toggle-height); background: var(--toggle-bg); background-size: 100% 11.25em; background-position-y: -5.625em; border-radius: var(--radius); position: relative; -webkit-transition: var(--transition); transition: var(--transition); }
                .bb8 { display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-orient: vertical; -webkit-box-direction: normal; -ms-flex-direction: column; flex-direction: column; -webkit-box-align: center; -ms-flex-align: center; align-items: center; position: absolute; top: calc(var(--toggle-offset) - 1.688em + 0.188em); left: var(--toggle-offset); -webkit-transition: var(--transition); transition: var(--transition); z-index: 2; }
                .bb8__head-container { position: relative; -webkit-transition: var(--transition); transition: var(--transition); z-index: 2; -webkit-transform-origin: 1.25em 3.75em; -ms-transform-origin: 1.25em 3.75em; transform-origin: 1.25em 3.75em; }
                .bb8__head { overflow: hidden; margin-bottom: -0.188em; width: 2.5em; height: 1.688em; background: linear-gradient(transparent 0.063em, dimgray 0.063em 0.313em, transparent 0.313em 0.375em, var(--accent) 0.375em 0.5em, transparent 0.5em 1.313em, silver 1.313em 1.438em, transparent 1.438em), linear-gradient(45deg, transparent 0.188em, var(--bb8-bg) 0.188em 1.25em, transparent 1.25em), linear-gradient(-45deg, transparent 0.188em, var(--bb8-bg) 0.188em 1.25em, transparent 1.25em), linear-gradient(var(--bb8-bg) 1.25em, transparent 1.25em); border-radius: var(--radius) var(--radius) 0 0; position: relative; z-index: 1; -webkit-filter: drop-shadow(0 0.063em 0.125em gray); filter: drop-shadow(0 0.063em 0.125em gray); }
                .bb8__head::before { content: ""; position: absolute; width: 0.563em; height: 0.563em; background: radial-gradient(0.125em circle at 0.25em 0.375em, red, transparent), radial-gradient(0.063em circle at 0.375em 0.188em, var(--bb8-bg) 50%, transparent 100%), linear-gradient(45deg, #000 0.188em, dimgray 0.313em 0.375em, #000 0.5em); border-radius: var(--radius); top: 0.413em; left: 50%; -webkit-transform: translate(-50%); -ms-transform: translate(-50%); transform: translate(-50%); -webkit-box-shadow: 0 0 0 0.089em lightgray, 0.563em 0.281em 0 -0.148em, 0.563em 0.281em 0 -0.1em var(--bb8-bg), 0.563em 0.281em 0 -0.063em; box-shadow: 0 0 0 0.089em lightgray, 0.563em 0.281em 0 -0.148em, 0.563em 0.281em 0 -0.1em var(--bb8-bg), 0.563em 0.281em 0 -0.063em; z-index: 1; -webkit-transition: var(--transition); transition: var(--transition); }
                .bb8__head::after { content: ""; position: absolute; bottom: 0.375em; left: 0; width: 100%; height: 0.188em; background: linear-gradient(to right, var(--accent) 0.125em, transparent 0.125em 0.188em, var(--accent) 0.188em 0.313em, transparent 0.313em 0.375em, var(--accent) 0.375em 0.938em, transparent 0.938em 1em, var(--accent) 1em 1.125em, transparent 1.125em 1.875em, var(--accent) 1.875em 2em, transparent 2em 2.063em, var(--accent) 2.063em 2.25em, transparent 2.25em 2.313em, var(--accent) 2.313em 2.375em, transparent 2.375em 2.438em, var(--accent) 2.438em); -webkit-transition: var(--transition); transition: var(--transition); }
                .bb8__antenna { position: absolute; -webkit-transform: translateY(-90%); -ms-transform: translateY(-90%); transform: translateY(-90%); width: 0.059em; border-radius: var(--radius) var(--radius) 0 0; -webkit-transition: var(--transition); transition: var(--transition); }
                .bb8__antenna:nth-child(1) { height: 0.938em; right: 0.938em; background: -webkit-gradient(linear, left top, left bottom, color-stop(0.188em, #000), color-stop(0.188em, silver)); background: linear-gradient(#000 0.188em, silver 0.188em); }
                .bb8__antenna:nth-child(2) { height: 0.375em; left: 50%; -webkit-transform: translate(-50%, -90%); -ms-transform: translate(-50%, -90%); transform: translate(-50%, -90%); background: silver; }
                .bb8__body { width: 4.375em; height: 4.375em; background: var(--bb8-bg); border-radius: var(--radius); position: relative; overflow: hidden; -webkit-transition: var(--transition); transition: var(--transition); z-index: 1; -webkit-transform: rotate(45deg); -ms-transform: rotate(45deg); transform: rotate(45deg); background: linear-gradient(-90deg, var(--bb8-bg) 4%, var(--accent) 4% 10%, transparent 10% 90%, var(--accent) 90% 96%, var(--bb8-bg) 96%), linear-gradient(var(--bb8-bg) 4%, var(--accent) 4% 10%, transparent 10% 90%, var(--accent) 90% 96%, var(--bb8-bg) 96%), linear-gradient(to right, transparent 2.156em, silver 2.156em 2.219em, transparent 2.188em), linear-gradient(transparent 2.156em, silver 2.156em 2.219em, transparent 2.188em); background-color: var(--bb8-bg); }
                .bb8__body::after { content: ""; bottom: 1.5em; left: 0.563em; position: absolute; width: 0.188em; height: 0.188em; background: rgb(236, 236, 236); color: rgb(236, 236, 236); border-radius: 50%; -webkit-box-shadow: 0.875em 0.938em, 0 -1.25em, 0.875em -2.125em, 2.125em -2.125em, 3.063em -1.25em, 3.063em 0, 2.125em 0.938em; box-shadow: 0.875em 0.938em, 0 -1.25em, 0.875em -2.125em, 2.125em -2.125em, 3.063em -1.25em, 3.063em 0, 2.125em 0.938em; }
                .bb8__body::before { content: ""; width: 2.625em; height: 2.625em; position: absolute; border-radius: 50%; z-index: 0.1; overflow: hidden; top: 50%; left: 50%; -webkit-transform: translate(-50%, -50%); -ms-transform: translate(-50%, -50%); transform: translate(-50%, -50%); border: 0.313em solid var(--accent); background: radial-gradient(1em circle at center, rgb(236, 236, 236) 50%, transparent 51%), radial-gradient(1.25em circle at center, var(--bb8-bg) 50%, transparent 51%), linear-gradient(-90deg, transparent 42%, var(--accent) 42% 58%, transparent 58%), linear-gradient(var(--bb8-bg) 42%, var(--accent) 42% 58%, var(--bb8-bg) 58%); }
                .bb8-shadow { width: var(--bb8-diameter); height: 20%; border-radius: 50%; background: #3a271c; -webkit-box-shadow: 0.313em 0 3.125em #3a271c; box-shadow: 0.313em 0 3.125em #3a271c; opacity: 0.25; position: absolute; bottom: 0; left: calc(var(--toggle-offset) - 0.938em); -webkit-transition: var(--transition); transition: var(--transition); -webkit-transform: skew(-70deg); -ms-transform: skew(-70deg); transform: skew(-70deg); z-index: 1; }
                .bb8-toggle__scenery { width: 100%; height: 100%; pointer-events: none; overflow: hidden; position: relative; border-radius: inherit; }
                .bb8-toggle__scenery::before { content: ""; position: absolute; width: 100%; height: 30%; bottom: 0; background: #b18d71; z-index: 1; }
                .bb8-toggle__cloud { z-index: 1; position: absolute; border-radius: 50%; }
                .bb8-toggle__cloud:nth-last-child(1) { width: 0.875em; height: 0.625em; -webkit-filter: blur(0.125em) drop-shadow(0.313em 0.313em #ffffffae) drop-shadow(-0.625em 0 #fff) drop-shadow(-0.938em -0.125em #fff); filter: blur(0.125em) drop-shadow(0.313em 0.313em #ffffffae) drop-shadow(-0.625em 0 #fff) drop-shadow(-0.938em -0.125em #fff); right: 1.875em; top: 2.813em; background: -webkit-gradient(linear, left bottom, right top, from(#ffffffae), to(#ffffffae)); background: linear-gradient(to top right, #ffffffae, #ffffffae); -webkit-transition: var(--transition); transition: var(--transition); }
                .bb8-toggle__cloud:nth-last-child(2) { top: 0.625em; right: 4.375em; width: 0.875em; height: 0.375em; background: #dfdedeae; -webkit-filter: blur(0.125em) drop-shadow(-0.313em -0.188em #e0dfdfae) drop-shadow(-0.625em -0.188em #bbbbbbae) drop-shadow(-1em 0.063em #cfcfcfae); filter: blur(0.125em) drop-shadow(-0.313em -0.188em #e0dfdfae) drop-shadow(-0.625em -0.188em #bbbbbbae) drop-shadow(-1em 0.063em #cfcfcfae); -webkit-transition: 0.6s; transition: 0.6s; }
                .bb8-toggle__cloud:nth-last-child(3) { top: 1.25em; right: 0.938em; width: 0.875em; height: 0.375em; background: #ffffffae; -webkit-filter: blur(0.125em) drop-shadow(0.438em 0.188em #ffffffae) drop-shadow(-0.625em 0.313em #ffffffae); filter: blur(0.125em) drop-shadow(0.438em 0.188em #ffffffae) drop-shadow(-0.625em 0.313em #ffffffae); -webkit-transition: 0.8s; transition: 0.8s; }
                .gomrassen, .hermes, .chenini { position: absolute; border-radius: var(--radius); background: -webkit-gradient(linear, left top, left bottom, from(#fff), to(#6e8ea2)); background: linear-gradient(#fff, #6e8ea2); top: 100%; }
                .gomrassen { left: 0.938em; width: 1.875em; height: 1.875em; -webkit-box-shadow: 0 0 0.188em #ffffff52, 0 0 0.188em #6e8ea24b; box-shadow: 0 0 0.188em #ffffff52, 0 0 0.188em #6e8ea24b; -webkit-transition: var(--transition); transition: var(--transition); }
                .gomrassen::before, .gomrassen::after { content: ""; position: absolute; border-radius: inherit; -webkit-box-shadow: inset 0 0 0.063em rgb(140, 162, 169); box-shadow: inset 0 0 0.063em rgb(140, 162, 169); background: rgb(184, 196, 200); }
                .gomrassen::before { left: 0.313em; top: 0.313em; width: 0.438em; height: 0.438em; }
                .gomrassen::after { width: 0.25em; height: 0.25em; left: 1.25em; top: 0.75em; }
                .hermes { left: 3.438em; width: 0.625em; height: 0.625em; -webkit-box-shadow: 0 0 0.125em #ffffff52, 0 0 0.125em #6e8ea24b; box-shadow: 0 0 0.125em #ffffff52, 0 0 0.125em #6e8ea24b; -webkit-transition: 0.6s; transition: 0.6s; }
                .chenini { left: 4.375em; width: 0.5em; height: 0.5em; -webkit-box-shadow: 0 0 0.125em #ffffff52, 0 0 0.125em #6e8ea24b; box-shadow: 0 0 0.125em #ffffff52, 0 0 0.125em #6e8ea24b; -webkit-transition: 0.8s; transition: 0.8s; }
                .tatto-1, .tatto-2 { position: absolute; width: 1.25em; height: 1.25em; border-radius: var(--radius); }
                .tatto-1 { background: #fefefe; right: 3.125em; top: 0.625em; -webkit-box-shadow: 0 0 0.438em #fdf4e1; box-shadow: 0 0 0.438em #fdf4e1; -webkit-transition: var(--transition); transition: var(--transition); }
                .tatto-2 { background: -webkit-gradient(linear, left top, left bottom, from(#e6ac5c), to(#d75449)); background: linear-gradient(#e6ac5c, #d75449); right: 1.25em; top: 2.188em; -webkit-box-shadow: 0 0 0.438em #e6ad5c3d, 0 0 0.438em #d755494f; box-shadow: 0 0 0.438em #e6ad5c3d, 0 0 0.438em #d755494f; -webkit-transition: 0.7s; transition: 0.7s; }
                .bb8-toggle__star { position: absolute; width: 0.063em; height: 0.063em; background: #fff; border-radius: var(--radius); -webkit-filter: drop-shadow(0 0 0.063em #fff); filter: drop-shadow(0 0 0.063em #fff); color: #fff; top: 100%; }
                .bb8-toggle__star:nth-child(1) { left: 3.75em; -webkit-box-shadow: 1.25em 0.938em, -1.25em 2.5em, 0 1.25em, 1.875em 0.625em, -3.125em 1.875em, 1.25em 2.813em; box-shadow: 1.25em 0.938em, -1.25em 2.5em, 0 1.25em, 1.875em 0.625em, -3.125em 1.875em, 1.25em 2.813em; -webkit-transition: 0.2s; transition: 0.2s; }
                .bb8-toggle__star:nth-child(2) { left: 4.688em; -webkit-box-shadow: 0.625em 0, 0 0.625em, -0.625em -0.625em, 0.625em 0.938em, -3.125em 1.25em, 1.25em -1.563em; box-shadow: 0.625em 0, 0 0.625em, -0.625em -0.625em, 0.625em 0.938em, -3.125em 1.25em, 1.25em -1.563em; -webkit-transition: 0.3s; transition: 0.3s; }
                .bb8-toggle__star:nth-child(3) { left: 5.313em; -webkit-box-shadow: -0.625em -0.625em, -2.188em 1.25em, -2.188em 0, -3.75em -0.625em, -3.125em -0.625em, -2.5em -0.313em, 0.75em -0.625em; box-shadow: -0.625em -0.625em, -2.188em 1.25em, -2.188em 0, -3.75em -0.625em, -3.125em -0.625em, -2.5em -0.313em, 0.75em -0.625em; -webkit-transition: var(--transition); transition: var(--transition); }
                .bb8-toggle__star:nth-child(4) { left: 1.875em; width: 0.125em; height: 0.125em; -webkit-transition: 0.5s; transition: 0.5s; }
                .bb8-toggle__star:nth-child(5) { left: 5em; width: 0.125em; height: 0.125em; -webkit-transition: 0.6s; transition: 0.6s; }
                .bb8-toggle__star:nth-child(6) { left: 2.5em; width: 0.125em; height: 0.125em; -webkit-transition: 0.7s; transition: 0.7s; }
                .bb8-toggle__star:nth-child(7) { left: 3.438em; width: 0.125em; height: 0.125em; -webkit-transition: 0.8s; transition: 0.8s; }
                .bb8-toggle__checkbox:checked + .bb8-toggle__container .bb8-toggle__star:nth-child(1) { top: 0.625em; }
                .bb8-toggle__checkbox:checked + .bb8-toggle__container .bb8-toggle__star:nth-child(2) { top: 1.875em; }
                .bb8-toggle__checkbox:checked + .bb8-toggle__container .bb8-toggle__star:nth-child(3) { top: 1.25em; }
                .bb8-toggle__checkbox:checked + .bb8-toggle__container .bb8-toggle__star:nth-child(4) { top: 3.438em; }
                .bb8-toggle__checkbox:checked + .bb8-toggle__container .bb8-toggle__star:nth-child(5) { top: 3.438em; }
                .bb8-toggle__checkbox:checked + .bb8-toggle__container .bb8-toggle__star:nth-child(6) { top: 0.313em; }
                .bb8-toggle__checkbox:checked + .bb8-toggle__container .bb8-toggle__star:nth-child(7) { top: 1.875em; }
                .bb8-toggle__checkbox:checked + .bb8-toggle__container .bb8-toggle__cloud { right: -100%; }
                .bb8-toggle__checkbox:checked + .bb8-toggle__container .gomrassen { top: 0.938em; }
                .bb8-toggle__checkbox:checked + .bb8-toggle__container .hermes { top: 2.5em; }
                .bb8-toggle__checkbox:checked + .bb8-toggle__container .chenini { top: 2.75em; }
                .bb8-toggle__checkbox:checked + .bb8-toggle__container { background-position-y: 0; }
                .bb8-toggle__checkbox:checked + .bb8-toggle__container .tatto-1 { top: 100%; }
                .bb8-toggle__checkbox:checked + .bb8-toggle__container .tatto-2 { top: 100%; }
                .bb8-toggle__checkbox:checked + .bb8-toggle__container .bb8 { left: calc(100% - var(--bb8-diameter) - var(--toggle-offset)); }
                .bb8-toggle__checkbox:checked + .bb8-toggle__container .bb8-shadow { left: calc(100% - var(--bb8-diameter) - var(--toggle-offset) + 0.938em); -webkit-transform: skew(70deg); -ms-transform: skew(70deg); transform: skew(70deg); }
                .bb8-toggle__checkbox:checked + .bb8-toggle__container .bb8__body { -webkit-transform: rotate(180deg); -ms-transform: rotate(180deg); transform: rotate(225deg); }
                .bb8-toggle__checkbox:hover + .bb8-toggle__container .bb8__head::before { left: 100%; }
                .bb8-toggle__checkbox:not(:checked):hover + .bb8-toggle__container .bb8__antenna:nth-child(1) { right: 1.5em; }
                .bb8-toggle__checkbox:hover + .bb8-toggle__container .bb8__antenna:nth-child(2) { left: 0.938em; }
                .bb8-toggle__checkbox:hover + .bb8-toggle__container .bb8__head::after { background-position: 1.375em 0; }
                .bb8-toggle__checkbox:checked:hover + .bb8-toggle__container .bb8__head::before { left: 0; }
                .bb8-toggle__checkbox:checked:hover + .bb8-toggle__container .bb8__antenna:nth-child(2) { left: calc(100% - 0.938em); }
                .bb8-toggle__checkbox:checked:hover + .bb8-toggle__container .bb8__head::after { background-position: -1.375em 0; }
                .bb8-toggle__checkbox:active + .bb8-toggle__container .bb8__head-container { -webkit-transform: rotate(25deg); -ms-transform: rotate(25deg); transform: rotate(25deg); }
                .bb8-toggle__checkbox:checked:active + .bb8-toggle__container .bb8__head-container { -webkit-transform: rotate(-25deg); -ms-transform: rotate(-25deg); transform: rotate(-25deg); }
                .bb8:hover .bb8__head::before, .bb8:hover .bb8__antenna:nth-child(2) { left: 50% !important; }
                .bb8:hover .bb8__antenna:nth-child(1) { right: 0.938em !important; }
                .bb8:hover .bb8__head::after { background-position: 0 0 !important; }
              `}</style>
              <label className="bb8-toggle">
                <input type="checkbox" className="bb8-toggle__checkbox" checked={isDark} onChange={toggleTheme} />
                <div className="bb8-toggle__container">
                  <div className="bb8">
                    <div className="bb8__head-container">
                      <div className="bb8__head">
                        <div className="bb8__antenna" />
                        <div className="bb8__antenna" />
                      </div>
                    </div>
                    <div className="bb8__body" />
                  </div>
                  <div className="artificial__hidden">
                    <div className="bb8-shadow" />
                    <div className="bb8-toggle__scenery">
                      <div className="bb8-toggle__star" /><div className="bb8-toggle__star" /><div className="bb8-toggle__star" />
                      <div className="bb8-toggle__star" /><div className="bb8-toggle__star" /><div className="bb8-toggle__star" />
                      <div className="bb8-toggle__star" />
                      <div className="tatto-1" /><div className="tatto-2" />
                      <div className="gomrassen" /><div className="hermes" /><div className="chenini" />
                      <div className="bb8-toggle__cloud" /><div className="bb8-toggle__cloud" /><div className="bb8-toggle__cloud" />
                    </div>
                  </div>
                </div>
              </label>
            </>
          ) : (
            <>
              <style>{`
                .theme-switch {
                  position: relative;
                  display: inline-block;
                  width: 60px;
                  height: 34px;
                }
                .theme-switch #theme-input {
                  opacity: 0;
                  width: 0;
                  height: 0;
                }
                .theme-slider {
                  position: absolute;
                  cursor: pointer;
                  top: 0; left: 0; right: 0; bottom: 0;
                  background-color: #2196f3;
                  -webkit-transition: 0.4s;
                  transition: 0.4s;
                  z-index: 0;
                  overflow: hidden;
                  border-radius: 34px;
                }
                .sun-moon {
                  position: absolute;
                  height: 26px; width: 26px;
                  left: 4px; bottom: 4px;
                  background-color: yellow;
                  -webkit-transition: 0.4s;
                  transition: 0.4s;
                  border-radius: 50%;
                  z-index: 1;
                }
                #theme-input:checked + .theme-slider {
                  background-color: black;
                }
                #theme-input:focus + .theme-slider {
                  box-shadow: 0 0 1px #2196f3;
                }
                #theme-input:checked + .theme-slider .sun-moon {
                  -webkit-transform: translateX(26px);
                  -ms-transform: translateX(26px);
                  transform: translateX(26px);
                  background-color: white;
                  -webkit-animation: rotate-center 0.6s ease-in-out both;
                  animation: rotate-center 0.6s ease-in-out both;
                }
                @keyframes rotate-center {
                  0% { transform: translateX(26px) rotate(0deg); }
                  100% { transform: translateX(26px) rotate(360deg); }
                }
                @-webkit-keyframes rotate-center {
                  0% { -webkit-transform: translateX(26px) rotate(0deg); }
                  100% { -webkit-transform: translateX(26px) rotate(360deg); }
                }
                .moon-dot {
                  opacity: 0;
                  transition: 0.4s;
                  fill: gray;
                }
                #theme-input:checked + .theme-slider .sun-moon .moon-dot {
                  opacity: 1;
                }
                #moon-dot-1 { position: absolute; left: 10px; top: 3px; width: 6px; height: 6px; z-index: 4; }
                #moon-dot-2 { position: absolute; left: 2px; top: 10px; width: 10px; height: 10px; z-index: 4; }
                #moon-dot-3 { position: absolute; left: 16px; top: 18px; width: 3px; height: 3px; z-index: 4; }
                #light-ray-1 { position: absolute; left: -8px; top: -8px; width: 43px; height: 43px; z-index: -1; fill: white; opacity: 10%; }
                #light-ray-2 { position: absolute; left: -50%; top: -50%; width: 55px; height: 55px; z-index: -1; fill: white; opacity: 10%; }
                #light-ray-3 { position: absolute; left: -18px; top: -18px; width: 60px; height: 60px; z-index: -1; fill: white; opacity: 10%; }
                .cloud-light {
                  position: absolute;
                  fill: #eee;
                  animation: cloud-move 6s infinite;
                }
                .cloud-dark {
                  position: absolute;
                  fill: #ccc;
                  animation: cloud-move 6s infinite;
                  animation-delay: 1s;
                }
                #cloud-1 { left: 30px; top: 15px; width: 40px; }
                #cloud-2 { left: 44px; top: 10px; width: 20px; }
                #cloud-3 { left: 18px; top: 24px; width: 30px; }
                #cloud-4 { left: 36px; top: 18px; width: 40px; }
                #cloud-5 { left: 48px; top: 14px; width: 20px; }
                #cloud-6 { left: 22px; top: 26px; width: 30px; }
                @keyframes cloud-move {
                  0% { transform: translateX(0px); }
                  40% { transform: translateX(4px); }
                  80% { transform: translateX(-4px); }
                  100% { transform: translateX(0px); }
                }
                .stars-group {
                  transform: translateY(-32px);
                  opacity: 0;
                  transition: 0.4s;
                }
                #theme-input:checked + .theme-slider .stars-group {
                  -webkit-transform: translateY(0);
                  -ms-transform: translateY(0);
                  transform: translateY(0);
                  opacity: 1;
                }
                .star-dot {
                  fill: white;
                  position: absolute;
                  -webkit-transition: 0.4s;
                  transition: 0.4s;
                  animation: star-twinkle 2s infinite;
                }
                #star-1 { width: 20px; top: 2px; left: 3px; animation-delay: 0.3s; }
                #star-2 { width: 6px; top: 16px; left: 3px; }
                #star-3 { width: 12px; top: 20px; left: 10px; animation-delay: 0.6s; }
                #star-4 { width: 18px; top: 0px; left: 18px; animation-delay: 1.3s; }
                @keyframes star-twinkle {
                  0% { transform: scale(1); }
                  40% { transform: scale(1.2); }
                  80% { transform: scale(0.8); }
                  100% { transform: scale(1); }
                }
              `}</style>
              <label className="theme-switch">
                <input type="checkbox" id="theme-input" checked={isDark} onChange={toggleTheme} />
                <span className="theme-slider">
                  <svg id="light-ray-1" viewBox="0 0 43 43"><circle cx="21.5" cy="21.5" r="21.5" /></svg>
                  <svg id="light-ray-2" viewBox="0 0 55 55"><circle cx="27.5" cy="27.5" r="27.5" /></svg>
                  <svg id="light-ray-3" viewBox="0 0 60 60"><circle cx="30" cy="30" r="30" /></svg>
                  <svg id="cloud-1" className="cloud-light" viewBox="0 0 40 20"><ellipse cx="20" cy="10" rx="15" ry="8" /></svg>
                  <svg id="cloud-2" className="cloud-light" viewBox="0 0 20 20"><ellipse cx="10" cy="10" rx="8" ry="6" /></svg>
                  <svg id="cloud-3" className="cloud-dark" viewBox="0 0 30 20"><ellipse cx="15" cy="10" rx="12" ry="7" /></svg>
                  <svg id="cloud-4" className="cloud-dark" viewBox="0 0 40 20"><ellipse cx="20" cy="10" rx="15" ry="8" /></svg>
                  <svg id="cloud-5" className="cloud-light" viewBox="0 0 20 20"><ellipse cx="10" cy="10" rx="8" ry="6" /></svg>
                  <svg id="cloud-6" className="cloud-dark" viewBox="0 0 30 20"><ellipse cx="15" cy="10" rx="12" ry="7" /></svg>
                  <span className="stars-group">
                    <svg id="star-1" className="star-dot" viewBox="0 0 20 20"><polygon points="10,0 13,7 20,7 14,12 16,20 10,15 4,20 6,12 0,7 7,7" /></svg>
                    <svg id="star-2" className="star-dot" viewBox="0 0 6 6"><polygon points="3,0 4,2 6,2 4,3.5 5,6 3,4.5 1,6 2,3.5 0,2 2,2" /></svg>
                    <svg id="star-3" className="star-dot" viewBox="0 0 12 12"><polygon points="6,0 8,4 12,4 9,7 10,12 6,9 2,12 3,7 0,4 4,4" /></svg>
                    <svg id="star-4" className="star-dot" viewBox="0 0 18 18"><polygon points="9,0 12,6 18,6 13,10 15,18 9,13 3,18 5,10 0,6 6,6" /></svg>
                  </span>
                  <span className="sun-moon">
                    <svg width="26" height="26" viewBox="0 0 26 26">
                      <circle id="moon-dot-1" className="moon-dot" cx="8" cy="6" r="3" />
                      <circle id="moon-dot-2" className="moon-dot" cx="5" cy="13" r="5" />
                      <circle id="moon-dot-3" className="moon-dot" cx="16" cy="19" r="1.5" />
                    </svg>
                  </span>
                </span>
              </label>
            </>
          )}

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
                  <Link to="/profile" style={{ ...dropdownItemStyle, textDecoration: 'none' }}>
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
          <Link to="/past-papers" style={link(currentPage === 'past-papers')} onClick={() => setMenuOpen(false)}>
            <PastPaperIcon />{t('topnav.pastPapers')}
          </Link>
          <Link to="/topics" style={link(currentPage === 'topics-generate')} onClick={() => setMenuOpen(false)}>
            <BookIcon />{t('topnav.topicsGenerate')}
          </Link>
          <Link to="/admission-tests" style={link(currentPage === 'admission-tests')} onClick={() => setMenuOpen(false)}>
            <AdmissionIcon />{t('topnav.admissionTests')}
          </Link>
          {!isTeacher && (
            <Link to="/class-mode" style={link(currentPage === 'class-mode')} onClick={() => setMenuOpen(false)}>
              <ClassIcon />{t('topnav.classMode')}
            </Link>
          )}
          {(!isTeacher || role === 'admin') && (
            <>
              <Link to="/analytics" style={link(currentPage === 'analytics')} onClick={() => setMenuOpen(false)}>
                <AnalyticsIcon />{t('topnav.studentDashboard')}
              </Link>
              <Link to="/profile" style={link(currentPage === 'profile')} onClick={() => setMenuOpen(false)}>
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
