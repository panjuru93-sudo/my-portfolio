import { useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeModeContext } from './themeModeContextInstance';

const STORAGE_KEY = 'portfolio-theme-mode';

function getInitialMode() {
  // index.html의 인라인 스크립트가 첫 페인트 전에 이미 <html data-theme="..."> 를 설정해 둔다.
  if (typeof document !== 'undefined') {
    const attr = document.documentElement.getAttribute('data-theme');
    if (attr === 'light' || attr === 'dark') return attr;
  }
  return 'dark';
}

/**
 * ThemeModeProvider 컴포넌트 — 라이트/다크 모드 상태를 앱 전역에 제공한다.
 * localStorage에 사용자 선택을 저장하고, 저장된 값이 없으면 시스템 설정을 따른다.
 *
 * Props:
 * @param {node} children - 하위 트리 [Required]
 *
 * Example usage:
 * <ThemeModeProvider><App /></ThemeModeProvider>
 */
export function ThemeModeProvider({ children }) {
  const [mode, setMode] = useState(getInitialMode);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // localStorage 접근 불가(프라이빗 모드 등) 시 조용히 무시 — 테마 전환 자체는 계속 동작
    }
  }, [mode]);

  // 사용자가 아직 명시적으로 선택한 적 없을 때만 시스템 설정 변경을 실시간 반영
  useEffect(() => {
    const hasStoredPreference = (() => {
      try {
        return localStorage.getItem(STORAGE_KEY) !== null;
      } catch {
        return false;
      }
    })();
    if (hasStoredPreference) return undefined;

    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const handleChange = (e) => setMode(e.matches ? 'light' : 'dark');
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const value = useMemo(() => ({ mode, toggleMode, setMode }), [mode, toggleMode]);

  return (
    <ThemeModeContext.Provider value={value}>
      {children}
    </ThemeModeContext.Provider>
  );
}
