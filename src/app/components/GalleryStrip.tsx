'use client';

import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';

const galleryImages = [
  {
    src: '/assets/images/IMG_4964.JPG',
    alt: '',
  },
  {
    src: '/assets/images/IMG_1553.JPG',
    alt: '',
  },
  {
    src: '/assets/images/IMG_0824.jpg',
    alt: '',
  },
  {
    src: '/assets/images/IMG_4962.jpg',
    alt: '',
  },
  {
    src: '/assets/images/IMG_0573.jpg',
    alt: '',
  },
  {
    src: '/assets/images/IMG_1555.JPG',
    alt: '',
  },
  {
    src: '/assets/images/IMG_2907.PNG',
    alt: '',
  },
  {
    src: '/assets/images/IMG_3550.JPG',
    alt: '',
  },
  {
    src: '/assets/images/IMG_2913.PNG',
    alt: '',
  },
  {
    src: '/assets/images/IMG_2728.JPG',
    alt: '',
  },
  {
    src: '/assets/images/IMG_4960.JPG',
    alt: '',
  },
  {
    src: '/assets/images/IMG_4890.JPG',
    alt: '',
  },
  {
    src: "/assets/images/IMG_4961.JPG",
    alt: ''
  },
   {
    src: "/assets/images/IMG_7153.JPG",
    alt: ''
  },
  {
    src: "/assets/images/IMG_8515.JPG",
    alt: ''
  },
  {
    src: "/assets/images/IMG_8775.JPG",
    alt: ''
  },
  {
    src: "/assets/images/IMG_9203.jpg",
    alt: ''
  }
];



const loopedImages = [...galleryImages, ...galleryImages];

export default function GalleryStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const animFrameRef = useRef<number | null>(null);
  const posRef = useRef(0);
  const pausedRef = useRef(false);

  // Drag state
  const draggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartPosRef = useRef(0);
  const draggedRef = useRef(false);

  // Tracks which gallery item was pressed, captured at pointerdown —
  // before setPointerCapture() causes later events to retarget to the track.
  const tapIndexRef = useRef<number | null>(null);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // --------------------------------------------------
  // Reveal on scroll
  // --------------------------------------------------
  useEffect(() => {
    const elements = sectionRef.current?.querySelectorAll('.reveal');

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
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // --------------------------------------------------
  // Keep position within the duplicated track
  // --------------------------------------------------
  const normalizePosition = (position: number) => {
    const track = trackRef.current;

    if (!track) return 0;

    const halfWidth = track.scrollWidth / 2;

    if (halfWidth <= 0) return 0;

    let normalized = position % halfWidth;

    if (normalized < 0) {
      normalized += halfWidth;
    }

    return normalized;
  };

  const applyPosition = (position: number) => {
    const track = trackRef.current;

    if (!track) return;

    const normalized = normalizePosition(position);

    posRef.current = normalized;
    track.style.transform = `translate3d(-${normalized}px, 0, 0)`;
  };

  // --------------------------------------------------
  // Automatic scrolling
  // --------------------------------------------------
  useEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    const speed = 0.5;

    const step = () => {
      if (!pausedRef.current && !draggingRef.current) {
        applyPosition(posRef.current + speed);
      }

      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // --------------------------------------------------
  // Move gallery manually
  // --------------------------------------------------
  const moveGallery = (direction: 'left' | 'right') => {
    const amount = 440;

    pausedRef.current = true;

    if (direction === 'left') {
      applyPosition(posRef.current - amount);
    } else {
      applyPosition(posRef.current + amount);
    }

    window.setTimeout(() => {
      if (!draggingRef.current) {
        pausedRef.current = false;
      }
    }, 700);
  };

  // --------------------------------------------------
  // Mouse / Touch drag
  // --------------------------------------------------
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    draggedRef.current = false;
    pausedRef.current = true;

    dragStartXRef.current = e.clientX;
    dragStartPosRef.current = posRef.current;

    // Record which item (if any) was actually pressed, using the real
    // event target now — before pointer capture retargets later events
    // to this track element.
    const itemEl = (e.target as HTMLElement).closest<HTMLElement>(
      '[data-gallery-index]'
    );
    tapIndexRef.current = itemEl ? Number(itemEl.dataset.galleryIndex) : null;

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;

    const distance = e.clientX - dragStartXRef.current;

    if (Math.abs(distance) > 5) {
      draggedRef.current = true;
    }

    applyPosition(dragStartPosRef.current - distance);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const wasDragged = draggedRef.current;

    draggingRef.current = false;
    pausedRef.current = false;

    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }

    // A tap/click: no drag happened, and the press started on a real item.
    if (!wasDragged && tapIndexRef.current !== null) {
      openLightbox(tapIndexRef.current);
    }

    tapIndexRef.current = null;
  };

  const handlePointerCancel = () => {
    draggingRef.current = false;
    pausedRef.current = false;
    tapIndexRef.current = null;
  };

  // --------------------------------------------------
  // Open lightbox
  // --------------------------------------------------
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = '';
  };

  // --------------------------------------------------
  // Lightbox navigation
  // --------------------------------------------------
  const showPrevious = () => {
    setLightboxIndex((current) => {
      if (current === null) return null;

      return current === 0 ? galleryImages.length - 1 : current - 1;
    });
  };

  const showNext = () => {
    setLightboxIndex((current) => {
      if (current === null) return null;

      return current === galleryImages.length - 1 ? 0 : current + 1;
    });
  };

  // --------------------------------------------------
  // Keyboard controls
  // --------------------------------------------------
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      }

      if (e.key === 'ArrowLeft') {
        showPrevious();
      }

      if (e.key === 'ArrowRight') {
        showNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex]);

  // Restore body scroll if component disappears
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const currentLightboxImage =
    lightboxIndex !== null ? galleryImages[lightboxIndex] : null;

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="bg-background py-0 overflow-hidden"
    >
      {/* Section label */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 reveal">
        <div className="section-label mb-2">Gallery</div>

        <h2 className="text-2xl font-bold tracking-tighter text-foreground">
          Photo Gallery
        </h2>
      </div>

      {/* Gallery viewport */}
      <div
        ref={viewportRef}
        className="relative overflow-hidden reveal delay-100 group"
        onMouseEnter={() => {
          pausedRef.current = true;
        }}
        onMouseLeave={() => {
          if (!draggingRef.current) {
            pausedRef.current = false;
          }
        }}
      >
        {/* Left button */}
        <button
          type="button"
          onClick={() => moveGallery('left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10
                     w-11 h-11 rounded-full
                     bg-black/55 backdrop-blur-sm
                     text-white text-2xl
                     flex items-center justify-center
                     opacity-0 group-hover:opacity-100
                     transition-all duration-300
                     hover:bg-black/80 hover:scale-105"
          aria-label="Scroll gallery left"
        >
          ‹
        </button>

        {/* Right button */}
        <button
          type="button"
          onClick={() => moveGallery('right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10
                     w-11 h-11 rounded-full
                     bg-black/55 backdrop-blur-sm
                     text-white text-2xl
                     flex items-center justify-center
                     opacity-0 group-hover:opacity-100
                     transition-all duration-300
                     hover:bg-black/80 hover:scale-105"
          aria-label="Scroll gallery right"
        >
          ›
        </button>

        {/* Track */}
        <div
          ref={trackRef}
          className="flex gap-1 select-none touch-pan-y cursor-grab active:cursor-grabbing"
          style={{
            willChange: 'transform',
            width: 'max-content',
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
        >
          {loopedImages.map((img, i) => {
            const originalIndex = i % galleryImages.length;

            return (
              <div
                key={`${img.src}-${i}`}
                className="gallery-item flex-shrink-0 cursor-pointer relative overflow-hidden"
                data-gallery-index={originalIndex}
                style={{
                  width: '220px',
                  height: '220px',
                }}
                role="button"
                tabIndex={0}
                aria-label={img.alt ? `View image: ${img.alt}` : 'View full image'}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(originalIndex);
                  }
                }}
              >
                <AppImage
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  sizes="220px"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {currentLightboxImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md
                     flex items-center justify-center p-4 sm:p-8"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-20
                       w-11 h-11 rounded-full
                       bg-white/10 hover:bg-white/20
                       text-white text-3xl
                       flex items-center justify-center
                       transition-colors"
            aria-label="Close"
          >
            ×
          </button>

          {/* Previous */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showPrevious();
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20
                       w-11 h-11 sm:w-12 sm:h-12
                       rounded-full
                       bg-white/10 hover:bg-white/20
                       text-white text-3xl
                       flex items-center justify-center
                       transition-all"
            aria-label="Previous image"
          >
            ‹
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20
                       w-11 h-11 sm:w-12 sm:h-12
                       rounded-full
                       bg-white/10 hover:bg-white/20
                       text-white text-3xl
                       flex items-center justify-center
                       transition-all"
            aria-label="Next image"
          >
            ›
          </button>

          {/* Image area */}
          <div
            className="relative w-full max-w-6xl h-[78vh] sm:h-[82vh]
                       flex items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <AppImage
              key={currentLightboxImage.src}
              src={currentLightboxImage.src}
              alt={currentLightboxImage.alt}
              fill
              priority
              className="absolute inset-0 w-full h-full object-contain"
              style={{ objectFit: 'contain' }}
              sizes="90vw"
            />
          </div>

          {/* Caption */}
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2
                       w-[90%] max-w-2xl text-center"
          >
            <p className="text-white/80 text-sm sm:text-base">
              {currentLightboxImage.alt}
            </p>

            <p className="text-white/40 text-xs mt-1">
              {lightboxIndex! + 1} / {galleryImages.length}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}