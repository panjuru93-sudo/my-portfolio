import { Box, Typography, Chip, Card, CardContent, LinearProgress } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';

const skillPlaceholders = [
  { name: 'React / Next.js', level: 85, category: 'Frontend' },
  { name: 'TypeScript', level: 78, category: 'Frontend' },
  { name: 'Node.js', level: 70, category: 'Backend' },
  { name: 'UI/UX Design', level: 72, category: 'Design' },
  { name: 'Database', level: 65, category: 'Backend' },
];

const categoryColors = {
  Frontend: '#1455F5',
  Backend: '#5599FF',
  Design: '#D6E8FF',
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
            label="Skill Tree 섹션"
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
          여기는 Skill Tree 섹션입니다
        </Typography>
        <Typography variant="body1" sx={{ color: '#5A6480', mb: 6 }}>
          기술 스택을 트리나 프로그레스바로 시각화할 예정입니다.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {skillPlaceholders.map((skill, idx) => (
            <Card
              key={idx}
              sx={{
                background: 'rgba(10,14,36,0.6)',
                border: '1px solid #1A2040',
                borderRadius: 2,
                transition: 'border-color 0.2s',
                '&:hover': { borderColor: '#1455F5' },
              }}
            >
              <CardContent sx={{ p: '16px 24px !important' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
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
                  </Box>
                  <Typography sx={{ color: '#5A6480', fontSize: '0.85rem', fontWeight: 600 }}>
                    {skill.level}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={skill.level}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    background: '#1A2040',
                    '& .MuiLinearProgress-bar': {
                      background: `linear-gradient(90deg, #1455F5, #4D8FFF)`,
                      borderRadius: 3,
                    },
                  }}
                />
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
