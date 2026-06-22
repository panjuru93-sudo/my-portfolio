import { Box, Typography, Chip, Card, CardContent, Grid } from '@mui/material';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined';
const WorkOutlineIcon = WorkOutlinedIcon;
import ConstructionIcon from '@mui/icons-material/Construction';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const placeholders = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  title: `Project ${String(i + 1).padStart(2, '0')}`,
}));

export default function Projects() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#000000',
        pt: '80px',
        px: 3,
        py: 10,
      }}
    >
      <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
        {/* 헤더 */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Chip
            icon={<WorkOutlineIcon sx={{ fontSize: 16, color: '#4D8FFF !important' }} />}
            label="Projects Page"
            size="small"
            sx={{
              mb: 3,
              background: 'rgba(20,85,245,0.1)',
              border: '1px solid rgba(20,85,245,0.3)',
              color: '#4D8FFF',
              fontWeight: 600,
            }}
          />
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.2rem', md: '3rem' },
              fontWeight: 800,
              color: '#FFFFFF',
              mb: 2,
              letterSpacing: '-0.03em',
            }}
          >
            Projects
          </Typography>
          <Typography variant="body1" sx={{ color: '#5A6480', maxWidth: 480, mx: 'auto' }}>
            Projects 페이지가 개발될 공간입니다.
            <br />
            포트폴리오 작품들이 들어갈 예정입니다.
          </Typography>
        </Box>

        {/* 안내 카드 */}
        <Card
          sx={{
            background: 'rgba(10,14,36,0.6)',
            border: '1px dashed rgba(20,85,245,0.3)',
            borderRadius: 3,
            mb: 6,
            textAlign: 'center',
          }}
        >
          <CardContent sx={{ py: 4 }}>
            <ConstructionIcon sx={{ color: '#4D8FFF', fontSize: 32, mb: 1 }} />
            <Typography sx={{ color: '#B0BDD8', fontSize: '0.95rem' }}>
              각 프로젝트 카드에는 썸네일 이미지, 제목, 기술 스택, 링크가 들어갈 예정입니다.
            </Typography>
          </CardContent>
        </Card>

        {/* 프로젝트 카드 그리드 */}
        <Grid container spacing={3}>
          {placeholders.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <Card
                sx={{
                  background: 'rgba(10,14,36,0.6)',
                  border: '1px solid #1A2040',
                  borderRadius: 3,
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    borderColor: '#1455F5',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 16px 40px rgba(20,85,245,0.15)',
                  },
                }}
              >
                {/* 썸네일 플레이스홀더 */}
                <Box
                  sx={{
                    height: 160,
                    background: 'linear-gradient(135deg, #0A0E24, #1A2040)',
                    borderRadius: '12px 12px 0 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <OpenInNewIcon sx={{ color: 'rgba(20,85,245,0.4)', fontSize: 32 }} />
                </Box>
                <CardContent sx={{ p: 2.5 }}>
                  <Typography sx={{ color: '#FFFFFF', fontWeight: 700, mb: 0.5 }}>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#5A6480', fontSize: '0.82rem' }}>
                    작품 설명이 들어갈 예정입니다.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
