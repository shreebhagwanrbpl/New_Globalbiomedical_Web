'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Button } from '@/components/common';
import { useStore } from '@/context/StoreContext';
import { formatCurrency } from '@/utils/currency';
import { staticCoupons, validateCoupon } from '@/data/coupons';
import {
  ShoppingBag,
  Trash2,
  Heart,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  Tag,
  Check,
  X,
} from 'lucide-react';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartTotalDiscount,
    cartItemCount,
    appliedCoupon,
    couponDiscount,
    applyCoupon,
    removeCoupon,
    freeShippingThreshold,
    amountForFreeShipping,
    shippingFee,
    cartFinalTotal,
    toggleWishlist,
    isInWishlist,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    setCouponSuccess(null);

    if (!couponInput.trim()) {
      setCouponError('Please enter a coupon code.');
      return;
    }

    const res = validateCoupon(couponInput, cartSubtotal);
    if (res.isValid && res.coupon) {
      applyCoupon(res.coupon.code, res.discountAmount);
      setCouponSuccess(res.message);
      setCouponInput('');
    } else {
      setCouponError(res.message);
    }
  };

  const isFreeShipping = amountForFreeShipping <= 0;
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] bg-spice-ivory flex items-center justify-center py-16">
        <Container size="md">
          <div className="bg-white rounded-3xl border border-spice-border p-8 sm:p-12 text-center shadow-warm-xs">
            <div className="w-20 h-20 rounded-full bg-spice-sand/50 text-spice-taupe flex items-center justify-center mx-auto mb-5">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-spice-espresso mb-2">
              Your Spice Shelf is Empty
            </h1>
            <p className="text-sm text-spice-taupe max-w-md mx-auto mb-6">
              Looks like you haven't added any fresh single-origin spices or artisanal masalas to your cart yet.
            </p>
            <Link href="/shop">
              <Button variant="primary" size="lg" showArrow className="shadow-terracotta-glow">
                Explore Fresh Spices
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
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-spice-cardamom uppercase tracking-wider">
                SHOPPING CART
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-spice-espresso tracking-tight mt-1">
                Your Spice Selection ({cartItemCount} items)
              </h1>
            </div>
            <Link href="/shop" className="text-xs font-bold text-spice-terracotta hover:underline">
              ← Continue Shopping
            </Link>
          </div>
        </Container>
      </section>

      <Container size="2xl" className="mt-8">
        {/* Free Shipping Progress Meter */}
        <div className="bg-white rounded-2xl border border-spice-border p-4 mb-8 shadow-warm-xs">
          <div className="flex items-center justify-between text-xs sm:text-sm font-semibold mb-2">
            <span className="flex items-center gap-1.5 text-spice-espresso">
              <Truck className="w-4 h-4 text-spice-cardamom" />
              {isFreeShipping ? (
                <strong className="text-spice-cardamom">🎉 You've unlocked FREE Express Shipping!</strong>
              ) : (
                <span>
                  Add <strong className="text-spice-terracotta">{formatCurrency(amountForFreeShipping)}</strong> more to get <strong>FREE Express Pan-India Shipping</strong>
                </span>
              )}
            </span>
            <span className="text-xs text-spice-taupe">{freeShippingProgress}%</span>
          </div>
          <div className="w-full h-2 bg-spice-sand/60 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isFreeShipping ? 'bg-spice-cardamom' : 'bg-spice-terracotta'
              }`}
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* =========================================================================
              CART ITEMS LIST (Left Column)
          ========================================================================= */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-3xl border border-spice-border p-4 sm:p-6 shadow-warm-xs">
              <div className="space-y-4 divide-y divide-spice-border/60">
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div
                      key={`${item.productId}-${item.selectedPackSize}`}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="pt-4 first:pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      {/* Product Image & Info */}
                      <div className="flex items-center gap-4 min-w-0 flex-1">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-spice-sand/30 border border-spice-border shrink-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <Link
                            href={`/product/${item.slug}`}
                            className="font-serif font-bold text-sm sm:text-base text-spice-espresso hover:text-spice-terracotta transition-colors line-clamp-1"
                          >
                            {item.title}
                          </Link>
                          <div className="flex items-center gap-2 text-xs text-spice-taupe mt-0.5">
                            <span className="font-semibold text-spice-espresso bg-spice-sand/40 px-2 py-0.5 rounded">
                              Pack: {item.selectedPackSize}
                            </span>
                            <span>•</span>
                            <span>{formatCurrency(item.unitPrice)} each</span>
                          </div>

                          <div className="sm:hidden mt-2 flex items-baseline gap-2">
                            <span className="font-bold text-sm text-spice-espresso">
                              {formatCurrency(item.totalPrice)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Quantity Selector & Item Total */}
                      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 sm:gap-6">
                        <div className="flex items-center border border-spice-border rounded-xl bg-spice-sand/20 px-2.5 py-1">
                          <button
                            onClick={() => updateQuantity(item.productId, item.selectedPackSize, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center font-bold text-spice-taupe hover:text-spice-espresso"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-xs sm:text-sm font-bold text-spice-espresso">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.selectedPackSize, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center font-bold text-spice-taupe hover:text-spice-espresso"
                          >
                            +
                          </button>
                        </div>

                        <div className="hidden sm:block text-right min-w-[80px]">
                          <span className="font-bold text-base text-spice-espresso block">
                            {formatCurrency(item.totalPrice)}
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => removeFromCart(item.productId, item.selectedPackSize)}
                            className="p-2 rounded-xl text-spice-taupe hover:text-spice-terracotta hover:bg-spice-peach/40 transition-colors"
                            title="Remove from Cart"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* =========================================================================
              ORDER SUMMARY & COUPON ENGINE (Right Column)
          ========================================================================= */}
          <div className="lg:col-span-4 space-y-6">
            {/* Coupon Box */}
            <div className="bg-white rounded-3xl border border-spice-border p-5 sm:p-6 shadow-warm-xs">
              <h3 className="font-serif font-bold text-base text-spice-espresso mb-3 flex items-center gap-2">
                <Tag className="w-4 h-4 text-spice-terracotta" /> Have a Promo Code?
              </h3>

              {appliedCoupon ? (
                <div className="p-3.5 bg-spice-cardamom-50 rounded-2xl border border-spice-cardamom-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-spice-cardamom block">
                      Code: {appliedCoupon}
                    </span>
                    <span className="text-[11px] text-spice-cardamom/90">
                      Savings of {formatCurrency(couponDiscount)} applied!
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="p-1 text-spice-cardamom hover:text-spice-terracotta"
                    title="Remove coupon"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="e.g. SPICE10 or WELCOME15"
                      className="flex-1 px-3.5 py-2.5 rounded-xl border border-spice-border text-xs uppercase font-mono tracking-wider focus:outline-none focus:border-spice-terracotta"
                    />
                    <Button type="submit" variant="primary" size="sm">
                      Apply
                    </Button>
                  </div>
                  {couponError && <p className="text-xs text-spice-terracotta font-semibold">{couponError}</p>}
                  {couponSuccess && <p className="text-xs text-spice-cardamom font-semibold">{couponSuccess}</p>}
                </form>
              )}
            </div>

            {/* Order Price Breakdown */}
            <div className="bg-white rounded-3xl border border-spice-border p-6 shadow-warm-xs space-y-4">
              <h3 className="font-serif font-bold text-lg text-spice-espresso pb-3 border-b border-spice-border">
                Order Summary
              </h3>

              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="flex items-center justify-between text-spice-taupe">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-spice-espresso">{formatCurrency(cartSubtotal)}</span>
                </div>

                {couponDiscount > 0 && (
                  <div className="flex items-center justify-between text-spice-cardamom font-semibold">
                    <span>Coupon Discount ({appliedCoupon})</span>
                    <span>- {formatCurrency(couponDiscount)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-spice-taupe">
                  <span>Estimated Shipping</span>
                  <span>
                    {isFreeShipping ? (
                      <span className="font-bold text-spice-cardamom">FREE</span>
                    ) : (
                      formatCurrency(shippingFee)
                    )}
                  </span>
                </div>

                <div className="pt-3 border-t border-spice-border flex items-baseline justify-between">
                  <div>
                    <span className="font-serif font-bold text-base text-spice-espresso block">
                      Total Payable
                    </span>
                    <span className="text-[10px] text-spice-taupe">Inclusive of all GST taxes</span>
                  </div>
                  <span className="font-serif font-bold text-2xl text-spice-espresso">
                    {formatCurrency(cartFinalTotal)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <Link href="/checkout" className="block pt-2">
                <Button variant="primary" size="lg" className="w-full shadow-terracotta-glow text-sm font-bold py-3.5">
                  Proceed to Checkout <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>

              {/* Trust Strip */}
              <div className="pt-4 border-t border-spice-border/60 text-center space-y-1">
                <div className="flex items-center justify-center gap-1 text-[11px] text-spice-cardamom font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Purity &amp; Quality Guarantee
                </div>
                <p className="text-[10px] text-spice-taupe">
                  Free 7-day replacements if seals are tampered or broken.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
