import { motion } from 'framer-motion';
import { SectionLabel } from './About';
import type { Profile } from '../types';

interface HeroProps {
  profile: Profile;
}

export function Hero({ profile }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center section-padding overflow-hidden" aria-labelledby="hero-heading">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-violet-500/15 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container-max relative">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-mono text-indigo-400 text-sm mb-4 tracking-wider">
              // Hello, World
            </p>

            <h1 id="hero-heading" className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-4">
              I&apos;m <span className="gradient-text">{profile.name}</span>
            </h1>

            <p className="text-xl sm:text-2xl text-slate-300 mb-2">{profile.title}</p>
            <p className="text-lg text-indigo-300/80 mb-8">&lt;{profile.subtitle} /&gt;</p>

            <p className="text-slate-400 max-w-2xl text-lg leading-relaxed mb-10">
              {profile.about.slice(0, 200)}...
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <a
                href="#projects"
                className="inline-flex items-center px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-medium transition-all hover:shadow-lg hover:shadow-indigo-500/25"
              >
                View Projects
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center px-6 py-3 rounded-xl glass text-slate-200 font-medium hover:bg-white/10 transition-colors"
              >
                Contact Me
              </a>
              <a
                href="/DzhemileAhmedCV.pdf"
                download="DzhemileAhmedCV.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass text-slate-200 font-medium hover:bg-white/10 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download CV
              </a>
            </div>

            <div className="flex flex-wrap gap-3">
              {profile.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass text-sm text-slate-400 hover:text-white hover:border-indigo-500/50 transition-all"
                  aria-label={social.name}
                >
                  <SocialIcon icon={social.icon} />
                  {social.name}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-indigo-500/30 to-violet-500/20 rounded-3xl blur-2xl" />
              <img
                src={profile.photo}
                alt={`Portrait of ${profile.name}`}
                width={320}
                height={420}
                className="relative w-72 xl:w-80 rounded-2xl object-cover object-top border border-white/10 shadow-2xl shadow-indigo-500/10"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <a href="#about" className="text-slate-500 hover:text-slate-300" aria-label="Scroll to about">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function SocialIcon({ icon }: { icon: string }) {
  const paths: Record<string, string> = {
    linkedin: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z',
    github: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z',
    tableau: 'M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v8H8V8z',
  };

  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d={paths[icon] ?? paths.github} />
    </svg>
  );
}
