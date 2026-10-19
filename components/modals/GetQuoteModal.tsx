'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CheckCircle2,
  Phone,
  MessageCircle,
  FileText,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  Clock,
  User,
} from 'lucide-react';

interface GetQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: {
    id?: string;
    title: string;
    image?: string;
    category?: string;
    slug?: string;
    weight?: string;
  };
}

const CAROUSEL_SLIDES = [
  {
    tag: 'DIRECT OEM PRICING',
    title: 'Institutional Wholesale Rates',
    desc: 'Access direct manufacturer & OEM tariffs with zero middlemen margins. GST tax invoices provided for complete input credit.',
    highlight: '✓ Official B2B Diagnostic Tariff',
    icon: Award,
  },
  {
    tag: 'PAN-INDIA REACH',
    title: 'Free On-Site Installation & Training',
    desc: 'Certified biomedical engineers provide on-site setup, precision calibration, and staff training across all 780+ districts of India.',
    highlight: '✓ Deployed in 780+ District Hubs',
    icon: ShieldCheck,
  },
  {
    tag: 'ZERO DOWNTIME COMMITMENT',
    title: '1-2 Year Comprehensive AMC Warranty',
    desc: 'Dedicated 24/7 biomedical engineering helpdesk with uninterrupted cold-chain reagents and genuine replacement components.',
    highlight: '✓ 24/7 Engineer On-Call Support',
    icon: Clock,
  },
  {
    tag: 'CLINICAL COMPLIANCE',
    title: 'ISO 13485:2016 & CDSCO Registered',
    desc: 'Instruments and reagents tested for high diagnostic sensitivity, trusted by 1,500+ diagnostic pathology centers across India.',
    highlight: '✓ 100% Quality & Accuracy Assured',
    icon: Sparkles,
  },
];

export function GetQuoteModal({ isOpen, onClose, product }: GetQuoteModalProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Auto-play text carousel every 3.5 seconds (strictly no manual arrows as requested)
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setIsSubmitted(false);
        setIsSubmitting(false);
      }, 300);
    }
  }, [isOpen]);

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phoneNumber.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  if (!isOpen) return null;

  const currentSlideData = CAROUSEL_SLIDES[activeSlide];
  const SlideIcon = currentSlideData.icon;

  const productTitle = product?.title || 'Precision Diagnostic Equipment & Reagents';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 grid grid-cols-1 md:grid-cols-12 my-auto"
      >
        {/* =========================================================================
            LEFT COLUMN: AUTO-PLAYING TEXT CAROUSEL (NO ARROWS)
        ========================================================================= */}
        <div className="md:col-span-5 bg-slate-950 text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
          {/* Ambient Laser Flares */}
          <div
            className="absolute -top-16 -left-16 w-64 h-64 bg-red-600/20 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-16 -right-16 w-64 h-64 bg-sky-600/15 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          {/* Top Brand Tag */}
          <div className="relative z-10 space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-[10.5px] font-bold text-red-400 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>HUMAN BIOMEDICAL LLP</span>
            </div>
            <p className="text-xs text-slate-300 font-medium">
              Jaipur Central Headquarters • 780+ District Network
            </p>
          </div>

          {/* Middle: Animated Text Carousel Content */}
          <div className="relative z-10 py-8 min-h-[220px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-red-400">
                  <SlideIcon className="w-5 h-5" />
                </div>

                <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-300 block">
                  {currentSlideData.tag}
                </span>

                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {currentSlideData.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {currentSlideData.desc}
                </p>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                  <span>{currentSlideData.highlight}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom: Progress Bars / Indicator Dots (NO ARROWS) */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {CAROUSEL_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeSlide === idx
                      ? 'w-7 bg-red-500'
                      : 'w-2 bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>

            <div className="text-[11px] text-slate-400 font-medium">
              <span>Direct Desk: </span>
              <strong className="text-white">+91 98290 88234</strong>
            </div>
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN: QUOTATION LEAD CAPTURE FORM
        ========================================================================= */}
        <div className="md:col-span-7 p-6 sm:p-8 bg-white flex flex-col justify-between relative">
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSubmitted ? (
            <div className="space-y-4">
              {/* Header */}
              <div>
                <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider block">
                  OFFICIAL INSTITUTIONAL QUOTATION
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
                  Get Instant Quotation
                </h2>
              </div>

              {/* Product Inquired Pill */}
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                {product?.image ? (
                  <img
                    src={product.image}
                    alt={productTitle}
                    className="w-11 h-11 rounded-lg object-cover shrink-0 border border-slate-200 bg-white"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-200">
                    <FileText className="w-5 h-5" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    Product Inquired
                  </span>
                  <p className="text-xs font-bold text-slate-900 truncate">
                    {productTitle}
                  </p>
                  {product?.weight && (
                    <span className="text-[10.5px] text-emerald-700 font-semibold">
                      Config: {product.weight}
                    </span>
                  )}
                </div>
              </div>

              {/* Form Inputs (Name & Number Only) */}
              <form onSubmit={handleSubmit} className="space-y-3.5 pt-1">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Full Name / Designation <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Dr. Rajesh Sharma / Lab Director"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile / WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex">
                    <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 text-slate-600 text-xs sm:text-sm font-bold">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      pattern="[0-9]{10}"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                      placeholder="98290 88234"
                      className="w-full px-3.5 py-2.5 rounded-r-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all placeholder:text-slate-400 font-semibold"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3 px-5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-red-600/25 transition-all transform hover:-translate-y-0.5 disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Submitting Quotation Request...</span>
                  ) : (
                    <>
                      <span>Get Official Quotation Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Direct WhatsApp Alternative Link */}
              <div className="pt-2 text-center">
                <a
                  href={`https://wa.me/919829088234?text=${encodeURIComponent(
                    `Hello Human Biomedical LLP, I would like to receive an official price quote for ${productTitle}. My name is ${fullName || 'Doctor/Lab Director'}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Prefer WhatsApp? Chat directly with biomedical desk</span>
                </a>
              </div>
            </div>
          ) : (
            /* =========================================================================
                SUCCESS SCREEN
            ========================================================================= */
            <div className="py-6 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                  QUOTATION REQUEST REGISTERED
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                  Thank You, {fullName || 'Doctor'}!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mt-1.5 leading-relaxed">
                  Our biomedical engineering desk at Jaipur Headquarters has received your request for <strong>{productTitle}</strong>.
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  We will share the official institutional price quotation, brochure &amp; installation schedule on WhatsApp (+91 {phoneNumber}) within <strong>15 minutes</strong>.
                </p>
              </div>

              {/* Instant WhatsApp Action */}
              <div className="w-full pt-3 space-y-2 max-w-xs">
                <a
                  href={`https://wa.me/919829088234?text=${encodeURIComponent(
                    `Hello Human Biomedical LLP, I have requested quotation for ${productTitle}. Name: ${fullName}, Phone: ${phoneNumber}. Please send official tariff.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Open WhatsApp Chat Now</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2 px-4 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
