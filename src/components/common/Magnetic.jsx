import { cloneElement, forwardRef } from 'react';
import { useMagnetic } from '../../hooks/useMagnetic';

function mergeRefs(...refs) {
  return (node) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === 'function') ref(node);
      else ref.current = node;
    });
  };
}

/**
 * Magnetic 컴포넌트 — 자식 요소 하나에 자기장 효과(useMagnetic)를 연결하는 얇은 래퍼.
 * forwardRef로 외부에서 전달된 ref(예: Tooltip이 위치 계산을 위해 전달하는 ref)와
 * 자기장 효과용 내부 ref를 함께 병합해 자식에 전달한다.
 *
 * Props:
 * @param {node} children - ref를 전달받을 수 있는 단일 요소(예: MUI Button) [Required]
 * @param {number} strength - 끌림 강도(0~1) [Optional, 기본값: 0.35]
 *
 * Example usage:
 * <Magnetic strength={0.3}><Button>클릭</Button></Magnetic>
 * <Tooltip title="GitHub"><Magnetic><IconButton>...</IconButton></Magnetic></Tooltip>
 */
const Magnetic = forwardRef(function Magnetic({ children, strength = 0.35, ...forwardedProps }, forwardedRef) {
  const magneticRef = useMagnetic({ strength });
  // Tooltip 등 부모가 클론 시 주입하는 이벤트 props(onMouseEnter 등)를 실제 DOM 자식까지 그대로 전달한다.
  return cloneElement(children, {
    ...forwardedProps,
    ref: mergeRefs(magneticRef, forwardedRef),
  });
});

export default Magnetic;
