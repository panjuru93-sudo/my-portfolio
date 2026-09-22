import { Box, Tooltip } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useThemeMode } from '../../hooks/useThemeMode';

/**
 * ThemeToggle 컴포넌트 — 해/달 아이콘이 모핑되는 다크·라이트 모드 스위치.
 *
 * Example usage:
 * <ThemeToggle />
 */
export default function ThemeToggle() {
  const { mode, toggleMode } = useThemeMode();
  const isDark = mode === 'dark';

  return (
    <Tooltip title={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'} arrow>
      <Box
        component="button"
        type="button"
        onClick={toggleMode}
        aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
        aria-pressed={isDark}
        sx={{
          position: 'relative',
          width: 54,
          height: 30,
          borderRadius: 999,
          border: '1px solid var(--color-border)',
          background: 'var(--surface-panel)',
          cursor: 'pointer',
          p: 0,
          flexShrink: 0,
          transition: 'background-color 0.3s ease, border-color 0.3s ease',
        }}
      >
        {/* 슬라이딩 손잡이 */}
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            top: 2,
            left: isDark ? 26 : 2,
            width: 24,
            height: 24,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #1455F5, #4D8FFF)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'left 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          <DarkModeIcon
            sx={{
              position: 'absolute',
              fontSize: 15,
              color: '#FFFFFF',
              opacity: isDark ? 1 : 0,
              transform: isDark ? 'rotate(0deg) scale(1)' : 'rotate(90deg) scale(0.4)',
              transition: 'opacity 0.25s ease, transform 0.25s ease',
            }}
          />
          <LightModeIcon
            sx={{
              position: 'absolute',
              fontSize: 15,
              color: '#FFFFFF',
              opacity: isDark ? 0 : 1,
              transform: isDark ? 'rotate(-90deg) scale(0.4)' : 'rotate(0deg) scale(1)',
              transition: 'opacity 0.25s ease, transform 0.25s ease',
            }}
          />
        </Box>
      </Box>
    </Tooltip>
  );
}
