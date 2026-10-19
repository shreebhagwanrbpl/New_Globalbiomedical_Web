import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Container } from '@/components/common';
import { constructMetadata } from '@/utils/seo';
import { HEADQUARTERS_INFO } from '@/data/rajasthanDistricts';
import {
  Wrench,
  ShieldCheck,
  Clock,
  Truck,
  CheckCircle2,
  Phone,
  MessageCircle,
  Award,
  Sparkles,
  ArrowRight,
  Activity,
  Zap,
  Building2,
} from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Biomedical Engineering & Diagnostic Lab Equipment Services | Human Biomedical LLP',
  description:
    'On-site installation, NABL calibration, Annual Maintenance Contracts (AMC/CMC), and cold-chain reagent delivery across 780+ districts of India. Factory-trained biomedical engineers from Jaipur Central HQ.',
  url: 'https://humanbiomedical.in/services',
});

const SERVICES_LIST = [
  {
    icon: Wrench,
    title: 'Free On-Site Installation & Staff Training',
    desc: 'Our certified biomedical engineers perform complete instrument commissioning, power stabilization, optical calibration, and hands-on operational training for your laboratory technicians.',
    badge: 'INCLUDED WITH EVERY ANALYZER',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    icon: ShieldCheck,
    title: 'NABL & ISO 15189 Calibration & QC Validation',
    desc: 'Multi-level control validation, precision linearity checks, and official calibration certification required for NABL accreditation and state health authority compliance.',
    badge: 'NABL READY STANDARDS',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    icon: Award,
    title: 'Comprehensive AMC & CMC Maintenance Contracts',
    desc: 'Zero-downtime protection plans with quarterly preventive visits, optical cleaning, sensor validation, free genuine spare parts replacement, and priority engineer assignment.',
    badge: '1-2 YEAR FULL WARRANTY',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  {
    icon: Truck,
    title: 'Cold-Chain Reagents Daily Replenishment',
    desc: 'Continuous cold-chain supply of 3-Part & 5-Part hematology lyse, diluents, clinical chemistry reagent kits, and electrolyte packs dispatched daily from our Jaipur Central Warehouse.',
    badge: 'SAME-DAY HQ DISPATCH',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  {
    icon: Clock,
    title: '24/7 Breakdown Assistance & Engineer Helpline',
    desc: 'Immediate phone and video technical troubleshooting with 24-hour on-site engineer visit guarantee across Rajasthan and major state medical corridors.',
    badge: '24/7 TECHNICAL SUPPORT',
    badgeColor: 'bg-red-50 text-red-600 border-red-200',
  },
  {
    icon: Building2,
    title: 'Turnkey Pathology Lab Setup & Planning',
    desc: 'End-to-end guidance for starting a new clinical laboratory: floorplan design, electrical/plumbing planning, equipment portfolio sizing, and staff recruitment guidance.',
    badge: 'STARTUP CONSULTING',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-24 text-slate-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-sky-50/70 via-slate-50/40 to-white border-b border-slate-200 py-12 sm:py-16">
        <Container size="2xl">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider border border-red-200/60">
              <Activity className="w-3.5 h-3.5" />
              <span>BIOMEDICAL ENGINEERING &amp; TECHNICAL SUPPORT SERVICES</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Biomedical Engineering, On-Site Installation &amp; AMC Services
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              From our Central Demonstration &amp; Engineering Center in Jaipur, Human Biomedical LLP provides certified on-site equipment commissioning, NABL calibration, and uninterrupted reagent support to over 1,500 clinical pathology laboratories, hospital ICUs, and diagnostic chains across India.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`https://wa.me/919829088234?text=${encodeURIComponent(
                  'Hello Human Biomedical LLP, I need biomedical engineering service / AMC support for my clinical diagnostic laboratory.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] text-white text-xs sm:text-sm font-bold shadow-xs hover:opacity-95 transition-opacity"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Engineer Helpline</span>
              </a>

              <a
                href={`tel:${HEADQUARTERS_INFO.phone}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs sm:text-sm font-bold shadow-xs hover:bg-slate-50 transition-colors"
              >
                <Phone className="w-4 h-4 text-red-600" />
                <span>Call Service Desk: {HEADQUARTERS_INFO.phone}</span>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <Container size="2xl" className="mt-12">
        <div className="mb-14">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider block">
                OUR CORE SERVICE PILLARS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                Comprehensive Diagnostic Lab Support
              </h2>
            </div>
            <Link
              href="/contact"
              className="text-xs sm:text-sm font-bold text-red-600 hover:underline flex items-center gap-1"
            >
              <span>Book an Engineer Visit</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_LIST.map((srv, idx) => {
              const IconComp = srv.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl border border-slate-200/90 hover:border-red-500/70 p-6 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shadow-xs">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${srv.badgeColor}`}>
                        {srv.badge}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 leading-snug">
                      {srv.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                      {srv.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-red-600">
                    <span className="flex items-center gap-1 text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Certified Support
                    </span>
                    <a
                      href={`https://wa.me/919829088234?text=${encodeURIComponent(
                        `Hello Human Biomedical LLP, I would like to inquire about: ${srv.title}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline flex items-center gap-1"
                    >
                      Inquire on WhatsApp →
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Central Headquarters Service Desk Box */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
              CENTRAL BIOMEDICAL ENGINEERING HUB
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Need immediate service or an Annual Maintenance Contract (AMC)?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Our central technical depot is stationed at{' '}
              <strong className="text-white">
                F-4, 1st Floor, Plot No. 16, D-Block Tagor Nagar, on Ajmer-Delhi, 200 Feet Bypass Rd, Jaipur, Rajasthan 302021.
              </strong>{' '}
              We dispatch engineers, calibrators, and spare parts with guaranteed response times across Rajasthan and pan-India districts.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/contact"
                className="px-5 py-3 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-colors shadow-xs"
              >
                Request Service / AMC Quote
              </Link>
              <a
                href={`tel:${HEADQUARTERS_INFO.phone}`}
                className="px-5 py-3 rounded-xl bg-white/10 text-white border border-white/20 text-xs font-bold hover:bg-white/20 transition-colors"
              >
                Call Engineer Desk: {HEADQUARTERS_INFO.phone}
              </a>
              <a
                href={`tel:${HEADQUARTERS_INFO.tollFree}`}
                className="px-5 py-3 rounded-xl bg-white/10 text-white border border-white/20 text-xs font-bold hover:bg-white/20 transition-colors"
              >
                Toll-Free: {HEADQUARTERS_INFO.tollFree}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
