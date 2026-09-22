import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, Button,
  Drawer, List, ListItem, ListItemButton, ListItemText,
  Box, useMediaQuery, useTheme,
} from '@mui/material';
import ThemeToggle from './common/ThemeToggle';

const navItems = [
  { label: '홈', id: 'hero-section' },
  { label: '소개', id: 'about-section' },
  { label: '스킬', id: 'skill-section' },
  { label: '프로젝트', id: 'projects-section' },
  { label: '연락처', id: 'contact-section' },
];

const HEADER_HIDE_THRESHOLD = 80; // 이 높이 전까지는 헤더를 항상 노출

/**
 * HamburgerIcon 컴포넌트 — 열림 상태에 따라 3줄 ↔ X 로 애니메이션 전환된다.
 *
 * Props:
 * @param {boolean} open - 메뉴 열림 여부 [Required]
 *
 * Example usage:
 * <HamburgerIcon open={drawerOpen} />
 */
function HamburgerIcon({ open }) {
  const barSx = {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: '2px',
    borderRadius: '1px',
    background: 'var(--color-text-primary)',
    transition: 'transform 0.3s ease, opacity 0.3s ease, top 0.3s ease',
  };

  return (
    <Box sx={{ position: 'relative', width: 22, height: 16 }}>
      <Box sx={{ ...barSx, top: open ? '7px' : '0px', transform: open ? 'rotate(45deg)' : 'rotate(0)' }} />
      <Box sx={{ ...barSx, top: '7px', opacity: open ? 0 : 1 }} />
      <Box sx={{ ...barSx, top: open ? '7px' : '14px', transform: open ? 'rotate(-45deg)' : 'rotate(0)' }} />
    </Box>
  );
}

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeId, setActiveId] = useState(navItems[0].id);

  const lastScrollY = useRef(0);
  const tickingRef = useRef(false);
  const pendingScrollId = useRef(null);

  // ── 스크롤 방향 감지(헤더 숨김/표시) + 읽기 진행률 계산 ──
  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? Math.min(100, Math.max(0, (currentY / docHeight) * 100)) : 0;
        setScrollProgress(progress);

        if (currentY < HEADER_HIDE_THRESHOLD) {
          setHeaderHidden(false);
        } else if (currentY > lastScrollY.current) {
          setHeaderHidden(true); // 아래로 스크롤 → 숨김
        } else if (currentY < lastScrollY.current) {
          setHeaderHidden(false); // 위로 스크롤 → 표시
        }

        lastScrollY.current = currentY;
        tickingRef.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 모바일 메뉴가 열려있는 동안은 헤더를 항상 노출(파생값으로 계산 — effect로 동기화하지 않음)
  const isHeaderHidden = headerHidden && !drawerOpen;

  // ── Intersection Observer 기반 스크롤 스파이 (홈에서만 동작) ──
  useEffect(() => {
    if (location.pathname !== '/') return undefined;

    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (sections.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [location.pathname]);

  // 다른 라우트에서 홈으로 이동한 뒤, 예약된 섹션으로 스무스 스크롤
  useEffect(() => {
    if (location.pathname === '/' && pendingScrollId.current) {
      const target = document.getElementById(pendingScrollId.current);
      target?.scrollIntoView({ behavior: 'smooth' });
      pendingScrollId.current = null;
    }
  }, [location.pathname]);

  const handleNav = useCallback((id) => {
    setDrawerOpen(false);
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      pendingScrollId.current = id;
      navigate('/');
    }
  }, [location.pathname, navigate]);

  const isActive = (id) => location.pathname === '/' && activeId === id;

  return (
    <>
      {/* 읽기 진행률 바 */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '3px',
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, var(--color-primary), var(--color-primary-light))',
          zIndex: (t) => t.zIndex.appBar + 1,
          transition: 'width 0.1s linear',
        }}
      />

      <AppBar
        position="fixed"
        elevation={0}
        component="nav"
        aria-label="주 메뉴"
        sx={{
          transform: isHeaderHidden ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform 0.3s ease',
          willChange: 'transform',
        }}
      >
        <Toolbar sx={{ maxWidth: 1100, width: '100%', mx: 'auto', px: { xs: 2, md: 4 } }}>
          {/* 로고 */}
          <Typography
            variant="h6"
            onClick={() => handleNav(navItems[0].id)}
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              cursor: 'pointer',
              background: 'linear-gradient(135deg, var(--color-text-primary) 0%, var(--color-primary-light) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
            }}
          >
            포트폴리오
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 } }}>
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 1 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    aria-current={isActive(item.id) ? 'true' : undefined}
                    sx={{
                      color: isActive(item.id) ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                      fontWeight: isActive(item.id) ? 700 : 400,
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 6,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: isActive(item.id) ? '20px' : '0px',
                        height: '2px',
                        background: 'var(--color-primary)',
                        borderRadius: '1px',
                        transition: 'width 0.2s ease',
                      },
                      '&:hover': { color: 'var(--color-text-primary)' },
                      '&:hover::after': { width: '20px' },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}

            <ThemeToggle />

            {isMobile && (
              <Box
                component="button"
                type="button"
                onClick={() => setDrawerOpen((prev) => !prev)}
                aria-label={drawerOpen ? '메뉴 닫기' : '메뉴 열기'}
                aria-expanded={drawerOpen}
                sx={{
                  background: 'none',
                  border: 'none',
                  p: 1.25,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  minWidth: 44,
                  minHeight: 44,
                }}
              >
                <HamburgerIcon open={drawerOpen} />
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* 모바일 사이드 메뉴 */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{ paper: { sx: { background: 'var(--color-bg-card)', width: 220 } } }}
        transitionDuration={300}
      >
        <List sx={{ pt: 8 }} aria-label="모바일 메뉴">
          {navItems.map((item) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                onClick={() => handleNav(item.id)}
                selected={isActive(item.id)}
                aria-current={isActive(item.id) ? 'true' : undefined}
                sx={{
                  '&.Mui-selected': { background: 'var(--chip-bg-stronger)' },
                }}
              >
                <ListItemText
                  primary={item.label}
                  slotProps={{
                    primary: {
                      sx: {
                        color: isActive(item.id) ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                        fontWeight: isActive(item.id) ? 700 : 400,
                      },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
