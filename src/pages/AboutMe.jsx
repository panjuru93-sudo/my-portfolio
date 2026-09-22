import { memo, useCallback, useMemo, useRef, useState } from 'react';
import {
  Box, Typography, Chip, Avatar, Grid, Tabs, Tab, Fade,
  Divider, TextField, IconButton, Snackbar, Alert,
} from '@mui/material';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined';
import CodeIcon from '@mui/icons-material/Code';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { usePortfolio } from '../hooks/usePortfolio';
import { categoryColors, categoryIcons, CATEGORY_ORDER } from '../theme/skillCategories';
import SkillCard from '../components/about/SkillCard';
import AddSkillForm from '../components/about/AddSkillForm';
import CustomSpinner from '../components/common/CustomSpinner';

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
  if (value !== index) return null;
  return (
    <Fade in timeout={250}>
      <Box role="tabpanel" id={`about-tabpanel-${index}`} aria-labelledby={`about-tab-${index}`} sx={{ pt: 4 }}>
        {children}
      </Box>
    </Fade>
  );
}

// ── 프로필 사진 업로드 ────────────────────────────────────
function PhotoUploader({ photo, onChange, onError }) {
  const inputRef = useRef();
  const [isUploading, setIsUploading] = useState(false);

  const handleClick = () => inputRef.current?.click();
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      onChange(ev.target.result);
      setIsUploading(false);
    };
    reader.onerror = () => {
      setIsUploading(false);
      onError?.('사진을 불러오지 못했습니다. 다른 파일로 시도해 주세요.');
    };
    reader.readAsDataURL(file);
  };

  return (
    <Box
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="프로필 사진 업로드"
      sx={{
        width: { xs: 100, sm: 120 },
        height: { xs: 100, sm: 120 },
        borderRadius: '50%',
        border: '2px dashed var(--accent-border)',
        cursor: 'pointer',
        overflow: 'hidden',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--grid-line)',
        transition: 'border-color 0.2s, background 0.2s',
        '&:hover, &:focus-visible': {
          borderColor: 'var(--color-primary-light)',
          background: 'var(--chip-bg-strong)',
          outline: 'none',
        },
      }}
    >
      {isUploading ? (
        <CustomSpinner size={28} />
      ) : photo ? (
        <Avatar
          src={photo}
          slotProps={{ img: { loading: 'lazy', alt: '프로필 사진' } }}
          sx={{ width: '100%', height: '100%' }}
        />
      ) : (
        <Box sx={{ textAlign: 'center' }}>
          <CameraAltOutlinedIcon sx={{ color: 'var(--color-primary-light)', fontSize: 28, mb: 0.5 }} />
          <Typography sx={{ color: 'var(--color-text-muted)', fontSize: '0.65rem', lineHeight: 1.3 }}>
            사진 추가
          </Typography>
        </Box>
      )}
      <input ref={inputRef} type="file" accept="image/*" hidden onChange={handleFile} tabIndex={-1} />
    </Box>
  );
}

const MemoPhotoUploader = memo(PhotoUploader);

// ── 메인 컴포넌트 ─────────────────────────────────────────
export default function AboutMe() {
  const {
    aboutMeData, updateBasicInfo, updateSectionContent,
    updateSkillLevel, toggleSkillMain, addSkill,
  } = usePortfolio();
  const { basicInfo, sections, skills } = aboutMeData;

  const [tabIndex, setTabIndex] = useState(0);
  const [editingSectionId, setEditingSectionId] = useState(null);
  const [draftContent, setDraftContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const skillsTabIndex = sections.length;

  const showSnackbar = useCallback((message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const closeSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  const updatePhoto = useCallback((photoDataUrl) => {
    updateBasicInfo({ photo: photoDataUrl });
    showSnackbar('사진이 변경되었습니다.');
  }, [updateBasicInfo, showSnackbar]);

  const handlePhotoError = useCallback((message) => {
    showSnackbar(message, 'error');
  }, [showSnackbar]);

  const startEditing = useCallback((section) => {
    setEditingSectionId(section.id);
    setDraftContent(section.content);
  }, []);

  const saveEditing = useCallback(() => {
    setIsSaving(true);
    window.setTimeout(() => {
      updateSectionContent(editingSectionId, draftContent);
      setIsSaving(false);
      setEditingSectionId(null);
      showSnackbar('저장되었습니다.');
    }, 300);
  }, [editingSectionId, draftContent, updateSectionContent, showSnackbar]);

  const cancelEditing = useCallback(() => setEditingSectionId(null), []);

  const handleAddSkill = useCallback((skill) => {
    addSkill(skill);
    showSnackbar(`${skill.name} 스킬이 추가되었습니다.`);
  }, [addSkill, showSnackbar]);

  const existingSkillNames = useMemo(() => skills.map((skill) => skill.name), [skills]);

  const groupedSkills = useMemo(() => {
    const map = new Map();
    skills.forEach((skill) => {
      if (!map.has(skill.category)) map.set(skill.category, []);
      map.get(skill.category).push(skill);
    });
    return map;
  }, [skills]);

  const visibleCategories = useMemo(
    () => CATEGORY_ORDER.filter((category) => groupedSkills.has(category)),
    [groupedSkills],
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'var(--color-bg-secondary)',
        pt: '80px',
        px: { xs: 2, sm: 3 },
        py: 10,
      }}
    >
      <Box sx={{ maxWidth: 860, mx: 'auto' }}>

        {/* ── 헤더 ── */}
        <Box sx={{ mb: 6 }}>
          <Chip
            icon={<PersonOutlinedIcon sx={{ fontSize: 16, color: 'var(--color-primary-light) !important' }} />}
            label="소개"
            size="small"
            sx={{
              mb: 3,
              background: 'var(--chip-bg)',
              border: '1px solid var(--chip-border)',
              color: 'var(--color-primary-light)',
              fontWeight: 600,
            }}
          />
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.2rem', md: '3rem' },
              fontWeight: 800,
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.03em',
            }}
          >
            소개
          </Typography>
        </Box>

        {/* ── 기본 정보 카드 ── */}
        <Box
          sx={{
            background: 'var(--surface-card-strong)',
            border: '1px solid var(--color-border)',
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
            <MemoPhotoUploader photo={basicInfo.photo} onChange={updatePhoto} onError={handlePhotoError} />

            {/* 기본 정보 그리드 */}
            <Grid container spacing={2} sx={{ flex: 1 }}>
              {INFO_ITEMS.map(({ key, label, icon }) => (
                <Grid size={{ xs: 12, sm: 6 }} key={key}>
                  <Box
                    sx={{
                      background: 'var(--surface-panel-strong)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 2,
                      p: 2,
                      height: '100%',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.75 }}>
                      <Box sx={{ color: 'var(--color-primary-light)' }}>{icon}</Box>
                      <Typography sx={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.06em' }}>
                        {label.toUpperCase()}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        color: basicInfo[key] ? 'var(--color-text-primary)' : 'var(--color-placeholder)',
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 3, pt: 3, borderTop: '1px solid var(--color-border)' }}>
            <Typography sx={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', mr: 0.5 }}>홈 탭 노출:</Typography>
            {sections.filter((s) => s.showInHome).map((s) => (
              <Chip
                key={s.id}
                label={s.title}
                size="small"
                sx={{
                  background: 'var(--chip-bg-strong)',
                  color: 'var(--color-primary-light)',
                  border: '1px solid var(--chip-border)',
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
            background: 'var(--surface-card-strong)',
            border: '1px solid var(--color-border)',
            borderRadius: 3,
            p: { xs: 3, sm: 4 },
          }}
        >
          <Tabs
            value={tabIndex}
            onChange={(_, v) => setTabIndex(v)}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="About Me 섹션 탭"
            sx={{
              '& .MuiTabs-indicator': { background: 'var(--color-primary)', height: 2 },
              '& .MuiTab-root': {
                color: 'var(--color-text-muted)',
                fontWeight: 600,
                fontSize: { xs: '0.8rem', sm: '0.875rem' },
                minHeight: 48,
                textTransform: 'none',
                '&.Mui-selected': { color: 'var(--color-primary-light)' },
              },
              borderBottom: '1px solid var(--color-border)',
            }}
          >
            {sections.map((section, i) => (
              <Tab
                key={section.id}
                id={`about-tab-${i}`}
                aria-controls={`about-tabpanel-${i}`}
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
                          background: 'var(--muted-chip-bg-strong)',
                          color: 'var(--color-text-muted)',
                          ml: 0.5,
                        }}
                      />
                    )}
                  </Box>
                }
                value={i}
              />
            ))}
            <Tab
              key="skills"
              id={`about-tab-${skillsTabIndex}`}
              aria-controls={`about-tabpanel-${skillsTabIndex}`}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <CodeIcon sx={{ fontSize: 18 }} />
                  <span>기술 스킬</span>
                </Box>
              }
              value={skillsTabIndex}
            />
          </Tabs>

          {sections.map((section, i) => (
            <TabPanel key={section.id} value={tabIndex} index={i}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <Box sx={{ color: 'var(--color-primary-light)' }}>{SECTION_ICON[section.icon]}</Box>
                <Typography sx={{ color: 'var(--color-text-primary)', fontWeight: 700, fontSize: '1.1rem', flex: 1 }}>
                  {section.title}
                </Typography>
                <Chip
                  label={section.showInHome ? '홈 노출' : '홈 미노출'}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: '0.68rem',
                    background: section.showInHome ? 'var(--chip-bg-strong)' : 'var(--muted-chip-bg)',
                    color: section.showInHome ? 'var(--color-primary-light)' : 'var(--color-text-muted)',
                    border: `1px solid ${section.showInHome ? 'var(--chip-border)' : 'var(--muted-chip-bg-strong)'}`,
                  }}
                />
                {editingSectionId === section.id ? (
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <IconButton
                      size="small"
                      onClick={saveEditing}
                      disabled={isSaving}
                      aria-label="저장"
                      sx={{ color: '#4CAF50' }}
                    >
                      {isSaving ? <CustomSpinner size={16} color="#4CAF50" /> : <CheckIcon fontSize="small" />}
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={cancelEditing}
                      disabled={isSaving}
                      aria-label="편집 취소"
                      sx={{ color: 'var(--color-text-muted)' }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ) : (
                  <IconButton
                    size="small"
                    onClick={() => startEditing(section)}
                    aria-label={`${section.title} 내용 수정`}
                    sx={{ color: 'var(--color-primary-light)' }}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>

              <Divider sx={{ borderColor: 'var(--color-border)', mb: 3 }} />

              {editingSectionId === section.id ? (
                <TextField
                  value={draftContent}
                  onChange={(e) => setDraftContent(e.target.value)}
                  multiline
                  minRows={4}
                  fullWidth
                  autoFocus
                  disabled={isSaving}
                  aria-label={`${section.title} 내용 편집`}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: 'var(--color-text-secondary)',
                      fontSize: '0.97rem',
                      lineHeight: 2,
                      background: 'var(--surface-panel-soft)',
                      '& fieldset': { borderColor: 'var(--color-border)' },
                      '&:hover fieldset': { borderColor: 'var(--color-primary-light)' },
                      '&.Mui-focused fieldset': { borderColor: 'var(--color-primary-light)' },
                    },
                  }}
                />
              ) : section.content ? (
                <Typography
                  sx={{
                    color: 'var(--color-text-secondary)',
                    lineHeight: 2,
                    fontSize: '0.97rem',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {section.content}
                </Typography>
              ) : (
                <Box
                  onClick={() => startEditing(section)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && startEditing(section)}
                  aria-label={`${section.title} 내용 작성 시작`}
                  sx={{
                    textAlign: 'center',
                    py: 6,
                    cursor: 'pointer',
                    background: 'var(--surface-panel-soft)',
                    borderRadius: 2,
                    border: '1px dashed var(--accent-border-soft)',
                  }}
                >
                  <Typography sx={{ color: 'var(--color-placeholder)', fontSize: '2rem', mb: 1 }}>✏️</Typography>
                  <Typography sx={{ color: 'var(--color-placeholder)', fontSize: '0.9rem' }}>
                    아직 작성된 내용이 없어요. 클릭해서 작성해보세요.
                  </Typography>
                </Box>
              )}
            </TabPanel>
          ))}

          <TabPanel value={tabIndex} index={skillsTabIndex}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
              <CodeIcon sx={{ color: 'var(--color-primary-light)', fontSize: 18 }} />
              <Typography sx={{ color: 'var(--color-text-primary)', fontWeight: 700, fontSize: '1.1rem' }}>
                기술 스킬
              </Typography>
            </Box>
            <Typography sx={{ color: 'var(--color-text-muted)', fontSize: '0.78rem', mb: 3 }}>
              별표(★)로 표시한 스킬이 숙련도 순으로 홈 탭 상위 4개에 노출됩니다. 슬라이더로 레벨을 조정하면 바로 반영돼요.
            </Typography>

            <Divider sx={{ borderColor: 'var(--color-border)', mb: 3 }} />

            <Box sx={{ mb: 3 }}>
              <AddSkillForm onAdd={handleAddSkill} existingNames={existingSkillNames} />
            </Box>

            {visibleCategories.map((category) => {
              const CategoryIcon = categoryIcons[category] ?? CodeIcon;
              const categorySkills = groupedSkills.get(category);
              return (
                <Box key={category} sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <CategoryIcon sx={{ fontSize: 16, color: categoryColors[category] }} />
                    <Typography sx={{ color: categoryColors[category], fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.04em' }}>
                      {category.toUpperCase()}
                    </Typography>
                  </Box>
                  <Grid container spacing={2}>
                    {categorySkills.map((skill) => (
                      <Grid size={{ xs: 12, sm: 6, md: 4 }} key={skill.id}>
                        <SkillCard skill={skill} onLevelChange={updateSkillLevel} onToggleMain={toggleSkillMain} />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              );
            })}
          </TabPanel>
        </Box>

      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={closeSnackbar} severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
