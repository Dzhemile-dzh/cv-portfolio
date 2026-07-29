import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionLabel } from './About';
import { useLanguage } from '../i18n/LanguageContext';

type TerminalLine = {
  text: string;
  className: string;
};

export function WeasleySection() {
  const { t, locale } = useLanguage();

  const terminalLines = useMemo<TerminalLine[]>(
    () => [
      { text: `$ ${t.weasley.line1}`, className: 'text-[#0f9d8a]' },
      { text: `ERROR: ${t.weasley.line2}`, className: 'text-[#ff4d3a]' },
      { text: t.weasley.line3, className: 'text-white/70' },
      { text: t.weasley.line4, className: 'text-[#f5c518]' },
      { text: t.weasley.line5, className: 'text-white/70' },
      { text: t.weasley.line6, className: 'text-[#3aa0ff]' },
    ],
    [locale, t.weasley.line1, t.weasley.line2, t.weasley.line3, t.weasley.line4, t.weasley.line5, t.weasley.line6],
  );

  const [reducedMotion, setReducedMotion] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const isReduced = media?.matches ?? false;
    setReducedMotion(isReduced);
    setLineIndex(0);
    setCharIndex(0);
  }, [locale]);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    if (lineIndex >= terminalLines.length) {
      return;
    }

    const currentText = terminalLines[lineIndex]?.text ?? '';
    if (charIndex < currentText.length) {
      const id = window.setTimeout(() => setCharIndex((v) => v + 1), 18);
      return () => window.clearTimeout(id);
    }

    const id = window.setTimeout(() => {
      setLineIndex((v) => v + 1);
      setCharIndex(0);
    }, 240);

    return () => window.clearTimeout(id);
  }, [reducedMotion, lineIndex, charIndex, terminalLines]);

  const effectiveLineIndex = reducedMotion ? terminalLines.length : lineIndex;
  const typingDone = reducedMotion || effectiveLineIndex >= terminalLines.length;

  return (
    <section
      id="weasley"
      className="section-padding bg-[#1a1a1a] relative overflow-hidden"
      aria-labelledby="weasley-heading"
    >
      <div
        className="absolute top-10 right-8 w-12 h-12 bg-[#ff4d3a] border-[3px] border-[#f5c518] rotate-45 hidden md:block"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-16 left-6 w-16 h-16 bg-[#f5c518] border-[3px] border-white -rotate-6 hidden lg:block"
        aria-hidden="true"
      />

      <div className="container-max relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45 }}
        >
          <SectionLabel>{t.weasley.label}</SectionLabel>
          <h2 id="weasley-heading" className="font-display text-3xl sm:text-5xl font-extrabold mb-3 text-white">
            {t.weasley.heading}
          </h2>
          <p className="mb-10 max-w-xl font-medium text-white/75">{t.weasley.intro}</p>

          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 items-stretch">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="relative"
            >
              <div
                className="absolute -bottom-3 -right-3 w-full h-full bg-[#f5c518] border-[3px] border-white"
                aria-hidden="true"
              />
              <div className="relative overflow-hidden border-[3px] border-white bg-[#141414] max-h-[420px] aspect-[5/4]">
                <img
                  src="/weasley.png"
                  alt={t.weasley.alt}
                  width={720}
                  height={540}
                  className="w-full h-full object-cover object-[center_65%]"
                  loading="lazy"
                />
                <p className="absolute right-3 top-3 bg-[#f5c518] text-[#141414] border-[3px] border-[#141414] px-3 py-1.5 font-display text-xs sm:text-sm font-extrabold uppercase tracking-wide shadow-[3px_3px_0_#ff4d3a]">
                  {t.weasley.badge}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="bg-[#0d0d0d] border-[3px] border-white shadow-[6px_6px_0_#ff4d3a] flex flex-col overflow-hidden"
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b-[3px] border-white/20 bg-[#141414]">
                <span className="w-3 h-3 bg-[#ff4d3a] border border-white/40" aria-hidden="true" />
                <span className="w-3 h-3 bg-[#f5c518] border border-white/40" aria-hidden="true" />
                <span className="w-3 h-3 bg-[#0f9d8a] border border-white/40" aria-hidden="true" />
                <span className="ml-2 font-mono text-[11px] text-white/60 truncate">{t.weasley.terminalTitle}</span>
              </div>

              <div className="p-4 sm:p-5 font-mono text-[12px] sm:text-[13px] leading-relaxed flex-1 space-y-2">
                {terminalLines.map((line, idx) => {
                  const isTyped = idx < effectiveLineIndex;
                  const isActive = idx === effectiveLineIndex && !reducedMotion;
                  const shown = isTyped ? line.text : isActive ? line.text.slice(0, charIndex) : '';

                  const showCursor = isActive;

                  return (
                    <p
                      key={idx}
                      className={`${line.className} ${idx === 5 ? 'pt-2' : ''}`}
                    >
                      {shown}
                      {showCursor && (
                        <span
                          aria-hidden="true"
                          className="ml-1 inline-block w-[6px] h-[1em] bg-[#f5c518] animate-pulse translate-y-[2px]"
                        />
                      )}
                    </p>
                  );
                })}

                {typingDone && (
                  <p className="text-white font-bold pt-3 border-t border-white/15 mt-3">{t.weasley.punchline}</p>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
