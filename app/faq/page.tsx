'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Button } from '@/components/common';
import { staticFAQs, FAQItem } from '@/data/faqs';
import { HelpCircle, ChevronDown, Sparkles, MessageSquare, ArrowRight, PhoneCall } from 'lucide-react';
import { LUXURY_EASE } from '@/components/animations/Motion';
import { HEADQUARTERS_INFO } from '@/data/rajasthanDistricts';

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const categories = ['All', 'Equipment & Accuracy', 'Rajasthan Delivery & Hubs', 'Warranty & AMC', 'Reagents & Storage', 'Lab Setup'];

  const filteredFaqs = selectedCategory === 'All'
    ? staticFAQs
    : staticFAQs.filter(f => f.category === selectedCategory);

  const toggleFaq = (id: string) => {
    setOpenFaqId(prev => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-spice-ivory pb-24">
      {/* Header */}
      <section className="bg-gradient-to-b from-spice-sand/40 via-spice-sand/20 to-spice-ivory border-b border-spice-border py-12 sm:py-16">
        <Container size="2xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-spice-cardamom-50 text-spice-cardamom text-xs font-bold uppercase tracking-wider mb-4">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>DIAGNOSTIC EQUIPMENT &amp; SERVICE KNOWLEDGE BASE</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-spice-espresso tracking-tight leading-tight mb-3">
              Frequently Asked Questions
            </h1>
            <p className="text-sm sm:text-base text-spice-taupe leading-relaxed">
              Find detailed information on NABL calibration, Rajasthan district delivery timelines, on-site biomedical engineer installation, cold-chain reagent logistics, and annual maintenance contracts (AMC/CMC).
            </p>
          </div>
        </Container>
      </section>

      <Container size="2xl" className="mt-10">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pb-6 border-b border-spice-border mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-spice-espresso text-white shadow-warm-xs'
                  : 'bg-white border border-spice-border text-spice-taupe hover:text-spice-espresso hover:border-spice-espresso'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion FAQ List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-spice-border overflow-hidden shadow-warm-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4"
                >
                  <div>
                    <span className="text-[10px] font-bold text-spice-cardamom uppercase tracking-wider block mb-1">
                      {faq.category}
                    </span>
                    <h3 className="font-serif font-bold text-base sm:text-lg text-spice-espresso leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  <div className={`w-8 h-8 rounded-full bg-spice-sand/40 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-spice-sand' : ''}`}>
                    <ChevronDown className="w-4 h-4 text-spice-espresso" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: LUXURY_EASE }}
                    >
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-spice-taupe leading-relaxed border-t border-spice-border/60 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Support Banner */}
        <div className="max-w-3xl mx-auto mt-12 p-6 sm:p-8 bg-white rounded-3xl border border-spice-border shadow-warm-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif font-bold text-lg text-spice-espresso mb-1">
              Have specific technical equipment requirements?
            </h3>
            <p className="text-xs text-spice-taupe">
              Our Jaipur biomedical engineering team is available 24/7 for instrument consultations.
            </p>
          </div>
          <a
            href="tel:+919829088234"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-spice-espresso text-white text-xs font-bold hover:bg-spice-terracotta transition-colors shrink-0 shadow-warm-xs"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call +91 98290 88234</span>
          </a>
        </div>
      </Container>
    </div>
  );
}
