import { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { usePointerCapability } from '../../hooks/usePointerCapability';

const TRAIL_LENGTH = 6;
const FOLLOWER_EASE = 0.18;
const TRAIL_EASE = 0.28;
const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select, [data-cursor-hover]';

/**
 * CustomCursor 컴포넌트 — 마우스를 따라다니는 점·링·트레일로 구성된 커스텀 커서.
 * 인터랙티브 요소 위에서는 링이 커지며 변형되고, 터치 전용 기기에서는 렌더링되지 않는다.
 * App.jsx 최상단에 한 번만 마운트해서 사용한다.
 *
 * Example usage:
 * <CustomCursor />
 */
export default function CustomCursor() {
  const enabled = usePointerCapability();
  const [hovering, setHovering] = useState(false);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const trailRefs = useRef([]);

  useEffect(() => {
    if (!enabled) return undefined;

    document.body.classList.add('custom-cursor-active');

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const follower = { x: mouse.x, y: mouse.y };
    const trail = Array.from({ length: TRAIL_LENGTH }, () => ({ x: mouse.x, y: mouse.y }));

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;
      }
    };

    const handleOver = (e) => {
      if (e.target.closest?.(INTERACTIVE_SELECTOR)) setHovering(true);
    };
    const handleOut = (e) => {
      if (e.target.closest?.(INTERACTIVE_SELECTOR)) setHovering(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);

    let rafId;
    const animate = () => {
      follower.x += (mouse.x - follower.x) * FOLLOWER_EASE;
      follower.y += (mouse.y - follower.y) * FOLLOWER_EASE;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${follower.x}px, ${follower.y}px, 0) translate(-50%, -50%)`;
      }

      let prev = follower;
      trail.forEach((point, i) => {
        point.x += (prev.x - point.x) * TRAIL_EASE;
        point.y += (prev.y - point.y) * TRAIL_EASE;
        const node = trailRefs.current[i];
        if (node) {
          node.style.transform = `translate3d(${point.x}px, ${point.y}px, 0) translate(-50%, -50%)`;
        }
        prev = point;
      });

      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      cancelAnimationFrame(rafId);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
        <Box
          key={i}
          ref={(el) => { trailRefs.current[i] = el; }}
          aria-hidden="true"
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: '#4D8FFF',
            opacity: (1 - i / TRAIL_LENGTH) * 0.5,
            mixBlendMode: 'difference',
            pointerEvents: 'none',
            zIndex: 9997,
            willChange: 'transform',
          }}
        />
      ))}

      <Box
        ref={ringRef}
        aria-hidden="true"
        data-cursor-ring=""
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: hovering ? 64 : 34,
          height: hovering ? 64 : 34,
          borderRadius: '50%',
          border: '1.5px solid #FFFFFF',
          background: hovering ? 'rgba(255,255,255,0.15)' : 'transparent',
          mixBlendMode: 'difference',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'width 0.25s ease, height 0.25s ease, background 0.25s ease',
          willChange: 'transform',
        }}
      />

      <Box
        ref={dotRef}
        aria-hidden="true"
        data-cursor-dot=""
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#FFFFFF',
          mixBlendMode: 'difference',
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform',
        }}
      />
    </>
  );
}
