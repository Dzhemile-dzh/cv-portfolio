import type { PortfolioData } from '../types';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

function normalize(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9+#.\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function includesAny(haystack: string, needles: string[]): boolean {
  return needles.some((needle) => haystack.includes(needle));
}

function flattenSkills(data: PortfolioData): string[] {
  return Object.values(data.skills).flat();
}

function findSkill(data: PortfolioData, query: string): string | null {
  const q = normalize(query);
  const skills = flattenSkills(data);

  for (const skill of skills) {
    const s = normalize(skill);
    if (q.includes(s) || s.includes(q)) {
      return skill;
    }
  }

  const aliases: Record<string, string[]> = {
    php: ['php', 'phalcon', 'yii', 'yii2', 'symfony', 'drupal', 'latte', 'twig', 'smarty'],
    react: ['react', 'jsx'],
    javascript: ['javascript', 'js', 'ecmascript'],
    mysql: ['mysql', 'sql', 'database', 'databases'],
    python: ['python', 'django'],
    docker: ['docker', 'container'],
    tableau: ['tableau', 'data viz', 'visualization'],
    drupal: ['drupal', 'cms'],
    git: ['git', 'gitlab', 'github', 'azure devops', 'tfs'],
  };

  for (const [canonical, words] of Object.entries(aliases)) {
    if (includesAny(q, words)) {
      const match = skills.find((skill) => normalize(skill).includes(canonical));
      if (match !== undefined) {
        return match;
      }
      return canonical.toUpperCase() === canonical ? canonical : canonical.charAt(0).toUpperCase() + canonical.slice(1);
    }
  }

  return null;
}

function jobsUsingSkill(data: PortfolioData, skillHint: string): string[] {
  const hint = normalize(skillHint);
  return data.experience
    .filter((job) => job.technologies.some((tech) => normalize(tech).includes(hint) || hint.includes(normalize(tech))))
    .map((job) => `${job.role} at ${job.company} (${job.period})`);
}

export function buildCvContext(data: PortfolioData): string {
  const skills = Object.entries(data.skills)
    .map(([category, items]) => `${category}: ${items.join(', ')}`)
    .join('\n');

  const experience = data.experience
    .map((job) => `${job.period} | ${job.role} @ ${job.company} (${job.type})\n- ${job.highlights.join('\n- ')}\nTech: ${job.technologies.join(', ')}`)
    .join('\n\n');

  const projects = data.projects
    .map((project) => `${project.title}: ${project.description} Tech: ${project.technologies.join(', ')}`)
    .join('\n');

  const education = data.education
    .map((item) => `${item.period} | ${item.degree} - ${item.institution}`)
    .join('\n');

  const certifications = data.certifications
    .map((item) => `${item.name} (${item.issuer})`)
    .join(', ');

  return [
    `Name: ${data.profile.name}`,
    `Title: ${data.profile.title}`,
    `Location: ${data.profile.location}`,
    `Email: ${data.profile.email}`,
    `Phone: ${data.profile.phone}`,
    `About: ${data.profile.about}`,
    `Spoken languages: ${data.profile.languages.map((l) => `${l.name} (${l.level})`).join(', ')}`,
    `Hobbies: ${data.profile.hobbies.join(', ')}`,
    `Teaching: ${data.teaching.role} for ${data.teaching.audience}. ${data.teaching.description}`,
    `Skills:\n${skills}`,
    `Experience:\n${experience}`,
    `Projects:\n${projects}`,
    `Education:\n${education}`,
    `Certifications: ${certifications}`,
  ].join('\n\n');
}

export function answerFromCv(question: string, data: PortfolioData): string {
  const q = normalize(question);
  const name = data.profile.name.split(' ')[0];

  if (q.length < 2) {
    return `Ask me anything about ${name}'s experience, skills, or background.`;
  }

  if (includesAny(q, ['hello', 'hi ', 'hey', 'good morning', 'good evening'])) {
    return `Hey. I know ${name}'s CV inside out. Ask about PHP, React, her jobs, teaching, or anything else on her profile.`;
  }

  if (includesAny(q, ['contact', 'email', 'phone', 'reach', 'hire', 'available'])) {
    return `Yes - you can reach ${name} at ${data.profile.email} or ${data.profile.phone}. She is based in ${data.profile.location} and open to full-stack / backend opportunities.`;
  }

  if (includesAny(q, ['where', 'location', 'live', 'based', 'city', 'country', 'bulgaria', 'varna'])) {
    return `${name} is based in ${data.profile.location}.`;
  }

  if (includesAny(q, ['year', 'experience', 'how long', 'senior', 'junior'])) {
    return `She has over 7 years of professional experience in web development, with deep focus on PHP, JavaScript, databases, and full-stack delivery.`;
  }

  if (includesAny(q, ['teach', 'teaching', 'kids', 'children', 'roblox', 'minecraft', 'instructor'])) {
    return `Yes. ${name} teaches programming to children in grades 2-4 using Roblox Studio and Minecraft Education Edition. Role: ${data.teaching.role}.`;
  }

  if (includesAny(q, ['current job', 'now', 'present', 'vero', 'working at', 'employer'])) {
    const current = data.experience[0];
    return `Right now she works at ${current.company} as ${current.role} (${current.period}). Focus: ${current.highlights[0]}`;
  }

  if (includesAny(q, ['previous', 'indeavr', 'history', 'worked', 'companies', 'jobs', 'experience list'])) {
    const summary = data.experience
      .slice(0, 4)
      .map((job) => `${job.company} (${job.period}) - ${job.role}`)
      .join('; ');
    return `Recent roles: ${summary}. PHP has been a constant through most of her career.`;
  }

  if (includesAny(q, ['education', 'university', 'degree', 'study', 'studied', 'school'])) {
    const edu = data.education.map((item) => `${item.degree} at ${item.institution} (${item.period})`).join('; ');
    return `Education: ${edu}.`;
  }

  if (includesAny(q, ['certif', 'course', 'badge', 'cs50', 'ibm', 'softuni', 'tableau course'])) {
    const top = data.certifications.slice(0, 5).map((c) => c.name).join(', ');
    return `She has certifications including: ${top}, and more listed on the site.`;
  }

  if (includesAny(q, ['project', 'portfolio', 'built', 'printout', 'tableau dashboard'])) {
    const featured = data.projects.filter((p) => p.featured).slice(0, 3);
    const lines = featured.map((p) => `${p.title}: ${p.description}`).join(' ');
    return `A few highlights: ${lines}`;
  }

  if (includesAny(q, ['language', 'speak', 'bulgarian', 'turkish', 'english'])) {
    return `Spoken languages: ${data.profile.languages.map((l) => `${l.name} (${l.level})`).join(', ')}.`;
  }

  if (includesAny(q, ['hobby', 'hobbies', 'free time', 'paint', 'chess'])) {
    return `Outside work she likes ${data.profile.hobbies.join(' and ')}.`;
  }

  if (includesAny(q, ['who is', 'about her', 'about dzhemile', 'summar', 'introduce', 'profile'])) {
    return data.profile.about;
  }

  const skill = findSkill(data, q);
  if (skill !== null) {
    const knowsQuestion = includesAny(q, ['know', 'expert', 'experience', 'use', 'work with', 'familiar', 'can she', 'does she', 'is she', 'skill']);
    const jobs = jobsUsingSkill(data, skill);
    const skillLower = normalize(skill);

    if (includesAny(skillLower, ['php'])) {
      return `Yes - PHP is one of her strongest skills. She has used it across multiple roles (Phalcon, YII2, Drupal, and currently PHP 8.5 at Vero Digital Solutions). She is effectively an expert PHP backend developer.`;
    }

    if (includesAny(skillLower, ['react'])) {
      return `Yes. She has professional React experience, including frontend work at Mobile Wave Solutions, plus React coursework. She is comfortable building modern React UIs.`;
    }

    if (includesAny(skillLower, ['drupal'])) {
      return `Yes. At INDEAVR she worked as a Backend Web Developer with PHP/Drupal, building modules and themes, with Pantheon and SonarCloud in the workflow.`;
    }

    if (includesAny(skillLower, ['tableau'])) {
      return `Yes. She uses Tableau for data visualization, has a Tableau certification, and publishes work on Tableau Public.`;
    }

    if (knowsQuestion || jobs.length > 0) {
      const jobBit = jobs.length > 0 ? ` She used it in roles like: ${jobs.slice(0, 2).join('; ')}.` : '';
      return `Yes - ${name} knows ${skill}.${jobBit} It is part of her professional toolkit.`;
    }
  }

  if (includesAny(q, ['php', 'backend', 'fullstack', 'full stack', 'frontend', 'front end', 'data science'])) {
    if (q.includes('php')) {
      return `Yes - she is an expert in PHP. Over 7 years of web development with frameworks like Phalcon, YII2, Drupal, and PHP 8.5 in production.`;
    }
    if (includesAny(q, ['backend'])) {
      return `Yes. Backend is her strongest area: PHP APIs, databases, CMS work, testing, and clean architecture.`;
    }
    if (includesAny(q, ['fullstack', 'full stack'])) {
      return `Yes. She works as a Full-Stack Web Developer - strong backend PHP plus React/JavaScript on the frontend.`;
    }
    if (includesAny(q, ['frontend', 'front end'])) {
      return `Yes. She has frontend experience with React, JavaScript, CSS/SASS, Twig/Latte templates, and Bootstrap.`;
    }
    if (includesAny(q, ['data science', 'machine learning', 'ml'])) {
      return `She is a data science enthusiast with Tableau, SQL analytics, Python coursework, and related certifications. She is actively growing in that direction.`;
    }
  }

  const allSkills = flattenSkills(data).slice(0, 12).join(', ');
  return `I could not match that exactly, but here is what I know: ${name} is a ${data.profile.title} in ${data.profile.location} with 7+ years experience. Core skills include ${allSkills}. Try asking about PHP, React, her current job, teaching, or education.`;
}

export async function askAboutCv(question: string, data: PortfolioData): Promise<string> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question,
        context: buildCvContext(data),
      }),
    });

    if (response.ok) {
      const payload = (await response.json()) as { answer?: string };
      if (payload.answer !== undefined && payload.answer.trim() !== '') {
        return payload.answer.trim();
      }
    }
  } catch {
    // Fall back to local CV engine when serverless AI is unavailable.
  }

  return answerFromCv(question, data);
}
