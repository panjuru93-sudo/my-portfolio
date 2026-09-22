import { useMemo } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createAppTheme } from './theme/theme';
import { ThemeModeProvider } from './context/ThemeModeContext';
import { useThemeMode } from './hooks/useThemeMode';
import { PortfolioProvider } from './context/PortfolioContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import CustomCursor from './components/common/CustomCursor';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import AboutMe from './pages/AboutMe';
import Projects from './pages/Projects';

function AppShell() {
  const { mode } = useThemeMode();
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <PortfolioProvider>
          <HashRouter>
            <CustomCursor />
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutMe />} />
              <Route path="/projects" element={<Projects />} />
            </Routes>
          </HashRouter>
        </PortfolioProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

function App() {
  return (
    <ThemeModeProvider>
      <AppShell />
    </ThemeModeProvider>
  );
}

export default App;
