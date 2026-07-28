import { motion } from 'framer-motion';
import { SectionLabel } from './About';
import type { Teaching } from '../types';

interface TeachingSectionProps {
  teaching: Teaching;
}

export function TeachingSection({ teaching }: TeachingSectionProps) {
  return (
    <section id="teaching" className="section-padding section-band bg-white" aria-labelledby="teaching-heading">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45 }}
        >
          <SectionLabel>Teaching</SectionLabel>
          <h2 id="teaching-heading" className="font-display text-3xl sm:text-5xl font-extrabold mb-4">
            Teaching programming to kids
          </h2>
          <p className="text-[#333] mb-10 max-w-2xl font-medium">
            {teaching.description}
          </p>

          <div className="hard-card-teal p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
              <div>
                <h3 className="font-display text-2xl font-extrabold">{teaching.role}</h3>
                <p className="font-mono text-sm font-bold mt-2 bg-[#f5c518] text-[#141414] inline-block px-2 py-1 border-2 border-[#141414]">
                  {teaching.audience}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="tag tag-coral">Roblox</span>
                <span className="tag tag-teal">Minecraft Education</span>
              </div>
            </div>

            <ul className="grid md:grid-cols-2 gap-4 mb-8">
              {teaching.highlights.map((item) => (
                <li key={item} className="text-sm text-[#333] flex gap-3">
                  <span className="font-bold text-[#ff4d3a] shrink-0">/</span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 pt-6 border-t-[3px] border-[#141414]">
              {teaching.technologies.map((tech) => (
                <span key={tech} className="tag tag-soft">
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
