import { useEffect, useState } from 'react';

const QUERY = '(hover: hover) and (pointer: fine)';

/**
 * usePointerCapability — 실제 마우스(hover 가능 + 정밀 포인터)를 사용 중인지 감지한다.
 * 터치 전용 기기(모바일)에서는 false를 반환해 커서 관련 효과를 끌 수 있게 한다.
 *
 * @returns {boolean} supportsHover
 *
 * Example usage:
 * const supportsHover = usePointerCapability();
 * if (!supportsHover) return null;
 */
export function usePointerCapability() {
  const [supportsHover, setSupportsHover] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const handleChange = (e) => setSupportsHover(e.matches);
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  return supportsHover;
}
