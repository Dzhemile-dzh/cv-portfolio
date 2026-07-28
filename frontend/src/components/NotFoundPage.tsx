import { motion } from 'framer-motion';

export function NotFoundPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16 relative overflow-hidden">
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
          ERROR 404
        </motion.p>

        <motion.h1
          className="font-display text-6xl sm:text-8xl font-extrabold mb-6"
          initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: -2 }}
          transition={{ type: 'spring', stiffness: 140, damping: 12 }}
        >
          <span className="bg-[#ff4d3a] text-white px-4 py-2 border-[3px] border-[#141414] inline-block shadow-[8px_8px_0_#141414]">
            Lost?
          </span>
        </motion.h1>

        <motion.p
          className="text-lg text-[#333] mb-4 font-medium"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          This page does not exist. Or it did, and then someone refactor-deleted it without telling anyone.
        </motion.p>

        <motion.p
          className="font-mono text-sm bg-[#f5c518] border-[3px] border-[#141414] inline-block px-4 py-3 mb-10 shadow-[4px_4px_0_#141414]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          Status: still not hired from this URL either.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-3 justify-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <a href="/" className="btn-primary w-full sm:w-auto">
            Take me home
          </a>
          <a href="mailto:dzhemile.ahmet@gmail.com" className="btn-ghost w-full sm:w-auto">
            Blame me by email
          </a>
        </motion.div>
      </div>
    </main>
  );
}
