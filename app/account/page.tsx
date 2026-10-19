'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Container, Button } from '@/components/common';
import { useStore } from '@/context/StoreContext';
import { formatCurrency } from '@/utils/currency';
import {
  User,
  Package,
  Heart,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  PhoneCall,
  Clock,
  CheckCircle2,
  Activity,
  Award,
  Wrench,
} from 'lucide-react';

export default function AccountPage() {
  const { wishlist } = useStore();
  const [demoOrders, setDemoOrders] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = JSON.parse(localStorage.getItem('human_bio_demo_orders') || localStorage.getItem('aaxol_demo_orders') || '[]');
      if (saved.length > 0) {
        setDemoOrders(saved);
      } else {
        // Sample default order for demo
        setDemoOrders([
          {
            orderId: 'HBM-2026-1048',
            createdAt: '2026-09-21T10:30:00.000Z',
            status: 'shipped',
            pricing: { total: 185000 },
            items: [
              {
                title: 'HB-3000 Plus 3-Part Auto Hematology Analyzer',
                selectedPackSize: 'Standard Analyzer Unit',
                quantity: 1,
                image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&auto=format&fit=crop&q=80',
              },
              {
                title: 'Universal Hematology CBC Reagent Pack (20L Diluent + Lyse)',
                selectedPackSize: 'Complete Trio Pack',
                quantity: 2,
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
      {/* Header Profile Banner */}
      <section className="bg-gradient-to-b from-spice-sand/40 via-spice-sand/20 to-spice-ivory border-b border-spice-border py-8 sm:py-12">
        <Container size="2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-spice-espresso text-spice-sand font-serif font-bold text-2xl flex items-center justify-center shadow-warm-xs">
                DS
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-serif font-bold text-2xl text-spice-espresso">Dr. Aditya Sharma</h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-spice-cardamom-50 text-spice-cardamom text-[10px] font-bold border border-spice-cardamom-200">
                    Verified Pathology Partner
                  </span>
                </div>
                <p className="text-xs text-spice-taupe mt-0.5">
                  Director, Rajasthan Diagnostic Center • aditya.sharma@rajasthandiag.com • +91 98290 88234
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/account/orders">
                <Button variant="outline" size="sm">
                  View Diagnostic Orders
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
                  <User className="w-4 h-4 text-spice-terracotta" /> Lab Profile &amp; Preferences
                </span>
                <ChevronRight className="w-4 h-4 text-spice-taupe" />
              </Link>

              <Link
                href="/account/orders"
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-spice-sand/30 text-spice-taupe hover:text-spice-espresso font-semibold text-xs transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <Package className="w-4 h-4 text-spice-cardamom" /> Orders &amp; Dispatches ({demoOrders.length})
                </span>
                <ChevronRight className="w-4 h-4 text-spice-taupe" />
              </Link>

              <Link
                href="/wishlist"
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-spice-sand/30 text-spice-taupe hover:text-spice-espresso font-semibold text-xs transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <Heart className="w-4 h-4 text-spice-terracotta" /> Shortlisted Equipment ({wishlist.length})
                </span>
                <ChevronRight className="w-4 h-4 text-spice-taupe" />
              </Link>
            </div>

            {/* Registered Lab Facility Address */}
            <div className="bg-white rounded-3xl border border-spice-border p-6 shadow-warm-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-sm text-spice-espresso flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-spice-cardamom" /> Clinical Facility Address
                </h3>
                <span className="text-[10px] font-bold text-spice-cardamom bg-spice-cardamom-50 px-2 py-0.5 rounded">
                  REGISTERED LAB
                </span>
              </div>
              <div className="text-xs text-spice-taupe leading-relaxed">
                <strong className="text-spice-espresso block">Rajasthan Diagnostic &amp; Research Center</strong>
                Near JLN Hospital Circle, Bikaner Highway<br />
                Nagaur, Rajasthan 341001<br />
                GSTIN: 08AABCR1234F1Z8 • Phone: +91 98290 88234
              </div>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: ACTIVE ORDERS & CLINICAL PREFERENCES
          ========================================================================= */}
          <div className="lg:col-span-8 space-y-6">
            {/* Recent Orders Overview */}
            <div className="bg-white rounded-3xl border border-spice-border p-6 shadow-warm-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-spice-border">
                <h2 className="font-serif font-bold text-lg text-spice-espresso">
                  Recent Equipment &amp; Reagent Dispatches
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
                      {ord.items?.length || 1} Products • Total: <strong>{formatCurrency(ord.pricing?.total || 185000)}</strong>
                    </p>
                  </div>

                  <Link href="/account/orders">
                    <Button variant="outline" size="sm" className="text-xs">
                      Track Dispatch
                    </Button>
                  </Link>
                </div>
              ))}
            </div>

            {/* Clinical Laboratory Configuration */}
            <div className="bg-white rounded-3xl border border-spice-border p-6 shadow-warm-xs space-y-4">
              <h3 className="font-serif font-bold text-lg text-spice-espresso flex items-center gap-2">
                <Activity className="w-5 h-5 text-spice-terracotta" /> Diagnostic Facility Specifications
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-spice-sand/20 border border-spice-border">
                  <span className="text-[10px] font-bold text-spice-taupe uppercase block mb-1">Primary Diagnostics</span>
                  <span className="font-bold text-spice-espresso text-sm">3-Part CBC &amp; Clinical Biochemistry</span>
                </div>

                <div className="p-4 rounded-2xl bg-spice-sand/20 border border-spice-border">
                  <span className="text-[10px] font-bold text-spice-taupe uppercase block mb-1">Reagent Delivery Cycle</span>
                  <span className="font-bold text-spice-espresso text-sm">Monthly Cold-Chain Standing Order</span>
                </div>

                <div className="p-4 rounded-2xl bg-spice-sand/20 border border-spice-border">
                  <span className="text-[10px] font-bold text-spice-taupe uppercase block mb-1">Maintenance &amp; AMC Status</span>
                  <span className="font-bold text-spice-espresso text-sm">24-Month Comprehensive Service Contract</span>
                </div>

                <div className="p-4 rounded-2xl bg-spice-sand/20 border border-spice-border">
                  <span className="text-[10px] font-bold text-spice-taupe uppercase block mb-1">Quality Assurance Standards</span>
                  <span className="font-bold text-spice-espresso text-sm">ISO 15189 / NABL Calibrated Control Lots</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
