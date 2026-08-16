import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReviewsPageContent from '@/app/reviews/components/ReviewsPageContent';

export const metadata = {
  title: 'Reviews & Testimonials | Akinode Korede Emmanuel',
  description: 'Client reviews, performance feedback, and collaborative artist quotes for violinist Akinode Korede Emmanuel.',
};

export default function ReviewsPage() {
  return (
    <main className="bg-background text-foreground min-h-screen overflow-x-hidden">
      <Header />
      <ReviewsPageContent />
      <Footer />
    </main>
  );
}
