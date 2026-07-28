import type { PortfolioData, SeoMeta } from '../types';

const API_BASE = import.meta.env.VITE_API_URL ?? '';

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

async function loadWithFallback<T>(primary: string, secondary: string): Promise<T> {
  try {
    return await fetchJson<T>(primary);
  } catch {
    return fetchJson<T>(secondary);
  }
}

export function fetchPortfolio(locale: 'en' | 'bg' = 'en'): Promise<PortfolioData> {
  const staticPath = locale === 'bg' ? '/data/portfolio.bg.json' : '/data/portfolio.json';
  if (locale === 'bg' || API_BASE === '') {
    return fetchJson<PortfolioData>(staticPath).catch(() =>
      fetchJson<PortfolioData>('/data/portfolio.json'),
    );
  }

  return loadWithFallback<PortfolioData>(`${API_BASE}/api/all`, staticPath);
}

export function fetchSeoMeta(locale: 'en' | 'bg' = 'en'): Promise<SeoMeta> {
  const staticPath = locale === 'bg' ? '/data/seo.bg.json' : '/data/seo.json';
  if (locale === 'bg' || API_BASE === '') {
    return fetchJson<SeoMeta>(staticPath).catch(() => fetchJson<SeoMeta>('/data/seo.json'));
  }

  return loadWithFallback<SeoMeta>(`${API_BASE}/api/seo/meta`, staticPath);
}

export const fallbackPortfolio: PortfolioData = {
  profile: {
    name: 'Dzhemile Ahmed',
    title: 'Full-Stack Web Developer',
    subtitle: 'Data Science Enthusiast',
    email: 'dzhemile.ahmet@gmail.com',
    phone: '(+359) 895627511',
    location: 'Varna, Bulgaria',
    photo: '/profile.png',
    about: 'Experienced full-stack software engineer with over 7 years of experience in web development, specializing in PHP frameworks, JavaScript, and databases.',
    socials: [
      { name: 'LinkedIn', url: 'https://www.linkedin.com/in/dzhemile-ahmed-42icdi/', icon: 'linkedin' },
      { name: 'GitHub', url: 'https://github.com/Dzhemile-dzh', icon: 'github' },
      { name: 'Tableau', url: 'https://public.tableau.com/app/profile/dzhemile.ahmed5149/vizzes', icon: 'tableau' },
    ],
    languages: [
      { name: 'Bulgarian', level: 'Native' },
      { name: 'English', level: 'B2' },
      { name: 'Turkish', level: 'C2' },
    ],
    hobbies: ['Oil Painting', 'Chess'],
  },
  experience: [],
  projects: [],
  skills: {},
  education: [],
  certifications: [],
  teaching: {
    role: 'Programming Instructor',
    audience: 'Children, Grades 2-4',
    description: 'Teaching programming fundamentals to young learners through Roblox and Minecraft Education.',
    highlights: [],
    technologies: ['Roblox Studio', 'Minecraft Education Edition'],
  },
};

export const fallbackSeo: SeoMeta = {
  title: 'Dzhemile Ahmed | Full-Stack Web Developer',
  description: 'Experienced full-stack software engineer specializing in PHP, React, Drupal, and data science.',
  keywords: 'Full-Stack Developer, PHP, React, Drupal, Varna',
  author: 'Dzhemile Ahmed',
  canonical: 'https://cv-portfolio-ten-beryl.vercel.app',
  og: {
    type: 'website',
    title: 'Dzhemile Ahmed - Full-Stack Web Developer',
    description: 'Experienced full-stack software engineer specializing in PHP, React, Drupal, and data science.',
    url: 'https://cv-portfolio-ten-beryl.vercel.app',
    site_name: 'Dzhemile Ahmed Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dzhemile Ahmed - Full-Stack Web Developer',
    description: 'Experienced full-stack software engineer specializing in PHP, React, Drupal, and data science.',
  },
  jsonLd: {},
};
