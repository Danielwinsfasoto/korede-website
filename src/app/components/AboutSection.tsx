'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

export default function AboutSection() {
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
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    elements?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 md:py-28 bg-background relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(43,95,117,0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text */}
          <div className="reveal-left">
            <div className="section-label mb-6">About the Artist</div>
            <h2 className="text-section font-bold tracking-tighter text-foreground mb-6 leading-tight">
              ABOUT <br />
              <span className="text-gradient-teal">KOREDE</span>
            </h2>

            <blockquote className="border-l-2 border-accent pl-6 mb-8">
              <p className="text-xl md:text-2xl font-semibold text-foreground leading-relaxed italic">
                &ldquo;Music is the language of the soul — the violin speaks what words cannot.&rdquo;
              </p>
            </blockquote>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Akinode Korede Emmanuel is a classically trained Nigerian violinist whose performances bridge the rich traditions of Western classical music with the vibrant rhythms of West African musical heritage.
              </p>
              <p>
                With over a decade of dedicated practice and performance, Korede has graced prestigious concert halls and intimate venues across Nigeria, bringing the violin's expressive voice to audiences who have never experienced live classical music before.
              </p>
              <p>
                His technical mastery of the instrument is matched only by his passion for musical storytelling — each performance a carefully crafted emotional journey that leaves audiences transformed.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-border">
              {[
                { value: '10+', label: 'Years Performing' },
                { value: '200+', label: 'Live Concerts' },
                { value: '15+', label: 'Recordings' },
              ]?.map((stat) => (
                <div key={stat?.label}>
                  <div className="text-3xl font-bold text-accent mb-1">{stat?.value}</div>
                  <div className="text-xs font-mono text-muted-foreground tracking-widest uppercase">
                    {stat?.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <div className="reveal-right">
            <div className="relative">
              {/* Decorative frame */}
              <div
                className="absolute -top-4 -left-4 w-full h-full border border-primary/40 z-0"
                style={{ borderRadius: '2px' }}
              />
              <div className="relative z-10 overflow-hidden" style={{ aspectRatio: '3/4' }}>
                <AppImage
                  src="/assets/images/WhatsApp_Image_2026-08-14_at_3.44.07_PM__1_-1786751045549.jpeg"
                  alt="Akinode Korede Emmanuel in vibrant blue suit, smiling confidently against a teal studio panel"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Subtle overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(13,17,23,0.5) 0%, transparent 50%)',
                  }}
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-4 bg-card border border-border p-4 z-20 card-glow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 flex items-center justify-center">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-accent"
                    >
                      <path d="M9 18V5l12-2v13" />
                      <circle cx="6" cy="18" r="3" />
                      <circle cx="18" cy="16" r="3" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                      Instrument
                    </div>
                    <div className="text-sm font-bold text-foreground">Classical Violin</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}