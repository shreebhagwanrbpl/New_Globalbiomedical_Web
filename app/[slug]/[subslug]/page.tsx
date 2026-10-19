import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Container } from '@/components/common';
import { ProductCard } from '@/components/products/ProductCard';
import {
  ALL_DISTRICTS,
  getDistrictBySlug,
  getStateBySlug,
  HEADQUARTERS_INFO,
} from '@/data/rajasthanDistricts';
import { getCategoryBySlug, staticCategories } from '@/data/categories';
import { staticProducts } from '@/data/products';
import { DistrictPageView } from '@/components/districts/DistrictPageView';
import { constructMetadata, generateLocalBusinessSchema } from '@/utils/seo';
import {
  MapPin,
  Phone,
  MessageCircle,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Activity,
  ArrowRight,
  Boxes,
} from 'lucide-react';

interface NestedSlugPageProps {
  params: {
    slug: string;
    subslug: string;
  };
}

export const dynamicParams = true;

export function generateStaticParams() {
  const params: { slug: string; subslug: string }[] = [];
  // Pre-generate top state + district combinations
  const majorStates = ['bihar', 'uttar-pradesh', 'maharashtra', 'gujarat', 'delhi', 'madhya-pradesh'];
  majorStates.forEach((st) => {
    const sData = getStateBySlug(st);
    if (sData) {
      sData.districts.slice(0, 10).forEach((d) => {
        params.push({ slug: st, subslug: d.slug });
      });
    }
  });
  return params;
}

export function generateMetadata({ params }: NestedSlugPageProps): Metadata {
  const slug = params.slug?.toLowerCase()?.trim();
  const subslug = params.subslug?.toLowerCase()?.trim();

  // 1. Check if subslug is a district (e.g. /bihar/patna)
  const district = getDistrictBySlug(subslug);
  if (district) {
    return constructMetadata({
      title: district.seoTitle,
      description: district.seoDescription,
      url: `https://humanbiomedical.in/${slug}/${district.slug}`,
      keywords: district.seoKeywords,
      district: district,
    });
  }

  // 2. Check if slug is district and subslug is category (e.g. /patna/hematology)
  const distFromSlug = getDistrictBySlug(slug);
  const category = getCategoryBySlug(subslug);
  if (distFromSlug && category) {
    const st = distFromSlug.state || 'Rajasthan';
    return constructMetadata({
      title: `${category.name} in ${distFromSlug.name}, ${st} | Human Biomedical LLP`,
      description: `Authorized supplier of ${category.name} in ${distFromSlug.name}, ${st}. Direct dispatch from Jaipur Central Warehouse with on-site biomedical engineer support.`,
      url: `https://humanbiomedical.in/${distFromSlug.slug}/${category.slug}`,
      district: distFromSlug,
      category: category.name,
    });
  }

  return {
    title: 'Diagnostic Page Not Found | Human Biomedical LLP',
  };
}

export default function NestedSlugPage({ params }: NestedSlugPageProps) {
  const slug = params.slug?.toLowerCase()?.trim();
  const subslug = params.subslug?.toLowerCase()?.trim();

  // 1. Check if subslug is a District (e.g. /bihar/patna, /uttar-pradesh/lucknow)
  const district = getDistrictBySlug(subslug);
  if (district) {
    return <DistrictPageView district={district} />;
  }

  // 2. Check if slug is a District and subslug is a Category (e.g. /nagaur/hematology, /patna/biochemistry)
  const distFromSlug = getDistrictBySlug(slug);
  const category = getCategoryBySlug(subslug);

  if (distFromSlug && category) {
    const localBusinessSchema = generateLocalBusinessSchema(distFromSlug);
    const categoryProducts = staticProducts.filter((p) => p.category === category.slug);
    const displayProducts = categoryProducts.length > 0 ? categoryProducts : staticProducts.slice(0, 6);
    const stateName = distFromSlug.state || 'Rajasthan';

    return (
      <div className="min-h-screen bg-slate-50/50 pb-24 text-slate-800">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />

        {/* Hero Section */}
        <section className="bg-gradient-to-b from-sky-50/70 via-slate-50/40 to-white border-b border-slate-200 py-10 sm:py-14">
          <Container size="2xl">
            <nav className="flex items-center gap-2 text-xs text-slate-500 mb-4 flex-wrap">
              <Link href="/" className="hover:text-red-600 transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href={`/${distFromSlug.slug}`} className="hover:text-red-600 transition-colors">
                {distFromSlug.name}
              </Link>
              <span>/</span>
              <span className="text-slate-900 font-bold">{category.name}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider border border-red-200/60">
                  <Activity className="w-3.5 h-3.5" />
                  <span>
                    {category.name} in {distFromSlug.name} • {distFromSlug.hindiName} ({stateName})
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {category.name} Supplier in {distFromSlug.name}, {stateName}
                </h1>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                  Authorized provider of certified <strong>{category.name}</strong> for clinical pathology laboratories, nursing homes, and hospitals across <strong>{distFromSlug.name}</strong>. Featuring automated analyzers, high-linearity reagents, on-site biomedical engineer calibration, and same-day dispatch from Jaipur Central Warehouse.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={`https://wa.me/919829088234?text=${encodeURIComponent(
                      `Hello Human Biomedical LLP, I am looking for ${category.name} in ${distFromSlug.name}, ${stateName}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] text-white text-xs sm:text-sm font-bold shadow-xs hover:opacity-95 transition-opacity"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Quote for {distFromSlug.name}</span>
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

              <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3 text-xs">
                <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider block">
                  SERVICE DESK &amp; DISPATCH
                </span>
                <p>
                  <strong className="text-slate-800">Local Desk: </strong>
                  {distFromSlug.centralAddress}
                </p>
                <p>
                  <strong className="text-slate-800">Timeline: </strong>
                  <span className="text-emerald-700 font-bold">{distFromSlug.deliveryTimeline}</span>
                </p>
                <p>
                  <strong className="text-slate-800">Central Hub: </strong>
                  Jaipur Headquarters (Tagor Nagar, 200 Feet Bypass Rd)
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Product Grid */}
        <Container size="2xl" className="mt-10">
          <div className="mb-14">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200">
              <div>
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider block">
                  PRODUCTS IN {distFromSlug.name.toUpperCase()}
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Available {category.name} Models &amp; Reagents
                </h2>
              </div>
              <Link href="/shop" className="text-xs font-bold text-red-600 hover:underline">
                View All Catalog →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // 3. Otherwise 404
  notFound();
}
