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
    education: '부산영상예술고등학교 영상디자인과 졸업',
    major: '웹 프론트엔드 개발',
    experience: 'React 학습 중',
    photo: '',
  },
  sections: [
    {
      id: 'dev-story',
      title: '나의 개발 스토리',
      icon: 'code',
      content: `코딩을 처음 접한 건 바이브코딩 강의를 통해서였습니다.

처음에는 단순히 화면에 무언가가 나타나는 것만으로도 신기하고 즐거웠어요. 그런데 배우다 보니 "직접 써볼 수 있는 걸 만들고 싶다"는 욕심이 생겼습니다. 그래서 강의에서 배운 것을 단순히 따라 만드는 것에 그치지 않고, 직접 기획하고 배포까지 해보기 시작했어요.

커뮤니티 게시판, 방명록, 취미 모임 매칭 플랫폼까지 — 지금까지 만든 서비스들은 작고 소박하지만, 실제로 접속하고 사용할 수 있는 것들입니다. 처음 배포 버튼을 눌렀을 때의 두근거림을 아직도 기억해요.

앞으로도 계속해서 새로운 것을 배우고, 사람들이 실제로 쓰는 서비스를 만드는 개발자로 성장하고 싶습니다.`,
      showInHome: true,
    },
    {
      id: 'philosophy',
      title: '개발 철학',
      icon: 'favorite',
      content: `코드는 사람을 위해 존재한다고 생각합니다.

아무리 최신 기술을 사용하고 깔끔한 코드를 작성해도, 사용하는 사람이 불편하다면 의미가 없다고 느껴요. 그래서 항상 "이 화면을 처음 보는 사람도 어떻게 쓰는지 바로 알 수 있을까?"를 먼저 생각합니다.

또 완벽한 코드보다 동작하는 코드를, 동작하는 코드보다 사람들이 실제로 사용하는 서비스를 만드는 것을 더 가치 있게 생각해요. 작더라도 끝까지 만들어서 배포하는 경험이 성장에 가장 도움이 된다고 믿습니다.

무엇보다 개발이 즐거워야 오래 할 수 있다고 생각해요. 막힐 때도 '이걸 해결하면 어떻게 될까?' 하는 설렘을 잃지 않으려고 합니다.`,
      showInHome: true,
    },
    {
      id: 'personal',
      title: '개인적인 이야기',
      icon: 'person',
      content: `개발 외에는 카페 탐방을 좋아합니다. 새로운 카페에 앉아 노트북을 펼치고 코딩하는 시간이 가장 집중이 잘 돼요.

UI/UX 디자인에도 관심이 많아서, 잘 만들어진 앱을 보면 "이 버튼은 왜 여기 있을까?", "이 색깔은 왜 이걸 선택했을까?" 하며 분석하는 버릇이 생겼습니다.

언젠가는 사람들이 "이 앱, 정말 쓰기 편하다"고 자연스럽게 느끼는 서비스를 만드는 것이 목표입니다. 작은 디테일 하나가 사용자 경험을 크게 바꿀 수 있다고 믿기 때문에, 그런 디테일을 사랑하는 개발자가 되고 싶어요.`,
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
