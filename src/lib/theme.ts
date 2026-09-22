export const theme = {
  green50: '#d8f3dc',
  green100: '#b7e4c7',
  green200: '#95d5b2',
  green300: '#74c69d',
  green400: '#52b788',
  green500: '#40916c',
  green600: '#2d6a4f',
  green700: '#1b4332',
  green800: '#081c15',
} as const;

const PALETTE_FALLBACK: Record<string, string> = {
  '--green-50': theme.green50,
  '--green-100': theme.green100,
  '--green-200': theme.green200,
  '--green-300': theme.green300,
  '--green-400': theme.green400,
  '--green-500': theme.green500,
  '--green-600': theme.green600,
  '--green-700': theme.green700,
  '--green-800': theme.green800,
  '--color-primary': theme.green400,
  '--color-primary-hover': theme.green500,
  '--color-primary-active': theme.green600,
  '--color-secondary': theme.green300,
  '--color-accent-token': theme.green200,
  '--color-background': theme.green800,
  '--color-background-secondary': theme.green700,
  '--color-surface-token': theme.green700,
  '--color-surface-hover': theme.green600,
  '--color-text-primary': theme.green50,
  '--color-text-secondary': theme.green100,
  '--color-text-muted': theme.green200,
  '--color-border-token': theme.green600,
  '--color-border-hover': theme.green400,
  '--color-selection': theme.green400,
  '--color-focus': theme.green300,
  '--color-cream': theme.green50,
  '--color-ink': theme.green800,
  '--color-accent': theme.green400,
  '--color-accent-light': theme.green300,
  '--color-accent-muted': theme.green200,
  '--color-warm': theme.green700,
  '--color-warm-light': theme.green300,
  '--color-muted': theme.green200,
  '--color-light': theme.green100,
  '--color-elevated': theme.green600,
  '--color-elevated-dark': theme.green700,
  '--color-surface': theme.green800,
  '--color-surface-base': theme.green800,
  '--color-surface-card': theme.green700,
  '--color-surface-float': theme.green700,
  '--color-surface-border': theme.green600,
  '--color-surface-mid': theme.green700,
  '--color-border': theme.green200,
  '--color-border-dark': theme.green300,
  '--color-border-subtle': theme.green600,
  '--color-border-subtler': theme.green600,
  '--color-charcoal': theme.green800,
  '--color-gray-soft': theme.green200,
  '--color-gray-mid': theme.green500,
  '--color-gray-btn': theme.green600,
};

export function getThemeColor(token: string): string {
  const key = token.startsWith('--') ? token : `--${token}`;
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return PALETTE_FALLBACK[key] ?? '';
  }
  const value = getComputedStyle(document.documentElement).getPropertyValue(key).trim();
  if (value) {
    if (value.startsWith('var(')) {
      const nested = value.match(/var\((--[^),\s]+)/);
      if (nested?.[1]) {
        return getThemeColor(nested[1]);
      }
    }
    return value;
  }
  return PALETTE_FALLBACK[key] ?? '';
}

export function withAlpha(hex: string, alpha: number): string {
  const normalized = hex.replace('#', '');
  if (normalized.length !== 6) return hex;
  const r = Number.parseInt(normalized.slice(0, 2), 16);
  const g = Number.parseInt(normalized.slice(2, 4), 16);
  const b = Number.parseInt(normalized.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
