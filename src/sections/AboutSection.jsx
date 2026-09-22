import { useMemo } from 'react';
import { Box, Typography, Button, Chip, Grid, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined';
import { usePortfolio } from '../hooks/usePortfolio';
import { categoryColors, categoryIcons } from '../theme/skillCategories';
import RevealBackground from '../components/common/RevealBackground';

export default function AboutSection() {
  const navigate = useNavigate();
  const { getHomeData } = usePortfolio();
  const homeData = useMemo(() => getHomeData(), [getHomeData]);
  const { content, skills, basicInfo } = homeData;

  const devStory = content.find((section) => section.id === 'dev-story') ?? content[0];

  return (
    <Box
      component="section"
      id="about-section"
      aria-label="About Me 요약"
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

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 900,
          width: '100%',
          animation: 'aboutFadeIn 0.6s ease',
          '@keyframes aboutFadeIn': {
            from: { opacity: 0, transform: 'translateY(12px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
          },
        }}
      >
        {/* 섹션 레이블 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
          <Box sx={{ width: 32, height: 2, background: 'var(--color-primary)', borderRadius: 1 }} />
          <Chip
            icon={<PersonOutlinedIcon sx={{ fontSize: 16, color: 'var(--color-primary-light) !important' }} />}
            label="소개"
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
            mb: 5,
            letterSpacing: '-0.02em',
          }}
        >
          안녕하세요,{' '}
          <Box component="span" sx={{ color: 'var(--color-primary-light)' }}>
            {basicInfo.name || '정아영'}
          </Box>
          입니다 👋
        </Typography>

        <Grid container spacing={4} sx={{ mb: 6 }}>
          {/* 메인 콘텐츠: 개발 스토리 요약 */}
          <Grid size={{ xs: 12, md: 7 }}>
            {devStory && (
              <Box
                sx={{
                  background: 'var(--surface-card-stronger)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 3,
                  p: { xs: 3, md: 4 },
                  height: '100%',
                }}
              >
                <Typography sx={{ color: 'var(--color-primary-light)', fontWeight: 700, fontSize: '0.85rem', mb: 1.5, letterSpacing: '0.04em' }}>
                  {devStory.title.toUpperCase()}
                </Typography>
                <Typography
                  sx={{
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.9,
                    fontSize: { xs: '0.95rem', md: '1rem' },
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {devStory.summary}
                </Typography>
              </Box>
            )}
          </Grid>

          {/* 사이드: 프로필 사진 + 기본 정보 카드 */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                background: 'var(--surface-card-stronger)',
                border: '1px solid var(--color-border)',
                borderRadius: 3,
                p: 3,
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 2.5,
              }}
            >
              <Avatar
                src={basicInfo.photo || undefined}
                slotProps={{ img: { loading: 'lazy', alt: `${basicInfo.name || '정아영'} 프로필 사진` } }}
                sx={{ width: 64, height: 64, background: 'var(--chip-bg-stronger)', color: 'var(--color-primary-light)', flexShrink: 0 }}
              >
                <PersonOutlinedIcon />
              </Avatar>
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ color: 'var(--color-text-primary)', fontWeight: 700, fontSize: '1rem', mb: 1 }}>
                  {basicInfo.name || '정아영'}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.5 }}>
                  <SchoolOutlinedIcon sx={{ fontSize: 15, color: 'var(--color-text-muted)' }} />
                  <Typography sx={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }} noWrap>
                    {basicInfo.education || '—'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <WorkOutlinedIcon sx={{ fontSize: 15, color: 'var(--color-text-muted)' }} />
                  <Typography sx={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }} noWrap>
                    {basicInfo.experience || '—'}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* 하단: 주요 스킬 4개 */}
        <Box sx={{ mb: 5 }}>
          <Typography sx={{ color: 'var(--color-text-muted)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.06em', mb: 2 }}>
            주요 스킬
          </Typography>
          <Grid container spacing={2}>
            {skills.map((skill) => {
              const color = categoryColors[skill.category] ?? '#4D8FFF';
              const Icon = categoryIcons[skill.category] ?? PersonOutlinedIcon;
              return (
                <Grid size={{ xs: 6, sm: 3 }} key={skill.id}>
                  <Box
                    sx={{
                      background: 'var(--surface-card)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 2,
                      p: 2,
                      textAlign: 'center',
                      transition: 'border-color 0.2s',
                      '&:hover': { borderColor: color },
                    }}
                  >
                    <Icon sx={{ color, fontSize: 24, mb: 1 }} />
                    <Typography sx={{ color: 'var(--color-text-primary)', fontWeight: 600, fontSize: '0.82rem' }} noWrap>
                      {skill.name}
                    </Typography>
                    <Typography sx={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', mt: 0.25 }}>
                      {skill.level}%
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={() => navigate('/about')}
          sx={{
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
            px: 3,
            py: 1.2,
            fontWeight: 600,
            '&:hover': { background: 'linear-gradient(135deg, var(--color-primary-light), var(--color-accent))' },
          }}
        >
          더 알아보기
        </Button>
      </Box>
    </Box>
  );
}
