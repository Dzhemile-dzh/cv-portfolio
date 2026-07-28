import { motion } from 'framer-motion';
import { SectionLabel } from './About';
import type { Experience } from '../types';

interface ExperienceSectionProps {
  experience: Experience[];
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <section id="experience" className="section-padding bg-slate-900/50" aria-labelledby="experience-heading">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel>Experience</SectionLabel>
          <h2 id="experience-heading" className="text-3xl sm:text-4xl font-bold mb-12">
            Professional <span className="gradient-text">Journey</span>
          </h2>

          <div className="relative">
            <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-indigo-500/20 to-transparent lg:-translate-x-px" />

            <div className="space-y-12">
              {experience.map((job, index) => (
                <motion.article
                  key={`${job.company}-${job.period}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex flex-col lg:flex-row gap-8 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  <div className="hidden lg:block lg:w-1/2" />
                  <div className="absolute left-4 lg:left-1/2 w-3 h-3 rounded-full bg-indigo-500 border-4 border-slate-900 -translate-x-1/2 mt-2 z-10" />

                  <div className="lg:w-1/2 pl-12 lg:pl-0">
                    <div className={`glass rounded-2xl p-6 hover:border-indigo-500/30 transition-colors ${index % 2 === 0 ? 'lg:mr-8' : 'lg:ml-8'}`}>
                      <time className="font-mono text-sm text-indigo-400">{job.period}</time>
                      <h3 className="text-xl font-semibold mt-1 text-white">{job.role}</h3>
                      <p className="text-slate-400 text-sm mt-1">
                        {job.company} · <span className="text-slate-500">{job.type}</span>
                      </p>

                      <ul className="mt-4 space-y-2">
                        {job.highlights.map((item) => (
                          <li key={item} className="text-slate-400 text-sm flex gap-2">
                            <span className="text-indigo-400 shrink-0">▹</span>
                            {item}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {job.technologies.map((tech) => (
                          <span key={tech} className="px-2 py-0.5 rounded text-xs font-mono bg-slate-800 text-slate-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
