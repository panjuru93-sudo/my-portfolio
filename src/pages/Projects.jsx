import { useState, useEffect } from 'react';
import { Box, Typography, Chip, Button, CircularProgress, Skeleton } from '@mui/material';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { supabase } from '../lib/supabase';

const ACCENT_COLORS = ['#FF6B9D', '#7C3AED', '#22C55E', '#4D8FFF'];
const BG_GRADIENTS = [
  'linear-gradient(135deg, #1a0010 0%, #3d0020 100%)',
  'linear-gradient(135deg, #0d0020 0%, #2a0060 100%)',
  'linear-gradient(135deg, #001a08 0%, #003d14 100%)',
  'linear-gradient(135deg, #000820 0%, #001a40 100%)',
];
const EMOJIS = ['✨', '📝', '💬', '🚀'];

function ThumbnailImage({ src, fallbackBg, fallbackEmoji, fallbackLabel }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* 스켈레톤 — 이미지 로딩 중 */}
      {!loaded && !error && (
        <Skeleton
          variant="rectangular"
          sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(26,32,64,0.5)' }}
        />
      )}
      {/* 실제 썸네일 */}
      {!error && (
        <Box
          component="img"
          src={src}
          alt=""
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        />
      )}
      {/* 이미지 실패 시 폴백 */}
      {error && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: fallbackBg,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          <Typography sx={{ fontSize: '2.5rem', lineHeight: 1 }}>{fallbackEmoji}</Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem', letterSpacing: '0.1em' }}>
            {fallbackLabel}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

function ProjectCard({ project, index }) {
  const [pressed, setPressed] = useState(false);
  const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];
  const bg = BG_GRADIENTS[index % BG_GRADIENTS.length];
  const emoji = EMOJIS[index % EMOJIS.length];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        background: 'rgba(10,14,36,0.7)',
        border: '1px solid #1A2040',
        borderRadius: 3,
        overflow: 'hidden',
        transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
        '&:hover': {
          borderColor: accent,
          boxShadow: `0 8px 40px ${accent}28`,
        },
      }}
    >
      {/* 1:1 썸네일 (200×200) */}
      <Box
        sx={{
          width: { xs: '100%', sm: 200 },
          height: { xs: 200, sm: 200 },
          flexShrink: 0,
          position: 'relative',
          overflow: 'hidden',
          bgcolor: '#0A0E24',
        }}
      >
        <ThumbnailImage
          src={project.thumbnail_url}
          fallbackBg={bg}
          fallbackEmoji={emoji}
          fallbackLabel={`PROJECT ${String(index + 1).padStart(2, '0')}`}
        />
      </Box>

      {/* 정보 영역 */}
      <Box
        sx={{
          flex: 1,
          p: { xs: 3, sm: 4 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <Box>
          <Typography
            sx={{
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: { xs: '1.15rem', sm: '1.3rem' },
              mb: 0.75,
              letterSpacing: '-0.01em',
            }}
          >
            {project.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: '#B0BDD8', lineHeight: 1.7, fontSize: '0.9rem' }}
          >
            {project.description}
          </Typography>
        </Box>

        {/* 기술 스택 뱃지 */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {(project.tech_stack || []).map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{
                background: `${accent}15`,
                color: accent,
                border: `1px solid ${accent}40`,
                fontSize: '0.72rem',
                height: 24,
                fontWeight: 600,
              }}
            />
          ))}
        </Box>

        {/* View Details 버튼 */}
        {project.detail_url && (
          <Box>
            <Button
              variant="outlined"
              endIcon={<OpenInNewIcon sx={{ fontSize: '15px !important' }} />}
              onMouseDown={() => setPressed(true)}
              onMouseUp={() => setPressed(false)}
              onMouseLeave={() => setPressed(false)}
              onClick={() => window.open(project.detail_url, '_blank')}
              sx={{
                borderColor: `${accent}55`,
                color: accent,
                fontSize: '0.82rem',
                px: 2.5,
                py: 0.75,
                borderRadius: 2,
                transform: pressed ? 'scale(0.96)' : 'scale(1)',
                transition: 'transform 0.15s ease',
                '&:hover': {
                  borderColor: accent,
                  background: `${accent}10`,
                },
              }}
            >
              View Details
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}

function CardSkeleton() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        background: 'rgba(10,14,36,0.7)',
        border: '1px solid #1A2040',
        borderRadius: 3,
        overflow: 'hidden',
        height: { sm: 200 },
      }}
    >
      <Skeleton variant="rectangular" sx={{ width: { xs: '100%', sm: 200 }, height: { xs: 200, sm: '100%' }, bgcolor: 'rgba(26,32,64,0.5)' }} />
      <Box sx={{ flex: 1, p: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Skeleton variant="text" width="55%" height={28} sx={{ bgcolor: 'rgba(26,32,64,0.5)' }} />
        <Skeleton variant="text" width="90%" sx={{ bgcolor: 'rgba(26,32,64,0.5)' }} />
        <Skeleton variant="text" width="75%" sx={{ bgcolor: 'rgba(26,32,64,0.5)' }} />
        <Box sx={{ display: 'flex', gap: 1 }}>
          {[60, 80, 55].map((w, i) => (
            <Skeleton key={i} variant="rounded" width={w} height={24} sx={{ bgcolor: 'rgba(26,32,64,0.5)' }} />
          ))}
        </Box>
        <Skeleton variant="rounded" width={120} height={36} sx={{ bgcolor: 'rgba(26,32,64,0.5)' }} />
      </Box>
    </Box>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    supabase
      .from('projects')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true })
      .then(({ data, error }) => {
        if (error) setError(error.message);
        else setProjects(data || []);
        setLoading(false);
      });
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#000000',
        pt: '80px',
        px: { xs: 2, sm: 3 },
        py: 10,
      }}
    >
      <Box sx={{ maxWidth: 860, mx: 'auto' }}>
        {/* 헤더 */}
        <Box sx={{ mb: 8 }}>
          <Chip
            icon={<WorkOutlinedIcon sx={{ fontSize: 16, color: '#4D8FFF !important' }} />}
            label="Projects"
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
          <Typography variant="body1" sx={{ color: '#5A6480' }}>
            직접 기획하고 배포한 프로젝트들입니다.
          </Typography>
        </Box>

        {/* 에러 */}
        {error && (
          <Box
            sx={{
              textAlign: 'center',
              py: 10,
              background: 'rgba(239,68,68,0.05)',
              border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: 3,
            }}
          >
            <Typography sx={{ color: '#EF4444', mb: 1, fontWeight: 600 }}>
              데이터를 불러오지 못했어요
            </Typography>
            <Typography sx={{ color: '#5A6480', fontSize: '0.85rem' }}>{error}</Typography>
          </Box>
        )}

        {/* 스켈레톤 로딩 */}
        {loading && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {[1, 2, 3].map((i) => <CardSkeleton key={i} />)}
          </Box>
        )}

        {/* 프로젝트 리스트 */}
        {!loading && !error && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
