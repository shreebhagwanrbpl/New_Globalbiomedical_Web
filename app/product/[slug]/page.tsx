'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Container, Button, Badge } from '@/components/common';
import { ProductCard } from '@/components/products/ProductCard';
import { staticProducts, getProductBySlug } from '@/data/products';
import { staticFAQs } from '@/data/faqs';
import { staticCustomerReviews } from '@/data/reviews';
import { useStore } from '@/context/StoreContext';
import { formatCurrency } from '@/utils/currency';
import { Product, PackSizeOption } from '@/types/product';
import {
  WishlistButton,
  AddToCartButton,
  ScrollReveal,
  LUXURY_EASE,
} from '@/components/animations/Motion';
import {
  ChevronRight,
  Star,
  ShieldCheck,
  Truck,
  Leaf,
  Flame,
  Clock,
  Sparkles,
  CheckCircle2,
  Share2,
  Info,
  MapPin,
  RefreshCw,
  Award,
  Package,
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const product = getProductBySlug(slug) || staticProducts[0];

  const { addToCart, toggleWishlist, isInWishlist, addRecentlyViewed, recentlyViewed } = useStore();
  const isWishlisted = isInWishlist(product.id);

  // Track recently viewed
  useEffect(() => {
    if (product) {
      addRecentlyViewed(product);
    }
  }, [product, addRecentlyViewed]);

  // Pack sizes
  const packSizes: PackSizeOption[] = product.packSizes && product.packSizes.length > 0
    ? product.packSizes
    : [
        {
          weight: product.weight || '100g',
          price: product.salePrice || product.price,
          mrp: product.mrp || product.price,
          discountPercentage: product.discountPercentage || 0,
          inStock: product.stock > 0
        }
      ];

  const [selectedPackIndex, setSelectedPackIndex] = useState(0);
  const currentPack = packSizes[selectedPackIndex] || packSizes[0];

  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'about' | 'ingredients' | 'nutrition' | 'usage' | 'reviews' | 'faqs'>('about');

  const currentPrice = currentPack.price;
  const currentMrp = currentPack.mrp;
  const currentDiscount = currentPack.discountPercentage || (currentMrp > currentPrice ? Math.round(((currentMrp - currentPrice) / currentMrp) * 100) : 0);
  const currentSavings = Math.max(0, currentMrp - currentPrice);

  const images = product.images && product.images.length > 0
    ? product.images
    : ['https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1000&auto=format&fit=crop&q=80'];

  const handleAddToCart = () => {
    addToCart(product, quantity, currentPack.weight);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, currentPack.weight);
    router.push('/checkout');
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeStatus(`Available! Standard delivery to ${pincode} in 2–3 business days.`);
    } else {
      setPincodeStatus('Please enter a valid 6-digit Indian PIN code.');
    }
  };

  // Related products from same category
  const relatedProducts = useMemo(() => {
    return staticProducts
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  return (
    <div className="min-h-screen bg-spice-ivory pb-24">
      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-spice-border py-3">
        <Container size="2xl">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-spice-taupe font-medium truncate">
            <Link href="/" className="hover:text-spice-espresso">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-spice-border-strong shrink-0" />
            <Link href="/shop" className="hover:text-spice-espresso">Shop</Link>
            <ChevronRight className="w-3.5 h-3.5 text-spice-border-strong shrink-0" />
            <Link href={`/category/${product.category}`} className="hover:text-spice-espresso capitalize">
              {product.category.replace(/-/g, ' ')}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-spice-border-strong shrink-0" />
            <span className="text-spice-espresso font-bold truncate">{product.title}</span>
          </nav>
        </Container>
      </div>

      <Container size="2xl" className="mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* =========================================================================
              LEFT COLUMN: PRODUCT IMAGE GALLERY WITH ZOOM & THUMBNAILS
          ========================================================================= */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-white border border-spice-border p-4 shadow-warm-sm group">
              {/* Badge */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 items-start pointer-events-none">
                {product.offerBadge && (
                  <span className="px-3 py-1 rounded-full bg-spice-terracotta text-white text-xs font-bold shadow-warm-xs">
                    {product.offerBadge}
                  </span>
                )}
                {product.bestSeller && (
                  <span className="px-3 py-1 rounded-full bg-spice-espresso text-white text-xs font-bold shadow-warm-xs">
                    BEST SELLER
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <div className="absolute top-4 right-4 z-10">
                <WishlistButton
                  isWishlisted={isWishlisted}
                  onClick={() => toggleWishlist(product)}
                />
              </div>

              {/* Main Image */}
              <motion.img
                key={activeImageIndex}
                initial={{ opacity: 0.6, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: LUXURY_EASE }}
                src={images[activeImageIndex] || images[0]}
                alt={product.title}
                className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-white ${
                      activeImageIndex === idx
                        ? 'border-spice-terracotta shadow-warm-xs scale-102'
                        : 'border-spice-border opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`${product.title} view ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Quality Guarantees Banner */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-spice-sand/30 rounded-2xl border border-spice-border text-center">
              <div className="flex flex-col items-center">
                <Leaf className="w-4 h-4 text-spice-cardamom mb-1" />
                <span className="text-[11px] font-bold text-spice-espresso">100% Pure</span>
                <span className="text-[9px] text-spice-taupe">Zero Preservatives</span>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-4 h-4 text-spice-terracotta mb-1" />
                <span className="text-[11px] font-bold text-spice-espresso">24 Lab Tests</span>
                <span className="text-[9px] text-spice-taupe">FSSAI Certified</span>
              </div>
              <div className="flex flex-col items-center">
                <Truck className="w-4 h-4 text-spice-turmeric mb-1" />
                <span className="text-[11px] font-bold text-spice-espresso">Fast Shipping</span>
                <span className="text-[9px] text-spice-taupe">Pan-India Dispatch</span>
              </div>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: PRODUCT DETAILS, PACK SIZES, PRICING & CTAS
          ========================================================================= */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Brand & Category */}
              <div className="flex items-center justify-between gap-2 text-xs font-semibold text-spice-taupe mb-2">
                <span className="text-spice-cardamom font-bold uppercase tracking-wider">
                  {product.brand || 'AAXOL'} • {product.origin || 'India'}
                </span>
                <span className="capitalize">{product.category.replace(/-/g, ' ')}</span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-spice-espresso tracking-tight leading-tight mb-2">
                {product.title}
              </h1>

              {/* Flavour & Aroma Tagline */}
              {product.flavourProfile && (
                <p className="text-sm font-medium text-spice-terracotta italic mb-3">
                  "{product.flavourProfile}"
                </p>
              )}

              {/* Rating & Review Count */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60 text-amber-700 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{product.rating || 4.8}</span>
                </div>
                <span className="text-xs text-spice-taupe">
                  Based on <strong>{product.reviewCount || 42}</strong> verified customer reviews
                </span>
                <span className="text-xs text-spice-cardamom font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> In Stock
                </span>
              </div>

              {/* Price & Savings Display */}
              <div className="bg-spice-sand/20 rounded-2xl p-4 border border-spice-border mb-6">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-3xl sm:text-4xl font-bold text-spice-espresso">
                    {formatCurrency(currentPrice)}
                  </span>
                  {currentMrp > currentPrice && (
                    <span className="text-base sm:text-lg text-spice-taupe line-through">
                      {formatCurrency(currentMrp)}
                    </span>
                  )}
                  {currentDiscount > 0 && (
                    <span className="px-2.5 py-1 rounded-md bg-spice-terracotta text-white text-xs font-bold">
                      {currentDiscount}% OFF
                    </span>
                  )}
                </div>

                {currentSavings > 0 && (
                  <p className="text-xs font-bold text-spice-cardamom mt-1.5">
                    🎉 You save {formatCurrency(currentSavings)} on this {currentPack.weight} pack. (Inclusive of all taxes)
                  </p>
                )}
              </div>

              {/* Pack Size Selector */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold text-spice-espresso uppercase tracking-wider">
                    Select Pack Size / Weight:
                  </span>
                  <span className="text-xs text-spice-taupe">
                    Selected: <strong className="text-spice-espresso">{currentPack.weight}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {packSizes.map((pack, idx) => (
                    <button
                      key={pack.weight}
                      type="button"
                      onClick={() => setSelectedPackIndex(idx)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        selectedPackIndex === idx
                          ? 'border-spice-espresso bg-spice-espresso text-white shadow-warm-xs'
                          : 'border-spice-border bg-white text-spice-espresso hover:border-spice-terracotta'
                      }`}
                    >
                      <span className="block font-bold text-sm">{pack.weight}</span>
                      <span className={`block text-xs mt-0.5 ${selectedPackIndex === idx ? 'text-spice-sand' : 'text-spice-taupe'}`}>
                        {formatCurrency(pack.price)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-6">
                {/* Quantity Control */}
                <div className="flex items-center justify-between border border-spice-border bg-white rounded-xl px-3 py-2 sm:w-32">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-lg font-bold text-spice-taupe hover:text-spice-espresso w-6 text-center"
                  >
                    -
                  </button>
                  <span className="font-bold text-sm text-spice-espresso">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-lg font-bold text-spice-taupe hover:text-spice-espresso w-6 text-center"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <AddToCartButton
                  onAdd={handleAddToCart}
                  className="flex-1 py-3 text-sm font-bold"
                />

                {/* Buy Now Button */}
                <Button
                  variant="secondary"
                  size="md"
                  onClick={handleBuyNow}
                  className="py-3 px-6 text-sm font-bold shrink-0"
                >
                  Buy Now
                </Button>
              </div>

              {/* Pincode Delivery Checker */}
              <div className="p-4 bg-white rounded-2xl border border-spice-border mb-6">
                <div className="flex items-center gap-2 text-xs font-bold text-spice-espresso mb-2">
                  <MapPin className="w-4 h-4 text-spice-terracotta" />
                  <span>Check Delivery Timelines &amp; COD Availability</span>
                </div>
                <form onSubmit={handleCheckPincode} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter 6-digit Pincode (e.g. 302001)"
                    className="flex-1 px-3 py-2 rounded-xl border border-spice-border text-xs focus:outline-none focus:border-spice-terracotta"
                  />
                  <Button type="submit" variant="outline" size="sm">
                    Check
                  </Button>
                </form>
                {pincodeStatus && (
                  <p className="text-xs font-semibold text-spice-cardamom mt-2">
                    {pincodeStatus}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            RICH ACCORDION / TABBED INFORMATION SECTION
        ========================================================================= */}
        <div className="mt-14 bg-white rounded-3xl border border-spice-border p-6 sm:p-8 shadow-warm-xs">
          {/* Tab Navigation */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-spice-border">
            {[
              { id: 'about', label: 'About the Spice' },
              { id: 'ingredients', label: 'Ingredients & Origin' },
              { id: 'usage', label: 'How to Use & Pairings' },
              { id: 'nutrition', label: 'Nutritional Values' },
              { id: 'reviews', label: `Reviews (${product.reviewCount || 42})` },
              { id: 'faqs', label: 'FAQs' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-spice-espresso text-white shadow-warm-xs'
                    : 'text-spice-taupe hover:bg-spice-sand/50 hover:text-spice-espresso'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="pt-6">
            {activeTab === 'about' && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="font-serif font-bold text-xl text-spice-espresso">
                  The Story Behind {product.title}
                </h3>
                <p className="text-sm text-spice-taupe leading-relaxed">
                  {product.description}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                  <div className="p-3.5 bg-spice-sand/20 rounded-xl border border-spice-border">
                    <span className="text-[11px] font-bold text-spice-taupe block uppercase">Spice Level</span>
                    <span className="text-sm font-bold text-spice-espresso">{product.spiceLevel || 'Medium'}</span>
                  </div>
                  <div className="p-3.5 bg-spice-sand/20 rounded-xl border border-spice-border">
                    <span className="text-[11px] font-bold text-spice-taupe block uppercase">Shelf Life</span>
                    <span className="text-sm font-bold text-spice-espresso">{product.shelfLife || '12 Months'}</span>
                  </div>
                  <div className="p-3.5 bg-spice-sand/20 rounded-xl border border-spice-border">
                    <span className="text-[11px] font-bold text-spice-taupe block uppercase">Storage</span>
                    <span className="text-sm font-bold text-spice-espresso">{product.storage || 'Airtight container'}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="font-serif font-bold text-xl text-spice-espresso">
                  100% Pure Natural Ingredients
                </h3>
                <p className="text-sm text-spice-taupe">
                  Every batch is formulated from authentic Indian harvests with zero adulterants or additives:
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ing, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg bg-spice-sand/40 border border-spice-border text-xs font-semibold text-spice-espresso">
                      🌿 {ing}
                    </span>
                  ))}
                </div>

                <div className="mt-4 p-4 bg-spice-cardamom-50 rounded-xl border border-spice-cardamom-200 text-xs text-spice-cardamom font-medium">
                  <strong>FSSAI License:</strong> {product.fssaiInformation?.licenseNumber || '10022011000492'} | Country of Origin: {product.countryOfOrigin || 'India'}
                </div>
              </div>
            )}

            {activeTab === 'usage' && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="font-serif font-bold text-xl text-spice-espresso">
                  Culinary Suggestions &amp; Best Pairings
                </h3>
                <p className="text-sm text-spice-taupe leading-relaxed">
                  {product.usage || 'Add during tempering (tadka) or mix directly into simmering curries, gravies, and marinades.'}
                </p>
                {product.bestFor && product.bestFor.length > 0 && (
                  <div>
                    <span className="text-xs font-bold text-spice-espresso uppercase block mb-2">
                      Best Paired With:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {product.bestFor.map((item, i) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-spice-peach/40 text-spice-terracotta text-xs font-bold">
                          ✨ {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'nutrition' && (
              <div className="max-w-2xl space-y-4">
                <h3 className="font-serif font-bold text-xl text-spice-espresso">
                  Nutritional Facts (Per 100g)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-spice-sand/30 rounded-xl border border-spice-border">
                    <span className="text-[11px] text-spice-taupe">Energy</span>
                    <span className="text-sm font-bold text-spice-espresso block">{product.nutritionalInformation?.energyKcal || 340} kcal</span>
                  </div>
                  <div className="p-3 bg-spice-sand/30 rounded-xl border border-spice-border">
                    <span className="text-[11px] text-spice-taupe">Protein</span>
                    <span className="text-sm font-bold text-spice-espresso block">{product.nutritionalInformation?.proteinG || 12} g</span>
                  </div>
                  <div className="p-3 bg-spice-sand/30 rounded-xl border border-spice-border">
                    <span className="text-[11px] text-spice-taupe">Carbohydrates</span>
                    <span className="text-sm font-bold text-spice-espresso block">{product.nutritionalInformation?.carbohydratesG || 55} g</span>
                  </div>
                  <div className="p-3 bg-spice-sand/30 rounded-xl border border-spice-border">
                    <span className="text-[11px] text-spice-taupe">Dietary Fibre</span>
                    <span className="text-sm font-bold text-spice-espresso block">21 g</span>
                  </div>
                  <div className="p-3 bg-spice-sand/30 rounded-xl border border-spice-border">
                    <span className="text-[11px] text-spice-taupe">Fat</span>
                    <span className="text-sm font-bold text-spice-espresso block">{product.nutritionalInformation?.fatG || 8} g</span>
                  </div>
                  <div className="p-3 bg-spice-sand/30 rounded-xl border border-spice-border">
                    <span className="text-[11px] text-spice-taupe">Sodium</span>
                    <span className="text-sm font-bold text-spice-espresso block">{product.nutritionalInformation?.sodiumMg || 30} mg</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-xl text-spice-espresso">
                    Customer Testimonials
                  </h3>
                  <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{product.rating || 4.8} / 5.0 Rating</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {staticCustomerReviews.slice(0, 4).map((rev) => (
                    <div key={rev.id} className="p-4 rounded-2xl bg-spice-sand/20 border border-spice-border">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-xs text-spice-espresso">{rev.name} ({rev.city})</span>
                        <div className="flex text-amber-500 text-xs">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                      </div>
                      <h5 className="font-bold text-xs text-spice-espresso mb-1">"{rev.title}"</h5>
                      <p className="text-xs text-spice-taupe">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'faqs' && (
              <div className="space-y-3 max-w-3xl">
                {staticFAQs.slice(0, 4).map((faq) => (
                  <div key={faq.id} className="p-4 rounded-xl bg-spice-sand/20 border border-spice-border">
                    <h4 className="font-serif font-bold text-sm text-spice-espresso mb-1">{faq.question}</h4>
                    <p className="text-xs text-spice-taupe leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* =========================================================================
            RELATED PRODUCTS
        ========================================================================= */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-spice-espresso">
                  Complete Your Spice Shelf
                </h3>
                <p className="text-xs sm:text-sm text-spice-taupe">
                  Pair with complementary single-origin aromatics and masalas.
                </p>
              </div>
              <Link href="/shop" className="text-xs font-bold text-spice-terracotta hover:underline">
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4 md:gap-5">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            RECENTLY VIEWED SPICES
        ========================================================================= */}
        {recentlyViewed.length > 1 && (
          <div className="mt-16 pt-10 border-t border-spice-border">
            <h3 className="font-serif font-bold text-lg sm:text-xl text-spice-espresso mb-4">
              Recently Viewed Spices
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {recentlyViewed.filter(p => p.id !== product.id).slice(0, 6).map((p) => (
                <ProductCard key={p.id} product={p} showFlavourNote={false} />
              ))}
            </div>
          </div>
        )}
      </Container>

      {/* =========================================================================
          MOBILE STICKY ADD TO CART BAR
      ========================================================================= */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-spice-border p-3 shadow-warm-lg flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-spice-taupe block font-medium">
            {currentPack.weight} Pack
          </span>
          <span className="text-base font-bold text-spice-espresso">
            {formatCurrency(currentPrice)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <AddToCartButton
            onAdd={handleAddToCart}
            className="py-2.5 px-4 text-xs font-bold"
          />
          <Button
            variant="secondary"
            size="sm"
            onClick={handleBuyNow}
            className="py-2.5 px-4 text-xs font-bold"
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}
