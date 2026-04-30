'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export function FooterSection() {
  return (
    <footer className="bg-background/50 backdrop-blur border-t border-primary/20 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <Heart className="w-6 h-6 text-primary fill-primary" />
          </motion.div>
          <h3 className="text-2xl font-bold text-primary mb-2">Happy Birthday!</h3>
          <p className="text-foreground/70">
            Here&apos;s to celebrating you and all the wonderful memories we share.
          </p>
        </div>

        <div className="flex justify-center gap-8 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('section-home')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-foreground/70 hover:text-primary transition-colors"
          >
            Back to Top
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('section-gallery')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-foreground/70 hover:text-primary transition-colors"
          >
            Gallery
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('section-letter')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-foreground/70 hover:text-primary transition-colors"
          >
            Letter
          </motion.button>
        </div>

        <div className="border-t border-primary/20 pt-8">
          <p className="text-center text-foreground/60 text-sm">
            Made with <span className="text-primary">❤️</span> for someone special
          </p>
          <p className="text-center text-foreground/40 text-xs mt-2">
            © 2024 Birthday Celebration • Created with love
          </p>
        </div>
      </div>
    </footer>
  );
}
