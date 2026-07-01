import { Box, Typography, Button, Chip, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const strengths = [
  {
    icon: <LightbulbOutlinedIcon />,
    title: '빠른 학습력',
    desc: 'React, Supabase, MUI 등 새로운 기술을 프로젝트에 직접 적용하며 빠르게 익힙니다.',
  },
  {
    icon: <BuildOutlinedIcon />,
    title: '실전 중심',
    desc: '커뮤니티, SNS, 방명록 등 실제로 동작하는 서비스를 직접 기획하고 구현합니다.',
  },
  {
    icon: <FavoriteBorderIcon />,
    title: 'UI/UX 감각',
    desc: '사용자가 편리하게 쓸 수 있는 인터페이스를 고민하며 디테일을 챙깁니다.',
  },
];

export default function AboutSection() {
  const navigate = useNavigate();

  return (
    <Box
      component="section"
      id="about-section"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#03040D',
        py: 12,
        px: 3,
      }}
    >
      <Box sx={{ maxWidth: 900, width: '100%' }}>
        {/* 섹션 레이블 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
          <Box sx={{ width: 32, height: 2, background: '#1455F5', borderRadius: 1 }} />
          <Chip
            icon={<PersonOutlinedIcon sx={{ fontSize: 16, color: '#4D8FFF !important' }} />}
            label="About Me"
            size="small"
            sx={{
              background: 'rgba(20,85,245,0.1)',
              border: '1px solid rgba(20,85,245,0.3)',
              color: '#4D8FFF',
              fontWeight: 600,
            }}
          />
        </Box>

        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2rem', md: '2.8rem' },
            fontWeight: 700,
            color: '#FFFFFF',
            mb: 2,
            letterSpacing: '-0.02em',
          }}
        >
          안녕하세요,{' '}
          <Box component="span" sx={{ color: '#4D8FFF' }}>
            정아영
          </Box>
          입니다 👋
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: '#B0BDD8',
            lineHeight: 1.9,
            fontSize: { xs: '1rem', md: '1.05rem' },
            mb: 6,
            maxWidth: 680,
          }}
        >
          React 바이브코딩을 통해 프론트엔드 개발을 배우고 있습니다.
          단순히 따라 만드는 것에서 그치지 않고, 커뮤니티 게시판·SNS·방명록 등
          실제로 배포되는 서비스를 직접 기획하고 구현하며 성장하고 있습니다.
          사용자가 "쓰기 편하다"고 느끼는 UI를 만드는 것이 목표입니다.
        </Typography>

        {/* 강점 3가지 */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {strengths.map((item) => (
            <Grid item xs={12} sm={4} key={item.title}>
              <Box
                sx={{
                  background: 'rgba(10,14,36,0.8)',
                  border: '1px solid #1A2040',
                  borderRadius: 3,
                  p: 3,
                  height: '100%',
                  transition: 'border-color 0.2s',
                  '&:hover': { borderColor: '#1455F5' },
                }}
              >
                <Box sx={{ color: '#4D8FFF', mb: 1.5 }}>{item.icon}</Box>
                <Typography sx={{ color: '#FFFFFF', fontWeight: 700, mb: 1, fontSize: '0.95rem' }}>
                  {item.title}
                </Typography>
                <Typography sx={{ color: '#5A6480', fontSize: '0.85rem', lineHeight: 1.7 }}>
                  {item.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={() => navigate('/about')}
          sx={{
            background: 'linear-gradient(135deg, #1455F5, #4D8FFF)',
            px: 3,
            py: 1.2,
            fontWeight: 600,
            '&:hover': { background: 'linear-gradient(135deg, #4D8FFF, #5599FF)' },
          }}
        >
          더 알아보기
        </Button>
      </Box>
    </Box>
  );
}
