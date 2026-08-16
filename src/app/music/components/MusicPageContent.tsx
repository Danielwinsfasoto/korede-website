'use client';

import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';

const albums = [
{
  id: 1,
  title: 'Strings of the Sun',
  year: '2024',
  tracks: 8,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_17fab8970-1773756206167.png",
  imageAlt: 'Orchestra concert hall with warm golden stage lighting, elegant dark atmosphere',
  description: 'A debut album exploring the intersection of Baroque violin technique and West African tonal traditions.',
  genre: 'Classical / Fusion'
},
{
  id: 2,
  title: 'Midnight Resonance',
  year: '2023',
  tracks: 6,
  image: "https://images.unsplash.com/photo-1603911397431-e5f500761d38",
  imageAlt: 'Violin strings close-up in moody low-key studio lighting, deep shadows',
  description: 'A contemplative collection of original compositions written during late-night studio sessions.',
  genre: 'Contemporary Classical'
},
{
  id: 3,
  title: 'Echoes of Lagos',
  year: '2022',
  tracks: 10,
  image: "https://images.unsplash.com/photo-1541387442741-b1af9554f3ee",
  imageAlt: 'Concert stage with blue atmospheric haze, live performance energy',
  description: 'A live recording capturing the raw energy of a sold-out Lagos performance.',
  genre: 'Live / Classical'
}];


const fullTracks = [
{
  id: 1,
  no: '01',
  title: 'Vivaldi — Spring (Violin Solo)',
  album: 'Strings of the Sun',
  duration: '5:24',
  plays: '12.4K',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_10875c927-1778479783702.png",
  imageAlt: 'Concert hall stage with warm golden lighting',
  waveHeights: [3, 5, 8, 12, 7, 14, 10, 6, 9, 13, 8, 5, 11, 7, 4, 9, 12, 6, 8, 10, 5, 7, 14, 9, 6]
},
{
  id: 2,
  no: '02',
  title: 'NINEISH — Original Composition',
  album: 'Strings of the Sun',
  duration: '4:11',
  plays: '8.7K',
  image: "https://images.unsplash.com/photo-1639070387552-2215ecc6f9d0",
  imageAlt: 'Concert stage with blue atmospheric lighting',
  waveHeights: [7, 11, 5, 9, 14, 6, 10, 3, 12, 8, 5, 13, 7, 9, 11, 4, 8, 12, 6, 10, 7, 5, 9, 13, 8]
},
{
  id: 3,
  no: '03',
  title: 'Midnight — Korede Original',
  album: 'Midnight Resonance',
  duration: '6:02',
  plays: '6.2K',
  image: "https://images.unsplash.com/photo-1677169569657-022b0ed89c0a",
  imageAlt: 'Violin on stage with dramatic side spotlight lighting',
  waveHeights: [5, 8, 12, 7, 3, 10, 14, 9, 6, 11, 8, 5, 12, 7, 4, 9, 13, 6, 10, 8, 5, 11, 7, 9, 12]
},
{
  id: 4,
  no: '04',
  title: 'Pink Floyd — Wish You Were Here (Violin)',
  album: 'Midnight Resonance',
  duration: '5:35',
  plays: '19.1K',
  image: "https://images.unsplash.com/photo-1603911397431-e5f500761d38",
  imageAlt: 'Violin strings close-up in moody low-key lighting',
  waveHeights: [9, 6, 13, 5, 10, 8, 3, 12, 7, 11, 9, 5, 14, 6, 8, 10, 4, 12, 7, 9, 11, 6, 8, 13, 5]
},
{
  id: 5,
  no: '05',
  title: 'Bach — Partita No. 2 in D minor',
  album: 'Strings of the Sun',
  duration: '12:15',
  plays: '5.3K',
  image: "https://images.unsplash.com/photo-1508025207422-d8d96174b278",
  imageAlt: 'Violin instrument on dark background, elegant musical photography',
  waveHeights: [6, 9, 4, 11, 8, 14, 5, 10, 7, 12, 6, 9, 3, 11, 8, 5, 13, 7, 10, 6, 9, 12, 4, 8, 11]
},
{
  id: 6,
  no: '06',
  title: 'African Sunrise — Original',
  album: 'Echoes of Lagos',
  duration: '7:18',
  plays: '9.8K',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_138134413-1767919495616.png",
  imageAlt: 'Award ceremony stage with bright spotlights, elegant dark event hall',
  waveHeights: [10, 7, 13, 5, 9, 12, 6, 14, 8, 4, 11, 7, 9, 13, 5, 10, 6, 12, 8, 3, 11, 7, 9, 14, 6]
}];


export default function MusicPageContent() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState<number | null>(null);

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

  return (
    <div ref={sectionRef} className="pt-24 pb-20">
      {/* Page Hero */}
      <div className="relative py-20 md:py-28 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
            'radial-gradient(ellipse at 60% 50%, rgba(74,172,219,0.08) 0%, transparent 60%)'
          }} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="section-label mb-6 reveal">Discography</div>
          <h1 className="font-bold tracking-tighter text-foreground reveal delay-100" style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}>
            Music &amp; <br />
            <span className="text-gradient-teal">Recordings</span>
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground text-lg leading-relaxed reveal delay-200">
            A collection of classical violin performances, original compositions, and studio recordings spanning a decade of artistry.
          </p>
        </div>
      </div>
      {/* Albums */}
      <section className="py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tighter text-foreground mb-10 reveal">
            <span className="section-label block mb-3">Collections</span>
            Albums &amp; EPs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {albums?.map((album, i) =>
            <div
              key={album?.id}
              className="bg-card border border-border overflow-hidden card-glow-hover reveal"
              style={{ transitionDelay: `${i * 100}ms` }}>
              
                <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <AppImage
                  src={album?.image}
                  alt={album?.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw" />
                
                  <div
                  className="absolute inset-0"
                  style={{
                    background:
                    'linear-gradient(to top, rgba(13,17,23,0.8) 0%, rgba(13,17,23,0.2) 60%, transparent 100%)'
                  }} />
                
                  <div className="absolute top-3 left-3 bg-primary/80 backdrop-blur-sm px-2 py-1 text-xs font-mono text-foreground">
                    {album?.genre}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-1">{album?.title}</h3>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-mono text-accent">{album?.year}</span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground">{album?.tracks} tracks</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {album?.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Track Listing */}
      <section className="py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tighter text-foreground mb-10 reveal">
            <span className="section-label block mb-3">All Tracks</span>
            Full Tracklist
          </h2>

          <div className="space-y-1">
            {fullTracks?.map((track, i) =>
            <div
              key={track?.id}
              className="track-card reveal"
              style={{ transitionDelay: `${i * 60}ms` }}>
              
                <div className="flex items-center gap-4 p-4">
                  {/* Track number */}
                  <span className="text-xs font-mono text-muted-foreground w-6 flex-shrink-0">
                    {track?.no}
                  </span>

                  {/* Thumbnail */}
                  <div className="flex-shrink-0 relative overflow-hidden" style={{ width: '48px', height: '48px' }}>
                    <AppImage
                    src={track?.image}
                    alt={track?.imageAlt}
                    fill
                    className="object-cover"
                    sizes="48px" />
                  
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-foreground truncate">{track?.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5 truncate">{track?.album}</div>
                  </div>

                  {/* Waveform (hidden on mobile) */}
                  <div className="hidden md:flex items-end gap-0.5 h-8 w-32 flex-shrink-0">
                    {track?.waveHeights?.map((h, idx) =>
                  <div
                    key={idx}
                    className="waveform-bar flex-1"
                    style={{
                      height: `${h / 14 * 100}%`,
                      opacity: playing === track?.id ? 1 : 0.4,
                      transition: 'opacity 0.3s ease'
                    }} />

                  )}
                  </div>

                  {/* Plays */}
                  <span className="hidden sm:block text-xs font-mono text-muted-foreground flex-shrink-0 w-16 text-right">
                    {track?.plays}
                  </span>

                  {/* Duration */}
                  <span className="text-xs font-mono text-muted-foreground flex-shrink-0 w-10 text-right">
                    {track?.duration}
                  </span>

                  {/* Play button */}
                  <button
                  onClick={() => setPlaying(playing === track?.id ? null : track?.id)}
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center border border-border hover:border-accent hover:text-accent text-muted-foreground transition-all duration-200"
                  aria-label={playing === track?.id ? 'Pause' : 'Play'}>
                  
                    {playing === track?.id ?
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                      </svg> :

                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                      </svg>
                  }
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Performance History */}
      <section className="py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tighter text-foreground mb-10 reveal">
            <span className="section-label block mb-3">Live Shows</span>
            Performance History
          </h2>
          <div className="space-y-4">
            {[
            { date: 'Oct 2025', venue: 'Muson Centre', city: 'Lagos, Nigeria', event: 'Nigerian Classical Music Festival', status: 'Upcoming' },
            { date: 'Mar 2025', venue: 'Eko Hotel & Suites', city: 'Lagos, Nigeria', event: 'Spring Classical Evening', status: 'Performed' },
            { date: 'Dec 2024', venue: 'Abuja National Theatre', city: 'Abuja, Nigeria', event: 'Christmas Gala Concert', status: 'Performed' },
            { date: 'Jul 2024', venue: 'Terra Kulture Arena', city: 'Lagos, Nigeria', event: 'West African Arts Festival', status: 'Performed' },
            { date: 'Feb 2024', venue: 'Alliance Française', city: 'Lagos, Nigeria', event: 'Valentine Classical Evening', status: 'Performed' }]?.
            map((perf, i) =>
            <div
              key={i}
              className="flex flex-col sm:flex-row sm:items-center gap-4 py-5 border-b border-border reveal"
              style={{ transitionDelay: `${i * 60}ms` }}>
              
                <span className="text-xs font-mono text-accent w-20 flex-shrink-0">{perf?.date}</span>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-foreground">{perf?.event}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {perf?.venue} · {perf?.city}
                  </div>
                </div>
                <span
                className={`text-xs font-mono px-3 py-1 flex-shrink-0 ${
                perf?.status === 'Upcoming' ? 'bg-accent/10 text-accent border border-accent/30' : 'bg-muted text-muted-foreground border border-border'}`
                }>
                
                  {perf?.status}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>);

}