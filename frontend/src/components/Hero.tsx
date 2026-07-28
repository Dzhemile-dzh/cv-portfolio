import { motion } from 'framer-motion';
import type { Profile } from '../types';
import { SocialIconLinks } from './SocialIconLinks';
import { useLanguage } from '../i18n/LanguageContext';

interface HeroProps {
  profile: Profile;
}

export function Hero({ profile }: HeroProps) {
  const { t } = useLanguage();

  return (
    <section
      className="relative min-h-[100svh] flex items-center overflow-x-hidden px-4 sm:px-6 lg:px-8 pt-20 pb-8"
      aria-labelledby="hero-heading"
    >
      <div
        className="absolute top-1/2 right-4 sm:right-10 w-10 h-10 sm:w-12 sm:h-12 bg-[#ff4d3a] border-[3px] border-[#141414] rotate-45 hidden sm:block"
        aria-hidden="true"
      />

      <div className="container-max relative w-full">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <motion.div
            className="relative mb-6 sm:mb-7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div
              className="absolute -bottom-2.5 -right-2.5 sm:-bottom-3 sm:-right-3 w-full h-full bg-[#0f9d8a]"
              aria-hidden="true"
            />
            <img
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              width={360}
              height={460}
              className="relative w-36 sm:w-44 md:w-48 object-cover object-top border-[3px] border-[#141414] bg-white"
              loading="eager"
              fetchPriority="high"
            />
            <motion.p
              className="absolute left-1/2 -translate-x-1/2 bottom-3 sm:bottom-4 bg-[#f5c518] text-[#141414] border-[3px] border-[#141414] px-2.5 py-1.5 font-display text-[0.6rem] sm:text-xs font-extrabold uppercase tracking-wide shadow-[3px_3px_0_#141414] whitespace-nowrap leading-snug"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: [-4, 0, -4],
              }}
              transition={{
                opacity: { delay: 0.35, duration: 0.3 },
                scale: { delay: 0.35, type: 'spring', stiffness: 200 },
                rotate: { delay: 0.55, duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              {t.hero.greeting}
            </motion.p>
          </motion.div>

          <motion.div
            className="relative mb-8 w-full max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.45 }}
          >
            <h1
              id="hero-heading"
              className="font-display text-[clamp(1.35rem,4.5vw,2.5rem)] font-extrabold tracking-tight leading-none bg-white text-[#141414] border-[3px] border-[#141414] shadow-[5px_5px_0_#141414] px-4 sm:px-6 py-3 sm:py-3.5 pb-5 sm:pb-6"
            >
              {t.hero.title}
            </h1>
            <motion.p
              className="absolute -bottom-5 right-2 sm:right-5 z-10 bg-[#f5c518] text-[#141414] border-[3px] border-[#141414] px-2.5 py-1.5 font-display text-[0.6rem] sm:text-xs font-extrabold uppercase tracking-wide shadow-[3px_3px_0_#141414] leading-tight text-left"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.35 }}
            >
              <span className="block whitespace-nowrap">{t.hero.subtitleLine1}</span>
              <span className="block whitespace-nowrap">{t.hero.subtitleLine2}</span>
            </motion.p>
          </motion.div>

          <motion.p
            className="text-[#333] text-[clamp(0.72rem,2.4vw,0.95rem)] leading-snug mb-6 max-w-4xl w-full px-1"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
          >
            <span className="block whitespace-nowrap">{t.hero.pitchLine1}</span>
            <span className="block whitespace-nowrap">{t.hero.pitchLine2}</span>
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-2.5 sm:gap-3 mb-6 w-full sm:w-auto"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
          >
            <a
              href="/DzhemileAhmedCV.pdf"
              download="DzhemileAhmedCV.pdf"
              className="btn-primary !py-2.5 !px-4 text-sm"
            >
              {t.hero.downloadCv}
            </a>
            <a
              href="#projects"
              className="btn-ghost !py-2.5 !px-4 text-sm !shadow-[4px_4px_0_#141414] hover:!shadow-[6px_6px_0_#141414]"
            >
              {t.hero.viewProjects}
            </a>
            <a href={`mailto:${profile.email}`} className="btn-ghost !py-2.5 !px-4 text-sm">
              {t.hero.contactMe}
            </a>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            <SocialIconLinks socials={profile.socials} className="justify-center" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
