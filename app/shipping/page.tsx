'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/common';
import { Truck, ThermometerSnowflake, ShieldCheck, ChevronRight, Clock, MapPin, Wrench } from 'lucide-react';
import { HEADQUARTERS_INFO, RAJASTHAN_DISTRICTS } from '@/data/rajasthanDistricts';

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-spice-ivory pb-24">
      <section className="bg-gradient-to-b from-spice-sand/40 to-spice-ivory border-b border-spice-border py-12">
        <Container size="md">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-spice-taupe mb-4 font-medium">
            <Link href="/" className="hover:text-spice-espresso">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-spice-border-strong" />
            <span className="text-spice-espresso font-bold">Shipping &amp; Logistics</span>
          </nav>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-spice-espresso">
            Rajasthan &amp; Pan-India Medical Logistics Policy
          </h1>
          <p className="text-xs text-spice-taupe mt-1">
            Climate-Controlled Cold Chain (2°C–8°C) • Direct Dispatch from Jaipur Central Hub
          </p>
        </Container>
      </section>

      <Container size="md" className="mt-8">
        <div className="bg-white rounded-3xl border border-spice-border p-6 sm:p-10 shadow-warm-xs space-y-6 text-xs sm:text-sm text-spice-taupe leading-relaxed">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-spice-sand/20 rounded-2xl border border-spice-border">
            <div>
              <span className="font-bold text-spice-espresso text-xs block">Rajasthan Clinical Analyzers</span>
              <span className="text-spice-cardamom font-bold text-base">FREE On-Site Delivery &amp; Setup</span>
            </div>
            <div>
              <span className="font-bold text-spice-espresso text-xs block">Consumables &amp; Reagents &gt; ₹5,000</span>
              <span className="text-spice-espresso font-bold text-base">FREE Cold-Chain Dispatch</span>
            </div>
          </div>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-base text-spice-espresso flex items-center gap-2">
              <Truck className="w-4 h-4 text-spice-terracotta" /> 1. Rajasthan 50-District Coverage
            </h2>
            <p>
              Human Biomedical operates a dedicated dispatch network spanning all 50 districts of Rajasthan, including Nagaur, Jaipur, Jodhpur, Kota, Bikaner, Udaipur, Didwana-Kuchaman, Alwar, and Sikar:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Jaipur &amp; Immediate Suburbs</strong>: Same-day / 24-hour direct engineer delivery.</li>
              <li><strong>Major Rajasthan Districts (Nagaur, Jodhpur, Kota, Bikaner, Udaipur)</strong>: <strong>24 to 48 hours</strong> with scheduled engineer installation.</li>
              <li><strong>Remote &amp; Border Tehsils</strong>: <strong>48 to 72 hours</strong> direct door-delivery to your clinical facility.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-base text-spice-espresso flex items-center gap-2">
              <ThermometerSnowflake className="w-4 h-4 text-spice-cardamom" /> 2. Temperature-Controlled Cold Chain (2°C–8°C)
            </h2>
            <p>
              All IVD reagents, hematology lysing reagents, enzymatic controls, and diagnostic test cassettes are transported in specialized insulated shippers with calibrated gel ice packs or dry ice data loggers to ensure zero enzymatic degradation.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-base text-spice-espresso flex items-center gap-2">
              <Wrench className="w-4 h-4 text-spice-turmeric" /> 3. White-Glove Heavy Equipment Unboxing
            </h2>
            <p>
              For automated hematology analyzers, clinical chemistry towers, and centrifuge units, our trained logistics team coordinates directly with our biomedical service engineer to conduct unboxing, power verification, leveling, and optical calibration in your facility.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif font-bold text-base text-spice-espresso flex items-center gap-2">
              <MapPin className="w-4 h-4 text-spice-terracotta" /> 4. Central Dispatch Warehouse
            </h2>
            <p>
              Primary Logistics Hub: <strong>{HEADQUARTERS_INFO.address}</strong>. Dispatch inquiries can be tracked via phone at <a href="tel:+919829088234" className="font-bold underline text-spice-espresso">+91 98290 88234</a>.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
