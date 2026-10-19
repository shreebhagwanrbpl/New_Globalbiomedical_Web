'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Container, Button } from '@/components/common';
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Sparkles,
  PhoneCall,
  Wrench,
} from 'lucide-react';
import { HEADQUARTERS_INFO } from '@/data/rajasthanDistricts';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'HBM-2026-1048';

  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('human_bio_last_order') || localStorage.getItem('aaxol_last_order');
      if (saved) {
        setOrderData(JSON.parse(saved));
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-spice-ivory py-12 sm:py-16">
      <Container size="md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl border border-spice-border p-6 sm:p-10 shadow-warm-md text-center"
        >
          {/* Success Check Icon */}
          <div className="w-20 h-20 rounded-full bg-spice-cardamom-50 border border-spice-cardamom-200 text-spice-cardamom flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-bold text-spice-cardamom uppercase tracking-wider">
            CLINICAL ORDER CONFIRMED
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-spice-espresso mt-1 mb-2">
            Thank You for Choosing Human Biomedical LLP!
          </h1>
          <p className="text-xs sm:text-sm text-spice-taupe max-w-md mx-auto mb-6">
            Your laboratory equipment and diagnostic supplies have been scheduled for Jaipur warehouse dispatch with CDSCO and NABL calibration documentation.
          </p>

          {/* Order Details Ribbon */}
          <div className="bg-spice-sand/30 rounded-2xl p-4 border border-spice-border flex flex-wrap items-center justify-around gap-4 text-left mb-8">
            <div>
              <span className="text-[10px] uppercase font-bold text-spice-taupe block">Order Reference</span>
              <span className="font-mono font-bold text-sm text-spice-espresso">#{orderId}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-spice-taupe block">Estimated Dispatch</span>
              <span className="font-bold text-sm text-spice-cardamom">24–48 Hours</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-spice-taupe block">Engineer Installation</span>
              <span className="font-bold text-sm text-spice-espresso">Included (Rajasthan)</span>
            </div>
          </div>

          {/* =========================================================================
              VISUAL ORDER TRACKING TIMELINE
          ========================================================================= */}
          <div className="py-6 border-y border-spice-border mb-8 text-left">
            <h3 className="font-serif font-bold text-base text-spice-espresso mb-6 text-center">
              Fulfillment &amp; Installation Workflow
            </h3>

            <div className="grid grid-cols-5 gap-2 relative">
              {/* Progress Line */}
              <div className="absolute top-4 left-6 right-6 h-0.5 bg-spice-sand -z-0">
                <div className="h-full bg-spice-cardamom w-1/5" />
              </div>

              {/* Step 1: Confirmed */}
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-8 h-8 rounded-full bg-spice-cardamom text-white flex items-center justify-center text-xs font-bold shadow-warm-xs mb-1.5">
                  ✓
                </div>
                <span className="font-bold text-[11px] text-spice-espresso block">Confirmed</span>
                <span className="text-[9px] text-spice-cardamom font-semibold">Today</span>
              </div>

              {/* Step 2: Packed */}
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-8 h-8 rounded-full bg-spice-sand text-spice-espresso flex items-center justify-center text-xs font-bold mb-1.5 border border-spice-border">
                  2
                </div>
                <span className="font-bold text-[11px] text-spice-taupe block">QC &amp; Calibration</span>
                <span className="text-[9px] text-spice-taupe">In Progress</span>
              </div>

              {/* Step 3: Shipped */}
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-8 h-8 rounded-full bg-white text-spice-taupe flex items-center justify-center text-xs font-bold mb-1.5 border border-spice-border">
                  3
                </div>
                <span className="font-bold text-[11px] text-spice-taupe block">Cold-Chain Dispatch</span>
                <span className="text-[9px] text-spice-taupe">Jaipur Hub</span>
              </div>

              {/* Step 4: Out for Delivery */}
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-8 h-8 rounded-full bg-white text-spice-taupe flex items-center justify-center text-xs font-bold mb-1.5 border border-spice-border">
                  4
                </div>
                <span className="font-bold text-[11px] text-spice-taupe block">District Arrival</span>
                <span className="text-[9px] text-spice-taupe">Rajasthan Fleet</span>
              </div>

              {/* Step 5: Delivered */}
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-8 h-8 rounded-full bg-white text-spice-taupe flex items-center justify-center text-xs font-bold mb-1.5 border border-spice-border">
                  5
                </div>
                <span className="font-bold text-[11px] text-spice-taupe block">Engineer Setup</span>
                <span className="text-[9px] text-spice-taupe">On-Site Demo</span>
              </div>
            </div>
          </div>

          {/* Quick Support Ribbon */}
          <div className="p-4 bg-spice-sand/20 rounded-2xl border border-spice-border text-xs text-spice-taupe flex items-center justify-between gap-4 text-left mb-8">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-spice-terracotta shrink-0" />
              <span>Questions regarding equipment delivery? Contact Biomedical Desk: <strong>+91 98290 88234</strong></span>
            </div>
            <span className="text-[10px] text-spice-cardamom font-bold uppercase shrink-0">Jaipur Dispatch Hub</span>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/shop" className="w-full sm:w-auto">
              <Button variant="primary" size="md" className="w-full">
                Continue Shopping Catalog
              </Button>
            </Link>
            <Link href="/account" className="w-full sm:w-auto">
              <Button variant="outline" size="md" className="w-full">
                View Account Orders
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-spice-ivory flex items-center justify-center text-xs text-spice-taupe">Loading order details...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
