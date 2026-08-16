'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import Link from 'next/link';

const newsArticles = [
{
  id: 1,
  date: 'June 12, 2025',
  category: 'Concert',
  title: 'CONCERT TOUR INCOMING',
  excerpt:
  'Akinode Korede Emmanuel announces a 6-city Nigerian tour this October, bringing live classical violin to audiences in Lagos, Abuja, Port Harcourt, Kano, Ibadan, and Enugu. Tickets available at major outlets.',
  image: "https://images.unsplash.com/photo-1643102842184-3be251fec986",
  imageAlt: 'Concert stage with blue spotlights and crowd silhouettes, dark atmospheric venue',
  href: '#'
},
{
  id: 2,
  date: 'March 28, 2025',
  category: 'Performance',
  title: 'LAGOS LIVE CONCERT',
  excerpt:
  'A sold-out performance at the Eko Hotel & Suites drew over 800 attendees for an evening of classical violin. Critics praised the seamless fusion of Baroque repertoire with traditional Yoruba rhythms.',
  image: "https://images.unsplash.com/photo-1585267393786-890885ea2599",
  imageAlt: 'Performer on stage with dramatic purple and teal lighting, concert hall atmosphere',
  href: '#'
},
{
  id: 3,
  date: 'January 15, 2025',
  category: 'Media',
  title: 'FEATURED IN GUARDIAN ARTS',
  excerpt:
  'The Guardian Nigeria profiled Korede as one of the rising voices in African classical music, highlighting his unique approach to bridging Western classical tradition with contemporary Nigerian identity.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_13550aa33-1772217821939.png",
  imageAlt: 'Close-up of violin and bow on dark background, dramatic studio lighting, rich shadows',
  href: '#'
},
{
  id: 4,
  date: 'November 5, 2024',
  category: 'Award',
  title: 'BEST CLASSICAL ARTIST AWARD',
  excerpt:
  'Akinode Korede Emmanuel received the Best Classical Artist award at the 2024 Nigeria Music Awards, recognizing outstanding contribution to classical music performance and education in Nigeria.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_120461dc2-1772259798371.png",
  imageAlt: 'Award ceremony stage with bright spotlights, dark elegant event hall',
  href: '#'
}];


export default function NewsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const elements = sectionRef?.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (!elements) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    elements?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      id="news"
      ref={sectionRef}
      className="py-20 md:py-28 bg-background relative overflow-hidden">
      
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(43,95,117,0.12) 0%, transparent 70%)',
          filter: 'blur(60px)'
        }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12 reveal">
          <div>
            <div className="section-label mb-4">Press & Events</div>
            <h2 className="text-section font-bold tracking-tighter text-foreground">
              Latest News
            </h2>
          </div>
          <a
            href="#"
            className="text-sm font-semibold tracking-widest uppercase text-muted-foreground hover:text-accent transition-colors flex items-center gap-2">
            
            See all
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Articles Grid: 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {newsArticles?.map((article, i) =>
          <article
            key={article?.id}
            className={`reveal ${i % 2 === 0 ? 'reveal-left' : 'reveal-right'} card-glow-hover`}
            style={{ transitionDelay: `${i * 80}ms` }}>
            
              <Link href={article?.href} className="group block">
                <div className="flex gap-4 bg-card border border-border p-4 hover:border-primary/40 transition-all duration-300">
                  {/* Thumbnail */}
                  <div
                  className="flex-shrink-0 overflow-hidden"
                  style={{ width: '120px', height: '90px' }}>
                  
                    <AppImage
                    src={article?.image}
                    alt={article?.imageAlt}
                    width={120}
                    height={90}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                  
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-accent uppercase tracking-widest">
                          {article?.category}
                        </span>
                        <span className="text-xs text-muted-foreground">·</span>
                        <span className="text-xs text-muted-foreground font-mono">
                          {article?.date}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-foreground tracking-wide mb-2 group-hover:text-accent transition-colors">
                        {article?.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                        {article?.excerpt}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-accent mt-2 group-hover:underline">
                      See More
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          )}
        </div>
      </div>
    </section>);

}