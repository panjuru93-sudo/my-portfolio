import { Box, Typography, Chip, Card, CardContent, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined';
const WorkOutlineIcon = WorkOutlinedIcon;
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const projectPlaceholders = [
  { title: 'Project 01', desc: '대표 프로젝트 썸네일과 설명이 들어갈 예정입니다.', tags: ['React', 'TypeScript'] },
  { title: 'Project 02', desc: '대표 프로젝트 썸네일과 설명이 들어갈 예정입니다.', tags: ['Next.js', 'MUI'] },
  { title: 'Project 03', desc: '대표 프로젝트 썸네일과 설명이 들어갈 예정입니다.', tags: ['Node.js', 'DB'] },
  { title: 'Project 04', desc: '대표 프로젝트 썸네일과 설명이 들어갈 예정입니다.', tags: ['Design', 'Figma'] },
];

export default function ProjectsSection() {
  const navigate = useNavigate();

  return (
    <Box
      component="section"
      id="projects-section"
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
      <Box sx={{ maxWidth: 1100, width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
          <Box sx={{ width: 32, height: 2, background: '#1455F5', borderRadius: 1 }} />
          <Chip
            icon={<WorkOutlineIcon sx={{ fontSize: 16, color: '#4D8FFF !important' }} />}
            label="Projects 섹션"
            size="small"
            sx={{
              background: 'rgba(20,85,245,0.1)',
              border: '1px solid rgba(20,85,245,0.3)',
              color: '#4D8FFF',
              fontWeight: 600,
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 6, flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em', mb: 1 }}
            >
              여기는 Projects 섹션입니다
            </Typography>
            <Typography variant="body1" sx={{ color: '#5A6480' }}>
              대표작 썸네일 3-4개와 '더 보기' 버튼이 들어갈 예정입니다.
            </Typography>
          </Box>
          <Button
            variant="outlined"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate('/projects')}
            sx={{ borderColor: '#1A2040', color: '#B0BDD8', '&:hover': { borderColor: '#4D8FFF', color: '#FFFFFF' }, whiteSpace: 'nowrap' }}
          >
            전체 보기
          </Button>
        </Box>

        <Grid container spacing={3}>
          {projectPlaceholders.map((project, idx) => (
            <Grid item xs={12} sm={6} key={idx}>
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
                    height: 180,
                    background: `linear-gradient(135deg, #0A0E24 0%, #1A2040 50%, #0D1228 100%)`,
                    borderRadius: '12px 12px 0 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      background: 'rgba(20,85,245,0.15)',
                      border: '1px solid rgba(20,85,245,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <OpenInNewIcon sx={{ color: '#1455F5', fontSize: 28 }} />
                  </Box>
                  <Typography
                    sx={{
                      position: 'absolute',
                      top: 16,
                      left: 20,
                      color: '#5A6480',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                    }}
                  >
                    THUMBNAIL
                  </Typography>
                </Box>

                <CardContent sx={{ p: 3 }}>
                  <Typography sx={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.1rem', mb: 1 }}>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#B0BDD8', mb: 2, lineHeight: 1.6 }}>
                    {project.desc}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {project.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{
                          background: 'rgba(20,85,245,0.1)',
                          color: '#4D8FFF',
                          border: '1px solid rgba(20,85,245,0.25)',
                          fontSize: '0.72rem',
                          height: 22,
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate('/projects')}
            sx={{
              background: 'linear-gradient(135deg, #1455F5, #4D8FFF)',
              px: 5,
              py: 1.5,
              '&:hover': { background: 'linear-gradient(135deg, #4D8FFF, #5599FF)' },
            }}
          >
            더 보기
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
