// Reusable style objects matching Comenius Website component patterns

import React from 'react';
import { colors, typography, spacing, radii, shadows, nav } from './tokens';

const font = typography.fontFamily;

// -- Buttons --

export const btn: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: spacing.sm,
  padding: '10px 20px',
  borderRadius: radii.md,
  fontSize: typography.size.base,
  fontWeight: typography.weight.medium,
  cursor: 'pointer',
  border: 'none',
  transition: 'all 0.2s',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  fontFamily: font,
};

export const btnPrimary: React.CSSProperties = {
  ...btn,
  background: colors.primary,
  color: colors.primaryForeground,
};

export const btnOutline: React.CSSProperties = {
  ...btn,
  background: 'transparent',
  color: colors.foreground,
  border: `1px solid ${colors.border}`,
};

export const btnGhost: React.CSSProperties = {
  ...btn,
  background: 'transparent',
  color: colors.foreground,
};

export const btnSm: React.CSSProperties = {
  ...btn,
  padding: '6px 12px',
  fontSize: typography.size.sm,
  height: 32,
};

export const btnLg: React.CSSProperties = {
  ...btn,
  padding: '12px 32px',
  fontSize: typography.size.md,
  height: 56,
};

export const btnIcon: React.CSSProperties = {
  ...btn,
  width: 36,
  height: 36,
  padding: 0,
  justifyContent: 'center',
  borderRadius: radii.full,
};

// -- Cards --

export const card: React.CSSProperties = {
  background: colors.card,
  border: `1px solid ${colors.borderAlpha}`,
  borderRadius: radii.lg,
  overflow: 'hidden',
};

export const cardHeader: React.CSSProperties = {
  padding: '24px 24px 16px',
};

export const cardContent: React.CSSProperties = {
  padding: '0 24px 24px',
};

// -- Inputs --

export const inputBase: React.CSSProperties = {
  padding: '8px 12px',
  borderRadius: radii.md,
  border: `1px solid ${colors.border}`,
  fontSize: typography.size.base,
  background: colors.background,
  color: colors.foreground,
  fontFamily: font,
  width: '100%',
  boxSizing: 'border-box',
  outline: 'none',
};

export const selectBase: React.CSSProperties = {
  ...inputBase,
  cursor: 'pointer',
};

// -- Badges --

const badgeBase: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  padding: '2px 8px',
  borderRadius: radii.sm,
  fontSize: typography.size.xs,
  fontWeight: typography.weight.medium,
};

export const badgeSecondary: React.CSSProperties = {
  ...badgeBase,
  background: colors.secondary,
  color: colors.secondaryForeground,
  border: `1px solid ${colors.border}`,
};

export const badgeSuccess: React.CSSProperties = {
  ...badgeBase,
  background: colors.successBg,
  color: colors.success,
  border: `1px solid ${colors.successBorder}`,
};

export const badgeError: React.CSSProperties = {
  ...badgeBase,
  background: colors.destructiveBg,
  color: colors.destructive,
  border: `1px solid ${colors.destructiveBorder}`,
};

export const badgeWarning: React.CSSProperties = {
  ...badgeBase,
  background: colors.warningBg,
  color: colors.warning,
  border: `1px solid ${colors.warningBorder}`,
};

export const badgePrimary: React.CSSProperties = {
  ...badgeBase,
  background: colors.primaryLight,
  color: colors.primaryLightForeground,
  border: `1px solid #bfdbfe`,
};

// -- Nav --

export const navLink: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: spacing.sm,
  padding: `0 ${spacing.md}px`,
  height: 32,
  borderRadius: radii.md,
  fontSize: typography.size.base,
  fontWeight: typography.weight.medium,
  textDecoration: 'none',
  color: colors.foreground,
  transition: 'all 0.15s',
  fontFamily: font,
};

export const navLinkActive: React.CSSProperties = {
  ...navLink,
  background: colors.secondary,
};

export const navContainer: React.CSSProperties = {
  position: 'sticky',
  top: 0,
  zIndex: 50,
  borderBottom: nav.border,
  background: nav.bg,
  backdropFilter: nav.blur,
  WebkitBackdropFilter: nav.blur,
};

export const navInner: React.CSSProperties = {
  maxWidth: 1280,
  margin: '0 auto',
  padding: '0 24px',
  height: nav.height,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

// -- Layout --

export const pageContainer: React.CSSProperties = {
  minHeight: '100vh',
  background: colors.background,
};

export const contentContainer: React.CSSProperties = {
  maxWidth: 1280,
  margin: '0 auto',
  padding: '32px 24px',
};

// -- Font helpers --

export const textSm: React.CSSProperties = {
  fontSize: typography.size.base,
  fontFamily: font,
};

export const textMuted: React.CSSProperties = {
  color: colors.mutedForeground,
  fontFamily: font,
};

export const textLg: React.CSSProperties = {
  fontSize: typography.size.lg,
  fontFamily: font,
};

export const textXl: React.CSSProperties = {
  fontSize: typography.size.xl,
  fontWeight: typography.weight.semibold,
  fontFamily: font,
};

export const text2xl: React.CSSProperties = {
  fontSize: typography.size['2xl'],
  fontWeight: typography.weight.semibold,
  fontFamily: font,
};

export const text3xl: React.CSSProperties = {
  fontSize: typography.size['3xl'],
  fontWeight: typography.weight.semibold,
  fontFamily: font,
};

// -- Section --

export const section: React.CSSProperties = {
  padding: '64px 0',
};

// -- Misc --

export const progressBar: React.CSSProperties = {
  width: '100%',
  height: 8,
  borderRadius: 4,
  background: colors.secondary,
  overflow: 'hidden',
};

export const progressFill = (pct: number): React.CSSProperties => ({
  height: '100%',
  borderRadius: 4,
  background: colors.primary,
  width: `${pct}%`,
  transition: 'width 0.3s',
});

export const separator: React.CSSProperties = {
  height: 1,
  background: colors.border,
  margin: '4px 0',
};
