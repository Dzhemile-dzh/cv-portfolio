import { useLanguage } from './LanguageContext';
import { LOCALES, LOCALE_LABELS, type Locale } from './types';

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className={`inline-flex border-2 border-[#141414] bg-transparent shadow-[2px_2px_0_#141414] ${className}`}
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
            className={`px-1.5 py-0.5 text-[10px] leading-none font-extrabold font-display tracking-wide transition-colors ${
              active
                ? 'bg-[#f5c518] text-[#141414]'
                : 'bg-transparent text-[#141414] hover:bg-[#f5c518]/40'
            }`}
          >
            {LOCALE_LABELS[code]}
          </button>
        );
      })}
    </div>
  );
}
