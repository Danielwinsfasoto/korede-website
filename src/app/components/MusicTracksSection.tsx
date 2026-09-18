'use client';

import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';

const tracks = [
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

export default function MusicTracksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState<number | null>(null);

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
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audioRef.current = audio;

    const handleEnded = () => {
      setPlaying(null);
    };

    const handleError = () => {
      console.error('Unable to load the selected audio file.');
      setPlaying(null);
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.src = '';
      audioRef.current = null;
    };
  }, []);

  const handlePlay = async (trackId: number, audioSrc: string) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing === trackId) {
      audio.pause();
      setPlaying(null);
      return;
    }

    audio.pause();
    audio.src = audioSrc;
    audio.currentTime = 0;

    try {
      await audio.play();
      setPlaying(trackId);
    } catch (error) {
      console.error('Audio playback failed:', error);
      setPlaying(null);
    }
  };

  return (
    <section
      id="music"
      ref={sectionRef}
      className="py-20 md:py-28 bg-card relative overflow-hidden"
    >
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(74,172,219,0.07) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

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
          href="https://open.spotify.com/artist/3OrR2jaRd47nljou1wKpYR?si=IxM2hvf2STixeQbqc9mVvQ&utm_source=copy-link"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-muted-foreground hover:text-accent transition-colors">
            More Tracks on
            <img
            src="/assets/images/spotify logo.png"
            alt="Spotify"
            width={30}
            height={30}
            className="object-contain"
            />
            Spotify
            </a>
        </div>

        {/* Tracks Grid: 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tracks.map((track, i) => (
            <div
              key={track.id}
              className="track-card reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex gap-0 overflow-hidden">
                {/* Image */}
                <div
                  className="flex-shrink-0 relative"
                  style={{ width: '80px', height: '80px' }}
                >
                  <AppImage
                    src={track.image}
                    alt={track.imageAlt}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />

                  <div
                    className="absolute inset-0"
                    style={{ background: 'rgba(13,17,23,0.3)' }}
                  />
                </div>

                {/* Track info */}
                <div className="flex-1 p-4 min-w-0">
                  {/* Artist label */}
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-accent tracking-widest">
                        Akinode Korede
                        </span>
                      </div>
                  </div>

                  {/* Title */}
                  <h4 className="text-sm font-bold text-foreground mb-3 truncate">
                    {track.title}
                  </h4>

                  {/* Waveform */}
                  <div className="flex items-end gap-0.5 h-8 mb-3">
                    {track.waveHeights.map((h, idx) => (
                      <div
                        key={idx}
                        className="waveform-bar flex-1"
                        style={{
                          height: `${(h / 14) * 100}%`,
                          opacity: playing === track.id ? 1 : 0.5,
                          transition: 'opacity 0.3s ease',
                        }}
                      />
                    ))}
                  </div>

                  {/* Controls row */}
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => handlePlay(track.id, track.audio)}
                      className="flex items-center gap-2 text-xs text-muted-foreground hover:text-accent transition-colors group"
                      aria-label={
                        playing === track.id
                          ? `Pause ${track.title}`
                          : `Play ${track.title}`
                      }
                    >
                      {playing === track.id ? (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="text-accent"
                        >
                          <rect x="6" y="4" width="4" height="16" />
                          <rect x="14" y="4" width="4" height="16" />
                        </svg>
                      ) : (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="text-accent group-hover:scale-110 transition-transform"
                        >
                          <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                        </svg>
                      )}

                      {playing === track.id ? 'Playing' : 'Play'}
                    </button>

                    <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
                      <span>{track.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section> 
  );
}
