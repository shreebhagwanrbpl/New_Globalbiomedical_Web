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
      const saved = JSON.parse(localStorage.getItem('human_bio_demo_orders') || localStorage.getItem('aaxol_demo_orders') || '[]');
      if (saved.length > 0) {
        setOrders(saved);
      } else {
        setOrders([
          {
            orderId: 'HBM-2026-1048',
            createdAt: '2026-09-21T10:30:00.000Z',
            status: 'shipped',
            courier: 'Human Biomedical Rajasthan Fleet & BlueDart Cold-Chain',
            trackingNumber: 'HBM-RAJ-99214',
            shippingAddress: {
              fullName: 'Dr. Aditya Sharma (Rajasthan Diagnostic Center)',
              addressLine1: 'Near JLN Hospital Circle, Bikaner Highway',
              city: 'Nagaur',
              state: 'Rajasthan',
              pincode: '341001',
            },
            pricing: {
              subtotal: 195000,
              discount: 10000,
              shippingFee: 0,
              total: 185000,
            },
            items: [
              {
                title: 'HB-3000 Plus 3-Part Auto Hematology Analyzer',
                selectedPackSize: 'Standard Analyzer Unit',
                quantity: 1,
                unitPrice: 175000,
                totalPrice: 175000,
                image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&auto=format&fit=crop&q=80',
              },
              {
                title: 'Universal Hematology CBC Reagent Pack (20L Diluent + Lyse)',
                selectedPackSize: 'Complete Trio Pack',
                quantity: 2,
                unitPrice: 5000,
                totalPrice: 10000,
                image: 'https://images.unsplash.com/photo-1579165466791-788226ab77b6?w=400&auto=format&fit=crop&q=80',
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
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Lab Profile
            </Link>
          </div>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-spice-espresso">
            Diagnostic Orders &amp; Live Tracking
          </h1>
          <p className="text-xs sm:text-sm text-spice-taupe mt-1">
            Track your laboratory instruments, reagents, and field engineer installation schedules across Rajasthan.
          </p>
        </Container>
      </section>

      <Container size="2xl" className="mt-8">
        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl border border-spice-border p-12 text-center max-w-md mx-auto">
            <Package className="w-12 h-12 text-spice-taupe mx-auto mb-3" />
            <h3 className="font-serif font-bold text-lg text-spice-espresso mb-1">No Orders Found</h3>
            <p className="text-xs text-spice-taupe mb-5">Your laboratory has no pending or past equipment dispatches.</p>
            <Link href="/shop">
              <Button variant="primary" size="md">Browse Equipment Catalog</Button>
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
                      {formatCurrency(order.pricing?.total || 185000)}
                    </span>
                  </div>
                </div>

                {/* Tracking Timeline */}
                <div className="py-4 border-b border-spice-border">
                  <div className="flex items-center justify-between text-xs text-spice-taupe font-semibold mb-6">
                    <span className="flex items-center gap-1.5 text-spice-espresso font-bold">
                      <Truck className="w-4 h-4 text-spice-cardamom" /> Logistics &amp; Installation: {order.courier || 'Human Biomedical Field Express'}
                    </span>
                    <span>Waybill / Docket: <strong className="font-mono text-spice-espresso">{order.trackingNumber || 'HBM-RAJ-99214'}</strong></span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    <div className="p-3 bg-spice-cardamom-50 rounded-xl border border-spice-cardamom-200 text-spice-cardamom font-bold">
                      ✓ Order Confirmed
                    </div>
                    <div className="p-3 bg-spice-cardamom-50 rounded-xl border border-spice-cardamom-200 text-spice-cardamom font-bold">
                      ✓ QC Calibrated
                    </div>
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-700 font-bold">
                      • In Transit
                    </div>
                    <div className="p-3 bg-spice-sand/30 rounded-xl border border-spice-border text-spice-taupe font-medium">
                      Engineer Setup
                    </div>
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-4">
                  <h4 className="font-serif font-bold text-sm text-spice-espresso">
                    Equipment &amp; Supplies in this Consignment:
                  </h4>
                  <div className="divide-y divide-spice-border">
                    {order.items?.map((item: any, i: number) => (
                      <div key={i} className="py-3 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-14 h-14 rounded-xl object-cover border border-spice-border"
                          />
                          <div>
                            <span className="font-bold text-xs text-spice-espresso block">{item.title}</span>
                            <span className="text-[11px] text-spice-taupe">Variant: {item.selectedPackSize} • Qty: {item.quantity}</span>
                          </div>
                        </div>
                        <span className="font-bold text-xs text-spice-espresso">
                          {formatCurrency(item.totalPrice || item.unitPrice || 0)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Location & Field Assistance */}
                <div className="p-4 bg-spice-sand/20 rounded-2xl border border-spice-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold text-spice-espresso block">Destination Facility:</span>
                    <span className="text-spice-taupe">{order.shippingAddress?.fullName}, {order.shippingAddress?.addressLine1}, {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.pincode}</span>
                  </div>
                  <Link href="/contact">
                    <Button variant="outline" size="sm" className="shrink-0 text-xs">
                      Contact Installation Desk
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
