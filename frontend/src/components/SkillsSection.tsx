import { motion } from 'framer-motion';
import { SectionLabel } from './About';
import { useLanguage } from '../i18n/LanguageContext';

interface SkillsSectionProps {
  skills: Record<string, string[]>;
}

const categoryStyles = [
  'hard-card-coral',
  'hard-card-sky',
  'hard-card-teal',
  'hard-card-mustard',
  'hard-card',
  'hard-card-coral',
  'hard-card-teal',
];

export function SkillsSection({ skills }: SkillsSectionProps) {
  const { t } = useLanguage();

  return (
    <section id="skills" className="section-padding bg-[#ffe8e2]" aria-labelledby="skills-heading">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45 }}
        >
          <SectionLabel>{t.skills.label}</SectionLabel>
          <h2 id="skills-heading" className="font-display text-3xl sm:text-5xl font-extrabold mb-4">
            {t.skills.heading}
          </h2>
          <p className="mb-12 max-w-xl font-medium text-[#333]">{t.skills.intro}</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Object.entries(skills).map(([category, items], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className={`${categoryStyles[index % categoryStyles.length]} p-5`}
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
