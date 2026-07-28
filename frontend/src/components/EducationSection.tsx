import { motion } from 'framer-motion';
import { SectionLabel } from './About';
import type { Education, Certification } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface EducationSectionProps {
  education: Education[];
  certifications: Certification[];
}

const eduAccents = [
  { card: 'hard-card-sky', bar: 'bg-[#3aa0ff]', node: 'bg-[#3aa0ff]' },
  { card: 'hard-card-mustard', bar: 'bg-[#f5c518]', node: 'bg-[#f5c518]' },
  { card: 'hard-card-teal', bar: 'bg-[#0f9d8a]', node: 'bg-[#0f9d8a]' },
];

const certAccents = [
  { card: 'hard-card-coral', chip: 'bg-[#ff4d3a] text-white', rotate: '-rotate-1' },
  { card: 'hard-card-teal', chip: 'bg-[#0f9d8a] text-white', rotate: 'rotate-1' },
  { card: 'hard-card-mustard', chip: 'bg-[#f5c518] text-[#141414]', rotate: '-rotate-1' },
  { card: 'hard-card-sky', chip: 'bg-[#3aa0ff] text-[#141414]', rotate: 'rotate-1' },
];

function isOngoing(period: string): boolean {
  const lower = period.toLowerCase();
  return lower.includes('present') || lower.includes('настояще') || lower.includes('сега');
}

export function EducationSection({ education, certifications }: EducationSectionProps) {
  const { t, locale } = useLanguage();
  const nowLabel = locale === 'bg' ? 'СЕГА' : 'NOW';

  return (
    <section
      id="education"
      className="section-padding bg-[#e8f0ff] relative overflow-hidden"
      aria-labelledby="education-heading"
    >
      <div
        className="absolute top-20 right-8 w-14 h-14 bg-[#ff4d3a] border-[3px] border-[#141414] rotate-45 hidden md:block"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-16 left-6 w-20 h-10 bg-[#f5c518] border-[3px] border-[#141414] -rotate-3 hidden lg:block"
        aria-hidden="true"
      />

      <div className="container-max relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45 }}
        >
          <SectionLabel>{t.education.label}</SectionLabel>
          <h2 id="education-heading" className="font-display text-3xl sm:text-5xl font-extrabold mb-4">
            {t.education.heading}
          </h2>
          <p className="mb-12 max-w-xl font-medium text-[#333]">{t.education.intro}</p>

          <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-14 items-start">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <h3 className="font-display text-xl sm:text-2xl font-extrabold">{t.education.school}</h3>
                <span className="font-mono text-xs font-bold bg-[#141414] text-white px-2 py-1">
                  {String(education.length).padStart(2, '0')}
                </span>
              </div>

              <div className="relative space-y-5 pl-2">
                <div
                  className="absolute left-[1.15rem] top-3 bottom-3 w-[3px] bg-[#141414]"
                  aria-hidden="true"
                />

                {education.map((edu, i) => {
                  const accent = eduAccents[i % eduAccents.length];
                  const ongoing = isOngoing(edu.period);
                  const indexLabel = String(i + 1).padStart(2, '0');

                  return (
                    <motion.article
                      key={`${edu.institution}-${edu.period}`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      className="relative pl-12"
                    >
                      <div
                        className={`absolute left-0 top-5 w-9 h-9 border-[3px] border-[#141414] ${accent.node} shadow-[3px_3px_0_#141414] flex items-center justify-center z-10`}
                        aria-hidden="true"
                      >
                        <span
                          className={`font-mono text-[10px] font-bold ${
                            accent.node === 'bg-[#f5c518]' || accent.node === 'bg-[#3aa0ff]'
                              ? 'text-[#141414]'
                              : 'text-white'
                          }`}
                        >
                          {indexLabel}
                        </span>
                      </div>

                      <div className={`${accent.card} p-5 relative overflow-hidden`}>
                        <div className={`absolute left-0 top-0 bottom-0 w-2 ${accent.bar}`} aria-hidden="true" />
                        <div className="pl-3">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <time className="font-mono text-[11px] font-bold bg-[#141414] text-white px-2.5 py-1">
                              {edu.period}
                            </time>
                            {ongoing && (
                              <span className="font-mono text-[11px] font-extrabold bg-[#f5c518] text-[#141414] border-2 border-[#141414] px-2 py-0.5">
                                {nowLabel}
                              </span>
                            )}
                          </div>
                          <h4 className="font-display text-lg font-extrabold leading-snug">{edu.degree}</h4>
                          <p className="text-sm font-semibold text-[#333] mt-2">{edu.institution}</p>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <h3 className="font-display text-xl sm:text-2xl font-extrabold">
                  {t.education.certifications}
                </h3>
                <span className="font-mono text-xs font-bold bg-[#ff4d3a] text-white border-2 border-[#141414] px-2 py-1">
                  {String(certifications.length).padStart(2, '0')}
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {certifications.map((cert, i) => (
                  <CertificationCard key={`${cert.name}-${cert.issuer}`} cert={cert} index={i} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CertificationCard({ cert, index }: { cert: Certification; index: number }) {
  const { t } = useLanguage();
  const accent = certAccents[index % certAccents.length];
  const hasLink = cert.url !== '';
  const Wrapper = hasLink ? 'a' : 'div';

  const wrapperProps = hasLink
    ? {
        href: cert.url,
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, rotate: index % 2 === 0 ? -2 : 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      whileHover={{ y: -4, rotate: index % 2 === 0 ? -1 : 1 }}
    >
      <Wrapper
        {...wrapperProps}
        className={`${accent.card} p-4 block h-full relative group ${accent.rotate} hover:rotate-0 transition-transform`}
      >
        <div className="flex items-start justify-between gap-2 mb-3">
          <span className={`font-mono text-[10px] font-bold px-2 py-1 border-2 border-[#141414] ${accent.chip}`}>
            {cert.issuer}
          </span>
          {hasLink && (
            <span
              className="w-7 h-7 shrink-0 border-2 border-[#141414] bg-white flex items-center justify-center font-bold text-sm group-hover:bg-[#f5c518] transition-colors"
              aria-hidden="true"
            >
              ↗
            </span>
          )}
        </div>

        <h4 className="text-sm font-extrabold leading-snug min-h-[2.6rem]">{cert.name}</h4>

        {hasLink ? (
          <span className="inline-block text-[11px] font-bold mt-3 underline decoration-2 underline-offset-2 text-[#ff4d3a] group-hover:text-[#141414]">
            {t.education.verify}
          </span>
        ) : (
          <span className="inline-block text-[11px] font-mono mt-3 text-[#888]">—</span>
        )}
      </Wrapper>
    </motion.div>
  );
}
