import { motion } from 'framer-motion';
import { SectionLabel } from './About';
import type { Project } from '../types';

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section-padding" aria-labelledby="projects-heading">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel>Projects</SectionLabel>
          <h2 id="projects-heading" className="text-3xl sm:text-4xl font-bold mb-4">
            Featured <span className="gradient-text">Work</span>
          </h2>
          <p className="text-slate-400 mb-12 max-w-2xl">
            A selection of projects showcasing full-stack development, backend architecture, and data visualization expertise.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {featured.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} featured />
            ))}
          </div>

          {others.length > 0 && (
            <>
              <h3 className="text-xl font-semibold mb-6 text-slate-300">Other Projects</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {others.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, featured = false }: { project: Project; index: number; featured?: boolean }) {
  return (
    <motion.article
      id={`projects/${project.id}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={`glass rounded-2xl p-6 flex flex-col hover:border-indigo-500/30 transition-all group ${
        featured ? 'md:min-h-[320px]' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">{project.category}</span>
        {project.featured && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">Featured</span>
        )}
      </div>

      <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors mb-2">
        {project.title}
      </h3>

      <p className="text-slate-400 text-sm leading-relaxed flex-grow mb-4">
        {project.description}
      </p>

      {featured && (
        <p className="text-slate-500 text-xs leading-relaxed mb-4 border-l-2 border-indigo-500/30 pl-3">
          {project.longDescription}
        </p>
      )}

      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.technologies.map((tech) => (
          <span key={tech} className="px-2 py-0.5 rounded text-xs font-mono bg-slate-800/80 text-slate-400">
            {tech}
          </span>
        ))}
      </div>

      {project.links.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-auto pt-4 border-t border-white/5">
          {project.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              {link.label}
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          ))}
        </div>
      )}
    </motion.article>
  );
}
