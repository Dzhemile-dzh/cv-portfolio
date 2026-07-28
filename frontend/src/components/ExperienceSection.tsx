import { motion } from 'framer-motion';
import { SectionLabel } from './About';
import type { Experience } from '../types';

interface ExperienceSectionProps {
  experience: Experience[];
}

const accents = ['hard-card-coral', 'hard-card-teal', 'hard-card-mustard', 'hard-card-sky', 'hard-card'];

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <section id="experience" className="section-padding bg-[#d9f5ef]" aria-labelledby="experience-heading">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45 }}
        >
          <SectionLabel>Experience</SectionLabel>
          <h2 id="experience-heading" className="font-display text-3xl sm:text-5xl font-extrabold mb-4">
            Work experience
          </h2>
          <p className="mb-12 max-w-2xl font-medium text-[#333]">
            Roles where I shipped real products, cleaned up legacy code, and kept things maintainable.
          </p>

          <div className="space-y-6">
            {experience.map((job, index) => (
              <motion.article
                key={`${job.company}-${job.period}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`${accents[index % accents.length]} p-6`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-display text-xl font-extrabold">{job.role}</h3>
                    <p className="font-semibold mt-1">
                      {job.company}{' '}
                      <span className="font-normal text-[#555]">· {job.type}</span>
                    </p>
                  </div>
                  <time className="font-mono text-xs font-bold bg-[#141414] text-white px-3 py-1">
                    {job.period}
                  </time>
                </div>

                <ul className="mt-4 space-y-2">
                  {job.highlights.map((item) => (
                    <li key={item} className="text-sm text-[#333] flex gap-2">
                      <span className="font-bold text-[#ff4d3a] shrink-0">/</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mt-5">
                  {job.technologies.map((tech) => (
                    <span key={tech} className="tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
