import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactPageContent from '@/app/contact/components/ContactPageContent';

export const metadata = {
  title: 'Contact & Bookings — Akinode Korede Emmanuel',
  description: 'Book Akinode Korede Emmanuel for concerts, events, and private performances. Send a booking inquiry or get in touch directly.',
};

export default function ContactPage() {
  return (
    <main className="bg-background text-foreground min-h-screen overflow-x-hidden">
      <Header />
      <ContactPageContent />
      <Footer />
    </main>
  );
}