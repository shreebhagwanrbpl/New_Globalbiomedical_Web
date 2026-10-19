'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/common';
import { ShieldCheck, RefreshCw, ChevronRight } from 'lucide-react';

export default function ReturnsPolicyPage() {
  return (
    <div className="min-h-screen bg-spice-ivory pb-24">
      <section className="bg-gradient-to-b from-spice-sand/40 to-spice-ivory border-b border-spice-border py-12">
        <Container size="md">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-spice-taupe mb-4 font-medium">
            <Link href="/" className="hover:text-spice-espresso">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-spice-border-strong" />
            <span className="text-spice-espresso font-bold">Return &amp; Replacement Policy</span>
          </nav>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-spice-espresso">
            100% Satisfaction &amp; Replacement Guarantee
          </h1>
          <p className="text-xs text-spice-taupe mt-1">
            7-Day Hassle-Free Replacement for Damaged or Defective Deliveries
          </p>
        </Container>
      </section>

      <Container size="md" className="mt-8">
        <div className="bg-white rounded-3xl border border-spice-border p-6 sm:p-10 shadow-warm-xs space-y-6 text-xs sm:text-sm text-spice-taupe leading-relaxed">
          <div className="p-4 bg-spice-cardamom-50 rounded-2xl border border-spice-cardamom-200 flex items-start gap-3 text-spice-cardamom font-semibold">
            <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
            <span>Our Quality Promise: If your spices arrive with broken seals or transit damage, we will replace the item immediately without complicated return paperwork.</span>
          </div>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-base text-spice-espresso">1. Eligibility for Replacement</h2>
            <p>
              Due to the perishable nature and hygiene safety standards of consumable food spices, opened food items cannot be physically returned to our warehouse once used. However, we provide an immediate free replacement or refund under the following conditions:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Damaged, unsealed, or dented tin canisters upon delivery.</li>
              <li>Incorrect spice pack or size delivered compared to your order invoice.</li>
              <li>Missing items from a combo vault package.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-base text-spice-espresso">2. How to Request a Replacement</h2>
            <p>
              Notify our customer support team within <strong>7 days of delivery</strong> at <a href="mailto:care@aaxol.com" className="text-spice-terracotta font-semibold hover:underline">care@aaxol.com</a> or via WhatsApp with your Order ID and a photo of the damaged package.
            </p>
            <p>
              Our concierge team will dispatch a fresh replacement package within 24 hours at zero additional shipping cost.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
