import { useLanguage } from './LanguageContext';
import { LOCALES, LOCALE_LABELS, type Locale } from './types';

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className={`inline-flex border-[3px] border-[#141414] bg-white shadow-[3px_3px_0_#141414] ${className}`}
      role="group"
      aria-label="Language"
    >
      {LOCALES.map((code: Locale) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            className={`px-2.5 py-1 text-xs font-extrabold font-display tracking-wide transition-colors ${
              active ? 'bg-[#f5c518] text-[#141414]' : 'bg-white text-[#141414] hover:bg-[#eef6f3]'
            }`}
          >
            {LOCALE_LABELS[code]}
          </button>
        );
      })}
    </div>
  );
}
