import { Box, Typography, Button, Chip } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Hero() {
  const handleScroll = () => {
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
          label="Hero 섹션"
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
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            mb: 2,
            background: 'linear-gradient(180deg, #FFFFFF 0%, #B0BDD8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          여기는 Hero 섹션입니다
        </Typography>

        <Typography
          variant="h5"
          sx={{
            color: '#B0BDD8',
            fontWeight: 400,
            lineHeight: 1.6,
            mb: 4,
            maxWidth: 560,
            mx: 'auto',
            fontSize: { xs: '1rem', md: '1.2rem' },
          }}
        >
          메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.
          <br />
          첫인상을 결정하는 가장 중요한 섹션입니다.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            size="large"
            sx={{
              background: 'linear-gradient(135deg, #1455F5, #4D8FFF)',
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              '&:hover': { background: 'linear-gradient(135deg, #4D8FFF, #5599FF)' },
            }}
          >
            프로젝트 보기
          </Button>
          <Button
            variant="outlined"
            size="large"
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
        onClick={handleScroll}
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
