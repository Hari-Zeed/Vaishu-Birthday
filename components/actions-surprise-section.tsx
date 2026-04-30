'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift, Sparkles } from 'lucide-react';

const actionCards = [
  {
    id: 1,
    title: 'Countless Memories',
    icon: '∞',
    color: 'from-blue-500/20 to-purple-500/20',
  },
  {
    id: 2,
    title: 'Unbreakable Bond',
    icon: '❤️',
    color: 'from-pink-500/20 to-red-500/20',
  },
  {
    id: 3,
    title: 'Endless Laughter',
    icon: '⭐',
    color: 'from-yellow-500/20 to-orange-500/20',
  },
  {
    id: 4,
    title: 'Another Year of You!',
    icon: '🎂',
    color: 'from-green-500/20 to-blue-500/20',
  },
];

export function ActionsAndSurpriseSection() {
  const [showSurprise, setShowSurprise] = useState(false);
  const [clicked, setClicked] = useState<number | null>(null);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#e539a9', '#fbbf24', '#a78bfa'],
    });
  };

  const handleCardClick = (id: number) => {
    setClicked(id);
    triggerConfetti();
    setTimeout(() => setClicked(null), 600);
  };

  const handleSurpriseClick = () => {
    setShowSurprise(true);
    triggerConfetti();
  };

  return (
    <section id="section-surprises" className="min-h-screen bg-gradient-to-b from-background/80 to-background py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Action Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4 text-primary">
            What Makes You Special
          </h2>
          <p className="text-center text-foreground/60 mb-16">Click on any card to celebrate!</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {actionCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleCardClick(card.id)}
                className="cursor-pointer"
              >
                <motion.div
                  animate={clicked === card.id ? { scale: 1.1 } : { scale: 1 }}
                  className={`bg-gradient-to-br ${card.color} backdrop-blur border border-white/10 rounded-xl p-6 text-center hover:border-primary/40 transition-all group min-h-48 flex flex-col justify-center items-center`}
                >
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    className="text-5xl mb-4 group-hover:scale-125 transition-transform"
                  >
                    {card.icon}
                  </motion.div>
                  <h3 className="text-lg font-bold text-primary group-hover:text-secondary transition-colors">
                    {card.title}
                  </h3>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Surprise Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold mb-8 text-primary">Special Surprise!</h3>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSurpriseClick}
            className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/50 text-white px-8 sm:px-12 py-4 rounded-full font-bold text-lg flex items-center gap-3 mx-auto mb-12 transition-all"
          >
            <Gift className="w-6 h-6" />
            Click Me For A Surprise! 🎁
          </motion.button>

          {showSurprise && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glassmorphism rounded-2xl p-12 mb-12 max-w-2xl mx-auto"
            >
              <div className="text-6xl mb-6 inline-block">🎉</div>
              <h4 className="text-3xl font-bold text-primary mb-4">You are Amazing!</h4>
              <p className="text-foreground/80 text-lg leading-relaxed">
                Your presence lights up every room. Your kindness knows no bounds. Your loyalty is unmatched. 
                Thank you for being the incredible person that you are. May this year bring you endless joy, 
                wonderful adventures, and all the happiness you deserve!
              </p>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-block mt-8"
              >
                <Sparkles className="w-8 h-8 text-secondary" />
              </motion.div>
            </motion.div>
          )}

          {/* Bottom CTA */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-16"
          >
            <p className="text-foreground/50 text-sm">Scroll down to explore more!</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
