import { motion } from 'framer-motion';
import { SectionLabel } from './About';
import type { Experience } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface ExperienceSectionProps {
  experience: Experience[];
}

const accents = [
  { card: 'hard-card-coral', bar: 'bg-[#ff4d3a]', tag: 'tag-coral', node: 'bg-[#ff4d3a]' },
  { card: 'hard-card-teal', bar: 'bg-[#0f9d8a]', tag: 'tag-teal', node: 'bg-[#0f9d8a]' },
  { card: 'hard-card-mustard', bar: 'bg-[#f5c518]', tag: 'tag-mustard', node: 'bg-[#f5c518]' },
  { card: 'hard-card-sky', bar: 'bg-[#3aa0ff]', tag: 'tag-ink', node: 'bg-[#3aa0ff]' },
  { card: 'hard-card', bar: 'bg-[#141414]', tag: 'tag-ink', node: 'bg-[#141414]' },
];

function isCurrentRole(period: string): boolean {
  const lower = period.toLowerCase();
  return lower.includes('present') || lower.includes('настояще') || lower.includes('сега');
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  const { t, locale } = useLanguage();
  const nowLabel = locale === 'bg' ? 'СЕГА' : 'NOW';

  return (
    <section id="experience" className="section-padding bg-[#d9f5ef] relative overflow-hidden" aria-labelledby="experience-heading">
      <div
        className="absolute top-16 right-6 w-16 h-16 bg-[#f5c518] border-[3px] border-[#141414] rotate-12 hidden md:block"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-24 left-4 w-12 h-12 bg-[#ff4d3a] border-[3px] border-[#141414] -rotate-6 hidden lg:block"
        aria-hidden="true"
      />

      <div className="container-max relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45 }}
        >
          <SectionLabel>{t.experience.label}</SectionLabel>
          <h2 id="experience-heading" className="font-display text-3xl sm:text-5xl font-extrabold mb-4">
            {t.experience.heading}
          </h2>
          <p className="mb-12 max-w-2xl font-medium text-[#333]">{t.experience.intro}</p>

          <div className="relative">
            <div
              className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[3px] bg-[#141414] -translate-x-1/2"
              aria-hidden="true"
            />

            <div className="space-y-10 md:space-y-14">
              {experience.map((job, index) => {
                const accent = accents[index % accents.length];
                const current = isCurrentRole(job.period);
                const fromLeft = index % 2 === 0;
                const indexLabel = String(index + 1).padStart(2, '0');

                return (
                  <motion.article
                    key={`${job.company}-${job.period}`}
                    initial={{ opacity: 0, x: fromLeft ? -28 : 28, y: 12 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.45, delay: index * 0.06 }}
                    className={`relative grid md:grid-cols-2 gap-6 md:gap-10 items-start pl-12 md:pl-0`}
                  >
                    <div
                      className={`absolute left-4 md:left-1/2 top-6 z-10 -translate-x-1/2 w-8 h-8 border-[3px] border-[#141414] ${accent.node} shadow-[3px_3px_0_#141414] flex items-center justify-center`}
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

                    <div className={`${fromLeft ? 'md:col-start-1 md:pr-10 md:text-right' : 'md:col-start-2 md:pl-10'} ${fromLeft ? '' : 'md:row-start-1'}`}>
                      <div
                        className={`${accent.card} p-5 sm:p-6 text-left ${fromLeft ? 'md:ml-auto' : ''} max-w-xl ${fromLeft ? 'md:mr-0' : ''} relative overflow-hidden group`}
                      >
                        <div className={`absolute left-0 top-0 bottom-0 w-2 ${accent.bar}`} aria-hidden="true" />

                        <div className="pl-3">
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <time className="font-mono text-[11px] font-bold bg-[#141414] text-white px-2.5 py-1">
                              {job.period}
                            </time>
                            {current && (
                              <span className="font-mono text-[11px] font-extrabold bg-[#f5c518] text-[#141414] border-2 border-[#141414] px-2 py-0.5 animate-pulse">
                                {nowLabel}
                              </span>
                            )}
                          </div>

                          <h3 className="font-display text-xl sm:text-2xl font-extrabold leading-tight mb-1">
                            {job.role}
                          </h3>
                          <p className="font-semibold text-[#141414]">
                            {job.company}
                          </p>
                          <p className="text-sm text-[#555] mt-0.5 mb-4">{job.type}</p>

                          <ul className="space-y-2.5 mb-5">
                            {job.highlights.map((item) => (
                              <li key={item} className="text-sm text-[#333] flex gap-2.5 leading-relaxed">
                                <span className={`mt-1.5 w-2 h-2 shrink-0 border-2 border-[#141414] ${accent.bar}`} aria-hidden="true" />
                                {item}
                              </li>
                            ))}
                          </ul>

                          <div className="flex flex-wrap gap-2 pt-4 border-t-[3px] border-[#141414]">
                            {job.technologies.map((tech, techIndex) => (
                              <span
                                key={tech}
                                className={`tag ${techIndex % 3 === 0 ? accent.tag : 'tag-soft'}`}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`hidden md:flex ${fromLeft ? 'md:col-start-2 md:pl-10' : 'md:col-start-1 md:pr-10 md:justify-end'} items-center`}
                      aria-hidden="true"
                    >
                      <p
                        className={`font-display text-5xl lg:text-6xl font-extrabold text-[#141414]/10 select-none leading-none ${
                          fromLeft ? '' : 'text-right'
                        }`}
                      >
                        {indexLabel}
                      </p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
