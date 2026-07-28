import { motion } from 'framer-motion';
import { SectionLabel } from './About';
import type { Profile } from '../types';

interface ContactSectionProps {
  profile: Profile;
}

export function ContactSection({ profile }: ContactSectionProps) {
  return (
    <section id="contact" className="section-padding bg-slate-900/50" aria-labelledby="contact-heading">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <SectionLabel>Contact</SectionLabel>
          <h2 id="contact-heading" className="text-3xl sm:text-4xl font-bold mb-4">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-slate-400 mb-10">
            Open to new opportunities in full-stack development and data science. Reach out anytime.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-medium transition-all hover:shadow-lg hover:shadow-indigo-500/25 w-full sm:w-auto justify-center"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {profile.email}
            </a>
            <a
              href={`tel:${profile.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl glass text-slate-200 font-medium hover:bg-white/10 transition-colors w-full sm:w-auto justify-center"
            >
              {profile.phone}
            </a>
          </div>

          <div className="flex justify-center gap-4">
            {profile.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl glass text-slate-300 hover:text-indigo-400 hover:border-indigo-500/30 transition-all text-sm font-medium"
              >
                {social.name}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function Footer({ name }: { name: string }) {
  const year = new Date().getFullYear();
  return (
    <footer className="py-8 border-t border-white/5">
      <div className="container-max px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
        <p>&copy; {year} {name}. All rights reserved.</p>
        <p className="font-mono text-xs">Built with React & PHP 8.5</p>
      </div>
    </footer>
  );
}
