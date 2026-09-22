import { useContext } from 'react';
import { PortfolioContext } from '../context/portfolioContextInstance';

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    throw new Error('usePortfolio은 PortfolioProvider 내부에서만 사용할 수 있습니다.');
  }
  return ctx;
}
