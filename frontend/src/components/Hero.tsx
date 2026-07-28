import { motion } from 'framer-motion';
import type { Profile } from '../types';
import { SocialIconLinks } from './SocialIconLinks';

interface HeroProps {
  profile: Profile;
}

export function Hero({ profile }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center section-padding overflow-x-hidden pt-24" aria-labelledby="hero-heading">
      <div
        className="absolute top-28 right-10 w-28 h-28 bg-[#f5c518] border-[3px] border-[#141414] rotate-12 hidden md:block"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-28 left-8 w-20 h-20 bg-[#3aa0ff] border-[3px] border-[#141414] -rotate-6 hidden md:block"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 right-[42%] w-14 h-14 bg-[#ff4d3a] border-[3px] border-[#141414] rotate-45 hidden xl:block"
        aria-hidden="true"
      />

      <div className="container-max relative">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
          <div>
            <motion.h1
              id="hero-heading"
              className="font-display text-[clamp(1.5rem,7vw,3.75rem)] font-extrabold tracking-tight mb-6 leading-[1.05]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <span className="bg-[#ff4d3a] text-white px-3 sm:px-4 py-2 border-[3px] border-[#141414] inline-block shadow-[6px_6px_0_#141414] text-left -rotate-1">
                <span className="block whitespace-nowrap">Full-Stack</span>
                <span className="block whitespace-nowrap">Web Developer</span>
              </span>
            </motion.h1>

            <motion.p
              className="text-lg text-[#6b2d5c] font-semibold mb-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
            >
              {profile.subtitle}
            </motion.p>

            <motion.p
              className="text-[#333] max-w-xl text-lg leading-relaxed mb-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
            >
              I build reliable PHP backends, clean React interfaces, and PDF systems that hold up in production.
              If you need someone who delivers, you are in the right place.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row sm:flex-wrap gap-3 mb-10 w-full"
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
              <a href="#projects" className="btn-ghost">
                View projects
              </a>
              <a href={`mailto:${profile.email}`} className="btn-ghost">
                Contact me
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              <SocialIconLinks socials={profile.socials} />
            </motion.div>
          </div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <div className="relative">
              <div
                className="absolute -bottom-4 -right-4 w-full h-full bg-[#0f9d8a] border-[3px] border-[#141414]"
                aria-hidden="true"
              />
              <img
                src={profile.photo}
                alt={`Portrait of ${profile.name}`}
                width={360}
                height={460}
                className="relative w-56 sm:w-72 md:w-80 max-w-[85vw] object-cover object-top border-[3px] border-[#141414] bg-white"
                loading="eager"
                fetchPriority="high"
              />
              <motion.p
                className="absolute left-2 right-2 sm:-left-4 sm:right-auto bottom-6 sm:bottom-12 bg-[#f5c518] text-[#141414] border-[3px] border-[#141414] px-3 py-2 font-display text-xs sm:text-sm font-extrabold uppercase tracking-wide shadow-[4px_4px_0_#141414] sm:max-w-[12rem] leading-snug text-center sm:text-left"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: [-6, -2, -6],
                }}
                transition={{
                  opacity: { delay: 0.4, duration: 0.3 },
                  scale: { delay: 0.4, type: 'spring', stiffness: 200 },
                  rotate: { delay: 0.6, duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
                }}
              >
                Hi, I am Dzhemile Ahmed
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
