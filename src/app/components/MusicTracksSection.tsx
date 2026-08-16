'use client';

import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';

const tracks = [
{
  id: 1,
  title: 'Vivaldi — Spring (Violin Solo)',
  artist: 'Akinode Korede Emmanuel',
  duration: '5:24',
  plays: '12.4K',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_198079d12-1779122468491.png",
  imageAlt: 'Orchestra concert hall with warm stage lighting, dark elegant atmosphere',
  waveHeights: [3, 5, 8, 12, 7, 14, 10, 6, 9, 13, 8, 5, 11, 7, 4, 9, 12, 6, 8, 10, 5, 7, 14, 9, 6]
},
{
  id: 2,
  title: 'NINEISH — Original Composition',
  artist: 'Akinode Korede Emmanuel',
  duration: '4:11',
  plays: '8.7K',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_181c5dbf7-1772892634964.png",
  imageAlt: 'Concert stage with blue atmospheric haze and spotlights, dark venue',
  waveHeights: [7, 11, 5, 9, 14, 6, 10, 3, 12, 8, 5, 13, 7, 9, 11, 4, 8, 12, 6, 10, 7, 5, 9, 13, 8]
},
{
  id: 3,
  title: 'Midnight — Korede Original',
  artist: 'Akinode Korede Emmanuel',
  duration: '6:02',
  plays: '6.2K',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_19aec588c-1778565873962.png",
  imageAlt: 'Violin on stage with dramatic side lighting, deep shadows and warm spotlight',
  waveHeights: [5, 8, 12, 7, 3, 10, 14, 9, 6, 11, 8, 5, 12, 7, 4, 9, 13, 6, 10, 8, 5, 11, 7, 9, 12]
},
{
  id: 4,
  title: 'Pink Floyd — Wish You Were Here (Violin)',
  artist: 'Akinode Korede Emmanuel',
  duration: '5:35',
  plays: '19.1K',
  image: "https://images.unsplash.com/photo-1603911397431-e5f500761d38",
  imageAlt: 'Close-up of violin strings and bow in moody low-key studio lighting',
  waveHeights: [9, 6, 13, 5, 10, 8, 3, 12, 7, 11, 9, 5, 14, 6, 8, 10, 4, 12, 7, 9, 11, 6, 8, 13, 5]
}];


export default function MusicTracksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [playing, setPlaying] = useState<number | null>(null);

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
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    elements?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      id="music"
      ref={sectionRef}
      className="py-20 md:py-28 bg-card relative overflow-hidden">
      
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(74,172,219,0.07) 0%, transparent 70%)',
          filter: 'blur(80px)'
        }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12 reveal">
          <div>
            <div className="section-label mb-4">Recordings</div>
            <h2 className="text-section font-bold tracking-tighter text-foreground">
              Music Tracks
            </h2>
          </div>
          <a
            href="https://soundcloud.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-muted-foreground hover:text-accent transition-colors">
            
            More Tracks on
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-accent">
              
              <path d="M11.56 8.87V17h8.76c.95 0 1.68-.77 1.68-1.73 0-.97-.73-1.74-1.68-1.74-.07 0-.13 0-.2.01.1-.3.15-.62.15-.96 0-1.72-1.38-3.12-3.07-3.12-.32 0-.62.05-.91.14C15.7 8.4 14.67 7.5 13.47 7.5c-.8 0-1.52.36-2.01.95V8.87zM2.44 12.5c0 1.38 1.12 2.5 2.5 2.5H10v-5H4.94c-1.38 0-2.5 1.12-2.5 2.5z" />
            </svg>
            SoundCloud
          </a>
        </div>

        {/* Tracks Grid: 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tracks?.map((track, i) =>
          <div
            key={track?.id}
            className={`track-card reveal`}
            style={{ transitionDelay: `${i * 80}ms` }}>
            
              <div className="flex gap-0 overflow-hidden">
                {/* Image */}
                <div className="flex-shrink-0 relative" style={{ width: '80px', height: '80px' }}>
                  <AppImage
                  src={track?.image}
                  alt={track?.imageAlt}
                  fill
                  className="object-cover"
                  sizes="80px" />
                
                  <div
                  className="absolute inset-0"
                  style={{ background: 'rgba(13,17,23,0.3)' }} />
                
                </div>

                {/* Track info */}
                <div className="flex-1 p-4 min-w-0">
                  {/* Artist label */}
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-accent tracking-widest">
                      Akinode Korede
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">SoundCloud</span>
                  </div>

                  {/* Title */}
                  <h4 className="text-sm font-bold text-foreground mb-3 truncate">
                    {track?.title}
                  </h4>

                  {/* Waveform */}
                  <div className="flex items-end gap-0.5 h-8 mb-3">
                    {track?.waveHeights?.map((h, idx) =>
                  <div
                    key={idx}
                    className="waveform-bar flex-1"
                    style={{
                      height: `${h / 14 * 100}%`,
                      opacity: playing === track?.id ? 1 : 0.5,
                      transition: `opacity 0.3s ease`
                    }} />

                  )}
                  </div>

                  {/* Controls row */}
                  <div className="flex items-center justify-between">
                    <button
                    onClick={() => setPlaying(playing === track?.id ? null : track?.id)}
                    className="flex items-center gap-2 text-xs text-muted-foreground hover:text-accent transition-colors group"
                    aria-label={playing === track?.id ? 'Pause' : 'Play'}>
                    
                      {playing === track?.id ?
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-accent">
                      
                          <rect x="6" y="4" width="4" height="16" />
                          <rect x="14" y="4" width="4" height="16" />
                        </svg> :

                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-accent group-hover:scale-110 transition-transform">
                      
                          <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                        </svg>
                    }
                      {playing === track?.id ? 'Playing' : 'Play'}
                    </button>
                    <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
                      <span>{track?.plays} plays</span>
                      <span>{track?.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}