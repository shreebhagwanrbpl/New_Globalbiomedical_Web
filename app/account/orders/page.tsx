'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Container, Button } from '@/components/common';
import { formatCurrency } from '@/utils/currency';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  ChevronRight,
  ArrowLeft,
  ShieldCheck,
  ShoppingBag,
} from 'lucide-react';

export default function AccountOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = JSON.parse(localStorage.getItem('aaxol_demo_orders') || '[]');
      if (saved.length > 0) {
        setOrders(saved);
      } else {
        setOrders([
          {
            orderId: 'SPC-2026-1048',
            createdAt: '2026-09-21T10:30:00.000Z',
            status: 'shipped',
            courier: 'BlueDart Express',
            trackingNumber: 'BD-884920149',
            shippingAddress: {
              fullName: 'Aditya Birla',
              addressLine1: '402, Royal Palms Residency, MG Road',
              city: 'Jaipur',
              state: 'Rajasthan',
              pincode: '302001',
            },
            pricing: {
              subtotal: 1098,
              discount: 100,
              shippingFee: 0,
              total: 998,
            },
            items: [
              {
                title: 'Royal Rajasthani Laal Maas Masala',
                selectedPackSize: '150g',
                quantity: 2,
                unitPrice: 199,
                totalPrice: 398,
                image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&auto=format&fit=crop&q=80',
              },
              {
                title: 'High-Curcumin Lakadong Turmeric',
                selectedPackSize: '200g',
                quantity: 2,
                unitPrice: 189,
                totalPrice: 378,
                image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&auto=format&fit=crop&q=80',
              },
              {
                title: 'Idukki Bold Green Cardamom (8mm+)',
                selectedPackSize: '50g',
                quantity: 1,
                unitPrice: 349,
                totalPrice: 349,
                image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=400&auto=format&fit=crop&q=80',
              },
            ],
          },
        ]);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-spice-ivory pb-24">
      {/* Header */}
      <section className="bg-gradient-to-b from-spice-sand/40 via-spice-sand/20 to-spice-ivory border-b border-spice-border py-8">
        <Container size="2xl">
          <div className="flex items-center gap-2 mb-2">
            <Link href="/account" className="text-xs font-bold text-spice-terracotta hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Account
            </Link>
          </div>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-spice-espresso">
            Order History &amp; Live Tracking
          </h1>
          <p className="text-xs sm:text-sm text-spice-taupe mt-1">
            Track your farm-fresh spice deliveries in real-time across India.
          </p>
        </Container>
      </section>

      <Container size="2xl" className="mt-8">
        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl border border-spice-border p-12 text-center max-w-md mx-auto">
            <Package className="w-12 h-12 text-spice-taupe mx-auto mb-3" />
            <h3 className="font-serif font-bold text-lg text-spice-espresso mb-1">No Orders Found</h3>
            <p className="text-xs text-spice-taupe mb-5">You haven't placed any spice orders yet.</p>
            <Link href="/shop">
              <Button variant="primary" size="md">Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order, idx) => (
              <div
                key={order.orderId || idx}
                className="bg-white rounded-3xl border border-spice-border p-6 sm:p-8 shadow-warm-xs space-y-6"
              >
                {/* Order Top Ribbon */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-spice-border">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-base sm:text-lg text-spice-espresso">
                      #{order.orderId}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-spice-cardamom-50 text-spice-cardamom text-xs font-bold uppercase border border-spice-cardamom-200">
                      {order.status || 'Confirmed'}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-spice-taupe block">Order Total</span>
                    <span className="font-serif font-bold text-lg text-spice-espresso">
                      {formatCurrency(order.pricing?.total || 998)}
                    </span>
                  </div>
                </div>

                {/* Tracking Timeline */}
                <div className="py-4 border-b border-spice-border">
                  <div className="flex items-center justify-between text-xs text-spice-taupe font-semibold mb-6">
                    <span className="flex items-center gap-1.5 text-spice-espresso font-bold">
                      <Truck className="w-4 h-4 text-spice-cardamom" /> Express Dispatch via {order.courier || 'BlueDart Express'}
                    </span>
                    <span>Tracking: <strong className="font-mono text-spice-espresso">{order.trackingNumber || 'BD-884920149'}</strong></span>
                  </div>

                  {/* 5-Step Visual Timeline */}
                  <div className="grid grid-cols-5 gap-2 relative">
                    <div className="absolute top-4 left-6 right-6 h-0.5 bg-spice-sand -z-0">
                      <div className="h-full bg-spice-cardamom w-3/5" />
                    </div>

                    <div className="flex flex-col items-center text-center relative z-10">
                      <div className="w-8 h-8 rounded-full bg-spice-cardamom text-white flex items-center justify-center text-xs font-bold mb-1 shadow-warm-xs">
                        ✓
                      </div>
                      <span className="font-bold text-[10px] sm:text-xs text-spice-espresso block">Confirmed</span>
                    </div>

                    <div className="flex flex-col items-center text-center relative z-10">
                      <div className="w-8 h-8 rounded-full bg-spice-cardamom text-white flex items-center justify-center text-xs font-bold mb-1 shadow-warm-xs">
                        ✓
                      </div>
                      <span className="font-bold text-[10px] sm:text-xs text-spice-espresso block">Stone-Milled</span>
                    </div>

                    <div className="flex flex-col items-center text-center relative z-10">
                      <div className="w-8 h-8 rounded-full bg-spice-cardamom text-white flex items-center justify-center text-xs font-bold mb-1 shadow-warm-xs animate-pulse">
                        ✓
                      </div>
                      <span className="font-bold text-[10px] sm:text-xs text-spice-espresso block">In Transit</span>
                    </div>

                    <div className="flex flex-col items-center text-center relative z-10">
                      <div className="w-8 h-8 rounded-full bg-spice-sand text-spice-taupe flex items-center justify-center text-xs font-bold mb-1 border border-spice-border">
                        4
                      </div>
                      <span className="font-bold text-[10px] sm:text-xs text-spice-taupe block">Out for Delivery</span>
                    </div>

                    <div className="flex flex-col items-center text-center relative z-10">
                      <div className="w-8 h-8 rounded-full bg-spice-sand text-spice-taupe flex items-center justify-center text-xs font-bold mb-1 border border-spice-border">
                        5
                      </div>
                      <span className="font-bold text-[10px] sm:text-xs text-spice-taupe block">Delivered</span>
                    </div>
                  </div>
                </div>

                {/* Items in this Order */}
                <div className="space-y-3">
                  <h4 className="font-bold text-xs uppercase text-spice-espresso tracking-wider">
                    Items in this Package:
                  </h4>
                  <div className="divide-y divide-spice-border/60">
                    {order.items?.map((item: any, i: number) => (
                      <div key={i} className="py-3 first:pt-0 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&auto=format&fit=crop&q=80'}
                            alt={item.title}
                            className="w-12 h-12 rounded-xl object-cover border border-spice-border shrink-0"
                          />
                          <div>
                            <span className="font-bold text-xs sm:text-sm text-spice-espresso block">{item.title}</span>
                            <span className="text-[11px] text-spice-taupe">Pack: {item.selectedPackSize || '100g'} • Qty: {item.quantity || 1}</span>
                          </div>
                        </div>
                        <span className="font-bold text-xs sm:text-sm text-spice-espresso">{formatCurrency(item.totalPrice || 199)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Address Details */}
                {order.shippingAddress && (
                  <div className="pt-4 border-t border-spice-border text-xs text-spice-taupe flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-spice-sand/20 p-4 rounded-2xl">
                    <div>
                      <strong className="text-spice-espresso block mb-0.5">Shipping to:</strong>
                      <span>{order.shippingAddress.fullName} • {order.shippingAddress.addressLine1}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}</span>
                    </div>
                    <span className="text-[11px] font-semibold text-spice-cardamom shrink-0">
                      Standard Pan-India Express
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
