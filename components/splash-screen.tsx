'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Music } from 'lucide-react';

interface SplashScreenProps {
  onEnter: (audio: HTMLAudioElement) => void;
}

export function SplashScreen({ onEnter }: SplashScreenProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [visible, setVisible] = useState(true);

  // Preload the audio silently
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.5;
      audio.load();
    }
  }, []);

  const handleEnter = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.5;
    // Play — this works because it's inside a click handler
    audio.play().catch(() => {});
    setVisible(false);
    // Pass the audio element up so MusicPlayer can control it
    onEnter(audio);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0d0015 0%, #1a0030 50%, #0d0015 100%)',
          }}
        >
          {/* Hidden audio element — preloaded here */}
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <audio ref={audioRef} src="/song.mp3" loop preload="auto" />

          {/* Background floating hearts */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-primary/20 pointer-events-none select-none"
              style={{
                fontSize: `${16 + (i % 4) * 10}px`,
                left: `${(i * 8.5) % 95}%`,
                top: `${(i * 13) % 90}%`,
              }}
              animate={{
                y: [0, -18, 0],
                opacity: [0.15, 0.45, 0.15],
                rotate: [0, i % 2 === 0 ? 15 : -15, 0],
              }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                delay: i * 0.25,
                ease: 'easeInOut',
              }}
            >
              ♥
            </motion.div>
          ))}

          {/* Glow orb behind the card */}
          <motion.div
            className="absolute w-96 h-96 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(168,85,247,0.25) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
            animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative z-10 flex flex-col items-center text-center px-8 max-w-sm"
          >
            {/* Cake emoji */}
            <motion.div
              className="text-6xl mb-6 select-none"
              animate={{ y: [0, -10, 0], rotate: [-4, 4, -4] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              🎂
            </motion.div>

            <motion.div
              className="flex items-center gap-2 mb-3"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-5 h-5 text-primary fill-primary" />
              <span className="text-primary/80 text-sm font-semibold tracking-widest uppercase">
                A special surprise
              </span>
              <Heart className="w-5 h-5 text-primary fill-primary" />
            </motion.div>

            <h1 className="text-4xl sm:text-5xl font-black text-white mb-2 leading-tight">
              Happy Birthday
            </h1>
            <p className="text-3xl sm:text-4xl font-black mb-6" style={{ color: '#c084fc' }}>
              Vaishu! 🥳
            </p>

            <p className="text-white/50 text-sm leading-relaxed mb-8">
              Your bestie put something together just for you.
              <br />
              Tap below to enter — with music 🎵
            </p>

            {/* Music note indicator */}
            <motion.div
              className="flex items-center gap-2 text-xs text-white/40 mb-6"
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            >
              <Music className="w-3.5 h-3.5" />
              <span>never grow up · taylor swift</span>
            </motion.div>

            {/* Enter button */}
            <motion.button
              onClick={handleEnter}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className="relative px-10 py-4 rounded-2xl text-white font-bold text-lg tracking-wide overflow-hidden shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #9333ea, #ec4899)',
                boxShadow: '0 0 40px rgba(147,51,234,0.5)',
              }}
            >
              {/* Shimmer */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%)',
                }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
              <span className="relative z-10">🎉 Open Your Surprise</span>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
