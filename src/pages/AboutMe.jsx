import { Box, Typography, Chip, Card, CardContent } from '@mui/material';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
const PersonOutlineIcon = PersonOutlinedIcon;
import ConstructionIcon from '@mui/icons-material/Construction';

export default function AboutMe() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#03040D',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pt: '80px',
        px: 3,
        py: 10,
      }}
    >
      <Box sx={{ maxWidth: 800, width: '100%', textAlign: 'center' }}>
        <Chip
          icon={<PersonOutlineIcon sx={{ fontSize: 16, color: '#4D8FFF !important' }} />}
          label="About Me Page"
          size="small"
          sx={{
            mb: 4,
            background: 'rgba(20,85,245,0.1)',
            border: '1px solid rgba(20,85,245,0.3)',
            color: '#4D8FFF',
            fontWeight: 600,
            fontSize: '0.75rem',
            letterSpacing: '0.06em',
          }}
        />

        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.2rem', md: '3rem' },
            fontWeight: 800,
            color: '#FFFFFF',
            mb: 3,
            letterSpacing: '-0.03em',
          }}
        >
          About Me
        </Typography>

        <Card
          sx={{
            background: 'rgba(10,14,36,0.6)',
            border: '1px solid #1A2040',
            borderRadius: 4,
            mt: 4,
          }}
        >
          <CardContent
            sx={{
              p: { xs: 4, md: 6 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'rgba(20,85,245,0.1)',
                border: '2px solid rgba(20,85,245,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ConstructionIcon sx={{ color: '#4D8FFF', fontSize: 36 }} />
            </Box>

            <Typography
              variant="h5"
              sx={{ color: '#FFFFFF', fontWeight: 600 }}
            >
              About Me 페이지가 개발될 공간입니다
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: '#B0BDD8',
                lineHeight: 1.9,
                maxWidth: 520,
                textAlign: 'center',
              }}
            >
              상세한 자기소개가 들어갈 예정입니다.
              <br /><br />
              학력, 경력, 수상 이력, 개인 철학, 취미 등 자신을 더 깊이
              소개하는 콘텐츠로 이 페이지를 채워나갈 예정입니다.
            </Typography>

            <Box
              sx={{
                display: 'flex',
                gap: 3,
                flexWrap: 'wrap',
                justifyContent: 'center',
                mt: 1,
              }}
            >
              {['자기소개', '경력/학력', '수상 이력', '개인 철학'].map((item) => (
                <Chip
                  key={item}
                  label={item}
                  sx={{
                    background: 'rgba(20,85,245,0.08)',
                    border: '1px dashed rgba(20,85,245,0.3)',
                    color: '#5A6480',
                    fontSize: '0.8rem',
                  }}
                />
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
