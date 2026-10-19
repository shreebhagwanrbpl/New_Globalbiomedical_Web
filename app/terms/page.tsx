'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/common';
import { ChevronRight } from 'lucide-react';
import { HEADQUARTERS_INFO } from '@/data/rajasthanDistricts';

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
            Terms &amp; Conditions of Sale &amp; Service
          </h1>
          <p className="text-xs text-spice-taupe mt-1">
            Last Updated: 2026 • Human Biomedical LLP
          </p>
        </Container>
      </section>

      <Container size="md" className="mt-8">
        <div className="bg-white rounded-3xl border border-spice-border p-6 sm:p-10 shadow-warm-xs space-y-6 text-xs sm:text-sm text-spice-taupe leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif font-bold text-base text-spice-espresso">1. Acceptance of Terms</h2>
            <p>
              By accessing, browsing, requesting quotations, or purchasing clinical laboratory equipment and reagents from Human Biomedical LLP ("we", "us", or "company"), you agree to be bound by these Terms and Conditions. If you do not agree, please refrain from using our online diagnostic portal.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-base text-spice-espresso">2. Medical Device Classification &amp; Regulatory Compliance</h2>
            <p>
              All in-vitro diagnostic (IVD) analyzers, hematology instruments, biochemistry systems, and diagnostic reagents marketed and distributed by Human Biomedical LLP comply with Central Drugs Standard Control Organisation (CDSCO) regulations and ISO 13485:2016 quality management standards. Instruments must be operated by qualified laboratory personnel or medical technologists.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-base text-spice-espresso">3. Pricing, GST Invoicing &amp; Institutional Tenders</h2>
            <p>
              All equipment and reagent prices listed are denominated in Indian Rupees (INR) and subject to applicable GST (12% or 18% depending on device/reagent classification). Institutional tax invoices with GSTIN input credit details are furnished with every consignment dispatched from our Jaipur central warehouse.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-base text-spice-espresso">4. Equipment Installation &amp; Training in Rajasthan</h2>
            <p>
              For all clinical analyzers dispatched across Rajasthan districts (including Nagaur, Jaipur, Jodhpur, Kota, Bikaner, Udaipur, and Ajmer), on-site installation and technician operational training are executed by certified Human Biomedical field engineers within 24 to 48 hours of delivery.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-base text-spice-espresso">5. Registered Office &amp; Governing Jurisdiction</h2>
            <p>
              Human Biomedical LLP Registered Office: <strong>{HEADQUARTERS_INFO.address}</strong>. Any legal disputes or claims arising in connection with orders or maintenance contracts shall be subject to the exclusive jurisdiction of the competent courts in Jaipur, Rajasthan.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
