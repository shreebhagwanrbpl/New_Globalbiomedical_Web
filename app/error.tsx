'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Section, Button } from '@/components/common';
import { AlertCircle } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled application error:', error);
  }, [error]);

  return (
    <Section variant="ivory" className="min-h-[60vh] flex items-center justify-center text-center">
      <div className="max-w-md mx-auto flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-spice-peach text-spice-terracotta flex items-center justify-center mb-6">
          <AlertCircle className="w-8 h-8" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-widest text-spice-terracotta mb-2">
          Temporary Glitch
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-spice-espresso mb-4">
          Something went wrong
        </h1>
        <p className="text-sm text-spice-taupe leading-relaxed mb-8">
          We encountered an issue while loading this page. Please try again or return to our home page.
        </p>
        <div className="flex items-center gap-3">
          <Button variant="primary" size="md" onClick={() => reset()}>
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" size="md">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </Section>
  );
}
