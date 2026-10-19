'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/context/StoreContext';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Truck,
  Tag,
  CheckCircle2,
} from 'lucide-react';
import { ShimmerImage } from '../animations/Motion';
import { formatCurrency } from '@/utils/currency';
import { LUXURY_EASE } from '../animations/Motion';

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    cartCount,
    appliedCoupon,
    couponDiscount,
    couponMessage,
    shippingFee,
    freeShippingThreshold,
    amountForFreeShipping,
    cartFinalTotal,
    applyCoupon,
    removeCoupon,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);

  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const isFreeShipping = shippingFee === 0 && cart.length > 0;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    setCouponSuccess(null);

    if (!couponInput.trim()) {
      setCouponError('Please enter a coupon code.');
      return;
    }

    const res = applyCoupon(couponInput);
    if (res.isValid) {
      setCouponSuccess(res.message);
      setCouponInput('');
    } else {
      setCouponError(res.message);
    }
  };

  const handleRemove = () => {
    removeCoupon();
    setCouponSuccess(null);
    setCouponError(null);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 bg-spice-espresso/50 backdrop-blur-sm"
          />

          {/* Slide-over panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.38, ease: LUXURY_EASE }}
              className="w-screen max-w-md bg-spice-ivory shadow-warm-xl border-l border-spice-border flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-5 border-b border-spice-border bg-spice-white/80 backdrop-blur-sm flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-spice-peach text-spice-terracotta flex items-center justify-center font-bold">
                    <ShoppingBag className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h2 className="font-serif font-bold text-lg text-spice-espresso leading-tight">
                      Equipment &amp; Reagents Cart
                    </h2>
                    <span className="text-xs text-spice-taupe">
                      {cartCount} {cartCount === 1 ? 'item' : 'items'} selected
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closeCart}
                  aria-label="Close cart"
                  className="p-1.5 rounded-full text-spice-taupe hover:text-spice-espresso hover:bg-spice-sand transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress Strip */}
              <div className="px-5 py-3 bg-spice-cardamom-50 border-b border-spice-cardamom-200/60">
                <div className="flex items-center justify-between text-xs text-spice-cardamom font-medium mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5" />
                    {isFreeShipping
                      ? 'You have unlocked Free Express Shipping Across Rajasthan! 🎉'
                      : `Add ${formatCurrency(amountForFreeShipping)} more for FREE Rajasthan Delivery`}
                  </span>
                  <span className="font-bold">{progressPercent}%</span>
                </div>
                <div className="w-full h-1.5 bg-spice-cardamom-200/50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="h-full bg-spice-cardamom rounded-full"
                  />
                </div>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-spice-sand flex items-center justify-center text-spice-taupe mb-4">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <h3 className="font-serif font-bold text-lg text-spice-espresso">
                      Your inquiry cart is empty
                    </h3>
                    <p className="text-xs text-spice-taupe mt-1 max-w-xs">
                      Browse diagnostic analyzers, clinical reagents, microscopes, and laboratory consumables.
                    </p>
                    <button
                      onClick={closeCart}
                      className="mt-6 px-5 py-2.5 rounded-spice-button bg-spice-terracotta text-white font-medium text-xs hover:bg-spice-terracotta-600 transition-colors shadow-warm-sm"
                    >
                      Browse Lab Equipment
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <motion.div
                      key={item.id || `${item.productId}-${item.selectedPackSize}`}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="p-3.5 rounded-spice-card bg-spice-white border border-spice-border flex gap-3.5 shadow-warm-xs"
                    >
                      <div className="w-18 h-18 rounded-spice-input overflow-hidden relative shrink-0 border border-spice-border">
                        <ShimmerImage src={item.image} alt={item.title} fill className="w-full h-full" />
                      </div>

                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-xs font-semibold text-spice-espresso line-clamp-2 leading-snug">
                              {item.title}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.productId || item.id || '', item.selectedPackSize)}
                              aria-label="Remove item"
                              className="text-spice-taupe/60 hover:text-spice-terracotta transition-colors p-0.5 shrink-0"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="text-[11px] text-spice-taupe block mt-0.5">{item.selectedPackSize || item.weight}</span>
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-spice-border/60">
                          <div className="flex items-center border border-spice-border rounded-lg bg-spice-ivory">
                            <button
                              onClick={() => updateQuantity(item.productId || item.id || '', item.selectedPackSize, item.quantity - 1)}
                              aria-label="Decrease quantity"
                              className="p-1 hover:text-spice-terracotta text-spice-espresso"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold px-2 text-spice-espresso">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.productId || item.id || '', item.selectedPackSize, item.quantity + 1)}
                              aria-label="Increase quantity"
                              className="p-1 hover:text-spice-terracotta text-spice-espresso"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-right">
                            <span className="text-xs font-bold text-spice-terracotta font-serif">
                              {formatCurrency(item.unitPrice * item.quantity)}
                            </span>
                            {item.mrp > item.unitPrice && (
                              <span className="text-[10px] text-spice-taupe/60 line-through block">
                                {formatCurrency(item.mrp * item.quantity)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Bottom Summary & Checkout */}
              {cart.length > 0 && (
                <div className="p-5 border-t border-spice-border bg-spice-white/95 space-y-3.5">
                  {/* Coupon Application / Active Badge */}
                  {appliedCoupon ? (
                    <div className="p-3 rounded-2xl bg-spice-cardamom-50 border border-spice-cardamom-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-spice-cardamom shrink-0" />
                        <div>
                          <span className="text-xs font-mono font-bold text-spice-cardamom block">
                            {appliedCoupon} APPLIED
                          </span>
                          <span className="text-[10px] text-spice-cardamom/90">
                            {appliedCoupon === 'FREESHIP'
                              ? 'Free Express Shipping active'
                              : `Saved ${formatCurrency(couponDiscount)} on this order`}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemove}
                        className="p-1 text-spice-cardamom hover:text-spice-terracotta transition-colors"
                        title="Remove coupon"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApply} className="space-y-1.5">
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Tag className="w-3.5 h-3.5 text-spice-taupe absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            placeholder="Promo Code (SPICE10, WELCOME15)"
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value)}
                            className="w-full pl-8 pr-3 py-1.5 rounded-spice-input bg-spice-ivory border border-spice-border text-xs text-spice-espresso placeholder:text-spice-taupe/70 focus:outline-none focus:border-spice-terracotta uppercase font-mono"
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-3.5 py-1.5 rounded-spice-button bg-spice-sand text-spice-espresso text-xs font-semibold hover:bg-spice-peach hover:text-spice-terracotta transition-colors border border-spice-border"
                        >
                          Apply
                        </button>
                      </div>
                      {couponError && <p className="text-[10px] text-spice-terracotta font-medium">{couponError}</p>}
                      {couponSuccess && <p className="text-[10px] text-spice-cardamom font-medium">{couponSuccess}</p>}
                    </form>
                  )}

                  {/* Pricing Breakdown */}
                  <div className="space-y-1.5 text-xs text-spice-taupe pt-2 border-t border-spice-border/70">
                    <div className="flex justify-between">
                      <span>Bag Subtotal</span>
                      <span className="font-semibold text-spice-espresso">{formatCurrency(cartSubtotal)}</span>
                    </div>

                    {couponDiscount > 0 && (
                      <div className="flex justify-between text-spice-cardamom font-semibold">
                        <span>Coupon Savings ({appliedCoupon})</span>
                        <span>- {formatCurrency(couponDiscount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Shipping Fee</span>
                      <span className="font-medium text-spice-cardamom">
                        {shippingFee === 0 ? 'FREE' : formatCurrency(shippingFee)}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm font-bold text-spice-espresso pt-2 border-t border-spice-border">
                      <span>Total Amount</span>
                      <span className="text-base text-spice-terracotta font-serif">
                        {formatCurrency(cartFinalTotal)}
                      </span>
                    </div>
                  </div>

                  {/* Checkout CTA */}
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-spice-button bg-spice-terracotta text-white font-semibold text-sm hover:bg-spice-terracotta-600 transition-all shadow-terracotta-glow group"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-spice-taupe text-center">
                    <ShieldCheck className="w-3.5 h-3.5 text-spice-cardamom" />
                    <span>256-Bit Encrypted Checkout • UPI • Cards • COD</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
