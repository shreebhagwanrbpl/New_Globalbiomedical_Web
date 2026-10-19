'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, ChevronLeft, ChevronRight, Award, CheckCircle2, Quote, MapPin } from 'lucide-react';
import { staticCustomerReviews, CustomerTestimonial } from '@/data/reviews';

export function ReviewsCarousel() {
  const [reviews] = useState<CustomerTestimonial[]>(staticCustomerReviews);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Manual scroll buttons
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 380;
      scrollContainerRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Auto-scroll effect moving right to left
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollContainerRef.current.scrollBy({ left: 360, behavior: 'smooth' });
        }
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="py-20 sm:py-28 bg-slate-50/80 border-y border-slate-200/80 overflow-hidden relative">
      {/* Background radial accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Title & Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 text-red-700 text-xs font-bold uppercase tracking-wider mb-3.5 border border-red-200/60">
              <ShieldCheck className="w-4 h-4 text-red-600" />
              <span>CLINICAL REPUTATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              What Pathologists &amp; Lab Directors Say
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-2 max-w-2xl leading-relaxed">
              Real testimonials from senior pathologists, hospital medical superintendents, and diagnostic directors across Nagaur, Jaipur, and pan-India medical hubs.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              aria-label="Previous review"
              className="w-12 h-12 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-red-600 hover:border-red-300 hover:shadow-md flex items-center justify-center transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Next review"
              className="w-12 h-12 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-red-600 hover:border-red-300 hover:shadow-md flex items-center justify-center transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container (Right to Left scrollable) */}
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-6 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="w-[340px] sm:w-[400px] shrink-0 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative"
            >
              {/* Subtle quote watermark */}
              <div className="absolute top-6 right-6 text-slate-100 group-hover:text-red-100 transition-colors pointer-events-none">
                <Quote className="w-12 h-12 rotate-180" />
              </div>

              <div>
                {/* Rating & Verified Badge */}
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                    <span className="text-xs font-bold text-slate-900 ml-1.5">{rev.rating}.0</span>
                  </div>

                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Verified Installation
                  </span>
                </div>

                {/* Review Title */}
                <h3 className="font-bold text-base sm:text-lg text-slate-900 leading-snug mb-3 relative z-10">
                  "{rev.title}"
                </h3>

                {/* Review Body */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-5 mb-5 relative z-10">
                  {rev.comment}
                </p>
              </div>

              {/* Doctor / Pathologist Profile Footer */}
              <div className="pt-4 border-t border-slate-100 relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-11 h-11 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-sm">
                    {rev.name.replace('Dr. ', '').split(' ').slice(0, 2).map(n => n[0]).join('')}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-sm text-slate-900 truncate">
                      {rev.name}
                    </h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1 truncate">
                      <MapPin className="w-3 h-3 text-red-600 shrink-0" />
                      <span>{rev.city}</span>
                    </p>
                  </div>
                </div>

                {/* Instrument Tag */}
                {rev.purchasedProduct && (
                  <div className="mt-2.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-700 font-medium truncate flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
                    <span className="truncate">Installed: <strong>{rev.purchasedProduct}</strong></span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Progress indicator & bottom CTA */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 border-t border-slate-200/60 pt-6">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Over 1,500+ diagnostic labs &amp; hospital clinics powered across Rajasthan &amp; India</span>
          </div>

          <Link
            href="/contact"
            className="text-red-600 font-bold hover:text-red-700 hover:underline flex items-center gap-1 text-sm"
          >
            <span>Request Installation in Your City / District →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
