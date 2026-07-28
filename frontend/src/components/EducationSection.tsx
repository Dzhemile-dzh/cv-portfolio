import { motion } from 'framer-motion';
import { SectionLabel } from './About';
import type { Education, Certification } from '../types';

interface EducationSectionProps {
  education: Education[];
  certifications: Certification[];
}

export function EducationSection({ education, certifications }: EducationSectionProps) {
  return (
    <section id="education" className="section-padding bg-[#e8f0ff]" aria-labelledby="education-heading">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45 }}
        >
          <SectionLabel>Education</SectionLabel>
          <h2 id="education-heading" className="font-display text-3xl sm:text-5xl font-extrabold mb-4">
            Education and certifications
          </h2>
          <p className="mb-12 max-w-xl font-medium text-[#333]">
            Formal studies plus verified certificates you can open and check.
          </p>

          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              <h3 className="font-display text-xl font-extrabold mb-5">School</h3>
              <div className="space-y-4">
                {education.map((edu, i) => (
                  <div
                    key={`${edu.institution}-${edu.period}`}
                    className={`${i % 2 === 0 ? 'hard-card-sky' : 'hard-card-mustard'} p-5`}
                  >
                    <time className="font-mono text-xs font-bold">{edu.period}</time>
                    <h4 className="font-bold mt-1">{edu.degree}</h4>
                    <p className="text-sm text-[#555] mt-1">{edu.institution}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-display text-xl font-extrabold mb-5">Certifications</h3>
              <div className="grid sm:grid-cols-2 gap-3">
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
  const styles = ['hard-card-coral', 'hard-card-teal', 'hard-card-mustard', 'hard-card-sky'];
  const className = `${styles[index % styles.length]} p-4 block group`;

  const content = (
    <>
      <h4 className="text-sm font-bold leading-snug group-hover:underline">{cert.name}</h4>
      <p className="text-xs text-[#555] mt-1">{cert.issuer}</p>
      {cert.url !== '' && (
        <span className="inline-block text-xs font-bold mt-2 text-[#ff4d3a]">
          verify certificate
        </span>
      )}
    </>
  );

  if (cert.url !== '') {
    return (
      <a href={cert.url} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
}
