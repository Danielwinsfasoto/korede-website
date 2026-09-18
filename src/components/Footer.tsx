import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';

export default function Footer() {
  const year = 2026;

  return (
    <footer className="border-t border-border py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-sm font-semibold text-foreground tracking-wider uppercase">
              Violinist Ak3
            </span>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/services" className="hover:text-foreground transition-colors">
              Services
            </Link>
            <Link href="/music" className="hover:text-foreground transition-colors">
              Music
            </Link>
            <Link href="/reviews" className="hover:text-foreground transition-colors">
              Reviews
            </Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-xs font-mono text-muted-foreground">
            &copy; {year} Akinode Korede Emmanuel
          </p>
        </div>
      </div>
    </footer>
  );
}