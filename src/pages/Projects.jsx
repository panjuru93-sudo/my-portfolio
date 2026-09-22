import { Box, Typography, Chip, Button, Grid } from '@mui/material';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { projects } from '../constants/projects';

function ProjectCard({ project }) {
  return (
    <Grid size={{ xs: 12, sm: 6 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          background: 'var(--surface-card-strong)',
          border: '1px solid var(--color-border)',
          borderRadius: 3,
          overflow: 'hidden',
          transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
          '&:hover': {
            borderColor: project.accent,
            boxShadow: `0 8px 40px ${project.accent}28`,
          },
        }}
      >
        {/* 썸네일 */}
        <Box
          sx={{
            height: 160,
            background: project.bg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography sx={{ fontSize: '2.75rem' }}>{project.emoji}</Typography>
        </Box>

        {/* 정보 */}
        <Box sx={{ flex: 1, p: { xs: 3, sm: 3.5 }, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <Typography
              sx={{ color: 'var(--color-text-primary)', fontWeight: 700, fontSize: '1.15rem', mb: 0.75, letterSpacing: '-0.01em' }}
            >
              {project.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, fontSize: '0.9rem' }}>
              {project.description}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {project.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  background: `${project.accent}15`,
                  color: project.accent,
                  border: `1px solid ${project.accent}40`,
                  fontSize: '0.72rem',
                  height: 24,
                  fontWeight: 600,
                }}
              />
            ))}
          </Box>

          <Box sx={{ mt: 'auto' }}>
            <Button
              variant="outlined"
              endIcon={<OpenInNewIcon sx={{ fontSize: '15px !important' }} />}
              onClick={() => window.open(project.liveUrl, '_blank')}
              sx={{
                borderColor: `${project.accent}55`,
                color: project.accent,
                fontSize: '0.82rem',
                px: 2.5,
                py: 0.75,
                borderRadius: 2,
                '&:hover': {
                  borderColor: project.accent,
                  background: `${project.accent}10`,
                },
              }}
            >
              자세히 보기
            </Button>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
}

export default function Projects() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'var(--color-bg-primary)',
        pt: '80px',
        px: { xs: 2, sm: 3 },
        py: 10,
      }}
    >
      <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
        {/* 헤더 */}
        <Box sx={{ mb: 6 }}>
          <Chip
            icon={<WorkOutlinedIcon sx={{ fontSize: 16, color: 'var(--color-primary-light) !important' }} />}
            label="프로젝트"
            size="small"
            sx={{
              mb: 3,
              background: 'var(--chip-bg)',
              border: '1px solid var(--chip-border)',
              color: 'var(--color-primary-light)',
              fontWeight: 600,
            }}
          />
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.2rem', md: '3rem' },
              fontWeight: 800,
              color: 'var(--color-text-primary)',
              mb: 2,
              letterSpacing: '-0.03em',
            }}
          >
            프로젝트
          </Typography>
          <Typography variant="body1" sx={{ color: 'var(--color-text-muted)' }}>
            직접 기획하고 배포한 프로젝트들입니다.
          </Typography>
        </Box>

        {/* 프로젝트 리스트 */}
        <Grid container spacing={3}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
