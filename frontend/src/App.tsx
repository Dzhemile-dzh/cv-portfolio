import { useEffect, useState } from 'react';
import { fetchPortfolio, fetchSeoMeta, fallbackPortfolio, fallbackSeo } from './api/portfolio';
import type { PortfolioData, SeoMeta } from './types';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
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
import { WeasleySection } from './components/WeasleySection';
import { NotFoundPage } from './components/NotFoundPage';
import { ChatWidget } from './components/ChatWidget';

function LoadingScreen() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eef6f3]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-[3px] border-[#141414] border-t-[#ff4d3a] animate-spin" />
        <p className="font-mono text-sm font-bold bg-[#f5c518] border-2 border-[#141414] px-3 py-1">
          {t.loading}
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
  const { locale, t } = useLanguage();
  const [data, setData] = useState<PortfolioData | null>(null);
  const [seo, setSeo] = useState<SeoMeta>(fallbackSeo);

  useEffect(() => {
    setData(null);
    Promise.all([
      fetchPortfolio(locale).catch(() => fallbackPortfolio),
      fetchSeoMeta(locale).catch(() => fallbackSeo),
    ]).then(([portfolio, seoMeta]) => {
      setData(portfolio);
      setSeo({
        ...seoMeta,
        title: t.seo.title,
        description: t.seo.description,
        og: {
          ...seoMeta.og,
          title: t.seo.title,
          description: t.seo.description,
        },
        twitter: {
          ...seoMeta.twitter,
          title: t.seo.title,
          description: t.seo.description,
        },
      });
    });
  }, [locale, t.seo.title, t.seo.description]);

  if (data === null) {
    return <LoadingScreen />;
  }

  return (
    <>
      <SeoHead meta={seo} locale={locale} />
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
        <WeasleySection />
        <ContactSection profile={data.profile} />
      </main>
      <Footer name={data.profile.name} />
      <ChatWidget data={data} />
    </>
  );
}

function AppRoutes() {
  const path = normalizePath(window.location.pathname);

  if (path !== '/' && path !== '/index.html') {
    return <NotFoundPage />;
  }

  return <HomePage />;
}

export default function App() {
  return (
    <LanguageProvider>
      <AppRoutes />
    </LanguageProvider>
  );
}
