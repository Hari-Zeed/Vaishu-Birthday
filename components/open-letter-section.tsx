'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

export function OpenLetterSection() {
  const [displayedText, setDisplayedText] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const fullText = `Happy Birthday Vaishu! 🎉🥳

Honestly, I just want to say how grateful I am to have you in my life. Unlike others, you’re always there for me whenever I ask for notes or even something small like a pen 😄. I still remember how much you helped me during my second semester maths exam — without you, I probably would’ve had an arrear. Because of you, I was able to improve my CGPA, and I’ll never forget that 🙏

Even though we don’t talk much in class, our online chats are always fun and meaningful 💬✨. You’re such a kind-hearted person with a genuinely helpful nature, and that’s something really rare. You help without expecting anything in return, and that says a lot about who you are 💖

I’m really lucky to call you my friend. Keep being the amazing person you are, and may this year bring you lots of happiness, success, and everything you wish for 🎂🎁🌟

Once again, Happy Birthday Vaishu! 💕🎉`;

  useEffect(() => {
    if (!isExpanded) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isExpanded]);

  return (
    <section id="section-letter" className="min-h-screen bg-gradient-to-b from-background to-background/80 py-20 px-6 flex items-center">
      <div className="max-w-2xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-4"
            >
              <Mail className="w-12 h-12 text-secondary" />
            </motion.div>
            <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-4">Open Letter</h2>
            <p className="text-foreground/60">A heartfelt message for you</p>
          </div>

          {/* Letter Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="glassmorphism rounded-2xl p-8 sm:p-12 cursor-pointer group hover:border-primary/60 transition-all"
          >
            {!isExpanded ? (
              <div className="text-center">
                <p className="text-foreground/70 mb-6">
                  {fullText.slice(0, 100)}...
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary/80 hover:bg-primary text-primary-foreground px-6 py-2 rounded-full font-semibold transition-all"
                >
                  Read Full Letter
                </motion.button>
              </div>
            ) : (
              <div className="min-h-96">
                <div className="text-foreground/80 leading-relaxed whitespace-pre-wrap font-medium">
                  {displayedText}
                  {displayedText.length < fullText.length && (
                    <span className="animate-pulse text-primary">|</span>
                  )}
                </div>
                {displayedText.length === fullText.length && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsExpanded(false);
                      setDisplayedText('');
                    }}
                    className="block mx-auto mt-8 bg-secondary/80 hover:bg-secondary text-secondary-foreground px-6 py-2 rounded-full font-semibold transition-all"
                  >
                    Close Letter
                  </motion.button>
                )}
              </div>
            )}
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-center mt-12"
          >
            <p className="text-primary/60 text-sm">With love and gratitude ✨</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
