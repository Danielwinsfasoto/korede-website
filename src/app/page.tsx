import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import AboutSection from '@/app/components/AboutSection';
import VideoSection from '@/app/components/VideoSection';
import MusicTracksSection from '@/app/components/MusicTracksSection';
import GalleryStrip from '@/app/components/GalleryStrip';

export default function HomePage() {
  return (
    <main className="bg-background text-foreground min-h-screen overflow-x-hidden">
      <Header />
      <HeroSection />
      <AboutSection />
      <VideoSection />
      <MusicTracksSection />
      <GalleryStrip />
      <Footer />
    </main>
  );
}