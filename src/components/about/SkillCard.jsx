import { memo } from 'react';
import { Box, Typography, Chip, LinearProgress, Slider, Tooltip, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CodeIcon from '@mui/icons-material/Code';
import { categoryColors } from '../../theme/skillCategories';
import { skillIconMap } from '../../theme/skillIcons';
import { useInView } from '../../hooks/useInView';
import { useCountUp } from '../../hooks/useCountUp';

/**
 * SkillCard 컴포넌트 — 개별 스킬 하나를 아이콘·숙련도 바·툴팁과 함께 보여주고 편집한다.
 *
 * Props:
 * @param {object} skill - 스킬 데이터 { id, icon, name, level, category, desc, isMainSkill } [Required]
 * @param {function} onLevelChange - 레벨 변경 시 호출 (skillId, level) [Required]
 * @param {function} onToggleMain - 메인 스킬 표시 토글 시 호출 (skillId) [Required]
 *
 * Example usage:
 * <SkillCard skill={skill} onLevelChange={updateSkillLevel} onToggleMain={toggleSkillMain} />
 */
function SkillCard({ skill, onLevelChange, onToggleMain }) {
  const color = categoryColors[skill.category] ?? '#4D8FFF';
  const Icon = skillIconMap[skill.icon] ?? CodeIcon;

  // 카드가 뷰포트에 들어오면 프로그레스 바 채움 + 숫자 카운팅을 동시에 시작
  const [inViewRef, inView] = useInView({ threshold: 0.3 });
  const animatedLevel = useCountUp(skill.level, { active: inView, duration: 1000 });

  return (
    <Box
      ref={inViewRef}
      role="group"
      aria-label={`${skill.name} 스킬, 숙련도 ${skill.level}%`}
      sx={{
        background: 'var(--surface-card)',
        border: '1px solid var(--color-border)',
        borderRadius: 2,
        p: 2.5,
        height: '100%',
        transition: 'border-color 0.2s, transform 0.2s',
        animation: 'skillCardIn 0.35s ease',
        '@keyframes skillCardIn': {
          from: { opacity: 0, transform: 'translateY(6px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        '&:hover': { borderColor: color },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1.5 }}>
        <Tooltip title={skill.desc || skill.name} arrow placement="top">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0, cursor: 'default' }} tabIndex={0}>
            <Icon sx={{ color, fontSize: 22, flexShrink: 0 }} />
            <Typography sx={{ color: 'var(--color-text-primary)', fontWeight: 600, fontSize: '0.95rem' }} noWrap>
              {skill.name}
            </Typography>
          </Box>
        </Tooltip>
        <Tooltip title={skill.isMainSkill ? '홈 탭 메인 스킬로 노출 중' : '홈 탭에는 노출되지 않음'} arrow>
          <IconButton
            size="small"
            onClick={() => onToggleMain(skill.id)}
            aria-label={skill.isMainSkill ? `${skill.name}을(를) 메인 스킬에서 제외` : `${skill.name}을(를) 메인 스킬로 지정`}
            aria-pressed={skill.isMainSkill}
            sx={{ p: 0.25, flexShrink: 0 }}
          >
            {skill.isMainSkill ? (
              <StarIcon sx={{ fontSize: 18, color: '#F5B841' }} />
            ) : (
              <StarBorderIcon sx={{ fontSize: 18, color: 'var(--color-text-muted)' }} />
            )}
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.75 }}>
        <Chip
          label={skill.category}
          size="small"
          sx={{
            height: 20,
            fontSize: '0.68rem',
            background: `${color}20`,
            color,
            border: `1px solid ${color}40`,
          }}
        />
        <Typography sx={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', fontWeight: 600 }}>
          {Math.round(animatedLevel)}%
        </Typography>
      </Box>

      <LinearProgress
        variant="determinate"
        value={inView ? skill.level : 0}
        aria-hidden="true"
        sx={{
          height: 5,
          borderRadius: 3,
          background: 'var(--color-border)',
          mb: 1.5,
          transition: 'all 0.2s',
          '& .MuiLinearProgress-bar': {
            background: `linear-gradient(90deg, ${color}, ${color}99)`,
            borderRadius: 3,
            transition: 'transform 0.6s ease-out',
          },
        }}
      />

      <Slider
        value={skill.level}
        onChange={(_, value) => onLevelChange(skill.id, value)}
        size="small"
        aria-label={`${skill.name} 숙련도 조정`}
        valueLabelDisplay="auto"
        sx={{
          color,
          height: 4,
          '& .MuiSlider-thumb': {
            width: 12,
            height: 12,
            '&:hover, &.Mui-focusVisible': { boxShadow: `0 0 0 7px ${color}30` },
          },
          '& .MuiSlider-rail': { background: 'var(--color-border)', opacity: 1 },
        }}
      />
    </Box>
  );
}

export default memo(SkillCard);
