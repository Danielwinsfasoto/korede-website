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

interface PerformanceStat {
  value: string;
  label: string;
  sublabel: string;
}

const clientReviews: ClientReview[] = [
  {
    id: 1,
    name: 'Adaeze Okonkwo',
    role: 'Event Director',
    event: 'Lagos Corporate Gala 2025',
    quote: 'Akinode\'s performance was the defining moment of our entire evening. The way he moved through Vivaldi into contemporary Afrobeats fusion left our 400 guests completely spellbound. We\'ve had performers before — none commanded the room like this.',
    rating: 5,
    date: 'November 2025',
    featured: true,
  },
  {
    id: 2,
    name: 'James & Priya Whitfield',
    role: 'Wedding Couple',
    event: 'Private Wedding Ceremony, Abuja',
    quote: 'We wanted something that felt both classical and deeply personal for our ceremony. Akinode understood exactly what we needed without us having to explain twice. Our guests are still talking about the violin solo during the reception.',
    rating: 5,
    date: 'March 2025',
    featured: true,
  },
  {
    id: 3,
    name: 'Dr. Funmi Adeyemi',
    role: 'Cultural Attaché',
    event: 'Nigerian Cultural Night, London',
    quote: 'Representing Nigerian artistry on an international stage requires someone who carries both technical mastery and cultural depth. Akinode delivered both with extraordinary grace. A true ambassador of sound.',
    rating: 5,
    date: 'July 2025',
  },
  {
    id: 4,
    name: 'Marcus Delacroix',
    role: 'Music Producer',
    event: 'Studio Session — Afro-Classical EP',
    quote: 'I\'ve worked with string players across three continents. Akinode brings something rare: he listens first, then plays. Every take had intention behind it. The tracks we recorded together are some of the finest work I\'ve produced.',
    rating: 5,
    date: 'January 2025',
  },
  {
    id: 5,
    name: 'Chisom Eze',
    role: 'Private Client',
    event: 'Anniversary Dinner, Port Harcourt',
    quote: 'My husband had no idea I\'d arranged a live violinist for our anniversary. When Akinode began playing, he actually teared up. That\'s the kind of impact this man creates. Absolutely unforgettable.',
    rating: 5,
    date: 'September 2025',
  },
  {
    id: 6,
    name: 'Tunde Fashola Jr.',
    role: 'Brand Manager, Luxe Events Co.',
    event: 'Product Launch — Eko Hotel',
    quote: 'We needed a performer who could hold the attention of a discerning crowd between presentations. Akinode didn\'t just hold attention — he elevated the entire brand experience. Bookings went up 40% after that night.',
    rating: 5,
    date: 'May 2025',
  },
];

const artistQuotes: ArtistQuote[] = [
  {
    id: 1,
    name: 'Seun Kuti',
    instrument: 'Saxophonist & Bandleader',
    quote: 'Playing alongside Akinode showed me what it means to truly bridge worlds. His violin doesn\'t just accompany — it converses. He brought a dimension to our Afrobeat set that I didn\'t know was missing until it arrived.',
    collaboration: 'Afrobeat Fusion Concert, Lagos 2024',
  },
  {
    id: 2,
    name: 'Yemi Alade',
    instrument: 'Recording Artist',
    quote: 'When we were arranging the strings for my album, Akinode\'s interpretation of the melody was so instinctive, so emotionally precise, that we kept his first take. That\'s how good he is.',
    collaboration: 'Studio Collaboration, 2025',
  },
  {
    id: 3,
    name: 'Prof. Emeka Nwosu',
    instrument: 'Classical Pianist & Composer',
    quote: 'Akinode has that rare quality among young musicians — he has studied deeply but plays freely. His technique is impeccable, yet it never feels like a performance of technique. It feels like truth.',
    collaboration: 'Chamber Music Series, Abuja 2024',
  },
];

const performanceStats: PerformanceStat[] = [
  { value: '200+', label: 'Live Performances', sublabel: 'Across Nigeria, UK & Europe' },
  { value: '98%', label: 'Client Satisfaction', sublabel: 'Based on post-event feedback' },
  { value: '50+', label: 'Private Events', sublabel: 'Weddings, galas & corporate' },
  { value: '12+', label: 'Studio Collaborations', sublabel: 'With acclaimed artists' },
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
  const statsReveal = useReveal();
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

      {/* Performance Stats */}
      <section className="py-16 border-y border-border">
        <div
          ref={statsReveal.ref}
          className="max-w-6xl mx-auto px-6"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-y md:divide-y-0 divide-border">
            {performanceStats.map((stat, i) => (
              <div
                key={stat.label}
                className={`px-8 py-8 text-center transition-all duration-700 ${statsReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="text-4xl md:text-5xl font-bold text-accent mb-1">{stat.value}</div>
                <div className="text-foreground font-semibold text-sm tracking-wide mb-1">{stat.label}</div>
                <div className="text-muted-foreground text-xs">{stat.sublabel}</div>
              </div>
            ))}
          </div>
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

      {/* Collaborative Artist Quotes */}
      <section className="py-24">
        <div
          ref={artistReveal.ref}
          className="max-w-6xl mx-auto px-6"
        >
          <div className="flex items-center gap-4 mb-4">
            <p className="section-label">Artist Voices</p>
            <div className="flex-1 h-px bg-border" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-14">
            Words from Fellow <span className="text-gradient-teal">Artists</span>
          </h2>

          <div className="space-y-6">
            {artistQuotes.map((artist, i) => (
              <div
                key={artist.id}
                className={`group relative bg-card border border-border rounded-2xl p-8 md:p-10 overflow-hidden transition-all duration-800 card-glow-hover ${artistReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {/* Accent line */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent via-primary to-transparent rounded-l-2xl" />

                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Artist info */}
                  <div className="md:w-48 flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-3">
                      <span className="text-foreground font-bold text-lg">
                        {artist.name.charAt(0)}
                      </span>
                    </div>
                    <div className="font-bold text-foreground">{artist.name}</div>
                    <div className="text-accent text-xs mt-0.5">{artist.instrument}</div>
                    <div className="text-muted-foreground text-xs mt-2 font-mono leading-relaxed">{artist.collaboration}</div>
                  </div>

                  {/* Quote */}
                  <div className="flex-1">
                    <div className="text-accent/20 font-serif text-7xl leading-none mb-2 select-none">&ldquo;</div>
                    <p className="text-foreground text-base md:text-lg leading-relaxed -mt-5">
                      {artist.quote}
                    </p>
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
