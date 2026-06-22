import Hero from '../sections/Hero';
import AboutSection from '../sections/AboutSection';
import SkillTree from '../sections/SkillTree';
import ProjectsSection from '../sections/ProjectsSection';
import Contact from '../sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <SkillTree />
      <ProjectsSection />
      <Contact />
    </>
  );
}
