import { motion } from 'framer-motion';
import { SectionLabel } from './About';

interface SkillsSectionProps {
  skills: Record<string, string[]>;
}

const categoryStyles: Record<string, string> = {
  'Back-End': 'hard-card-coral',
  'Front-End': 'hard-card-sky',
  Databases: 'hard-card-teal',
  'Version Control': 'hard-card-mustard',
  'Data Science': 'hard-card',
  'DevOps & Tools': 'hard-card-coral',
  'Teaching & Education Tech': 'hard-card-teal',
};

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section id="skills" className="section-padding bg-[#ffe8e2]" aria-labelledby="skills-heading">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45 }}
        >
          <SectionLabel>Skills</SectionLabel>
          <h2 id="skills-heading" className="font-display text-3xl sm:text-5xl font-extrabold mb-4">
            Technical skills
          </h2>
          <p className="mb-12 max-w-xl font-medium text-[#333]">
            Technologies I use day to day, from PHP backends to data tools and teaching platforms.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Object.entries(skills).map(([category, items], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className={`${categoryStyles[category] ?? 'hard-card'} p-5`}
              >
                <h3 className="font-display font-extrabold text-lg mb-4">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span key={skill} className="tag tag-soft">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
