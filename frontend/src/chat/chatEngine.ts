import type { PortfolioData } from '../types';
import type { Locale } from '../i18n/types';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}+#.\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
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
    mysql: ['mysql', 'sql', 'database', 'databases', 'база', 'бази'],
    python: ['python', 'django'],
    docker: ['docker', 'container', 'контейнер'],
    tableau: ['tableau', 'data viz', 'visualization', 'визуализац'],
    drupal: ['drupal', 'cms'],
    git: ['git', 'gitlab', 'github', 'azure devops', 'tfs'],
  };

  for (const [canonical, words] of Object.entries(aliases)) {
    if (includesAny(q, words)) {
      const match = skills.find((skill) => normalize(skill).includes(canonical));
      if (match !== undefined) {
        return match;
      }
      return canonical.charAt(0).toUpperCase() + canonical.slice(1);
    }
  }

  return null;
}

function jobsUsingSkill(data: PortfolioData, skillHint: string): string[] {
  const hint = normalize(skillHint);
  return data.experience
    .filter((job) =>
      job.technologies.some((tech) => normalize(tech).includes(hint) || hint.includes(normalize(tech))),
    )
    .map((job) => `${job.role} @ ${job.company} (${job.period})`);
}

export function buildCvContext(data: PortfolioData): string {
  const skills = Object.entries(data.skills)
    .map(([category, items]) => `${category}: ${items.join(', ')}`)
    .join('\n');

  const experience = data.experience
    .map(
      (job) =>
        `${job.period} | ${job.role} @ ${job.company} (${job.type})\n- ${job.highlights.join('\n- ')}\nTech: ${job.technologies.join(', ')}`,
    )
    .join('\n\n');

  const projects = data.projects
    .map((project) => `${project.title}: ${project.description} Tech: ${project.technologies.join(', ')}`)
    .join('\n');

  const education = data.education
    .map((item) => `${item.period} | ${item.degree} - ${item.institution}`)
    .join('\n');

  const certifications = data.certifications.map((item) => `${item.name} (${item.issuer})`).join(', ');

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

export function answerFromCv(question: string, data: PortfolioData, locale: Locale = 'en'): string {
  const q = normalize(question);
  const name = data.profile.name.split(' ')[0];
  const bg = locale === 'bg';

  if (q.length < 2) {
    return bg
      ? `Попитайте ме за опита, уменията или фона на ${name}.`
      : `Ask me anything about ${name}'s experience, skills, or background.`;
  }

  if (
    includesAny(q, [
      'hello',
      'hi ',
      'hey',
      'good morning',
      'good evening',
      'здравей',
      'здрасти',
      'добър ден',
      'добър вечер',
      'здравейте',
    ])
  ) {
    return bg
      ? `Здравейте. Познавам CV-то на ${name}. Питайте за PHP, React, работата, обучението или каквото друго ви интересува.`
      : `Hey. I know ${name}'s CV inside out. Ask about PHP, React, her jobs, teaching, or anything else on her profile.`;
  }

  if (
    includesAny(q, [
      'contact',
      'email',
      'phone',
      'reach',
      'hire',
      'available',
      'контакт',
      'имейл',
      'телефон',
      'наемане',
      'свърж',
    ])
  ) {
    return bg
      ? `Да - можете да се свържете с ${name} на ${data.profile.email} или ${data.profile.phone}. Базирана е в ${data.profile.location} и е отворена за full-stack / backend възможности.`
      : `Yes - you can reach ${name} at ${data.profile.email} or ${data.profile.phone}. She is based in ${data.profile.location} and open to full-stack / backend opportunities.`;
  }

  if (
    includesAny(q, [
      'where',
      'location',
      'live',
      'based',
      'city',
      'country',
      'bulgaria',
      'varna',
      'къде',
      'локац',
      'живее',
      'варна',
      'българ',
    ])
  ) {
    return bg ? `${name} е базирана в ${data.profile.location}.` : `${name} is based in ${data.profile.location}.`;
  }

  if (
    includesAny(q, [
      'year',
      'experience',
      'how long',
      'senior',
      'junior',
      'години',
      'опит',
      'колко време',
    ])
  ) {
    return bg
      ? `Има над 7 години професионален опит в уеб разработката, с фокус върху PHP, JavaScript, бази данни и full-stack доставка.`
      : `She has over 7 years of professional experience in web development, with deep focus on PHP, JavaScript, databases, and full-stack delivery.`;
  }

  if (
    includesAny(q, [
      'teach',
      'teaching',
      'kids',
      'children',
      'roblox',
      'minecraft',
      'instructor',
      'обучав',
      'обучение',
      'деца',
      'учениц',
      'инструктор',
    ])
  ) {
    return bg
      ? `Да. ${name} обучава деца от 2. до 4. клас на програмиране с Roblox Studio и Minecraft Education Edition. Роля: ${data.teaching.role}.`
      : `Yes. ${name} teaches programming to children in grades 2-4 using Roblox Studio and Minecraft Education Edition. Role: ${data.teaching.role}.`;
  }

  if (
    includesAny(q, [
      'current job',
      'now',
      'present',
      'vero',
      'working at',
      'employer',
      'сега',
      'настоящ',
      'работи',
      'работодател',
    ])
  ) {
    const current = data.experience[0];
    return bg
      ? `В момента работи в ${current.company} като ${current.role} (${current.period}). Фокус: ${current.highlights[0]}`
      : `Right now she works at ${current.company} as ${current.role} (${current.period}). Focus: ${current.highlights[0]}`;
  }

  if (
    includesAny(q, [
      'previous',
      'indeavr',
      'history',
      'worked',
      'companies',
      'jobs',
      'experience list',
      'предишн',
      'компании',
      'работа',
      'роли',
    ])
  ) {
    const summary = data.experience
      .slice(0, 4)
      .map((job) => `${job.company} (${job.period}) - ${job.role}`)
      .join('; ');
    return bg
      ? `Скорошни роли: ${summary}. PHP е константа през по-голямата част от кариерата.`
      : `Recent roles: ${summary}. PHP has been a constant through most of her career.`;
  }

  if (
    includesAny(q, [
      'education',
      'university',
      'degree',
      'study',
      'studied',
      'school',
      'образование',
      'университет',
      'степен',
      'учи',
      'училище',
    ])
  ) {
    const edu = data.education.map((item) => `${item.degree} @ ${item.institution} (${item.period})`).join('; ');
    return bg ? `Образование: ${edu}.` : `Education: ${edu}.`;
  }

  if (
    includesAny(q, [
      'certif',
      'course',
      'badge',
      'cs50',
      'ibm',
      'softuni',
      'tableau course',
      'сертификат',
      'курс',
    ])
  ) {
    const top = data.certifications
      .slice(0, 5)
      .map((c) => c.name)
      .join(', ');
    return bg
      ? `Има сертификати включително: ${top}, и още изброени в сайта.`
      : `She has certifications including: ${top}, and more listed on the site.`;
  }

  if (
    includesAny(q, [
      'project',
      'portfolio',
      'built',
      'printout',
      'tableau dashboard',
      'проект',
      'портфолио',
    ])
  ) {
    const featured = data.projects.filter((p) => p.featured).slice(0, 3);
    const lines = featured.map((p) => `${p.title}: ${p.description}`).join(' ');
    return bg ? `Няколко акцента: ${lines}` : `A few highlights: ${lines}`;
  }

  if (
    includesAny(q, [
      'language',
      'speak',
      'bulgarian',
      'turkish',
      'english',
      'език',
      'говори',
      'български',
      'турски',
      'английски',
    ])
  ) {
    return bg
      ? `Говорими езици: ${data.profile.languages.map((l) => `${l.name} (${l.level})`).join(', ')}.`
      : `Spoken languages: ${data.profile.languages.map((l) => `${l.name} (${l.level})`).join(', ')}.`;
  }

  if (includesAny(q, ['hobby', 'hobbies', 'free time', 'paint', 'chess', 'хоби', 'свободно', 'шах', 'живопис'])) {
    return bg
      ? `Извън работа харесва ${data.profile.hobbies.join(' и ')}.`
      : `Outside work she likes ${data.profile.hobbies.join(' and ')}.`;
  }

  if (
    includesAny(q, [
      'who is',
      'about her',
      'about dzhemile',
      'summar',
      'introduce',
      'profile',
      'кой е',
      'за нея',
      'за джемиле',
      'резюме',
      'представи',
    ])
  ) {
    return data.profile.about;
  }

  const skill = findSkill(data, q);
  if (skill !== null) {
    const knowsQuestion = includesAny(q, [
      'know',
      'expert',
      'experience',
      'use',
      'work with',
      'familiar',
      'can she',
      'does she',
      'is she',
      'skill',
      'знае',
      'умее',
      'познава',
      'опит',
      'добра',
      'може',
    ]);
    const jobs = jobsUsingSkill(data, skill);
    const skillLower = normalize(skill);

    if (includesAny(skillLower, ['php'])) {
      return bg
        ? `Да - PHP е едно от най-силните ѝ умения. Използвала го е в множество роли (Phalcon, YII2, Drupal и в момента PHP 8.5 във Vero Digital Solutions). На практика е експерт PHP backend разработчик.`
        : `Yes - PHP is one of her strongest skills. She has used it across multiple roles (Phalcon, YII2, Drupal, and currently PHP 8.5 at Vero Digital Solutions). She is effectively an expert PHP backend developer.`;
    }

    if (includesAny(skillLower, ['react'])) {
      return bg
        ? `Да. Има професионален опит с React, включително frontend работа в Mobile Wave Solutions, плюс курсове по React. Удобно ѝ е да изгражда модерни React интерфейси.`
        : `Yes. She has professional React experience, including frontend work at Mobile Wave Solutions, plus React coursework. She is comfortable building modern React UIs.`;
    }

    if (includesAny(skillLower, ['drupal'])) {
      return bg
        ? `Да. В INDEAVR работи като Backend уеб разработчик с PHP/Drupal - модули и теми, с Pantheon и SonarCloud в процеса.`
        : `Yes. At INDEAVR she worked as a Backend Web Developer with PHP/Drupal, building modules and themes, with Pantheon and SonarCloud in the workflow.`;
    }

    if (includesAny(skillLower, ['tableau'])) {
      return bg
        ? `Да. Използва Tableau за визуализация на данни, има Tableau сертификат и публикува работа в Tableau Public.`
        : `Yes. She uses Tableau for data visualization, has a Tableau certification, and publishes work on Tableau Public.`;
    }

    if (knowsQuestion || jobs.length > 0) {
      const jobBit =
        jobs.length > 0
          ? bg
            ? ` Използвала го е в роли като: ${jobs.slice(0, 2).join('; ')}.`
            : ` She used it in roles like: ${jobs.slice(0, 2).join('; ')}.`
          : '';
      return bg
        ? `Да - ${name} познава ${skill}.${jobBit} Част е от професионалния ѝ набор.`
        : `Yes - ${name} knows ${skill}.${jobBit} It is part of her professional toolkit.`;
    }
  }

  if (
    includesAny(q, [
      'php',
      'backend',
      'fullstack',
      'full stack',
      'frontend',
      'front end',
      'data science',
      'бекенд',
      'фронтенд',
    ])
  ) {
    if (q.includes('php')) {
      return bg
        ? `Да - експерт е в PHP. Над 7 години уеб разработка с frameworks като Phalcon, YII2, Drupal и PHP 8.5 в продукция.`
        : `Yes - she is an expert in PHP. Over 7 years of web development with frameworks like Phalcon, YII2, Drupal, and PHP 8.5 in production.`;
    }
    if (includesAny(q, ['backend', 'бекенд'])) {
      return bg
        ? `Да. Backend е най-силната ѝ област: PHP API-та, бази данни, CMS, тестове и чиста архитектура.`
        : `Yes. Backend is her strongest area: PHP APIs, databases, CMS work, testing, and clean architecture.`;
    }
    if (includesAny(q, ['fullstack', 'full stack'])) {
      return bg
        ? `Да. Работи като Full-Stack уеб разработчик - силен PHP backend плюс React/JavaScript на frontend.`
        : `Yes. She works as a Full-Stack Web Developer - strong backend PHP plus React/JavaScript on the frontend.`;
    }
    if (includesAny(q, ['frontend', 'front end', 'фронтенд'])) {
      return bg
        ? `Да. Има frontend опит с React, JavaScript, CSS/SASS, Twig/Latte шаблони и Bootstrap.`
        : `Yes. She has frontend experience with React, JavaScript, CSS/SASS, Twig/Latte templates, and Bootstrap.`;
    }
    if (includesAny(q, ['data science', 'machine learning', 'ml'])) {
      return bg
        ? `Тя е data science ентусиаст с Tableau, SQL аналитика, Python курсове и свързани сертификати. Активно се развива в тази посока.`
        : `She is a data science enthusiast with Tableau, SQL analytics, Python coursework, and related certifications. She is actively growing in that direction.`;
    }
  }

  const allSkills = flattenSkills(data).slice(0, 12).join(', ');
  return bg
    ? `Не попаднах точно на това, но ето какво знам: ${name} е ${data.profile.title} в ${data.profile.location} с 7+ години опит. Основни умения: ${allSkills}. Опитайте с въпрос за PHP, React, текущата работа, обучение или образование.`
    : `I could not match that exactly, but here is what I know: ${name} is a ${data.profile.title} in ${data.profile.location} with 7+ years experience. Core skills include ${allSkills}. Try asking about PHP, React, her current job, teaching, or education.`;
}

export async function askAboutCv(
  question: string,
  data: PortfolioData,
  locale: Locale = 'en',
): Promise<string> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question,
        context: buildCvContext(data),
        locale,
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

  return answerFromCv(question, data, locale);
}
