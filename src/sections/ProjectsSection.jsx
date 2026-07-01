import { Box, Typography, Chip, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const featuredProjects = [
  {
    title: '같이 하자',
    description: '관심 있는 스터디·취미 모임을 찾고 함께 성장하는 소셜 매칭 플랫폼',
    tags: ['React', 'Supabase', 'MUI'],
    emoji: '✨',
    accent: '#FF6B9D',
    bg: 'linear-gradient(135deg, #1a0010 0%, #3d0020 100%)',
    liveUrl: 'https://panjuru93-sudo.github.io/pingiping/mini_sns/',
  },
  {
    title: '방명록',
    description: '방문자들이 따뜻한 메시지를 남기고 서로 소통할 수 있는 온라인 방명록',
    tags: ['React', 'Supabase', 'MUI'],
    emoji: '📝',
    accent: '#7C3AED',
    bg: 'linear-gradient(135deg, #0d0020 0%, #2a0060 100%)',
    liveUrl: 'https://panjuru93-sudo.github.io/pingiping/my-guestbook/',
  },
  {
    title: '커뮤니티 게시판',
    description: '로그인·회원가입부터 게시글 작성·검색까지 갖춘 Supabase 기반 커뮤니티',
    tags: ['React', 'Supabase', 'Auth'],
    emoji: '💬',
    accent: '#22C55E',
    bg: 'linear-gradient(135deg, #001a08 0%, #003d14 100%)',
    liveUrl: 'https://panjuru93-sudo.github.io/pingiping/my-community/',
  },
];

function MiniProjectCard({ project }) {
  return (
    <Box
      sx={{
        background: 'rgba(10,14,36,0.6)',
        border: '1px solid #1A2040',
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
        <Typography sx={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1rem', mb: 0.75 }}>
          {project.title}
        </Typography>
        <Typography variant="body2" sx={{ color: '#B0BDD8', fontSize: '0.83rem', lineHeight: 1.6, mb: 2 }}>
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
            icon={<WorkOutlinedIcon sx={{ fontSize: 16, color: '#4D8FFF !important' }} />}
            label="Projects"
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
              대표 프로젝트
            </Typography>
            <Typography variant="body1" sx={{ color: '#5A6480' }}>
              직접 기획하고 배포한 프로젝트들입니다.
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
              background: 'linear-gradient(135deg, #1455F5, #4D8FFF)',
              px: 5,
              py: 1.5,
              fontWeight: 600,
              '&:hover': { background: 'linear-gradient(135deg, #4D8FFF, #5599FF)' },
            }}
          >
            전체 프로젝트 보기
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
