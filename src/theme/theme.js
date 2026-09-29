import { createTheme } from '@mui/material/styles';

// Paper & Red Theme — 종이 질감 배경 + 브랜드 레드 포인트 (라이트 고정)
const PRIMARY = '#E6432E';
const PRIMARY_LIGHT = '#F06A55';
const PRIMARY_DARK = '#B83322';
const ACCENT = '#8C2A1C';

// 리퀴드 글래스(프로스티드 글래스) 카드 전반에서 재사용하는 블러 값
export const GLASS_BLUR = 'blur(20px) saturate(180%)';

/**
 * createAppTheme — Paper & Red 라이트 테마의 MUI 테마를 생성한다.
 * palette 값은 MUI 내부 색상 연산(alpha 등)에 쓰이므로 실제 hex를 사용하고,
 * components.styleOverrides 쪽은 CSS 변수(var(--...))를 참조해 index.css의 팔레트와 동기화한다.
 *
 * @returns {import('@mui/material/styles').Theme}
 */
export function createAppTheme() {
  return createTheme({
    palette: {
      mode: 'light',
      primary: { main: PRIMARY, light: PRIMARY_LIGHT, dark: PRIMARY_DARK },
      secondary: { main: '#1A1A1A' },
      background: {
        default: '#F6F1E8',
        paper: '#FFFFFF',
      },
      text: {
        primary: '#1A1A1A',
        secondary: '#4A4642',
        disabled: '#7A756D',
      },
      divider: 'rgba(26,26,26,0.14)',
    },
    typography: {
      fontFamily: '"Inter", "Pretendard", "Noto Sans KR", sans-serif',
      h1: { fontWeight: 800, letterSpacing: '-0.03em' },
      h2: { fontWeight: 800, letterSpacing: '-0.02em' },
      h3: { fontWeight: 700 },
      h4: { fontWeight: 700 },
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
            color: '#FFFFFF',
            '&:hover': {
              background: `linear-gradient(135deg, ${PRIMARY_DARK}, ${ACCENT})`,
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            background: 'var(--surface-card-strong)',
            border: '1px solid var(--color-border)',
            borderRadius: 16,
            backdropFilter: GLASS_BLUR,
            WebkitBackdropFilter: GLASS_BLUR,
            boxShadow: '0 8px 32px rgba(26,26,26,0.1)',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: 'var(--appbar-bg)',
            backdropFilter: GLASS_BLUR,
            WebkitBackdropFilter: GLASS_BLUR,
            borderBottom: '1px solid var(--color-border)',
            boxShadow: 'none',
          },
        },
      },
    },
  });
}

export default createAppTheme;
