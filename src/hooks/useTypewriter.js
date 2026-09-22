import { useEffect, useState } from 'react';

/**
 * useTypewriter — 문자열을 한 글자씩 순차적으로 노출한다.
 *
 * @param {string} text - 타이핑할 전체 문자열 [Required]
 * @param {number} speed - 글자당 타이핑 간격(ms) [Optional, 기본값: 45]
 * @param {number} startDelay - 타이핑 시작 전 대기 시간(ms) [Optional, 기본값: 300]
 * @returns {{ displayed: string, done: boolean }} 현재까지 노출된 문자열과 완료 여부
 *
 * Example usage:
 * const { displayed, done } = useTypewriter('안녕하세요', 40, 500);
 */
export function useTypewriter(text, speed = 45, startDelay = 300) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let charIndex = 0;
    let intervalId;

    const startTimer = setTimeout(() => {
      intervalId = setInterval(() => {
        charIndex += 1;
        setDisplayed(text.slice(0, charIndex));
        if (charIndex >= text.length) {
          clearInterval(intervalId);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimer);
      clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}
