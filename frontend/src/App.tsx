import { useEffect, useState } from 'react';
import { fetchPortfolio, fetchSeoMeta, fallbackPortfolio, fallbackSeo } from './api/portfolio';
import type { PortfolioData, SeoMeta } from './types';
import { SeoHead } from './components/SeoHead';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { EducationSection } from './components/EducationSection';
import { TeachingSection } from './components/TeachingSection';
import { ContactSection, Footer } from './components/ContactSection';

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 font-mono text-sm">Loading portfolio...</p>
      </div>
    </div>
  );
}

function AppContent() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [seo, setSeo] = useState<SeoMeta>(fallbackSeo);

  useEffect(() => {
    Promise.all([
      fetchPortfolio().catch(() => fallbackPortfolio),
      fetchSeoMeta().catch(() => fallbackSeo),
    ]).then(([portfolio, seoMeta]) => {
      setData(portfolio);
      setSeo(seoMeta);
    });
  }, []);

  if (data === null) {
    return <LoadingScreen />;
  }

  return (
    <>
      <SeoHead meta={seo} />
      <Navbar />
      <main>
        <Hero profile={data.profile} />
        <About profile={data.profile} />
        {data.experience.length > 0 && <ExperienceSection experience={data.experience} />}
        {data.teaching !== undefined && Object.keys(data.teaching).length > 0 && (
          <TeachingSection teaching={data.teaching} />
        )}
        {data.projects.length > 0 && <ProjectsSection projects={data.projects} />}
        {Object.keys(data.skills).length > 0 && <SkillsSection skills={data.skills} />}
        {(data.education.length > 0 || data.certifications.length > 0) && (
          <EducationSection education={data.education} certifications={data.certifications} />
        )}
        <ContactSection profile={data.profile} />
      </main>
      <Footer name={data.profile.name} />
    </>
  );
}

export default function App() {
  return <AppContent />;
}
