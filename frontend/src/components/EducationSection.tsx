import { motion } from 'framer-motion';
import { SectionLabel } from './About';
import type { Education, Certification } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface EducationSectionProps {
  education: Education[];
  certifications: Certification[];
}

export function EducationSection({ education, certifications }: EducationSectionProps) {
  const { t } = useLanguage();

  return (
    <section id="education" className="section-padding bg-[#e8f0ff]" aria-labelledby="education-heading">
      <div className="container-max">
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

          <div className="mb-14">
            <h3 className="font-display text-xl font-extrabold mb-5 inline-block bg-[#141414] text-[#f5c518] px-3 py-1">
              {t.education.school}
            </h3>

            <div className="hard-card overflow-hidden divide-y-[3px] divide-[#141414]">
              {education.map((edu, i) => (
                <motion.article
                  key={`${edu.institution}-${edu.period}`}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="grid sm:grid-cols-[9rem_1fr] gap-3 sm:gap-6 p-5 sm:p-6 bg-white hover:bg-[#fff8e8] transition-colors"
                >
                  <time className="font-mono text-sm font-bold text-[#0f9d8a] sm:pt-0.5">
                    {edu.period}
                  </time>
                  <div>
                    <h4 className="font-display text-lg sm:text-xl font-extrabold leading-snug">
                      {edu.degree}
                    </h4>
                    <p className="text-sm font-medium text-[#555] mt-1">{edu.institution}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl font-extrabold mb-5 inline-block bg-[#141414] text-[#f5c518] px-3 py-1">
              {t.education.certifications}
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {certifications.map((cert, i) => (
                <CertificationCard key={`${cert.name}-${cert.issuer}`} cert={cert} index={i} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CertificationCard({ cert, index }: { cert: Certification; index: number }) {
  const { t } = useLanguage();
  const accents = [
    { card: 'hard-card-coral', issuer: 'bg-[#ff4d3a] text-white' },
    { card: 'hard-card-teal', issuer: 'bg-[#0f9d8a] text-white' },
    { card: 'hard-card-mustard', issuer: 'bg-[#f5c518] text-[#141414]' },
    { card: 'hard-card-sky', issuer: 'bg-[#3aa0ff] text-[#141414]' },
  ];
  const accent = accents[index % accents.length];
  const hasLink = cert.url !== '';

  const body = (
    <>
      <p
        className={`inline-block self-start font-mono text-[10px] font-extrabold uppercase tracking-wide border-2 border-[#141414] px-2 py-0.5 mb-2 ${accent.issuer}`}
      >
        {cert.issuer}
      </p>
      <h4 className="font-bold text-xs sm:text-sm leading-snug flex-1">{cert.name}</h4>
      {hasLink && (
        <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-[#ff4d3a] group-hover:underline">
          {t.education.verify}
          <span aria-hidden="true">↗</span>
        </span>
      )}
    </>
  );

  const className = `${accent.card} p-3 flex flex-col min-h-0 group transition-transform hover:-translate-y-0.5`;

  if (hasLink) {
    return (
      <motion.a
        href={cert.url}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: index * 0.03 }}
        className={className}
      >
        {body}
      </motion.a>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.03 }}
      className={className}
    >
      {body}
    </motion.div>
  );
}
