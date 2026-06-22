import { Box, Typography, Chip, Card, CardContent, Button, TextField, Grid } from '@mui/material';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
const MailOutlineIcon = MailOutlinedIcon;
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SendIcon from '@mui/icons-material/Send';

const socialLinks = [
  { icon: <GitHubIcon />, label: 'GitHub', sub: 'github.com/username' },
  { icon: <LinkedInIcon />, label: 'LinkedIn', sub: 'linkedin.com/in/username' },
  { icon: <MailOutlineIcon />, label: 'Email', sub: 'your@email.com' },
];

export default function Contact() {
  return (
    <Box
      component="section"
      id="contact-section"
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
            icon={<MailOutlineIcon sx={{ fontSize: 16, color: '#4D8FFF !important' }} />}
            label="Contact 섹션"
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
          sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, fontWeight: 700, color: '#FFFFFF', mb: 1, letterSpacing: '-0.02em' }}
        >
          여기는 Contact 섹션입니다
        </Typography>
        <Typography variant="body1" sx={{ color: '#5A6480', mb: 6 }}>
          연락처, SNS, 간단한 메시지 폼이 들어갈 예정입니다.
        </Typography>

        <Grid container spacing={4}>
          {/* SNS 링크 */}
          <Grid item xs={12} md={5}>
            <Typography sx={{ color: '#B0BDD8', fontWeight: 600, mb: 2, fontSize: '0.9rem', letterSpacing: '0.06em' }}>
              CONTACT & SNS
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {socialLinks.map((item) => (
                <Card
                  key={item.label}
                  sx={{
                    background: 'rgba(10,14,36,0.6)',
                    border: '1px solid #1A2040',
                    borderRadius: 2,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': { borderColor: '#1455F5', background: 'rgba(20,85,245,0.05)' },
                  }}
                >
                  <CardContent sx={{ p: '14px 20px !important', display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ color: '#4D8FFF' }}>{item.icon}</Box>
                    <Box>
                      <Typography sx={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.9rem' }}>{item.label}</Typography>
                      <Typography sx={{ color: '#5A6480', fontSize: '0.8rem' }}>{item.sub}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Grid>

          {/* 메시지 폼 */}
          <Grid item xs={12} md={7}>
            <Typography sx={{ color: '#B0BDD8', fontWeight: 600, mb: 2, fontSize: '0.9rem', letterSpacing: '0.06em' }}>
              SEND MESSAGE
            </Typography>
            <Card
              sx={{
                background: 'rgba(10,14,36,0.6)',
                border: '1px solid #1A2040',
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
                        color: '#FFFFFF',
                        background: 'rgba(26,32,64,0.5)',
                        '& fieldset': { borderColor: '#1A2040' },
                        '&:hover fieldset': { borderColor: '#4D8FFF' },
                        '&.Mui-focused fieldset': { borderColor: '#1455F5' },
                      },
                      '& input::placeholder': { color: '#5A6480' },
                    }}
                  />
                  <TextField
                    placeholder="이메일"
                    variant="outlined"
                    fullWidth
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: '#FFFFFF',
                        background: 'rgba(26,32,64,0.5)',
                        '& fieldset': { borderColor: '#1A2040' },
                        '&:hover fieldset': { borderColor: '#4D8FFF' },
                        '&.Mui-focused fieldset': { borderColor: '#1455F5' },
                      },
                      '& input::placeholder': { color: '#5A6480' },
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
                        color: '#FFFFFF',
                        background: 'rgba(26,32,64,0.5)',
                        '& fieldset': { borderColor: '#1A2040' },
                        '&:hover fieldset': { borderColor: '#4D8FFF' },
                        '&.Mui-focused fieldset': { borderColor: '#1455F5' },
                      },
                      '& textarea::placeholder': { color: '#5A6480' },
                    }}
                  />
                  <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    fullWidth
                    sx={{
                      background: 'linear-gradient(135deg, #1455F5, #4D8FFF)',
                      py: 1.3,
                      fontWeight: 600,
                      '&:hover': { background: 'linear-gradient(135deg, #4D8FFF, #5599FF)' },
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
