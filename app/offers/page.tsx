'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container, Button } from '@/components/common';
import { FlashSaleSection } from '@/components/offers/FlashSaleSection';
import { ProductCard } from '@/components/products/ProductCard';
import { staticProducts } from '@/data/products';
import { staticCombos } from '@/data/combos';
import { staticCoupons } from '@/data/coupons';
import { buyMoreSaveMoreTiers } from '@/data/offers';
import { formatCurrency } from '@/utils/currency';
import { useStore } from '@/context/StoreContext';
import { ScrollReveal, AddToCartButton } from '@/components/animations/Motion';
import {
  Tag,
  Percent,
  Sparkles,
  Gift,
  Copy,
  Check,
  Clock,
  ArrowRight,
  ShieldCheck,
  Layers,
  Award,
} from 'lucide-react';

export default function OffersPage() {
  const { addToCart } = useStore();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  // Top discount products
  const discountedProducts = staticProducts
    .filter(p => p.discountPercentage && p.discountPercentage >= 15)
    .sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));

  return (
    <div className="min-h-screen bg-spice-ivory pb-24">
      {/* Promotional Hero Banner */}
      <section className="bg-gradient-to-b from-spice-peach/40 via-spice-sand/30 to-spice-ivory border-b border-spice-border py-10 sm:py-16">
        <Container size="2xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-spice-terracotta/10 text-spice-terracotta text-xs font-bold uppercase tracking-wider mb-4">
              <Percent className="w-3.5 h-3.5" />
              <span>LAB INSTITUTIONAL PROMOTIONS &amp; PACKAGES</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-spice-espresso tracking-tight leading-tight mb-3">
              Human Biomedical Lab Bundles &amp; Offers
            </h1>
            <p className="text-sm sm:text-base text-spice-taupe leading-relaxed">
              Unlock authorized pricing on turnkey clinical pathology lab setups, hematology-biochemistry duos, and wholesale reagent starter packs. Use institutional promo codes at checkout for instant order deductions.
            </p>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          1. ACTIVE COUPON CODES STRIP
      ========================================================================= */}
      <section className="py-8 bg-white border-b border-spice-border">
        <Container size="2xl">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs font-bold text-spice-espresso uppercase tracking-wider">
              🎟️ Active Institutional Promo Codes
            </span>
            <span className="text-xs text-spice-taupe">Click to copy code for checkout</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {staticCoupons.map((coupon) => (
              <div
                key={coupon.id}
                className="p-4 rounded-2xl border border-dashed border-spice-terracotta/50 bg-spice-peach/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono font-bold text-base text-spice-terracotta bg-white px-2.5 py-1 rounded-lg border border-spice-border shadow-warm-xs">
                      {coupon.code}
                    </span>
                    <span className="text-[10px] font-bold text-spice-cardamom bg-spice-cardamom-50 px-2 py-0.5 rounded">
                      ACTIVE
                    </span>
                  </div>
                  <p className="text-xs text-spice-espresso font-semibold mb-1">
                    {coupon.description}
                  </p>
                  {coupon.minOrderValue && coupon.minOrderValue > 0 && (
                    <span className="text-[10px] text-spice-taupe block">
                      Min. Order: ₹{coupon.minOrderValue.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleCopyCoupon(coupon.code)}
                  className="mt-3 w-full py-1.5 rounded-lg bg-white border border-spice-border hover:border-spice-terracotta text-xs font-bold text-spice-espresso hover:text-spice-terracotta transition-colors flex items-center justify-center gap-1.5 shadow-warm-xs"
                >
                  {copiedCode === coupon.code ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-spice-cardamom" />
                      <span className="text-spice-cardamom">Code Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          2. FLASH BIOMEDICAL DISPATCH SALE
      ========================================================================= */}
      <FlashSaleSection />

      {/* =========================================================================
          3. BUY MORE, SAVE MORE TIERS
      ========================================================================= */}
      <section className="py-14 sm:py-18 bg-white border-b border-spice-border">
        <Container size="2xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-spice-cardamom uppercase tracking-wider">
              ANNUAL LAB CONTRACT DISCOUNTS
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-spice-espresso tracking-tight mt-1 mb-2">
              Volume &amp; Order Tier Savings
            </h2>
            <p className="text-xs sm:text-sm text-spice-taupe">
              Automatic stackable discounts when ordering full diagnostic equipment setups or quarterly reagent bulk packs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {buyMoreSaveMoreTiers.map((tier, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-spice-sand/20 border border-spice-border hover:border-spice-border-strong text-center shadow-warm-xs flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-spice-terracotta text-white text-xs font-bold mb-3">
                    {tier.badge}
                  </span>
                  <h3 className="font-serif font-bold text-xl text-spice-espresso mb-1">
                    {tier.title}
                  </h3>
                  <div className="font-serif font-bold text-2xl text-spice-cardamom my-2">
                    {tier.discount}
                  </div>
                  <p className="text-xs text-spice-taupe mb-4">
                    {tier.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-spice-border/60">
                  <span className="text-xs font-mono font-bold text-spice-espresso block mb-2">
                    Use Code: <strong className="text-spice-terracotta">{tier.code}</strong>
                  </span>
                  <Link href="/shop">
                    <Button variant="outline" size="sm" className="w-full">
                      Browse Eligible Equipment
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          4. BEST DISCOUNTS & TODAY'S DEALS GRID
      ========================================================================= */}
      <section className="py-14 sm:py-20 bg-spice-ivory">
        <Container size="2xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold text-spice-terracotta uppercase tracking-wider">
                FEATURED DISCOUNTS
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-spice-espresso tracking-tight mt-1">
                Highest Discounted Lab Analyzers &amp; Reagents (15% to 30% Off)
              </h2>
              <p className="text-xs sm:text-sm text-spice-taupe mt-1">
                NABL calibrated instruments with direct warranty and Rajasthan field service.
              </p>
            </div>
            <Link href="/shop?offers=true" className="text-xs font-bold text-spice-terracotta hover:underline">
              View Catalog →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch">
            {discountedProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} className="h-full" />
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          5. CURATED TURNKEY LAB SETUP BUNDLES
      ========================================================================= */}
      <section id="combos" className="py-16 sm:py-24 bg-white border-t border-spice-border">
        <Container size="2xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-spice-cardamom uppercase tracking-wider">
              COMPLETE TURNKEY LAB PACKAGES
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-spice-espresso tracking-tight mt-1 mb-2">
              Turnkey Lab Combos — Save up to ₹50,000+
            </h2>
            <p className="text-xs sm:text-sm text-spice-taupe">
              All bundles include complete machine setup, starter reagent kits, calibration certificates, and free engineer installation across all Rajasthan districts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {staticCombos.map((combo) => (
              <div
                key={combo.id}
                className="bg-spice-sand/20 rounded-3xl border border-spice-border hover:border-spice-border-strong overflow-hidden shadow-warm-xs hover:shadow-warm-lg transition-all flex flex-col justify-between h-full"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-spice-sand/40">
                    <span className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-spice-terracotta text-white text-xs font-bold shadow-warm-xs">
                      {combo.badge}
                    </span>
                    <img src={combo.image} alt={combo.title} className="w-full h-full object-cover" />
                  </div>

                  <div className="p-5">
                    <span className="text-xs font-bold text-spice-cardamom uppercase tracking-wider block mb-1">
                      {combo.itemCount} Instruments &amp; Reagent Kits Included
                    </span>
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-spice-espresso mb-1">
                      {combo.title}
                    </h3>
                    <p className="text-xs text-spice-taupe line-clamp-2 mb-3">
                      {combo.description}
                    </p>

                    <div className="space-y-1 text-xs text-spice-taupe bg-white p-3 rounded-xl border border-spice-border">
                      <span className="font-bold text-spice-espresso block mb-1">Package Includes:</span>
                      {combo.itemsIncluded.slice(0, 3).map((item, i) => (
                        <div key={i} className="truncate">• {item.name} ({item.weight})</div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-3 border-t border-spice-border/60 flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-spice-espresso">{formatCurrency(combo.price)}</span>
                      <span className="text-xs text-spice-taupe line-through">{formatCurrency(combo.mrp)}</span>
                    </div>
                    <span className="text-[11px] font-bold text-spice-cardamom">Save {formatCurrency(combo.savings)}</span>
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
                        'Lab Setup Bundle'
                      )
                    }
                    className="text-xs py-2 px-3.5"
                  />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
