// Comenius design tokens — single source of truth

export const colors = {
  primary: '#1e40af',
  primaryHover: '#1e3a8a',
  primaryForeground: '#ffffff',
  primaryLight: '#dbeafe',
  primaryLightForeground: '#1e40af',

  secondary: '#f1f5f9',
  secondaryForeground: '#0f172a',

  background: '#ffffff',
  foreground: '#0f172a',

  card: '#ffffff',
  cardForeground: '#0f172a',

  muted: '#f8fafc',
  mutedForeground: '#64748b',

  accent: '#dbeafe',
  accentForeground: '#1e40af',

  destructive: '#dc2626',
  destructiveForeground: '#ffffff',
  destructiveBg: '#fee2e2',
  destructiveBorder: '#fecaca',

  success: '#16a34a',
  successBg: '#dcfce7',
  successBorder: '#bbf7d0',

  warning: '#d97706',
  warningBg: '#fef3c7',
  warningBorder: '#fed7aa',

  border: '#e2e8f0',
  borderAlpha: 'rgba(226,232,240,0.5)',

  ring: '#3b82f6',
};

export const typography = {
  fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
  fontMono: "'Geist Mono', 'SF Mono', 'Cascadia Code', monospace",
  size: {
    xs: 12,
    sm: 13,
    base: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    hero: 60,
  },
  weight: {
    normal: 400 as const,
    medium: 500 as const,
    semibold: 600 as const,
    bold: 700 as const,
  },
  leading: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.625,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
};

export const radii = {
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  '2xl': 16,
  full: '50%',
};

export const shadows = {
  sm: '0 1px 2px rgba(0,0,0,0.05)',
  md: '0 1px 3px rgba(0,0,0,0.08)',
  lg: '0 10px 40px rgba(0,0,0,0.1)',
  xl: '0 20px 25px rgba(0,0,0,0.1)',
  '2xl': '0 25px 50px rgba(0,0,0,0.15)',
};

export const nav = {
  height: 56,
  bg: 'rgba(255,255,255,0.8)',
  border: '1px solid rgba(226,232,240,0.5)',
  blur: 'blur(12px)',
};
