import { motion } from 'framer-motion';
import type { Profile } from '../types';

interface HeroProps {
  profile: Profile;
}

export function Hero({ profile }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center section-padding overflow-hidden pt-24" aria-labelledby="hero-heading">
      <div className="absolute top-24 right-8 w-28 h-28 bg-[#f5c518] border-[3px] border-[#141414] rotate-12 hidden md:block" aria-hidden="true" />
      <div className="absolute bottom-24 left-6 w-20 h-20 bg-[#3aa0ff] border-[3px] border-[#141414] -rotate-6 hidden md:block" aria-hidden="true" />

      <div className="container-max relative">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <p className="font-mono text-sm mb-4 bg-[#0f9d8a] text-white inline-block px-3 py-1 border-2 border-[#141414]">
              Full-stack developer based in Varna
            </p>

            <p className="font-display text-2xl sm:text-3xl font-bold text-[#555] mb-3">
              Hi, I&apos;m {profile.name}
            </p>

            <h1 id="hero-heading" className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 leading-[1.05]">
              <span className="bg-[#ff4d3a] text-white px-3 py-1 border-[3px] border-[#141414] inline-block -rotate-1">
                {profile.title}
              </span>
            </h1>

            <p className="text-lg text-[#6b2d5c] font-semibold mb-6">
              {profile.subtitle}
            </p>

            <p className="text-[#333] max-w-xl text-lg leading-relaxed mb-8">
              I build reliable PHP backends, clean React interfaces, and PDF systems that hold up in production.
              If you need someone who delivers, you are in the right place.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <a href="#projects" className="btn-primary">
                View projects
              </a>
              <a href={`mailto:${profile.email}`} className="btn-secondary">
                Contact me
              </a>
              <a href="/DzhemileAhmedCV.pdf" download="DzhemileAhmedCV.pdf" className="btn-ghost">
                Download CV
              </a>
            </div>

            <div className="flex flex-wrap gap-2">
              {profile.socials.map((social, i) => {
                const colors = ['bg-[#3aa0ff] text-[#141414]', 'bg-[#141414] text-white', 'bg-[#f5c518] text-[#141414]'];
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-3 py-2 text-sm font-bold border-[3px] border-[#141414] ${colors[i % 3]}`}
                  >
                    {social.name}
                  </a>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative">
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-[#0f9d8a] border-[3px] border-[#141414]" aria-hidden="true" />
              <img
                src={profile.photo}
                alt={`Portrait of ${profile.name}`}
                width={360}
                height={460}
                className="relative w-80 object-cover object-top border-[3px] border-[#141414] bg-white"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
