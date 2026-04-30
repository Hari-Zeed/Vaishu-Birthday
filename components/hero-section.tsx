'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export function HeroSection() {
  return (
    <section id="section-home" className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/birthday-bg.jpg"
          alt="Birthday celebration background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Floating hearts only — no overlapping button */}
      <div className="absolute bottom-20 right-10 text-primary/40 z-10">
        <Heart className="w-12 h-12 fill-current animate-pulse" />
      </div>
      <div className="absolute top-1/3 right-20 text-secondary/30 z-10">
        <Heart className="w-8 h-8 fill-current" />
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="text-foreground/50 text-center">
          <p className="text-sm mb-2">Scroll to Explore</p>
          <div className="w-6 h-10 border-2 border-foreground/50 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-foreground/50 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
