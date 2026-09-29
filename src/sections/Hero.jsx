import { useMemo } from 'react';
import { Box, Typography, Button, Chip, Container, IconButton, Tooltip } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GitHubIcon from '@mui/icons-material/GitHub';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import { usePortfolio } from '../hooks/usePortfolio';
import { skillIconMap } from '../theme/skillIcons';
import { GITHUB_URL, EMAIL_URL, EMAIL_ADDRESS } from '../constants/socialLinks';
import Magnetic from '../components/common/Magnetic';
import CodeIcon from '@mui/icons-material/Code';
import { GLASS_BLUR } from '../theme/theme';

const SOCIAL_LINKS = [
  { icon: GitHubIcon, label: 'GitHub', url: GITHUB_URL },
  { icon: MailOutlinedIcon, label: '이메일', url: EMAIL_URL },
];

// 히어로 전용 컬러 — 종이 질감 배경 + 레드 포인트 (레퍼런스: 브러시 스크립트 커버 페이지)
const PAPER = '#F6F1E8';
const INK = '#1A1A1A';
const INK_SOFT = 'rgba(26, 26, 26, 0.6)';
const RED = '#E6432E';
const RED_SOFT = 'rgba(230, 67, 46, 0.35)';

const SCRIPT_FONT = '"Yellowtail", cursive';
const YEAR_FONT = '"Caveat", cursive';

export default function Hero() {
  const { getHomeData } = usePortfolio();
  const { basicInfo, skills } = useMemo(() => getHomeData(), [getHomeData]);

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
        background: PAPER,
        py: { xs: 14, sm: 12, md: 6 },
        '@keyframes heroFadeUp': {
          from: { opacity: 0, transform: 'translateY(18px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        '@keyframes floatY': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-16px)' },
        },
      }}
    >
      {/* 상/중/하 3단 레드 원 — 레퍼런스의 스택 서클 구도 */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: { xs: -60, sm: -80, md: -100 },
          left: '50%',
          transform: 'translateX(-50%)',
          width: { xs: 150, sm: 200, md: 260 },
          height: { xs: 150, sm: 200, md: 260 },
          borderRadius: '50%',
          background: RED,
          pointerEvents: 'none',
        }}
      />
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: 260, sm: 340, md: 440 },
          height: { xs: 260, sm: 340, md: 440 },
          borderRadius: '50%',
          background: `radial-gradient(circle at 50% 45%, #FFFFFF 0%, #FBD8CF 35%, ${RED} 100%)`,
          pointerEvents: 'none',
        }}
      />
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          bottom: { xs: -60, sm: -80, md: -100 },
          left: '50%',
          transform: 'translateX(-50%)',
          width: { xs: 150, sm: 200, md: 260 },
          height: { xs: 150, sm: 200, md: 260 },
          borderRadius: '50%',
          background: RED,
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center' }}>
          {/* 거대 브러시 스크립트 타이틀 */}
          <Box sx={{ position: 'relative', mb: { xs: 4, sm: 5 } }}>
            <Typography
              sx={{
                fontFamily: SCRIPT_FONT,
                fontSize: { xs: '4rem', sm: '6rem', md: '8rem', lg: '9.5rem' },
                lineHeight: 1,
                color: '#FFFFFF',
                WebkitTextStroke: `2px ${RED}`,
                opacity: 0,
                animation: 'heroFadeUp 0.7s ease 0.15s forwards',
              }}
            >
              Portfolio
            </Typography>
            <Typography
              sx={{
                fontFamily: YEAR_FONT,
                fontWeight: 700,
                fontSize: { xs: '1.4rem', sm: '1.8rem', md: '2.2rem' },
                color: RED,
                mt: { xs: -1, md: -2 },
                opacity: 0,
                animation: 'heroFadeUp 0.6s ease 0.35s forwards',
              }}
            >
              2026
            </Typography>
          </Box>

          <Typography
            variant="body1"
            sx={{
              color: INK_SOFT,
              fontWeight: 400,
              lineHeight: 1.8,
              mb: { xs: 4, sm: 5 },
              maxWidth: 520,
              mx: 'auto',
              fontSize: { xs: '0.9rem', sm: '1rem' },
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
              justifyContent: 'center',
              mb: { xs: 3, sm: 4 },
              opacity: 0,
              animation: 'heroFadeUp 0.6s ease 0.6s forwards',
            }}
          >
            {skills.map((skill) => {
              const SkillIcon = skillIconMap[skill.icon] ?? CodeIcon;
              return (
                <Chip
                  key={skill.id}
                  icon={<SkillIcon sx={{ fontSize: '16px !important', color: `${RED} !important` }} />}
                  label={skill.name}
                  size="small"
                  sx={{
                    background: 'rgba(255,255,255,0.6)',
                    backdropFilter: GLASS_BLUR,
                    WebkitBackdropFilter: GLASS_BLUR,
                    border: `1px solid rgba(26, 26, 26, 0.15)`,
                    color: INK,
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    transition: 'transform 0.2s, border-color 0.2s',
                    '&:hover': { transform: 'translateY(-2px)', borderColor: RED },
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
              alignItems: 'center',
              justifyContent: 'center',
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
                  background: RED,
                  color: '#FFFFFF',
                  px: 4,
                  py: 1.5,
                  minHeight: 48,
                  width: { xs: '100%', sm: 'auto' },
                  fontSize: '1rem',
                  fontWeight: 700,
                  boxShadow: `0 8px 24px ${RED_SOFT}`,
                  transition: 'background 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    background: '#C93524',
                    boxShadow: `0 12px 28px ${RED_SOFT}`,
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
                  borderColor: INK,
                  color: INK,
                  px: 4,
                  py: 1.5,
                  minHeight: 48,
                  width: { xs: '100%', sm: 'auto' },
                  fontSize: '1rem',
                  transition: 'border-color 0.2s, color 0.2s, background 0.2s',
                  '&:hover': {
                    borderColor: RED,
                    color: RED,
                    background: 'rgba(230, 67, 46, 0.06)',
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
              justifyContent: 'center',
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
                      color: INK,
                      border: `1px solid rgba(26, 26, 26, 0.2)`,
                      transition: 'border-color 0.2s, color 0.2s, background 0.2s',
                      '&:hover': {
                        borderColor: RED,
                        color: RED,
                        background: 'rgba(230, 67, 46, 0.06)',
                      },
                    }}
                  >
                    <SocialIcon fontSize="small" />
                  </IconButton>
                </Magnetic>
              </Tooltip>
            ))}
          </Box>
        </Box>
      </Container>

      {/* 좌하단 이름 + 연락처 */}
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: 20, sm: 28, md: 36 },
          left: { xs: 20, sm: 28, md: 40 },
          zIndex: 3,
          display: { xs: 'none', sm: 'flex' },
          flexDirection: 'column',
          gap: 0.25,
        }}
      >
        <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: INK }}>
          {basicInfo.name || '정아영'}
        </Typography>
        <Typography sx={{ fontSize: '0.75rem', color: INK_SOFT }}>
          {EMAIL_ADDRESS}
        </Typography>
      </Box>

      {/* 우하단 역할 라벨 */}
      <Typography
        sx={{
          position: 'absolute',
          bottom: { xs: 20, sm: 28, md: 36 },
          right: { xs: 20, sm: 28, md: 40 },
          zIndex: 3,
          display: { xs: 'none', sm: 'block' },
          fontSize: '0.85rem',
          fontWeight: 600,
          letterSpacing: '0.02em',
          color: INK_SOFT,
        }}
      >
        Frontend Portfolio
      </Typography>

      {/* 스크롤 유도 */}
      <Box
        onClick={handleScrollDown}
        role="button"
        tabIndex={0}
        aria-label="아래로 스크롤"
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleScrollDown()}
        sx={{
          position: 'absolute',
          bottom: { xs: 8, sm: 88, md: 96 },
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
          opacity: 0.6,
          transition: 'opacity 0.2s',
          '&:hover, &:focus-visible': { opacity: 1, outline: 'none' },
          animation: 'floatY 2s ease-in-out infinite',
        }}
      >
        <Typography variant="caption" sx={{ color: INK_SOFT, letterSpacing: '0.1em' }}>
          스크롤
        </Typography>
        <KeyboardArrowDownIcon sx={{ color: INK_SOFT, fontSize: 20 }} />
      </Box>
    </Box>
  );
}
