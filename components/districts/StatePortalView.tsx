import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/common';
import { ProductCard } from '@/components/products/ProductCard';
import { DistrictLocation, HEADQUARTERS_INFO, StateData } from '@/data/rajasthanDistricts';
import { staticProducts } from '@/data/products';
import { StateDistrictsDirectory } from './StateDistrictsDirectory';
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
  Boxes,
  Microscope,
  Droplets,
  FlaskConical,
} from 'lucide-react';

interface StatePortalViewProps {
  state: StateData & { districts: DistrictLocation[] };
}

export function StatePortalView({ state }: StatePortalViewProps) {
  const featuredProducts = staticProducts.slice(0, 6);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24 text-slate-800">
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
              India Healthcare Hubs
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-bold">{state.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider border border-red-200/60">
                <Activity className="w-3.5 h-3.5" />
                <span>
                  {state.name} State Diagnostic Supply Network • {state.hindiName} ({state.zone})
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Biomedical Equipment, Hematology Analyzers &amp; Lab Supplies in {state.name}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                {state.description} Human Biomedical LLP provides comprehensive clinical diagnostic equipment, reagents, and certified on-site engineering support across all <strong>{state.districtsCount} districts</strong> of {state.name} with same-day dispatch from our Jaipur Central Warehouse.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`https://wa.me/919829088234?text=${encodeURIComponent(
                    `Hello Human Biomedical LLP, I am looking for biomedical equipment / diagnostic reagents in ${state.name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] text-white text-xs sm:text-sm font-bold shadow-xs hover:opacity-95 transition-opacity"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp {state.name} Desk</span>
                </a>

                <a
                  href={`tel:${HEADQUARTERS_INFO.phone}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs sm:text-sm font-bold shadow-xs hover:bg-slate-50 transition-colors"
                >
                  <Phone className="w-4 h-4 text-red-600" />
                  <span>Call Technical Desk: {HEADQUARTERS_INFO.phone}</span>
                </a>
              </div>
            </div>

            {/* Quick State Summary Card */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
              <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider block">
                {state.name.toUpperCase()} COVERAGE SNAPSHOT
              </span>
              <div className="space-y-3 text-xs text-slate-800">
                <div>
                  <span className="font-bold text-slate-400 block text-[10px] uppercase">Total District Hubs</span>
                  <p className="text-lg font-extrabold text-slate-900">{state.districtsCount} Districts Covered</p>
                </div>
                <div>
                  <span className="font-bold text-slate-400 block text-[10px] uppercase">Regional Capital Hub</span>
                  <p className="font-bold text-slate-800">{state.capital}</p>
                </div>
                <div>
                  <span className="font-bold text-slate-400 block text-[10px] uppercase">Logistics Corridor</span>
                  <p className="text-emerald-700 font-bold flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Daily cold-chain dispatch from Jaipur Central Hub</span>
                  </p>
                </div>
                <div>
                  <span className="font-bold text-slate-400 block text-[10px] uppercase">On-Site Engineering</span>
                  <p className="text-slate-600 text-[11px]">Certified engineers for installation, AMC, and NABL calibration</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4 Core Pillars */}
      <Container size="2xl" className="mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-3">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-sm text-slate-900">Jaipur Central HQ Dispatch</h3>
            <p className="text-xs text-slate-500 mt-1">Temperature-controlled packaging from Tagor Nagar, 200 Feet Bypass Rd, Jaipur.</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-sm text-slate-900">24-48h Express Delivery</h3>
            <p className="text-xs text-slate-500 mt-1">Direct air &amp; surface courier transport covering all {state.districtsCount} districts of {state.name}.</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-sm text-slate-900">Certified Diagnostics</h3>
            <p className="text-xs text-slate-500 mt-1">ISO 13485:2016, CE marked analyzers, CDSCO compliant clinical reagent kits.</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-sm text-slate-900">Biomedical Engineer Desk</h3>
            <p className="text-xs text-slate-500 mt-1">Factory-trained engineers for on-site commissioning, user training, and AMC support.</p>
          </div>
        </div>

        {/* State Districts Interactive Directory */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider block">
                {state.name.toUpperCase()} DISTRICT NETWORK
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Select Your District in {state.name} ({state.districtsCount} Hubs)
              </h2>
            </div>
          </div>

          <StateDistrictsDirectory districts={state.districts} stateName={state.name} />
        </div>

        {/* Specialized Diagnostic Categories for the State */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider block">
                CLINICAL SPECIALTIES
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Pathology &amp; Biomedical Categories in {state.name}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/shop?category=hematology"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-red-500 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-3">
                  <Droplets className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-base text-slate-900 group-hover:text-red-600 transition-colors">
                  Hematology Analyzers
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  3-Part &amp; 5-Part automated cell counters, CBC lyse, diluents, and cleaning reagents.
                </p>
              </div>
              <span className="text-xs font-bold text-red-600 mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Explore Hematology →
              </span>
            </Link>

            <Link
              href="/shop?category=biochemistry"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-red-500 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-base text-slate-900 group-hover:text-red-600 transition-colors">
                  Biochemistry Analyzers
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Semi-automated &amp; fully automated clinical chemistry systems and diagnostic reagent kits.
                </p>
              </div>
              <span className="text-xs font-bold text-red-600 mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Explore Biochemistry →
              </span>
            </Link>

            <Link
              href="/shop?category=microscopes-centrifuges"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-red-500 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                  <Microscope className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-base text-slate-900 group-hover:text-red-600 transition-colors">
                  Microscopes &amp; Centrifuges
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Trinocular LED clinical microscopes, digital centrifuges, vortex mixers, and autoclaves.
                </p>
              </div>
              <span className="text-xs font-bold text-red-600 mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Explore Instruments →
              </span>
            </Link>

            <Link
              href="/offers#combos"
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-red-500 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
                  <Boxes className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-base text-slate-900 group-hover:text-red-600 transition-colors">
                  Pathology Setup Bundles
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Complete turnkey startup packages for new clinical laboratories with installation &amp; training.
                </p>
              </div>
              <span className="text-xs font-bold text-red-600 mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                View Turnkey Packages →
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
                Recommended Equipment for Labs in {state.name}
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

        {/* Central Headquarters & Consultation Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
              CENTRAL WAREHOUSE &amp; LOGISTICS DESK
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Direct Supply &amp; Technical Support for Healthcare Chains in {state.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              All shipments to {state.name} originate under strict temperature compliance from our Corporate Central Hub at{' '}
              <strong className="text-white">
                F-4, 1st Floor, Plot No. 16, D-Block Tagor Nagar, on Ajmer-Delhi, 200 Feet Bypass Rd, Jaipur, Rajasthan 302021.
              </strong>{' '}
              Contact our senior biomedical engineers today for institution rates, tenders, or demonstration requests.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/contact"
                className="px-5 py-3 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-colors shadow-xs"
              >
                Request Quotation for {state.name}
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
