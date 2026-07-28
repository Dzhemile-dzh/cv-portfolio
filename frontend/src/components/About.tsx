import { motion } from 'framer-motion';
import type { Profile } from '../types';

interface AboutProps {
  profile: Profile;
}

export function About({ profile }: AboutProps) {
  return (
    <section id="about" className="section-padding section-band bg-[#fff8f5]" aria-labelledby="about-heading">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45 }}
        >
          <SectionLabel>About</SectionLabel>

          <div className="grid lg:grid-cols-[1.4fr_0.9fr] gap-8 lg:gap-10 items-start">
            <div>
              <h2 id="about-heading" className="font-display text-3xl sm:text-5xl font-extrabold mb-6 max-w-3xl leading-tight">
                Turning complex systems into clean, working software.
              </h2>
              <p className="text-[#333] text-lg leading-relaxed">
                {profile.about}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <InfoCard title="Location" value={profile.location} color="teal" />
              <InfoCard title="Email" value={profile.email} href={`mailto:${profile.email}`} color="coral" />
              <InfoCard title="Phone" value={profile.phone} href={`tel:${profile.phone.replace(/\s/g, '')}`} color="sky" />

              <div className="hard-card-mustard p-5">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider mb-3">Languages</h3>
                <ul className="space-y-2">
                  {profile.languages.map((lang) => (
                    <li key={lang.name} className="flex justify-between text-sm font-semibold gap-2">
                      <span>{lang.name}</span>
                      <span className="font-mono text-[#6b2d5c]">{lang.level}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="hard-card-coral p-5">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider mb-3">Hobbies</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.hobbies.map((hobby) => (
                    <span key={hobby} className="tag tag-soft" style={{ background: '#ffe8e2' }}>
                      {hobby}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function InfoCard({
  title,
  value,
  href,
  color,
}: {
  title: string;
  value: string;
  href?: string;
  color: 'teal' | 'coral' | 'sky';
}) {
  const cardClass =
    color === 'teal' ? 'hard-card-teal' : color === 'coral' ? 'hard-card-coral' : 'hard-card-sky';

  const content = href ? (
    <a href={href} className="font-semibold hover:underline break-all text-sm">
      {value}
    </a>
  ) : (
    <span className="font-semibold text-sm">{value}</span>
  );

  return (
    <div className={`${cardClass} p-5`}>
      <h3 className="text-xs font-mono font-bold uppercase tracking-wider mb-1">{title}</h3>
      {content}
    </div>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] mb-3 inline-block bg-[#141414] text-[#f5c518] px-3 py-1">
      {children}
    </p>
  );
}
