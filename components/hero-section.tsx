'use client';

import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

const stats = [
  { emoji: '∞', label: 'Countless\nMemories' },
  { emoji: '🤍', label: 'Unbreakable\nBond' },
  { emoji: '✨', label: 'Endless\nLaughter' },
  { emoji: '🎂', label: 'Another Year\nof You!' },
];

export function HeroSection() {
  return (
    <section
      id="section-home"
      className="relative w-full min-h-screen overflow-hidden flex flex-col bg-[#080010]"
    >
      {/* Background Image Container */}
      <div
        className="absolute inset-0 z-0 bg-[length:auto_100%] sm:bg-cover bg-no-repeat bg-[position:80%_top] sm:bg-[position:center_top]"
        style={{
          backgroundImage: 'url(/birthday-bg.jpg)',
        }}
      />

      {/* Mobile-only gradient to hide baked-in elements on the left and bottom */}
      <div
        className="absolute inset-0 z-0 block sm:hidden"
        style={{
          background: `
            linear-gradient(to right, rgba(8,0,16,1) 0%, rgba(8,0,16,0.95) 45%, transparent 100%),
            linear-gradient(to top, rgba(8,0,16,1) 0%, rgba(8,0,16,0.9) 25%, transparent 100%)
          `,
        }}
      />

      {/* Desktop gradient overlay */}
      <div
        className="absolute inset-0 z-0 hidden sm:block"
        style={{
          background:
            'linear-gradient(to bottom, rgba(8,0,16,0.55) 0%, rgba(8,0,16,0.35) 40%, rgba(8,0,16,0.85) 100%)',
        }}
      />

      {/* Floating decorative hearts */}
      <motion.div
        animate={{ y: [0, -14, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 right-[12%] text-primary/50 text-3xl pointer-events-none z-10 hidden sm:block"
      >
        ♥
      </motion.div>
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        className="absolute top-[38%] left-[8%] text-secondary/40 text-2xl pointer-events-none z-10 hidden sm:block"
      >
        ♥
      </motion.div>
      <motion.div
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute bottom-[35%] right-[6%] pointer-events-none z-10"
      >
        <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-primary/60 fill-current" />
      </motion.div>

      {/* ── Main hero content ── */}
      <div className="relative z-10 flex flex-col justify-center flex-1 px-5 sm:px-10 lg:px-20 pt-24 pb-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-2 mb-4"
        >
          <Sparkles className="w-4 h-4 text-secondary" />
          <span className="text-secondary text-xs sm:text-sm font-semibold tracking-widest uppercase">
            A Special Celebration
          </span>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h1
            className="font-black leading-none mb-1"
            style={{
              fontSize: 'clamp(2.8rem, 9vw, 6rem)',
              color: '#fff',
              textShadow: '0 0 30px rgba(168,85,247,0.5)',
            }}
          >
            Happy Birthday,
          </h1>
          <h2
            className="font-black leading-none mb-5"
            style={{
              fontSize: 'clamp(3.2rem, 11vw, 7rem)',
              background: 'linear-gradient(135deg, #f472b6, #c084fc, #fb923c)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: 'none',
              filter: 'drop-shadow(0 0 20px rgba(192,132,252,0.6))',
            }}
          >
            Vaishu! 🎉
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-white/70 text-sm sm:text-base lg:text-lg max-w-md mb-7 leading-relaxed"
        >
          To my amazing bestie, my constant support,
          <br className="hidden sm:block" />
          my partner in crime, and my forever friend. 💜
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-10 sm:mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => {
              document.getElementById('section-messages')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-7 py-3.5 rounded-full text-white font-bold text-sm sm:text-base tracking-wide relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #9333ea, #ec4899)',
              boxShadow: '0 0 30px rgba(147,51,234,0.5)',
            }}
          >
            {/* Shimmer */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.2) 50%, transparent 65%)',
              }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
            <span className="relative z-10">Let&apos;s Celebrate 🎊</span>
          </motion.button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05, y: -3 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center gap-1.5 px-3 py-3 rounded-2xl text-center"
              style={{
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              <span className="text-xl sm:text-2xl">{stat.emoji}</span>
              <span className="text-white/80 text-xs sm:text-xs font-semibold leading-tight whitespace-pre-line">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="relative z-10 pb-8 flex flex-col items-center"
      >
        <p className="text-white/50 text-xs sm:text-sm mb-2">Scroll to Explore</p>
        <div className="w-5 h-9 sm:w-6 sm:h-10 border-2 border-white/40 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white/40 rounded-full mt-2 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}
