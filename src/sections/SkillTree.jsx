import { Box, Typography, Chip, LinearProgress } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';

const skills = [
  { name: 'React', level: 80, category: 'Frontend', desc: '여러 프로젝트를 React로 개발, Hooks·Router 활용' },
  { name: 'JavaScript (ES6+)', level: 75, category: 'Frontend', desc: '비동기 처리, 구조분해할당 등 실전 문법 활용' },
  { name: 'MUI (Material UI)', level: 82, category: 'UI', desc: 'sx prop, 테마 커스터마이징, 반응형 레이아웃 구현' },
  { name: 'Supabase', level: 65, category: 'Backend', desc: '인증, DB CRUD, 실시간 데이터 연동 경험' },
  { name: 'React Router', level: 72, category: 'Frontend', desc: '중첩 라우팅, 보호된 라우트(Private Route) 구현' },
  { name: 'Vite', level: 70, category: 'Tool', desc: '빠른 개발 환경 구성 및 GitHub Pages 배포' },
  { name: 'Git / GitHub', level: 68, category: 'Tool', desc: '브랜치 관리, PR, GitHub Actions 워크플로우 경험' },
  { name: 'HTML / CSS', level: 78, category: 'Frontend', desc: '시맨틱 마크업, Flexbox/Grid 레이아웃 구성' },
];

const categoryColors = {
  Frontend: '#1455F5',
  UI: '#7C3AED',
  Backend: '#22C55E',
  Tool: '#F59E0B',
};

export default function SkillTree() {
  return (
    <Box
      component="section"
      id="skill-section"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000000',
        py: 12,
        px: 3,
      }}
    >
      <Box sx={{ maxWidth: 900, width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
          <Box sx={{ width: 32, height: 2, background: '#1455F5', borderRadius: 1 }} />
          <Chip
            icon={<CodeIcon sx={{ fontSize: 16, color: '#4D8FFF !important' }} />}
            label="Skills"
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
            mb: 1,
            letterSpacing: '-0.02em',
          }}
        >
          기술 스택
        </Typography>
        <Typography variant="body1" sx={{ color: '#5A6480', mb: 6 }}>
          프로젝트를 통해 직접 사용하며 익힌 기술들입니다.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {skills.map((skill) => (
            <Box
              key={skill.name}
              sx={{
                background: 'rgba(10,14,36,0.6)',
                border: '1px solid #1A2040',
                borderRadius: 2,
                p: '16px 24px',
                transition: 'border-color 0.2s',
                '&:hover': { borderColor: categoryColors[skill.category] },
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                  <Typography sx={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.95rem' }}>
                    {skill.name}
                  </Typography>
                  <Chip
                    label={skill.category}
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: '0.7rem',
                      background: `${categoryColors[skill.category]}20`,
                      color: categoryColors[skill.category],
                      border: `1px solid ${categoryColors[skill.category]}40`,
                    }}
                  />
                  <Typography sx={{ color: '#5A6480', fontSize: '0.78rem', display: { xs: 'none', sm: 'block' } }}>
                    {skill.desc}
                  </Typography>
                </Box>
                <Typography sx={{ color: '#5A6480', fontSize: '0.85rem', fontWeight: 600, flexShrink: 0, ml: 2 }}>
                  {skill.level}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={skill.level}
                sx={{
                  height: 5,
                  borderRadius: 3,
                  background: '#1A2040',
                  '& .MuiLinearProgress-bar': {
                    background: `linear-gradient(90deg, ${categoryColors[skill.category]}, ${categoryColors[skill.category]}99)`,
                    borderRadius: 3,
                  },
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
