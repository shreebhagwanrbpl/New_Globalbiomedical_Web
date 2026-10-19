'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Product, PackSizeOption } from '@/types/product';
import { useStore } from '@/context/StoreContext';
import { formatCurrency } from '@/utils/currency';
import { WishlistButton, AddToCartButton, LUXURY_EASE } from '@/components/animations/Motion';
import { Star, ShieldCheck, Flame, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  className?: string;
  showFlavourNote?: boolean;
}

const FALLBACK_SPICE_IMAGE = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop&q=80';

export function ProductCard({ product, className = '', showFlavourNote = true }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const isWishlisted = isInWishlist(product.id);
  const [imgSrc, setImgSrc] = useState(
    product.images && product.images[0] ? product.images[0] : FALLBACK_SPICE_IMAGE
  );

  // Pack size state
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

  const currentPrice = currentPack.price;
  const currentMrp = currentPack.mrp;
  const currentDiscount = currentPack.discountPercentage || (currentMrp > currentPrice ? Math.round(((currentMrp - currentPrice) / currentMrp) * 100) : 0);
  const currentSavings = Math.max(0, currentMrp - currentPrice);

  const handleQuickAdd = () => {
    addToCart(product, 1, currentPack.weight);
  };

  const badgeText = product.offerBadge || (product.bestSeller ? 'BEST SELLER' : product.newArrival ? 'NEW' : currentDiscount > 0 ? `${currentDiscount}% OFF` : null);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: LUXURY_EASE }}
      className={`group relative flex flex-col justify-between h-full w-full bg-white rounded-2xl border border-spice-border hover:border-spice-border-strong p-3.5 sm:p-4 shadow-warm-xs hover:shadow-warm-md transition-shadow duration-300 ${className}`}
    >
      {/* Top Image Section */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-spice-sand/20 mb-3 shrink-0">
        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start pointer-events-none">
          {badgeText && (
            <span className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold tracking-wide shadow-warm-xs ${
              product.bestSeller
                ? 'bg-spice-terracotta text-white'
                : product.newArrival
                ? 'bg-spice-cardamom text-white'
                : 'bg-spice-turmeric text-spice-espresso'
            }`}>
              {badgeText}
            </span>
          )}
          {product.spiceLevel && product.spiceLevel !== 'None' && (
            <span className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white/90 backdrop-blur-xs text-[9px] font-semibold text-spice-espresso border border-spice-border/60">
              <Flame className="w-2.5 h-2.5 text-spice-terracotta" />
              {product.spiceLevel}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <WishlistButton
            isWishlisted={isWishlisted}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product);
            }}
          />
        </div>

        {/* Clickable Product Image with Fallback and Zoom */}
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={imgSrc}
            alt={product.title}
            loading="lazy"
            onError={() => setImgSrc(FALLBACK_SPICE_IMAGE)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </Link>
      </div>

      {/* Info Section - Flex Grow & Equal Vertical Grid Segments */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          {/* Category & Origin Row (Fixed Height) */}
          <div className="flex items-center justify-between gap-1 text-[11px] text-spice-taupe font-medium h-4">
            <span className="capitalize truncate">{product.category.replace(/-/g, ' ')}</span>
            {product.origin ? (
              <span className="text-[10px] text-spice-cardamom font-semibold truncate max-w-[100px]">
                {product.origin.split(',')[0]}
              </span>
            ) : (
              <span className="text-[10px] text-spice-cardamom font-semibold">Single Origin</span>
            )}
          </div>

          {/* Product Title (Fixed 2-Line Height Container) */}
          <div className="h-10 sm:h-11 flex items-start">
            <Link href={`/product/${product.slug}`} className="block group-hover:text-spice-terracotta transition-colors duration-200">
              <h3 className="font-serif font-bold text-xs sm:text-sm md:text-base text-spice-espresso leading-snug line-clamp-2">
                {product.title}
              </h3>
            </Link>
          </div>

          {/* Flavour Profile / Descriptor (Fixed Height) */}
          <div className="h-4 flex items-center">
            {showFlavourNote && (product.flavourProfile || product.shortDescription) ? (
              <p className="text-[10px] sm:text-xs text-spice-taupe/90 truncate">
                {product.flavourProfile || product.shortDescription}
              </p>
            ) : (
              <span className="text-[10px] text-spice-cardamom font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-spice-cardamom" /> 100% Pure Stone Ground
              </span>
            )}
          </div>

          {/* Rating (Fixed Height) */}
          <div className="h-5 flex items-center gap-1">
            <div className="flex items-center text-amber-500 text-xs">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-bold text-spice-espresso">
              {product.rating || 4.8}
            </span>
            <span className="text-[10px] text-spice-taupe">
              ({product.reviewCount || 42})
            </span>
          </div>

          {/* Pack Size Selector (Pills with Consistent Fixed Height) */}
          <div className="h-7 sm:h-8 flex items-center gap-1 overflow-x-auto no-scrollbar pt-0.5">
            {packSizes.map((pack, idx) => (
              <button
                key={pack.weight}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedPackIndex(idx);
                }}
                className={`px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-semibold whitespace-nowrap transition-all shrink-0 ${
                  selectedPackIndex === idx
                    ? 'bg-spice-espresso text-white shadow-warm-xs'
                    : 'bg-spice-sand/50 text-spice-taupe hover:bg-spice-sand hover:text-spice-espresso'
                }`}
              >
                {pack.weight}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing and Action Footer (Pinned to bottom of card) */}
        <div className="pt-2.5 border-t border-spice-border/60 mt-2.5">
          <div className="flex items-center justify-between gap-1 h-6 mb-2">
            <div className="flex items-baseline gap-1.5 truncate">
              <span className="text-base sm:text-lg font-bold text-spice-espresso">
                {formatCurrency(currentPrice)}
              </span>
              {currentMrp > currentPrice && (
                <span className="text-xs text-spice-taupe line-through">
                  {formatCurrency(currentMrp)}
                </span>
              )}
            </div>

            {currentSavings > 0 && (
              <span className="text-[10px] sm:text-[11px] font-bold text-spice-cardamom bg-spice-cardamom-50 px-1.5 py-0.5 rounded shrink-0">
                Save {formatCurrency(currentSavings)}
              </span>
            )}
          </div>

          {/* Quick Add CTA */}
          <AddToCartButton
            onAdd={handleQuickAdd}
            className="w-full text-xs sm:text-sm py-2"
          />
        </div>
      </div>
    </motion.div>
  );
}
