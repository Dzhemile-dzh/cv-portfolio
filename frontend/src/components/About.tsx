import { motion } from 'framer-motion';
import type { Profile } from '../types';

interface AboutProps {
  profile: Profile;
}

export function About({ profile }: AboutProps) {
  return (
    <section id="about" className="section-padding" aria-labelledby="about-heading">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel>About Me</SectionLabel>
          <h2 id="about-heading" className="text-3xl sm:text-4xl font-bold mb-8">
            Building digital experiences with <span className="gradient-text">passion</span>
          </h2>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="lg:hidden flex justify-center">
                <img
                  src={profile.photo}
                  alt={`Portrait of ${profile.name}`}
                  width={200}
                  height={260}
                  className="w-48 rounded-2xl object-cover object-top border border-white/10 shadow-xl"
                  loading="lazy"
                />
              </div>
              <p className="text-slate-400 text-lg leading-relaxed">{profile.about}</p>
            </div>

            <div className="space-y-6">
              <InfoCard title="Location" value={profile.location} />
              <InfoCard title="Email" value={profile.email} href={`mailto:${profile.email}`} />
              <InfoCard title="Phone" value={profile.phone} href={`tel:${profile.phone.replace(/\s/g, '')}`} />

              <div className="glass rounded-xl p-5">
                <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-3">Languages</h3>
                <ul className="space-y-2">
                  {profile.languages.map((lang) => (
                    <li key={lang.name} className="flex justify-between text-sm">
                      <span className="text-slate-300">{lang.name}</span>
                      <span className="text-indigo-400 font-mono">{lang.level}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass rounded-xl p-5">
                <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-3">Hobbies</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.hobbies.map((hobby) => (
                    <span key={hobby} className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-sm">
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

function InfoCard({ title, value, href }: { title: string; value: string; href?: string }) {
  const content = href ? (
    <a href={href} className="text-slate-200 hover:text-indigo-400 transition-colors">{value}</a>
  ) : (
    <span className="text-slate-200">{value}</span>
  );

  return (
    <div className="glass rounded-xl p-5">
      <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">{title}</h3>
      {content}
    </div>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-indigo-400 text-sm mb-2 tracking-wider">// {children}</p>
  );
}
