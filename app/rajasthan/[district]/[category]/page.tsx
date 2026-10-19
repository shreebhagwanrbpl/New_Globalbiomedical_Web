import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Container, Button, Badge } from '@/components/common';
import { ProductCard } from '@/components/products/ProductCard';
import { RAJASTHAN_DISTRICTS, ALL_DISTRICTS, getDistrictBySlug, HEADQUARTERS_INFO } from '@/data/rajasthanDistricts';
import { staticProducts, getProductsByCategory } from '@/data/products';
import { getCategoryBySlug, staticCategories } from '@/data/categories';
import { constructMetadata, generateLocalBusinessSchema } from '@/utils/seo';
import {
  MapPin,
  Phone,
  MessageCircle,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Activity,
  ArrowRight,
  Star,
  Award,
} from 'lucide-react';

interface DistrictCategoryPageProps {
  params: {
    district: string;
    category: string;
  };
}

export const dynamicParams = true;

export function generateStaticParams() {
  const params: { district: string; category: string }[] = [];
  ALL_DISTRICTS.slice(0, 60).forEach((d) => {
    staticCategories.forEach((c) => {
      params.push({
        district: d.slug,
        category: c.slug,
      });
    });
  });
  return params;
}

export function generateMetadata({ params }: DistrictCategoryPageProps): Metadata {
  const district = getDistrictBySlug(params.district);
  const category = getCategoryBySlug(params.category);

  if (!district || !category) {
    return {
      title: 'Page Not Found | Human Biomedical LLP',
    };
  }

  const categoryDisplayName = category.name;

  return constructMetadata({
    title: `${categoryDisplayName} in ${district.name}, Rajasthan | Human Biomedical LLP`,
    description: `Leading supplier of ${categoryDisplayName} in ${district.name}, Rajasthan. 3-Part & 5-Part Cell Counters, Reagents, On-Site Calibration & Biomedical Engineer support in ${district.name}. Contact Human Biomedical LLP.`,
    url: `https://humanbiomedical.in/rajasthan/${district.slug}/${category.slug}`,
    keywords: [
      `${category.name} in ${district.name}`,
      `Hematology in ${district.name}`,
      `Hematology analyzer ${district.name}`,
      `Biomedical equipment ${district.name}`,
      `CBC machine ${district.name}`,
      ...district.seoKeywords,
    ],
    district: district,
    category: categoryDisplayName,
  });
}

export default function DistrictCategoryPage({ params }: DistrictCategoryPageProps) {
  const district = getDistrictBySlug(params.district);
  const category = getCategoryBySlug(params.category);

  if (!district || !category) {
    notFound();
  }

  const localBusinessSchema = generateLocalBusinessSchema(district);

  // Products belonging to this category
  const categoryProducts = staticProducts.filter((p) => p.category === category.slug);
  const displayProducts = categoryProducts.length > 0 ? categoryProducts : staticProducts.slice(0, 6);

  return (
    <div className="min-h-screen bg-spice-ivory pb-24">
      {/* Structured Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-spice-sand/50 via-spice-sand/20 to-spice-ivory border-b border-spice-border py-12 sm:py-16">
        <Container size="2xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-spice-taupe mb-4">
            <Link href="/" className="hover:text-spice-terracotta">
              Home
            </Link>
            <span>/</span>
            <Link href="/rajasthan" className="hover:text-spice-terracotta">
              Rajasthan Hubs
            </Link>
            <span>/</span>
            <Link href={`/rajasthan/${district.slug}`} className="hover:text-spice-terracotta">
              {district.name}
            </Link>
            <span>/</span>
            <span className="text-spice-espresso font-semibold">{category.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-spice-terracotta-50 text-spice-terracotta text-xs font-bold uppercase tracking-wider border border-spice-terracotta/25">
                <Activity className="w-3.5 h-3.5" />
                <span>
                  {category.name} in {district.name} • {district.hindiName}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-spice-espresso tracking-tight leading-tight">
                {category.name} Supplier in {district.name}, Rajasthan
              </h1>

              <p className="text-sm sm:text-base text-spice-taupe leading-relaxed max-w-2xl">
                Authorized provider of certified <strong>{category.name}</strong> for clinical diagnostic laboratories, community health centers, and hospitals across <strong>{district.name}</strong>. Featuring automated cell counters, high-linearity reagents, on-site biomedical engineer calibration, and same-day dispatch from our Jaipur Central Warehouse.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={`https://wa.me/919829088234?text=${encodeURIComponent(
                    `Hello Human Biomedical LLP, I am looking for ${category.name} in ${district.name}, Rajasthan.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] text-white text-xs sm:text-sm font-bold shadow-warm-xs hover:opacity-95 transition-opacity"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Get WhatsApp Quote for {district.name}</span>
                </a>

                <a
                  href={`tel:${HEADQUARTERS_INFO.phone}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-spice-border text-spice-espresso text-xs sm:text-sm font-bold shadow-warm-xs hover:bg-spice-sand/50 transition-colors"
                >
                  <Phone className="w-4 h-4 text-spice-terracotta" />
                  <span>Call {HEADQUARTERS_INFO.phone}</span>
                </a>
              </div>
            </div>

            {/* Quick District Local Location Card */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-spice-border p-6 shadow-warm-sm space-y-4">
              <span className="text-[11px] font-bold text-spice-terracotta uppercase tracking-wider block">
                {district.name.toUpperCase()} SUPPLY DESK
              </span>
              <div className="space-y-3 text-xs text-spice-espresso">
                <div>
                  <span className="font-bold text-spice-taupe block text-[10px] uppercase">Central Address</span>
                  <p className="font-semibold">{district.centralAddress}</p>
                </div>
                <div>
                  <span className="font-bold text-spice-taupe block text-[10px] uppercase">Service Timeline</span>
                  <p className="text-spice-cardamom font-bold flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5" />
                    <span>{district.deliveryTimeline}</span>
                  </p>
                </div>
                <div>
                  <span className="font-bold text-spice-taupe block text-[10px] uppercase">Coverage</span>
                  <p className="text-spice-taupe text-[11px]">{district.coverageAreas.slice(0, 5).join(', ')}</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content & Products */}
      <Container size="2xl" className="mt-12">
        {/* Products Grid */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-spice-border">
            <div>
              <span className="text-xs font-bold text-spice-terracotta uppercase tracking-wider block">
                AVAILABLE FOR {district.name.toUpperCase()} LABORATORIES
              </span>
              <h2 className="text-2xl font-serif font-bold text-spice-espresso">
                {category.name} Catalog
              </h2>
            </div>
            <span className="text-xs text-spice-taupe">
              Showing {displayProducts.length} items with immediate dispatch
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* District Specific Service Commitment */}
        <div className="bg-white rounded-3xl border border-spice-border p-6 sm:p-8 shadow-warm-xs mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold text-spice-terracotta uppercase tracking-wider">
                WHY CHOOSE HUMAN BIOMEDICAL IN {district.name.toUpperCase()}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-spice-espresso">
                Certified Installation &amp; Rapid Reagent Delivery
              </h2>
              <div className="space-y-3 text-xs sm:text-sm text-spice-taupe leading-relaxed">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-spice-cardamom shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-spice-espresso">On-Site Biomedical Engineer in {district.name}: </strong>
                    Our factory-certified engineers handle unboxing, precision electrical grounding check, calibration, and hands-on technician training at your facility.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-spice-cardamom shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-spice-espresso">NABL Audit Compliance: </strong>
                    All instruments and control calibrators are supplied with traceability certificates, IQ/OQ/PQ validation logs, and Levey-Jennings quality control software.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-spice-cardamom shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-spice-espresso">Central Warehouse Dispatch: </strong>
                    Dispatched from our Jaipur Central Warehouse at <strong>F-4, 1st Floor, Plot No. 16, D-Block Tagor Nagar, 200 Feet Bypass Rd, Jaipur, Rajasthan 302021</strong> directly to your lab door in {district.name}.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="px-4 py-2.5 rounded-xl bg-spice-terracotta text-white text-xs font-bold shadow-warm-xs hover:bg-spice-terracotta-600 transition-colors"
                >
                  Book Demo in {district.name}
                </Link>
                <Link
                  href={`/rajasthan/${district.slug}`}
                  className="px-4 py-2.5 rounded-xl bg-spice-sand/50 text-spice-espresso border border-spice-border text-xs font-bold hover:bg-spice-sand transition-colors"
                >
                  View All Equipment in {district.name} →
                </Link>
              </div>
            </div>

            {/* Map Preview */}
            <div className="lg:col-span-5">
              <div className="w-full h-64 rounded-2xl overflow-hidden border border-spice-border shadow-warm-sm bg-spice-ivory relative">
                <iframe
                  title={`${district.name} Service Map`}
                  src={district.googleMapsEmbedUrl}
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

        {/* Doctor Testimonial for District */}
        <div className="bg-spice-sand/40 rounded-3xl border border-spice-border p-6 sm:p-8 text-center max-w-3xl mx-auto space-y-3">
          <div className="flex justify-center gap-1 text-spice-turmeric">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <p className="font-serif italic text-sm sm:text-base text-spice-espresso leading-relaxed">
            "Human Biomedical LLP has transformed diagnostic equipment reliability in {district.name}. The Hematology and Biochemistry results have perfect correlation with NABL standards and their technical support responds swiftly."
          </p>
          <div className="text-xs font-semibold text-spice-taupe">
            — Verified Diagnostic Pathology Review ({district.name}, Rajasthan)
          </div>
        </div>
      </Container>
    </div>
  );
}
