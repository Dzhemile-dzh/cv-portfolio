import { motion } from 'framer-motion';
import { SectionLabel } from './About';
import type { Education, Certification } from '../types';

interface EducationSectionProps {
  education: Education[];
  certifications: Certification[];
}

export function EducationSection({ education, certifications }: EducationSectionProps) {
  return (
    <section id="education" className="section-padding" aria-labelledby="education-heading">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel>Education & Certifications</SectionLabel>
          <h2 id="education-heading" className="text-3xl sm:text-4xl font-bold mb-12">
            Learning & <span className="gradient-text">Growth</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-lg font-semibold mb-6 text-slate-300">Education</h3>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={`${edu.institution}-${edu.period}`} className="glass rounded-xl p-5">
                    <time className="font-mono text-xs text-indigo-400">{edu.period}</time>
                    <h4 className="font-semibold text-white mt-1">{edu.degree}</h4>
                    <p className="text-slate-400 text-sm mt-1">{edu.institution}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6 text-slate-300">Certifications</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {certifications.map((cert) => (
                  <CertificationCard key={`${cert.name}-${cert.issuer}`} cert={cert} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CertificationCard({ cert }: { cert: Certification }) {
  const content = (
    <>
      <h4 className="text-sm font-medium text-white leading-snug group-hover:text-indigo-300 transition-colors">
        {cert.name}
      </h4>
      <p className="text-xs text-slate-500 mt-1">{cert.issuer}</p>
      {cert.url !== '' && (
        <span className="inline-flex items-center gap-1 text-xs text-indigo-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          View certificate
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </span>
      )}
    </>
  );

  if (cert.url !== '') {
    return (
      <a
        href={cert.url}
        target="_blank"
        rel="noopener noreferrer"
        className="glass rounded-xl p-4 group hover:border-indigo-500/30 transition-all block"
      >
        {content}
      </a>
    );
  }

  return <div className="glass rounded-xl p-4">{content}</div>;
}
