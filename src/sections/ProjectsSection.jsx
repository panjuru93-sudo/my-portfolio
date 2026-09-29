import { Box, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RevealBackground from '../components/common/RevealBackground';
import { projects as featuredProjects } from '../constants/projects';

/**
 * DiagonalDivider 컴포넌트 — 컬럼 사이에 놓이는 얇은 사선 구분선.
 *
 * Example usage:
 * <DiagonalDivider />
 */
function DiagonalDivider() {
  return (
    <Box
      aria-hidden="true"
      sx={{
        display: { xs: 'none', sm: 'block' },
        position: 'absolute',
        left: 0,
        top: '8%',
        width: '1px',
        height: '70%',
        background: 'var(--color-border)',
        transform: 'rotate(14deg)',
        transformOrigin: 'top',
      }}
    />
  );
}

function ContentColumn({ project, index, onOpen }) {
  return (
    <Grid size={{ xs: 12, sm: 4 }} sx={{ position: 'relative', pl: { xs: 0, sm: index > 0 ? 5 : 0 }, pt: { xs: index > 0 ? 5 : 0, sm: 0 } }}>
      {index > 0 && <DiagonalDivider />}

      <Typography
        sx={{
          fontFamily: '"Space Grotesk", "Inter", sans-serif',
          fontWeight: 700,
          fontSize: '0.9rem',
          letterSpacing: '0.05em',
          color: 'var(--color-text-muted)',
          mb: 1.5,
        }}
      >
        ( {String(index + 1).padStart(2, '0')} )
      </Typography>

      <Typography
        sx={{
          fontFamily: '"Space Grotesk", "Inter", sans-serif',
          fontWeight: 700,
          fontSize: { xs: '1.4rem', md: '1.6rem' },
          color: 'var(--color-text-primary)',
          letterSpacing: '-0.01em',
          mb: 0.5,
        }}
      >
        {project.title}
      </Typography>

      <Typography sx={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', mb: 2.5 }}>
        {project.emoji} {project.description}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, mb: 3 }}>
        {project.tags.map((tag) => (
          <Typography key={tag} sx={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)' }}>
            + {tag}
          </Typography>
        ))}
      </Box>

      <Button
        size="small"
        endIcon={<ArrowForwardIcon sx={{ fontSize: '15px !important' }} />}
        onClick={() => onOpen(project.liveUrl)}
        sx={{
          color: 'var(--color-text-primary)',
          fontSize: '0.8rem',
          fontWeight: 600,
          p: 0,
          minWidth: 0,
          '&:hover': { background: 'transparent', opacity: 0.7 },
        }}
      >
        자세히 보기
      </Button>
    </Grid>
  );
}

export default function ProjectsSection() {
  const navigate = useNavigate();
  const handleOpen = (url) => window.open(url, '_blank');

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
        <Typography
          sx={{
            fontFamily: '"Space Grotesk", "Inter", sans-serif',
            fontSize: { xs: '3rem', sm: '4.5rem', md: '6rem' },
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 0.95,
            color: 'var(--color-text-primary)',
            mb: { xs: 8, md: 12 },
          }}
        >
          PROJECTS<Box component="span" sx={{ color: 'var(--color-text-muted)' }}>+</Box>
        </Typography>

        <Grid container spacing={{ xs: 0, sm: 0 }}>
          {featuredProjects.map((project, index) => (
            <ContentColumn key={project.id} project={project} index={index} onOpen={handleOpen} />
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: { xs: 8, md: 10 } }}>
          <Button
            variant="outlined"
            size="large"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate('/projects')}
            sx={{
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-secondary)',
              px: 5,
              py: 1.5,
              fontWeight: 600,
              '&:hover': { borderColor: 'var(--color-primary-light)', color: 'var(--color-text-primary)' },
            }}
          >
            전체 프로젝트 보기
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
