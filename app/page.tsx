'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/components/hero-section';
import { CarouselSection } from '@/components/carousel-section';
import { GallerySection } from '@/components/gallery-section';
import { OpenLetterSection } from '@/components/open-letter-section';
import { ActionsAndSurpriseSection } from '@/components/actions-surprise-section';
import { MusicPlayer } from '@/components/music-player';
import { FooterSection } from '@/components/footer-section';
import { SplashScreen } from '@/components/splash-screen';

export default function Home() {
  // Audio element created in SplashScreen and passed up here so MusicPlayer can control it
  const [splashAudio, setSplashAudio] = useState<HTMLAudioElement | null>(null);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Splash screen — shown on first open, music starts when user taps "Open Your Surprise" */}
      <SplashScreen onEnter={(audio) => setSplashAudio(audio)} />

      {/* Always-visible chrome */}
      <Navbar />
      <MusicPlayer externalAudio={splashAudio} />

      {/* Page sections */}
      <HeroSection />
      <CarouselSection />
      <GallerySection />
      <OpenLetterSection />
      <ActionsAndSurpriseSection />
      <FooterSection />
    </main>
  );
}
