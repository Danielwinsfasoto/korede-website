'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import Link from 'next/link';

export default function HeroSection() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (bgRef?.current) {
        const scrollY = window.scrollY;
        bgRef.current.style.transform = `translateY(${scrollY * 0.35}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Parallax Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full parallax-slow"
        style={{ height: '120%', top: '-10%' }}
      >
        <AppImage
          src="/assets/images/IMG_4961.JPG"
          alt="Akinode Korede Emmanuel in elegant blue suit, confident smile, studio portrait with teal panel"
          fill
          priority
          className="object-cover object-top"
          sizes="100vw"
        />
      </div>

      {/* Dark overlay left-to-right */}
      <div className="absolute inset-0 hero-overlay z-10" />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 hero-overlay-bottom z-10" />
      {/* Noise texture */}
      <div className="absolute inset-0 noise-overlay z-10 pointer-events-none opacity-40" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 w-full pt-24 pb-20">
        <div className="max-w-3xl">
          {/* Label */}
          <div
            className="section-label mb-6 hero-text-in"
            style={{ animationDelay: '0.1s' }}
          >
            Professional Violinist · Nigeria
          </div>

          {/* Name */}
          <h1
            className="font-bold tracking-tighter leading-none mb-4 text-foreground hero-text-in"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 7.5rem)', animationDelay: '0.25s' }}
          >
            AKINODE
          </h1>
          <h1
            className="font-bold tracking-tighter leading-none mb-2 text-gradient-teal hero-text-in"
            style={{ fontSize: 'clamp(2.8rem, 7.5vw, 6.5rem)', animationDelay: '0.4s', fontStyle: 'clamp' }}
          >
            KOREDE
          </h1>
          <h2
            className="font-light tracking-widest uppercase text-secondary mb-2 hero-text-in"
            style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', animationDelay: '0.55s', letterSpacing: '0.35em' }}
          >
            Emmanuel
          </h2>

          {/* Title badge */}
          <div
            className="inline-flex items-center gap-2 mt-4 mb-8 px-4 py-2 border border-accent/30 bg-primary/20 backdrop-blur-sm hero-text-in"
            style={{ animationDelay: '0.7s' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent pulse-dot" />
            <span className="text-xs font-mono tracking-widest uppercase text-accent">
              VIOLINIST
            </span>
          </div>

          {/* CTA */}
          <div
            className="flex flex-col sm:flex-row gap-4 hero-text-in"
            style={{ animationDelay: '0.85s' }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-bold text-sm tracking-widest uppercase hover:bg-secondary hover:text-background transition-all duration-300 group"
            >
              Book a Performance
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="group-hover:translate-x-1 transition-transform"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <a
              href="#videos"
              className="inline-flex items-center gap-3 px-8 py-4 border border-foreground/30 text-foreground font-semibold text-sm tracking-widest uppercase hover:border-accent hover:text-accent transition-all duration-300"
            >
              Watch Performances
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="text-xs font-mono text-muted-foreground tracking-widest uppercase">
          Scroll
        </span>
        <div className="scroll-indicator">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-accent"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}