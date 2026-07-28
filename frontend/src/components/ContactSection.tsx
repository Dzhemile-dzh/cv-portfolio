import { motion } from 'framer-motion';
import { SectionLabel } from './About';
import type { Profile } from '../types';

interface ContactSectionProps {
  profile: Profile;
}

export function ContactSection({ profile }: ContactSectionProps) {
  return (
    <section id="contact" className="section-padding section-band bg-[#ff4d3a]" aria-labelledby="contact-heading">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45 }}
          className="text-center max-w-2xl mx-auto"
        >
          <SectionLabel>Contact</SectionLabel>
          <h2 id="contact-heading" className="font-display text-3xl sm:text-5xl font-extrabold mb-4 text-white">
            Don&apos;t just stare. Write.
          </h2>
          <p className="text-white/90 mb-10 font-medium">
            Open to full-stack / backend roles, freelance printout chaos, and data science side quests.
            Recruiters with &quot;urgent opportunity&quot; templates — surprise me with specifics.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <a href={`mailto:${profile.email}`} className="btn-secondary w-full sm:w-auto">
              {profile.email}
            </a>
            <a
              href={`tel:${profile.phone.replace(/\s/g, '')}`}
              className="btn-ghost w-full sm:w-auto !bg-white"
            >
              {profile.phone}
            </a>
          </div>

          <div className="flex justify-center flex-wrap gap-3">
            {profile.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-white border-[3px] border-[#141414] font-bold text-sm shadow-[4px_4px_0_#141414] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_#141414] transition-all"
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
    <footer className="py-8 bg-[#141414] text-[#f5c518]">
      <div className="container-max px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm font-medium">
        <p>
          &copy; {year} {name}. Sarcasm included at no extra charge.
        </p>
        <p className="font-mono text-xs text-white/70">React + PHP 8.5 · zero purple gradients</p>
      </div>
    </footer>
  );
}
