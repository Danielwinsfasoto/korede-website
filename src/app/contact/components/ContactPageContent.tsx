'use client';

import React, { useEffect, useRef, useState } from 'react';

const eventTypes = [
  'Concert / Recital',
  'Corporate Event',
  'Wedding / Private Ceremony',
  'Festival / Cultural Event',
  'Educational / Workshop',
  'Recording Session',
  'Other',
];

export default function ContactPageContent() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    eventType: '',
    date: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

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
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submit handler — connect to backend/email service here
    setSubmitted(true);
  };

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
          <div className="section-label mb-6 reveal">Get in Touch</div>
          <h1 className="font-bold tracking-tighter text-foreground reveal delay-100" style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}>
            Book a <br />
            <span className="text-gradient-teal">Performance</span>
          </h1>
          <p className="mt-6 max-w-lg text-muted-foreground text-lg leading-relaxed reveal delay-200">
            Whether it&apos;s a concert hall, private event, or corporate occasion — let&apos;s create an unforgettable musical experience together.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 border-t border-border">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left: Contact Info */}
          <div className="reveal-left">
            <h2 className="text-2xl font-bold tracking-tighter text-foreground mb-8">
              Contact Details
            </h2>

            <div className="space-y-6 mb-12">
              {[
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  ),
                  label: 'Email',
                  value: 'booking@akinodekorede.com',
                  href: 'mailto:booking@akinodekorede.com',
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  ),
                  label: 'Phone',
                  value: '+234 801 234 5678',
                  href: 'tel:+2348012345678',
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  ),
                  label: 'Based in',
                  value: 'Lagos, Nigeria',
                  href: '#',
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 bg-primary/15 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                    <span className="text-accent">{item.icon}</span>
                  </div>
                  <div>
                    <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">
                      {item.label}
                    </div>
                    <div className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                      {item.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <div className="section-label mb-4">Follow</div>
              <div className="flex items-center gap-4">
                {[
                  {
                    label: 'YouTube',
                    href: 'https://youtube.com',
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    ),
                  },
                  {
                    label: 'Instagram',
                    href: 'https://instagram.com',
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                      </svg>
                    ),
                  },
                  {
                    label: 'Facebook',
                    href: 'https://facebook.com',
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    ),
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-all duration-200"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Booking note */}
            <div className="mt-12 p-6 bg-card border border-border">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0 pulse-dot" />
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-2">Booking Availability</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Korede is available for performances across Nigeria and internationally. Response time is typically within 48 hours. For urgent inquiries, please call directly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="reveal-right">
            <h2 className="text-2xl font-bold tracking-tighter text-foreground mb-8">
              Send a Booking Inquiry
            </h2>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 bg-accent/10 border border-accent/30 flex items-center justify-center mb-6">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Message Sent!</h3>
                <p className="text-muted-foreground text-sm max-w-sm">
                  Thank you for reaching out. Korede&apos;s team will get back to you within 48 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 px-6 py-3 border border-border text-sm font-semibold text-muted-foreground hover:border-accent hover:text-accent transition-all duration-200"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="relative group">
                  <label className="block text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Chukwuemeka Adeyemi"
                    className="w-full bg-muted border border-border px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors duration-200"
                  />
                </div>

                {/* Email */}
                <div className="relative group">
                  <label className="block text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="chukwuemeka@example.com"
                    className="w-full bg-muted border border-border px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors duration-200"
                  />
                </div>

                {/* Event Type */}
                <div>
                  <label className="block text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">
                    Event Type *
                  </label>
                  <select
                    name="eventType"
                    required
                    value={formData.eventType}
                    onChange={handleChange}
                    className="w-full bg-muted border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-accent transition-colors duration-200 appearance-none"
                  >
                    <option value="" disabled>Select event type</option>
                    {eventTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">
                    Event Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-muted border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-accent transition-colors duration-200"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us about your event, location, expected audience size, and any specific musical requests..."
                    className="w-full bg-muted border border-border px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors duration-200 resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-bold text-sm tracking-widest uppercase hover:bg-secondary hover:text-background transition-all duration-300 group"
                >
                  Send Booking Inquiry
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>

                <p className="text-xs text-muted-foreground text-center">
                  We typically respond within 48 hours.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}