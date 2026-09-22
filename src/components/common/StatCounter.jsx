import { Box, Typography } from '@mui/material';
import { useInView } from '../../hooks/useInView';
import { useCountUp } from '../../hooks/useCountUp';

/**
 * StatCounter 컴포넌트 — 뷰포트에 들어오면 0에서 목표 숫자까지 카운팅되는 통계 지표.
 *
 * Props:
 * @param {number} value - 목표 숫자 [Required]
 * @param {string} suffix - 숫자 뒤에 붙일 단위(예: '개', '%') [Optional]
 * @param {string} label - 하단 설명 텍스트 [Required]
 * @param {string} color - 숫자 강조 색상 [Optional, 기본값: 'var(--color-primary-light)']
 * @param {number} decimals - 소수점 자리수 [Optional, 기본값: 0]
 *
 * Example usage:
 * <StatCounter value={3} suffix="개" label="배포한 프로젝트" />
 */
export default function StatCounter({ value, suffix = '', label, color = 'var(--color-primary-light)', decimals = 0 }) {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const animated = useCountUp(value, { active: inView, duration: 1400, decimals });

  return (
    <Box ref={ref} sx={{ textAlign: 'center' }}>
      <Typography sx={{ fontWeight: 800, fontSize: { xs: '2rem', md: '2.6rem' }, lineHeight: 1, mb: 0.5 }}>
        <Box component="span" sx={{ color }}>
          {decimals ? animated.toFixed(decimals) : Math.round(animated)}
        </Box>
        <Box component="span" sx={{ color: 'var(--color-text-primary)' }}>{suffix}</Box>
      </Typography>
      <Typography sx={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>
        {label}
      </Typography>
    </Box>
  );
}
