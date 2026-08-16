import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MusicPageContent from '@/app/music/components/MusicPageContent';

export const metadata = {
  title: 'Music — Akinode Korede Emmanuel',
  description: 'Explore the full discography, recordings, and musical works of Nigerian classical violinist Akinode Korede Emmanuel.',
};

export default function MusicPage() {
  return (
    <main className="bg-background text-foreground min-h-screen overflow-x-hidden">
      <Header />
      <MusicPageContent />
      <Footer />
    </main>
  );
}