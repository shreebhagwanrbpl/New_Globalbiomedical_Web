'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Button } from '@/components/common';
import { ProductCard } from '@/components/products/ProductCard';
import { useStore } from '@/context/StoreContext';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { LUXURY_EASE } from '@/components/animations/Motion';

export default function WishlistPage() {
  const { wishlist, clearWishlist } = useStore();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[70vh] bg-spice-ivory flex items-center justify-center py-16">
        <Container size="md">
          <div className="bg-white rounded-3xl border border-spice-border p-8 sm:p-12 text-center shadow-warm-xs">
            <div className="w-20 h-20 rounded-full bg-spice-peach/40 text-spice-terracotta flex items-center justify-center mx-auto mb-5">
              <Heart className="w-10 h-10" />
            </div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-spice-espresso mb-2">
              Your Shortlist is Empty
            </h1>
            <p className="text-sm text-spice-taupe max-w-md mx-auto mb-6">
              Shortlist clinical analyzers, reagent kits, and diagnostic consumables to compare specifications or request institutional quotations.
            </p>
            <Link href="/shop">
              <Button variant="primary" size="lg" showArrow className="shadow-terracotta-glow">
                Explore Diagnostic Catalog
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-spice-ivory pb-24">
      {/* Header */}
      <section className="bg-gradient-to-b from-spice-sand/30 to-spice-ivory border-b border-spice-border py-8">
        <Container size="2xl">
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-spice-cardamom uppercase tracking-wider">
                SHORTLISTED DIAGNOSTICS
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-spice-espresso tracking-tight mt-1">
                Saved Equipment &amp; Reagents ({wishlist.length} items)
              </h1>
            </div>

            <button
              onClick={clearWishlist}
              className="text-xs font-semibold text-spice-terracotta hover:underline"
            >
              Clear Shortlist
            </button>
          </div>
        </Container>
      </section>

      {/* Product Grid */}
      <Container size="2xl" className="mt-8">
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          <AnimatePresence>
            {wishlist.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25, ease: LUXURY_EASE }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </div>
  );
}
