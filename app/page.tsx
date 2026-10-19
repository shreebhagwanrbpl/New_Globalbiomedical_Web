'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container, Card, Badge, Button } from '@/components/common';
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
import { staticRecipes } from '@/data/recipes';
import { staticCustomerReviews } from '@/data/reviews';
import { homepageHeroData, trustPillars, regionalFlavoursData } from '@/data/homepage';
import {
  Sparkles,
  Flame,
  ShieldCheck,
  Award,
  ArrowRight,
  Star,
  Clock,
  ChefHat,
  Globe2,
  Leaf,
  CheckCircle2,
  Package,
  Heart,
  Truck,
  Layers,
  MapPin,
  Tag,
  Gift,
  Search,
} from 'lucide-react';

export default function HomePage() {
  const { addToCart } = useStore();
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<string>('all');

  // Products
  const bestSellers = staticProducts.filter(p => p.bestSeller).slice(0, 8);
  const newArrivals = staticProducts.filter(p => p.newArrival).slice(0, 6);
  const todaysDeals = staticProducts.filter(p => p.discountPercentage && p.discountPercentage >= 20).slice(0, 6);

  // Filtered products for tabbed explorer
  const filteredProducts = selectedCategoryTab === 'all'
    ? staticProducts.slice(0, 8)
    : staticProducts.filter(p => p.category === selectedCategoryTab).slice(0, 8);

  return (
    <div className="space-y-0 overflow-hidden bg-spice-ivory">
      {/* =========================================================================
          3. FULL-WIDTH HERO SECTION (Unfolding / Roll-Down Banner with Text Overlay)
      ========================================================================= */}
      <section className="relative w-full min-h-[440px] sm:min-h-[480px] md:min-h-[520px] lg:min-h-[560px] flex items-center justify-center overflow-hidden bg-spice-espresso">
        {/* Unfolding / Roll-Down Banner Background Image */}
        <motion.div
          initial={{ clipPath: 'inset(0% 0% 100% 0%)', scale: 1.08, opacity: 0.8 }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)', scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full -z-0"
        >
          <img
            src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1920&auto=format&fit=crop&q=85"
            alt="Artisanal Indian Spices Banner"
            className="w-full h-full object-cover object-center"
          />

          {/* Luxury Multi-Layer Dark Warm Gradient Overlay for Maximum Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-spice-espresso/95 via-spice-espresso/75 to-spice-espresso/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(30,18,14,0.6)_100%)]" />
        </motion.div>

        {/* Ambient Warm Golden & Terracotta Glow */}
        <div
          className="absolute top-1/4 left-1/4 w-80 h-80 bg-spice-turmeric/20 rounded-full blur-3xl pointer-events-none -z-0"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-spice-terracotta/20 rounded-full blur-3xl pointer-events-none -z-0"
          aria-hidden="true"
        />

        {/* Centered Overlaid Hero Content */}
        <Container size="xl" className="relative z-10 py-10 sm:py-14 text-center flex flex-col items-center">
          {/* Eyebrow Badge */}
          <FadeIn delay={0.25} direction="down">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-spice-sand text-xs font-bold uppercase tracking-wider mb-4 shadow-warm-sm">
              <Leaf className="w-3.5 h-3.5 text-spice-sand animate-pulse" />
              <span>{homepageHeroData.tagline}</span>
            </div>
          </FadeIn>

          {/* Main Headline */}
          <WordReveal
            text="Pure Spices. Rich Flavours. Made for Every Kitchen."
            highlightWord="Flavours."
            highlightClass="text-amber-400 italic font-serif"
            delay={0.4}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.14] mb-4 max-w-3xl"
          />

          {/* Subtitle */}
          <FadeIn delay={0.6} direction="up">
            <p className="text-xs sm:text-sm md:text-base text-spice-sand/90 leading-relaxed max-w-xl mx-auto mb-7">
              {homepageHeroData.subheading}
            </p>
          </FadeIn>

          {/* CTA Buttons */}
          <FadeIn delay={0.8} direction="up">
            <div className="flex flex-wrap items-center justify-center gap-3.5 mb-8">
              <Link href="/shop">
                <Button variant="primary" size="md" showArrow className="shadow-terracotta-glow text-xs sm:text-sm font-bold py-3 px-7">
                  {homepageHeroData.primaryCta.text}
                </Button>
              </Link>

              <Link href="/offers">
                <Button variant="secondary" size="md" className="bg-white/15 hover:bg-white/25 text-white border-white/30 backdrop-blur-md text-xs sm:text-sm font-bold py-3 px-7">
                  {homepageHeroData.secondaryCta.text}
                </Button>
              </Link>
            </div>
          </FadeIn>

          {/* Overlaid Floating Trust & Statistics Strip */}
          <FadeIn delay={1.0} direction="up" className="w-full max-w-2xl">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 sm:p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-warm-lg">
              {homepageHeroData.heroStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <span className="font-serif font-bold text-lg sm:text-xl text-amber-300 block">
                    {stat.value}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-white/80 uppercase tracking-wider font-semibold">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* =========================================================================
          4. TRUST STRIP (Why Choose Us Pillars)
      ========================================================================= */}
      <section className="py-6 bg-white border-b border-spice-border">
        <Container size="2xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {trustPillars.map((pillar, idx) => (
              <ScrollReveal key={pillar.id} delay={idx * 0.05} once={true}>
                <div className="flex flex-col items-center text-center p-2">
                  <div className="w-10 h-10 rounded-full bg-spice-cardamom-50 flex items-center justify-center text-spice-cardamom mb-2">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold text-spice-espresso">{pillar.title}</h4>
                  <p className="text-[10px] text-spice-taupe mt-0.5">{pillar.subtitle}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          5. TODAY'S SPICE DEALS
      ========================================================================= */}
      <section className="py-14 sm:py-18 bg-spice-ivory">
        <Container size="2xl">
          <ScrollReveal once={true}>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-spice-terracotta/10 text-spice-terracotta text-xs font-bold uppercase tracking-wider mb-2">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Handpicked Savings</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-spice-espresso tracking-tight">
                  Today's Spice Deals
                </h2>
                <p className="text-sm text-spice-taupe mt-1">
                  Special prices on selected favourites. Freshly cold-ground and aroma sealed.
                </p>
              </div>

              <Link
                href="/offers"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-spice-terracotta hover:text-spice-espresso transition-colors group"
              >
                <span>View All Offers</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Product Grid (4-col Desktop / 2-col Mobile) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5 items-stretch">
            {todaysDeals.map((product, idx) => (
              <ScrollReveal key={product.id} delay={idx * 0.05} once={true} className="h-full">
                <ProductCard product={product} showFlavourNote={false} className="h-full" />
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          6. FLASH SALE (With Browser Countdown)
      ========================================================================= */}
      <FlashSaleSection />

      {/* =========================================================================
          7. SHOP BY CATEGORY
      ========================================================================= */}
      <section className="py-14 sm:py-20 bg-white border-b border-spice-border">
        <Container size="2xl">
          <ScrollReveal once={true}>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold text-spice-cardamom uppercase tracking-wider">
                EXPLORE OUR PANTRY
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-spice-espresso tracking-tight mt-1 mb-2">
                Shop by Spice Category
              </h2>
              <p className="text-sm sm:text-base text-spice-taupe">
                From unadulterated whole seeds to stone-ground regional spice blends.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5 items-stretch">
            {staticCategories.map((cat, idx) => (
              <ScrollReveal key={cat.id} delay={idx * 0.04} once={true} className="h-full">
                <Link
                  href={`/category/${cat.slug}`}
                  className="group relative flex flex-col justify-between h-full bg-spice-sand/30 hover:bg-white rounded-2xl border border-spice-border hover:border-spice-terracotta/40 p-4 transition-all duration-300 shadow-warm-xs hover:shadow-warm-md"
                >
                  <div>
                    <div className="aspect-square rounded-xl overflow-hidden bg-spice-sand/40 mb-3 relative">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-spice-espresso/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                        <span className="text-xs font-bold text-white flex items-center gap-1">
                          Explore <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>

                    <h3 className="font-serif font-bold text-sm sm:text-base text-spice-espresso group-hover:text-spice-terracotta transition-colors line-clamp-1">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-spice-taupe line-clamp-2 mt-0.5">
                      {cat.description}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          8. BEST SELLERS
      ========================================================================= */}
      <section className="py-14 sm:py-20 bg-spice-ivory">
        <Container size="2xl">
          <ScrollReveal once={true}>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold text-spice-terracotta uppercase tracking-wider">
                  KITCHEN ESSENTIALS
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-spice-espresso tracking-tight mt-1">
                  Our Best Selling Spices
                </h2>
                <p className="text-sm text-spice-taupe mt-1">
                  Loved by over 50,000 home chefs and culinary connoisseurs across India.
                </p>
              </div>

              <Link
                href="/shop?sort=popular"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-spice-terracotta hover:text-spice-espresso transition-colors group"
              >
                <span>View All Best Sellers</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>

          {/* 8 Best Seller Product Cards (4-col Desktop / 2-col Mobile) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 items-stretch">
            {bestSellers.map((product, idx) => (
              <ScrollReveal key={product.id} delay={idx * 0.05} once={true} className="h-full">
                <ProductCard product={product} className="h-full" />
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          9. NEW ARRIVALS
      ========================================================================= */}
      <section className="py-14 sm:py-18 bg-white border-y border-spice-border">
        <Container size="2xl">
          <ScrollReveal once={true}>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-spice-cardamom-50 text-spice-cardamom text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>FRESH FROM HARVEST</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-spice-espresso tracking-tight">
                  New Harvest Arrivals
                </h2>
                <p className="text-sm text-spice-taupe mt-1">
                  Fresh seasonal batches straight from farm to stone mill.
                </p>
              </div>

              <Link
                href="/shop?newArrival=true"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-spice-cardamom hover:text-spice-espresso transition-colors group"
              >
                <span>Explore All New Spices</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>

          {/* 6 New Arrival Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5 items-stretch">
            {newArrivals.map((product, idx) => (
              <ScrollReveal key={product.id} delay={idx * 0.05} once={true} className="h-full">
                <ProductCard product={product} showFlavourNote={false} className="h-full" />
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          10. CURATED COMBOS & GIFT BOXES (Large Editorial Cards)
      ========================================================================= */}
      <section className="py-16 sm:py-24 bg-spice-ivory">
        <Container size="2xl">
          <ScrollReveal once={true}>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold text-spice-terracotta uppercase tracking-wider">
                CURATED COLLECTIONS
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-spice-espresso tracking-tight mt-1 mb-2">
                Handcrafted Spice Combos &amp; Gift Boxes
              </h2>
              <p className="text-sm sm:text-base text-spice-taupe">
                Thoughtfully packaged pantry vaults with complementary spices and exclusive recipes.
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
                        {combo.itemCount} Spices Included
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
                          Included in this box:
                        </span>
                        <div className="grid grid-cols-2 gap-1 text-[11px] text-spice-taupe">
                          {combo.itemsIncluded.slice(0, 4).map((item, i) => (
                            <div key={i} className="flex items-center gap-1 truncate">
                              <span className="w-1.5 h-1.5 rounded-full bg-spice-terracotta" />
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

                    <AddToCartButton
                      onAdd={() =>
                        addToCart(
                          {
                            id: combo.id,
                            title: combo.title,
                            slug: combo.slug,
                            price: combo.price,
                            mrp: combo.mrp,
                            images: [combo.image],
                            category: 'combo-packs',
                            stock: 25,
                            weight: `${combo.itemCount} Items`
                          } as any,
                          1,
                          'Combo Box'
                        )
                      }
                      className="text-xs py-2 px-4"
                    />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/category/combo-packs">
              <Button variant="secondary" size="lg" showArrow>
                View All Curated Gift Hampers &amp; Combos
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          11. FLAVOURS OF INDIA (Regional Spices & Terroir)
      ========================================================================= */}
      <section className="py-16 sm:py-24 bg-white border-y border-spice-border">
        <Container size="2xl">
          <ScrollReveal once={true}>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold text-spice-cardamom uppercase tracking-wider">
                REGIONAL TERROIRS
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-spice-espresso tracking-tight mt-1 mb-2">
                Flavours of India
              </h2>
              <p className="text-sm sm:text-base text-spice-taupe">
                Every state holds a distinct spice culture. Explore authentic micro-regions and their signature blends.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {regionalFlavoursData.map((region, idx) => (
              <ScrollReveal key={region.id} delay={idx * 0.08} once={true} className="h-full">
                <div className="group relative rounded-2xl border border-spice-border hover:border-spice-border-strong bg-spice-sand/20 hover:bg-white overflow-hidden p-5 transition-all duration-300 shadow-warm-xs hover:shadow-warm-md flex flex-col justify-between h-full">
                  <div>
                    <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-4 bg-spice-sand/40">
                      <img
                        src={region.image}
                        alt={region.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-spice-espresso/90 text-white text-[11px] font-bold">
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
                      href={`/category/${region.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-spice-terracotta group-hover:translate-x-0.5 transition-transform"
                    >
                      Explore {region.name} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          12. WHY CHOOSE US (Expanded Quality Narrative)
      ========================================================================= */}
      <section className="py-16 sm:py-24 bg-spice-sand/30">
        <Container size="2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <ScrollReveal once={true}>
                <span className="text-xs font-bold text-spice-cardamom uppercase tracking-wider">
                  OUR PROMISE
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-spice-espresso tracking-tight mt-1 mb-4">
                  Why Great Indian Kitchens Choose AAXOL
                </h2>
                <p className="text-sm sm:text-base text-spice-taupe leading-relaxed mb-6">
                  Unlike commercial mass-market spices that sit in warehouses for months after high-heat machine milling, we preserve the soul of Indian cooking through cold micro-batch grinding and zero adulteration.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-spice-cardamom text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Leaf className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-spice-espresso">Single-Origin Terroir</h4>
                      <p className="text-xs text-spice-taupe">Sourced directly from indigenous regions with optimal soil and altitude.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-spice-terracotta text-white flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-spice-espresso">Zero Dyes or Anti-Caking Agents</h4>
                      <p className="text-xs text-spice-taupe">What you see is 100% pure sun-cured spices tested in NABL certified labs.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-spice-turmeric text-spice-espresso flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-spice-espresso">Aroma Sealed In Tins</h4>
                      <p className="text-xs text-spice-taupe">UV protected, airtight packaging ensures farm fragrance in every spoon.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Link href="/about">
                    <Button variant="outline" size="md" showArrow>
                      Read Our Full Sourcing Story
                    </Button>
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-7">
              <ScrollReveal delay={0.2} once={true}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="rounded-2xl overflow-hidden shadow-warm-md aspect-[4/5] bg-spice-sand/40">
                      <img
                        src="https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=700&auto=format&fit=crop&q=80"
                        alt="Stone pounding spices"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-spice-border shadow-warm-xs">
                      <div className="font-serif font-bold text-2xl text-spice-cardamom">5.8%</div>
                      <div className="text-xs font-semibold text-spice-espresso">Average Active Curcumin</div>
                      <p className="text-[11px] text-spice-taupe mt-1">Nearly 3x higher than standard commercial turmeric.</p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-6">
                    <div className="bg-spice-espresso text-white p-5 rounded-2xl shadow-warm-md">
                      <div className="font-serif font-bold text-2xl text-spice-sand">100%</div>
                      <div className="text-xs font-semibold">Cold Stone Pounded</div>
                      <p className="text-[11px] text-white/80 mt-1">Never heated over 38°C to retain all natural oils.</p>
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-warm-md aspect-[4/5] bg-spice-sand/40">
                      <img
                        src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=700&auto=format&fit=crop&q=80"
                        alt="Indian Spice Market"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          13. RECIPE INSPIRATION (Authentic Indian Kitchen Recipes)
      ========================================================================= */}
      <section className="py-16 sm:py-24 bg-white border-b border-spice-border">
        <Container size="2xl">
          <ScrollReveal once={true}>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-xs font-bold text-spice-cardamom uppercase tracking-wider">
                  CULINARY MASTERCLASSES
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-spice-espresso tracking-tight mt-1">
                  Cook with Authentic AAXOL
                </h2>
                <p className="text-sm text-spice-taupe mt-1">
                  Master signature Indian dishes with step-by-step chef recipes and exact spice ratios.
                </p>
              </div>

              <Link
                href="/recipes"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-spice-terracotta hover:text-spice-espresso transition-colors group"
              >
                <span>View All 9 Master Recipes</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {staticRecipes.slice(0, 3).map((recipe, idx) => (
              <ScrollReveal key={recipe.id} delay={idx * 0.1} once={true} className="h-full">
                <Link
                  href={`/recipes/${recipe.slug}`}
                  className="group bg-spice-sand/20 hover:bg-white rounded-3xl border border-spice-border hover:border-spice-border-strong overflow-hidden shadow-warm-xs hover:shadow-warm-lg transition-all duration-300 flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-spice-sand/40">
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-spice-espresso/90 text-white text-[11px] font-bold">
                        {recipe.cuisine}
                      </div>
                      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-spice-espresso text-[11px] font-semibold flex items-center gap-1">
                        <Clock className="w-3 h-3 text-spice-terracotta" />
                        {recipe.totalTimeMinutes} Mins
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="font-serif font-bold text-lg text-spice-espresso group-hover:text-spice-terracotta transition-colors mb-1.5">
                        {recipe.title}
                      </h3>
                      <p className="text-xs text-spice-taupe line-clamp-2 leading-relaxed mb-4">
                        {recipe.description}
                      </p>

                      <div className="flex items-center justify-between text-xs text-spice-taupe pt-3 border-t border-spice-border/60">
                        <span className="font-semibold text-spice-espresso">
                          Difficulty: {recipe.difficulty}
                        </span>
                        <span className="text-spice-terracotta font-bold flex items-center gap-1">
                          View Recipe <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          14. CUSTOMER REVIEWS & TESTIMONIALS
      ========================================================================= */}
      <section className="py-16 sm:py-24 bg-spice-ivory">
        <Container size="2xl">
          <ScrollReveal once={true}>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold text-spice-terracotta uppercase tracking-wider">
                REAL KITCHEN EXPERIENCES
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-spice-espresso tracking-tight mt-1 mb-2">
                What Indian Home Chefs Are Saying
              </h2>
              <p className="text-sm sm:text-base text-spice-taupe">
                Verified reviews from spice enthusiasts across Jaipur, Delhi, Mumbai, Bengaluru, and Hyderabad.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {staticCustomerReviews.map((review, idx) => (
              <ScrollReveal key={review.id} delay={idx * 0.08} once={true} className="h-full">
                <div className="bg-white rounded-2xl border border-spice-border p-6 shadow-warm-xs hover:shadow-warm-md transition-all flex flex-col justify-between h-full">
                  <div>
                    {/* Stars */}
                    <div className="flex items-center gap-1 text-amber-500 mb-3">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>

                    <h4 className="font-serif font-bold text-base text-spice-espresso mb-2">
                      "{review.title}"
                    </h4>
                    <p className="text-xs sm:text-sm text-spice-taupe leading-relaxed mb-4">
                      {review.comment}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-spice-border/60">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-spice-espresso">{review.name}</span>
                      <span className="text-[10px] text-spice-cardamom font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Verified Buyer
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-spice-taupe">
                      <span>{review.city}</span>
                      <span className="text-[10px] italic truncate max-w-[140px]">{review.purchasedProduct}</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          15. INTERNATIONAL SHIPPING & EXPORT BANNER
      ========================================================================= */}
      <section className="py-12 bg-spice-espresso text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F3EBDD_1px,transparent_1px)] [background-size:16px_16px]" />
        <Container size="2xl" className="relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-spice-terracotta flex items-center justify-center shrink-0 shadow-warm-md">
                <Globe2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
                  Worldwide International Spice Shipping
                </h3>
                <p className="text-xs sm:text-sm text-white/80 mt-0.5 max-w-xl">
                  Vacuum-sealed export grade aromatics shipped express to USA, UK, UAE, Canada, Australia &amp; Europe.
                </p>
              </div>
            </div>

            <Link href="/shipping">
              <Button variant="primary" size="md" className="shrink-0">
                View Global Shipping Rates
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          16. NEWSLETTER SUBSCRIPTION
      ========================================================================= */}
      <section className="py-14 sm:py-20 bg-spice-peach/30 border-b border-spice-border">
        <Container size="md">
          <ScrollReveal once={true}>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-spice-terracotta/10 text-spice-terracotta flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-spice-espresso mb-2">
                Join The AAXOL Spice Connoisseurs Club
              </h2>
              <p className="text-xs sm:text-sm text-spice-taupe max-w-md mx-auto mb-6">
                Receive secret regional recipes, early harvest announcements, and 15% off your first order with code <strong className="text-spice-espresso font-mono">WELCOME15</strong>.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thank you for subscribing! Your 15% coupon WELCOME15 is ready to use.');
                }}
                className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-xl border border-spice-border bg-white text-spice-espresso text-sm placeholder:text-spice-taupe/60 focus:outline-none focus:ring-2 focus:ring-spice-terracotta/30"
                />
                <Button type="submit" variant="primary" size="md" className="shrink-0">
                  Subscribe
                </Button>
              </form>

              <p className="text-[11px] text-spice-taupe/80 mt-3">
                Zero spam. Only pure aromas and culinary inspiration. Unsubscribe anytime.
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </div>
  );
}
