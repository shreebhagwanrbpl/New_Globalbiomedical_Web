'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Button } from '@/components/common';
import { staticFAQs, FAQItem } from '@/data/faqs';
import { HelpCircle, ChevronDown, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';
import { LUXURY_EASE } from '@/components/animations/Motion';

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const categories = ['All', 'Purity & Quality', 'Sourcing', 'Storage & Freshness', 'Shipping & Orders', 'Gifting & Returns'];

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
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-spice-espresso tracking-tight leading-tight mb-3">
              Everything You Need to Know
            </h1>
            <p className="text-sm sm:text-base text-spice-taupe leading-relaxed">
              Find detailed information on our single-origin farm sourcing, stone pounding techniques, shelf life, 24-parameter purity testing, and global shipping policies.
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

        {/* Still Have Questions Box */}
        <div className="mt-16 max-w-2xl mx-auto bg-spice-sand/30 rounded-3xl border border-spice-border p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-spice-terracotta/10 text-spice-terracotta flex items-center justify-center mx-auto mb-3">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-xl text-spice-espresso mb-1">
            Still Have Questions?
          </h3>
          <p className="text-xs sm:text-sm text-spice-taupe mb-6">
            Our spice concierge team is available to assist you with dish pairings, bulk gifting, and delivery queries.
          </p>
          <Link href="/contact">
            <Button variant="primary" size="md">
              Contact Spice Concierge
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
