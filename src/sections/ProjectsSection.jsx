import { useMemo } from 'react';
import { Box, Typography, Chip, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import StatCounter from '../components/common/StatCounter';
import RevealBackground from '../components/common/RevealBackground';
import { projects as featuredProjects } from '../constants/projects';

function MiniProjectCard({ project }) {
  return (
    <Box
      sx={{
        background: 'var(--surface-card)',
        border: '1px solid var(--color-border)',
        borderRadius: 3,
        overflow: 'hidden',
        transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
        '&:hover': {
          borderColor: project.accent,
          boxShadow: `0 8px 32px ${project.accent}28`,
        },
      }}
    >
      {/* 썸네일 */}
      <Box
        sx={{
          height: 140,
          background: project.bg,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
        }}
      >
        <Typography sx={{ fontSize: '2rem' }}>{project.emoji}</Typography>
      </Box>

      {/* 정보 */}
      <Box sx={{ p: 2.5 }}>
        <Typography sx={{ color: 'var(--color-text-primary)', fontWeight: 700, fontSize: '1rem', mb: 0.75 }}>
          {project.title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)', fontSize: '0.83rem', lineHeight: 1.6, mb: 2 }}>
          {project.description}
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', mb: 2 }}>
          {project.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{
                background: `${project.accent}15`,
                color: project.accent,
                border: `1px solid ${project.accent}40`,
                fontSize: '0.68rem',
                height: 22,
                fontWeight: 600,
              }}
            />
          ))}
        </Box>
        <Button
          size="small"
          endIcon={<OpenInNewIcon sx={{ fontSize: '14px !important' }} />}
          onClick={() => window.open(project.liveUrl, '_blank')}
          sx={{
            color: project.accent,
            fontSize: '0.78rem',
            p: 0,
            minWidth: 0,
            '&:hover': { background: 'transparent', opacity: 0.8 },
          }}
        >
          바로 가기
        </Button>
      </Box>
    </Box>
  );
}

export default function ProjectsSection() {
  const navigate = useNavigate();

  const stats = useMemo(() => {
    const uniqueTags = new Set(featuredProjects.flatMap((project) => project.tags));
    return {
      projectCount: featuredProjects.length,
      techCount: uniqueTags.size,
    };
  }, []);

  return (
    <Box
      component="section"
      id="projects-section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 12,
        px: 3,
      }}
    >
      <RevealBackground background="var(--color-bg-secondary)" />

      <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 1100, width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
          <Box sx={{ width: 32, height: 2, background: 'var(--color-primary)', borderRadius: 1 }} />
          <Chip
            icon={<WorkOutlinedIcon sx={{ fontSize: 16, color: 'var(--color-primary-light) !important' }} />}
            label="프로젝트"
            size="small"
            sx={{
              background: 'var(--chip-bg)',
              border: '1px solid var(--chip-border)',
              color: 'var(--color-primary-light)',
              fontWeight: 600,
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 6, flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, fontWeight: 700, color: 'var(--color-text-primary)', letterSpacing: '-0.02em', mb: 1 }}
            >
              대표 프로젝트
            </Typography>
            <Typography variant="body1" sx={{ color: 'var(--color-text-muted)' }}>
              직접 기획하고 배포한 프로젝트들입니다.
            </Typography>
          </Box>
          <Button
            variant="outlined"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate('/projects')}
            sx={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)', '&:hover': { borderColor: 'var(--color-primary-light)', color: 'var(--color-text-primary)' }, whiteSpace: 'nowrap' }}
          >
            전체 보기
          </Button>
        </Box>

        {/* 통계 카운터 */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid size={{ xs: 6, sm: 4 }}>
            <StatCounter value={stats.projectCount} suffix="개" label="배포한 프로젝트" color="var(--color-primary-light)" />
          </Grid>
          <Grid size={{ xs: 6, sm: 4 }}>
            <StatCounter value={stats.techCount} suffix="개" label="활용한 기술 스택" color="#22C55E" />
          </Grid>
        </Grid>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
            gap: 3,
          }}
        >
          {featuredProjects.map((project) => (
            <MiniProjectCard key={project.title} project={project} />
          ))}
        </Box>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate('/projects')}
            sx={{
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
              px: 5,
              py: 1.5,
              fontWeight: 600,
              '&:hover': { background: 'linear-gradient(135deg, var(--color-primary-light), var(--color-accent))' },
            }}
          >
            전체 프로젝트 보기
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
