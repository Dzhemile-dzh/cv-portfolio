import { motion } from 'framer-motion';
import type { Profile } from '../types';
import { SocialIconLinks } from './SocialIconLinks';

interface HeroProps {
  profile: Profile;
}

export function Hero({ profile }: HeroProps) {
  return (
    <section
      className="relative min-h-screen flex items-center section-padding overflow-x-hidden pt-24"
      aria-labelledby="hero-heading"
    >
      <div
        className="absolute top-1/2 right-4 sm:right-10 w-12 h-12 sm:w-14 sm:h-14 bg-[#ff4d3a] border-[3px] border-[#141414] rotate-45"
        aria-hidden="true"
      />

      <div className="container-max relative w-full">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <motion.div
            className="relative mb-10 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div
              className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-full h-full bg-[#0f9d8a] border-[3px] border-[#141414]"
              aria-hidden="true"
            />
            <img
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              width={360}
              height={460}
              className="relative w-48 sm:w-56 md:w-64 object-cover object-top border-[3px] border-[#141414] bg-white"
              loading="eager"
              fetchPriority="high"
            />
            <motion.p
              className="absolute left-1/2 -translate-x-1/2 bottom-4 sm:bottom-6 bg-[#f5c518] text-[#141414] border-[3px] border-[#141414] px-3 py-2 font-display text-[0.65rem] sm:text-xs font-extrabold uppercase tracking-wide shadow-[4px_4px_0_#141414] whitespace-nowrap leading-snug"
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
              Hi, I am Dzhemile Ahmed
            </motion.p>
          </motion.div>

          <motion.div
            className="relative mb-8 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.45 }}
          >
            <h1
              id="hero-heading"
              className="font-display text-[clamp(1.65rem,6.5vw,3.5rem)] font-extrabold tracking-tight leading-[1.1] bg-white text-[#141414] border-[3px] border-[#141414] shadow-[6px_6px_0_#141414] px-4 sm:px-8 py-5 sm:py-6"
            >
              Full-Stack Web Developer
            </h1>
            <motion.p
              className="absolute -bottom-3 right-2 sm:right-6 bg-[#f5c518] text-[#141414] border-[3px] border-[#141414] px-3 py-1.5 font-display text-[0.65rem] sm:text-xs font-extrabold uppercase tracking-wide shadow-[3px_3px_0_#141414]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.35 }}
            >
              {profile.subtitle}
            </motion.p>
          </motion.div>

          <motion.p
            className="text-[#333] text-base sm:text-lg leading-relaxed mb-8 max-w-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
          >
            I build reliable PHP backends, clean React interfaces, and PDF systems that hold up in production.
            If you need someone who delivers, you are in the right place.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 mb-10 w-full sm:w-auto"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
          >
            <a
              href="/DzhemileAhmedCV.pdf"
              download="DzhemileAhmedCV.pdf"
              className="btn-primary"
            >
              Download CV
            </a>
            <a href="#projects" className="btn-ghost !shadow-[4px_4px_0_#141414] hover:!shadow-[6px_6px_0_#141414]">
              View projects
            </a>
            <a href={`mailto:${profile.email}`} className="btn-ghost">
              Contact me
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
