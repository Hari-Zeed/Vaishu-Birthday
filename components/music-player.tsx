'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Play, Pause } from 'lucide-react';

interface MusicPlayerProps {
  /** If provided, the player will control this audio element (from splash screen) instead of creating its own */
  externalAudio?: HTMLAudioElement | null;
}

export function MusicPlayer({ externalAudio }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const ownAudioRef = useRef<HTMLAudioElement>(null);

  // Which audio element we're controlling
  const getAudio = (): HTMLAudioElement | null =>
    externalAudio ?? ownAudioRef.current;

  // Sync playing state when external audio is handed over (already playing from splash)
  useEffect(() => {
    if (externalAudio && !externalAudio.paused) {
      setIsPlaying(true);
    }
  }, [externalAudio]);

  // Fallback: if no external audio provided, try immediate autoplay then user-gesture fallback
  useEffect(() => {
    if (externalAudio) return; // Splash screen handles it
    const audio = ownAudioRef.current;
    if (!audio) return;

    audio.volume = 0.5;
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        // Browser blocked — wait for first gesture
        const handle = () => {
          audio.play().then(() => setIsPlaying(true)).catch(() => {});
        };
        window.addEventListener('click', handle, { once: true });
        window.addEventListener('touchstart', handle, { once: true });
        window.addEventListener('scroll', handle, { once: true });
      });
  }, [externalAudio]);

  const togglePlay = () => {
    const audio = getAudio();
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.volume = 0.5;
      audio.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  };

  const EqBars = () => (
    <div className="flex gap-1 items-end h-5">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ height: ['4px', '18px', '6px', '14px', '4px'] }}
          transition={{ duration: 0.9, delay: i * 0.15, repeat: Infinity, ease: 'easeInOut' }}
          className="w-1 bg-gradient-to-t from-primary to-secondary rounded-full"
        />
      ))}
    </div>
  );

  return (
    <>
      {/* Own audio element — only rendered if no external audio from splash */}
      {!externalAudio && (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <audio ref={ownAudioRef} src="/song.mp3" loop preload="auto" />
      )}

      {/* ── Desktop pill: top-right ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed top-20 right-4 sm:right-8 z-40 hidden sm:flex rounded-full px-5 py-3 items-center gap-3 backdrop-blur-md bg-black/50 border border-primary/30 shadow-lg shadow-primary/20"
      >
        <Music className="w-5 h-5 text-secondary animate-pulse" />
        <span className="text-sm font-medium text-foreground">never grow up · taylor swift</span>

        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={togglePlay}
          className="p-2 hover:bg-primary/20 rounded-full transition-all cursor-pointer"
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-primary fill-primary" />
          ) : (
            <Play className="w-5 h-5 text-primary fill-primary" />
          )}
        </motion.button>

        {isPlaying && <EqBars />}
      </motion.div>

      {/* ── Mobile: compact circle at bottom-right ── */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        className="fixed bottom-6 right-4 z-40 sm:hidden w-14 h-14 rounded-full backdrop-blur-md bg-black/60 border border-primary/40 shadow-lg shadow-primary/30 flex items-center justify-center"
        style={{ boxShadow: '0 0 20px rgba(147,51,234,0.4)' }}
      >
        {isPlaying ? (
          <div className="flex gap-[3px] items-end h-5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ height: ['4px', '16px', '5px', '12px', '4px'] }}
                transition={{ duration: 0.9, delay: i * 0.15, repeat: Infinity, ease: 'easeInOut' }}
                className="w-[3px] bg-gradient-to-t from-primary to-secondary rounded-full"
              />
            ))}
          </div>
        ) : (
          <Play className="w-6 h-6 text-primary fill-primary ml-1" />
        )}
      </motion.button>
    </>
  );
}
