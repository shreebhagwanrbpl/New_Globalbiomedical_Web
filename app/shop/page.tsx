'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Button } from '@/components/common';
import { ProductCard } from '@/components/products/ProductCard';
import { staticProducts } from '@/data/products';
import { staticCategories } from '@/data/categories';
import { Product } from '@/types/product';
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  ChevronDown,
  Check,
  Sparkles,
  Flame,
  ArrowUpDown,
  RotateCcw,
  ShieldCheck,
  Award,
  Layers,
} from 'lucide-react';
import { LUXURY_EASE } from '@/components/animations/Motion';

type SortOption = 'featured' | 'best_seller' | 'newest' | 'price_asc' | 'price_desc' | 'rating' | 'discount';

function ShopContent() {
  const searchParams = useSearchParams();

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSpiceLevel, setSelectedSpiceLevel] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [offersOnly, setOffersOnly] = useState<boolean>(false);
  const [selectedDietary, setSelectedDietary] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync URL params on initial load
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);

    const sort = searchParams.get('sort');
    if (sort === 'popular') setSortBy('best_seller');

    const newArrival = searchParams.get('newArrival');
    if (newArrival === 'true') setSortBy('newest');

    const q = searchParams.get('q');
    if (q) setSearchQuery(q);
  }, [searchParams]);

  // Active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'all') count++;
    if (selectedSpiceLevel !== 'all') count++;
    if (selectedPriceRange !== 'all') count++;
    if (selectedRating > 0) count++;
    if (inStockOnly) count++;
    if (offersOnly) count++;
    if (selectedDietary !== 'all') count++;
    if (searchQuery.trim() !== '') count++;
    return count;
  }, [selectedCategory, selectedSpiceLevel, selectedPriceRange, selectedRating, inStockOnly, offersOnly, selectedDietary, searchQuery]);

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedSpiceLevel('all');
    setSelectedPriceRange('all');
    setSelectedRating(0);
    setInStockOnly(false);
    setOffersOnly(false);
    setSelectedDietary('all');
    setSortBy('featured');
  };

  // Filtered & Sorted Product List
  const filteredProducts = useMemo(() => {
    return staticProducts
      .filter((product) => {
        // Search Filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchTitle = product.title.toLowerCase().includes(q);
          const matchDesc = product.description.toLowerCase().includes(q);
          const matchCat = product.category.toLowerCase().includes(q);
          const matchIngredients = product.ingredients.some(ing => ing.toLowerCase().includes(q));
          const matchTags = product.tags?.some(tag => tag.toLowerCase().includes(q));
          if (!matchTitle && !matchDesc && !matchCat && !matchIngredients && !matchTags) {
            return false;
          }
        }

        // Category Filter
        if (selectedCategory !== 'all' && product.category !== selectedCategory) {
          return false;
        }

        // Spice Level Filter
        if (selectedSpiceLevel !== 'all' && product.spiceLevel?.toLowerCase() !== selectedSpiceLevel.toLowerCase()) {
          return false;
        }

        // Rating Filter
        if (selectedRating > 0 && (product.rating || 0) < selectedRating) {
          return false;
        }

        // In Stock Filter
        if (inStockOnly && product.stock <= 0) {
          return false;
        }

        // Offers Only Filter
        if (offersOnly && (!product.discountPercentage || product.discountPercentage < 15)) {
          return false;
        }

        // Dietary Filter
        if (selectedDietary !== 'all') {
          if (!product.dietaryInfo?.some(d => d.toLowerCase().includes(selectedDietary.toLowerCase()))) {
            return false;
          }
        }

        // Price Range Filter
        if (selectedPriceRange === 'under_150' && product.price >= 150) return false;
        if (selectedPriceRange === '150_300' && (product.price < 150 || product.price > 300)) return false;
        if (selectedPriceRange === '300_600' && (product.price < 300 || product.price > 600)) return false;
        if (selectedPriceRange === 'above_600' && product.price <= 600) return false;

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
          case 'newest':
            return (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0);
          case 'best_seller':
            return (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0);
          case 'featured':
          default:
            return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        }
      });
  }, [searchQuery, selectedCategory, selectedSpiceLevel, selectedPriceRange, selectedRating, inStockOnly, offersOnly, selectedDietary, sortBy]);

  return (
    <div className="min-h-screen bg-spice-ivory pb-20">
      {/* Hero / Header Section with Visual Category Banner */}
      <section className="bg-gradient-to-b from-spice-sand/40 via-spice-sand/20 to-spice-ivory border-b border-spice-border pt-8 pb-6">
        <Container size="2xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-bold text-spice-cardamom uppercase tracking-wider">
                AUTHENTIC INDIAN SPICE PANTRY
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-spice-espresso tracking-tight mt-1 mb-2">
                Shop Pure Artisanal Spices &amp; Masalas
              </h1>
              <p className="text-xs sm:text-sm text-spice-taupe leading-relaxed">
                Explore our master collection of {staticProducts.length}+ single-origin whole seeds, cold stone-ground powders, and iron-kadai roasted masala blends.
              </p>
            </div>

            {/* Search Bar */}
            <div className="w-full md:w-80 lg:w-96 relative shrink-0">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-spice-taupe absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search spices, masalas, turmeric..."
                  className="w-full pl-10 pr-9 py-2.5 bg-white rounded-xl border border-spice-border focus:border-spice-terracotta focus:ring-2 focus:ring-spice-terracotta/20 text-spice-espresso text-xs sm:text-sm shadow-warm-xs placeholder:text-spice-taupe/60"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 p-1 rounded-full text-spice-taupe hover:text-spice-espresso"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Visual Category Thumbnails Multi-line Wrap (No scrollbar) */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-spice-espresso text-white border-spice-espresso shadow-warm-xs'
                  : 'bg-white text-spice-espresso border-spice-border hover:border-spice-border-strong'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-spice-terracotta" />
              <span>All Spices ({staticProducts.length})</span>
            </button>

            {staticCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all ${
                  selectedCategory === cat.slug
                    ? 'bg-spice-espresso text-white border-spice-espresso shadow-warm-xs'
                    : 'bg-white text-spice-espresso border-spice-border hover:border-spice-terracotta/60'
                }`}
              >
                {cat.image && (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-3.5 h-3.5 rounded-full object-cover shrink-0 border border-spice-border/60"
                  />
                )}
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          STICKY TOP CONTROL BAR (Sort, Filters trigger, Count)
      ========================================================================= */}
      <div className="sticky top-[69px] z-30 bg-spice-ivory/95 backdrop-blur-md border-b border-spice-border py-3 shadow-xs">
        <Container size="2xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-xl border border-spice-border text-xs font-bold text-spice-espresso shadow-warm-xs hover:bg-spice-sand/30"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-spice-terracotta" />
                <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
              </button>

              {/* Product Count Display */}
              <span className="text-xs sm:text-sm font-semibold text-spice-taupe">
                Showing <strong className="text-spice-espresso">{filteredProducts.length}</strong> of{' '}
                <strong className="text-spice-espresso">{staticProducts.length}</strong> spices
              </span>
            </div>

            {/* Sort & Reset Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-spice-taupe font-semibold hidden sm:inline">Sort by:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none bg-white pl-3 pr-8 py-1.5 rounded-xl border border-spice-border text-xs sm:text-sm font-bold text-spice-espresso shadow-warm-xs focus:outline-none focus:border-spice-terracotta cursor-pointer"
                >
                  <option value="featured">Featured Collection</option>
                  <option value="best_seller">Best Selling</option>
                  <option value="newest">New Harvest First</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="discount">Biggest Discount</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-spice-taupe absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {activeFilterCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold text-spice-terracotta hover:bg-spice-peach/40 transition-colors border border-spice-terracotta/30"
                  title="Reset All Filters"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Active Filter Badges */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-2 mt-1 border-t border-spice-border/60">
              <span className="text-[11px] text-spice-taupe font-medium">Applied:</span>
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-spice-espresso text-white text-[11px] font-semibold">
                  Category: {selectedCategory.replace(/-/g, ' ')}
                  <button onClick={() => setSelectedCategory('all')} className="hover:text-spice-peach">
                    <X className="w-2.5 h-2.5" />
                  </button>
                </span>
              )}
              {selectedSpiceLevel !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-spice-terracotta text-white text-[11px] font-semibold">
                  Heat: {selectedSpiceLevel}
                  <button onClick={() => setSelectedSpiceLevel('all')} className="hover:text-spice-sand">
                    <X className="w-2.5 h-2.5" />
                  </button>
                </span>
              )}
              {selectedPriceRange !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-spice-sand text-spice-espresso text-[11px] font-semibold border border-spice-border">
                  Price: {selectedPriceRange.replace(/_/g, ' ')}
                  <button onClick={() => setSelectedPriceRange('all')}>
                    <X className="w-2.5 h-2.5" />
                  </button>
                </span>
              )}
              {selectedRating > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500 text-white text-[11px] font-semibold">
                  {selectedRating}★+
                  <button onClick={() => setSelectedRating(0)}>
                    <X className="w-2.5 h-2.5" />
                  </button>
                </span>
              )}
              {offersOnly && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-spice-cardamom text-white text-[11px] font-semibold">
                  Offers Only
                  <button onClick={() => setOffersOnly(false)}>
                    <X className="w-2.5 h-2.5" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-spice-sand text-spice-espresso text-[11px] font-semibold border border-spice-border">
                  "{searchQuery}"
                  <button onClick={() => setSearchQuery('')}>
                    <X className="w-2.5 h-2.5" />
                  </button>
                </span>
              )}
            </div>
          )}
        </Container>
      </div>

      {/* Main Content Layout (Sticky Sidebar Filters + Products Grid) */}
      <Container size="2xl" className="mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* =========================================================================
              DESKTOP STICKY FILTER SIDEBAR (With clear top gap & full scroll to bottom)
          ========================================================================= */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-[152px] self-start select-none pb-8">
            <div className="bg-white rounded-2xl border border-spice-border shadow-warm-xs max-h-[calc(100vh-175px)] overflow-y-auto scrollbar-thin scrollbar-thumb-spice-sand scrollbar-track-transparent">
              {/* Sticky Card Header inside Sidebar: Filter Spices */}
              <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-5 py-3.5 border-b border-spice-border flex items-center justify-between shadow-xs">
                <span className="font-serif font-bold text-base text-spice-espresso">Filter Spices</span>
                {activeFilterCount > 0 && (
                  <button
                    onClick={handleResetFilters}
                    className="text-xs text-spice-terracotta font-semibold hover:underline"
                  >
                    Clear All ({activeFilterCount})
                  </button>
                )}
              </div>

              <div className="p-5 pt-3 space-y-5">
                {/* 1. Category Filter (Sticky Header + Smooth scrolling items) */}
                <div>
                  <div className="sticky top-[49px] z-20 bg-white/95 backdrop-blur-md py-2.5 -mx-5 px-5 border-b border-spice-border/50 mb-2.5 flex items-center justify-between">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-spice-espresso">
                      Categories ({staticCategories.length + 1})
                    </h4>
                  </div>
                  <div className="space-y-1">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                        selectedCategory === 'all'
                          ? 'bg-spice-espresso text-white shadow-xs'
                          : 'text-spice-taupe hover:bg-spice-sand/50 hover:text-spice-espresso'
                      }`}
                    >
                      <span>All Spices</span>
                      <span>{staticProducts.length}</span>
                    </button>
                    {staticCategories.map((cat) => {
                      const count = staticProducts.filter(p => p.category === cat.slug).length;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.slug)}
                          className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                            selectedCategory === cat.slug
                              ? 'bg-spice-espresso text-white shadow-xs'
                              : 'text-spice-taupe hover:bg-spice-sand/50 hover:text-spice-espresso'
                          }`}
                        >
                          <span className="truncate">{cat.name}</span>
                          <span className="text-[11px] opacity-80">{count}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Price Filter */}
                <div className="pt-4 border-t border-spice-border/70">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-spice-espresso mb-2.5">
                    Price Range
                  </h4>
                  <div className="space-y-1.5">
                    {[
                      { label: 'All Prices', value: 'all' },
                      { label: 'Under ₹150', value: 'under_150' },
                      { label: '₹150 – ₹300', value: '150_300' },
                      { label: '₹300 – ₹600', value: '300_600' },
                      { label: 'Above ₹600 (Gourmet & Gifts)', value: 'above_600' },
                    ].map((tier) => (
                      <label key={tier.value} className="flex items-center gap-2 text-xs text-spice-espresso cursor-pointer hover:text-spice-terracotta">
                        <input
                          type="radio"
                          name="priceRange"
                          checked={selectedPriceRange === tier.value}
                          onChange={() => setSelectedPriceRange(tier.value)}
                          className="text-spice-terracotta focus:ring-spice-terracotta"
                        />
                        <span>{tier.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 3. Spice Heat Level */}
                <div className="pt-4 border-t border-spice-border/70">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-spice-espresso mb-2.5">
                    Spice Heat Level
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {['all', 'Mild', 'Medium', 'Hot', 'Extra Hot'].map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => setSelectedSpiceLevel(lvl)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                          selectedSpiceLevel === lvl
                            ? 'bg-spice-terracotta text-white shadow-warm-xs'
                            : 'bg-spice-sand/40 text-spice-taupe hover:bg-spice-sand hover:text-spice-espresso'
                        }`}
                      >
                        {lvl === 'all' ? 'Any Heat' : lvl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Special Flags (Offers, In Stock) */}
                <div className="pt-4 border-t border-spice-border/70 space-y-2">
                  <label className="flex items-center gap-2 text-xs font-semibold text-spice-espresso cursor-pointer">
                    <input
                      type="checkbox"
                      checked={offersOnly}
                      onChange={(e) => setOffersOnly(e.target.checked)}
                      className="rounded text-spice-terracotta focus:ring-spice-terracotta"
                    />
                    <span>Special Discounted Offers Only</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs font-semibold text-spice-espresso cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="rounded text-spice-cardamom focus:ring-spice-cardamom"
                    />
                    <span>In Stock Only</span>
                  </label>
                </div>

                {/* 5. Rating Filter */}
                <div className="pt-4 border-t border-spice-border/70">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-spice-espresso mb-2.5">
                    Customer Rating
                  </h4>
                  <div className="space-y-1.5">
                    {[4.5, 4.0, 0].map((ratingVal) => (
                      <button
                        key={ratingVal}
                        onClick={() => setSelectedRating(ratingVal)}
                        className={`w-full text-left px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center justify-between ${
                          selectedRating === ratingVal
                            ? 'bg-spice-sand text-spice-espresso font-bold'
                            : 'text-spice-taupe hover:bg-spice-sand/40'
                        }`}
                      >
                        <span>{ratingVal === 0 ? 'All Ratings' : `${ratingVal}★ & Above`}</span>
                        {selectedRating === ratingVal && <Check className="w-3.5 h-3.5 text-spice-terracotta" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* =========================================================================
              PRODUCTS GRID (Right Column: 4-col Desktop / 3-col Tablet / 2-col Mobile)
          ========================================================================= */}
          <main className="lg:col-span-9 min-h-[600px]">
            {filteredProducts.length === 0 ? (
              /* Empty State */
              <div className="bg-white rounded-3xl border border-spice-border p-12 text-center my-4 shadow-warm-xs">
                <div className="w-16 h-16 rounded-full bg-spice-peach/40 text-spice-terracotta flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="font-serif font-bold text-xl text-spice-espresso mb-2">
                  No Spices Found
                </h3>
                <p className="text-sm text-spice-taupe max-w-md mx-auto mb-6">
                  We couldn't find any spices matching your selected filters or search query. Try adjusting your search or clearing active filters.
                </p>
                <Button variant="primary" size="md" onClick={handleResetFilters}>
                  Clear All Filters &amp; Show Catalog
                </Button>
              </div>
            ) : (
              /* Animated Responsive Product Grid */
              <motion.div
                layout
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4 md:gap-5 items-stretch"
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
          </main>
        </div>
      </Container>

      {/* =========================================================================
          MOBILE FILTER DRAWER (Slide-over on Mobile)
      ========================================================================= */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="absolute inset-0 bg-spice-espresso/50 backdrop-blur-xs"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-xs bg-white h-full overflow-y-auto p-6 flex flex-col justify-between z-10 shadow-warm-xl"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-spice-border">
                  <span className="font-serif font-bold text-lg text-spice-espresso">Filters</span>
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="p-1.5 rounded-full hover:bg-spice-sand/50"
                  >
                    <X className="w-5 h-5 text-spice-taupe" />
                  </button>
                </div>

                {/* Categories */}
                <div>
                  <h4 className="font-bold text-xs uppercase text-spice-espresso mb-2.5">
                    Category
                  </h4>
                  <div className="space-y-1">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex justify-between ${
                        selectedCategory === 'all' ? 'bg-spice-espresso text-white' : 'text-spice-taupe'
                      }`}
                    >
                      <span>All Categories</span>
                      <span>{staticProducts.length}</span>
                    </button>
                    {staticCategories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.slug)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex justify-between ${
                          selectedCategory === cat.slug ? 'bg-spice-espresso text-white' : 'text-spice-taupe'
                        }`}
                      >
                        <span className="truncate">{cat.name}</span>
                        <span>{staticProducts.filter(p => p.category === cat.slug).length}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Heat Level */}
                <div className="pt-4 border-t border-spice-border">
                  <h4 className="font-bold text-xs uppercase text-spice-espresso mb-2.5">
                    Heat Level
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {['all', 'Mild', 'Medium', 'Hot', 'Extra Hot'].map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => setSelectedSpiceLevel(lvl)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                          selectedSpiceLevel === lvl ? 'bg-spice-terracotta text-white' : 'bg-spice-sand/50 text-spice-taupe'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-spice-border space-y-2">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={() => setMobileFilterOpen(false)}
                >
                  Apply Filters ({filteredProducts.length} Results)
                </Button>
                {activeFilterCount > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      handleResetFilters();
                      setMobileFilterOpen(false);
                    }}
                  >
                    Clear All
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-spice-ivory flex items-center justify-center text-sm font-bold text-spice-taupe">Loading spices catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
