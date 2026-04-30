'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryImage {
  id: number;
  title: string;
  description: string;
  color: string;
  src: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    title: 'Late Night Chats',
    description: 'Endless talks, endless laughs.',
    color: 'from-blue-500/20 to-purple-500/20',
    src: '/gallery1.png',
  },
  {
    id: 2,
    title: 'Exam Time Warriors',
    description: 'Those stressful yet unforgettable days.',
    color: 'from-yellow-500/20 to-orange-500/20',
    src: '/gallery2.png',
  },
  {
    id: 3,
    title: 'Random & Fun Memories',
    description: 'The silly moments we\'ll never forget.',
    color: 'from-pink-500/20 to-red-500/20',
    src: '/gallery3.png',
  },
  {
    id: 4,
    title: 'Always There For Each Other',
    description: 'Through thick and thin, always together.',
    color: 'from-green-500/20 to-blue-500/20',
    src: '/gallery4.png',
  },
];

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentImage = selectedImage ? galleryImages.findIndex(img => img.id === selectedImage.id) : -1;

  const goToPrevious = () => {
    const newIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(galleryImages[newIndex]);
  };

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % galleryImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(galleryImages[newIndex]);
  };

  return (
    <section id="section-gallery" className="min-h-screen bg-gradient-to-b from-background/80 to-background py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4 text-primary">
          Gallery
        </h2>
        <p className="text-center text-foreground/60 mb-16">Click on any memory to explore</p>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => {
                setSelectedImage(image);
                setCurrentIndex(index);
              }}
              className="cursor-pointer group"
            >
              <div className={`relative overflow-hidden rounded-2xl h-72 border border-white/10 group-hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/30`}>
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                />
                {/* Subtle top-fade so face stays visible */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80" />
                {/* Hover overlay glow */}
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                  <h3 className="text-lg sm:text-xl font-bold mb-1 text-white drop-shadow-lg">
                    {image.title}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {image.description}
                  </p>
                </div>
                {/* Click hint */}
                <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Click to view ✨
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-10 right-0 p-2 hover:bg-primary/20 rounded-full transition-all"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>

              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10" style={{ minHeight: '400px' }}>
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-center">
                  <h3 className="text-2xl font-bold mb-2 text-white">{selectedImage.title}</h3>
                  <p className="text-white/80 mb-2">{selectedImage.description}</p>
                  <p className="text-secondary text-sm">A precious memory we&apos;ll always treasure!</p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-6">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={goToPrevious}
                  className="p-2 rounded-full border border-primary/40 text-primary hover:bg-primary/10 transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>

                <div className="flex gap-2">
                  {galleryImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setCurrentIndex(i);
                        setSelectedImage(galleryImages[i]);
                      }}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === currentIndex ? 'bg-primary w-8' : 'bg-foreground/30'
                      }`}
                    />
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={goToNext}
                  className="p-2 rounded-full border border-primary/40 text-primary hover:bg-primary/10 transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
