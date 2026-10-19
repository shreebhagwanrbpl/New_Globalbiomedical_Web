import React from 'react';
import Link from 'next/link';
import { Section, Button } from '@/components/common';
import { Compass, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <Section
      variant="ivory"
      className="min-h-[60vh] flex items-center justify-center text-center"
    >
      <div className="max-w-md mx-auto flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-spice-peach text-spice-terracotta flex items-center justify-center mb-6">
          <Compass className="w-8 h-8 animate-spin-slow" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-widest text-spice-terracotta mb-2">
          Page Not Found
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-spice-espresso mb-4">
          Spice Trail Lost
        </h1>
        <p className="text-sm text-spice-taupe leading-relaxed mb-8">
          The page or spice blend you are searching for might have moved, been renamed, or is temporarily unavailable in our pantry.
        </p>
        <div className="flex items-center gap-3">
          <Link href="/">
            <Button variant="primary" size="md" showArrow>
              Return Home
            </Button>
          </Link>
          <Link href="/shop">
            <Button variant="secondary" size="md">
              Explore Spices
            </Button>
          </Link>
        </div>
      </div>
    </Section>
  );
}
