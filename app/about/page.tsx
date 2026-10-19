'use client';

import React from 'react';
import Link from 'next/link';
import { Container, Button } from '@/components/common';
import {
  Activity,
  ShieldCheck,
  Award,
  Globe2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Package,
  Phone,
  MapPin,
  Truck,
  Clock,
} from 'lucide-react';
import { HEADQUARTERS_INFO } from '@/data/rajasthanDistricts';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-spice-ivory pb-24">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-spice-sand/40 via-spice-sand/20 to-spice-ivory border-b border-spice-border py-12 sm:py-20">
        <Container size="2xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-spice-terracotta-50 text-spice-terracotta text-xs font-bold uppercase tracking-wider mb-4 border border-spice-terracotta/20">
              <Activity className="w-3.5 h-3.5" />
              <span>HUMAN BIOMEDICAL LLP • RAJASTHAN</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-spice-espresso tracking-tight leading-tight mb-4">
              Empowering Diagnostic Precision &amp; Clinical Excellence Across Rajasthan
            </h1>
            <p className="text-base sm:text-lg text-spice-taupe leading-relaxed">
              <strong>Human Biomedical LLP</strong> is a premier distributor and engineering service provider of advanced biomedical instrumentation, automated hematology cell counters, clinical biochemistry analyzers, medical microscopes, centrifuges, and NABL-grade reagents across all 50 districts of Rajasthan.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Editorial Story Section */}
      <Container size="2xl" className="mt-12 space-y-16 sm:space-y-24">
        {/* Story Part 1: Our Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold text-spice-terracotta uppercase tracking-wider">
              OUR MISSION &amp; COMMITMENT
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-spice-espresso">
              Reliable Healthcare Diagnostics Within Everyone's Reach
            </h2>
            <p className="text-sm text-spice-taupe leading-relaxed">
              Diagnostic test accuracy directly impacts patient treatment decisions. Founded in Jaipur, Human Biomedical LLP was established with a singular vision: to ensure that every pathology laboratory, hospital ICU, and primary health centre in Rajasthan—from urban centers like Jaipur, Jodhpur, and Kota to district hubs like Nagaur, Bikaner, Sikar, and Bhilwara—has seamless access to world-class diagnostic equipment backed by responsive local engineering support.
            </p>
            <p className="text-sm text-spice-taupe leading-relaxed">
              We eliminate diagnostic downtime through our strategic central logistics hub located on 200 Feet Bypass Road, Jaipur, dispatching temperature-sensitive reagents, calibrators, and spare parts daily with guaranteed 24-hour regional delivery.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-warm-lg border-4 border-white bg-spice-sand/40 aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=900&auto=format&fit=crop&q=80"
                alt="Human Biomedical Diagnostic Laboratory"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Story Part 2: Quality & Standards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-white rounded-3xl border border-spice-border shadow-warm-xs text-center space-y-2">
                <span className="font-serif font-bold text-3xl text-spice-terracotta">50</span>
                <h4 className="font-bold text-xs text-spice-espresso">Rajasthan Districts</h4>
                <p className="text-[11px] text-spice-taupe">Direct delivery &amp; on-site engineer network.</p>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-spice-border shadow-warm-xs text-center space-y-2">
                <span className="font-serif font-bold text-3xl text-spice-cardamom">1,500+</span>
                <h4 className="font-bold text-xs text-spice-espresso">Equipped Facilities</h4>
                <p className="text-[11px] text-spice-taupe">Hospitals, diagnostic labs, and clinics.</p>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-spice-border shadow-warm-xs text-center space-y-2">
                <span className="font-serif font-bold text-3xl text-spice-turmeric">ISO</span>
                <h4 className="font-bold text-xs text-spice-espresso">13485:2016</h4>
                <p className="text-[11px] text-spice-taupe">Certified Medical Device Quality Management.</p>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-spice-border shadow-warm-xs text-center space-y-2">
                <span className="font-serif font-bold text-3xl text-spice-espresso">24/7</span>
                <h4 className="font-bold text-xs text-spice-espresso">Biomedical Support</h4>
                <p className="text-[11px] text-spice-taupe">Field engineers and tele-diagnostic triage.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
            <span className="text-xs font-bold text-spice-terracotta uppercase tracking-wider">
              FIELD ENGINEERING &amp; CALIBRATION
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-spice-espresso">
              Trained Biomedical Field Service Team
            </h2>
            <p className="text-sm text-spice-taupe leading-relaxed">
              Medical equipment is only as good as the service behind it. Every analyzer supplied by Human Biomedical LLP is backed by our factory-trained biomedical engineers who personally oversee on-site unboxing, electrical earthing validation, optical alignment, and user operation training.
            </p>
            <p className="text-sm text-spice-taupe leading-relaxed">
              We provide NABL traceable calibration certificates, multi-level control verification logs, and flexible Annual Maintenance Contracts (AMC/CMC) with guaranteed uptime commitments.
            </p>
          </div>
        </div>

        {/* Corporate Headquarters Callout */}
        <div className="bg-white rounded-3xl border border-spice-border p-8 sm:p-12 shadow-warm-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-spice-cardamom-50 text-spice-cardamom text-xs font-bold">
                <MapPin className="w-3.5 h-3.5" />
                <span>CORPORATE HEADQUARTERS</span>
              </div>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-spice-espresso">
                Visit Our Demonstration &amp; Experience Center
              </h3>
              <p className="text-xs sm:text-sm text-spice-taupe leading-relaxed">
                Pathologists, doctors, and laboratory owners are invited to our state-of-the-art demonstration suite in Jaipur to test analyzers, evaluate software interfaces, and inspect reagent linearity firsthand.
              </p>
              <div className="text-xs text-spice-espresso space-y-1 font-medium pt-2">
                <p>
                  <strong>Address: </strong>
                  {HEADQUARTERS_INFO.fullAddress}
                </p>
                <p>
                  <strong>Helpline: </strong>
                  {HEADQUARTERS_INFO.phone} • <strong>Email: </strong>
                  {HEADQUARTERS_INFO.email}
                </p>
              </div>
              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="px-5 py-2.5 rounded-xl bg-spice-terracotta text-white text-xs font-bold shadow-warm-xs hover:bg-spice-terracotta-600 transition-colors"
                >
                  Schedule Demo / Contact Us
                </Link>
                <Link
                  href="/rajasthan"
                  className="px-5 py-2.5 rounded-xl bg-spice-sand/50 text-spice-espresso border border-spice-border text-xs font-bold hover:bg-spice-sand transition-colors"
                >
                  View 50 Rajasthan Hubs →
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="w-full h-64 rounded-2xl overflow-hidden border border-spice-border shadow-warm-sm relative">
                <iframe
                  title="Human Biomedical Headquarters"
                  src={HEADQUARTERS_INFO.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
