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
              yes, another portfolio — but with opinions
            </p>

            <h1 id="hero-heading" className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 leading-[1.05]">
              Hi, I&apos;m{' '}
              <span className="bg-[#ff4d3a] text-white px-2 border-[3px] border-[#141414] inline-block -rotate-1">
                {profile.name}
              </span>
            </h1>

            <p className="text-xl sm:text-2xl font-bold mb-2">{profile.title}</p>
            <p className="text-lg text-[#6b2d5c] font-semibold mb-6">
              Also: {profile.subtitle.toLowerCase()} (and professional sarcasm)
            </p>

            <p className="text-[#333] max-w-xl text-lg leading-relaxed mb-8">
              I write PHP that doesn&apos;t cry, React that behaves, and PDFs that print.
              If you&apos;re looking for buzzwords without delivery — wrong site.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <a href="#projects" className="btn-primary">
                Show me the work
              </a>
              <a href={`mailto:${profile.email}`} className="btn-secondary">
                Send coffee / job offer
              </a>
              <a href="/DzhemileAhmedCV.pdf" download="DzhemileAhmedCV.pdf" className="btn-ghost">
                Download the boring PDF
              </a>
            </div>

            <div className="flex flex-wrap gap-2">
              {profile.socials.map((social, i) => {
                const colors = ['bg-[#3aa0ff]', 'bg-[#141414] text-white', 'bg-[#f5c518]'];
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
              <p className="absolute -left-6 bottom-10 bg-[#f5c518] border-[3px] border-[#141414] px-3 py-2 font-mono text-xs font-semibold rotate-[-6deg] max-w-[10rem]">
                yes, this is me. no stock photo energy.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
