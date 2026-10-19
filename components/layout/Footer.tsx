'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import {
  ShieldCheck,
  Award,
  Sparkles,
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
  Lock,
  Globe2,
  Leaf,
} from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#F3F8F5] via-[#ECF5F0] to-[#E5F2EC] text-spice-espresso overflow-hidden border-t border-spice-cardamom-200">
      {/* Subtle ambient luxury light glows */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 bg-spice-cardamom/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-spice-peach/40 rounded-full blur-3xl pointer-events-none translate-y-1/2"
        aria-hidden="true"
      />

      <Container size="2xl" className="relative z-10 pt-14 pb-10">
        {/* Newsletter & Value Proposition Strip */}
        <div className="bg-spice-white rounded-spice-section p-6 sm:p-8 md:p-10 border border-spice-cardamom-200 mb-14 shadow-warm-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-spice-cardamom/10 text-spice-cardamom text-xs font-semibold uppercase tracking-wider mb-3 border border-spice-cardamom/20">
                <Leaf className="w-3.5 h-3.5 text-spice-cardamom" />
                <span>Join Our Global Spice Connoisseur Circle</span>
              </div>
              <h3 className="font-serif font-semibold text-2xl sm:text-3xl text-spice-espresso tracking-tight">
                Get spice deals and new harvest updates
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-spice-taupe max-w-xl leading-relaxed">
                Subscribe to receive authentic regional recipes, secret masala blending guides, and exclusive seasonal harvest discounts across India and worldwide.
              </p>
            </div>

            <div className="lg:col-span-5">
              {isSubscribed ? (
                <div className="p-4 rounded-spice-button bg-spice-cardamom-50 border border-spice-cardamom-200 text-spice-cardamom-700 text-xs font-medium flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-spice-cardamom shrink-0" />
                  <span>Thank you for subscribing! Check your email for your 10% welcome voucher.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-spice-button bg-spice-ivory border border-spice-cardamom-200 text-sm text-spice-espresso placeholder:text-spice-taupe/70 focus:outline-none focus:ring-2 focus:ring-spice-terracotta/20 focus:border-spice-terracotta transition-colors"
                  />
                  <Button variant="primary" size="md" type="submit" showArrow>
                    Subscribe
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Multi-Column Links Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-spice-cardamom-200/80">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-spice-terracotta to-spice-terracotta-600 flex items-center justify-center text-spice-white font-serif font-bold text-lg shadow-warm-xs">
                A
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-serif font-bold text-xl tracking-tight text-spice-espresso leading-none">
                    AAXOL
                  </span>
                  <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-spice-cardamom bg-spice-cardamom-100/60 px-1.5 py-0.5 rounded border border-spice-cardamom/25">
                    by Organium
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-widest text-spice-taupe font-semibold mt-0.5">
                  Pure Artisanal Spices
                </span>
              </div>
            </Link>

            <p className="text-xs leading-relaxed text-spice-taupe mb-5 max-w-sm">
              Authentic Indian spices crafted to bring rich flavour to every kitchen worldwide. Single-origin, traditionally stone-ground to protect natural volatile oils and aroma.
            </p>

            <div className="space-y-1.5 text-[11px] text-spice-taupe">
              <p className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-spice-turmeric shrink-0" />
                <span>FSSAI Central Lic. No. 10020042000123</span>
              </p>
              <p className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-spice-cardamom shrink-0" />
                <span>24-Parameter Laboratory Tested Purity</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5 text-spice-cardamom shrink-0" />
                <span>Shipping Across All India & International Export Grade</span>
              </p>
            </div>
          </div>

          {/* Col 2: SHOP */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-spice-cardamom mb-4">
              Shop
            </h4>
            <ul className="space-y-2.5 text-xs text-spice-espresso">
              <li>
                <Link href="/shop" className="hover:text-spice-terracotta transition-colors">
                  All Spices
                </Link>
              </li>
              <li>
                <Link href="/category/whole-spices" className="hover:text-spice-terracotta transition-colors">
                  Whole Spices
                </Link>
              </li>
              <li>
                <Link href="/category/spice-powders" className="hover:text-spice-terracotta transition-colors">
                  Spice Powders
                </Link>
              </li>
              <li>
                <Link href="/category/blended-masalas" className="hover:text-spice-terracotta transition-colors">
                  Blended Masalas
                </Link>
              </li>
              <li>
                <Link href="/offers#combos" className="hover:text-spice-terracotta transition-colors">
                  Combo Packs
                </Link>
              </li>
              <li>
                <Link href="/offers" className="text-spice-terracotta hover:underline transition-colors flex items-center gap-1.5 font-medium">
                  <span>Special Offers</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-spice-peach text-spice-terracotta font-semibold">SAVE</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: HELP */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-spice-cardamom mb-4">
              Help
            </h4>
            <ul className="space-y-2.5 text-xs text-spice-espresso">
              <li>
                <Link href="/contact" className="hover:text-spice-terracotta transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-spice-terracotta transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-spice-terracotta transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-spice-terracotta transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-spice-terracotta transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: COMPANY */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-spice-cardamom mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-spice-espresso">
              <li>
                <Link href="/about" className="hover:text-spice-terracotta transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-spice-terracotta transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/recipes" className="hover:text-spice-terracotta transition-colors">
                  Traditional Recipes
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-spice-terracotta transition-colors">
                  Quality Standards
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-spice-terracotta transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-spice-terracotta transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Social & Security Trust Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-spice-taupe mr-1">Connect with us:</span>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-2.5 rounded-full bg-spice-white border border-spice-cardamom-200 text-spice-espresso hover:text-spice-terracotta hover:border-spice-terracotta/40 hover:bg-spice-sand/50 transition-colors shadow-warm-xs"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="p-2.5 rounded-full bg-spice-white border border-spice-cardamom-200 text-spice-espresso hover:text-spice-terracotta hover:border-spice-terracotta/40 hover:bg-spice-sand/50 transition-colors shadow-warm-xs"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="p-2.5 rounded-full bg-spice-white border border-spice-cardamom-200 text-spice-espresso hover:text-spice-terracotta hover:border-spice-terracotta/40 hover:bg-spice-sand/50 transition-colors shadow-warm-xs"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="p-2.5 rounded-full bg-spice-white border border-spice-cardamom-200 text-spice-espresso hover:text-spice-terracotta hover:border-spice-terracotta/40 hover:bg-spice-sand/50 transition-colors shadow-warm-xs"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>

          {/* Secure Payment Badges */}
          <div className="flex items-center gap-2 text-[11px] text-spice-espresso bg-spice-white px-4 py-2 rounded-spice-button border border-spice-cardamom-200 shadow-warm-xs">
            <Lock className="w-3.5 h-3.5 text-spice-cardamom shrink-0" />
            <span>256-Bit SSL Encrypted Checkout • UPI • Cards • NetBanking • Global COD</span>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 pt-6 border-t border-spice-cardamom-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-spice-taupe">
          <p>© {new Date().getFullYear()} Organium Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-spice-terracotta transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about" className="hover:text-spice-terracotta transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/about" className="hover:text-spice-terracotta transition-colors">
              Refund Policy
            </Link>
            <Link href="/admin" className="hover:text-spice-terracotta transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
