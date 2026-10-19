'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/common';
import { RefreshCw, CreditCard, ChevronRight, ShieldCheck } from 'lucide-react';
import { HEADQUARTERS_INFO } from '@/data/rajasthanDistricts';

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-spice-ivory pb-24">
      <section className="bg-gradient-to-b from-spice-sand/40 to-spice-ivory border-b border-spice-border py-12">
        <Container size="md">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-spice-taupe mb-4 font-medium">
            <Link href="/" className="hover:text-spice-espresso">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-spice-border-strong" />
            <span className="text-spice-espresso font-bold">Refund &amp; Cancellation Policy</span>
          </nav>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-spice-espresso">
            Institutional Refund &amp; Cancellation Policy
          </h1>
          <p className="text-xs text-spice-taupe mt-1">
            Human Biomedical LLP • Standard Operating Billing Procedure
          </p>
        </Container>
      </section>

      <Container size="md" className="mt-8">
        <div className="bg-white rounded-3xl border border-spice-border p-6 sm:p-10 shadow-warm-xs space-y-6 text-xs sm:text-sm text-spice-taupe leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif font-bold text-base text-spice-espresso">1. Order Cancellations</h2>
            <p>
              Standard consumable, rapid kit, and reagent orders may be modified or cancelled prior to cold-chain packing and warehouse dispatch by notifying our order coordination desk at <a href="mailto:sales@humanbiomedical.in" className="text-spice-terracotta font-semibold hover:underline">sales@humanbiomedical.in</a> or calling <strong>+91 98290 88234</strong>. For major automated clinical analyzers, cancellations are accommodated within 24 hours of purchase order issuance.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-base text-spice-espresso">2. Institutional Refund Processing</h2>
            <p>
              Once a cancellation or eligible credit note is approved by Human Biomedical accounts:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>NEFT / RTGS / IMPS</strong>: Commercial wire reimbursements are remitted within <strong>2 to 3 business days</strong> to the purchasing institution's verified corporate account.</li>
              <li><strong>Online Payment Gateway (Debit/Credit Cards, Corporate Net Banking)</strong>: Processed within <strong>3 to 5 banking days</strong>.</li>
              <li><strong>GST Credit Note</strong>: Revised GST tax credit notes are issued in compliance with the GST portal timeline for proper tax adjustment.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-base text-spice-espresso">3. Billing &amp; Finance Helpdesk</h2>
            <p>
              For refund status inquiries or GST adjustment queries, contact our finance desk at <a href="mailto:sales@humanbiomedical.in" className="text-spice-terracotta font-semibold hover:underline">sales@humanbiomedical.in</a> or visit our corporate office at {HEADQUARTERS_INFO.address}.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
