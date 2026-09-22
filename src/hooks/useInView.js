import { useEffect, useRef, useState } from 'react';

/**
 * useInView 훅 — 엘리먼트가 뷰포트에 처음 들어오는 시점을 감지한다.
 *
 * Props:
 * @param {number} threshold - 교차 판정 비율 [Optional, 기본값: 0.15]
 * @param {string} rootMargin - IntersectionObserver rootMargin [Optional, 기본값: '0px']
 *
 * Example usage:
 * const [ref, inView] = useInView();
 */
export function useInView({ threshold = 0.15, rootMargin = '0px' } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView];
}
