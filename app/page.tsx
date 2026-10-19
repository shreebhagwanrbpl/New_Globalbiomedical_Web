'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container, Card, Badge, Button } from '@/components/common';
import { cn } from '@/utils/cn';
import {
  ScrollReveal,
  FadeIn,
  SlideUp,
  StaggerContainer,
  StaggerItem,
  WordReveal,
  HoverLift,
  ScaleOnHover,
  WishlistButton,
  AddToCartButton,
  DiscountBadge,
  Parallax,
  LUXURY_EASE,
} from '@/components/animations/Motion';
import { useStore } from '@/context/StoreContext';
import { formatCurrency } from '@/utils/currency';
import { ProductCard } from '@/components/products/ProductCard';
import { FlashSaleSection } from '@/components/offers/FlashSaleSection';
import { staticProducts, getBestSellerProducts, getNewArrivalProducts } from '@/data/products';
import { staticCategories } from '@/data/categories';
import { staticCombos } from '@/data/combos';
import { staticCustomerReviews } from '@/data/reviews';
import { RAJASTHAN_DISTRICTS, HEADQUARTERS_INFO } from '@/data/rajasthanDistricts';
import { homepageHeroData, trustPillars, regionalFlavoursData } from '@/data/homepage';
import { ReviewsCarousel } from '@/components/home/ReviewsCarousel';
import { ProductHeroBanner } from '@/components/home/ProductHeroBanner';
import {
  Sparkles,
  ShieldCheck,
  Award,
  ArrowRight,
  Star,
  Clock,
  Globe2,
  CheckCircle2,
  Package,
  Heart,
  Truck,
  Layers,
  MapPin,
  Tag,
  Phone,
  MessageCircle,
  Activity,
  FileText,
  Droplets,
  FlaskConical,
  Microscope,
  RotateCw,
  Building2,
  Boxes,
} from 'lucide-react';

export default function HomePage() {
  const { addToCart } = useStore();
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<string>('all');
  // Products (1 single line of 4 items per section)
  const bestSellers = staticProducts.filter((p) => p.bestSeller).slice(0, 4);
  const newArrivals = staticProducts.filter((p) => p.newArrival).slice(0, 4);
  const todaysDeals = staticProducts.filter((p) => p.discountPercentage && p.discountPercentage >= 20).slice(0, 4);

  // Filtered products for tabbed explorer
  const filteredProducts =
    selectedCategoryTab === 'all'
      ? staticProducts.slice(0, 8)
      : staticProducts.filter((p) => p.category === selectedCategoryTab).slice(0, 8);

  return (
    <div className="space-y-0 overflow-hidden bg-white text-slate-800">
      {/* =========================================================================
          1. PRODUCT HERO BANNER (ERBA H360, TRANSASIA CHEM 5X, ERBA EC90)
      ========================================================================= */}
      <ProductHeroBanner />

      {/* =========================================================================
          INTERACTIVE 6-CATEGORY QUICK EXPLORER BAR (HIGHLIGHTED WITH LARGE ICONS)
      ========================================================================= */}
      <section className="py-7 bg-white border-b border-slate-200">
        <Container size="2xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {[
              {
                icon: Droplets,
                iconBg: 'from-red-500 to-rose-600 shadow-red-500/25',
                badgeBg: 'bg-red-50 text-red-600 border-red-200/80',
                title: 'Hematology Analyzers',
                desc: '3-Part & 5-Part Laser',
                href: '/category/hematology',
                badge: 'Popular',
              },
              {
                icon: FlaskConical,
                iconBg: 'from-emerald-500 to-teal-600 shadow-emerald-500/25',
                badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
                title: 'Biochemistry Systems',
                desc: 'Semi & Fully Auto',
                href: '/category/biochemistry',
                badge: 'Clinical',
              },
              {
                icon: Microscope,
                iconBg: 'from-blue-500 to-indigo-600 shadow-blue-500/25',
                badgeBg: 'bg-blue-50 text-blue-700 border-blue-200/80',
                title: 'Medical Microscopes',
                desc: 'Trinocular & LED',
                href: '/category/microscopes-centrifuges',
                badge: 'Pathology',
              },
              {
                icon: RotateCw,
                iconBg: 'from-purple-500 to-violet-600 shadow-purple-500/25',
                badgeBg: 'bg-purple-50 text-purple-700 border-purple-200/80',
                title: 'Digital Centrifuges',
                desc: 'Clinical & Blood Bank',
                href: '/category/microscopes-centrifuges',
                badge: 'High Speed',
              },
              {
                icon: Building2,
                iconBg: 'from-amber-500 to-orange-600 shadow-amber-500/25',
                badgeBg: 'bg-amber-50 text-amber-700 border-amber-200/80',
                title: 'Turnkey Lab Packages',
                desc: 'Complete Pathology Setup',
                href: '/offers#combos',
                badge: 'Savings',
              },
              {
                icon: Boxes,
                iconBg: 'from-sky-500 to-cyan-600 shadow-sky-500/25',
                badgeBg: 'bg-sky-50 text-sky-700 border-sky-200/80',
                title: 'Diagnostic Reagents',
                desc: 'Diluent, Lyse & Cards',
                href: '/category/reagents-consumables',
                badge: 'Cold Chain',
              },
            ].map((cat) => {
              const IconComponent = cat.icon;
              return (
                <Link
                  key={cat.title}
                  href={cat.href}
                  className="group p-4 rounded-2xl border-2 border-slate-100 hover:border-red-500/80 bg-white hover:bg-slate-50/50 shadow-xs hover:shadow-xl hover:shadow-red-500/10 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Large Glowing Medical Icon + Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.iconBg} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-6 h-6 shrink-0" />
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shadow-2xs ${cat.badgeBg}`}>
                        {cat.badge}
                      </span>
                    </div>

                    {/* Title & Clinical Description */}
                    <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 group-hover:text-red-600 transition-colors leading-snug">
                      {cat.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-1 font-medium">
                      {cat.desc}
                    </p>
                  </div>

                  {/* Explore Link with Animated Arrow */}
                  <div className="pt-2.5 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-red-600 group-hover:text-red-700">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>



      {/* =========================================================================
          4. FEATURED DIAGNOSTIC DEALS
      ========================================================================= */}
      <section className="py-12 sm:py-16 bg-slate-50/60 border-b border-slate-200">
        <Container size="2xl">
          <ScrollReveal once={true}>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 border border-red-200/60 text-xs font-bold uppercase tracking-wider mb-2">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Verified Diagnostic Savings</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Featured Diagnostic Equipment &amp; Reagents
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Institutional pricing on high-throughput analyzers and laboratory consumable packs.
                </p>
              </div>

              <Link
                href="/offers"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-red-600 hover:text-red-700 transition-colors group"
              >
                <span>View All Offers</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Product Grid - Exactly 1 Row of 4 Products */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch">
            {todaysDeals.map((product, idx) => (
              <ScrollReveal key={product.id} delay={idx * 0.05} once={true} className="h-full">
                <ProductCard product={product} showFlavourNote={false} className="h-full" />
              </ScrollReveal>
            ))}
          </div>

          {/* View All Button */}
          <div className="mt-8 text-center">
            <Link
              href="/offers"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-slate-300 hover:border-red-600 bg-white hover:bg-red-50/50 text-slate-800 hover:text-red-600 text-xs sm:text-sm font-bold shadow-xs transition-all"
            >
              <span>View All Diagnostic Deals &amp; Reagents</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          5. FLASH SALE (With Countdown)
      ========================================================================= */}
      <FlashSaleSection />

      {/* =========================================================================
          6. SHOP BY CATEGORY
      ========================================================================= */}
      <section className="py-14 sm:py-20 bg-white border-b border-spice-border">
        <Container size="2xl">
          <ScrollReveal once={true}>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold text-spice-cardamom uppercase tracking-wider">
                COMPREHENSIVE PRODUCT LINE
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-spice-espresso tracking-tight mt-1 mb-2">
                Biomedical Equipment &amp; Reagent Categories
              </h2>
              <p className="text-sm sm:text-base text-spice-taupe">
                From high-precision automated cell counters to NABL liquid-stable biochemistry reagents.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch">
            {staticCategories.slice(0, 4).map((cat, idx) => (
              <ScrollReveal key={cat.id} delay={idx * 0.04} once={true} className="h-full">
                <Link
                  href={`/category/${cat.slug}`}
                  className="group relative flex flex-col justify-between h-full bg-spice-sand/30 hover:bg-white rounded-2xl border border-spice-border hover:border-spice-terracotta/40 p-4 transition-all duration-300 shadow-warm-xs hover:shadow-warm-md"
                >
                  <div>
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-spice-sand/40 mb-3 relative">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                        <span className="text-xs font-bold text-white flex items-center gap-1">
                          View Products <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>

                    <h3 className="font-serif font-bold text-sm sm:text-base text-spice-espresso group-hover:text-spice-terracotta transition-colors line-clamp-1">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-spice-taupe line-clamp-2 mt-1 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {/* View All Categories Button */}
          <div className="mt-8 text-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-slate-300 hover:border-red-600 bg-white hover:bg-red-50/50 text-slate-800 hover:text-red-600 text-xs sm:text-sm font-bold shadow-xs transition-all"
            >
              <span>View All Equipment Categories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          7. BEST SELLERS
      ========================================================================= */}
      <section className="py-12 sm:py-16 bg-slate-50/60 border-b border-slate-200">
        <Container size="2xl">
          <ScrollReveal once={true}>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                  CLINICALLY PROVEN ACCURACY
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                  Top-Selling Laboratory Equipment
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Trusted by leading pathology laboratories and hospitals across Rajasthan and all Indian states.
                </p>
              </div>

              <Link
                href="/shop?sort=popular"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-red-600 hover:text-red-700 transition-colors group"
              >
                <span>View Full Catalog</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Product Cards - Exactly 1 Row of 4 Products */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch">
            {bestSellers.map((product, idx) => (
              <ScrollReveal key={product.id} delay={idx * 0.05} once={true} className="h-full">
                <ProductCard product={product} className="h-full" />
              </ScrollReveal>
            ))}
          </div>

          {/* View Full Catalog Button */}
          <div className="mt-8 text-center">
            <Link
              href="/shop?sort=popular"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-slate-300 hover:border-red-600 bg-white hover:bg-red-50/50 text-slate-800 hover:text-red-600 text-xs sm:text-sm font-bold shadow-xs transition-all"
            >
              <span>View Full Equipment Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          8. TURNKEY PATHOLOGY LAB SETUP BUNDLES (Combos)
      ========================================================================= */}
      <section className="py-16 sm:py-24 bg-white border-y border-spice-border">
        <Container size="2xl">
          <ScrollReveal once={true}>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold text-spice-terracotta uppercase tracking-wider">
                COMPLETE LAB SETUP SOLUTIONS
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-spice-espresso tracking-tight mt-1 mb-2">
                Turnkey Pathology Lab Packages
              </h2>
              <p className="text-sm sm:text-base text-spice-taupe">
                Comprehensive instrumentation bundles with free installation, staff training, and NABL documentation.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {staticCombos.slice(0, 3).map((combo, idx) => (
              <ScrollReveal key={combo.id} delay={idx * 0.1} once={true} className="h-full">
                <div className="bg-white rounded-3xl border border-spice-border hover:border-spice-terracotta/40 overflow-hidden shadow-warm-sm hover:shadow-warm-xl transition-all duration-300 flex flex-col justify-between h-full group">
                  <div>
                    {/* Visual Container */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-spice-sand/40">
                      <span className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-spice-terracotta text-white text-xs font-bold shadow-warm-xs">
                        {combo.badge}
                      </span>
                      <img
                        src={combo.image}
                        alt={combo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6">
                      <div className="text-xs font-bold text-spice-cardamom mb-1 uppercase tracking-wider">
                        {combo.itemCount} Instruments Included
                      </div>
                      <h3 className="font-serif font-bold text-xl text-spice-espresso mb-1">
                        {combo.title}
                      </h3>
                      <p className="text-xs text-spice-taupe italic mb-3">
                        {combo.tagline}
                      </p>
                      <p className="text-xs text-spice-taupe leading-relaxed mb-4 line-clamp-2">
                        {combo.description}
                      </p>

                      {/* Items checklist */}
                      <div className="bg-spice-sand/30 rounded-xl p-3 mb-4 space-y-1.5">
                        <span className="text-[11px] font-bold text-spice-espresso block">
                          Included in this package:
                        </span>
                        <div className="grid grid-cols-1 gap-1 text-[11px] text-spice-taupe">
                          {combo.itemsIncluded.slice(0, 4).map((item, i) => (
                            <div key={i} className="flex items-center gap-1.5 truncate">
                              <span className="w-1.5 h-1.5 rounded-full bg-spice-terracotta shrink-0" />
                              <span className="truncate">{item.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-3 border-t border-spice-border/60 flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-spice-espresso">
                          {formatCurrency(combo.price)}
                        </span>
                        <span className="text-xs text-spice-taupe line-through">
                          {formatCurrency(combo.mrp)}
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-spice-cardamom">
                        Save {formatCurrency(combo.savings)}
                      </span>
                    </div>

                    <a
                      href={`https://wa.me/919829088234?text=${encodeURIComponent(
                        `Hello, I want to inquire about the ${combo.title} (Price: ${formatCurrency(combo.price)}).`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-spice-terracotta text-white text-xs font-bold hover:bg-spice-terracotta-600 transition-colors shadow-warm-xs"
                    >
                      Inquire Bundle
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/offers#combos">
              <Button variant="secondary" size="lg" showArrow>
                View All Turnkey Laboratory Setup Packages
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          9. RAJASTHAN DISTRICT SUPPLY HUBS (Nagaur, Jaipur, Jodhpur, Kota, etc.)
      ========================================================================= */}
      <section className="py-16 sm:py-24 bg-spice-ivory">
        <Container size="2xl">
          <ScrollReveal once={true}>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold text-spice-cardamom uppercase tracking-wider">
                LOCAL HEALTHCARE DISTRIBUTION NETWORK
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-spice-espresso tracking-tight mt-1 mb-2">
                Rajasthan District Supply Hubs
              </h2>
              <p className="text-sm sm:text-base text-spice-taupe">
                Daily dispatch and certified biomedical engineers stationed across Rajasthan. Select your district for localized supply information.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch">
            {regionalFlavoursData.slice(0, 4).map((region, idx) => (
              <ScrollReveal key={region.id} delay={idx * 0.08} once={true} className="h-full">
                <div className="group relative rounded-2xl border border-spice-border hover:border-spice-terracotta/40 bg-white overflow-hidden p-5 transition-all duration-300 shadow-warm-xs hover:shadow-warm-md flex flex-col justify-between h-full">
                  <div>
                    <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-4 bg-spice-sand/40">
                      <img
                        src={region.image}
                        alt={region.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-slate-900/90 text-white text-[11px] font-bold">
                        {region.name}
                      </div>
                    </div>

                    <div className="text-xs font-bold text-spice-terracotta mb-1">
                      {region.tagline}
                    </div>
                    <h3 className="font-serif font-bold text-lg text-spice-espresso mb-1">
                      {region.signatureFlavour}
                    </h3>
                    <p className="text-xs text-spice-taupe leading-relaxed line-clamp-2 mb-3">
                      {region.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-spice-border/60 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-spice-taupe">
                      {region.keySpices.split(',')[0]}
                    </span>
                    <Link
                      href={`/rajasthan/${region.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-spice-terracotta group-hover:translate-x-0.5 transition-transform"
                    >
                      Visit {region.name} Hub <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/rajasthan">
              <Button variant="outline" size="md" showArrow>
                View Directory of All 50 Rajasthan Districts
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          10. DOCTORS & PATHOLOGISTS TESTIMONIALS CAROUSEL (Right to Left)
      ========================================================================= */}
      <ReviewsCarousel />

      {/* =========================================================================
          11. CENTRAL JAIPUR HEADQUARTERS MAP & CONTACT BANNER
      ========================================================================= */}
      <section className="py-14 sm:py-20 bg-spice-espresso text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F3EBDD_1px,transparent_1px)] [background-size:16px_16px]" />
        <Container size="2xl" className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <span className="text-xs font-bold text-spice-sand uppercase tracking-wider">
                CENTRAL DEMONSTRATION CENTER &amp; WAREHOUSE
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-white">
                Human Biomedical LLP — Corporate Headquarters
              </h2>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                <strong>Address: </strong>F-4, 1st Floor, Plot No. 16, D-Block Tagor Nagar, on Ajmer-Delhi, 200 Feet Bypass Rd, Jaipur, Rajasthan 302021
              </p>
              <div className="flex flex-wrap gap-4 pt-2 text-xs text-white/90">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-spice-sand" />
                  <span>Helpline: +91 98290 88234</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-spice-sand" />
                  <span>ISO 13485:2016 Certified</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="w-full">
                <Button variant="primary" size="md" className="w-full shadow-terracotta-glow">
                  Contact Head Office &amp; Map
                </Button>
              </Link>
              <Link href="/rajasthan/nagaur" className="w-full">
                <Button variant="secondary" size="md" className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20">
                  Nagaur District Hub
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
