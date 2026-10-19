'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/common';
import { ShieldCheck, Lock, ChevronRight } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-spice-ivory pb-24">
      <section className="bg-gradient-to-b from-spice-sand/40 to-spice-ivory border-b border-spice-border py-12">
        <Container size="md">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-spice-taupe mb-4 font-medium">
            <Link href="/" className="hover:text-spice-espresso">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-spice-border-strong" />
            <span className="text-spice-espresso font-bold">Privacy Policy</span>
          </nav>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-spice-espresso">
            Privacy Policy
          </h1>
          <p className="text-xs text-spice-taupe mt-1">
            Last Updated: 23 September 2026 • Organium Private Limited
          </p>
        </Container>
      </section>

      <Container size="md" className="mt-8">
        <div className="bg-white rounded-3xl border border-spice-border p-6 sm:p-10 shadow-warm-xs space-y-6 text-xs sm:text-sm text-spice-taupe leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif font-bold text-base text-spice-espresso">1. Commitment to Your Privacy</h2>
            <p>
              At AAXOL ("we", "our", or "us"), we value your trust and are deeply committed to protecting your personal information. This Privacy Policy details how we collect, use, and safeguard your data when you visit our website, purchase spices, or interact with our concierge services.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-base text-spice-espresso">2. Information We Collect</h2>
            <p>
              We collect information you provide directly during checkout and account creation, including your name, email address, phone number, shipping and billing address, and recipe preferences. All payment transactions are encrypted using 256-bit SSL encryption. We do not store full credit/debit card numbers or UPI PINs on our servers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-base text-spice-espresso">3. How We Use Your Data</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Processing and fulfilling your spice orders and dispatch tracking.</li>
              <li>Sending transactional notifications, tracking updates, and delivery alerts.</li>
              <li>Personalizing your culinary suggestions, recipes, and seasonal harvest offers.</li>
              <li>Complying with statutory tax, invoicing, and FSSAI regulatory requirements.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-base text-spice-espresso">4. Zero Third-Party Data Selling</h2>
            <p>
              We will never sell, rent, or trade your personal data to external marketing agencies or brokers. Your details are shared only with trusted logistics partners (e.g. BlueDart, DHL) solely for parcel fulfillment.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-base text-spice-espresso">5. Data Security &amp; Contact</h2>
            <p>
              For privacy requests, data deletion, or questions, please contact our Data Protection Desk at <a href="mailto:privacy@organium.in" className="text-spice-terracotta font-semibold hover:underline">privacy@organium.in</a>.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
