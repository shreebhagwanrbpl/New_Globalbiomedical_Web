'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Product, PackSizeOption } from '@/types/product';
import { useStore } from '@/context/StoreContext';
import { formatCurrency } from '@/utils/currency';
import { WishlistButton, AddToCartButton, LUXURY_EASE } from '@/components/animations/Motion';
import { Star, ShieldCheck, Award, FileText, ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  className?: string;
  showFlavourNote?: boolean;
}

const FALLBACK_BIOMEDICAL_IMAGE = 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80';

export function ProductCard({ product, className = '', showFlavourNote = true }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const isWishlisted = isInWishlist(product.id);
  const [imgSrc, setImgSrc] = useState(
    product.images && product.images[0] ? product.images[0] : FALLBACK_BIOMEDICAL_IMAGE
  );

  // Pack size state
  const packSizes: PackSizeOption[] = product.packSizes && product.packSizes.length > 0
    ? product.packSizes
    : [
        {
          weight: product.weight || 'Standard Unit',
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

  const badgeText = product.offerBadge || (product.bestSeller ? 'HOSPITAL GRADE' : product.newArrival ? 'NEW MODEL' : currentDiscount > 0 ? `${currentDiscount}% OFF` : null);

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2, ease: LUXURY_EASE }}
      className={`group relative flex flex-col justify-between h-full w-full bg-white rounded-2xl border border-slate-200/90 hover:border-red-500/70 p-3 sm:p-3.5 shadow-xs hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 ${className}`}
    >
      {/* Top Image Section (Compact 4:3 Ratio) */}
      <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-slate-100 mb-2.5 shrink-0">
        {/* Badges */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1 items-start pointer-events-none">
          {badgeText && (
            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide shadow-xs ${
              product.bestSeller
                ? 'bg-red-600 text-white'
                : product.newArrival
                ? 'bg-slate-900 text-white'
                : 'bg-emerald-600 text-white'
            }`}>
              {badgeText}
            </span>
          )}
          {product.spiceLevel && (
            <span className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white/95 backdrop-blur-xs text-[9px] font-bold text-slate-700 border border-slate-200 shadow-xs">
              <Award className="w-2.5 h-2.5 text-red-600" />
              {product.spiceLevel}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <div className="absolute top-2 right-2 z-10">
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
            onError={() => setImgSrc(FALLBACK_BIOMEDICAL_IMAGE)}
            className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500 ease-out"
          />
        </Link>
      </div>

      {/* Info Section - Flex Grow & Balanced Vertical Segments */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          {/* Category & Origin Row */}
          <div className="flex items-center justify-between gap-1 text-[11px] text-slate-500 font-medium h-4">
            <span className="capitalize truncate text-slate-500 font-semibold">{product.category.replace(/-/g, ' ')}</span>
            {product.origin ? (
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200/50 truncate max-w-[110px]">
                {product.origin.split(',')[0]}
              </span>
            ) : (
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200/50">
                ISO 13485
              </span>
            )}
          </div>

          {/* Product Title (2-Line Height Container) */}
          <div className="min-h-[2.5rem] flex items-start">
            <Link href={`/product/${product.slug}`} className="block group-hover:text-red-600 transition-colors duration-200">
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug line-clamp-2">
                {product.title}
              </h3>
            </Link>
          </div>

          {/* Clinical Highlights / Descriptor */}
          <div className="h-4 flex items-center">
            {showFlavourNote && (product.flavourProfile || product.shortDescription) ? (
              <p className="text-[10.5px] text-slate-500 truncate">
                {product.flavourProfile || product.shortDescription}
              </p>
            ) : (
              <span className="text-[10.5px] text-emerald-700 font-medium flex items-center gap-1 truncate">
                <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                <span className="truncate">NABL Calibrated • CDSCO Compliant</span>
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="h-4 flex items-center gap-1">
            <div className="flex items-center text-amber-500 text-xs">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-bold text-slate-800">
              {product.rating || 4.9}
            </span>
            <span className="text-[10px] text-slate-400">
              ({product.reviewCount || 42} labs)
            </span>
          </div>

          {/* Pack Size / Variant Selector (Compact Pills) */}
          <div className="h-6 sm:h-7 flex items-center gap-1 overflow-x-auto no-scrollbar pt-0.5">
            {packSizes.map((pack, idx) => (
              <button
                key={pack.weight}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedPackIndex(idx);
                }}
                className={`px-1.5 sm:px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-semibold whitespace-nowrap transition-all shrink-0 ${
                  selectedPackIndex === idx
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {pack.weight}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing and Action Footer */}
        <div className="pt-2 border-t border-slate-100 mt-2">
          {/* Blurred Price Container */}
          <div className="relative mb-2.5 overflow-hidden rounded-xl bg-slate-50/90 p-2 border border-slate-200/90">
            {/* The actual figures are deeply blurred */}
            <div className="flex items-center justify-between gap-1 filter blur-[8px] select-none pointer-events-none opacity-50">
              <div className="flex items-baseline gap-1.5 truncate">
                <span className="text-sm sm:text-base font-extrabold text-slate-900">
                  {formatCurrency(currentPrice)}
                </span>
                {currentMrp > currentPrice && (
                  <span className="text-[11px] sm:text-xs text-slate-400 line-through">
                    {formatCurrency(currentMrp)}
                  </span>
                )}
              </div>

              {currentSavings > 0 && (
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-1.5 py-0.5 rounded shrink-0">
                  Save {formatCurrency(currentSavings)}
                </span>
              )}
            </div>

            {/* Crisp Confidential Overlay Badge */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[10.5px] font-bold shadow-xs tracking-wide">
                <span>🔒 Rate on Quotation</span>
              </span>
            </div>
          </div>

          {/* Get Quote Action Button -> Navigates into PDP Page */}
          <Link
            href={`/product/${product.slug}?quote=open`}
            className="w-full text-xs font-bold py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-1.5 shadow-xs transition-all hover:shadow-md group/btn"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Get Official Quote</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
