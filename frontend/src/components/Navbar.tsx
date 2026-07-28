import { useEffect, useState, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageSwitcher } from '../i18n/LanguageSwitcher';
import { useLanguage } from '../i18n/LanguageContext';

const HEADER_OFFSET = 80;

function scrollToSection(hash: string): void {
  const id = hash.replace('#', '');
  const el = document.getElementById(id);
  if (el === null) {
    return;
  }

  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top, behavior: 'smooth' });
  window.history.pushState(null, '', hash);
}

export function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: '#about', label: t.nav.about },
    { href: '#experience', label: t.nav.experience },
    { href: '#teaching', label: t.nav.teaching },
    { href: '#projects', label: t.nav.projects },
    { href: '#skills', label: t.nav.skills },
    { href: '#education', label: t.nav.education },
    { href: '#contact', label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setMobileOpen(false);
    window.setTimeout(() => scrollToSection(href), mobileOpen ? 180 : 0);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${
        scrolled || mobileOpen ? 'bg-[#eef6f3]/95 border-b-[3px] border-[#141414] backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <nav className="container-max flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 gap-3" aria-label="Main navigation">
        <a
          href="#"
          className="font-display font-extrabold text-xl tracking-tight shrink-0"
          onClick={(event) => {
            event.preventDefault();
            setMobileOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <span className="bg-[#ff4d3a] text-white px-2 py-0.5 border-2 border-[#141414]">DA</span>
          <span className="ml-2 hidden sm:inline">{t.nav.portfolio}</span>
        </a>

        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="px-3 py-1.5 text-sm font-semibold hover:bg-[#f5c518] border-2 border-transparent hover:border-[#141414] transition-colors"
                onClick={(event) => handleNavClick(event, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 shrink-0">
          <LanguageSwitcher />
          <div className="hidden lg:block">
            <a
              href="/DzhemileAhmedCV.pdf"
              download="DzhemileAhmedCV.pdf"
              className="btn-primary text-sm !py-2 !px-4"
            >
              {t.nav.getCv}
            </a>
          </div>
          <button
            type="button"
            className="lg:hidden p-2 border-2 border-[#141414] bg-white"
            aria-label={t.nav.toggleMenu}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b-[3px] border-[#141414] overflow-hidden"
          >
            <ul className="px-4 py-4 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block px-3 py-3 font-semibold hover:bg-[#0f9d8a] hover:text-white border-2 border-transparent hover:border-[#141414]"
                    onClick={(event) => handleNavClick(event, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/DzhemileAhmedCV.pdf"
                  download="DzhemileAhmedCV.pdf"
                  className="block px-3 py-3 font-semibold hover:bg-[#0f9d8a] hover:text-white border-2 border-transparent hover:border-[#141414]"
                  onClick={() => setMobileOpen(false)}
                >
                  {t.nav.getCv}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
