import { memo, useState } from 'react';
import {
  Box, Typography, Button, TextField, MenuItem, Select, Slider, IconButton, Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { CATEGORY_ORDER, categoryColors } from '../../theme/skillCategories';
import { SKILL_ICON_OPTIONS, skillIconMap } from '../../theme/skillIcons';

const DEFAULT_FORM = { name: '', category: 'Frontend', level: 50, icon: 'code' };

/**
 * AddSkillForm 컴포넌트 — "스킬 추가" 버튼과 인라인 입력 폼을 함께 제공한다.
 *
 * Props:
 * @param {function} onAdd - 새 스킬 제출 시 호출 (skill: { name, category, level, icon }) [Required]
 * @param {string[]} existingNames - 중복 검사에 사용할 기존 스킬 이름 목록 [Optional, 기본값: []]
 *
 * Example usage:
 * <AddSkillForm onAdd={addSkill} existingNames={skills.map((s) => s.name)} />
 */
function AddSkillForm({ onAdd, existingNames = [] }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(DEFAULT_FORM);
  const [error, setError] = useState('');

  const handleOpen = () => setOpen(true);
  const handleCancel = () => {
    setOpen(false);
    setForm(DEFAULT_FORM);
    setError('');
  };

  const handleNameChange = (e) => {
    setForm((prev) => ({ ...prev, name: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = () => {
    const name = form.name.trim();
    if (!name) {
      setError('기술 이름을 입력해 주세요.');
      return;
    }
    const isDuplicate = existingNames.some((existing) => existing.toLowerCase() === name.toLowerCase());
    if (isDuplicate) {
      setError('이미 등록된 스킬이에요.');
      return;
    }
    onAdd({ ...form, name });
    handleCancel();
  };

  if (!open) {
    return (
      <Button
        startIcon={<AddIcon />}
        onClick={handleOpen}
        sx={{
          color: 'var(--color-primary-light)',
          border: '1px dashed var(--accent-border)',
          borderRadius: 2,
          px: 2,
          '&:hover': { borderColor: 'var(--color-primary-light)', background: 'var(--chip-bg-hover)' },
        }}
      >
        스킬 추가
      </Button>
    );
  }

  return (
    <Box
      role="form"
      aria-label="새 스킬 추가"
      sx={{
        background: 'var(--surface-card-strong)',
        border: '1px solid var(--color-border)',
        borderRadius: 2,
        p: 2.5,
        animation: 'formIn 0.25s ease',
        '@keyframes formIn': {
          from: { opacity: 0, transform: 'translateY(-4px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: error ? 0.75 : 2 }}>
        <TextField
          value={form.name}
          onChange={handleNameChange}
          placeholder="기술 이름 (예: TypeScript)"
          size="small"
          fullWidth
          autoFocus
          aria-label="기술 이름"
          error={Boolean(error)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          sx={{
            '& .MuiOutlinedInput-root': {
              color: 'var(--color-text-primary)',
              background: 'var(--surface-panel)',
              '& fieldset': { borderColor: 'var(--color-border)' },
              '&:hover fieldset': { borderColor: 'var(--color-primary-light)' },
              '&.Mui-focused fieldset': { borderColor: 'var(--color-primary-light)' },
            },
          }}
        />
        <Select
          value={form.category}
          onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
          size="small"
          aria-label="카테고리 선택"
          sx={{
            minWidth: 140,
            color: 'var(--color-text-primary)',
            background: 'var(--surface-panel)',
            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--color-border)' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--color-primary-light)' },
          }}
        >
          {CATEGORY_ORDER.map((category) => (
            <MenuItem key={category} value={category} sx={{ color: categoryColors[category] }}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {error && (
        <Typography role="alert" sx={{ color: '#EF4444', fontSize: '0.75rem', mb: 2 }}>
          {error}
        </Typography>
      )}

      <Typography sx={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', mb: 1 }}>아이콘 선택</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 2 }}>
        {SKILL_ICON_OPTIONS.map(({ key, label }) => {
          const OptionIcon = skillIconMap[key];
          const selected = form.icon === key;
          return (
            <Tooltip key={key} title={label} arrow>
              <IconButton
                onClick={() => setForm((prev) => ({ ...prev, icon: key }))}
                aria-label={`아이콘: ${label}`}
                aria-pressed={selected}
                sx={{
                  border: `1px solid ${selected ? 'var(--color-primary-light)' : 'var(--color-border)'}`,
                  background: selected ? 'var(--chip-bg-stronger)' : 'transparent',
                  borderRadius: 1.5,
                }}
              >
                <OptionIcon sx={{ fontSize: 18, color: selected ? 'var(--color-primary-light)' : 'var(--color-text-muted)' }} />
              </IconButton>
            </Tooltip>
          );
        })}
      </Box>

      <Typography id="add-skill-level-label" sx={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', mb: 0.5 }}>
        숙련도: {form.level}%
      </Typography>
      <Slider
        value={form.level}
        onChange={(_, value) => setForm((prev) => ({ ...prev, level: value }))}
        size="small"
        aria-labelledby="add-skill-level-label"
        sx={{ color: 'var(--color-primary-light)', mb: 2 }}
      />

      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
        <Button
          startIcon={<CloseIcon />}
          onClick={handleCancel}
          sx={{ color: 'var(--color-text-muted)' }}
        >
          취소
        </Button>
        <Button
          startIcon={<CheckIcon />}
          onClick={handleSubmit}
          variant="contained"
          sx={{
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
            '&:hover': { background: 'linear-gradient(135deg, var(--color-primary-light), var(--color-accent))' },
          }}
        >
          추가
        </Button>
      </Box>
    </Box>
  );
}

export default memo(AddSkillForm);
