import Box from '@mui/material/Box';
import { useInView } from '../../hooks/useInView';

/**
 * RevealBackground 컴포넌트 — 섹션이 스크롤로 뷰포트에 처음 들어올 때 배경이 아래에서 슬라이드되며 나타난다.
 *
 * Props:
 * @param {string} background - 슬라이드될 배경 값(색상/그라디언트) [Required]
 *
 * Example usage:
 * <RevealBackground background="var(--color-bg-secondary)" />
 */
export default function RevealBackground({ background }) {
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <Box
      ref={ref}
      aria-hidden="true"
      sx={{
        position: 'absolute',
        inset: 0,
        background,
        transform: inView ? 'translateY(0%)' : 'translateY(8%)',
        opacity: inView ? 1 : 0,
        transition: 'transform 0.9s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.9s ease',
        willChange: 'transform, opacity',
      }}
    />
  );
}
