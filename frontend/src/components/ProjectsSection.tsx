import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SectionLabel } from './About';
import type { Project } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface ProjectsSectionProps {
  projects: Project[];
}

const cardStyles = ['hard-card-coral', 'hard-card-teal', 'hard-card-mustard', 'hard-card-sky', 'hard-card'];

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const { t } = useLanguage();
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);
  const [showOthers, setShowOthers] = useState(false);

  return (
    <section id="projects" className="section-padding section-band bg-[#fff3c4]" aria-labelledby="projects-heading">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45 }}
        >
          <SectionLabel>{t.projects.label}</SectionLabel>
          <h2 id="projects-heading" className="font-display text-3xl sm:text-5xl font-extrabold mb-4">
            {t.projects.heading}
          </h2>
          <p className="text-[#333] mb-10 max-w-2xl font-medium">{t.projects.intro}</p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {featured.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          {others.length > 0 && (
            <div className="flex flex-col items-center gap-6">
              <button
                type="button"
                className="btn-ghost !w-auto !px-5 !py-2 text-sm"
                onClick={() => setShowOthers((v) => !v)}
              >
                {t.projects.more}
              </button>

              <AnimatePresence initial={false}>
                {showOthers && (
                  <motion.div
                    key="others"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.25 }}
                    className="w-full"
                  >
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {others.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const hasLongDescription = project.longDescription.trim() !== '';

  return (
    <motion.article
      id={`projects/${project.id}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className={`${cardStyles[index % cardStyles.length]} p-4 flex flex-col`}
    >
      <div className="flex items-start justify-between mb-2 gap-2">
        <span className="tag tag-ink">{project.category}</span>
      </div>

      <h3 className="font-display text-lg font-extrabold mb-1 leading-snug">{project.title}</h3>
      <p className="text-sm text-[#333] leading-relaxed mb-3 flex-grow">{project.description}</p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.technologies.map((tech) => (
          <span key={tech} className="tag tag-soft" style={{ background: '#eef6f3' }}>
            {tech}
          </span>
        ))}
      </div>

      <AnimatePresence initial={false}>
        {expanded && hasLongDescription && (
          <motion.p
            key="long"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="text-xs leading-relaxed mb-3 border-l-4 border-[#141414] pl-3 text-[#555] overflow-hidden"
          >
            {project.longDescription}
          </motion.p>
        )}
      </AnimatePresence>

      {hasLongDescription && (
        <button
          type="button"
          className="btn-ghost !w-auto !px-3 !py-1 text-xs font-extrabold self-start mb-3"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? t.projects.seeLess : t.projects.seeMore}
        </button>
      )}

      {project.links.length > 0 ? (
        <div className="flex flex-wrap gap-3 mt-auto pt-3 border-t-2 border-[#141414]">
          {project.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold underline decoration-2 underline-offset-4 hover:text-[#ff4d3a]"
            >
              {link.label}
            </a>
          ))}
        </div>
      ) : (
        <p className="mt-auto pt-3 border-t-2 border-[#141414] font-mono text-xs text-[#666]">
          {t.projects.privateProject}
        </p>
      )}
    </motion.article>
  );
}
