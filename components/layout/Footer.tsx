'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import {
  ShieldCheck,
  Award,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Clock,
  Lock,
  Globe2,
  Activity,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';
import { useDistrictLocation } from '@/hooks/useDistrictLocation';
import { RAJASTHAN_DISTRICTS, INDIA_MAJOR_DISTRICTS, HEADQUARTERS_INFO } from '@/data/rajasthanDistricts';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const activeLocation = useDistrictLocation();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="relative bg-slate-950 text-slate-300 overflow-hidden border-t border-slate-800">
      {/* Subtle ambient glows */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-600/5 rounded-full blur-3xl pointer-events-none translate-y-1/2"
        aria-hidden="true"
      />

      <Container size="2xl" className="relative z-10 pt-14 pb-10">
        {/* =========================================================================
            DYNAMIC LOCATION & CENTRAL MAP SHOWCASE BANNER
        ========================================================================= */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 mb-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Address Details */}
            <div className="lg:col-span-7 space-y-3.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold uppercase tracking-wider border border-red-500/20">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                <span>
                  {activeLocation.isDistrictActive
                    ? `${activeLocation.district?.name} District Central Hub`
                    : 'Corporate Head Office & Central Hub'}
                </span>
              </div>

              <h3 className="font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                {activeLocation.name}
              </h3>

              <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <p className="flex items-start gap-2 text-slate-200 font-medium">
                  <span className="font-bold text-red-400 shrink-0">Address:</span>
                  <span>{activeLocation.displayAddress}</span>
                </p>
                <p className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="font-bold text-slate-300 shrink-0">Landmark:</span>
                  <span>{activeLocation.landmark}</span>
                  <span className="text-slate-700">|</span>
                  <span className="font-bold text-slate-300 shrink-0">PIN Code:</span>
                  <span>{activeLocation.pincode}</span>
                </p>
                <p className="text-xs text-sky-400 font-semibold flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-sky-400" />
                  <span>{activeLocation.deliveryTimeline}</span>
                </p>

                {activeLocation.isDistrictActive && (
                  <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                    <span className="font-bold text-slate-200">State &amp; National Central Headquarters: </span>
                    {HEADQUARTERS_INFO.address}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={`tel:${activeLocation.phone}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-sm transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {activeLocation.phone}</span>
                </a>
                <a
                  href={`https://wa.me/919829088234?text=${encodeURIComponent(
                    `Hello Human Biomedical LLP, I would like to inquire about medical equipment delivery and service in ${activeLocation.name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Quote</span>
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold transition-colors"
                >
                  <span>All Contact Details</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </Link>
              </div>
            </div>

            {/* Embedded Live Interactive Google Map */}
            <div className="lg:col-span-5 h-[230px] sm:h-[260px] rounded-2xl overflow-hidden border border-slate-700 shadow-md relative bg-slate-800">
              <iframe
                title={`${activeLocation.name} Google Map Location`}
                src={activeLocation.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-slate-900/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-[10px] text-slate-300 flex items-center justify-between">
                <span className="font-bold truncate text-white">{activeLocation.name} Service Center</span>
                <span className="text-emerald-400 font-semibold shrink-0">● Active Dispatch</span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            FOUR COLUMN NAVIGATION GRID
        ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Col 1: Brand Info & ISO Badges */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group cursor-pointer inline-flex" title="Human Biomedical - Go to Homepage">
              <img
                src="/images/human-biomedical-logo.png"
                alt="Human Biomedical Logo"
                className="h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-102"
              />
              <div>
                <span className="font-extrabold text-lg text-white block leading-tight group-hover:text-red-400 transition-colors">
                  Human Biomedical
                </span>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  Clinical Diagnostics &amp; Equipment
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed">
              Authorized provider of advanced clinical laboratory equipment, automated hematology counters, clinical chemistry analyzers, and diagnostic reagents across Rajasthan and India.
            </p>

            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-sky-400 shrink-0" />
                <span>ISO 13485:2016 Certified Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>CDSCO Registered Medical Devices</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>NABL Traceable Calibrated Controls</span>
              </div>
            </div>
          </div>

          {/* Col 2: DIAGNOSTIC EQUIPMENT */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Diagnostic Instruments
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/category/hematology" className="hover:text-white transition-colors">
                  3-Part &amp; 5-Part Hematology Analyzers
                </Link>
              </li>
              <li>
                <Link href="/category/biochemistry" className="hover:text-white transition-colors">
                  Semi &amp; Fully Auto Biochemistry Analyzers
                </Link>
              </li>
              <li>
                <Link href="/product/universal-cbc-hematology-reagents-diluent-lyse-pack" className="hover:text-white transition-colors">
                  Universal CBC Diluent &amp; Lyse Reagents
                </Link>
              </li>
              <li>
                <Link href="/category/microscopes-centrifuges" className="hover:text-white transition-colors">
                  Trinocular LED Microscopes &amp; Centrifuges
                </Link>
              </li>
              <li>
                <Link href="/category/electrolyte-urine" className="hover:text-white transition-colors">
                  Electrolyte &amp; Urine Chemistry Analyzers
                </Link>
              </li>
              <li>
                <Link href="/category/poct-rapid-kits" className="hover:text-white transition-colors">
                  Dengue, Malaria &amp; Cardiac POCT Rapid Cards
                </Link>
              </li>
              <li>
                <Link href="/offers#combos" className="text-red-400 font-bold hover:underline transition-colors block pt-1">
                  Complete Turnkey Lab Setup Packages →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: REGIONAL HUBS */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Regional Service Centers
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/rajasthan/nagaur" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Nagaur JLN Hospital Hub</span>
                  <span className="text-[10px] text-red-400 font-semibold">Fast Delivery</span>
                </Link>
              </li>
              <li>
                <Link href="/rajasthan/jaipur" className="hover:text-white transition-colors">
                  Jaipur 200 Feet Bypass Central HQ
                </Link>
              </li>
              <li>
                <Link href="/rajasthan/jodhpur" className="hover:text-white transition-colors">
                  Jodhpur AIIMS Corridor Depot
                </Link>
              </li>
              <li>
                <Link href="/rajasthan/kota" className="hover:text-white transition-colors">
                  Kota Hadoti Medical Belt
                </Link>
              </li>
              <li>
                <Link href="/rajasthan/bikaner" className="hover:text-white transition-colors">
                  Bikaner North Desk
                </Link>
              </li>
              <li>
                <Link href="/rajasthan/delhi" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Delhi NCR Hub</span>
                  <span className="text-[10px] text-sky-400 font-semibold">National Hub</span>
                </Link>
              </li>
              <li>
                <Link href="/rajasthan/ahmedabad" className="hover:text-white transition-colors">
                  Ahmedabad Gujarat Desk
                </Link>
              </li>
              <li>
                <Link href="/rajasthan" className="text-sky-400 font-bold hover:underline transition-colors block pt-1">
                  View All India &amp; Rajasthan Districts →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: COMPANY & SUPPORT */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Company &amp; Support
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Human Biomedical LLP
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Biomedical Engineering &amp; Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact &amp; Location Map
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-white transition-colors">
                  Track Consignment
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Biomedical FAQs &amp; AMC Terms
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service &amp; Warranty
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition-colors">
                  Cold-Chain Logistics Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Quick 50 Rajasthan Districts & India Metros Link Cloud */}
        <div className="pt-8 pb-6 border-b border-slate-800">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center justify-between">
            <span>Fast Supply &amp; Calibration Service Across All 50 Districts of Rajasthan &amp; India:</span>
            <Link href="/rajasthan" className="text-red-400 hover:underline text-[10px]">
              Full District Directory
            </Link>
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-[11px] text-slate-400">
            {RAJASTHAN_DISTRICTS.map((dist) => (
              <Link
                key={dist.slug}
                href={`/rajasthan/${dist.slug}`}
                className="hover:text-white hover:underline transition-colors"
              >
                {dist.name}
              </Link>
            ))}
            {INDIA_MAJOR_DISTRICTS.map((dist) => (
              <Link
                key={dist.slug}
                href={`/rajasthan/${dist.slug}`}
                className="hover:text-sky-400 hover:underline transition-colors font-medium text-slate-300"
              >
                {dist.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Social & Security Trust Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Contact Direct Strip */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-red-500" />
              <a href="tel:+919829088234" className="font-semibold hover:text-white">
                +91 98290 88234
              </a>
            </span>
            <span className="text-slate-700">|</span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-sky-400" />
              <a href="mailto:sales@humanbiomedical.in" className="font-semibold hover:text-white">
                sales@humanbiomedical.in
              </a>
            </span>
            <span className="text-slate-700">|</span>
            <span className="text-slate-400">
              {HEADQUARTERS_INFO.address}
            </span>
          </div>

          {/* Secure Payment & CDSCO Badges */}
          <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800">
            <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>ISO 13485:2016 Certified • CDSCO Registered • 100% On-Site Warranty Support</span>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Human Biomedical LLP. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Jaipur Head Office
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
