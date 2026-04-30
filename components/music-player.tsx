'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Play, Pause } from 'lucide-react';

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Attempt autoplay after first user interaction with the page
  useEffect(() => {
    const tryAutoplay = () => {
      if (userInteracted) return;
      setUserInteracted(true);
      const audio = audioRef.current;
      if (!audio) return;
      audio.volume = 0.5;
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Still blocked — user can manually press play
        });
    };

    // Listen for any user gesture on the page
    window.addEventListener('click', tryAutoplay, { once: true });
    window.addEventListener('keydown', tryAutoplay, { once: true });
    window.addEventListener('touchstart', tryAutoplay, { once: true });
    window.addEventListener('scroll', tryAutoplay, { once: true });

    return () => {
      window.removeEventListener('click', tryAutoplay);
      window.removeEventListener('keydown', tryAutoplay);
      window.removeEventListener('touchstart', tryAutoplay);
      window.removeEventListener('scroll', tryAutoplay);
    };
  }, [userInteracted]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.volume = 0.5;
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(console.error);
    }
  };

  return (
    <>
      {/* Hidden audio element — this is what actually plays the sound */}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} src="/song.mp3" loop preload="auto" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed top-20 right-4 sm:right-8 z-40 rounded-full px-4 sm:px-6 py-3 flex items-center gap-3 backdrop-blur-md bg-black/50 border border-primary/30 shadow-lg shadow-primary/20"
      >
        <Music className="w-5 h-5 text-secondary animate-pulse" />
        <span className="text-sm font-medium text-foreground hidden sm:inline">never grow up taylor swift</span>

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

        {/* Equalizer bars when playing */}
        {isPlaying && (
          <div className="flex gap-1 items-end h-5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ height: ['4px', '18px', '6px', '14px', '4px'] }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.15,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-1 bg-gradient-to-t from-primary to-secondary rounded-full"
              />
            ))}
          </div>
        )}
      </motion.div>
    </>
  );
}
