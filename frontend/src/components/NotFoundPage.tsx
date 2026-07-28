import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageSwitcher } from '../i18n/LanguageSwitcher';

export function NotFoundPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16 relative overflow-hidden">
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>
      <motion.div
        className="absolute top-16 left-8 w-20 h-20 bg-[#f5c518] border-[3px] border-[#141414]"
        aria-hidden="true"
        animate={{ rotate: [0, 12, 0], y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-24 h-24 bg-[#3aa0ff] border-[3px] border-[#141414]"
        aria-hidden="true"
        animate={{ rotate: [0, -10, 0], x: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative max-w-xl w-full text-center">
        <motion.p
          className="font-mono text-sm font-bold bg-[#141414] text-[#f5c518] inline-block px-3 py-1 mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {t.notFound.error}
        </motion.p>

        <motion.h1
          className="font-display text-6xl sm:text-8xl font-extrabold mb-6"
          initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: -2 }}
          transition={{ type: 'spring', stiffness: 140, damping: 12 }}
        >
          <span className="bg-[#ff4d3a] text-white px-4 py-2 border-[3px] border-[#141414] inline-block shadow-[8px_8px_0_#141414]">
            {t.notFound.title}
          </span>
        </motion.h1>

        <motion.p
          className="text-lg text-[#333] mb-4 font-medium"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          {t.notFound.body}
        </motion.p>

        <motion.p
          className="font-mono text-sm bg-[#f5c518] border-[3px] border-[#141414] inline-block px-4 py-3 mb-10 shadow-[4px_4px_0_#141414]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          {t.notFound.status}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-3 justify-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <a href="/" className="btn-primary w-full sm:w-auto">
            {t.notFound.home}
          </a>
          <a href="mailto:dzhemile.ahmet@gmail.com" className="btn-ghost w-full sm:w-auto">
            {t.notFound.email}
          </a>
        </motion.div>
      </div>
    </main>
  );
}
