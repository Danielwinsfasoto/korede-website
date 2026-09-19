'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ClientReview {
  id: number;
  name: string;
  role: string;
  event: string;
  quote: string;
  rating: number;
  date: string;
  featured?: boolean;
}

interface ArtistQuote {
  id: number;
  name: string;
  instrument: string;
  quote: string;
  collaboration: string;
}

const clientReviews: ClientReview[] = [
  {
    id: 1,
    name: 'Foluke Oyetayo',
    role: '',
    event: '',
    quote: 'I honestly had such a wonderful experience! He is really good at what he does, and the way he plays the violin is just beautiful. You can tell he genuinely loves what he does. He was also really nice and professional. I would definitely recommend him to anyone looking for a violinist. He really made the experience special❤️🎻.',
    rating: 5,
    date: 'August 2026',
    featured: true,
  },
  {
    id: 2,
    name: 'Perfect Akhiromen',
    role: '',
    event: '',
    quote: 'K.strings is a "Pro" at what he does, I mean his expertise is something to be greatly applauded. He loves what he does and does it beautifully well. With K.strings there\'s consistency and excellence. You can always count on him, he\'s your sure plug👍',    rating: 5,
    date: 'August 2026',
    featured: true,
  },
  {
    id: 3,
    name: 'Faderera Falade',
    role: '',
    event: '',
    quote: 'kstrings is very good, It was absolutely beautiful 😍 and he went beyond expectations.',
    rating: 5,
    date: 'March 2025',
  },
  {
    id: 4,
    name: 'Bolu Mary',
    role: '',
    event: '',
    quote: 'Best violinists I\'ve ever known. Diligent and Consistent in all he does. Doesn\'t disappoint, and render quality service Weldone my G, the sky is your starting point SOAR🪁',
    rating: 5,
    date: 'January 2025',
  },
  {
    id: 5,
    name: 'Precious Adiele',
    role: '',
    event: '',
    quote: 'AK3 strings a.k.a celebrity violinist is an incredibly talented and professional instrumentalist who delivers soulful, engaging live music perfect for weddings, parties and events.',
    rating: 4,
    date: 'August 2026',
  },
  {
    id: 6,
     name: 'Solomon Adewusi',
     role: '',
     event: '',
     quote: 'I love ak3\'s work, He\'s so good at what he does🥀🩵',
     rating: 5,
     date: 'March 2026',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < rating ? '#4AACDB' : 'none'}
          stroke={i < rating ? '#4AACDB' : '#1E2D3D'}
          strokeWidth="2"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

export default function ReviewsPageContent() {
  const heroReveal = useReveal();
  const featuredReveal = useReveal();
  const gridReveal = useReveal();
  const artistReveal = useReveal();

  const featuredReviews = clientReviews.filter((r) => r.featured);
  const gridReviews = clientReviews.filter((r) => !r.featured);

  return (
    <div className="pt-20">
      {/* Hero Banner */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/40 to-background" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #4AACDB 0%, transparent 50%), radial-gradient(circle at 80% 20%, #2B5F75 0%, transparent 50%)`,
          }}
        />
        {/* Decorative quote marks */}
        <div className="absolute top-12 left-8 text-accent/5 font-serif leading-none select-none pointer-events-none" style={{ fontSize: '18rem', lineHeight: 1 }}>
          &ldquo;
        </div>

        <div
          ref={heroReveal.ref}
          className={`relative max-w-4xl mx-auto px-6 text-center transition-all duration-1000 ${heroReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="section-label mb-4">Testimonials</p>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6">
            What People Say About{' '}
            <span className="text-gradient-teal">the Music</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            From intimate weddings to international stages — real words from clients, collaborators, and fellow artists who have experienced the performance firsthand.
          </p>
        </div>
      </section>

      {/* Featured Reviews — Asymmetric Layout */}
      <section className="py-24">
        <div
          ref={featuredReveal.ref}
          className="max-w-6xl mx-auto px-6"
        >
          <div className="flex items-center gap-4 mb-14">
            <p className="section-label">Featured</p>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {/* Large featured card */}
            <div
              className={`md:col-span-3 bg-card border border-border rounded-2xl p-8 md:p-10 card-glow-hover relative overflow-hidden transition-all duration-900 ${featuredReveal.visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
              style={{ transitionDelay: '100ms' }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="text-accent/20 font-serif text-8xl leading-none mb-4 select-none">&ldquo;</div>
              <p className="text-foreground text-lg md:text-xl leading-relaxed mb-8 -mt-6">
                {featuredReviews[0]?.quote}
              </p>
              <div className="flex items-end justify-between gap-4 flex-wrap">
                <div>
                  <StarRating rating={featuredReviews[0]?.rating ?? 5} />
                  <div className="mt-3 font-bold text-foreground">{featuredReviews[0]?.name}</div>
                  <div className="text-accent text-sm">{featuredReviews[0]?.role}</div>
                  <div className="text-muted-foreground text-xs mt-1">{featuredReviews[0]?.event}</div>
                </div>
                <div className="text-muted-foreground text-xs font-mono">{featuredReviews[0]?.date}</div>
              </div>
            </div>

            {/* Stacked smaller featured card */}
            <div className="md:col-span-2 flex flex-col gap-6">
              <div
                className={`flex-1 bg-card border border-border rounded-2xl p-7 card-glow-hover relative overflow-hidden transition-all duration-900 ${featuredReveal.visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                style={{ transitionDelay: '200ms' }}
              >
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                <div className="text-accent/20 font-serif text-6xl leading-none mb-2 select-none">&ldquo;</div>
                <p className="text-foreground text-sm md:text-base leading-relaxed mb-6 -mt-4">
                  {featuredReviews[1]?.quote}
                </p>
                <div>
                  <StarRating rating={featuredReviews[1]?.rating ?? 5} />
                  <div className="mt-2 font-bold text-foreground text-sm">{featuredReviews[1]?.name}</div>
                  <div className="text-accent text-xs">{featuredReviews[1]?.role}</div>
                  <div className="text-muted-foreground text-xs mt-0.5">{featuredReviews[1]?.event}</div>
                </div>
              </div>

              {/* Accent stat card */}
              <div
                className={`bg-gradient-to-br from-primary/30 to-accent/10 border border-accent/20 rounded-2xl p-7 transition-all duration-900 ${featuredReveal.visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                style={{ transitionDelay: '300ms' }}
              >
                <div className="text-accent font-mono text-xs tracking-widest uppercase mb-3">Audience Response</div>
                <div className="text-5xl font-bold text-foreground mb-1">5.0</div>
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#4AACDB">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <div className="text-muted-foreground text-sm">Average rating across all verified reviews</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Client Reviews Grid */}
      <section className="py-16 bg-muted/20">
        <div
          ref={gridReveal.ref}
          className="max-w-6xl mx-auto px-6"
        >
          <div className="flex items-center gap-4 mb-14">
            <p className="section-label">All Reviews</p>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {gridReviews.map((review, i) => (
              <div
                key={review.id}
                className={`bg-card border border-border rounded-xl p-6 card-glow-hover flex flex-col transition-all duration-700 ${gridReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="text-accent/15 font-serif text-5xl leading-none mb-1 select-none">&ldquo;</div>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1 -mt-3 mb-6">
                  {review.quote}
                </p>
                <div className="border-t border-border pt-4">
                  <StarRating rating={review.rating} />
                  <div className="mt-2 font-semibold text-foreground text-sm">{review.name}</div>
                  <div className="text-accent text-xs">{review.role}</div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="text-muted-foreground text-xs truncate pr-2">{review.event}</div>
                    <div className="text-muted-foreground text-xs font-mono whitespace-nowrap">{review.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-20 border-t border-border">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="section-label mb-4">Book a Performance</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Create Your Own <span className="text-gradient-teal">Unforgettable Moment?</span>
          </h2>
          <p className="text-muted-foreground mb-10 text-lg">
            Join the growing list of clients and collaborators who have experienced the power of live violin performance.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 bg-accent text-background font-bold px-8 py-4 rounded-full text-sm tracking-widest uppercase hover:bg-accent/90 transition-all duration-300 hover:scale-105"
          >
            Get in Touch
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}