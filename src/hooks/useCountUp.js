import { useEffect, useRef, useState } from 'react';

const easeOutCubic = (t) => 1 - (1 - t) ** 3;

/**
 * useCountUp — requestAnimationFrame으로 0(또는 start)에서 목표값까지 부드럽게 증가시킨다.
 *
 * @param {number} end - 도달할 목표 숫자 [Required]
 * @param {object} options
 * @param {boolean} options.active - true가 되는 시점에 카운팅 시작 [Optional, 기본값: true]
 * @param {number} options.duration - 애니메이션 길이(ms) [Optional, 기본값: 1200]
 * @param {number} options.start - 시작 숫자 [Optional, 기본값: 0]
 * @param {number} options.decimals - 소수점 자리수 [Optional, 기본값: 0]
 * @returns {number} 현재 애니메이션 중인 숫자값
 *
 * Example usage:
 * const value = useCountUp(80, { active: inView });
 */
export function useCountUp(end, { active = true, duration = 1200, start = 0, decimals = 0 } = {}) {
  const [value, setValue] = useState(start);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!active) return undefined;

    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = easeOutCubic(progress);
      const current = start + (end - start) * eased;
      setValue(Number(current.toFixed(decimals)));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active, end, duration, start, decimals]);

  return value;
}
