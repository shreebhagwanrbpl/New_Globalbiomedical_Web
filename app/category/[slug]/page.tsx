'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Button } from '@/components/common';
import { ProductCard } from '@/components/products/ProductCard';
import { getCategoryBySlug, staticCategories } from '@/data/categories';
import { staticProducts } from '@/data/products';
import { ChevronRight, Sparkles, Filter, ChevronDown, Flame, Search, ShieldCheck } from 'lucide-react';
import { LUXURY_EASE, ScrollReveal } from '@/components/animations/Motion';

type SortOption = 'featured' | 'price_asc' | 'price_desc' | 'rating' | 'discount';

export default function CategoryDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const category = getCategoryBySlug(slug) || {
    id: slug,
    name: slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Category',
    slug: slug,
    description: 'Explore high-precision clinical laboratory equipment, diagnostic analyzers, and certified reagents.',
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1000&auto=format&fit=crop&q=80',
    subcategories: []
  };

  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  // Filter products belonging to this category
  const categoryProducts = useMemo(() => {
    return staticProducts.filter(p => p.category === slug || (slug === 'all'));
  }, [slug]);

  // Apply subcategory and sorting filters
  const filteredProducts = useMemo(() => {
    return categoryProducts
      .filter(p => {
        if (selectedSubcategory !== 'all' && p.subcategory !== selectedSubcategory) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price_asc':
            return a.price - b.price;
          case 'price_desc':
            return b.price - a.price;
          case 'rating':
            return (b.rating || 0) - (a.rating || 0);
          case 'discount':
            return (b.discountPercentage || 0) - (a.discountPercentage || 0);
          case 'featured':
          default:
            return (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0);
        }
      });
  }, [categoryProducts, selectedSubcategory, sortBy]);

  return (
    <div className="min-h-screen bg-spice-ivory pb-20">
      {/* Editorial Category Hero Header */}
      <section className="relative py-10 sm:py-14 bg-gradient-to-b from-spice-sand/40 via-spice-sand/20 to-spice-ivory border-b border-spice-border">
        <Container size="2xl">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-spice-taupe mb-6 font-medium">
            <Link href="/" className="hover:text-spice-espresso">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-spice-border-strong" />
            <Link href="/shop" className="hover:text-spice-espresso">Shop</Link>
            <ChevronRight className="w-3.5 h-3.5 text-spice-border-strong" />
            <span className="text-spice-espresso font-bold truncate">{category.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="text-xs font-bold text-spice-cardamom uppercase tracking-wider">
                DIAGNOSTIC EQUIPMENT &amp; REAGENTS
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-spice-espresso tracking-tight mt-1 mb-3">
                {category.name}
              </h1>
              <p className="text-sm sm:text-base text-spice-taupe max-w-2xl leading-relaxed">
                {category.description}
              </p>

              <div className="flex items-center gap-4 mt-5 text-xs text-spice-taupe font-semibold">
                <span>{categoryProducts.length} Equipment &amp; Kits Available</span>
                <span>•</span>
                <span>ISO 13485 &amp; NABL Calibrated Standards</span>
                <span>•</span>
                <span>Same-Day Dispatch Across Rajasthan</span>
              </div>
            </div>

            <div className="lg:col-span-4 hidden lg:block">
              <div className="aspect-[16/10] rounded-2xl overflow-hidden shadow-warm-md border border-spice-border">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Subcategory Chips */}
          {category.subcategories && category.subcategories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-spice-border/80">
              <button
                onClick={() => setSelectedSubcategory('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedSubcategory === 'all'
                    ? 'bg-spice-espresso text-white shadow-warm-xs'
                    : 'bg-white border border-spice-border text-spice-taupe hover:border-spice-espresso hover:text-spice-espresso'
                }`}
              >
                All {category.name}
              </button>
              {category.subcategories.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubcategory(sub.slug)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedSubcategory === sub.slug
                      ? 'bg-spice-espresso text-white shadow-warm-xs'
                      : 'bg-white border border-spice-border text-spice-taupe hover:border-spice-espresso hover:text-spice-espresso'
                  }`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Product Grid & Controls */}
      <Container size="2xl" className="mt-8">
        {/* Filter and Sort Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-spice-border">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-spice-cardamom-50 text-spice-cardamom text-xs font-bold border border-spice-cardamom-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Certified NABL &amp; ISO 13485 Compliant</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-spice-taupe font-semibold">Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none bg-white pl-3.5 pr-8 py-1.5 rounded-xl border border-spice-border text-xs font-bold text-spice-espresso shadow-warm-xs cursor-pointer focus:outline-none"
              >
                <option value="featured">Featured First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="discount">Biggest Discount</option>
              </select>
              <ChevronDown className="w-4 h-4 text-spice-taupe absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-spice-border p-12 text-center my-8">
            <h3 className="font-serif font-bold text-xl text-spice-espresso mb-2">
              No products found in this category sub-filter
            </h3>
            <p className="text-xs sm:text-sm text-spice-taupe mb-4">
              Try switching subcategories or viewing all equipment.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedSubcategory('all');
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4 md:gap-5 mt-6 items-stretch"
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, ease: LUXURY_EASE }}
                  key={product.id}
                  className="h-full"
                >
                  <ProductCard product={product} className="h-full" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Other Categories Links */}
        <div className="mt-16 pt-10 border-t border-spice-border">
          <h3 className="font-serif font-bold text-lg text-spice-espresso mb-4">
            Explore Other Spice Categories
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {staticCategories
              .filter(c => c.slug !== slug)
              .slice(0, 5)
              .map(cat => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className="p-3 bg-white rounded-xl border border-spice-border hover:border-spice-terracotta/40 text-center shadow-warm-xs transition-colors"
                >
                  <span className="font-serif font-bold text-xs sm:text-sm text-spice-espresso block">
                    {cat.name}
                  </span>
                  <span className="text-[10px] text-spice-taupe">
                    {staticProducts.filter(p => p.category === cat.slug).length} Products
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
