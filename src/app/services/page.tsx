import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServicesPageContent from './ServicesPageContent';

export const metadata: Metadata = {
  title: 'Services — Akinode Korede Emmanuel | Violinist AK3',
  description:
    'Solo violin, violin & cello duo, string trio, string quartet, and full ensemble performances for weddings, corporate events, private celebrations, and studio recordings.',
};

export default function ServicesPage() {
  return (
    <main className="bg-background text-foreground min-h-screen overflow-x-hidden">
      <Header />
      <ServicesPageContent />
      <Footer />
    </main>
  );
}