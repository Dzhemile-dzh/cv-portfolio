import { motion } from 'framer-motion';
import { SectionLabel } from './About';
import type { Teaching } from '../types';

interface TeachingSectionProps {
  teaching: Teaching;
}

export function TeachingSection({ teaching }: TeachingSectionProps) {
  return (
    <section id="teaching" className="section-padding bg-slate-900/50" aria-labelledby="teaching-heading">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel>Teaching</SectionLabel>
          <h2 id="teaching-heading" className="text-3xl sm:text-4xl font-bold mb-4">
            Inspiring the Next <span className="gradient-text">Generation</span>
          </h2>
          <p className="text-slate-400 mb-12 max-w-2xl">
            {teaching.description}
          </p>

          <div className="glass rounded-2xl p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
              <div>
                <h3 className="text-2xl font-semibold text-white">{teaching.role}</h3>
                <p className="text-indigo-400 font-mono text-sm mt-2">{teaching.audience}</p>
              </div>
              <div className="flex gap-3">
                <span className="inline-flex items-center px-4 py-2 rounded-xl bg-red-500/10 text-red-300 text-sm border border-red-500/20">
                  Roblox
                </span>
                <span className="inline-flex items-center px-4 py-2 rounded-xl bg-green-500/10 text-green-300 text-sm border border-green-500/20">
                  Minecraft Education
                </span>
              </div>
            </div>

            <ul className="grid md:grid-cols-2 gap-4 mb-8">
              {teaching.highlights.map((item) => (
                <li key={item} className="text-slate-400 text-sm flex gap-3">
                  <span className="text-indigo-400 shrink-0 mt-0.5">▹</span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
              {teaching.technologies.map((tech) => (
                <span key={tech} className="px-3 py-1.5 rounded-lg bg-slate-800/60 text-slate-300 text-sm font-mono">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
