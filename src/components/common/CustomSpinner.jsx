import { Box } from '@mui/material';

/**
 * CustomSpinner 컴포넌트 — 서로 반대로 도는 이중 링 기반 커스텀 로딩 스피너.
 *
 * Props:
 * @param {number} size - 스피너 지름(px) [Optional, 기본값: 40]
 * @param {string} color - 링 색상 [Optional, 기본값: 'var(--color-primary-light)']
 *
 * Example usage:
 * <CustomSpinner size={28} color="var(--color-primary-light)" />
 */
export default function CustomSpinner({ size = 40, color = 'var(--color-primary-light)' }) {
  return (
    <Box
      role="status"
      aria-label="로딩 중"
      sx={{
        width: size,
        height: size,
        position: 'relative',
        display: 'inline-block',
        '@keyframes spinnerRotate': { to: { transform: 'rotate(360deg)' } },
        '@keyframes spinnerRotateReverse': { to: { transform: 'rotate(-360deg)' } },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: '3px solid transparent',
          borderTopColor: color,
          borderRightColor: color,
          animation: 'spinnerRotate 0.9s linear infinite',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: `${Math.max(size * 0.2, 4)}px`,
          borderRadius: '50%',
          border: '3px solid transparent',
          borderBottomColor: `color-mix(in srgb, ${color} 56%, transparent)`,
          borderLeftColor: `color-mix(in srgb, ${color} 56%, transparent)`,
          animation: 'spinnerRotateReverse 1.3s linear infinite',
        }}
      />
    </Box>
  );
}
