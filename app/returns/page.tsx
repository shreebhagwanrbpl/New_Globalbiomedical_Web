'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/common';
import { ShieldCheck, RefreshCw, ChevronRight, Wrench, FileCheck } from 'lucide-react';
import { HEADQUARTERS_INFO } from '@/data/rajasthanDistricts';

export default function ReturnsPolicyPage() {
  return (
    <div className="min-h-screen bg-spice-ivory pb-24">
      <section className="bg-gradient-to-b from-spice-sand/40 to-spice-ivory border-b border-spice-border py-12">
        <Container size="md">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-spice-taupe mb-4 font-medium">
            <Link href="/" className="hover:text-spice-espresso">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-spice-border-strong" />
            <span className="text-spice-espresso font-bold">Equipment Warranty &amp; Replacement</span>
          </nav>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-spice-espresso">
            Warranty, Return &amp; Replacement Policy
          </h1>
          <p className="text-xs text-spice-taupe mt-1">
            Clinical Device Assurance • Field Engineer Support Across All 50 Rajasthan Districts
          </p>
        </Container>
      </section>

      <Container size="md" className="mt-8">
        <div className="bg-white rounded-3xl border border-spice-border p-6 sm:p-10 shadow-warm-xs space-y-6 text-xs sm:text-sm text-spice-taupe leading-relaxed">
          <div className="p-4 bg-spice-cardamom-50 rounded-2xl border border-spice-cardamom-200 flex items-start gap-3 text-spice-cardamom font-semibold">
            <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
            <span>Human Biomedical Guarantee: All equipment is covered by standard 12 to 24-month comprehensive warranties with guaranteed biomedical engineer dispatch within 24–48 hours across Rajasthan.</span>
          </div>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-base text-spice-espresso">1. Equipment Warranty &amp; Dead-on-Arrival (DOA) Policy</h2>
            <p>
              In the rare event that an analyzer or clinical instrument exhibits transit damage or operational non-conformance upon arrival:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Our field service engineer will immediately inspect the instrument on-site in your laboratory.</li>
              <li>If dead-on-arrival or damaged during logistics, Human Biomedical LLP will arrange an immediate brand-new replacement unit with expedited priority freight.</li>
              <li>Transit insurance coverage is maintained by Human Biomedical LLP until successful installation sign-off.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-base text-spice-espresso">2. Temperature-Sensitive Reagents &amp; Consumables</h2>
            <p>
              Clinical biochemistry reagents, hematology lyse packs, controls, and calibrators are delivered in validated cold-chain insulated packaging (2°C–8°C). If temperature monitors indicate temperature excursions during transit or if seal integrity is compromised, notify us within <strong>48 hours of delivery</strong> for an immediate batch replacement.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-base text-spice-espresso">3. Service &amp; Replacement Contact Desk</h2>
            <p>
              To file a replacement or warranty claim, contact our 24/7 Biomedical Support Line:
            </p>
            <div className="p-4 bg-spice-sand/30 rounded-2xl border border-spice-border space-y-1 text-spice-espresso">
              <div><strong>Helpline:</strong> <a href="tel:+919829088234" className="font-bold underline">+91 98290 88234</a> / 1800 890 2344</div>
              <div><strong>Service Email:</strong> <a href="mailto:service@humanbiomedical.in" className="font-bold underline text-spice-terracotta">service@humanbiomedical.in</a></div>
              <div><strong>Head Office Hub:</strong> {HEADQUARTERS_INFO.address}</div>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
