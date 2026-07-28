export interface Social {
  name: string;
  url: string;
  icon: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface Profile {
  name: string;
  title: string;
  subtitle: string;
  email: string;
  phone: string;
  location: string;
  photo: string;
  about: string;
  socials: Social[];
  languages: Language[];
  hobbies: string[];
}

export interface Experience {
  company: string;
  type: string;
  role: string;
  period: string;
  highlights: string[];
  technologies: string[];
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: string;
  links: ProjectLink[];
  featured: boolean;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
}

export interface Certification {
  name: string;
  issuer: string;
  url: string;
}

export interface Teaching {
  role: string;
  audience: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface PortfolioData {
  profile: Profile;
  experience: Experience[];
  projects: Project[];
  skills: Record<string, string[]>;
  education: Education[];
  certifications: Certification[];
  teaching: Teaching;
}

export interface SeoMeta {
  title: string;
  description: string;
  keywords: string;
  author: string;
  canonical: string;
  image?: string;
  og: {
    type: string;
    title: string;
    description: string;
    url: string;
    site_name: string;
    image?: string;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
  };
  jsonLd: Record<string, unknown>;
}
