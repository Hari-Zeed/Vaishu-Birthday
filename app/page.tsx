'use client';

import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/components/hero-section';
import { CarouselSection } from '@/components/carousel-section';
import { GallerySection } from '@/components/gallery-section';
import { OpenLetterSection } from '@/components/open-letter-section';
import { ActionsAndSurpriseSection } from '@/components/actions-surprise-section';
import { MusicPlayer } from '@/components/music-player';
import { FooterSection } from '@/components/footer-section';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <MusicPlayer />
      <HeroSection />
      <CarouselSection />
      <GallerySection />
      <OpenLetterSection />
      <ActionsAndSurpriseSection />
      <FooterSection />
    </main>
  );
}
