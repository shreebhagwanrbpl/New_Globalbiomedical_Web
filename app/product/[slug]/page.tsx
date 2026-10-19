'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Container, Button, Badge } from '@/components/common';
import { ProductCard } from '@/components/products/ProductCard';
import { staticProducts, getProductBySlug } from '@/data/products';
import { staticFAQs } from '@/data/faqs';
import { staticCustomerReviews } from '@/data/reviews';
import { useStore } from '@/context/StoreContext';
import { formatCurrency } from '@/utils/currency';
import { Product, PackSizeOption } from '@/types/product';
import {
  WishlistButton,
  AddToCartButton,
  LUXURY_EASE,
} from '@/components/animations/Motion';
import {
  ChevronRight,
  Star,
  ShieldCheck,
  Truck,
  CheckCircle2,
  MapPin,
  Award,
  Activity,
  FileCheck,
  Wrench,
  ThermometerSnowflake,
  Microscope,
  PhoneCall,
  Clock,
  FileText,
  MessageCircle,
  ArrowRight,
} from 'lucide-react';
import { RAJASTHAN_DISTRICTS, HEADQUARTERS_INFO } from '@/data/rajasthanDistricts';
import { GetQuoteModal } from '@/components/modals/GetQuoteModal';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const product = getProductBySlug(slug) || staticProducts[0];

  const { addToCart, toggleWishlist, isInWishlist, addRecentlyViewed, recentlyViewed } = useStore();
  const isWishlisted = isInWishlist(product.id);

  // Track recently viewed
  useEffect(() => {
    if (product) {
      addRecentlyViewed(product);
    }
  }, [product, addRecentlyViewed]);

  // Pack sizes / Configuration options
  const packSizes: PackSizeOption[] = product.packSizes && product.packSizes.length > 0
    ? product.packSizes
    : [
        {
          weight: product.weight || 'Standard Configuration',
          price: product.salePrice || product.price,
          mrp: product.mrp || product.price,
          discountPercentage: product.discountPercentage || 0,
          inStock: product.stock > 0
        }
      ];

  const [selectedPackIndex, setSelectedPackIndex] = useState(0);
  const currentPack = packSizes[selectedPackIndex] || packSizes[0];

  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'about' | 'specs' | 'parameters' | 'installation' | 'reviews' | 'faqs'>('about');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  // Auto-open quote modal if navigated from "Get Quote" card with ?quote=open
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('quote=open')) {
      setIsQuoteModalOpen(true);
    }
  }, []);

  const currentPrice = currentPack.price;
  const currentMrp = currentPack.mrp;
  const currentDiscount = currentPack.discountPercentage || (currentMrp > currentPrice ? Math.round(((currentMrp - currentPrice) / currentMrp) * 100) : 0);
  const currentSavings = Math.max(0, currentMrp - currentPrice);

  const images = product.images && product.images.length > 0
    ? product.images
    : ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1000&auto=format&fit=crop&q=80'];

  const handleAddToCart = () => {
    addToCart(product, quantity, currentPack.weight);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, currentPack.weight);
    router.push('/checkout');
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      if (pincode.startsWith('30') || pincode.startsWith('31') || pincode.startsWith('32') || pincode.startsWith('33') || pincode.startsWith('34')) {
        setPincodeStatus(`Verified Rajasthan PIN ${pincode}! 24–48 hr direct dispatch with on-site biomedical engineer calibration.`);
      } else {
        setPincodeStatus(`Available! Standard dispatch to PIN ${pincode} in 3–5 business days with CDSCO calibration certificate.`);
      }
    } else {
      setPincodeStatus('Please enter a valid 6-digit Indian PIN code.');
    }
  };

  // Related products from same category
  const relatedProducts = useMemo(() => {
    return staticProducts
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  return (
    <div className="min-h-screen bg-spice-ivory pb-24">
      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-spice-border py-3">
        <Container size="2xl">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-spice-taupe font-medium truncate">
            <Link href="/" className="hover:text-spice-espresso">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-spice-border-strong shrink-0" />
            <Link href="/shop" className="hover:text-spice-espresso">Diagnostic Equipment</Link>
            <ChevronRight className="w-3.5 h-3.5 text-spice-border-strong shrink-0" />
            <Link href={`/category/${product.category}`} className="hover:text-spice-espresso capitalize">
              {product.category.replace(/-/g, ' ')}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-spice-border-strong shrink-0" />
            <span className="text-spice-espresso font-bold truncate">{product.title}</span>
          </nav>
        </Container>
      </div>

      <Container size="2xl" className="mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* =========================================================================
              LEFT COLUMN: PRODUCT IMAGE GALLERY WITH ZOOM & THUMBNAILS
          ========================================================================= */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-white border border-spice-border p-4 shadow-warm-sm group">
              {/* Badge */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 items-start pointer-events-none">
                {product.offerBadge && (
                  <span className="px-3 py-1 rounded-full bg-spice-terracotta text-white text-xs font-bold shadow-warm-xs">
                    {product.offerBadge}
                  </span>
                )}
                {product.bestSeller && (
                  <span className="px-3 py-1 rounded-full bg-spice-espresso text-white text-xs font-bold shadow-warm-xs">
                    HOSPITAL GRADE
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <div className="absolute top-4 right-4 z-10">
                <WishlistButton
                  isWishlisted={isWishlisted}
                  onClick={() => toggleWishlist(product)}
                />
              </div>

              {/* Main Image */}
              <motion.img
                key={activeImageIndex}
                initial={{ opacity: 0.6, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: LUXURY_EASE }}
                src={images[activeImageIndex] || images[0]}
                alt={product.title}
                className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-white ${
                      activeImageIndex === idx
                        ? 'border-spice-terracotta shadow-warm-xs scale-102'
                        : 'border-spice-border opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`${product.title} view ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Quality Guarantees Banner */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-spice-sand/30 rounded-2xl border border-spice-border text-center">
              <div className="flex flex-col items-center">
                <Award className="w-4 h-4 text-spice-cardamom mb-1" />
                <span className="text-[11px] font-bold text-spice-espresso">ISO 13485:2016</span>
                <span className="text-[9px] text-spice-taupe">Medical Grade Device</span>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-4 h-4 text-spice-terracotta mb-1" />
                <span className="text-[11px] font-bold text-spice-espresso">NABL Calibrated</span>
                <span className="text-[9px] text-spice-taupe">Traceable QC Report</span>
              </div>
              <div className="flex flex-col items-center">
                <Wrench className="w-4 h-4 text-spice-turmeric mb-1" />
                <span className="text-[11px] font-bold text-spice-espresso">Engineer Install</span>
                <span className="text-[9px] text-spice-taupe">Rajasthan On-Site Demo</span>
              </div>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: PRODUCT DETAILS, PACK SIZES, PRICING & CTAS
          ========================================================================= */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Brand & Category */}
              <div className="flex items-center justify-between gap-2 text-xs font-semibold text-spice-taupe mb-2">
                <span className="text-spice-cardamom font-bold uppercase tracking-wider">
                  {product.brand || 'Human Biomedical LLP'} • {product.origin || 'Jaipur Hub'}
                </span>
                <span className="capitalize">{product.category.replace(/-/g, ' ')}</span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-spice-espresso tracking-tight leading-tight mb-2">
                {product.title}
              </h1>

              {/* Technical / Clinical Tagline */}
              {product.flavourProfile && (
                <p className="text-sm font-medium text-spice-terracotta italic mb-3">
                  "{product.flavourProfile}"
                </p>
              )}

              {/* Rating & Review Count */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60 text-amber-700 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{product.rating || 4.9}</span>
                </div>
                <span className="text-xs text-spice-taupe">
                  Trusted by <strong>{product.reviewCount || 68}</strong> diagnostic centers &amp; labs in Rajasthan
                </span>
                <span className="text-xs text-spice-cardamom font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Direct Lab Dispatch
                </span>
              </div>

              {/* Blurred Institutional Price Section */}
              <div className="relative overflow-hidden rounded-2xl p-5 bg-slate-50 border border-slate-200/90 mb-6">
                {/* The actual figures are deeply blurred */}
                <div className="filter blur-[10px] select-none pointer-events-none opacity-40 space-y-2">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900">
                      {formatCurrency(currentPrice)}
                    </span>
                    {currentMrp > currentPrice && (
                      <span className="text-base sm:text-lg text-slate-400 line-through">
                        {formatCurrency(currentMrp)}
                      </span>
                    )}
                    <span className="px-2.5 py-1 rounded-md bg-emerald-600 text-white text-xs font-bold">
                      INSTITUTIONAL TARIFF
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-600">
                    ✓ Institutional Wholesale Price: Confidential hospital and laboratory discounted slab with GST invoice.
                  </p>
                </div>

                {/* Confidential Overlay Callout */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center bg-slate-900/10 backdrop-blur-[2px]">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-md tracking-wide">
                    <span>🔒 Institutional Price Confidential</span>
                  </div>
                  <p className="text-xs text-slate-700 font-semibold mt-1.5">
                    Click <strong>&quot;Get Official Quote&quot;</strong> below to receive instant B2B quotation for your facility.
                  </p>
                </div>
              </div>

              {/* Pack Size / Variant Selector */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Select Configuration / Pack Size:
                  </span>
                  <span className="text-xs text-slate-500">
                    Selected: <strong className="text-slate-900">{currentPack.weight}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {packSizes.map((pack, idx) => (
                    <button
                      key={pack.weight}
                      type="button"
                      onClick={() => setSelectedPackIndex(idx)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        selectedPackIndex === idx
                          ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                          : 'border-slate-200 bg-white text-slate-800 hover:border-red-500'
                      }`}
                    >
                      <span className="block font-bold text-xs truncate">{pack.weight}</span>
                      <span className={`block text-[11px] mt-0.5 font-semibold ${selectedPackIndex === idx ? 'text-amber-300' : 'text-emerald-700'}`}>
                        🔒 Rate on Quote
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Primary Quotation Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-6">
                <button
                  type="button"
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-red-600/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <FileText className="w-5 h-5" />
                  <span>Get Official Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`https://wa.me/919829088234?text=${encodeURIComponent(
                    `Hello Human Biomedical LLP, I would like to receive an official price quote for ${product.title} (${currentPack.weight}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 px-5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all shrink-0"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Quote</span>
                </a>
              </div>

              {/* Pincode Delivery Checker */}
              <div className="p-4 bg-white rounded-2xl border border-spice-border mb-6">
                <div className="flex items-center gap-2 text-xs font-bold text-spice-espresso mb-2">
                  <MapPin className="w-4 h-4 text-spice-terracotta" />
                  <span>Check Rajasthan District Delivery &amp; Engineer Availability</span>
                </div>
                <form onSubmit={handleCheckPincode} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter 6-digit PIN (e.g. 341001 for Nagaur, 302021 for Jaipur)"
                    className="flex-1 px-3 py-2 rounded-xl border border-spice-border text-xs focus:outline-none focus:border-spice-terracotta"
                  />
                  <Button type="submit" variant="outline" size="sm">
                    Verify
                  </Button>
                </form>
                {pincodeStatus && (
                  <p className="text-xs font-semibold text-spice-cardamom mt-2">
                    {pincodeStatus}
                  </p>
                )}
              </div>

              {/* Direct Support Hotline */}
              <div className="flex items-center gap-3 p-3 bg-spice-cardamom-50 rounded-xl border border-spice-cardamom-200 text-xs text-spice-cardamom font-semibold">
                <PhoneCall className="w-4 h-4 shrink-0 text-spice-cardamom" />
                <span>Need quotation or institutional demo? Call Biomedical Desk: <a href="tel:+919829088234" className="underline font-bold">+91 98290 88234</a></span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            RICH ACCORDION / TABBED INFORMATION SECTION
        ========================================================================= */}
        <div className="mt-14 bg-white rounded-3xl border border-spice-border p-6 sm:p-8 shadow-warm-xs">
          {/* Tab Navigation */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-spice-border">
            {[
              { id: 'about', label: 'Technical Overview' },
              { id: 'specs', label: 'Specifications & Standards' },
              { id: 'parameters', label: 'Clinical Parameters' },
              { id: 'installation', label: 'Rajasthan Support & Warranty' },
              { id: 'reviews', label: `Lab Reviews (${product.reviewCount || 68})` },
              { id: 'faqs', label: 'FAQs' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-spice-espresso text-white shadow-warm-xs'
                    : 'text-spice-taupe hover:bg-spice-sand/50 hover:text-spice-espresso'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="pt-6">
            {activeTab === 'about' && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="font-serif font-bold text-xl text-spice-espresso">
                  Clinical Performance &amp; Engineering Overview
                </h3>
                <p className="text-sm text-spice-taupe leading-relaxed">
                  {product.description}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                  <div className="p-3.5 bg-spice-sand/20 rounded-xl border border-spice-border">
                    <span className="text-[11px] font-bold text-spice-taupe block uppercase">Device Grade</span>
                    <span className="text-sm font-bold text-spice-espresso">{product.spiceLevel ? `Medical Standard (${product.spiceLevel})` : 'Class B / C IVD Device'}</span>
                  </div>
                  <div className="p-3.5 bg-spice-sand/20 rounded-xl border border-spice-border">
                    <span className="text-[11px] font-bold text-spice-taupe block uppercase">Warranty / AMC</span>
                    <span className="text-sm font-bold text-spice-espresso">{product.shelfLife || '12–24 Months Comprehensive'}</span>
                  </div>
                  <div className="p-3.5 bg-spice-sand/20 rounded-xl border border-spice-border">
                    <span className="text-[11px] font-bold text-spice-taupe block uppercase">Storage &amp; Operation</span>
                    <span className="text-sm font-bold text-spice-espresso">{product.storage || '15°C – 30°C Air-Conditioned'}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="font-serif font-bold text-xl text-spice-espresso">
                  Compliance, Calibration &amp; Standards
                </h3>
                <p className="text-sm text-spice-taupe">
                  All equipment and reagents delivered by Human Biomedical LLP conform strictly to Indian and international in-vitro diagnostic standards:
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((spec, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-spice-sand/40 border border-spice-border text-xs font-semibold text-spice-espresso flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-spice-cardamom" /> {spec}
                    </span>
                  ))}
                </div>

                <div className="mt-4 p-4 bg-spice-cardamom-50 rounded-xl border border-spice-cardamom-200 text-xs text-spice-cardamom font-medium space-y-1">
                  <div><strong>Registered Office:</strong> {HEADQUARTERS_INFO.address}</div>
                  <div><strong>Regulatory Status:</strong> CDSCO Registered Medical Device | ISO 13485:2016 Quality Management</div>
                </div>
              </div>
            )}

            {activeTab === 'parameters' && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="font-serif font-bold text-xl text-spice-espresso">
                  Diagnostic Applications &amp; Tested Parameters
                </h3>
                <p className="text-sm text-spice-taupe leading-relaxed">
                  {product.usage || 'Engineered for high-precision diagnostic throughput across hospital laboratories, standalone pathology centers, and clinical investigation units.'}
                </p>
                {product.bestFor && product.bestFor.length > 0 && (
                  <div>
                    <span className="text-xs font-bold text-spice-espresso uppercase block mb-2">
                      Key Clinical Diagnostic Capabilities:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {product.bestFor.map((item, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-full bg-spice-peach/40 text-spice-terracotta text-xs font-bold flex items-center gap-1">
                          <Activity className="w-3.5 h-3.5" /> {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'installation' && (
              <div className="max-w-3xl space-y-4">
                <h3 className="font-serif font-bold text-xl text-spice-espresso">
                  Comprehensive Rajasthan Engineer Network &amp; On-Site Training
                </h3>
                <p className="text-sm text-spice-taupe leading-relaxed">
                  Human Biomedical LLP maintains dedicated field service engineers stationed across Jaipur, Jodhpur, Kota, Bikaner, Udaipur, and Nagaur. Every instrument order includes:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-spice-espresso">
                  <div className="p-3 bg-spice-sand/30 rounded-xl border border-spice-border">
                    <span className="font-bold block text-sm mb-1">✓ On-Site Installation</span>
                    <span>Direct setup in your laboratory by certified biomedical engineers within 24–48 hours of delivery.</span>
                  </div>
                  <div className="p-3 bg-spice-sand/30 rounded-xl border border-spice-border">
                    <span className="font-bold block text-sm mb-1">✓ Technician Training</span>
                    <span>Complete operational, maintenance, and quality control calibration training for your lab staff.</span>
                  </div>
                  <div className="p-3 bg-spice-sand/30 rounded-xl border border-spice-border">
                    <span className="font-bold block text-sm mb-1">✓ Continuous Reagent Supply</span>
                    <span>Guaranteed cold-chain delivery of matching reagents and consumables across all 50 districts.</span>
                  </div>
                  <div className="p-3 bg-spice-sand/30 rounded-xl border border-spice-border">
                    <span className="font-bold block text-sm mb-1">✓ Annual Maintenance (AMC/CMC)</span>
                    <span>Preventive maintenance schedules, emergency breakdown repair, and genuine spare parts backing.</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-xl text-spice-espresso">
                    Verified Pathologist &amp; Lab Director Feedback
                  </h3>
                  <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{product.rating || 4.9} / 5.0 Rating</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {staticCustomerReviews.slice(0, 4).map((rev) => (
                    <div key={rev.id} className="p-4 rounded-2xl bg-spice-sand/20 border border-spice-border">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-xs text-spice-espresso">{rev.name} ({rev.city})</span>
                        <div className="flex text-amber-500 text-xs">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                      </div>
                      <h5 className="font-bold text-xs text-spice-espresso mb-1">"{rev.title}"</h5>
                      <p className="text-xs text-spice-taupe">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'faqs' && (
              <div className="space-y-3 max-w-3xl">
                {staticFAQs.slice(0, 4).map((faq) => (
                  <div key={faq.id} className="p-4 rounded-xl bg-spice-sand/20 border border-spice-border">
                    <h4 className="font-serif font-bold text-sm text-spice-espresso mb-1">{faq.question}</h4>
                    <p className="text-xs text-spice-taupe leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* =========================================================================
            RELATED PRODUCTS
        ========================================================================= */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-spice-espresso">
                  Complementary Clinical Equipment &amp; Reagents
                </h3>
                <p className="text-xs sm:text-sm text-spice-taupe">
                  Pair with compatible controls, calibrators, and diagnostic instruments.
                </p>
              </div>
              <Link href="/shop" className="text-xs font-bold text-spice-terracotta hover:underline">
                View All Catalog →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4 md:gap-5">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            RECENTLY VIEWED
        ========================================================================= */}
        {recentlyViewed.length > 1 && (
          <div className="mt-16 pt-10 border-t border-spice-border">
            <h3 className="font-serif font-bold text-lg sm:text-xl text-spice-espresso mb-4">
              Recently Viewed Diagnostic Products
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {recentlyViewed.filter(p => p.id !== product.id).slice(0, 6).map((p) => (
                <ProductCard key={p.id} product={p} showFlavourNote={false} />
              ))}
            </div>
          </div>
        )}
      </Container>

      {/* =========================================================================
          MOBILE STICKY GET QUOTE BAR
      ========================================================================= */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 shadow-lg flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-slate-500 block font-medium">
            {currentPack.weight}
          </span>
          <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
            🔒 Rate on Quote
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsQuoteModalOpen(true)}
          className="py-2.5 px-5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <FileText className="w-4 h-4" />
          <span>Get Quote</span>
        </button>
      </div>

      {/* Official Get Quote Modal */}
      <GetQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        product={{
          id: product.id,
          title: product.title,
          image: images[0],
          category: product.category,
          slug: product.slug,
          weight: currentPack.weight,
        }}
      />
    </div>
  );
}
