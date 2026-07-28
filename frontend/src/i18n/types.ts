export type Locale = 'en' | 'bg';

export const LOCALES: Locale[] = ['en', 'bg'];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'EN',
  bg: 'BG',
};

export const STORAGE_KEY = 'portfolio-locale';

export function isLocale(value: string | null): value is Locale {
  return value === 'en' || value === 'bg';
}

export function detectLocale(): Locale {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (isLocale(stored)) {
    return stored;
  }

  return 'en';
}
