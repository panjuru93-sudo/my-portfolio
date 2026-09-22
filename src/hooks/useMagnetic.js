import { useEffect, useRef } from 'react';
import { usePointerCapability } from './usePointerCapability';

/**
 * useMagnetic — 요소에 마우스가 가까이 오면 커서 쪽으로 살짝 끌려가는 자기장 효과를 적용한다.
 * 터치 전용 기기에서는 자동으로 비활성화된다.
 *
 * @param {object} options
 * @param {number} options.strength - 끌림 강도(0~1) [Optional, 기본값: 0.35]
 * @returns {import('react').RefObject} 대상 요소에 연결할 ref
 *
 * Example usage:
 * const magneticRef = useMagnetic({ strength: 0.3 });
 * <Button ref={magneticRef}>클릭</Button>
 */
export function useMagnetic({ strength = 0.35 } = {}) {
  const ref = useRef(null);
  const supportsHover = usePointerCapability();

  useEffect(() => {
    if (!supportsHover) return undefined;
    const node = ref.current;
    if (!node) return undefined;

    node.style.transition = 'transform 0.2s cubic-bezier(0.33, 1, 0.68, 1)';

    const handleMouseMove = (e) => {
      const rect = node.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      node.style.transform = `translate(${relX * strength}px, ${relY * strength}px)`;
    };

    const handleMouseLeave = () => {
      node.style.transform = 'translate(0, 0)';
    };

    node.addEventListener('mousemove', handleMouseMove);
    node.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      node.removeEventListener('mousemove', handleMouseMove);
      node.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [supportsHover, strength]);

  return ref;
}
