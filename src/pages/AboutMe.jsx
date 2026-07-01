import { useState, useRef } from 'react';
import {
  Box, Typography, Chip, Avatar, Grid, Tabs, Tab,
  Divider,
} from '@mui/material';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined';
import CodeIcon from '@mui/icons-material/Code';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';

// ── 데이터 ──────────────────────────────────────────────
const aboutMeData = {
  basicInfo: {
    name: '정아영',
    education: '부산영상예술고등학교 디자인과 졸업',
    major: '영상시각디자인',
    experience: '신입',
    photo: '',
  },
  sections: [
    {
      id: 'dev-story',
      title: '나의 개발 스토리',
      icon: 'code',
      content: `수업 덕분에 개발을 시작하게 되었는데, 시스템적으로 어떻게 만들어지는지 알게 되니까 굉장히 신기하고 재미있습니다.`,
      showInHome: true,
    },
    {
      id: 'philosophy',
      title: '개발 철학',
      icon: 'favorite',
      content: `직관적으로 잘 보이고 눈에 잘 띄는지, 사람들에게 임팩트를 줄 수 있는 디자인으로도 훌륭한 개발을 하고 싶습니다.`,
      showInHome: true,
    },
    {
      id: 'personal',
      title: '개인적인 이야기',
      icon: 'person',
      content: `취미는 노래 듣기인데요, 랜덤으로 재생해서 듣거나 듣고 있는 노래들을 반복 재생해서 듣기도 합니다.

소품샵 돌아다니는 것도 좋아하는데요, 사람들이 여러 가치를 통해 만든 물건을 보면 마음이 기분이 좋다고 할까요.`,
      showInHome: false,
    },
  ],
};

// ── 기본 정보 항목 ────────────────────────────────────────
const INFO_ITEMS = [
  { key: 'name',       label: '이름',   icon: <PersonOutlinedIcon fontSize="small" /> },
  { key: 'education',  label: '학력',   icon: <SchoolOutlinedIcon fontSize="small" /> },
  { key: 'major',      label: '전공/분야', icon: <CodeIcon fontSize="small" /> },
  { key: 'experience', label: '경력',   icon: <WorkOutlinedIcon fontSize="small" /> },
];

// ── 섹션 아이콘 ───────────────────────────────────────────
const SECTION_ICON = {
  code:     <CodeIcon sx={{ fontSize: 18 }} />,
  favorite: <FavoriteOutlinedIcon sx={{ fontSize: 18 }} />,
  person:   <PersonOutlinedIcon sx={{ fontSize: 18 }} />,
};

// ── 탭 패널 ──────────────────────────────────────────────
function TabPanel({ children, value, index }) {
  return value === index ? <Box sx={{ pt: 4 }}>{children}</Box> : null;
}

// ── 프로필 사진 업로드 ────────────────────────────────────
function PhotoUploader({ photo, onChange }) {
  const inputRef = useRef();

  const handleClick = () => inputRef.current?.click();
  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onChange(ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        width: { xs: 100, sm: 120 },
        height: { xs: 100, sm: 120 },
        borderRadius: '50%',
        border: '2px dashed rgba(77,143,255,0.4)',
        cursor: 'pointer',
        overflow: 'hidden',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(20,85,245,0.06)',
        transition: 'border-color 0.2s, background 0.2s',
        '&:hover': {
          borderColor: '#4D8FFF',
          background: 'rgba(20,85,245,0.12)',
        },
      }}
    >
      {photo ? (
        <Avatar src={photo} sx={{ width: '100%', height: '100%' }} />
      ) : (
        <Box sx={{ textAlign: 'center' }}>
          <CameraAltOutlinedIcon sx={{ color: '#4D8FFF', fontSize: 28, mb: 0.5 }} />
          <Typography sx={{ color: '#5A6480', fontSize: '0.65rem', lineHeight: 1.3 }}>
            사진 추가
          </Typography>
        </Box>
      )}
      <input ref={inputRef} type="file" accept="image/*" hidden onChange={handleFile} />
    </Box>
  );
}

// ── 메인 컴포넌트 ─────────────────────────────────────────
export default function AboutMe() {
  const [data, setData] = useState(aboutMeData);
  const [tabIndex, setTabIndex] = useState(0);

  const { basicInfo, sections } = data;

  const updatePhoto = (photoDataUrl) => {
    setData((prev) => ({
      ...prev,
      basicInfo: { ...prev.basicInfo, photo: photoDataUrl },
    }));
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#03040D',
        pt: '80px',
        px: { xs: 2, sm: 3 },
        py: 10,
      }}
    >
      <Box sx={{ maxWidth: 860, mx: 'auto' }}>

        {/* ── 헤더 ── */}
        <Box sx={{ mb: 6 }}>
          <Chip
            icon={<PersonOutlinedIcon sx={{ fontSize: 16, color: '#4D8FFF !important' }} />}
            label="About Me"
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
              letterSpacing: '-0.03em',
            }}
          >
            About Me
          </Typography>
        </Box>

        {/* ── 기본 정보 카드 ── */}
        <Box
          sx={{
            background: 'rgba(10,14,36,0.7)',
            border: '1px solid #1A2040',
            borderRadius: 3,
            p: { xs: 3, sm: 4 },
            mb: 4,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'center', sm: 'flex-start' },
              gap: 4,
            }}
          >
            {/* 프로필 사진 */}
            <PhotoUploader photo={basicInfo.photo} onChange={updatePhoto} />

            {/* 기본 정보 그리드 */}
            <Grid container spacing={2} sx={{ flex: 1 }}>
              {INFO_ITEMS.map(({ key, label, icon }) => (
                <Grid item xs={12} sm={6} key={key}>
                  <Box
                    sx={{
                      background: 'rgba(26,32,64,0.5)',
                      border: '1px solid #1A2040',
                      borderRadius: 2,
                      p: 2,
                      height: '100%',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.75 }}>
                      <Box sx={{ color: '#4D8FFF' }}>{icon}</Box>
                      <Typography sx={{ color: '#5A6480', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.06em' }}>
                        {label.toUpperCase()}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        color: basicInfo[key] ? '#FFFFFF' : '#2A3150',
                        fontWeight: basicInfo[key] ? 600 : 400,
                        fontSize: '0.95rem',
                      }}
                    >
                      {basicInfo[key] || '—'}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* showInHome 뱃지 표시 */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 3, pt: 3, borderTop: '1px solid #1A2040' }}>
            <Typography sx={{ color: '#5A6480', fontSize: '0.75rem', mr: 0.5 }}>홈 탭 노출:</Typography>
            {sections.filter((s) => s.showInHome).map((s) => (
              <Chip
                key={s.id}
                label={s.title}
                size="small"
                sx={{
                  background: 'rgba(20,85,245,0.12)',
                  color: '#4D8FFF',
                  border: '1px solid rgba(20,85,245,0.3)',
                  fontSize: '0.7rem',
                  height: 22,
                }}
              />
            ))}
          </Box>
        </Box>

        {/* ── 콘텐츠 섹션 (탭) ── */}
        <Box
          sx={{
            background: 'rgba(10,14,36,0.7)',
            border: '1px solid #1A2040',
            borderRadius: 3,
            p: { xs: 3, sm: 4 },
          }}
        >
          <Tabs
            value={tabIndex}
            onChange={(_, v) => setTabIndex(v)}
            sx={{
              '& .MuiTabs-indicator': { background: '#1455F5', height: 2 },
              '& .MuiTab-root': {
                color: '#5A6480',
                fontWeight: 600,
                fontSize: { xs: '0.8rem', sm: '0.875rem' },
                minHeight: 48,
                textTransform: 'none',
                '&.Mui-selected': { color: '#4D8FFF' },
              },
              borderBottom: '1px solid #1A2040',
            }}
          >
            {sections.map((section, i) => (
              <Tab
                key={section.id}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                    {SECTION_ICON[section.icon]}
                    <span>{section.title}</span>
                    {!section.showInHome && (
                      <Chip
                        label="비공개"
                        size="small"
                        sx={{
                          height: 16,
                          fontSize: '0.6rem',
                          background: 'rgba(90,100,128,0.2)',
                          color: '#5A6480',
                          ml: 0.5,
                        }}
                      />
                    )}
                  </Box>
                }
                value={i}
              />
            ))}
          </Tabs>

          {sections.map((section, i) => (
            <TabPanel key={section.id} value={tabIndex} index={i}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <Box sx={{ color: '#4D8FFF' }}>{SECTION_ICON[section.icon]}</Box>
                <Typography sx={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.1rem' }}>
                  {section.title}
                </Typography>
                <Chip
                  label={section.showInHome ? '홈 노출' : '홈 미노출'}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: '0.68rem',
                    background: section.showInHome ? 'rgba(20,85,245,0.12)' : 'rgba(90,100,128,0.15)',
                    color: section.showInHome ? '#4D8FFF' : '#5A6480',
                    border: `1px solid ${section.showInHome ? 'rgba(20,85,245,0.3)' : 'rgba(90,100,128,0.3)'}`,
                  }}
                />
              </Box>

              <Divider sx={{ borderColor: '#1A2040', mb: 3 }} />

              {section.content ? (
                <Typography
                  sx={{
                    color: '#B0BDD8',
                    lineHeight: 2,
                    fontSize: '0.97rem',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {section.content}
                </Typography>
              ) : (
                <Box
                  sx={{
                    textAlign: 'center',
                    py: 6,
                    background: 'rgba(26,32,64,0.3)',
                    borderRadius: 2,
                    border: '1px dashed rgba(77,143,255,0.2)',
                  }}
                >
                  <Typography sx={{ color: '#2A3150', fontSize: '2rem', mb: 1 }}>✏️</Typography>
                  <Typography sx={{ color: '#2A3150', fontSize: '0.9rem' }}>
                    아직 작성된 내용이 없어요.
                  </Typography>
                  <Typography sx={{ color: '#1A2040', fontSize: '0.8rem', mt: 0.5 }}>
                    AboutMe.jsx의 sections[{i}].content에 내용을 입력하세요.
                  </Typography>
                </Box>
              )}
            </TabPanel>
          ))}
        </Box>

      </Box>
    </Box>
  );
}
