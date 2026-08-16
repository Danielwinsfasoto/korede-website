'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

const galleryImages = [
{
  src: "https://images.unsplash.com/photo-1501828983797-9d7f14e0263c",
  alt: 'Concert stage with blue spotlights, energetic crowd in dark venue'
},
{
  src: "https://images.unsplash.com/photo-1734120113532-dad912debeb0",
  alt: 'Performer under purple and teal stage lights, dramatic concert atmosphere'
},
{
  src: "https://images.unsplash.com/photo-1502654498034-3b2cbb99ffaf",
  alt: 'Violin performance on stage, warm spotlight, dark concert hall'
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_17fab8970-1773756206167.png",
  alt: 'Orchestra in grand concert hall, formal performance, warm stage lighting'
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_1f713d075-1778992704052.png",
  alt: 'Concert stage with blue haze, atmospheric live music performance'
},
{
  src: "https://images.unsplash.com/photo-1599683612558-a9de28028a4b",
  alt: 'Close-up of violin strings and bow, dramatic studio lighting'
},
{
  src: "https://images.unsplash.com/photo-1508025207422-d8d96174b278",
  alt: 'Violin instrument on dark background, elegant musical photography'
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_138134413-1767919495616.png",
  alt: 'Award ceremony stage with bright spotlights, elegant dark event hall'
}];


export default function GalleryStrip() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const elements = sectionRef?.current?.querySelectorAll('.reveal');
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
    elements?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="bg-background py-0 overflow-hidden">
      
      {/* Section label */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 reveal">
        <div className="section-label mb-2">Gallery</div>
        <h2 className="text-2xl font-bold tracking-tighter text-foreground">
          Photo Gallery
        </h2>
      </div>
      {/* Gallery strip: 8 cols */}
      <div className="grid grid-cols-4 md:grid-cols-8 gap-0.5 reveal delay-100">
        {galleryImages?.map((img, i) =>
        <div
          key={i}
          className="gallery-item"
          style={{ aspectRatio: '1 / 1' }}>
          
            <AppImage
            src={img?.src}
            alt={img?.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 25vw, 12.5vw" />
          
          </div>
        )}
      </div>
      {/* Second row for mobile: shows 4 cols × 2 rows naturally via grid */}
    </section>);

}