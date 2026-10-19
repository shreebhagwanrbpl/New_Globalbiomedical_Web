'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Container, Button } from '@/components/common';
import { formatCurrency } from '@/utils/currency';
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  Clock,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  FileText,
} from 'lucide-react';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'SPC-2026-1048';

  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('aaxol_last_order');
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
            DEMO ORDER PLACED SUCCESSFULLY
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-spice-espresso mt-1 mb-2">
            Thank You for Savoring Pure Spices!
          </h1>
          <p className="text-xs sm:text-sm text-spice-taupe max-w-md mx-auto mb-6">
            Your single-origin spices are now being freshly packed in micro-batches to seal in their volatile aromas.
          </p>

          {/* Order Details Ribbon */}
          <div className="bg-spice-sand/30 rounded-2xl p-4 border border-spice-border flex flex-wrap items-center justify-around gap-4 text-left mb-8">
            <div>
              <span className="text-[10px] uppercase font-bold text-spice-taupe block">Order Number</span>
              <span className="font-mono font-bold text-sm text-spice-espresso">#{orderId}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-spice-taupe block">Estimated Delivery</span>
              <span className="font-bold text-sm text-spice-cardamom">2–3 Business Days</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-spice-taupe block">Payment Status</span>
              <span className="font-bold text-sm text-spice-espresso">Confirmed (Demo)</span>
            </div>
          </div>

          {/* =========================================================================
              VISUAL ORDER TRACKING TIMELINE
          ========================================================================= */}
          <div className="py-6 border-y border-spice-border mb-8 text-left">
            <h3 className="font-serif font-bold text-base text-spice-espresso mb-6 text-center">
              Live Order Fulfillment Journey
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
                <span className="font-bold text-[11px] text-spice-taupe block">Cold Milled</span>
                <span className="text-[9px] text-spice-taupe">In Progress</span>
              </div>

              {/* Step 3: Shipped */}
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-8 h-8 rounded-full bg-white text-spice-taupe flex items-center justify-center text-xs font-bold mb-1.5 border border-spice-border">
                  3
                </div>
                <span className="font-bold text-[11px] text-spice-taupe block">Dispatched</span>
                <span className="text-[9px] text-spice-taupe">Courier</span>
              </div>

              {/* Step 4: Out for Delivery */}
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-8 h-8 rounded-full bg-white text-spice-taupe flex items-center justify-center text-xs font-bold mb-1.5 border border-spice-border">
                  4
                </div>
                <span className="font-bold text-[11px] text-spice-taupe block">Out for Delivery</span>
                <span className="text-[9px] text-spice-taupe">Final Mile</span>
              </div>

              {/* Step 5: Delivered */}
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-8 h-8 rounded-full bg-white text-spice-taupe flex items-center justify-center text-xs font-bold mb-1.5 border border-spice-border">
                  5
                </div>
                <span className="font-bold text-[11px] text-spice-taupe block">Delivered</span>
                <span className="text-[9px] text-spice-taupe">Kitchen</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/shop">
              <Button variant="primary" size="md" showArrow className="shadow-terracotta-glow">
                Explore More Spices
              </Button>
            </Link>

            <Link href="/account/orders">
              <Button variant="secondary" size="md">
                View Orders in Account
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
    <Suspense fallback={<div className="min-h-screen bg-spice-ivory flex items-center justify-center text-sm font-bold text-spice-taupe">Loading order details...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
