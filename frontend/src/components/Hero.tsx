import { motion } from 'framer-motion';
import type { Profile } from '../types';

interface HeroProps {
  profile: Profile;
}

export function Hero({ profile }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center section-padding overflow-hidden pt-24" aria-labelledby="hero-heading">
      <motion.div
        className="absolute top-28 right-10 w-28 h-28 bg-[#f5c518] border-[3px] border-[#141414] hidden md:block"
        aria-hidden="true"
        animate={{ rotate: [12, 20, 12], y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-28 left-8 w-20 h-20 bg-[#3aa0ff] border-[3px] border-[#141414] hidden md:block"
        aria-hidden="true"
        animate={{ rotate: [-6, -14, -6], y: [0, 10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/2 right-[42%] w-14 h-14 bg-[#ff4d3a] border-[3px] border-[#141414] hidden xl:block"
        aria-hidden="true"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />

      <div className="container-max relative">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
          <div>
            <motion.h1
              id="hero-heading"
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-[1.05]"
              initial={{ opacity: 0, x: -40, rotate: -4 }}
              animate={{ opacity: 1, x: 0, rotate: -1 }}
              transition={{ type: 'spring', stiffness: 120, damping: 14 }}
            >
              <span className="bg-[#ff4d3a] text-white px-4 py-2 border-[3px] border-[#141414] inline-block shadow-[6px_6px_0_#141414]">
                <span className="block">Full-Stack</span>
                <span className="block">Web Developer</span>
              </span>
            </motion.h1>

            <motion.p
              className="text-lg text-[#6b2d5c] font-semibold mb-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.45 }}
            >
              {profile.subtitle}
            </motion.p>

            <motion.p
              className="text-[#333] max-w-xl text-lg leading-relaxed mb-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.45 }}
            >
              I build reliable PHP backends, clean React interfaces, and PDF systems that hold up in production.
              If you need someone who delivers, you are in the right place.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.45 }}
            >
              <motion.a
                href="#projects"
                className="btn-primary"
                whileHover={{ y: -3, x: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                View projects
              </motion.a>
              <motion.a
                href={`mailto:${profile.email}`}
                className="btn-secondary"
                whileHover={{ y: -3, x: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Contact me
              </motion.a>
              <motion.a
                href="/DzhemileAhmedCV.pdf"
                download="DzhemileAhmedCV.pdf"
                className="btn-ghost"
                whileHover={{ y: -3, x: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Download CV
              </motion.a>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
            >
              {profile.socials.map((social, i) => {
                const colors = ['bg-[#3aa0ff] text-[#141414]', 'bg-[#141414] text-white', 'bg-[#f5c518] text-[#141414]'];
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-3 py-2 text-sm font-bold border-[3px] border-[#141414] ${colors[i % 3]}`}
                    whileHover={{ y: -4, rotate: i % 2 === 0 ? -2 : 2 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    {social.name}
                  </motion.a>
                );
              })}
            </motion.div>
          </div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.88, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 14, delay: 0.15 }}
          >
            <motion.div
              className="relative"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <motion.div
                className="absolute -bottom-4 -right-4 w-full h-full bg-[#0f9d8a] border-[3px] border-[#141414]"
                aria-hidden="true"
                animate={{ x: [0, 4, 0], y: [0, 4, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <img
                src={profile.photo}
                alt={`Portrait of ${profile.name}`}
                width={360}
                height={460}
                className="relative w-72 sm:w-80 object-cover object-top border-[3px] border-[#141414] bg-white"
                loading="eager"
                fetchPriority="high"
              />
              <motion.p
                className="absolute -left-3 sm:-left-6 bottom-8 sm:bottom-12 bg-[#f5c518] text-[#141414] border-[3px] border-[#141414] px-3 py-2 font-display text-xs sm:text-sm font-extrabold uppercase tracking-wide shadow-[4px_4px_0_#141414] max-w-[11rem] sm:max-w-[12rem] leading-snug"
                initial={{ opacity: 0, rotate: -12, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  rotate: [-6, -3, -6],
                  scale: 1,
                }}
                transition={{
                  opacity: { delay: 0.5, duration: 0.35 },
                  scale: { delay: 0.5, type: 'spring', stiffness: 200 },
                  rotate: { delay: 0.8, duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
                }}
              >
                Hi I am Dzhemile Ahmed
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
