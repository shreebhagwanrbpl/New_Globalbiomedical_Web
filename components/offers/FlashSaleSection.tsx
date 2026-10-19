'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { flashSaleProducts } from '@/data/offers';
import { formatCurrency } from '@/utils/currency';
import { useStore } from '@/context/StoreContext';
import { staticProducts } from '@/data/products';
import { ScrollReveal, AddToCartButton, LUXURY_EASE } from '@/components/animations/Motion';
import { Flame, Clock, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export function FlashSaleSection() {
  const { addToCart } = useStore();

  // Dynamic Browser Countdown
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 18,
    seconds: 42,
    milliseconds: 15
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.milliseconds > 0) {
          return { ...prev, milliseconds: prev.milliseconds - 1 };
        }
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1, milliseconds: 99 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59, milliseconds: 99 };
        }
        if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59, milliseconds: 99 };
        }
        return { hours: 2, minutes: 59, seconds: 59, milliseconds: 99 };
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const formatDigit = (num: number) => num.toString().padStart(2, '0');

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-spice-peach/20 via-spice-sand/20 to-spice-ivory border-y border-spice-border relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-spice-terracotta/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-80 h-80 bg-spice-turmeric/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Title & Countdown */}
        <ScrollReveal once={true}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-spice-terracotta/10 text-spice-terracotta text-xs font-bold uppercase tracking-wider mb-3">
                <Flame className="w-3.5 h-3.5 text-spice-terracotta animate-bounce" />
                <span>LIMITED TIME LIGHTNING DEALS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-spice-espresso tracking-tight">
                FLASH SPICE SALE
              </h2>
              <p className="text-sm sm:text-base text-spice-taupe mt-1.5 max-w-xl">
                Exclusive limited-time prices on kitchen staples. Freshly cold-ground and sealed for maximum aroma.
              </p>
            </div>

            {/* Countdown Box */}
            <div className="flex items-center gap-2 sm:gap-3 bg-white px-4 py-3 rounded-2xl border border-spice-border shadow-warm-sm self-start md:self-auto">
              <Clock className="w-4 h-4 text-spice-terracotta" />
              <span className="text-xs font-bold text-spice-espresso uppercase tracking-wider hidden sm:inline">
                Ends In:
              </span>
              <div className="flex items-center gap-1.5 font-mono text-sm sm:text-base font-bold text-spice-espresso">
                <span className="bg-spice-sand/50 px-2 py-1 rounded text-spice-espresso">
                  {formatDigit(timeLeft.hours)}
                </span>
                <span className="text-spice-terracotta">:</span>
                <span className="bg-spice-sand/50 px-2 py-1 rounded text-spice-espresso">
                  {formatDigit(timeLeft.minutes)}
                </span>
                <span className="text-spice-terracotta">:</span>
                <span className="bg-spice-sand/50 px-2 py-1 rounded text-spice-espresso">
                  {formatDigit(timeLeft.seconds)}
                </span>
                <span className="text-spice-terracotta">:</span>
                <span className="bg-spice-peach/60 px-1.5 py-1 rounded text-spice-terracotta text-xs">
                  {formatDigit(timeLeft.milliseconds)}
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 4 Flash Sale Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {flashSaleProducts.map((item, idx) => {
            const product = staticProducts.find(p => p.id === item.productId) || {
              id: item.productId,
              title: item.title,
              slug: item.slug,
              price: item.salePrice,
              mrp: item.mrp,
              images: [item.image],
              category: item.category,
              stock: item.stockLeft,
              weight: '100g'
            };

            const claimedPercentage = Math.round(((item.totalStock - item.stockLeft) / item.totalStock) * 100);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1, ease: LUXURY_EASE }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl border border-spice-border hover:border-spice-terracotta/40 p-4 shadow-warm-xs hover:shadow-warm-md transition-all flex flex-col justify-between h-full"
              >
                <div>
                  {/* Badge & Image */}
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-spice-sand/30 mb-3.5 group">
                    <span className="absolute top-2.5 left-2.5 z-10 px-2.5 py-1 rounded-full bg-spice-terracotta text-white text-[11px] font-bold shadow-warm-xs">
                      {item.badge}
                    </span>

                    <Link href={`/product/${item.slug}`}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    </Link>
                  </div>

                  {/* Category & Title */}
                  <span className="text-[11px] text-spice-taupe font-medium block mb-1">
                    {item.category}
                  </span>
                  <Link href={`/product/${item.slug}`} className="hover:text-spice-terracotta transition-colors">
                    <h3 className="font-serif font-bold text-base text-spice-espresso line-clamp-1 mb-1">
                      {item.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-spice-taupe line-clamp-1 mb-3">
                    {item.flavourNote}
                  </p>

                  {/* Price & Savings */}
                  <div className="flex items-baseline justify-between gap-1 mb-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-spice-espresso">
                        {formatCurrency(item.salePrice)}
                      </span>
                      <span className="text-xs text-spice-taupe line-through">
                        {formatCurrency(item.mrp)}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-spice-cardamom bg-spice-cardamom-50 px-2 py-0.5 rounded">
                      Save {formatCurrency(item.savings)}
                    </span>
                  </div>

                  {/* Stock Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-spice-taupe mb-1">
                      <span className="text-spice-terracotta font-bold">Only {item.stockLeft} left</span>
                      <span>{claimedPercentage}% Claimed</span>
                    </div>
                    <div className="w-full h-2 bg-spice-sand/60 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-spice-turmeric to-spice-terracotta rounded-full transition-all duration-1000"
                        style={{ width: `${claimedPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Add to Cart */}
                <AddToCartButton
                  onAdd={() => addToCart(product as any, 1, '100g')}
                  className="w-full text-xs sm:text-sm py-2"
                />
              </motion.div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/offers"
            className="inline-flex items-center gap-2 text-sm font-bold text-spice-terracotta hover:text-spice-espresso transition-colors group"
          >
            <span>View All Active Promotional Offers & Bundles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
