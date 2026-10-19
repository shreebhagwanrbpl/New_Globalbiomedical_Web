'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/common';
import { RefreshCw, CreditCard, ChevronRight } from 'lucide-react';

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-spice-ivory pb-24">
      <section className="bg-gradient-to-b from-spice-sand/40 to-spice-ivory border-b border-spice-border py-12">
        <Container size="md">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-spice-taupe mb-4 font-medium">
            <Link href="/" className="hover:text-spice-espresso">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-spice-border-strong" />
            <span className="text-spice-espresso font-bold">Refund Policy</span>
          </nav>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-spice-espresso">
            Refund &amp; Cancellation Policy
          </h1>
          <p className="text-xs text-spice-taupe mt-1">
            Prompt Reimbursements for Approved Claims • 3–5 Business Days
          </p>
        </Container>
      </section>

      <Container size="md" className="mt-8">
        <div className="bg-white rounded-3xl border border-spice-border p-6 sm:p-10 shadow-warm-xs space-y-6 text-xs sm:text-sm text-spice-taupe leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif font-bold text-base text-spice-espresso">1. Order Cancellations</h2>
            <p>
              You can cancel an order within <strong>2 hours</strong> of placement by emailing <a href="mailto:care@aaxol.com" className="text-spice-terracotta font-semibold hover:underline">care@aaxol.com</a> or contacting WhatsApp support. If the cancellation is requested before milling and dispatch, a 100% full refund is issued immediately.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-base text-spice-espresso">2. Refund Processing Timeframes</h2>
            <p>
              Once your refund claim is verified by our team, refunds are processed back to your original payment method:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>UPI &amp; NetBanking</strong>: Refund reflects within <strong>24 to 48 hours</strong>.</li>
              <li><strong>Credit / Debit Cards</strong>: <strong>3 to 5 business days</strong> depending on your issuing bank.</li>
              <li><strong>Cash on Delivery (COD)</strong>: Reimbursed via direct NEFT / IMPS transfer or UPI handle within <strong>48 hours</strong> upon providing bank details.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-base text-spice-espresso">3. Contact Us</h2>
            <p>
              For any billing or refund questions, please write to <a href="mailto:refunds@organium.in" className="text-spice-terracotta font-semibold hover:underline">refunds@organium.in</a> with your Order ID reference.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
