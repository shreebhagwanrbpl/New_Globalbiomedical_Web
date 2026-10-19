import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/common';
import { ProductCard } from '@/components/products/ProductCard';
import { DistrictLocation, HEADQUARTERS_INFO } from '@/data/rajasthanDistricts';
import { staticProducts } from '@/data/products';
import { generateLocalBusinessSchema } from '@/utils/seo';
import {
  MapPin,
  Phone,
  MessageCircle,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Activity,
  ArrowRight,
  Award,
  Building2,
  Sparkles,
} from 'lucide-react';

interface DistrictPageViewProps {
  district: DistrictLocation;
}

export function DistrictPageView({ district }: DistrictPageViewProps) {
  const localBusinessSchema = generateLocalBusinessSchema(district);
  const featuredProducts = staticProducts.slice(0, 6);
  const stateName = district.state || 'Rajasthan';

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24 text-slate-800">
      {/* Structured Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-sky-50/70 via-slate-50/40 to-white border-b border-slate-200 py-10 sm:py-14">
        <Container size="2xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-4 flex-wrap">
            <Link href="/" className="hover:text-red-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/rajasthan" className="hover:text-red-600 transition-colors">
              India Hubs
            </Link>
            <span>/</span>
            <Link
              href={`/${stateName.toLowerCase().replace(/\s+/g, '-')}`}
              className="hover:text-red-600 transition-colors"
            >
              {stateName}
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-bold">{district.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider border border-red-200/60">
                <Activity className="w-3.5 h-3.5" />
                <span>
                  {district.name} District Service Hub • {district.hindiName} ({stateName})
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Biomedical Equipment, Hematology Analyzers &amp; Lab Supplies in {district.name}, {stateName}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                Human Biomedical LLP is the authorized diagnostic equipment supplier serving clinical pathology laboratories, nursing homes, and hospital chains across <strong>{district.name}</strong> ({stateName}). Guaranteed direct dispatch from our Jaipur Central Warehouse with certified on-site biomedical engineer installation and cold-chain reagent logistics.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`https://wa.me/919829088234?text=${encodeURIComponent(
                    `Hello Human Biomedical LLP, I am looking for biomedical equipment / Hematology analyzers in ${district.name}, ${stateName}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] text-white text-xs sm:text-sm font-bold shadow-xs hover:opacity-95 transition-opacity"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Quote for {district.name}</span>
                </a>

                <a
                  href={`tel:${HEADQUARTERS_INFO.phone}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs sm:text-sm font-bold shadow-xs hover:bg-slate-50 transition-colors"
                >
                  <Phone className="w-4 h-4 text-red-600" />
                  <span>Call Engineer Desk: {HEADQUARTERS_INFO.phone}</span>
                </a>
              </div>
            </div>

            {/* Quick Central Stats Card */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
              <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider block">
                {district.name} HUB OVERVIEW
              </span>
              <div className="space-y-3 text-xs text-slate-800">
                <div>
                  <span className="font-bold text-slate-400 block text-[10px] uppercase">Central Service Location</span>
                  <p className="font-semibold text-slate-800">{district.centralAddress}</p>
                </div>
                <div>
                  <span className="font-bold text-slate-400 block text-[10px] uppercase">Delivery Timeline</span>
                  <p className="text-emerald-700 font-bold flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{district.deliveryTimeline}</span>
                  </p>
                </div>
                <div>
                  <span className="font-bold text-slate-400 block text-[10px] uppercase">Major Healthcare Clients</span>
                  <p className="text-slate-600 text-[11px]">{district.majorInstitutes.join(', ')}</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Central Location and Map Section */}
      <Container size="2xl" className="mt-10">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                {district.name.toUpperCase()} CENTRAL LOCATION &amp; SERVICE RADIUS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Serving All Healthcare Facilities in {district.name}
              </h2>
              <div className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <p>
                  <strong className="text-slate-800">Central Hub Address: </strong>
                  {district.centralAddress}
                </p>
                <p>
                  <strong className="text-slate-800">Landmark: </strong>
                  {district.landmark}
                </p>
                <p>
                  <strong className="text-slate-800">PIN Code: </strong>
                  {district.pincode}
                </p>
                <p className="pt-2 text-xs text-emerald-700 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Coverage Areas: {district.coverageAreas.join(' • ')}</span>
                </p>
              </div>

              <div className="pt-2 text-xs text-slate-500">
                <p>
                  <strong className="text-slate-700">Jaipur Central Hub Dispatch: </strong>
                  All shipments dispatch daily under temperature-controlled cold packaging from our Corporate Headquarters at{' '}
                  <span className="text-slate-900 font-semibold">
                    F-4, 1st Floor, Plot No. 16, D-Block Tagor Nagar, on Ajmer-Delhi, 200 Feet Bypass Rd, Jaipur, Rajasthan 302021.
                  </span>
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="w-full h-64 rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 relative">
                <iframe
                  title={`${district.name} Map`}
                  src={district.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                />
                <div className="absolute bottom-2 right-2 bg-white/95 px-2.5 py-1 rounded-md text-[10px] font-bold text-slate-800 border border-slate-200 shadow-xs">
                  📍 {district.name} Central Zone
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specialized Category Fast Links */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider block">
                SPECIALIZED LAB SOLUTIONS IN {district.name.toUpperCase()}
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Explore Diagnostic Equipment in {district.name}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href={`/rajasthan/${district.slug}/hematology`}
              className="p-5 rounded-2xl bg-white border-2 border-red-500/50 hover:border-red-600 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-600 text-white mb-2 inline-block">
                  #1 HIGH DEMAND
                </span>
                <h3 className="font-extrabold text-base text-slate-900 group-hover:text-red-600 transition-colors">
                  Hematology in {district.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  3-Part &amp; 5-Part Hematology Analyzers, CBC Lyse &amp; Diluent Reagents across {district.name}.
                </p>
              </div>
              <span className="text-xs font-bold text-red-600 mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Browse Hematology in {district.name} →
              </span>
            </Link>

            <Link
              href={`/rajasthan/${district.slug}/biochemistry`}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-red-500 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white mb-2 inline-block">
                  CLINICAL CHEMISTRY
                </span>
                <h3 className="font-extrabold text-base text-slate-900 group-hover:text-red-600 transition-colors">
                  Biochemistry in {district.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Semi-Auto &amp; Fully-Auto Clinical Chemistry Analyzers, LFT, KFT &amp; Lipid Reagents.
                </p>
              </div>
              <span className="text-xs font-bold text-red-600 mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Browse Biochemistry in {district.name} →
              </span>
            </Link>

            <Link
              href={`/rajasthan/${district.slug}/microscopes-centrifuges`}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-red-500 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white mb-2 inline-block">
                  LAB INSTRUMENTS
                </span>
                <h3 className="font-extrabold text-base text-slate-900 group-hover:text-red-600 transition-colors">
                  Microscopes &amp; Centrifuges
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Trinocular LED Microscopes, Digital 6000 RPM Centrifuges &amp; Autoclaves in {district.name}.
                </p>
              </div>
              <span className="text-xs font-bold text-red-600 mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Browse Instruments in {district.name} →
              </span>
            </Link>

            <Link
              href="/offers#combos"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-red-500 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-red-600 border border-red-200 mb-2 inline-block">
                  TURNKEY SAVINGS
                </span>
                <h3 className="font-extrabold text-base text-slate-900 group-hover:text-red-600 transition-colors">
                  Pathology Setup Bundles
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Complete turnkey pathology setup packages with installation &amp; NABL training in {district.name}.
                </p>
              </div>
              <span className="text-xs font-bold text-red-600 mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                View Lab Packages →
              </span>
            </Link>
          </div>
        </div>

        {/* Featured Products Grid */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider block">
                DIAGNOSTIC INSTRUMENTATION
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Available for Immediate Delivery in {district.name}
              </h2>
            </div>
            <Link href="/shop" className="text-xs font-bold text-red-600 hover:underline">
              View All Equipment →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Local District Inquiry Box */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
              {district.name.toUpperCase()} BIOMEDICAL SERVICE DESK
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Need on-site installation, calibration, or reagent dispatch in {district.name}?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Our biomedical engineering team supports clinical facilities across {district.name} ({stateName}). Get in touch with our technical desk for quotation, demo, or immediate service engineer assignment.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/contact"
                className="px-5 py-3 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-colors shadow-xs"
              >
                Request Quotation for {district.name}
              </Link>
              <a
                href={`tel:${HEADQUARTERS_INFO.phone}`}
                className="px-5 py-3 rounded-xl bg-white/10 text-white border border-white/20 text-xs font-bold hover:bg-white/20 transition-colors"
              >
                Call Engineer: {HEADQUARTERS_INFO.phone}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
