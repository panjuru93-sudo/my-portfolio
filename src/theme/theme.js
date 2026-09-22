import { createTheme } from '@mui/material/styles';

// Dark Tech Theme — Sui 기반 컬러 팔레트 디자인 시스템
// 브랜드 블루(primary)는 라이트/다크 공통, 배경·텍스트만 모드별로 갈라진다.
const PRIMARY = '#1455F5';
const PRIMARY_LIGHT = '#4D8FFF';
const PRIMARY_DARK = '#0A35C0';
const ACCENT = '#5599FF';

/**
 * createAppTheme — 라이트/다크 모드에 맞는 MUI 테마를 생성한다.
 * palette 값은 MUI 내부 색상 연산(alpha 등)에 쓰이므로 실제 hex를 사용하고,
 * components.styleOverrides 쪽은 CSS 변수(var(--...))를 참조해 index.css의 팔레트와 동기화한다.
 *
 * @param {'light'|'dark'} mode
 * @returns {import('@mui/material/styles').Theme}
 */
export function createAppTheme(mode = 'dark') {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: { main: PRIMARY, light: PRIMARY_LIGHT, dark: PRIMARY_DARK },
      secondary: { main: isDark ? '#D6E8FF' : PRIMARY },
      background: {
        default: isDark ? '#000000' : '#FFFFFF',
        paper: isDark ? '#0A0E24' : '#FFFFFF',
      },
      text: {
        primary: isDark ? '#FFFFFF' : '#0A0E24',
        secondary: isDark ? '#B0BDD8' : '#45506E',
        disabled: isDark ? '#5A6480' : '#6B7690',
      },
      divider: isDark ? '#1A2040' : '#E1E6F0',
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
            background: `linear-gradient(135deg, ${PRIMARY}, ${PRIMARY_LIGHT})`,
            '&:hover': {
              background: `linear-gradient(135deg, ${PRIMARY_LIGHT}, ${ACCENT})`,
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            background: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
            backdropFilter: 'blur(10px)',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: 'var(--appbar-bg)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--color-border)',
            boxShadow: 'none',
          },
        },
      },
    },
  });
}

export default createAppTheme;
