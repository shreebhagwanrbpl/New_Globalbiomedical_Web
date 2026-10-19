'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Container, Button } from '@/components/common';
import { useStore } from '@/context/StoreContext';
import { formatCurrency } from '@/utils/currency';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  QrCode,
  Banknote,
  Lock,
  ArrowRight,
  CheckCircle2,
  MapPin,
  User,
  Phone,
  Mail,
  Tag,
  X,
  Sparkles,
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    cartSubtotal,
    couponDiscount,
    appliedCoupon,
    shippingFee,
    cartFinalTotal,
    clearCart,
    applyCoupon,
    removeCoupon,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: 'Aditya Birla',
    email: 'aditya.birla@example.com',
    phone: '9876543210',
    addressLine1: '402, Royal Palms Residency, MG Road',
    addressLine2: 'Near Central Park',
    landmark: 'Opposite State Bank',
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302001',
    deliveryMethod: 'express', // express or standard
    paymentMethod: 'upi', // upi, card, or cod
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleApplyCheckoutCoupon = (e: React.FormEvent) => {
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

  const handleRemoveCheckoutCoupon = () => {
    removeCoupon();
    setCouponSuccess(null);
    setCouponError(null);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Basic Validation
    if (!formData.fullName || !formData.phone || !formData.addressLine1 || !formData.city || !formData.pincode) {
      setErrorMsg('Please complete all mandatory shipping details.');
      return;
    }

    if (formData.pincode.length !== 6) {
      setErrorMsg('Please enter a valid 6-digit Indian PIN code.');
      return;
    }

    setIsSubmitting(true);

    // Generate Demo Order ID
    const randomOrderNumber = `SPC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      orderId: randomOrderNumber,
      createdAt: new Date().toISOString(),
      items: cart,
      shippingAddress: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        addressLine1: formData.addressLine1,
        addressLine2: formData.addressLine2,
        landmark: formData.landmark,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
      },
      pricing: {
        subtotal: cartSubtotal,
        discount: couponDiscount,
        couponCode: appliedCoupon,
        shippingFee: shippingFee,
        total: cartFinalTotal,
      },
      paymentMethod: formData.paymentMethod,
      deliveryMethod: formData.deliveryMethod,
      status: 'confirmed',
    };

    // Save demo order to localStorage
    if (typeof window !== 'undefined') {
      const existingOrders = JSON.parse(localStorage.getItem('aaxol_demo_orders') || '[]');
      existingOrders.unshift(newOrder);
      localStorage.setItem('aaxol_demo_orders', JSON.stringify(existingOrders));
      localStorage.setItem('aaxol_last_order', JSON.stringify(newOrder));
    }

    setTimeout(() => {
      clearCart();
      router.push(`/order-success?orderId=${randomOrderNumber}`);
    }, 1200);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] bg-spice-ivory flex items-center justify-center py-16">
        <Container size="md">
          <div className="bg-white rounded-3xl border border-spice-border p-8 text-center">
            <h2 className="font-serif font-bold text-2xl text-spice-espresso mb-2">No Items in Cart</h2>
            <p className="text-sm text-spice-taupe mb-6">Add items to your cart before proceeding to checkout.</p>
            <Link href="/shop">
              <Button variant="primary" size="md">Go to Shop</Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-spice-ivory pb-24">
      {/* Header */}
      <section className="bg-gradient-to-b from-spice-sand/30 to-spice-ivory border-b border-spice-border py-6">
        <Container size="2xl">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-spice-cardamom uppercase tracking-wider">
                CHECKOUT PROCESS
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-spice-espresso mt-0.5">
                Complete Your Spice Order
              </h1>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-spice-cardamom bg-spice-cardamom-50 px-3 py-1.5 rounded-full border border-spice-cardamom-200">
              <Lock className="w-3.5 h-3.5" /> 256-Bit SSL Encrypted
            </div>
          </div>
        </Container>
      </section>

      <Container size="2xl" className="mt-8">
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* =========================================================================
              LEFT COLUMN: CONTACT, ADDRESS & PAYMENT SECTIONS
          ========================================================================= */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Contact Info */}
            <div className="bg-white rounded-3xl border border-spice-border p-6 shadow-warm-xs space-y-4">
              <h2 className="font-serif font-bold text-lg text-spice-espresso flex items-center gap-2">
                <User className="w-5 h-5 text-spice-terracotta" /> 1. Contact Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-spice-espresso block mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-spice-border text-xs text-spice-espresso focus:outline-none focus:border-spice-terracotta"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-spice-espresso block mb-1">Mobile Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-spice-border text-xs text-spice-espresso focus:outline-none focus:border-spice-terracotta"
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="bg-white rounded-3xl border border-spice-border p-6 shadow-warm-xs space-y-4">
              <h2 className="font-serif font-bold text-lg text-spice-espresso flex items-center gap-2">
                <MapPin className="w-5 h-5 text-spice-cardamom" /> 2. Shipping Address
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-spice-espresso block mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-spice-border text-xs text-spice-espresso focus:outline-none focus:border-spice-terracotta"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-spice-espresso block mb-1">Street Address / House No / Apartment *</label>
                  <input
                    type="text"
                    name="addressLine1"
                    required
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-spice-border text-xs text-spice-espresso focus:outline-none focus:border-spice-terracotta"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-spice-espresso block mb-1">Area / Locality</label>
                    <input
                      type="text"
                      name="addressLine2"
                      value={formData.addressLine2}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-spice-border text-xs text-spice-espresso focus:outline-none focus:border-spice-terracotta"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-spice-espresso block mb-1">Landmark</label>
                    <input
                      type="text"
                      name="landmark"
                      value={formData.landmark}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-spice-border text-xs text-spice-espresso focus:outline-none focus:border-spice-terracotta"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-bold text-spice-espresso block mb-1">City *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-spice-border text-xs text-spice-espresso focus:outline-none focus:border-spice-terracotta"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-spice-espresso block mb-1">State *</label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-spice-border text-xs text-spice-espresso focus:outline-none focus:border-spice-terracotta"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-spice-espresso block mb-1">PIN Code *</label>
                    <input
                      type="text"
                      name="pincode"
                      maxLength={6}
                      required
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-spice-border text-xs text-spice-espresso focus:outline-none focus:border-spice-terracotta"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Delivery Method */}
            <div className="bg-white rounded-3xl border border-spice-border p-6 shadow-warm-xs space-y-4">
              <h2 className="font-serif font-bold text-lg text-spice-espresso flex items-center gap-2">
                <Truck className="w-5 h-5 text-spice-turmeric" /> 3. Delivery Method
              </h2>

              <div className="space-y-3">
                <label className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  formData.deliveryMethod === 'express'
                    ? 'border-spice-espresso bg-spice-sand/30 shadow-warm-xs'
                    : 'border-spice-border bg-white'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="express"
                      checked={formData.deliveryMethod === 'express'}
                      onChange={handleInputChange}
                      className="text-spice-espresso focus:ring-spice-espresso"
                    />
                    <div>
                      <span className="font-bold text-xs text-spice-espresso block">Standard Express Pan-India</span>
                      <span className="text-[11px] text-spice-taupe">Delivered in 2 to 3 business days</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-spice-espresso">
                    {shippingFee === 0 ? <span className="text-spice-cardamom">FREE</span> : formatCurrency(shippingFee)}
                  </span>
                </label>
              </div>
            </div>

            {/* 4. Payment Method Selection (Demo) */}
            <div className="bg-white rounded-3xl border border-spice-border p-6 shadow-warm-xs space-y-4">
              <h2 className="font-serif font-bold text-lg text-spice-espresso flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-spice-terracotta" /> 4. Select Payment Method
              </h2>

              <div className="space-y-3">
                {/* UPI */}
                <label className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  formData.paymentMethod === 'upi'
                    ? 'border-spice-espresso bg-spice-sand/30 shadow-warm-xs'
                    : 'border-spice-border bg-white'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={handleInputChange}
                      className="text-spice-espresso focus:ring-spice-espresso"
                    />
                    <div>
                      <span className="font-bold text-xs text-spice-espresso block">UPI Instant Payment (Zero Surcharge)</span>
                      <span className="text-[11px] text-spice-taupe">Google Pay, PhonePe, Paytm, BHIM UPI</span>
                    </div>
                  </div>
                  <QrCode className="w-5 h-5 text-spice-cardamom" />
                </label>

                {/* Cards */}
                <label className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  formData.paymentMethod === 'card'
                    ? 'border-spice-espresso bg-spice-sand/30 shadow-warm-xs'
                    : 'border-spice-border bg-white'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                      className="text-spice-espresso focus:ring-spice-espresso"
                    />
                    <div>
                      <span className="font-bold text-xs text-spice-espresso block">Credit / Debit Cards &amp; NetBanking</span>
                      <span className="text-[11px] text-spice-taupe">Visa, MasterCard, RuPay, Amex</span>
                    </div>
                  </div>
                  <CreditCard className="w-5 h-5 text-spice-taupe" />
                </label>

                {/* COD */}
                <label className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  formData.paymentMethod === 'cod'
                    ? 'border-spice-espresso bg-spice-sand/30 shadow-warm-xs'
                    : 'border-spice-border bg-white'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="text-spice-espresso focus:ring-spice-espresso"
                    />
                    <div>
                      <span className="font-bold text-xs text-spice-espresso block">Cash on Delivery (COD)</span>
                      <span className="text-[11px] text-spice-taupe">Pay with cash or UPI upon delivery</span>
                    </div>
                  </div>
                  <Banknote className="w-5 h-5 text-spice-turmeric" />
                </label>
              </div>

              {errorMsg && (
                <p className="text-xs text-spice-terracotta font-semibold bg-spice-peach/30 p-3 rounded-xl">
                  {errorMsg}
                </p>
              )}
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: ORDER SUMMARY & PLACE ORDER BUTTON
          ========================================================================= */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-spice-border p-6 shadow-warm-xs space-y-5 sticky top-24">
              <h3 className="font-serif font-bold text-lg text-spice-espresso pb-3 border-b border-spice-border">
                Review Your Order ({cart.length} {cart.length === 1 ? 'item' : 'items'})
              </h3>

              {/* Items List Mini */}
              <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={`${item.productId}-${item.selectedPackSize}`} className="flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img src={item.image} alt={item.title} className="w-10 h-10 rounded-lg object-cover shrink-0 border border-spice-border" />
                      <div className="min-w-0">
                        <span className="font-bold text-spice-espresso block truncate">{item.title}</span>
                        <span className="text-[11px] text-spice-taupe">Qty: {item.quantity} • {item.selectedPackSize}</span>
                      </div>
                    </div>
                    <span className="font-bold text-spice-espresso shrink-0">{formatCurrency(item.unitPrice * item.quantity)}</span>
                  </div>
                ))}
              </div>

              {/* Promo Code Section */}
              <div className="pt-3 border-t border-spice-border/80">
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
                      onClick={handleRemoveCheckoutCoupon}
                      className="p-1 text-spice-cardamom hover:text-spice-terracotta transition-colors"
                      title="Remove coupon"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="w-3.5 h-3.5 text-spice-taupe absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Promo Code (SPICE10, WELCOME15)"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          className="w-full pl-8 pr-3 py-2 rounded-xl bg-spice-ivory border border-spice-border text-xs text-spice-espresso placeholder:text-spice-taupe/70 focus:outline-none focus:border-spice-terracotta uppercase font-mono"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={handleApplyCheckoutCoupon}
                      >
                        Apply
                      </Button>
                    </div>
                    {couponError && <p className="text-[10px] text-spice-terracotta font-medium">{couponError}</p>}
                    {couponSuccess && <p className="text-[10px] text-spice-cardamom font-medium">{couponSuccess}</p>}
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="pt-3 border-t border-spice-border space-y-2 text-xs">
                <div className="flex justify-between text-spice-taupe">
                  <span>Subtotal</span>
                  <span className="font-bold text-spice-espresso">{formatCurrency(cartSubtotal)}</span>
                </div>

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-spice-cardamom font-semibold">
                    <span>Coupon Savings ({appliedCoupon})</span>
                    <span>- {formatCurrency(couponDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-spice-taupe">
                  <span>Shipping</span>
                  <span>{shippingFee === 0 ? <strong className="text-spice-cardamom">FREE</strong> : formatCurrency(shippingFee)}</span>
                </div>

                <div className="pt-3 border-t border-spice-border flex items-baseline justify-between text-sm">
                  <span className="font-serif font-bold text-spice-espresso">Total Amount</span>
                  <span className="font-serif font-bold text-2xl text-spice-espresso">{formatCurrency(cartFinalTotal)}</span>
                </div>
              </div>

              {/* Place Demo Order CTA */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                className="w-full shadow-terracotta-glow text-sm font-bold py-3.5"
              >
                {isSubmitting ? (
                  <span>Securing Order...</span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Place Demo Order <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>

              <div className="text-center text-[11px] text-spice-taupe flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-spice-cardamom" />
                <span>Demo checkout mode. No real payment charged.</span>
              </div>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
}
