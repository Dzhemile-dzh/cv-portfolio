import type { Locale } from './types';

export interface UiMessages {
  loading: string;
  nav: {
    portfolio: string;
    about: string;
    experience: string;
    teaching: string;
    projects: string;
    skills: string;
    education: string;
    contact: string;
    getCv: string;
    toggleMenu: string;
  };
  hero: {
    greeting: string;
    title: string;
    subtitleLine1: string;
    subtitleLine2: string;
    pitchLine1: string;
    pitchLine2: string;
    downloadCv: string;
    viewProjects: string;
    contactMe: string;
  };
  about: {
    label: string;
    heading: string;
    location: string;
    email: string;
    phone: string;
    languages: string;
    hobbies: string;
  };
  experience: {
    label: string;
    heading: string;
    intro: string;
  };
  teaching: {
    label: string;
    heading: string;
  };
  projects: {
    label: string;
    heading: string;
    intro: string;
    featured: string;
    more: string;
    privateProject: string;
    seeMore: string;
    seeLess: string;
  };
  skills: {
    label: string;
    heading: string;
    intro: string;
  };
  education: {
    label: string;
    heading: string;
    intro: string;
    school: string;
    certifications: string;
    verify: string;
  };
  contact: {
    label: string;
    heading: string;
    intro: string;
  };
  weasley: {
    label: string;
    heading: string;
    intro: string;
    badge: string;
    alt: string;
    terminalTitle: string;
    line1: string;
    line2: string;
    line3: string;
    line4: string;
    line5: string;
    line6: string;
    punchline: string;
  };
  footer: {
    builtWith: string;
  };
  notFound: {
    error: string;
    title: string;
    body: string;
    status: string;
    home: string;
    email: string;
  };
  chat: {
    open: string;
    close: string;
    button: string;
    closeButton: string;
    title: string;
    subtitle: string;
    welcome: string;
    thinking: string;
    placeholder: string;
    send: string;
    suggestions: string[];
  };
  seo: {
    title: string;
    description: string;
  };
}

const en: UiMessages = {
  loading: 'Loading opinions...',
  nav: {
    portfolio: 'Portfolio',
    about: 'About',
    experience: 'Experience',
    teaching: 'Teaching',
    projects: 'Projects',
    skills: 'Skills',
    education: 'Education',
    contact: 'Contact',
    getCv: 'Download CV',
    toggleMenu: 'Toggle menu',
  },
  hero: {
    greeting: 'Hi, I am Dzhemile Ahmed',
    title: 'Full-Stack Web Developer',
    subtitleLine1: 'Data Science',
    subtitleLine2: 'Enthusiast',
    pitchLine1: 'I build reliable PHP backends, clean React interfaces, and PDF systems that hold up in production.',
    pitchLine2: 'I ship with Cursor and AI agents, and integrate services like Stripe and EmailJS when products need them.',
    downloadCv: 'Download CV',
    viewProjects: 'View projects',
    contactMe: 'Contact me',
  },
  about: {
    label: 'About',
    heading: 'Turning complex systems into clean, working software.',
    location: 'Location',
    email: 'Email',
    phone: 'Phone',
    languages: 'Languages',
    hobbies: 'Hobbies',
  },
  experience: {
    label: 'Experience',
    heading: 'Work experience',
    intro: 'Roles where I shipped real products, cleaned up legacy code, and kept things maintainable.',
  },
  teaching: {
    label: 'Teaching',
    heading: 'Teaching programming to kids',
  },
  projects: {
    label: 'Projects',
    heading: 'Selected projects',
    intro: 'A mix of client work and personal projects. Some repos stay private under NDA, but the stack and outcomes are still here.',
    featured: 'Featured',
    more: 'More projects',
    privateProject: 'Private client project',
    seeMore: 'See more',
    seeLess: 'Show less',
  },
  skills: {
    label: 'Skills',
    heading: 'Technical skills',
    intro: 'Technologies I use day to day, from PHP backends to data tools and teaching platforms.',
  },
  education: {
    label: 'Education',
    heading: 'Education and certifications',
    intro: 'Formal studies plus verified certificates you can open and check.',
    school: 'School',
    certifications: 'Certifications',
    verify: 'verify certificate',
  },
  contact: {
    label: 'Contact',
    heading: "Let's talk",
    intro: 'Open to full-stack and backend roles, as well as data science projects. Feel free to reach out with a clear brief or opportunity.',
  },
  weasley: {
    label: 'Ice breaker',
    heading: 'Meet Weasley',
    intro: 'Official QA lead, keyboard warmer, and senior debugging consultant. If production is on fire, he is usually already sitting on the laptop.',
    badge: 'Weasley · Debug Dept.',
    alt: 'Weasley the orange tabby cat upside down on a laptop during a debug session',
    terminalTitle: 'debug://weasley.session',
    line1: 'npm run build',
    line2: 'Found 1 blocking issue',
    line3: '> Cause: orange tabby occupying IDE viewport',
    line4: '> Status: build paused for mandatory chin scratches',
    line5: '> Assigned to: Weasley (bowtie optional, attitude required)',
    line6: 'Hint: petting reduces stack traces by ~40%',
    punchline: 'Result: still shipping. Just with better company.',
  },
  footer: {
    builtWith: 'Built with React and PHP 8.5',
  },
  notFound: {
    error: 'ERROR 404',
    title: 'Lost?',
    body: 'This page does not exist. Or it did, and then someone refactor-deleted it without telling anyone.',
    status: 'Status: still not hired from this URL either.',
    home: 'Take me home',
    email: 'Blame me by email',
  },
  chat: {
    open: 'Open CV chat',
    close: 'Close CV chat',
    button: 'CHAT',
    closeButton: 'X',
    title: 'Ask about my CV',
    subtitle: 'Fed with real profile data - try "Does she know PHP?"',
    welcome: "Hi. I am trained on {name}'s CV. Ask me about her skills, jobs, teaching, or experience.",
    thinking: 'Thinking with CV context...',
    placeholder: 'Ask about skills, jobs, teaching...',
    send: 'Send',
    suggestions: [
      'Does she know PHP?',
      'Does she use Cursor / AI agents?',
      'Has she integrated Stripe?',
      'Where does she work now?',
    ],
  },
  seo: {
    title: 'Dzhemile Ahmed | Full-Stack Web Developer & Data Science Enthusiast',
    description:
      'Experienced full-stack software engineer specializing in PHP, React, Drupal, and data science. Based in Varna, Bulgaria.',
  },
};

const bg: UiMessages = {
  loading: 'Зареждане...',
  nav: {
    portfolio: 'Портфолио',
    about: 'За мен',
    experience: 'Опит',
    teaching: 'Обучение',
    projects: 'Проекти',
    skills: 'Умения',
    education: 'Образование',
    contact: 'Контакт',
    getCv: 'Изтегли CV',
    toggleMenu: 'Меню',
  },
  hero: {
    greeting: 'Здравейте, аз съм Джемиле Ахмед',
    title: 'Full-Stack уеб разработчик',
    subtitleLine1: 'Data Science',
    subtitleLine2: 'ентусиаст',
    pitchLine1: 'Изграждам надеждни PHP бекенди, чисти React интерфейси и PDF системи, които издържат в продукция.',
    pitchLine2: 'Работя с Cursor и AI агенти, и интегрирам услуги като Stripe и EmailJS, когато продуктът има нужда.',
    downloadCv: 'Изтегли CV',
    viewProjects: 'Виж проекти',
    contactMe: 'Свържи се',
  },
  about: {
    label: 'За мен',
    heading: 'Превръщам сложни системи в чист, работещ софтуер.',
    location: 'Локация',
    email: 'Имейл',
    phone: 'Телефон',
    languages: 'Езици',
    hobbies: 'Хоби',
  },
  experience: {
    label: 'Опит',
    heading: 'Професионален опит',
    intro: 'Роли, в които доставях реални продукти, оправях наследен код и поддържах качество.',
  },
  teaching: {
    label: 'Обучение',
    heading: 'Обучавам деца на програмиране',
  },
  projects: {
    label: 'Проекти',
    heading: 'Избрани проекти',
    intro: 'Смес от клиентска работа и лични проекти. Някои хранилища са частни по NDA, но стекът и резултатите са тук.',
    featured: 'Избрано',
    more: 'Още проекти',
    privateProject: 'Частен клиентски проект',
    seeMore: 'Виж повече',
    seeLess: 'Скрий',
  },
  skills: {
    label: 'Умения',
    heading: 'Технически умения',
    intro: 'Технологии, които използвам всеки ден - от PHP бекенд до data инструменти и платформи за обучение.',
  },
  education: {
    label: 'Образование',
    heading: 'Образование и сертификати',
    intro: 'Формално обучение плюс сертификати, които можете да отворите и проверите.',
    school: 'Училище',
    certifications: 'Сертификати',
    verify: 'провери сертификат',
  },
  contact: {
    label: 'Контакт',
    heading: 'Да поговорим',
    intro: 'Отворена съм за full-stack и backend роли, както и за data science проекти. Пишете с ясно предложение или възможност.',
  },
  weasley: {
    label: 'За разведряване',
    heading: 'Запознайте се с Weasley',
    intro: 'Официален QA лидер, затоплител на клавиатурата и главен консултант по дебъгване. Ако продукцията гори, той вече седи върху лаптопа.',
    badge: 'Weasley · Debug отдел',
    alt: 'Weasley - рижаво коте, обърнато с главата надолу върху лаптоп по време на дебъгване',
    terminalTitle: 'debug://weasley.session',
    line1: 'npm run build',
    line2: 'Намерена е 1 блокираща грешка',
    line3: '> Причина: оранжево коте заема IDE екрана',
    line4: '> Статус: билдът е спрян за задължително почесване',
    line5: '> Назначен: Weasley (папионката е по желание, характерът - задължителен)',
    line6: 'Съвет: почесването намалява stack traces с ~40%',
    punchline: 'Резултат: пак шипваме. Просто с по-добра компания.',
  },
  footer: {
    builtWith: 'Направено с React и PHP 8.5',
  },
  notFound: {
    error: 'ГРЕШКА 404',
    title: 'Изгубени?',
    body: 'Тази страница не съществува. Или е съществувала, докато някой не я изтрил при рефакторинг.',
    status: 'Статус: и от този URL все още не съм наета.',
    home: 'Към началото',
    email: 'Пишете ми',
  },
  chat: {
    open: 'Отвори чат за CV',
    close: 'Затвори чат',
    button: 'ЧАТ',
    closeButton: 'X',
    title: 'Питай за CV-то ми',
    subtitle: 'Базиран на реални данни - опитайте „Знае ли PHP?“',
    welcome: 'Здравейте. Познавам CV-то на {name}. Питайте за умения, работа, обучение или опит.',
    thinking: 'Мисля с контекст от CV-то...',
    placeholder: 'Питайте за умения, работа, обучение...',
    send: 'Изпрати',
    suggestions: [
      'Знае ли PHP?',
      'Работи ли с Cursor / AI агенти?',
      'Интегрирала ли е Stripe?',
      'Къде работи сега?',
    ],
  },
  seo: {
    title: 'Джемиле Ахмед | Full-Stack уеб разработчик и Data Science ентусиаст',
    description:
      'Опитен full-stack софтуерен инженер със специализация в PHP, React, Drupal и data science. Базирана във Варна, България.',
  },
};

export const uiMessages: Record<Locale, UiMessages> = { en, bg };

export function interpolate(template: string, vars: Record<string, string>): string {
  return Object.entries(vars).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, value),
    template,
  );
}
