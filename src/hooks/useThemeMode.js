import { useContext } from 'react';
import { ThemeModeContext } from '../context/themeModeContextInstance';

export function useThemeMode() {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) {
    throw new Error('useThemeMode은 ThemeModeProvider 내부에서만 사용할 수 있습니다.');
  }
  return ctx;
}
