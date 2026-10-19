'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, MapPin, Wrench, X, ArrowRight } from 'lucide-react';
import { Container } from '@/components/common';

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-slate-900 text-slate-300 border-b border-slate-800/80 transition-all">
      <Container size="2xl">
        <div className="h-8 sm:h-8.5 flex items-center justify-between gap-3 text-[11px] sm:text-xs whitespace-nowrap overflow-hidden">
          {/* Left: Contact Helplines */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <a
              href="tel:+919829088234"
              className="flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors font-medium"
            >
              <Phone className="w-3 h-3 text-red-500 shrink-0" />
              <span>Direct Desk: <strong className="text-white font-semibold">+91 98290 88234</strong></span>
            </a>

            <span className="text-slate-700 hidden md:inline">•</span>

            <a
              href="tel:18008902344"
              className="hidden md:flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
            >
              <span>Toll-Free: <strong className="text-white font-semibold">1800 890 2344</strong></span>
            </a>

            <span className="text-slate-700 hidden xl:inline">•</span>

            <div className="hidden xl:flex items-center gap-1 text-slate-400">
              <MapPin className="w-3 h-3 text-red-500 shrink-0" />
              <span>HQ: Jaipur, Rajasthan</span>
            </div>
          </div>

          {/* Right: Service Guarantee & Hubs Link */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <div className="hidden lg:flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800/90 text-slate-200 border border-slate-700/80 text-[10.5px]">
              <Wrench className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
              <span>Free On-Site Engineer Installation</span>
            </div>

            <Link
              href="/rajasthan"
              className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 font-semibold transition-colors"
            >
              <span>780+ District Hubs</span>
              <ArrowRight className="w-3 h-3" />
            </Link>

            <button
              onClick={() => setIsVisible(false)}
              aria-label="Dismiss banner"
              className="text-slate-500 hover:text-slate-300 p-1 transition-colors"
              title="Dismiss"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}
