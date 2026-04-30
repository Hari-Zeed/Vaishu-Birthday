'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, Sparkles, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Memory {
  id: number;
  title: string;
  description: string;
  emoji: string;
  tag: string;
  color: string;
  accentColor: string;
  story: string;
  details: string[];
  bgPattern: string;
}

const memories: Memory[] = [
  {
    id: 1,
    title: 'Late Night Chats',
    description: 'Endless talks, endless laughs.',
    emoji: '☕',
    tag: 'ALWAYS THERE',
    color: '#c084fc',
    accentColor: '#e879f9',
    story: 'Those 2 AM conversations that turned minutes into hours. Every problem felt smaller, every dream felt possible.',
    details: ['Lost track of time so many times', 'Laughed till it hurt', "Solved the world's problems"],
    bgPattern:
      'radial-gradient(circle at 20% 80%, rgba(192,132,252,0.15) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(232,121,249,0.1) 0%, transparent 60%)',
  },
  {
    id: 2,
    title: 'Exam Time Warriors',
    description: 'Stressful yet unforgettable days.',
    emoji: '📚',
    tag: 'STUDY SQUAD',
    color: '#fb923c',
    accentColor: '#f97316',
    story: 'Panic studying at 11 PM, sharing notes at midnight, motivating each other when it felt impossible.',
    details: ['All-nighters survived together', 'Shared notes & snacks', 'Celebrated every pass'],
    bgPattern:
      'radial-gradient(circle at 80% 80%, rgba(251,146,60,0.15) 0%, transparent 60%), radial-gradient(circle at 20% 20%, rgba(249,115,22,0.1) 0%, transparent 60%)',
  },
  {
    id: 3,
    title: 'Random Adventures',
    description: "The silly moments we'll never forget.",
    emoji: '🎉',
    tag: 'FUN MEMORIES',
    color: '#34d399',
    accentColor: '#10b981',
    story: 'That one random trip, the inside jokes nobody else gets, the weird traditions only we understand.',
    details: ['Inside jokes for life', 'Spontaneous hangouts', 'Adventures big & small'],
    bgPattern: 'radial-gradient(circle at 50% 20%, rgba(52,211,153,0.15) 0%, transparent 60%)',
  },
  {
    id: 4,
    title: 'Always There For Each Other',
    description: 'Through thick and thin, always together.',
    emoji: '🤝',
    tag: 'RIDE OR DIE',
    color: '#60a5fa',
    accentColor: '#3b82f6',
    story: "No matter what — breakdowns, bad days, or bad decisions — you always showed up. That's what real friendship is.",
    details: ['Never judged, always supported', 'Kept every secret safe', 'Showed up every single time'],
    bgPattern: 'radial-gradient(circle at 30% 50%, rgba(96,165,250,0.15) 0%, transparent 60%)',
  },
  {
    id: 5,
    title: 'Food & Feast Runs',
    description: 'Every mood solved with food.',
    emoji: '🍕',
    tag: 'FOODIE SQUAD',
    color: '#f472b6',
    accentColor: '#ec4899',
    story: 'Whether it was celebrating, venting, or just bored — food was always the answer and you were always the company.',
    details: ['Tried every new place', 'Split bills (mostly fair)', 'Food coma together 😂'],
    bgPattern: 'radial-gradient(circle at 70% 30%, rgba(244,114,182,0.15) 0%, transparent 60%)',
  },
  {
    id: 6,
    title: 'Growing Up Together',
    description: 'From strangers to chosen family.',
    emoji: '🌟',
    tag: 'FOREVER BOND',
    color: '#fbbf24',
    accentColor: '#f59e0b',
    story: "We've changed, grown, stumbled, and risen — but through it all, we did it side by side. Here's to many more years.",
    details: ["Witnessed each other's glow-up", 'Celebrated milestones', "Written into each other's story"],
    bgPattern: 'radial-gradient(circle at 50% 50%, rgba(251,191,36,0.15) 0%, transparent 60%)',
  },
];

function FloatingParticles({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 10 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 4,
            height: 4,
            background: color,
            left: `${10 + i * 9}%`,
            top: `${15 + ((i * 17) % 70)}%`,
            boxShadow: `0 0 6px ${color}`,
          }}
          animate={{
            y: [0, -25, 0],
            x: [0, i % 2 === 0 ? 8 : -8, 0],
            opacity: [0.2, 0.55, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + (i % 3),
            repeat: Infinity,
            delay: i * 0.3,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

function DetailItem({ text, color, index }: { text: string; color: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.35 }}
      className="flex items-center gap-2"
    >
      <motion.div
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ background: color, boxShadow: `0 0 6px ${color}` }}
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: index * 0.35 }}
      />
      <span className="text-white/65 text-xs">{text}</span>
    </motion.div>
  );
}

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0, scale: 0.95 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0, scale: 0.95 }),
};

export function CarouselSection() {
  const [current, setCurrent] = useState(0);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [direction, setDirection] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const memory = memories[current];
  const next1 = memories[(current + 1) % memories.length];
  const next2 = memories[(current + 2) % memories.length];

  const goTo = (index: number, dir: number) => {
    setDirection(dir);
    setCurrent(index);
    setIsAutoPlaying(false);
    if (autoRef.current) clearTimeout(autoRef.current);
    autoRef.current = setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const handleNext = () => goTo((current + 1) % memories.length, 1);
  const handlePrev = () => goTo((current - 1 + memories.length) % memories.length, -1);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % memories.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <section
      id="section-messages"
      className="min-h-screen relative py-20 px-4 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0d0015 0%, #12001a 50%, #0d0015 100%)' }}
    >
      {/* Ambient orbs */}
      {([
        { size: 280, left: '8%', top: '8%', delay: 0, useAccent: false },
        { size: 200, left: '68%', top: '55%', delay: 1.5, useAccent: true },
        { size: 140, left: '42%', top: '78%', delay: 3, useAccent: false },
      ] as { size: number; left: string; top: string; delay: number; useAccent: boolean }[]).map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.left,
            top: orb.top,
            background: `radial-gradient(circle, ${orb.useAccent ? memory.accentColor : memory.color}30, transparent 70%)`,
            filter: 'blur(50px)',
          }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, delay: orb.delay, ease: 'easeInOut' }}
        />
      ))}

      {/* Star field */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 50 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: (i % 3) + 1,
              height: (i % 3) + 1,
              left: `${(i * 2.1) % 100}%`,
              top: `${(i * 3.7) % 100}%`,
            }}
            animate={{ opacity: [0.08, 0.45, 0.08] }}
            transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: (i * 0.12) % 4 }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-4 text-xs font-bold tracking-widest uppercase"
            animate={{
              borderColor: `${memory.color}50`,
              color: memory.color,
              backgroundColor: `${memory.color}15`,
            }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="w-3 h-3" />
            Friendship Gallery
          </motion.div>

          <h2 className="text-5xl sm:text-6xl font-black mb-3 tracking-tight leading-tight">
            <span className="text-white">Our </span>
            <motion.span animate={{ color: memory.color }} transition={{ duration: 0.5 }}>
              Special
            </motion.span>
            <span className="text-white"> Moments ✨</span>
          </h2>
          <p className="text-white/40 text-sm tracking-wide">
            {memories.length} memories &middot; swipe or click to explore
          </p>
        </motion.div>

        {/* Carousel row */}
        <div className="relative flex items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrev}
            className="flex-shrink-0 w-11 h-11 rounded-full border flex items-center justify-center z-10"
            style={{ borderColor: `${memory.color}55`, color: memory.color, background: `${memory.color}12` }}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          <div className="flex-1 min-w-0 overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {/* Main card */}
                <motion.div
                  className="relative rounded-2xl overflow-hidden cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
                    border: `1px solid ${memory.color}35`,
                    boxShadow: `0 0 40px ${memory.color}20, inset 0 1px 0 rgba(255,255,255,0.07)`,
                    backdropFilter: 'blur(20px)',
                  }}
                  whileHover={{ scale: 1.02, boxShadow: `0 0 60px ${memory.color}38` }}
                  onClick={() => setSelectedMemory(memory)}
                >
                  <div className="absolute inset-0" style={{ background: memory.bgPattern }} />
                  <FloatingParticles color={memory.color} />
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                      background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.055) 50%, transparent 60%)',
                    }}
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
                  />
                  <div className="relative z-10 p-7">
                    <span
                      className="inline-block px-2.5 py-1 rounded-full text-xs font-bold tracking-widest mb-4"
                      style={{ background: `${memory.color}22`, color: memory.color }}
                    >
                      {memory.tag}
                    </span>
                    <motion.div
                      className="text-5xl mb-4 inline-block"
                      animate={{ y: [0, -6, 0], rotate: [-3, 3, -3] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      {memory.emoji}
                    </motion.div>
                    <h3 className="text-xl font-black text-white mb-1.5 leading-tight">{memory.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-5">{memory.description}</p>
                    <div className="flex flex-col gap-2">
                      {memory.details.map((d, i) => (
                        <DetailItem key={d} text={d} color={memory.color} index={i} />
                      ))}
                    </div>
                    <motion.div
                      className="mt-5 flex items-center gap-1.5 text-xs font-semibold"
                      style={{ color: memory.accentColor }}
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Sparkles className="w-3 h-3" />
                      Tap for the full story
                    </motion.div>
                  </div>
                </motion.div>

                {/* Side panel */}
                <div className="flex flex-col gap-3">
                  <motion.div
                    className="rounded-2xl p-5 flex-1 relative overflow-hidden border"
                    style={{
                      background: `linear-gradient(135deg, ${memory.color}14, ${memory.accentColor}08)`,
                      borderColor: `${memory.color}28`,
                    }}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 }}
                  >
                    <Heart className="absolute -top-2 -right-2 w-16 h-16 opacity-[0.06]" style={{ color: memory.color }} />
                    <p className="text-xs font-bold tracking-widest mb-2 uppercase" style={{ color: memory.color }}>
                      The Memory
                    </p>
                    <p className="text-white/70 text-sm leading-relaxed italic">&ldquo;{memory.story}&rdquo;</p>
                  </motion.div>

                  {[next1, next2].map((m, i) => (
                    <motion.button
                      key={m.id}
                      className="rounded-xl px-4 py-3 flex items-center gap-3 text-left w-full border"
                      style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
                      whileHover={{ scale: 1.02, borderColor: `${m.color}45` }}
                      onClick={() => goTo(memories.indexOf(m), 1)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.18 + i * 0.07 }}
                    >
                      <span className="text-2xl">{m.emoji}</span>
                      <div className="min-w-0">
                        <p className="text-white/80 text-xs font-semibold truncate">{m.title}</p>
                        <p className="text-white/35 text-xs truncate">{m.description}</p>
                      </div>
                      <ChevronRight className="w-3 h-3 ml-auto text-white/20 flex-shrink-0" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            className="flex-shrink-0 w-11 h-11 rounded-full border flex items-center justify-center z-10"
            style={{ borderColor: `${memory.color}55`, color: memory.color, background: `${memory.color}12` }}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-9">
          {memories.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              className="h-1.5 rounded-full border-none cursor-pointer"
              animate={{
                width: i === current ? 28 : 8,
                backgroundColor: i === current ? memory.color : 'rgba(255,255,255,0.2)',
                boxShadow: i === current ? `0 0 8px ${memory.color}` : 'none',
              }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.3 }}
            />
          ))}
        </div>

        {/* Auto-play progress */}
        <AnimatePresence>
          {isAutoPlaying && (
            <motion.div
              className="mt-4 mx-auto max-w-xs h-0.5 rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.08)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: memory.color }}
                key={current}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 4, ease: 'linear' }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)' }}
            onClick={() => setSelectedMemory(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 28 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 28 }}
              transition={{ type: 'spring', stiffness: 300, damping: 26 }}
              className="relative max-w-sm w-full rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #1a0025, #0d001a)',
                border: `1px solid ${selectedMemory.color}45`,
                boxShadow: `0 0 80px ${selectedMemory.color}30`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <FloatingParticles color={selectedMemory.color} />
              <div
                className="h-0.5 w-full"
                style={{ background: `linear-gradient(90deg, transparent, ${selectedMemory.color}, transparent)` }}
              />
              <div className="relative z-10 p-8 text-center">
                <button
                  onClick={() => setSelectedMemory(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.5)' }}
                >
                  <X className="w-4 h-4" />
                </button>
                <motion.div
                  className="text-6xl mb-4 inline-block"
                  animate={{ y: [0, -10, 0], rotate: [-4, 4, -4] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {selectedMemory.emoji}
                </motion.div>
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest mb-3"
                  style={{ background: `${selectedMemory.color}22`, color: selectedMemory.color }}
                >
                  {selectedMemory.tag}
                </span>
                <h3 className="text-xl font-black text-white mb-3">{selectedMemory.title}</h3>
                <p className="text-white/65 text-sm leading-relaxed mb-5 italic">
                  &ldquo;{selectedMemory.story}&rdquo;
                </p>
                <div className="flex flex-col gap-2.5 text-left mb-5">
                  {selectedMemory.details.map((d, i) => (
                    <DetailItem key={d} text={d} color={selectedMemory.color} index={i} />
                  ))}
                </div>
                <motion.div
                  className="flex items-center justify-center gap-2 text-xs font-semibold"
                  style={{ color: selectedMemory.accentColor }}
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart className="w-3 h-3 fill-current" />
                  A memory we&apos;ll cherish forever
                  <Heart className="w-3 h-3 fill-current" />
                </motion.div>
              </div>
              <div
                className="h-0.5 w-full"
                style={{ background: `linear-gradient(90deg, transparent, ${selectedMemory.accentColor}, transparent)` }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
