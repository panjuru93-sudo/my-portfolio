import { useMemo } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createAppTheme } from './theme/theme';
import { PortfolioProvider } from './context/PortfolioContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import CustomCursor from './components/common/CustomCursor';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import AboutMe from './pages/AboutMe';
import Projects from './pages/Projects';

function App() {
  const theme = useMemo(() => createAppTheme(), []);

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

export default App;
