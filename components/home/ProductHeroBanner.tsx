'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  MessageCircle,
} from 'lucide-react';
import { Container } from '@/components/common';
import { GetQuoteModal } from '@/components/modals/GetQuoteModal';

interface HeroSlide {
  id: string;
  preHeading: string;
  headlineLine1: string;
  headlineLine2: string;
  ctaText: string;
  quoteProduct: {
    title: string;
    image: string;
    category: string;
  };
  whatsappText: string;
  type: 'lineup' | 'h360' | 'combo';
}

const SLIDES: HeroSlide[] = [
  {
    id: 'slide-all-analyzers',
    preHeading: 'Transform Your Lab with',
    headlineLine1: 'New Hematology &',
    headlineLine2: 'Biochemistry Analyzers',
    ctaText: 'Get Official Quote',
    quoteProduct: {
      title: 'Complete Diagnostic Lab Package (Erba H360, Chem 5X, EC 90)',
      image: '/images/hero/erba-h360-clean.png',
      category: 'Diagnostic Analyzers Bundle',
    },
    whatsappText: 'Hello Human Biomedical LLP, I am inquiring about the New Hematology & Biochemistry Analyzers lab setup.',
    type: 'lineup',
  },
  {
    id: 'slide-h360',
    preHeading: 'High-Precision Automated CBC',
    headlineLine1: 'Erba Mannheim H 360',
    headlineLine2: 'Hematology Analyser',
    ctaText: 'Get H 360 Quote',
    quoteProduct: {
      title: 'Erba Mannheim H 360 Hematology Analyser',
      image: '/images/hero/erba-h360-clean.png',
      category: 'Automated Hematology Analyser',
    },
    whatsappText: 'Hello Human Biomedical LLP, I would like to get the official quote for Erba Mannheim H 360 Hematology Analyser.',
    type: 'h360',
  },
  {
    id: 'slide-chem-ec90',
    preHeading: 'Clinical Chemistry & Electrolytes',
    headlineLine1: 'Transasia Chem 5X &',
    headlineLine2: 'Erba EC 90 Analyser',
    ctaText: 'Get Chemistry Quote',
    quoteProduct: {
      title: 'Transasia Chem 5X & Erba EC 90 Diagnostic Duo',
      image: '/images/hero/transasia-chem5x-clean.png',
      category: 'Clinical Chemistry & Electrolytes',
    },
    whatsappText: 'Hello Human Biomedical LLP, I would like to get the official quote for Transasia Chem 5X and Erba EC 90 analyzers.',
    type: 'combo',
  },
];

export function ProductHeroBanner() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const slide = SLIDES[currentSlideIndex];

  // Auto-slide every 7 seconds unless hovered
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlideIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlideIndex((prev) => (prev + 1) % SLIDES.length);
  };

  return (
    <>
      <section
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="w-full bg-white py-3 sm:py-5"
      >
        <Container size="2xl">
          {/* Main Rounded Banner Card */}
          <div className="relative w-full rounded-2xl sm:rounded-3xl lg:rounded-[32px] border border-amber-200/60 shadow-sm overflow-hidden bg-gradient-to-r from-[#FAF8F5] via-[#F8F4EE] to-[#F3ECE4] min-h-[340px] sm:min-h-[380px] lg:min-h-[420px] flex items-center">
            
            {/* Background Warm Organic Wave Curves */}
            <div className="absolute right-0 top-0 bottom-0 w-2/5 md:w-1/2 pointer-events-none overflow-hidden -z-0">
              <svg
                viewBox="0 0 500 500"
                className="w-full h-full object-cover opacity-85"
                preserveAspectRatio="none"
              >
                <path
                  d="M120,0 C220,100 80,300 240,400 C320,450 420,480 500,500 L500,0 Z"
                  fill="#F0CBA7"
                  fillOpacity="0.45"
                />
                <path
                  d="M260,0 C340,140 220,280 380,420 C420,460 480,490 500,500 L500,0 Z"
                  fill="#E69F6B"
                  fillOpacity="0.32"
                />
              </svg>
            </div>

            {/* Subtle Laboratory Countertop Surface (white reflective podium beneath products) */}
            <div className="absolute right-0 bottom-0 w-full sm:w-7/12 lg:w-3/5 h-24 sm:h-32 bg-gradient-to-t from-white/90 via-white/50 to-transparent border-t border-white/40 pointer-events-none z-0" />

            {/* Main Content Grid */}
            <div className="relative z-10 w-full px-5 sm:px-8 lg:px-12 py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              
              {/* Left Column: Clean Typography & CTA Only (All extra badges removed as requested) */}
              <div className="lg:col-span-5 space-y-4 sm:space-y-5 text-left">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={slide.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3 sm:space-y-4"
                  >
                    {/* Pre-Heading */}
                    <p className="text-slate-800 text-lg sm:text-2xl font-bold tracking-tight">
                      {slide.preHeading}
                    </p>

                    {/* Main High-Impact Orange/Terracotta Headline */}
                    <h1 className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold text-[#DE6A24] tracking-tight leading-[1.12]">
                      <span className="block">{slide.headlineLine1}</span>
                      <span className="block">{slide.headlineLine2}</span>
                    </h1>

                    {/* Action Area: Orange Cart/Quote Button + WhatsApp Button */}
                    <div className="flex flex-wrap items-center gap-3 pt-2 sm:pt-4">
                      {/* Orange Shopping Cart / Quote Button */}
                      <button
                        type="button"
                        onClick={() => setIsQuoteModalOpen(true)}
                        className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-[#DE6A24] to-[#C95713] hover:from-[#C95713] hover:to-[#B3480A] text-white font-extrabold text-sm sm:text-base shadow-md shadow-orange-500/20 hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                      >
                        <span>{slide.ctaText}</span>
                        <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                      </button>

                      {/* WhatsApp Inquiry Button */}
                      <a
                        href={`https://wa.me/919829088234?text=${encodeURIComponent(slide.whatsappText)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-3 sm:py-3.5 rounded-xl bg-white hover:bg-slate-50 text-emerald-700 text-xs sm:text-sm font-bold border border-emerald-300 shadow-xs hover:shadow-sm transition-all"
                      >
                        <MessageCircle className="w-4 h-4 text-[#25D366]" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Column: Seamless Product Images (100% Transparent, No White Boxes!) */}
              <div className="lg:col-span-7 relative flex items-center justify-center min-h-[250px] sm:min-h-[300px] lg:min-h-[360px]">
                <AnimatePresence mode="wait">
                  {slide.type === 'lineup' && (
                    <motion.div
                      key="lineup"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.35 }}
                      className="w-full flex items-end justify-center gap-2 sm:gap-4 relative z-10"
                    >
                      {/* Machine 1: Transasia Chem 5X (Biochemistry) */}
                      <div className="flex-1 max-w-[190px] sm:max-w-[240px] flex flex-col items-center">
                        <img
                          src="/images/hero/transasia-chem5x-clean.png"
                          alt="Transasia Chem 5X Biochemistry Analyser"
                          className="w-full h-auto max-h-[150px] sm:max-h-[190px] object-contain filter drop-shadow-md"
                        />
                        {/* Realistic Contact Shadow */}
                        <div className="w-4/5 h-2.5 bg-slate-900/15 rounded-[100%] blur-sm -mt-0.5" />
                      </div>

                      {/* Machine 2: Erba Mannheim H 360 (Hematology, Center Hero) */}
                      <div className="flex-1 max-w-[210px] sm:max-w-[270px] flex flex-col items-center -ml-2 sm:-ml-4 z-10">
                        <img
                          src="/images/hero/erba-h360-clean.png"
                          alt="Erba Mannheim H 360 Hematology Analyser"
                          className="w-full h-auto max-h-[200px] sm:max-h-[260px] object-contain filter drop-shadow-xl"
                        />
                        {/* Realistic Contact Shadow */}
                        <div className="w-4/5 h-3 bg-slate-900/20 rounded-[100%] blur-sm -mt-1" />
                      </div>

                      {/* Machine 3: Erba Mannheim EC 90 (Electrolyte) */}
                      <div className="flex-1 max-w-[180px] sm:max-w-[220px] flex flex-col items-center -ml-2 sm:-ml-4">
                        <img
                          src="/images/hero/erba-ec90-clean.png"
                          alt="Erba Mannheim EC 90 Electrolyte Analyser"
                          className="w-full h-auto max-h-[160px] sm:max-h-[200px] object-contain filter drop-shadow-md"
                        />
                        {/* Realistic Contact Shadow */}
                        <div className="w-4/5 h-2.5 bg-slate-900/15 rounded-[100%] blur-sm -mt-0.5" />
                      </div>
                    </motion.div>
                  )}

                  {slide.type === 'h360' && (
                    <motion.div
                      key="h360"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.35 }}
                      className="w-full flex items-center justify-center relative z-10"
                    >
                      <div className="flex flex-col items-center max-w-[340px]">
                        <img
                          src="/images/hero/erba-h360-clean.png"
                          alt="Erba Mannheim H 360"
                          className="w-full h-auto max-h-[260px] sm:max-h-[320px] object-contain filter drop-shadow-2xl"
                        />
                        <div className="w-4/5 h-3.5 bg-slate-900/25 rounded-[100%] blur-sm -mt-1" />
                      </div>
                    </motion.div>
                  )}

                  {slide.type === 'combo' && (
                    <motion.div
                      key="combo"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.35 }}
                      className="w-full flex items-end justify-center gap-4 sm:gap-6 relative z-10"
                    >
                      <div className="flex-1 max-w-[230px] flex flex-col items-center">
                        <img
                          src="/images/hero/transasia-chem5x-clean.png"
                          alt="Transasia Chem 5X"
                          className="w-full h-auto max-h-[180px] sm:max-h-[220px] object-contain filter drop-shadow-lg"
                        />
                        <div className="w-4/5 h-2.5 bg-slate-900/15 rounded-[100%] blur-sm -mt-0.5" />
                      </div>
                      <div className="flex-1 max-w-[210px] flex flex-col items-center">
                        <img
                          src="/images/hero/erba-ec90-clean.png"
                          alt="Erba EC 90"
                          className="w-full h-auto max-h-[170px] sm:max-h-[210px] object-contain filter drop-shadow-lg"
                        />
                        <div className="w-4/5 h-2.5 bg-slate-900/15 rounded-[100%] blur-sm -mt-0.5" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Left Circular Navigation Arrow */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Banner Slide"
              className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/95 hover:bg-white text-slate-700 hover:text-slate-900 shadow-md border border-slate-200/80 flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Right Circular Navigation Arrow */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Banner Slide"
              className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/95 hover:bg-white text-slate-700 hover:text-slate-900 shadow-md border border-slate-200/80 flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Slide Index Counter at Bottom-Right */}
            <div className="absolute bottom-3 right-4 z-20 bg-black/65 backdrop-blur-xs text-white text-[10px] sm:text-xs font-mono font-bold px-2.5 py-0.5 rounded-md shadow-xs">
              {currentSlideIndex + 1}/{SLIDES.length}
            </div>
          </div>
        </Container>
      </section>

      {/* Quote Modal */}
      <GetQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        product={{
          title: slide.quoteProduct.title,
          image: slide.quoteProduct.image,
          category: slide.quoteProduct.category,
          weight: 'Complete Diagnostic Unit with On-Site Installation',
        }}
      />
    </>
  );
}
