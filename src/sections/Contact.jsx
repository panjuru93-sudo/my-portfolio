import { Box, Typography, Chip, Card, CardContent, Button, TextField, Grid } from '@mui/material';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import SendIcon from '@mui/icons-material/Send';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { GITHUB_URL, EMAIL_ADDRESS, EMAIL_URL } from '../constants/socialLinks';
import RevealBackground from '../components/common/RevealBackground';

const contactLinks = [
  {
    icon: <GitHubIcon />,
    label: 'GitHub',
    sub: GITHUB_URL.replace('https://', ''),
    url: GITHUB_URL,
    accent: 'var(--color-text-primary)',
  },
  {
    icon: <MailOutlinedIcon />,
    label: 'Email',
    sub: EMAIL_ADDRESS,
    url: EMAIL_URL,
    accent: 'var(--color-primary-light)',
  },
];

export default function Contact() {
  return (
    <Box
      component="section"
      id="contact-section"
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

      <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 900, width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
          <Box sx={{ width: 32, height: 2, background: 'var(--color-primary)', borderRadius: 1 }} />
          <Chip
            icon={<MailOutlinedIcon sx={{ fontSize: 16, color: 'var(--color-primary-light) !important' }} />}
            label="연락처"
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
          sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, fontWeight: 700, color: 'var(--color-text-primary)', mb: 1, letterSpacing: '-0.02em' }}
        >
          함께 이야기해요 ✉️
        </Typography>
        <Typography variant="body1" sx={{ color: 'var(--color-text-muted)', mb: 6 }}>
          프로젝트 협업, 피드백, 어떤 연락이든 환영합니다.
        </Typography>

        <Grid container spacing={4}>
          {/* 연락처 링크 */}
          <Grid item xs={12} md={5}>
            <Typography sx={{ color: 'var(--color-text-secondary)', fontWeight: 600, mb: 2, fontSize: '0.9rem', letterSpacing: '0.06em' }}>
              연락처
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {contactLinks.map((item) => (
                <Card
                  key={item.label}
                  component="a"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    background: 'var(--surface-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 2,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textDecoration: 'none',
                    display: 'block',
                    '&:hover': { borderColor: item.accent, background: 'var(--chip-bg-soft)' },
                  }}
                >
                  <CardContent sx={{ p: '14px 20px !important', display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ color: item.accent }}>{item.icon}</Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ color: 'var(--color-text-primary)', fontWeight: 600, fontSize: '0.9rem' }}>{item.label}</Typography>
                      <Typography sx={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>{item.sub}</Typography>
                    </Box>
                    <OpenInNewIcon sx={{ color: 'var(--color-placeholder)', fontSize: 16 }} />
                  </CardContent>
                </Card>
              ))}
            </Box>

            {/* 포트폴리오 링크 */}
            <Box
              sx={{
                mt: 3,
                p: 3,
                background: 'var(--chip-bg-soft)',
                border: '1px solid var(--chip-border-soft)',
                borderRadius: 2,
              }}
            >
              <Typography sx={{ color: 'var(--color-primary-light)', fontWeight: 700, fontSize: '0.85rem', mb: 0.5 }}>
                🚀 배포된 프로젝트
              </Typography>
              <Typography
                component="a"
                href="https://panjuru93-sudo.github.io/pingiping/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'var(--color-text-muted)',
                  fontSize: '0.78rem',
                  textDecoration: 'none',
                  '&:hover': { color: 'var(--color-primary-light)' },
                }}
              >
                panjuru93-sudo.github.io/pingiping
              </Typography>
            </Box>
          </Grid>

          {/* 메시지 폼 */}
          <Grid item xs={12} md={7}>
            <Typography sx={{ color: 'var(--color-text-secondary)', fontWeight: 600, mb: 2, fontSize: '0.9rem', letterSpacing: '0.06em' }}>
              메시지 작성
            </Typography>
            <Card
              sx={{
                background: 'var(--surface-card)',
                border: '1px solid var(--color-border)',
                borderRadius: 3,
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                  <TextField
                    placeholder="이름"
                    variant="outlined"
                    fullWidth
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'var(--color-text-primary)',
                        background: 'var(--surface-panel-strong)',
                        '& fieldset': { borderColor: 'var(--color-border)' },
                        '&:hover fieldset': { borderColor: 'var(--color-primary-light)' },
                        '&.Mui-focused fieldset': { borderColor: 'var(--color-primary)' },
                      },
                      '& input::placeholder': { color: 'var(--color-text-muted)' },
                    }}
                  />
                  <TextField
                    placeholder="이메일"
                    variant="outlined"
                    fullWidth
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'var(--color-text-primary)',
                        background: 'var(--surface-panel-strong)',
                        '& fieldset': { borderColor: 'var(--color-border)' },
                        '&:hover fieldset': { borderColor: 'var(--color-primary-light)' },
                        '&.Mui-focused fieldset': { borderColor: 'var(--color-primary)' },
                      },
                      '& input::placeholder': { color: 'var(--color-text-muted)' },
                    }}
                  />
                  <TextField
                    placeholder="메시지를 입력하세요..."
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'var(--color-text-primary)',
                        background: 'var(--surface-panel-strong)',
                        '& fieldset': { borderColor: 'var(--color-border)' },
                        '&:hover fieldset': { borderColor: 'var(--color-primary-light)' },
                        '&.Mui-focused fieldset': { borderColor: 'var(--color-primary)' },
                      },
                      '& textarea::placeholder': { color: 'var(--color-text-muted)' },
                    }}
                  />
                  <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    fullWidth
                    onClick={() => window.open(EMAIL_URL, '_blank')}
                    sx={{
                      background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
                      py: 1.3,
                      fontWeight: 600,
                      '&:hover': { background: 'linear-gradient(135deg, var(--color-primary-light), var(--color-accent))' },
                    }}
                  >
                    메시지 보내기
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
