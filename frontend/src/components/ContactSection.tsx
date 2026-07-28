import { motion } from 'framer-motion';
import { SectionLabel } from './About';
import { SocialIconLinks } from './SocialIconLinks';
import type { Profile } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface ContactSectionProps {
  profile: Profile;
}

export function ContactSection({ profile }: ContactSectionProps) {
  const { t } = useLanguage();

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
          <SectionLabel>{t.contact.label}</SectionLabel>
          <h2 id="contact-heading" className="font-display text-3xl sm:text-5xl font-extrabold mb-4 text-white">
            {t.contact.heading}
          </h2>
          <p className="text-white/95 mb-10 font-medium">{t.contact.intro}</p>

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

          <SocialIconLinks socials={profile.socials} className="justify-center" variant="dark" />
        </motion.div>
      </div>
    </section>
  );
}

export function Footer({ name }: { name: string }) {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  return (
    <footer className="py-8 bg-[#141414] text-[#f5c518]">
      <div className="container-max px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm font-medium">
        <p>
          &copy; {year} {name}
        </p>
        <p className="font-mono text-xs text-white/70">{t.footer.builtWith}</p>
      </div>
    </footer>
  );
}
