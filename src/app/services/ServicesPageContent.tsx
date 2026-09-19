'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import AppImage from '@/components/ui/AppImage';

type ServiceMedia = {
  type: 'image' | 'video';
  src: string;
  alt: string;
};

type Service = {
  id: string;
  title: string;
  description: string;
  occasions: string[];
  media: ServiceMedia[];
};

const services: Service[] = [
  {
    id: 'solo-violin',
    title: 'Solo Violin Performance',
    description: 'For weddings, proposals, birthdays, dinners and special occasions.',
    occasions: ['Weddings', 'Proposals', 'Birthdays', 'Dinners', 'Special Occasions'],
    media: [
      { type: 'image', src: '/assets/images/IMG_4905.jpg', alt: 'Solo violin performance at an intimate event' },
      { type: 'image', src: '/assets/images/IMG_0824.jpg', alt: 'Solo violin performance at an intimate event' },

    ],
  },
  {
    id: 'violin-cello-duo',
    title: 'Violin & Cello Duo',
    description: 'Elegant live music for ceremonies, cocktail hours and intimate events.',
    occasions: ['Ceremonies', 'Cocktail Hours', 'Intimate Events'],
    media: [
      { type: 'image', src: '/assets/images/IMG_5196.jpg', alt: 'Violin and cello duo performing at a ceremony' },
      { type: 'image', src: '/assets/images/IMG_6459.jpg', alt: 'Violin and cello duo performing at a ceremony' },
    ],
  },
  {
    id: 'string-trio',
    title: 'String Trio',
    description: 'A beautiful combination of string instruments for events and celebrations.',
    occasions: ['Events', 'Celebrations'],
    media: [
      { type: 'image', src: '/assets/images/IMG_6968.JPG.jpeg', alt: 'String trio performing at an event' },
      { type: 'image', src: '/assets/images/IMG_2728.JPG', alt: 'String trio at a celebration' },
    ],
  },
  {
    id: 'string-quartet',
    title: 'String Quartet',
    description: 'A premium live string experience for weddings, corporate events and special occasions.',
    occasions: ['Weddings', 'Corporate Events', 'Special Occasions'],
    media: [
      { type: 'image', src: '/assets/images/IMG_0573.jpg', alt: 'A group picture of the String quartet' },
      { type: 'image', src: '/assets/images/IMG_7939.jpg', alt: 'String quartet at an event' },
    ],
  },
  {
    id: 'orchestra',
    title: 'Orchestra / Larger String Ensemble',
    description: 'For grand celebrations, concerts and large-scale productions.',
    occasions: ['Grand Celebrations', 'Concerts', 'Large-Scale Productions'],
    media: [
      { type: 'image', src: '/assets/images/IMG_8927.jpg', alt: 'Larger string ensemble performing at a concert' },
      { type: 'image', src: '/assets/images/IMG_7958.jpg', alt: 'Larger string ensemble performing at a concert' },

    ],
  },
  {
    id: 'studio-recording',
    title: 'Studio Recording / Session Violinist',
    description: 'For artists, producers, music directors and recording projects.',
    occasions: ['Artists', 'Producers', 'Music Directors', 'Recording Projects'],
    media: [
      { type: 'image', src: '/assets/images/IMG_8057.jpg', alt: 'Session violinist recording in a studio' },
    ],
  },
  {
    id: 'corporate-events',
    title: 'Corporate Events',
    description: 'Guest arrival, cocktail hour, special performances, conferences and launches.',
    occasions: ['Guest Arrival', 'Cocktail Hour', 'Special Performances', 'Conferences', 'Launches'],
    media: [
      { type: 'image', src: '/assets/images/IMG_9342.jpg', alt: 'Live violin at a corporate event guest arrival' },
      { type: 'image', src: '/assets/images/IMG_9203.jpg', alt: 'Performance at a corporate launch event' },
    ],
  },
  {
    id: 'wedding-performances',
    title: 'Wedding Performances',
    description: 'Guest arrival, wedding ceremony, first dance, special performances and cocktail hour.',
    occasions: ['Guest Arrival', 'Ceremony', 'First Dance', 'Special Performances', 'Cocktail Hour'],
    media: [
      { type: 'image', src: '/assets/images/IMG_7663.JPG.jpeg', alt: 'First dance violin performance' },
      { type: 'video', src: 'https://rtmvzkxnzqxoreczpwth.supabase.co/storage/v1/object/public/videos/Img%209211.mp4', alt: 'Violin performance at a wedding ceremony' },
      { type: 'video', src: 'https://rtmvzkxnzqxoreczpwth.supabase.co/storage/v1/object/public/videos/Img%208236.mp4', alt: 'Violin performance at a wedding ceremony' },

      
    ],
  },
  {
    id: 'private-events',
    title: 'Private Events',
    description: 'Birthdays, proposals, dinners, anniversaries and other celebrations.',
    occasions: ['Birthdays', 'Proposals', 'Dinners', 'Anniversaries', 'Celebrations'],
    media: [
      { type: 'image', src: '/assets/images/IMG_7895.jpg', alt: 'Violin performance at a Marriage proposal' },
      { type: 'image', src: '/assets/images/IMG_8775.JPG', alt: 'Solo violin performance at an intimate event' },

    ],
  },
];

export default function ServicesPageContent() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<{ serviceId: string; mediaIndex: number } | null>(null);

  useEffect(() => {
    const elements = sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right');
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
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const openLightbox = (serviceId: string, mediaIndex: number) => {
    setLightbox({ serviceId, mediaIndex });
  };

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const activeService = lightbox ? services.find((s) => s.id === lightbox.serviceId) : null;

  const showPrev = useCallback(() => {
    if (!lightbox || !activeService) return;
    const total = activeService.media.length;
    setLightbox({
      ...lightbox,
      mediaIndex: (lightbox.mediaIndex - 1 + total) % total,
    });
  }, [lightbox, activeService]);

  const showNext = useCallback(() => {
    if (!lightbox || !activeService) return;
    const total = activeService.media.length;
    setLightbox({
      ...lightbox,
      mediaIndex: (lightbox.mediaIndex + 1) % total,
    });
  }, [lightbox, activeService]);

  // Keyboard controls + body scroll lock while the lightbox is open
  useEffect(() => {
    if (!lightbox) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [lightbox, closeLightbox, showPrev, showNext]);

  const activeMedia = activeService ? activeService.media[lightbox!.mediaIndex] : null;

  return (
    <div ref={sectionRef} className="pt-24 pb-20">
      {/* Page Hero */}
      <div className="relative py-20 md:py-28 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 30% 50%, rgba(43,95,117,0.15) 0%, transparent 60%)',
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="section-label mb-6 reveal">What We Offer</div>
          <h1
            className="font-bold tracking-tighter text-foreground reveal delay-100"
            style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}
          >
            Our <br />
            <span className="text-gradient-teal">Services</span>
          </h1>
          <p className="mt-6 max-w-lg text-muted-foreground text-lg leading-relaxed reveal delay-200">
            From an intimate solo performance to a full string ensemble — live music tailored to your event, every time.
          </p>
        </div>
      </div>

      {/* Services List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 border-t border-border">
        <div className="space-y-24">
          {services.map((service, index) => {
            const isReversed = index % 2 === 1;
            return (
              <div
                key={service.id}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
              >
                {/* Text */}
                <div
                  className={`${isReversed ? 'lg:order-2 reveal-right' : 'reveal-left'}`}
                >
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-foreground mb-4">
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.occasions.map((occasion) => (
                      <span
                        key={occasion}
                        className="text-xs font-mono text-muted-foreground uppercase tracking-widest border border-border px-3 py-1.5"
                      >
                        {occasion}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Media gallery */}
                <div
                  className={`${isReversed ? 'lg:order-1 reveal-left' : 'reveal-right'}`}
                >
                  <div className="grid grid-cols-2 gap-3">
                    {service.media.map((item, mediaIndex) => (
                      <button
                        key={item.src}
                        type="button"
                        onClick={() => openLightbox(service.id, mediaIndex)}
                        aria-label={
                          item.type === 'video'
                            ? `Play video: ${item.alt}`
                            : `View full image: ${item.alt}`
                        }
                        className="relative overflow-hidden border border-border group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        style={{ aspectRatio: '4/5' }}
                      >
                        {item.type === 'video' ? (
                          <video
                            src={item.src}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                          />
                        ) : (
                          <AppImage
                            src={item.src}
                            alt={item.alt}
                            fill
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                            sizes="(max-width: 1024px) 50vw, 25vw"
                          />
                        )}

                        {/* Video badge */}
                        {item.type === 'video' && (
                          <div className="absolute top-2 left-2 flex items-center gap-1 bg-background/70 backdrop-blur-sm px-2 py-1">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-foreground">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-foreground">
                              Video
                            </span>
                          </div>
                        )}

                        {/* Hover overlay with expand icon */}
                        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/30 transition-colors duration-300 flex items-center justify-center">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          >
                            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                          </svg>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && activeService && activeMedia && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-8"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close full view"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 flex items-center justify-center border border-white/20 text-white hover:bg-white/10 transition-colors duration-200 z-10"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Prev arrow */}
          {activeService.media.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              aria-label="Previous item"
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center border border-white/20 text-white hover:bg-white/10 transition-colors duration-200 z-10"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          {/* Next arrow */}
          {activeService.media.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              aria-label="Next item"
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center border border-white/20 text-white hover:bg-white/10 transition-colors duration-200 z-10"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}

          {/* Full media */}
          {activeMedia.type === 'video' ? (
            <video
              key={activeMedia.src}
              src={activeMedia.src}
              controls
              autoPlay
              playsInline
              onClick={(e) => e.stopPropagation()}
              className="max-w-[90vw] max-h-[85vh] object-contain"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={activeMedia.src}
              alt={activeMedia.alt}
              onClick={(e) => e.stopPropagation()}
              className="max-w-[90vw] max-h-[85vh] object-contain"
            />
          )}

          {/* Caption */}
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-white text-sm font-semibold">{activeService.title}</p>
            {activeService.media.length > 1 && (
              <p className="text-white/60 text-xs font-mono mt-1">
                {lightbox.mediaIndex + 1} / {activeService.media.length}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}