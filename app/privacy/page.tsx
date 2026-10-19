'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/common';
import { ShieldCheck, Lock, ChevronRight } from 'lucide-react';
import { HEADQUARTERS_INFO } from '@/data/rajasthanDistricts';

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
            Last Updated: 2026 • Human Biomedical LLP
          </p>
        </Container>
      </section>

      <Container size="md" className="mt-8">
        <div className="bg-white rounded-3xl border border-spice-border p-6 sm:p-10 shadow-warm-xs space-y-6 text-xs sm:text-sm text-spice-taupe leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif font-bold text-base text-spice-espresso">1. Commitment to Clinical &amp; Commercial Confidentiality</h2>
            <p>
              At Human Biomedical LLP ("we", "our", or "us"), we value the trust of pathology laboratories, hospitals, diagnostic centers, and healthcare practitioners across Rajasthan and India. This Privacy Policy details how we collect, handle, and protect institutional and account data across our platform.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-base text-spice-espresso">2. Information Collected</h2>
            <p>
              We collect details provided during quotation requests, equipment orders, and AMC registrations, including laboratory / hospital name, authorized doctor or lab director contact details, delivery address, GSTIN numbers, and device serial keys. All online payment data is encrypted with 256-bit SSL protocols; we never store confidential banking credentials.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-base text-spice-espresso">3. How Information is Used</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Processing medical device dispatches, cold-chain reagent freight, and GST tax invoices.</li>
              <li>Scheduling biomedical service engineers for on-site calibration and preventative maintenance.</li>
              <li>Dispatching critical reagent lot release updates and device firmware notices.</li>
              <li>Meeting statutory medical device traceability and quality audit requirements.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-base text-spice-espresso">4. Zero Commercial Data Brokering</h2>
            <p>
              We do not sell, rent, or trade your institution's contact or procurement records to external marketing entities. Data is only communicated to authorized logistics partners and our verified field service engineering network.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-base text-spice-espresso">5. Data Protection Contact</h2>
            <p>
              For privacy queries, institutional data updates, or inquiries, reach out to our administration desk at <a href="mailto:support@humanbiomedical.in" className="text-spice-terracotta font-semibold hover:underline">support@humanbiomedical.in</a> or visit our Head Office at {HEADQUARTERS_INFO.address}.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
