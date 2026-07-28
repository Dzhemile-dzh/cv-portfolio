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
          <h2 id="about-heading" className="font-display text-3xl sm:text-5xl font-extrabold mb-8 max-w-3xl leading-tight">
            I ship code. I also teach kids to ship Roblox games.
            <span className="block text-[#ff4d3a] mt-2">Priorities, people.</span>
          </h2>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="lg:hidden flex justify-center">
                <img
                  src={profile.photo}
                  alt={`Portrait of ${profile.name}`}
                  width={200}
                  height={260}
                  className="w-48 object-cover object-top border-[3px] border-[#141414] shadow-[6px_6px_0_#ff4d3a]"
                  loading="lazy"
                />
              </div>
              <p className="text-[#333] text-lg leading-relaxed hard-card p-6">
                {profile.about}
              </p>
              <p className="font-mono text-sm bg-[#f5c518] border-[3px] border-[#141414] p-4 inline-block">
                Fun fact from my GitHub bio: sarcasm will save us. Still waiting on peer review for that claim.
              </p>
            </div>

            <div className="space-y-4">
              <InfoCard title="Currently nesting in" value={profile.location} color="teal" />
              <InfoCard title="Inbox (please use it)" value={profile.email} href={`mailto:${profile.email}`} color="coral" />
              <InfoCard title="Phone (humans only)" value={profile.phone} href={`tel:${profile.phone.replace(/\s/g, '')}`} color="sky" />

              <div className="hard-card-mustard p-5">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider mb-3">Languages I argue in</h3>
                <ul className="space-y-2">
                  {profile.languages.map((lang) => (
                    <li key={lang.name} className="flex justify-between text-sm font-semibold">
                      <span>{lang.name}</span>
                      <span className="font-mono text-[#6b2d5c]">{lang.level}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="hard-card-coral p-5">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider mb-3">Off-duty chaos</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.hobbies.map((hobby) => (
                    <span key={hobby} className="tag bg-[#ffe8e2]">
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
    <a href={href} className="font-semibold hover:underline break-all">
      {value}
    </a>
  ) : (
    <span className="font-semibold">{value}</span>
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
