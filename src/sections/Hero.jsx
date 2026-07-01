import { Box, Typography, Button, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Hero() {
  const navigate = useNavigate();

  const handleScrollToContact = () => {
    document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollDown = () => {
    document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box
      component="section"
      id="hero-section"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: `
          radial-gradient(ellipse 80% 50% at 50% 0%, #1455F5 0%, #4D8FFF 25%, #D6E8FF 45%, transparent 65%),
          #000000
        `,
      }}
    >
      {/* 배경 그리드 패턴 */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(20,85,245,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20,85,245,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 80%)',
        }}
      />

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          maxWidth: 800,
          px: 3,
        }}
      >
        <Chip
          label="Frontend Developer"
          size="small"
          sx={{
            mb: 3,
            background: 'rgba(20,85,245,0.15)',
            border: '1px solid rgba(20,85,245,0.4)',
            color: '#4D8FFF',
            fontWeight: 600,
            fontSize: '0.75rem',
            letterSpacing: '0.08em',
          }}
        />

        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.8rem', sm: '3.8rem', md: '5rem' },
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            mb: 1,
            background: 'linear-gradient(180deg, #FFFFFF 0%, #B0BDD8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          정아영
        </Typography>

        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '1.1rem', sm: '1.4rem', md: '1.6rem' },
            fontWeight: 500,
            color: '#4D8FFF',
            mb: 3,
            letterSpacing: '-0.01em',
          }}
        >
          React로 경험을 만드는 개발자
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: '#B0BDD8',
            fontWeight: 400,
            lineHeight: 1.8,
            mb: 5,
            maxWidth: 520,
            mx: 'auto',
            fontSize: { xs: '0.95rem', md: '1.05rem' },
          }}
        >
          사용자 경험을 먼저 생각하며 React와 MUI로
          <br />
          직관적이고 아름다운 웹을 만들어가고 있습니다.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/projects')}
            sx={{
              background: 'linear-gradient(135deg, #1455F5, #4D8FFF)',
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              '&:hover': { background: 'linear-gradient(135deg, #4D8FFF, #5599FF)' },
            }}
          >
            프로젝트 보기
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={handleScrollToContact}
            sx={{
              borderColor: '#1A2040',
              color: '#B0BDD8',
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              '&:hover': { borderColor: '#4D8FFF', color: '#FFFFFF' },
            }}
          >
            연락하기
          </Button>
        </Box>
      </Box>

      {/* 스크롤 유도 */}
      <Box
        onClick={handleScrollDown}
        sx={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0.5,
          opacity: 0.5,
          transition: 'opacity 0.2s',
          '&:hover': { opacity: 1 },
          animation: 'bounce 2s infinite',
          '@keyframes bounce': {
            '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
            '50%': { transform: 'translateX(-50%) translateY(6px)' },
          },
        }}
      >
        <Typography variant="caption" sx={{ color: '#5A6480', letterSpacing: '0.1em' }}>
          SCROLL
        </Typography>
        <KeyboardArrowDownIcon sx={{ color: '#5A6480', fontSize: 20 }} />
      </Box>
    </Box>
  );
}
