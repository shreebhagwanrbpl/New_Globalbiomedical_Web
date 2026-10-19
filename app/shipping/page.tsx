'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/common';
import { Truck, Globe2, ShieldCheck, ChevronRight, Clock } from 'lucide-react';

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-spice-ivory pb-24">
      <section className="bg-gradient-to-b from-spice-sand/40 to-spice-ivory border-b border-spice-border py-12">
        <Container size="md">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-spice-taupe mb-4 font-medium">
            <Link href="/" className="hover:text-spice-espresso">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-spice-border-strong" />
            <span className="text-spice-espresso font-bold">Shipping Policy</span>
          </nav>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-spice-espresso">
            Pan-India &amp; International Shipping Policy
          </h1>
          <p className="text-xs text-spice-taupe mt-1">
            Express Climate-Controlled Dispatch • 24,000+ PIN Codes Serviced
          </p>
        </Container>
      </section>

      <Container size="md" className="mt-8">
        <div className="bg-white rounded-3xl border border-spice-border p-6 sm:p-10 shadow-warm-xs space-y-6 text-xs sm:text-sm text-spice-taupe leading-relaxed">
          <div className="grid grid-cols-2 gap-4 p-4 bg-spice-sand/20 rounded-2xl border border-spice-border">
            <div>
              <span className="font-bold text-spice-espresso text-xs block">Domestic Orders &gt; ₹999</span>
              <span className="text-spice-cardamom font-bold text-base">FREE Express Shipping</span>
            </div>
            <div>
              <span className="font-bold text-spice-espresso text-xs block">Domestic Orders &lt; ₹999</span>
              <span className="text-spice-espresso font-bold text-base">Flat ₹79 Express</span>
            </div>
          </div>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-base text-spice-espresso flex items-center gap-2">
              <Truck className="w-4 h-4 text-spice-terracotta" /> 1. Domestic Delivery Timelines
            </h2>
            <p>
              Orders are freshly packed and dispatched within 24 hours of confirmation. Standard delivery estimates:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Tier 1 Metro Cities</strong> (Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata): <strong>2–3 business days</strong>.</li>
              <li><strong>Tier 2 &amp; Tier 3 Cities</strong>: <strong>3–5 business days</strong>.</li>
              <li><strong>North-East &amp; Island Territories</strong>: <strong>5–7 business days</strong>.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-base text-spice-espresso flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-spice-cardamom" /> 2. International Export Shipping
            </h2>
            <p>
              We ship our vacuum-sealed, export-grade spices worldwide to the USA, UK, UAE, Canada, Singapore, and Europe via DHL Express and FedEx International Priority.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>International transit time is approximately <strong>4–7 business days</strong>.</li>
              <li>Customs import duties and local taxes (if levied by destination country customs) are the responsibility of the recipient.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-base text-spice-espresso flex items-center gap-2">
              <Clock className="w-4 h-4 text-spice-turmeric" /> 3. Real-Time Tracking &amp; Notifications
            </h2>
            <p>
              Upon dispatch, you will receive an automated tracking link via SMS and email with live courier updates from BlueDart, Delhivery, or DHL.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
