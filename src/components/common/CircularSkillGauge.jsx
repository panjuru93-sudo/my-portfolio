import { Box, Typography } from '@mui/material';
import { useInView } from '../../hooks/useInView';
import { useCountUp } from '../../hooks/useCountUp';

/**
 * CircularSkillGauge 컴포넌트 — SVG 원형 링으로 스킬 숙련도를 표시하고,
 * 뷰포트에 들어오면 링 채움과 숫자 카운팅이 동시에 애니메이션된다.
 *
 * Props:
 * @param {number} value - 숙련도(0~100) [Required]
 * @param {string} label - 링 아래 표시할 이름 [Optional]
 * @param {string} color - 링 색상 [Optional, 기본값: 'var(--color-primary-light)']
 * @param {number} size - 링 지름(px) [Optional, 기본값: 92]
 *
 * Example usage:
 * <CircularSkillGauge value={80} label="HTML" color="var(--color-primary)" />
 */
export default function CircularSkillGauge({ value, label, color = 'var(--color-primary-light)', size = 92 }) {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const animatedValue = useCountUp(value, { active: inView, duration: 1200 });

  const strokeWidth = Math.max(5, Math.round(size * 0.075));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (inView ? value : 0) / 100 * circumference;

  return (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        opacity: inView ? 1 : 0,
        transform: inView ? 'scale(1)' : 'scale(0.85)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
    >
      <Box sx={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)' }}
          />
        </svg>
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography sx={{ color: 'var(--color-text-primary)', fontWeight: 700, fontSize: size * 0.22 }}>
            {Math.round(animatedValue)}%
          </Typography>
        </Box>
      </Box>
      {label && (
        <Typography sx={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', fontWeight: 600 }} noWrap>
          {label}
        </Typography>
      )}
    </Box>
  );
}
