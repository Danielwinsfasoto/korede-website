'use client';

import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

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
                Korede Akinode, popularly known as Violinist AK3, is a Nigerian gospel musician, professional violinist, multi-instrumentalist, music educator, and entrepreneur with a passion for using music as a powerful tool to inspire, entertain, educate, and spread the Gospel of Christ.
              </p>
              <p>
                Born on the 2nd of August 2005, Korede began his musical journey at the age of 8. What started as a young boy&apos;s interest in music has grown over the years into a remarkable musical career built on consistency, dedication, discipline, and faith in God. By God&apos;s grace, his passion for music continues to grow as he develops his craft and seeks to impact lives through his sound.
              </p>
              <p>
                Korede hails from Ifo, Ogun State, and is based in Lagos, Nigeria. He is known for his expressive violin performances, musical versatility, improvisational ability, and ability to connect with different audiences through his sound. As a gospel musician, he is committed to using his God-given talent to communicate the Gospel and inspire both young people and adults.
              </p>
              <p>
               Throughout his musical journey, Korede has performed at numerous remarkable concerts, church programmes, corporate events, private celebrations, weddings, proposals, dinners, and other major occasions across Nigeria. He has also had the privilege of sharing stages and spaces with notable talents, including popular teen saxophonist Temilayo Abodunrin, Dwin the Stoic, and other established musicians and creatives.
              </p>

              {/* Collapsible content */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="space-y-4 pt-4">
                  <p>
                    Beyond performing, Korede is passionate about music education and mentorship. By God&apos;s grace, he has trained and nurtured young musical talents across Lagos State, helping children and young people discover their abilities, develop their confidence, and grow in their understanding of music. His work as an educator reflects his desire not only to perform music but also to contribute to the development of the next generation of musicians.
                  </p>
                  <p>
                    In recent years, Korede has expanded his professional music career through KStrings Music Events, providing live string performances for weddings, corporate events, private celebrations, proposals, dinners, church programmes, studio recordings, and other special occasions. His services include solo violin, duos, trios, string quartets, and larger orchestral/string ensembles, allowing him to create carefully curated musical experiences for different types of events.
                  </p>
                  <p>
                    His recent career growth has also seen him perform at notable corporate and high-profile events, including events associated with brands and organisations such as Stanbic IBTC, Shell, and The Macallan, among others. He has also continued to build his presence in the Nigerian music and events industry through live performances, content creation, music education, and professional collaborations.
                  </p>
                  <p>
                    Korede’s growing influence has extended beyond the stage into the digital space, where he has built a strong audience around his violin performances, musical creativity, and educational content. His consistency on social media has helped him reach thousands of music lovers and aspiring musicians while showcasing the possibilities of contemporary violin performance in Nigeria
                  </p>
                  <p>
                    He has also received opportunities for media exposure and television conversations surrounding the growth and evolution of live string performance in Nigeria, further establishing his voice within the country’s contemporary string-music space.
                  </p>
                  <p>
                    Korede Akinode is driven by a vision to see the violin and other musical instruments become powerful instruments of worship, excellence, creativity, education, and positive influence. Whether on a church stage, at a corporate event, in a studio, or at a private celebration, he strives to give every audience an unforgettable musical experience.
                  </p>
                  <p>
                    Through Violinist AK3 and KStrings Music Events, Korede continues to pursue his vision of building a respected music brand that combines faith, excellence, professionalism, creativity, and impact.
                  </p>
                  <p>
                    His story is a testimony of what consistency, passion, hard work, mentorship, and God’s grace can produce from a young musical dream.
                  </p>
                </div>
              </div>

              {/* Toggle button */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 text-accent font-semibold text-sm mt-2 hover:gap-3 transition-all duration-200 group"
              >
                {isExpanded ? 'Read Less' : 'Read More'}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
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
                  src="/assets/images/WhatsApp Image 2026-08-14 at 3.44.07 PM.jpeg"
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