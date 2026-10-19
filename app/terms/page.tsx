'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/common';
import { ChevronRight } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-spice-ivory pb-24">
      <section className="bg-gradient-to-b from-spice-sand/40 to-spice-ivory border-b border-spice-border py-12">
        <Container size="md">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-spice-taupe mb-4 font-medium">
            <Link href="/" className="hover:text-spice-espresso">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-spice-border-strong" />
            <span className="text-spice-espresso font-bold">Terms of Service</span>
          </nav>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-spice-espresso">
            Terms &amp; Conditions of Sale
          </h1>
          <p className="text-xs text-spice-taupe mt-1">
            Last Updated: 23 September 2026 • Organium Private Limited
          </p>
        </Container>
      </section>

      <Container size="md" className="mt-8">
        <div className="bg-white rounded-3xl border border-spice-border p-6 sm:p-10 shadow-warm-xs space-y-6 text-xs sm:text-sm text-spice-taupe leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif font-bold text-base text-spice-espresso">1. Acceptance of Terms</h2>
            <p>
              By accessing, browsing, or purchasing from AAXOL, you agree to be bound by these Terms and Conditions and our associated policies. If you do not agree, please refrain from using our online portal.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-base text-spice-espresso">2. Product Authenticity &amp; Natural Variations</h2>
            <p>
              All our spices are agricultural products sourced from native Indian terroirs. Because we do not use artificial colour dyes (such as Sudan red) or synthetic additives, slight natural variances in colour shade, granule texture, and seasonal pungency may occur across harvest seasons.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-base text-spice-espresso">3. Pricing &amp; Taxes</h2>
            <p>
              All product prices listed on our storefront are in Indian Rupees (INR) and are inclusive of applicable Goods and Services Tax (GST). We reserve the right to revise promotional discounts and coupon validity periods without prior individual notice.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-base text-spice-espresso">4. Order Placement &amp; Cancellations</h2>
            <p>
              Orders can be modified or cancelled within 2 hours of placement before parcels enter the micro-batch stone milling and packaging phase. Once dispatched, our standard replacement policy applies.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-base text-spice-espresso">5. Governing Law &amp; Jurisdiction</h2>
            <p>
              These terms are governed by the laws of India. Any legal disputes arising in connection with orders shall be subject to the exclusive jurisdiction of the competent courts in Jaipur, Rajasthan.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
