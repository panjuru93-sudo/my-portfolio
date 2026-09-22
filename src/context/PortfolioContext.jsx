import { useCallback, useMemo, useState } from 'react';
import { PortfolioContext } from './portfolioContextInstance';

const HOME_SUMMARY_LENGTH = 100;

const initialAboutMeData = {
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
      content: '수업 덕분에 개발을 시작하게 되었는데, 시스템적으로 어떻게 만들어지는지 알게 되니까 굉장히 신기하고 재미있었습니다.',
      showInHome: true,
    },
    {
      id: 'philosophy',
      title: '개발 철학',
      icon: 'favorite',
      content: '직관적으로 잘 보이고 눈에 잘 띄는지, 사람들에게 임팩트를 줄 수 있는 디자인으로도 훌륭한 개발을 하고 싶습니다.',
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
  skills: [
    { id: 1, icon: 'orange-diamond', name: 'HTML', level: 80, category: 'Frontend', desc: '시맨틱 마크업과 접근성을 고려한 구조 설계', isMainSkill: true },
    { id: 2, icon: 'palette', name: 'CSS', level: 75, category: 'Frontend', desc: 'Flexbox·Grid 기반 반응형 레이아웃 구성', isMainSkill: true },
    { id: 3, icon: 'zap', name: 'JavaScript', level: 70, category: 'Frontend', desc: 'ES6+ 문법과 비동기 처리 실전 활용', isMainSkill: true },
    { id: 4, icon: 'atom', name: 'React', level: 60, category: 'Framework', desc: 'Hooks·Router·Context 기반 컴포넌트 개발', isMainSkill: true },
    { id: 5, icon: 'target', name: 'Figma', level: 65, category: 'Design', desc: '와이어프레임 및 UI 시안 제작', isMainSkill: true },
  ],
};

/**
 * PortfolioProvider 컴포넌트
 *
 * Props:
 * @param {node} children - 하위 트리 [Required]
 *
 * Example usage:
 * <PortfolioProvider><App /></PortfolioProvider>
 */
export function PortfolioProvider({ children }) {
  const [aboutMeData, setAboutMeData] = useState(initialAboutMeData);

  const updateBasicInfo = useCallback((patch) => {
    setAboutMeData((prev) => ({
      ...prev,
      basicInfo: { ...prev.basicInfo, ...patch },
    }));
  }, []);

  const updateSectionContent = useCallback((sectionId, content) => {
    setAboutMeData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId ? { ...section, content } : section,
      ),
    }));
  }, []);

  const updateSkillLevel = useCallback((skillId, level) => {
    setAboutMeData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill) =>
        skill.id === skillId ? { ...skill, level } : skill,
      ),
    }));
  }, []);

  const toggleSkillMain = useCallback((skillId) => {
    setAboutMeData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill) =>
        skill.id === skillId ? { ...skill, isMainSkill: !skill.isMainSkill } : skill,
      ),
    }));
  }, []);

  const addSkill = useCallback((skill) => {
    setAboutMeData((prev) => ({
      ...prev,
      skills: [
        ...prev.skills,
        {
          id: prev.skills.reduce((maxId, s) => Math.max(maxId, s.id), 0) + 1,
          isMainSkill: true,
          ...skill,
        },
      ],
    }));
  }, []);

  // 숙련도 높은 순 정렬
  const getSortedSkills = useCallback(
    () => [...aboutMeData.skills].sort((a, b) => b.level - a.level),
    [aboutMeData],
  );

  // 메인 스킬 우선 + 숙련도 순 상위 N개 선택
  const getTopSkills = useCallback(
    (n = 4) => {
      const sorted = getSortedSkills();
      const main = sorted.filter((skill) => skill.isMainSkill);
      const rest = sorted.filter((skill) => !skill.isMainSkill);
      return [...main, ...rest].slice(0, n);
    },
    [getSortedSkills],
  );

  // 홈 탭용 데이터 자동 생성
  const getHomeData = useCallback(() => {
    const homeContent = aboutMeData.sections
      .filter((section) => section.showInHome)
      .map((section) => ({
        id: section.id,
        title: section.title,
        summary:
          section.content.length > HOME_SUMMARY_LENGTH
            ? `${section.content.slice(0, HOME_SUMMARY_LENGTH)}...`
            : section.content,
      }));

    return { content: homeContent, skills: getTopSkills(4), basicInfo: aboutMeData.basicInfo };
  }, [aboutMeData, getTopSkills]);

  const value = useMemo(
    () => ({
      aboutMeData,
      setAboutMeData,
      updateBasicInfo,
      updateSectionContent,
      updateSkillLevel,
      toggleSkillMain,
      addSkill,
      getSortedSkills,
      getTopSkills,
      getHomeData,
    }),
    [
      aboutMeData,
      updateBasicInfo,
      updateSectionContent,
      updateSkillLevel,
      toggleSkillMain,
      addSkill,
      getSortedSkills,
      getTopSkills,
      getHomeData,
    ],
  );

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}
