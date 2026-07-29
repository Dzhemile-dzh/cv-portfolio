import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionLabel } from './About';
import { useLanguage } from '../i18n/LanguageContext';

type TerminalLine = {
  text: string;
  className: string;
};

export function WeasleySection() {
  const { t, locale } = useLanguage();
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(terminalRef, { once: true, margin: '-40px' });

  const terminalLines = useMemo<TerminalLine[]>(
    () => [
      { text: `$ ${t.weasley.line1}`, className: 'text-[#0f9d8a]' },
      { text: `ERROR: ${t.weasley.line2}`, className: 'text-[#ff4d3a] font-bold' },
      { text: t.weasley.line3, className: 'text-white/80' },
      { text: t.weasley.line4, className: 'text-[#f5c518]' },
      { text: t.weasley.line5, className: 'text-white/80' },
      { text: t.weasley.line6, className: 'text-[#3aa0ff]' },
    ],
    [locale, t.weasley.line1, t.weasley.line2, t.weasley.line3, t.weasley.line4, t.weasley.line5, t.weasley.line6],
  );

  const [reducedMotion, setReducedMotion] = useState(false);
  const [started, setStarted] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    setReducedMotion(media?.matches ?? false);
    setLineIndex(0);
    setCharIndex(0);
    setStarted(false);
  }, [locale]);

  useEffect(() => {
    if (inView) {
      setStarted(true);
    }
  }, [inView]);

  useEffect(() => {
    if (!started || reducedMotion) {
      return;
    }

    if (lineIndex >= terminalLines.length) {
      return;
    }

    const currentText = terminalLines[lineIndex]?.text ?? '';
    if (charIndex < currentText.length) {
      const id = window.setTimeout(() => setCharIndex((v) => v + 1), 16);
      return () => window.clearTimeout(id);
    }

    const id = window.setTimeout(() => {
      setLineIndex((v) => v + 1);
      setCharIndex(0);
    }, 220);

    return () => window.clearTimeout(id);
  }, [started, reducedMotion, lineIndex, charIndex, terminalLines]);

  const effectiveLineIndex = reducedMotion || !started ? (reducedMotion ? terminalLines.length : 0) : lineIndex;
  const typingDone = reducedMotion || (started && effectiveLineIndex >= terminalLines.length);

  return (
    <section
      id="weasley"
      className="section-padding bg-[#1a1a1a] relative overflow-hidden"
      aria-labelledby="weasley-heading"
    >
      <div
        className="absolute top-12 right-8 w-12 h-12 bg-[#ff4d3a] border-[3px] border-[#f5c518] rotate-45 hidden md:block"
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

          <div ref={terminalRef} className="relative pt-4 lg:pt-2 lg:pl-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="relative bg-[#0b0b0b] border-[3px] border-white shadow-[8px_8px_0_#ff4d3a] overflow-visible"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.07] z-[1]"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(to bottom, rgba(255,255,255,0.5) 0, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 4px)',
                }}
              />

              <div className="relative z-[2] flex items-center gap-2 px-4 py-3 border-b-[3px] border-white/20 bg-[#141414]">
                <span className="w-3 h-3 rounded-full bg-[#ff4d3a]" aria-hidden="true" />
                <span className="w-3 h-3 rounded-full bg-[#f5c518]" aria-hidden="true" />
                <span className="w-3 h-3 rounded-full bg-[#0f9d8a]" aria-hidden="true" />
                <span className="ml-2 font-mono text-[11px] text-white/60 truncate">
                  {t.weasley.terminalTitle}
                </span>
              </div>

              <div className="relative z-[2] grid lg:grid-cols-[0.95fr_1.05fr] gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8 items-center">
                <div className="relative mx-auto lg:mx-0 w-full max-w-sm lg:max-w-none lg:-ml-10 lg:-rotate-2">
                  <div
                    className="absolute -bottom-3 -right-3 w-full h-full bg-[#f5c518] border-[3px] border-[#141414]"
                    aria-hidden="true"
                  />
                  <div className="relative border-[4px] border-white bg-[#141414] shadow-[4px_4px_0_#141414]">
                    <img
                      src="/weasley.png"
                      alt={t.weasley.alt}
                      width={720}
                      height={540}
                      className="w-full aspect-[5/4] object-cover object-[center_65%]"
                      loading="lazy"
                    />
                    <p className="absolute right-2 top-2 sm:right-3 sm:top-3 bg-[#f5c518] text-[#141414] border-[3px] border-[#141414] px-2.5 py-1.5 font-display text-[0.65rem] sm:text-xs font-extrabold uppercase tracking-wide shadow-[3px_3px_0_#ff4d3a]">
                      {t.weasley.badge}
                    </p>
                  </div>
                </div>

                <div className="font-mono text-[12px] sm:text-[13px] leading-relaxed min-h-[220px] flex flex-col justify-center">
                  <div className="space-y-2">
                    {terminalLines.map((line, idx) => {
                      const isTyped = idx < effectiveLineIndex;
                      const isActive = started && idx === effectiveLineIndex && !reducedMotion;
                      if (!reducedMotion && !isTyped && !isActive) {
                        return null;
                      }

                      const shown = reducedMotion || isTyped ? line.text : line.text.slice(0, charIndex);

                      return (
                        <p key={idx} className={line.className}>
                          {shown}
                          {isActive && (
                            <span
                              aria-hidden="true"
                              className="ml-0.5 inline-block w-[7px] h-[1.05em] bg-[#f5c518] align-[-0.15em] animate-pulse"
                            />
                          )}
                        </p>
                      );
                    })}
                  </div>

                  {typingDone && (
                    <>
                      <div className="border-t border-white/20 my-3" aria-hidden="true" />
                      <p className="text-white font-bold">
                        {t.weasley.punchline}
                        {!reducedMotion && (
                          <span
                            aria-hidden="true"
                            className="ml-0.5 inline-block w-[7px] h-[1.05em] bg-[#f5c518] align-[-0.15em] animate-pulse"
                          />
                        )}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
