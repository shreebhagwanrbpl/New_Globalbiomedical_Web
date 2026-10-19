'use client';

import React from 'react';
import Link from 'next/link';
import { Container, Button } from '@/components/common';
import { ScrollReveal } from '@/components/animations/Motion';
import {
  Leaf,
  ShieldCheck,
  Flame,
  Award,
  Globe2,
  Heart,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Package,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-spice-ivory pb-24">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-spice-sand/40 via-spice-sand/20 to-spice-ivory border-b border-spice-border py-12 sm:py-20">
        <Container size="2xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-spice-cardamom-50 text-spice-cardamom text-xs font-bold uppercase tracking-wider mb-4 border border-spice-cardamom/20">
              <Leaf className="w-3.5 h-3.5" />
              <span>ORGANIUM HERITAGE • AAXOL BRAND</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-spice-espresso tracking-tight leading-tight mb-4">
              Reviving the Lost Soul of Pure Indian Spices
            </h1>
            <p className="text-base sm:text-lg text-spice-taupe leading-relaxed">
              <strong>AAXOL</strong> is the flagship artisanal spice brand of <strong>Organium</strong>, founded to restore the timeless, unadulterated depth of flavour that once defined every royal and rustic Indian kitchen. Single-origin, cold stone-ground, and packed with therapeutic potency.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Editorial Story Section */}
      <Container size="2xl" className="mt-12 space-y-16 sm:space-y-24">
        {/* Story Part 1: Why We Started */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold text-spice-terracotta uppercase tracking-wider">
              OUR GENESIS
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-spice-espresso">
              Why Real Spices Were Disappearing
            </h2>
            <p className="text-sm text-spice-taupe leading-relaxed">
              In the race for mass-market commercial profits, industrial spice brands began stripping spices of their natural volatile essential oils. High-speed pulverizers generating friction heat above 90°C burned away delicate aromatics, while starch fillers and artificial dyes replaced pure whole harvests.
            </p>
            <p className="text-sm text-spice-taupe leading-relaxed">
              We set out on a two-year pilgrimage across India's traditional agricultural belts — from the rain-soaked ginger terraces of Meghalaya to the fiery Mathania chilli fields of Rajasthan and cardamom slopes of Idukki — to reconnect with indigenous farming lineages.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-warm-lg border-4 border-white bg-spice-sand/40 aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=900&auto=format&fit=crop&q=80"
                alt="Indian Spice Fields"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Story Part 2: The Sourcing & Milling Difference */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-white rounded-3xl border border-spice-border shadow-warm-xs text-center space-y-2">
                <span className="font-serif font-bold text-3xl text-spice-cardamom">5.8%</span>
                <h4 className="font-bold text-xs text-spice-espresso">Active Curcumin</h4>
                <p className="text-[11px] text-spice-taupe">Lakadong turmeric hand-harvested in Jaintia Hills Meghalaya.</p>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-spice-border shadow-warm-xs text-center space-y-2">
                <span className="font-serif font-bold text-3xl text-spice-terracotta">38°C</span>
                <h4 className="font-bold text-xs text-spice-espresso">Max Milling Temp</h4>
                <p className="text-[11px] text-spice-taupe">Slow stone-pounding retains all volatile aromatic oils.</p>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-spice-border shadow-warm-xs text-center space-y-2">
                <span className="font-serif font-bold text-3xl text-spice-turmeric">24</span>
                <h4 className="font-bold text-xs text-spice-espresso">Purity Parameters</h4>
                <p className="text-[11px] text-spice-taupe">Lab tested for zero aflatoxins, lead, or Sudan dyes.</p>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-spice-border shadow-warm-xs text-center space-y-2">
                <span className="font-serif font-bold text-3xl text-spice-espresso">100%</span>
                <h4 className="font-bold text-xs text-spice-espresso">Single Origin</h4>
                <p className="text-[11px] text-spice-taupe">Traceable directly to the farmer cooperative.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
            <span className="text-xs font-bold text-spice-cardamom uppercase tracking-wider">
              OUR CRAFT &amp; PURITY
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-spice-espresso">
              Cold Stone-Pounded in Micro-Batches
            </h2>
            <p className="text-sm text-spice-taupe leading-relaxed">
              Instead of industrial hammer mills, we use water-cooled granite stone pounders that emulate the traditional Indian mortar and pestle (Okhli). This slow grinding ensures that the delicate terpenes, crocin, curcumin, and piperine compounds remain alive in every grain.
            </p>
            <p className="text-sm text-spice-taupe leading-relaxed">
              We package every spice in airtight food-safe barrier pouches and sealed tin canisters that shield against ambient humidity and ultraviolet light degradation.
            </p>
          </div>
        </div>

        {/* 4 Steps Farm-to-Kitchen Journey */}
        <div className="bg-white rounded-3xl border border-spice-border p-8 sm:p-12 shadow-warm-xs">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-spice-terracotta uppercase tracking-wider">
              TRANSPARENT PROCESS
            </span>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-spice-espresso mt-1">
              From Heritage Indian Farms to Your Kitchen
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-spice-sand/20 border border-spice-border">
              <span className="w-8 h-8 rounded-full bg-spice-espresso text-white font-bold text-xs flex items-center justify-center mb-3">1</span>
              <h4 className="font-serif font-bold text-base text-spice-espresso mb-1">Ethical Direct Harvest</h4>
              <p className="text-xs text-spice-taupe">Direct farmer compensation 35% above market benchmark rates.</p>
            </div>

            <div className="p-5 rounded-2xl bg-spice-sand/20 border border-spice-border">
              <span className="w-8 h-8 rounded-full bg-spice-espresso text-white font-bold text-xs flex items-center justify-center mb-3">2</span>
              <h4 className="font-serif font-bold text-base text-spice-espresso mb-1">Sun Curing &amp; Cleaning</h4>
              <p className="text-xs text-spice-taupe">Triple optical sorted to eliminate dust, chaff, and impurities.</p>
            </div>

            <div className="p-5 rounded-2xl bg-spice-sand/20 border border-spice-border">
              <span className="w-8 h-8 rounded-full bg-spice-espresso text-white font-bold text-xs flex items-center justify-center mb-3">3</span>
              <h4 className="font-serif font-bold text-base text-spice-espresso mb-1">Micro-Batch Milling</h4>
              <p className="text-xs text-spice-taupe">Stone pounded within 48 hours of dispatch for explosive aroma.</p>
            </div>

            <div className="p-5 rounded-2xl bg-spice-sand/20 border border-spice-border">
              <span className="w-8 h-8 rounded-full bg-spice-espresso text-white font-bold text-xs flex items-center justify-center mb-3">4</span>
              <h4 className="font-serif font-bold text-base text-spice-espresso mb-1">Express Dispatch</h4>
              <p className="text-xs text-spice-taupe">Delivered across 24,000+ Indian pincodes in 48 to 72 hours.</p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="text-center bg-spice-espresso text-white rounded-3xl p-8 sm:p-12 shadow-warm-lg">
          <h3 className="font-serif font-bold text-2xl sm:text-3xl mb-3">
            Experience the AAXOL Spice Difference
          </h3>
          <p className="text-sm text-white/80 max-w-lg mx-auto mb-6">
            Elevate everyday curries, biryanis, and golden elixirs with our pure single-origin collections.
          </p>
          <Link href="/shop">
            <Button variant="primary" size="lg" showArrow className="shadow-terracotta-glow">
              Explore Our Spice Vault
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
