import { createTheme } from '@mui/material/styles';

// Dark Tech Theme — Sui 기반 컬러 팔레트 디자인 시스템
export const colorTokens = {
  primary: '#1455F5',
  primaryLight: '#4D8FFF',
  primaryDark: '#0A35C0',
  secondary: '#D6E8FF',
  accent: '#5599FF',
  bgPrimary: '#000000',
  bgSecondary: '#03040D',
  bgCard: '#0A0E24',
  textPrimary: '#FFFFFF',
  textSecondary: '#B0BDD8',
  textMuted: '#5A6480',
  buttonPrimary: '#1455F5',
  buttonHover: '#4D8FFF',
  link: '#4D8FFF',
  linkHover: '#D6E8FF',
  border: '#1A2040',
  divider: '#0D1228',
};

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colorTokens.primary,
      light: colorTokens.primaryLight,
      dark: colorTokens.primaryDark,
    },
    secondary: {
      main: colorTokens.secondary,
    },
    background: {
      default: colorTokens.bgPrimary,
      paper: colorTokens.bgCard,
    },
    text: {
      primary: colorTokens.textPrimary,
      secondary: colorTokens.textSecondary,
      disabled: colorTokens.textMuted,
    },
    divider: colorTokens.border,
  },
  typography: {
    fontFamily: '"Inter", "Pretendard", "Noto Sans KR", sans-serif',
    h1: { fontWeight: 700, letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, letterSpacing: '-0.01em' },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    body1: { lineHeight: 1.75 },
    body2: { lineHeight: 1.6 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          padding: '10px 24px',
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${colorTokens.primary}, ${colorTokens.primaryLight})`,
          '&:hover': {
            background: `linear-gradient(135deg, ${colorTokens.primaryLight}, ${colorTokens.accent})`,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: colorTokens.bgCard,
          border: `1px solid ${colorTokens.border}`,
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${colorTokens.border}`,
          boxShadow: 'none',
        },
      },
    },
  },
});

export default theme;
