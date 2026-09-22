import { useMemo } from 'react';
import { Box, Typography, Button, Chip, Container, Grid, Avatar, IconButton, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import { usePortfolio } from '../hooks/usePortfolio';
import { useTypewriter } from '../hooks/useTypewriter';
import { categoryColors } from '../theme/skillCategories';
import { skillIconMap } from '../theme/skillIcons';
import { GITHUB_URL, EMAIL_URL } from '../constants/socialLinks';
import Magnetic from '../components/common/Magnetic';
import RevealBackground from '../components/common/RevealBackground';
import CodeIcon from '@mui/icons-material/Code';

const SOCIAL_LINKS = [
  { icon: GitHubIcon, label: 'GitHub', url: GITHUB_URL },
  { icon: MailOutlinedIcon, label: '이메일', url: EMAIL_URL },
];

const HEADLINE = '시각디자인을 전공한, 코드를 그리는 개발자';

// 배경에 흩뿌릴 코드 조각 (데스크톱에서만 노출)
const CODE_SNIPPETS = [
  { text: '<div>',       top: '16%', left: '6%',  delay: '0s' },
  { text: 'useState()',  top: '68%', left: '8%',  delay: '0.6s' },
  { text: '=> { }',      top: '30%', left: '86%', delay: '0.3s' },
  { text: 'flex-box',    top: '76%', left: '82%', delay: '0.9s' },
  { text: '</>',         top: '50%', left: '3%',  delay: '1.2s' },
];

// 배경 기하학적 도형
const SHAPES = [
  { size: 220, top: '8%',  left: '78%', color: 'var(--color-primary)', duration: '9s' },
  { size: 140, top: '65%', left: '88%', color: 'var(--color-primary-light)', duration: '7s' },
  { size: 180, top: '72%', left: '4%',  color: 'var(--color-accent)', duration: '10s' },
  { size: 90,  top: '18%', left: '10%', color: 'var(--color-secondary)', duration: '6s' },
];

export default function Hero() {
  const { getHomeData } = usePortfolio();
  const { basicInfo, skills } = useMemo(() => getHomeData(), [getHomeData]);
  const { displayed: typedHeadline, done: typingDone } = useTypewriter(HEADLINE, 45, 650);
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const badgeSkills = skills.slice(0, isMobile ? 2 : 4);
  const badgePositions = isMobile
    ? [{ top: '-4%', left: '-4%' }, { bottom: '-4%', right: '-4%' }]
    : [
        { top: '-6%', left: '-8%' },
        { top: '-6%', right: '-8%' },
        { bottom: '-6%', left: '-8%' },
        { bottom: '-6%', right: '-8%' },
      ];

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToProjects = () => scrollToSection('projects-section');
  const handleScrollToContact = () => scrollToSection('contact-section');
  const handleScrollDown = () => scrollToSection('about-section');

  return (
    <Box
      component="section"
      id="hero-section"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 12, sm: 10, md: 0 },
        '@keyframes heroFadeUp': {
          from: { opacity: 0, transform: 'translateY(18px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        '@keyframes floatY': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        '@keyframes spinSlow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        '@keyframes blinkCursor': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      }}
    >
      <RevealBackground
        background={`
          radial-gradient(ellipse 80% 50% at 50% 0%, var(--color-primary) 0%, var(--color-primary-light) 25%, var(--color-secondary) 45%, transparent 65%),
          var(--color-bg-primary)
        `}
      />

      {/* 배경 그리드 패턴 */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(var(--grid-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 80%)',
        }}
      />

      {/* 배경 기하학적 도형 — 태블릿 이하에서는 렌더링 자체를 생략(성능/여백 확보) */}
      {!isTablet && SHAPES.map((shape, i) => (
        <Box
          key={i}
          aria-hidden="true"
          sx={{
            position: 'absolute',
            top: shape.top,
            left: shape.left,
            width: shape.size,
            height: shape.size,
            borderRadius: '50%',
            background: shape.color,
            opacity: 0.12,
            filter: 'blur(40px)',
            animation: `floatY ${shape.duration} ease-in-out infinite`,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* 배경 코드 조각 — 태블릿 이하에서는 렌더링 자체를 생략 */}
      {!isTablet && CODE_SNIPPETS.map((snippet, i) => (
        <Typography
          key={i}
          aria-hidden="true"
          sx={{
            position: 'absolute',
            top: snippet.top,
            left: snippet.left,
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.85rem',
            color: 'var(--decorative-text)',
            animation: `floatY 6s ease-in-out infinite`,
            animationDelay: snippet.delay,
            pointerEvents: 'none',
          }}
        >
          {snippet.text}
        </Typography>
      ))}

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 6, sm: 7, md: 6 }} sx={{ alignItems: 'center' }}>
          {/* ── 텍스트 영역 ── */}
          <Grid size={{ xs: 12, md: 7 }} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              aria-hidden="true"
              sx={{
                fontFamily: '"Space Grotesk", "Inter", sans-serif',
                fontSize: { xs: '0.75rem', sm: '0.85rem' },
                fontWeight: 700,
                letterSpacing: '0.15em',
                color: 'var(--color-primary-light)',
                mb: { xs: 1.5, sm: 2 },
                opacity: 0,
                animation: 'heroFadeUp 0.6s ease forwards',
              }}
            >
              2026 UIUX PORTFOLIO
            </Typography>

            <Chip
              label="프론트엔드 개발자"
              size="small"
              sx={{
                mb: { xs: 2, sm: 3 },
                background: 'var(--chip-bg-stronger)',
                border: '1px solid var(--chip-border-strong)',
                color: 'var(--color-primary-light)',
                fontWeight: 600,
                fontSize: '0.75rem',
                letterSpacing: '0.08em',
                opacity: 0,
                animation: 'heroFadeUp 0.6s ease 0.1s forwards',
              }}
            />

            <Typography
              variant="h1"
              sx={{
                fontFamily: '"Space Grotesk", "Inter", sans-serif',
                fontSize: { xs: '2.4rem', sm: '3.4rem', md: '5rem' },
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                mb: { xs: 1.5, sm: 2 },
                color: 'var(--color-text-primary)',
                textShadow: '0 4px 24px rgba(0,0,0,0.45)',
                opacity: 0,
                animation: 'heroFadeUp 0.6s ease 0.2s forwards',
              }}
            >
              {basicInfo.name || '정아영'}
            </Typography>

            <Typography
              variant="h2"
              aria-label={HEADLINE}
              sx={{
                fontSize: { xs: '1.05rem', sm: '1.3rem', md: '1.6rem' },
                fontWeight: 500,
                color: 'var(--color-primary-light)',
                mb: { xs: 2, sm: 3 },
                letterSpacing: '-0.01em',
                lineHeight: 1.4,
                minHeight: { xs: '2.8em', sm: '1.4em' },
              }}
            >
              <span aria-hidden="true">{typedHeadline}</span>
              <Box
                component="span"
                aria-hidden="true"
                sx={{
                  display: 'inline-block',
                  width: '2px',
                  height: '1em',
                  ml: 0.5,
                  verticalAlign: 'text-bottom',
                  background: 'var(--color-primary-light)',
                  animation: typingDone ? 'blinkCursor 1s step-end infinite' : 'none',
                  opacity: typingDone ? undefined : 1,
                }}
              />
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: 'var(--color-text-secondary)',
                fontWeight: 400,
                lineHeight: 1.8,
                mb: { xs: 3, sm: 4 },
                maxWidth: 520,
                mx: { xs: 'auto', md: 0 },
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.05rem' },
                opacity: 0,
                animation: 'heroFadeUp 0.6s ease 0.5s forwards',
              }}
            >
              사용자 경험을 먼저 생각하며 React와 MUI로
              <br />
              직관적이고 아름다운 웹을 만들어가고 있습니다.
            </Typography>

            {/* 기술 스택 스트립 */}
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                flexWrap: 'wrap',
                justifyContent: { xs: 'center', md: 'flex-start' },
                mb: { xs: 3, sm: 5 },
                opacity: 0,
                animation: 'heroFadeUp 0.6s ease 0.6s forwards',
              }}
            >
              {skills.map((skill) => {
                const SkillIcon = skillIconMap[skill.icon] ?? CodeIcon;
                const color = categoryColors[skill.category] ?? '#4D8FFF';
                return (
                  <Chip
                    key={skill.id}
                    icon={<SkillIcon sx={{ fontSize: '16px !important', color: `${color} !important` }} />}
                    label={skill.name}
                    size="small"
                    sx={{
                      background: 'var(--surface-card)',
                      border: `1px solid ${color}40`,
                      color: 'var(--color-text-secondary)',
                      fontSize: '0.75rem',
                      transition: 'transform 0.2s, border-color 0.2s',
                      '&:hover': { transform: 'translateY(-2px)', borderColor: color },
                    }}
                  />
                );
              })}
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 1.5, sm: 2 },
                alignItems: { xs: 'stretch', sm: 'center' },
                justifyContent: { xs: 'center', md: 'flex-start' },
                flexWrap: 'wrap',
                mb: { xs: 3, sm: 4 },
                opacity: 0,
                animation: 'heroFadeUp 0.6s ease 0.7s forwards',
              }}
            >
              <Magnetic strength={0.25}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleScrollToProjects}
                  sx={{
                    background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
                    px: 4,
                    py: 1.5,
                    minHeight: 48,
                    width: { xs: '100%', sm: 'auto' },
                    fontSize: '1rem',
                    fontWeight: 600,
                    boxShadow: '0 8px 24px rgba(20,85,245,0.35)',
                    transition: 'background 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      background: 'linear-gradient(135deg, var(--color-primary-light), var(--color-accent))',
                      boxShadow: '0 12px 28px rgba(77,143,255,0.45)',
                    },
                  }}
                >
                  프로젝트 보기
                </Button>
              </Magnetic>
              <Magnetic strength={0.25}>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleScrollToContact}
                  sx={{
                    borderColor: 'var(--accent-border)',
                    color: 'var(--color-text-secondary)',
                    px: 4,
                    py: 1.5,
                    minHeight: 48,
                    width: { xs: '100%', sm: 'auto' },
                    fontSize: '1rem',
                    transition: 'border-color 0.2s, color 0.2s',
                    '&:hover': {
                      borderColor: 'var(--color-primary-light)',
                      color: 'var(--color-text-primary)',
                    },
                  }}
                >
                  연락하기
                </Button>
              </Magnetic>
            </Box>

            {/* 소셜 링크 */}
            <Box
              sx={{
                display: 'flex',
                gap: { xs: 2, sm: 1.5 },
                justifyContent: { xs: 'center', md: 'flex-start' },
                opacity: 0,
                animation: 'heroFadeUp 0.6s ease 0.8s forwards',
              }}
            >
              {SOCIAL_LINKS.map(({ icon: SocialIcon, label, url }) => (
                <Tooltip key={label} title={label} arrow>
                  <Magnetic strength={0.4}>
                    <IconButton
                      component="a"
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      sx={{
                        width: 44,
                        height: 44,
                        color: 'var(--color-text-secondary)',
                        border: '1px solid var(--color-border)',
                        transition: 'border-color 0.2s, color 0.2s',
                        '&:hover': {
                          color: 'var(--color-primary-light)',
                          borderColor: 'var(--color-primary-light)',
                          background: 'var(--chip-bg-hover)',
                        },
                      }}
                    >
                      <SocialIcon fontSize="small" />
                    </IconButton>
                  </Magnetic>
                </Tooltip>
              ))}
            </Box>
          </Grid>

          {/* ── 비주얼 영역 ── */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                position: 'relative',
                width: { xs: 190, sm: 260, md: 300 },
                height: { xs: 190, sm: 260, md: 300 },
                mx: 'auto',
                opacity: 0,
                animation: 'heroFadeUp 0.7s ease 0.3s forwards',
              }}
            >
              {/* 회전하는 그라디언트 링 */}
              <Box
                aria-hidden="true"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: 'conic-gradient(from 0deg, var(--color-primary), var(--color-primary-light), var(--color-secondary), var(--color-primary))',
                  animation: 'spinSlow 12s linear infinite',
                  opacity: 0.6,
                  filter: 'blur(1px)',
                }}
              />
              {/* 아바타 */}
              <Avatar
                src={basicInfo.photo || undefined}
                slotProps={{ img: { loading: 'lazy', alt: `${basicInfo.name || '정아영'} 프로필 사진` } }}
                sx={{
                  position: 'absolute',
                  inset: 8,
                  width: 'auto',
                  height: 'auto',
                  background: 'var(--color-bg-secondary)',
                  color: 'var(--color-primary-light)',
                  fontSize: { xs: '3rem', md: '3.5rem' },
                  border: '3px solid var(--color-bg-secondary)',
                }}
              >
                <PersonOutlinedIcon sx={{ fontSize: 'inherit' }} />
              </Avatar>

              {/* 떠다니는 스킬 배지 — 모바일에서는 2개만 노출해 아바타와 겹치지 않게 */}
              {badgeSkills.map((skill, i) => {
                const SkillIcon = skillIconMap[skill.icon] ?? CodeIcon;
                const color = categoryColors[skill.category] ?? '#4D8FFF';
                return (
                  <Box
                    key={skill.id}
                    aria-hidden="true"
                    sx={{
                      position: 'absolute',
                      ...badgePositions[i],
                      width: { xs: 40, sm: 48 },
                      height: { xs: 40, sm: 48 },
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'var(--surface-card-solid)',
                      border: `1.5px solid ${color}60`,
                      boxShadow: `0 4px 16px ${color}30`,
                      animation: `floatY 4s ease-in-out infinite`,
                      animationDelay: `${i * 0.4}s`,
                    }}
                  >
                    <SkillIcon sx={{ fontSize: { xs: 18, sm: 20 }, color }} />
                  </Box>
                );
              })}
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* 스크롤 유도 */}
      <Box
        onClick={handleScrollDown}
        role="button"
        tabIndex={0}
        aria-label="아래로 스크롤"
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleScrollDown()}
        sx={{
          position: 'absolute',
          bottom: { xs: 8, sm: 16, md: 32 },
          left: '50%',
          transform: 'translateX(-50%)',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0.5,
          minWidth: 44,
          minHeight: 44,
          p: 1,
          opacity: 0.5,
          transition: 'opacity 0.2s',
          '&:hover, &:focus-visible': { opacity: 1, outline: 'none' },
          animation: 'floatY 2s ease-in-out infinite',
        }}
      >
        <Typography variant="caption" sx={{ color: 'var(--color-text-muted)', letterSpacing: '0.1em' }}>
          스크롤
        </Typography>
        <KeyboardArrowDownIcon sx={{ color: 'var(--color-text-muted)', fontSize: 20 }} />
      </Box>
    </Box>
  );
}
