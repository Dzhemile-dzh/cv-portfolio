import type { PortfolioData, SeoMeta } from '../types';

const API_BASE = import.meta.env.VITE_API_URL ?? '';

async function fetchJson<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`);
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export function fetchPortfolio(): Promise<PortfolioData> {
  return fetchJson<PortfolioData>('/api/all');
}

export function fetchSeoMeta(): Promise<SeoMeta> {
  return fetchJson<SeoMeta>('/api/seo/meta');
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
    about: 'Experienced full-stack software engineer with over 5 years of experience in web development, specializing in PHP frameworks, JavaScript, and databases.',
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
  canonical: 'https://dzhemileahmed.dev',
  og: {
    type: 'website',
    title: 'Dzhemile Ahmed - Full-Stack Web Developer',
    description: 'Experienced full-stack software engineer specializing in PHP, React, Drupal, and data science.',
    url: 'https://dzhemileahmed.dev',
    site_name: 'Dzhemile Ahmed Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dzhemile Ahmed - Full-Stack Web Developer',
    description: 'Experienced full-stack software engineer specializing in PHP, React, Drupal, and data science.',
  },
  jsonLd: {},
};
