import { motion } from 'framer-motion';
import { SectionLabel } from './About';
import type { Project } from '../types';

interface ProjectsSectionProps {
  projects: Project[];
}

const cardStyles = ['hard-card-coral', 'hard-card-teal', 'hard-card-mustard', 'hard-card-sky', 'hard-card'];

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section-padding section-band bg-[#fff3c4]" aria-labelledby="projects-heading">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45 }}
        >
          <SectionLabel>Projects</SectionLabel>
          <h2 id="projects-heading" className="font-display text-3xl sm:text-5xl font-extrabold mb-4">
            Selected projects
          </h2>
          <p className="text-[#333] mb-12 max-w-2xl font-medium">
            A mix of client work and personal projects. Some repos stay private under NDA,
            but the stack and outcomes are still here.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {featured.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} featured />
            ))}
          </div>

          {others.length > 0 && (
            <>
              <h3 className="font-display text-2xl font-extrabold mb-6">More projects</h3>
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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className={`${cardStyles[index % cardStyles.length]} p-6 flex flex-col ${featured ? 'md:min-h-[300px]' : ''}`}
    >
      <div className="flex items-start justify-between mb-3 gap-2">
        <span className="tag tag-ink">{project.category}</span>
        {project.featured && (
          <span className="tag tag-coral">Featured</span>
        )}
      </div>

      <h3 className="font-display text-xl font-extrabold mb-2">{project.title}</h3>
      <p className="text-sm text-[#333] leading-relaxed flex-grow mb-4">{project.description}</p>

      {featured && (
        <p className="text-xs leading-relaxed mb-4 border-l-4 border-[#141414] pl-3 text-[#555]">
          {project.longDescription}
        </p>
      )}

      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.technologies.map((tech) => (
          <span key={tech} className="tag tag-soft" style={{ background: '#eef6f3' }}>
            {tech}
          </span>
        ))}
      </div>

      {project.links.length > 0 ? (
        <div className="flex flex-wrap gap-3 mt-auto pt-4 border-t-2 border-[#141414]">
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
        <p className="mt-auto pt-4 border-t-2 border-[#141414] font-mono text-xs text-[#666]">
          Private client project
        </p>
      )}
    </motion.article>
  );
}
