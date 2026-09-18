'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

export default function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const elements = sectionRef.current?.querySelectorAll(
      '.reveal, .reveal-left'
    );

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
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="videos"
      ref={sectionRef}
      className="py-20 md:py-28 bg-card relative overflow-hidden"
    >
      {/* Ambient */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(74,172,219,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <div className="section-label mb-4">Performance</div>

          <h2 className="text-section font-bold tracking-tighter text-foreground">
            Featured Video
          </h2>
        </div>

        {/* Featured Video */}
        <div className="relative max-w-5xl mx-auto reveal">
          <div
            className="relative w-full rounded-sm overflow-hidden"
            style={{ aspectRatio: '16/9' }}
          >
            <AppImage
              src="https://img.youtube.com/vi/bVoX47NdylA/maxresdefault.jpg"
              alt="Akinode Korede performing violin on stage"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1024px"
            />

            {/* Scrim */}
            <div
              className="absolute inset-0"
              style={{
                background: 'rgba(13,17,23,0.45)',
              }}
            />

            {/* Play Button */}
            <a
              href="https://youtu.be/bVoX47NdylA?si=_i03P3k1CriBvlII"
              target="_blank"
              rel="noopener noreferrer"
              className="group absolute top-1/2 left-1/2 flex items-center justify-center
                w-[72px] h-[72px] rounded-full z-10
                transition-all duration-300 hover:scale-110"
              aria-label="Play featured video"
              style={{
                transform: 'translate(-50%, -50%)',
                background: 'rgba(74, 172, 219, 0.9)',
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-background ml-1 transition-transform duration-300 group-hover:scale-110"
              >
                <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
              </svg>
            </a>

            {/* YouTube label */}
            <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1.5 text-xs font-mono text-foreground z-10">
              YouTube
            </div>
          </div>

          {/* Video Information */}
          <div className="mt-5 text-center">
            <p className="text-lg font-semibold text-foreground">
              Featured Performance
            </p>

            <p className="text-sm text-muted-foreground mt-1">
              LIVE ON NTA 🎻🇳🇬 | KStrings National TV Debut + Live Violin Performance
            </p>
          </div>
        </div>

        {/* See all videos */}
        <div className="text-center mt-10 reveal delay-200">
          <a
            href="https://youtu.be/bVoX47NdylA?si=_i03P3k1CriBvlII"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 border border-border
              text-sm font-semibold tracking-widest uppercase
              text-muted-foreground hover:border-accent hover:text-accent
              transition-all duration-300"
          >
            Watch on YouTube

            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}