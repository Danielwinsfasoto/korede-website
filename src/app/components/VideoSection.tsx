'use client';

import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';

const videos = [
{
  id: 1,
  title: 'Vivaldi — Four Seasons, Spring',
  subtitle: 'Live Performance · Lagos Cultural Centre',
  thumb: "https://img.rocket.new/generatedImages/rocket_gen_img_17fab8970-1773756206167.png",
  thumbAlt: 'Violin performance on stage under warm spotlights, dark concert hall atmosphere',
  duration: '8:42',
  youtubeId: 'GRxofEmo3HA'
},
{
  id: 2,
  title: 'Bach — Partita No. 2 in D minor',
  subtitle: 'Studio Recording · 2024',
  thumb: "https://images.unsplash.com/photo-1603911397431-e5f500761d38",
  thumbAlt: 'Close-up of violin strings and bow in dramatic low-key studio lighting',
  duration: '12:15',
  youtubeId: 'GRxofEmo3HA'
},
{
  id: 3,
  title: 'African Classical Fusion — Original Composition',
  subtitle: 'Live at Eko Hotel · Lagos, 2025',
  thumb: "https://images.unsplash.com/photo-1545794348-e3ea9287bd18",
  thumbAlt: 'Concert stage with blue and purple spotlights, atmospheric performance setting',
  duration: '6:30',
  youtubeId: 'GRxofEmo3HA'
},
{
  id: 4,
  title: 'Mendelssohn — Violin Concerto in E minor',
  subtitle: 'Abuja National Theatre · 2024',
  thumb: "https://img.rocket.new/generatedImages/rocket_gen_img_17fab8970-1773756206167.png",
  thumbAlt: 'Orchestra performance in grand concert hall, dramatic stage lighting, dark surroundings',
  duration: '10:08',
  youtubeId: 'GRxofEmo3HA'
}];


export default function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const elements = sectionRef?.current?.querySelectorAll('.reveal, .reveal-left');
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

  const active = videos?.[activeIndex];

  const prev = () => setActiveIndex((i) => i === 0 ? videos?.length - 1 : i - 1);
  const next = () => setActiveIndex((i) => i === videos?.length - 1 ? 0 : i + 1);

  return (
    <section
      id="videos"
      ref={sectionRef}
      className="py-20 md:py-28 bg-card relative overflow-hidden">
      
      {/* Ambient */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(74,172,219,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)'
        }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <div className="section-label mb-4">Performances</div>
          <h2 className="text-section font-bold tracking-tighter text-foreground">
            Featured Video
          </h2>
        </div>

        {/* Main Video */}
        <div className="relative mb-6 reveal">
          <div className="relative w-full rounded-sm overflow-hidden" style={{ aspectRatio: '16/9' }}>
            <AppImage
              src={active?.thumb}
              alt={active?.thumbAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 80vw" />
            
            {/* Scrim */}
            <div
              className="absolute inset-0"
              style={{ background: 'rgba(13,17,23,0.45)' }} />
            
            {/* Play button */}
            <a
              href={`https://www.youtube.com/watch?v=${active?.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="play-btn"
              aria-label={`Play ${active?.title}`}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
                width: '72px',
                height: '72px',
                background: 'rgba(74, 172, 219, 0.9)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}>
              
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-background ml-1">
                
                <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
              </svg>
            </a>

            {/* Duration badge */}
            <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm px-2 py-1 text-xs font-mono text-foreground z-10">
              {active?.duration}
            </div>
          </div>

          {/* Video title below */}
          <div className="mt-4 text-center">
            <p className="text-base font-semibold text-foreground">{active?.title}</p>
            <p className="text-sm text-muted-foreground mt-1">{active?.subtitle}</p>
          </div>
        </div>

        {/* Carousel Controls + Thumbnails */}
        <div className="flex items-center gap-4 reveal delay-100">
          {/* Prev Arrow */}
          <button
            onClick={prev}
            className="flex-shrink-0 w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-accent transition-all duration-200"
            aria-label="Previous video">
            
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Thumbnails */}
          <div className="flex-1 grid grid-cols-4 gap-2 overflow-hidden">
            {videos?.map((v, i) =>
            <button
              key={v?.id}
              onClick={() => setActiveIndex(i)}
              className={`relative overflow-hidden transition-all duration-300 ${
              i === activeIndex ?
              'ring-2 ring-accent opacity-100' : 'opacity-50 hover:opacity-80'}`
              }
              style={{ aspectRatio: '16/9' }}
              aria-label={`Select video: ${v?.title}`}>
              
                <AppImage
                src={v?.thumb}
                alt={v?.thumbAlt}
                fill
                className="object-cover"
                sizes="25vw" />
              
                <div
                className="absolute inset-0"
                style={{ background: 'rgba(13,17,23,0.3)' }} />
              
              </button>
            )}
          </div>

          {/* Next Arrow */}
          <button
            onClick={next}
            className="flex-shrink-0 w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-accent transition-all duration-200"
            aria-label="Next video">
            
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* See all link */}
        <div className="text-center mt-10 reveal delay-200">
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 border border-border text-sm font-semibold tracking-widest uppercase text-muted-foreground hover:border-accent hover:text-accent transition-all duration-300">
            
            See all Videos
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>);

}