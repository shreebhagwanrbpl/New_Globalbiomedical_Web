import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Container } from '@/components/common';
import { ALL_DISTRICTS, HEADQUARTERS_INFO } from '@/data/rajasthanDistricts';
import { MapPin, ShieldCheck, Activity, Phone, ArrowRight, Truck } from 'lucide-react';
import { constructMetadata } from '@/utils/seo';
import { DistrictsDirectoryClient } from '@/components/directory/DistrictsDirectoryClient';

export const metadata: Metadata = constructMetadata({
  title: 'Pan-India & Rajasthan Healthcare Diagnostic Supply Hubs (780+ Districts)',
  description:
    'Human Biomedical LLP provides same-day dispatch and on-site biomedical engineering support across all 780+ districts of India including Rajasthan (all 50 districts), Delhi NCR, Maharashtra, UP, Bihar, Gujarat, MP, and Karnataka.',
  url: 'https://humanbiomedical.in/rajasthan',
  keywords: [
    'biomedical equipment india',
    'hematology in nagaur',
    'diagnostic lab equipment jaipur',
    'all india pathology machines',
    'cbc reagent supplier india',
  ],
});

export default function RajasthanDistrictsIndexPage() {
  return (
    <div className="min-h-screen bg-white pb-24 text-slate-800">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-sky-50/60 via-slate-50/40 to-white border-b border-slate-200 py-12 sm:py-16">
        <Container size="2xl">
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider border border-red-200/60">
              <MapPin className="w-3.5 h-3.5" />
              <span>ALL-INDIA &amp; RAJASTHAN HEALTHCARE DISTRIBUTION NETWORK</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Biomedical Equipment &amp; Diagnostic Reagents Across All 780+ Districts of India
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              From our Central Headquarters on 200 Feet Bypass Road, Tagor Nagar, Jaipur, Human Biomedical LLP supplies, installs, and services clinical laboratories, hospital chains, and diagnostic pathology centers across Rajasthan and every state in India.
            </p>
          </div>
        </Container>
      </section>

      {/* Central Headquarters Highlight */}
      <Container size="2xl" className="mt-10">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider block">
                CENTRAL HEADQUARTERS &amp; DEMONSTRATION CENTER
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {HEADQUARTERS_INFO.name} — Jaipur
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                <strong className="text-slate-800">Address: </strong>
                {HEADQUARTERS_INFO.fullAddress}
              </p>
              <div className="flex flex-wrap gap-4 text-xs text-slate-700 font-semibold pt-2">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-red-600" />
                  <span>{HEADQUARTERS_INFO.phone}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-sky-600" />
                  <span>Same-Day Dispatch Central Hub</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>ISO 13485:2016 Certified Quality</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full text-center px-4 py-3 rounded-xl bg-red-600 text-white text-xs font-bold shadow-xs hover:bg-red-700 transition-colors"
              >
                Visit Headquarters / Book Demo
              </Link>
              <Link
                href="/rajasthan/nagaur"
                className="w-full text-center px-4 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold hover:bg-slate-200 transition-colors"
              >
                Explore Nagaur District Hub →
              </Link>
            </div>
          </div>
        </div>

        {/* 780+ Districts Interactive Client Directory */}
        <DistrictsDirectoryClient allDistricts={ALL_DISTRICTS} />
      </Container>
    </div>
  );
}
