'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container, Button } from '@/components/common';
import { useStore } from '@/context/StoreContext';
import { formatCurrency } from '@/utils/currency';
import {
  User,
  Package,
  Heart,
  MapPin,
  Settings,
  ChevronRight,
  ShieldCheck,
  Award,
  Sparkles,
  Truck,
  CheckCircle2,
} from 'lucide-react';

export default function AccountPage() {
  const { wishlist } = useStore();
  const [demoOrders, setDemoOrders] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = JSON.parse(localStorage.getItem('aaxol_demo_orders') || '[]');
      if (saved.length > 0) {
        setDemoOrders(saved);
      } else {
        // Sample default order for demo
        setDemoOrders([
          {
            orderId: 'SPC-2026-1048',
            createdAt: '2026-09-21T10:30:00.000Z',
            status: 'shipped',
            pricing: { total: 1149 },
            items: [
              {
                title: 'Royal Rajasthani Laal Maas Masala',
                selectedPackSize: '150g',
                quantity: 2,
                image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&auto=format&fit=crop&q=80',
              },
              {
                title: 'Salem Lakadong Turmeric Powder',
                selectedPackSize: '200g',
                quantity: 1,
                image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&auto=format&fit=crop&q=80',
              },
            ],
          },
        ]);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-spice-ivory pb-24">
      {/* Header Profile Banner */}
      <section className="bg-gradient-to-b from-spice-sand/40 via-spice-sand/20 to-spice-ivory border-b border-spice-border py-8 sm:py-12">
        <Container size="2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-spice-espresso text-spice-sand font-serif font-bold text-2xl flex items-center justify-center shadow-warm-xs">
                AB
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-serif font-bold text-2xl text-spice-espresso">Aditya Birla</h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-spice-cardamom-50 text-spice-cardamom text-[10px] font-bold border border-spice-cardamom-200">
                    VIP Spice Club
                  </span>
                </div>
                <p className="text-xs text-spice-taupe mt-0.5">
                  aditya.birla@example.com • +91 98765 43210
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/account/orders">
                <Button variant="outline" size="sm">
                  View Order History
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Container size="2xl" className="mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* =========================================================================
              LEFT COLUMN: NAVIGATION TABS & PROFILE DETAILS
          ========================================================================= */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl border border-spice-border p-4 sm:p-5 shadow-warm-xs space-y-1">
              <Link
                href="/account"
                className="flex items-center justify-between p-3 rounded-2xl bg-spice-sand/40 text-spice-espresso font-bold text-xs"
              >
                <span className="flex items-center gap-2.5">
                  <User className="w-4 h-4 text-spice-terracotta" /> Profile &amp; Preferences
                </span>
                <ChevronRight className="w-4 h-4 text-spice-taupe" />
              </Link>

              <Link
                href="/account/orders"
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-spice-sand/30 text-spice-taupe hover:text-spice-espresso font-semibold text-xs transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <Package className="w-4 h-4 text-spice-cardamom" /> Orders &amp; Tracking ({demoOrders.length})
                </span>
                <ChevronRight className="w-4 h-4 text-spice-taupe" />
              </Link>

              <Link
                href="/wishlist"
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-spice-sand/30 text-spice-taupe hover:text-spice-espresso font-semibold text-xs transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <Heart className="w-4 h-4 text-spice-terracotta" /> Saved Wishlist ({wishlist.length})
                </span>
                <ChevronRight className="w-4 h-4 text-spice-taupe" />
              </Link>
            </div>

            {/* Saved Delivery Addresses */}
            <div className="bg-white rounded-3xl border border-spice-border p-6 shadow-warm-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-sm text-spice-espresso flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-spice-cardamom" /> Saved Address
                </h3>
                <span className="text-[10px] font-bold text-spice-cardamom bg-spice-cardamom-50 px-2 py-0.5 rounded">
                  DEFAULT
                </span>
              </div>
              <div className="text-xs text-spice-taupe leading-relaxed">
                <strong className="text-spice-espresso block">Aditya Birla (Home)</strong>
                402, Royal Palms Residency, MG Road<br />
                Opposite State Bank, Jaipur, Rajasthan 302001<br />
                Phone: +91 98765 43210
              </div>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: ACTIVE ORDERS & TASTE PROFILE PREFERENCES
          ========================================================================= */}
          <div className="lg:col-span-8 space-y-6">
            {/* Recent Orders Overview */}
            <div className="bg-white rounded-3xl border border-spice-border p-6 shadow-warm-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-spice-border">
                <h2 className="font-serif font-bold text-lg text-spice-espresso">
                  Recent Orders
                </h2>
                <Link href="/account/orders" className="text-xs font-bold text-spice-terracotta hover:underline">
                  View Full Tracking Details →
                </Link>
              </div>

              {demoOrders.map((ord) => (
                <div
                  key={ord.orderId}
                  className="p-4 rounded-2xl bg-spice-sand/20 border border-spice-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono font-bold text-xs text-spice-espresso">
                        #{ord.orderId}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-spice-cardamom-50 text-spice-cardamom text-[10px] font-bold uppercase">
                        {ord.status || 'Confirmed'}
                      </span>
                    </div>
                    <p className="text-xs text-spice-taupe">
                      {ord.items?.length || 1} Spices • Total: <strong>{formatCurrency(ord.pricing?.total || 799)}</strong>
                    </p>
                  </div>

                  <Link href="/account/orders">
                    <Button variant="outline" size="sm" className="text-xs">
                      Track Parcel
                    </Button>
                  </Link>
                </div>
              ))}
            </div>

            {/* Spice Taste Profile Preferences */}
            <div className="bg-white rounded-3xl border border-spice-border p-6 shadow-warm-xs space-y-4">
              <h3 className="font-serif font-bold text-lg text-spice-espresso flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-spice-terracotta" /> My Culinary &amp; Spice Preferences
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-spice-sand/20 border border-spice-border">
                  <span className="text-[10px] font-bold text-spice-taupe uppercase block mb-1">Preferred Heat Level</span>
                  <span className="font-bold text-spice-espresso text-sm">Medium Heat (Mathania &amp; Kashmiri)</span>
                </div>

                <div className="p-4 rounded-2xl bg-spice-sand/20 border border-spice-border">
                  <span className="text-[10px] font-bold text-spice-taupe uppercase block mb-1">Favourite Cuisines</span>
                  <span className="font-bold text-spice-espresso text-sm">Rajasthani, Hyderabadi &amp; Awadhi</span>
                </div>

                <div className="p-4 rounded-2xl bg-spice-sand/20 border border-spice-border">
                  <span className="text-[10px] font-bold text-spice-taupe uppercase block mb-1">Dietary Standard</span>
                  <span className="font-bold text-spice-espresso text-sm">100% Pure Vegetarian &amp; Ayurvedic</span>
                </div>

                <div className="p-4 rounded-2xl bg-spice-sand/20 border border-spice-border">
                  <span className="text-[10px] font-bold text-spice-taupe uppercase block mb-1">Packaging Preference</span>
                  <span className="font-bold text-spice-espresso text-sm">Airtight Tin Caddies (UV Protected)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
