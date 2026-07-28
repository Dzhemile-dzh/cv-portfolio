import { motion } from 'framer-motion';
import { SectionLabel } from './About';

interface SkillsSectionProps {
  skills: Record<string, string[]>;
}

const categoryColors: Record<string, string> = {
  'Back-End': 'from-blue-500/20 to-cyan-500/10',
  'Front-End': 'from-violet-500/20 to-purple-500/10',
  'Databases': 'from-emerald-500/20 to-green-500/10',
  'Version Control': 'from-orange-500/20 to-amber-500/10',
  'Data Science': 'from-pink-500/20 to-rose-500/10',
  'DevOps & Tools': 'from-slate-500/20 to-gray-500/10',
};

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section id="skills" className="section-padding bg-slate-900/50" aria-labelledby="skills-heading">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel>Skills</SectionLabel>
          <h2 id="skills-heading" className="text-3xl sm:text-4xl font-bold mb-12">
            Technical <span className="gradient-text">Expertise</span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, items], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`glass rounded-2xl p-6 bg-gradient-to-br ${categoryColors[category] ?? 'from-indigo-500/10 to-transparent'}`}
              >
                <h3 className="font-semibold text-white mb-4">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg bg-slate-800/60 text-slate-300 text-sm hover:bg-indigo-500/20 hover:text-indigo-200 transition-colors cursor-default"
                    >
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
