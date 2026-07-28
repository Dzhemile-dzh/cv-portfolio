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
import { NotFoundPage } from './components/NotFoundPage';
import { ChatWidget } from './components/ChatWidget';

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eef6f3]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-[3px] border-[#141414] border-t-[#ff4d3a] animate-spin" />
        <p className="font-mono text-sm font-bold bg-[#f5c518] border-2 border-[#141414] px-3 py-1">
          Loading opinions...
        </p>
      </div>
    </div>
  );
}

function normalizePath(pathname: string): string {
  const cleaned = pathname.replace(/\/+$/, '');
  return cleaned === '' ? '/' : cleaned;
}

function HomePage() {
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
      <ChatWidget data={data} />
    </>
  );
}

export default function App() {
  const path = normalizePath(window.location.pathname);

  if (path !== '/' && path !== '/index.html') {
    return <NotFoundPage />;
  }

  return <HomePage />;
}
