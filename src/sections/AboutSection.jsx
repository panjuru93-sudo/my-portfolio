import { Box, Typography, Button, Chip, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
const PersonOutlineIcon = PersonOutlinedIcon;
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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
            icon={<PersonOutlineIcon sx={{ fontSize: 16, color: '#4D8FFF !important' }} />}
            label="About Me 섹션"
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
          여기는 About Me 섹션입니다
        </Typography>

        <Card
          sx={{
            background: 'rgba(10, 14, 36, 0.8)',
            border: '1px solid #1A2040',
            borderRadius: 3,
            mt: 4,
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Typography
              variant="body1"
              sx={{
                color: '#B0BDD8',
                lineHeight: 2,
                fontSize: { xs: '1rem', md: '1.1rem' },
                mb: 4,
              }}
            >
              간단한 자기소개와 <strong style={{ color: '#FFFFFF' }}>'더 알아보기' 버튼</strong>이
              들어갈 예정입니다.
              <br /><br />
              이름, 역할(직군), 핵심 강점 3가지, 짧은 개인 스토리 등이 이 영역에 위치합니다.
              방문자가 "이 사람은 어떤 사람인가?"를 30초 안에 파악할 수 있도록
              구성할 예정입니다.
            </Typography>

            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate('/about')}
              sx={{
                background: 'linear-gradient(135deg, #1455F5, #4D8FFF)',
                px: 3,
                py: 1.2,
                '&:hover': { background: 'linear-gradient(135deg, #4D8FFF, #5599FF)' },
              }}
            >
              더 알아보기
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
