import { useMemo } from 'react';
import { Box, Typography, Chip, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CodeIcon from '@mui/icons-material/Code';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { usePortfolio } from '../hooks/usePortfolio';
import { categoryColors } from '../theme/skillCategories';
import CircularSkillGauge from '../components/common/CircularSkillGauge';
import RevealBackground from '../components/common/RevealBackground';

export default function SkillTree() {
  const navigate = useNavigate();
  const { getHomeData } = usePortfolio();
  const { skills } = useMemo(() => getHomeData(), [getHomeData]);

  return (
    <Box
      component="section"
      id="skill-section"
      aria-label="주요 기술 스택"
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
      <RevealBackground background="var(--color-bg-primary)" />

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 900,
          width: '100%',
          animation: 'skillsFadeIn 0.6s ease',
          '@keyframes skillsFadeIn': {
            from: { opacity: 0, transform: 'translateY(12px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
          <Box sx={{ width: 32, height: 2, background: 'var(--color-primary)', borderRadius: 1 }} />
          <Chip
            icon={<CodeIcon sx={{ fontSize: 16, color: 'var(--color-primary-light) !important' }} />}
            label="스킬"
            size="small"
            sx={{
              background: 'var(--chip-bg)',
              border: '1px solid var(--chip-border)',
              color: 'var(--color-primary-light)',
              fontWeight: 600,
            }}
          />
        </Box>

        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2rem', md: '2.8rem' },
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            mb: 1,
            letterSpacing: '-0.02em',
          }}
        >
          기술 스택
        </Typography>
        <Typography variant="body1" sx={{ color: 'var(--color-text-muted)', mb: 6 }}>
          가장 자신있는 기술 4가지입니다. 전체 스킬은 About Me에서 확인하세요.
        </Typography>

        <Grid container spacing={2} sx={{ mb: 5 }}>
          {skills.map((skill) => {
            const color = categoryColors[skill.category] ?? '#4D8FFF';
            return (
              <Grid size={{ xs: 6, sm: 3 }} key={skill.id}>
                <Box
                  sx={{
                    background: 'var(--surface-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 2,
                    p: 3,
                    display: 'flex',
                    justifyContent: 'center',
                    transition: 'border-color 0.2s',
                    '&:hover': { borderColor: color },
                  }}
                >
                  <CircularSkillGauge value={skill.level} label={skill.name} color={color} size={84} />
                </Box>
              </Grid>
            );
          })}
        </Grid>

        <Button
          variant="outlined"
          endIcon={<ArrowForwardIcon />}
          onClick={() => navigate('/about')}
          sx={{
            borderColor: 'var(--color-border)',
            color: 'var(--color-text-secondary)',
            px: 3,
            py: 1.2,
            fontWeight: 600,
            '&:hover': { borderColor: 'var(--color-primary-light)', color: 'var(--color-text-primary)' },
          }}
        >
          전체 스킬 보기
        </Button>
      </Box>
    </Box>
  );
}
