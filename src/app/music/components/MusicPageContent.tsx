'use client';

import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';

const fullTracks = [
  {
    id: 1,
    no: '01',
    title: 'Beautiful In White',
    album: 'Violin Cover',
    duration: '1:12',
    // plays: '1.3K',
    audio: '/assets/audio/beautiful in white ak3 cover.wav',
    image:
      'https://i.scdn.co/image/ab67616d00001e02544a6820c258fab5eda3dc34',
    imageAlt: 'Concert hall stage with warm golden lighting',
    waveHeights: [
      3, 5, 8, 12, 7, 14, 10, 6, 9, 13, 8, 5, 11, 7, 4, 9, 12, 6, 8,
      10, 5, 7, 14, 9, 6,
    ],
  },
  {
    id: 2,
    no: '02',
    title: 'Dandelions',
    album: 'Violin Cover',
    duration: '1:43',
    // plays: '8.7K',
    audio: '/assets/audio/dandelions ak3.wav',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnbay7-lTz41XMr1fw4oDeTmUYIbMYMJ76wRZhQ88-TbymhARjsukxdLH3&s=10',
    imageAlt: 'Concert stage with blue atmospheric lighting',
    waveHeights: [
      7, 11, 5, 9, 14, 6, 10, 3, 12, 8, 5, 13, 7, 9, 11, 4, 8, 12, 6,
      10, 7, 5, 9, 13, 8,
    ],
  },
  {
    id: 3,
    no: '03',
    title: 'Hallelujah',
    album: 'Violin cover',
    duration: '0:22',
    // plays: '6.2K',
    audio: '/assets/audio/hallelujah ak3 remix.wav',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSScjQXVHb2Ng51HcHI3A-ILDuoxyu4HeRu_hKQ6DEU8O0Row8Ze7wgLaEa&s=10',
    imageAlt: 'Violin on stage with dramatic side spotlight lighting',
    waveHeights: [
      5, 8, 12, 7, 3, 10, 14, 9, 6, 11, 8, 5, 12, 7, 4, 9, 13, 6, 10,
      8, 5, 11, 7, 9, 12,
    ],
  },
  {
    id: 4,
    no: '04',
    title: 'Ordinary',
    album: 'Violin Cover',
    duration: '1:07',
    // plays: '19.1K',
    audio: '/assets/audio/ordinary ak3 violin.mp3',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDDUuQyolwRw85b6pKhlP016qXRx-OpgfI7cp61VdO4-qOnzbW7I2qeOo&s=10',
    imageAlt: 'Violin strings close-up in moody low-key lighting',
    waveHeights: [
      9, 6, 13, 5, 10, 8, 3, 12, 7, 11, 9, 5, 14, 6, 8, 10, 4, 12, 7,
      9, 11, 6, 8, 13, 5,
    ],
  },
];

export default function MusicPageContent() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Actual HTML audio element
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [playing, setPlaying] = useState<number | null>(null);

  // ---------------------------------------------
  // Reveal animation
  // ---------------------------------------------
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

  // ---------------------------------------------
  // Create audio element
  // ---------------------------------------------
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    // Track finished playing
    const handleEnded = () => {
      setPlaying(null);
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audio.src = '';
    };
  }, []);

  // ---------------------------------------------
  // Play / Pause
  // ---------------------------------------------
  const handlePlay = async (
    trackId: number,
    audioSrc: string
  ) => {
    const audio = audioRef.current;

    if (!audio) return;

    // Clicking the currently playing track = pause
    if (playing === trackId) {
      audio.pause();
      setPlaying(null);
      return;
    }

    // Stop previous track
    audio.pause();

    // Load selected track
    audio.src = audioSrc;
    audio.currentTime = 0;

    try {
      await audio.play();
      setPlaying(trackId);
    } catch (error) {
      console.error('Unable to play audio:', error);
      setPlaying(null);
    }
  };

  return (
    <div
      ref={sectionRef}
      className="pt-24 pb-20"
    >
      {/* ====================================== */}
      {/* PAGE HERO */}
      {/* ====================================== */}

      <div className="relative py-20 md:py-28 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 60% 50%, rgba(74,172,219,0.08) 0%, transparent 60%)',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="section-label mb-6 reveal">
            Discography
          </div>

          <h1
            className="font-bold tracking-tighter text-foreground reveal delay-100"
            style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}
          >
            Music &amp;
            <br />
            <span className="text-gradient-teal">
              Recordings
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-muted-foreground text-lg leading-relaxed reveal delay-200">
            A collection of classical violin performances,
            original compositions, and studio recordings
            spanning a decade of artistry.
          </p>
        </div>
      </div>

      {/* ====================================== */}
      {/* FULL TRACKLIST */}
      {/* ====================================== */}

      <section className="py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <h2 className="text-2xl font-bold tracking-tighter text-foreground mb-10 reveal">
            <span className="section-label block mb-3">
              All Tracks
            </span>

            Full Tracklist
          </h2>

          <div className="space-y-1">
            {fullTracks.map((track, i) => (
              <div
                key={track.id}
                className="track-card reveal"
                style={{
                  transitionDelay: `${i * 60}ms`,
                }}
              >
                <div className="flex items-center gap-4 p-4">

                  {/* Track Number */}
                  <span className="text-xs font-mono text-muted-foreground w-6 flex-shrink-0">
                    {track.no}
                  </span>

                  {/* Thumbnail */}
                  <div
                    className="flex-shrink-0 relative overflow-hidden"
                    style={{
                      width: '48px',
                      height: '48px',
                    }}
                  >
                    <AppImage
                      src={track.image}
                      alt={track.imageAlt}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-foreground truncate">
                      {track.title}
                    </div>

                    <div className="text-xs text-muted-foreground mt-0.5 truncate">
                      {track.album}
                    </div>
                  </div>

                  {/* Waveform */}
                  <div className="hidden md:flex items-end gap-0.5 h-8 w-32 flex-shrink-0">
                    {track.waveHeights.map((h, idx) => (
                      <div
                        key={idx}
                        className="waveform-bar flex-1"
                        style={{
                          height: `${(h / 14) * 100}%`,
                          opacity:
                            playing === track.id ? 1 : 0.4,
                          transition: 'opacity 0.3s ease',
                        }}
                      />
                    ))}
                  </div>
                  {/* Duration */}
                  <span className="text-xs font-mono text-muted-foreground flex-shrink-0 w-10 text-right">
                    {track.duration}
                  </span>

                  {/* Play Button */}
                  <button
                    type="button"
                    onClick={() =>
                      handlePlay(track.id, track.audio)
                    }
                    className={`
                      flex-shrink-0
                      w-8 h-8
                      flex items-center justify-center
                      border
                      transition-all duration-200
                      ${
                        playing === track.id
                          ? 'border-accent text-accent'
                          : 'border-border text-muted-foreground hover:border-accent hover:text-accent'
                      }
                    `}
                    aria-label={
                      playing === track.id
                        ? `Pause ${track.title}`
                        : `Play ${track.title}`
                    }
                  >
                    {playing === track.id ? (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <rect
                          x="6"
                          y="4"
                          width="4"
                          height="16"
                        />
                        <rect
                          x="14"
                          y="4"
                          width="4"
                          height="16"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                      </svg>
                    )}
                  </button>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ====================================== */}
      {/* PERFORMANCE HISTORY */}
      {/* ====================================== */}

      {/* <section className="py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <h2 className="text-2xl font-bold tracking-tighter text-foreground mb-10 reveal">
            <span className="section-label block mb-3">
              Live Shows
            </span>

            Performance History
          </h2>

          <div className="space-y-4">
            {[
              {
                date: 'Aug 2026',
                venue: 'Eko Hotel & Suites',
                city: 'Lagos, Nigeria',
                event: 'JARPEL26',
                status: 'Performed',
              },
              {
                date: 'Dec 2024',
                venue: 'Abuja National Theatre',
                city: 'Abuja, Nigeria',
                event: 'Christmas Gala Concert',
                status: 'Performed',
              },
              {
                date: 'Jul 2024',
                venue: 'Terra Kulture Arena',
                city: 'Lagos, Nigeria',
                event: 'West African Arts Festival',
                status: 'Performed',
              },
              {
                date: 'Feb 2024',
                venue: 'Alliance Française',
                city: 'Lagos, Nigeria',
                event: 'Valentine Classical Evening',
                status: 'Performed',
              },
            ].map((perf, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center gap-4 py-5 border-b border-border reveal"
                style={{
                  transitionDelay: `${i * 60}ms`,
                }}
              >
                <span className="text-xs font-mono text-accent w-20 flex-shrink-0">
                  {perf.date}
                </span>

                <div className="flex-1">
                  <div className="text-sm font-semibold text-foreground">
                    {perf.event}
                  </div>

                  <div className="text-xs text-muted-foreground mt-0.5">
                    {perf.venue} · {perf.city}
                  </div>
                </div>

                <span
                  className={`text-xs font-mono px-3 py-1 flex-shrink-0 ${
                    perf.status === 'Upcoming'
                      ? 'bg-accent/10 text-accent border border-accent/30'
                      : 'bg-muted text-muted-foreground border border-border'
                  }`}
                >
                  {perf.status}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section> */}
    </div>
  ); 
}