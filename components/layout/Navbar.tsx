'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Heart,
  User,
  Search,
  Menu,
  X,
  Phone,
  MapPin,
  ChevronDown,
  ShieldCheck,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import { Container } from '../common/Container';
import { useStore } from '@/context/StoreContext';
import { cn } from '@/utils/cn';
import { useDistrictLocation } from '@/hooks/useDistrictLocation';
import { ALL_DISTRICTS, RAJASTHAN_DISTRICTS, INDIA_MAJOR_DISTRICTS, ALL_STATES_META } from '@/data/rajasthanDistricts';

const POPULAR_SEARCHES = [
  { label: 'HB-3000 Plus 3-Part Hematology Analyzer', category: 'Hematology', href: '/product/hb-3000-plus-3-part-hematology-analyzer' },
  { label: 'HB-5800 5-Part Laser Hematology Analyzer', category: 'Hematology', href: '/product/hb-5800-5-part-laser-hematology-analyzer' },
  { label: 'Universal CBC Reagents Pack (Diluent 20L + Lyse)', category: 'Reagents', href: '/product/universal-cbc-hematology-reagents-diluent-lyse-pack' },
  { label: 'HB-ChemTouch Semi-Auto Biochemistry Analyzer', category: 'Biochemistry', href: '/product/hb-chemtouch-semi-automated-biochemistry-analyzer' },
  { label: 'Liver Function Test (LFT) Reagents Kit', category: 'Biochemistry', href: '/product/liver-function-test-lft-liquid-stable-reagents-combo-kit' },
  { label: 'HB-Scope 4000 Trinocular LED Microscope', category: 'Microscopes', href: '/product/hb-scope-4000-trinocular-led-laboratory-microscope' },
  { label: 'HB-Spin 6000 Digital Clinical Centrifuge', category: 'Centrifuges', href: '/product/hb-spin-6000-digital-clinical-centrifuge-8x15ml' },
  { label: 'Complete Pathology Lab Setup Bundle', category: 'Lab Setup', href: '/offers#combos' },
  { label: 'Hematology Analyzers in Nagaur', category: 'Nagaur Hub', href: '/rajasthan/nagaur/hematology' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [districtSearch, setDistrictSearch] = useState('');
  const [selectedStateFilter, setSelectedStateFilter] = useState<string>('all');
  const pathname = usePathname();
  const { cartCount, wishlist, isSearchOpen, closeSearch, toggleSearch, openCart } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const activeLocation = useDistrictLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    closeSearch();
    setIsLocationModalOpen(false);
  }, [pathname, closeSearch]);

  const navLinks = [
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Products', href: '/shop' },
    { label: '780+ Hubs', href: '/rajasthan' },
    { label: 'Contact', href: '/contact' },
  ];

  const POPULAR_STATES = [
    { id: 'all', label: `All India (${ALL_DISTRICTS.length})` },
    { id: 'Rajasthan', label: 'Rajasthan (50)' },
    { id: 'Uttar Pradesh', label: 'Uttar Pradesh (75)' },
    { id: 'Maharashtra', label: 'Maharashtra (36)' },
    { id: 'Bihar', label: 'Bihar (38)' },
    { id: 'Madhya Pradesh', label: 'Madhya Pradesh (55)' },
    { id: 'Gujarat', label: 'Gujarat (33)' },
    { id: 'Delhi NCR', label: 'Delhi NCR (11)' },
    { id: 'Haryana', label: 'Haryana (22)' },
    { id: 'Punjab', label: 'Punjab (23)' },
    { id: 'West Bengal', label: 'West Bengal (23)' },
    { id: 'Karnataka', label: 'Karnataka (31)' },
    { id: 'Tamil Nadu', label: 'Tamil Nadu (38)' },
    { id: 'Telangana', label: 'Telangana (33)' },
    { id: 'Andhra Pradesh', label: 'Andhra Pradesh (26)' },
    { id: 'Kerala', label: 'Kerala (14)' },
    { id: 'Odisha', label: 'Odisha (30)' },
    { id: 'Jharkhand', label: 'Jharkhand (24)' },
    { id: 'Chhattisgarh', label: 'Chhattisgarh (33)' },
    { id: 'Assam', label: 'Assam (31)' },
    { id: 'Uttarakhand', label: 'Uttarakhand (13)' },
  ];

  // Filter districts in modal across all 780+ Indian districts
  const filteredDistricts = ALL_DISTRICTS.filter((dist) => {
    if (selectedStateFilter !== 'all') {
      if (selectedStateFilter === 'rajasthan' && dist.state && dist.state !== 'Rajasthan') return false;
      if (selectedStateFilter === 'india' && (!dist.state || dist.state === 'Rajasthan')) return false;
      if (
        selectedStateFilter !== 'rajasthan' &&
        selectedStateFilter !== 'india' &&
        dist.state &&
        !dist.state.toLowerCase().includes(selectedStateFilter.toLowerCase())
      ) {
        return false;
      }
    }
    if (!districtSearch.trim()) return true;
    const q = districtSearch.toLowerCase().trim();
    return (
      dist.name.toLowerCase().includes(q) ||
      dist.pincode.includes(q) ||
      (dist.state && dist.state.toLowerCase().includes(q)) ||
      dist.hindiName.includes(q)
    );
  }).slice(0, 60);

  const dynamicStateMatches = searchQuery.trim().length >= 2
    ? Object.entries(ALL_STATES_META)
        .filter(([k, v]) =>
          k.includes(searchQuery.toLowerCase().trim()) ||
          v.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
          v.hindiName.includes(searchQuery.trim())
        )
        .slice(0, 3)
        .map(([k, v]) => ({
          label: `${v.name} State Diagnostic Supply Hub (${v.zone})`,
          category: 'State Portal',
          href: `/${k}`,
        }))
    : [];

  const dynamicDistrictMatches = searchQuery.trim().length >= 2
    ? ALL_DISTRICTS.filter((d) =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        d.pincode.includes(searchQuery.trim()) ||
        (d.state && d.state.toLowerCase().includes(searchQuery.toLowerCase().trim())) ||
        d.hindiName.includes(searchQuery.trim())
      )
        .slice(0, 5)
        .map((d) => ({
          label: `${d.name} (${d.hindiName}) - Diagnostic Hub`,
          category: d.state || 'District Hub',
          href: `/${d.slug}`,
        }))
    : [];

  const productMatches = POPULAR_SEARCHES.filter(
    (item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSuggestions = [
    ...dynamicStateMatches,
    ...dynamicDistrictMatches,
    ...productMatches,
  ].slice(0, 8);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-200 border-b bg-white',
          isScrolled
            ? 'shadow-md border-slate-200 py-2.5'
            : 'border-slate-200 py-3.5'
        )}
        style={{ backgroundColor: '#ffffff', opacity: 1 }}
      >
        <Container size="2xl">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Mobile trigger & Big Prominent Brand Logo */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open mobile navigation menu"
                className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Large, Beautiful Human Biomedical Logo */}
              <Link
                href="/"
                className="flex items-center gap-2.5 group shrink-0 cursor-pointer"
                title="Human Biomedical - Go to Homepage"
              >
                <img
                  src="/images/human-biomedical-logo.png"
                  alt="Human Biomedical LLP Logo"
                  className="h-10 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-102"
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-base sm:text-lg lg:text-xl text-slate-900 tracking-tight leading-none">
                      Human Biomedical
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50 px-1 py-0.2 rounded border border-red-200">
                      LLP
                    </span>
                  </div>
                  <span className="text-[9px] font-semibold tracking-wider text-slate-500 uppercase mt-0.5 hidden 2xl:block">
                    Clinical Diagnostic Equipment
                  </span>
                </div>
              </Link>

              {/* Location Switcher Pill - visible on very wide screens */}
              <button
                type="button"
                onClick={() => setIsLocationModalOpen(true)}
                className="hidden 2xl:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-bold text-slate-800 transition-colors ml-1 shadow-xs whitespace-nowrap"
                title="Select District or State Hub"
              >
                <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                <span className="truncate max-w-[130px]">
                  {activeLocation.isDistrictActive
                    ? `${activeLocation.district?.name} Hub`
                    : '780+ Hubs'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>

            {/* Center: Clean Desktop Navigation Menu */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm font-semibold text-slate-700 whitespace-nowrap">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href === '/shop' &&
                    (pathname?.startsWith('/shop') ||
                      pathname?.startsWith('/category') ||
                      pathname?.startsWith('/product'))) ||
                  (link.href === '/services' && pathname?.startsWith('/services')) ||
                  (link.href === '/rajasthan' && pathname?.startsWith('/rajasthan'));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'relative py-1 transition-colors hover:text-red-600',
                      isActive ? 'text-red-600 font-bold' : 'text-slate-700'
                    )}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Actions, Search, Cart & Quote CTA */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              {/* Search Toggle */}
              <button
                type="button"
                onClick={toggleSearch}
                aria-label="Search analyzers and reagents"
                className="p-2 rounded-full text-slate-700 hover:text-red-600 hover:bg-slate-100 transition-colors"
                title="Search"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                aria-label="Saved Equipment"
                className="p-2 rounded-full text-slate-700 hover:text-red-600 hover:bg-slate-100 transition-colors relative hidden sm:inline-flex"
                title="Saved Items"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] px-1 rounded-full bg-red-600 text-white text-[9px] font-bold flex items-center justify-center leading-none">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Inquiry Cart Icon Button */}
              <button
                type="button"
                onClick={openCart}
                aria-label="Inquiry Cart"
                className="relative p-2 rounded-full text-slate-700 hover:text-red-600 hover:bg-slate-100 transition-colors"
                title="Inquiry Cart"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] px-1 rounded-full bg-red-600 text-white text-[9px] font-bold flex items-center justify-center leading-none">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Primary Quote CTA Button */}
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-all hover:shadow-sm whitespace-nowrap"
              >
                <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Get Quote</span>
              </Link>
            </div>
          </div>
        </Container>
      </header>

      {/* =========================================================================
          DISTRICT / LOCATION SELECTION MODAL
      ========================================================================= */}
      <AnimatePresence>
        {isLocationModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 overflow-hidden flex flex-col max-h-[85vh]"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="font-extrabold text-xl text-slate-900">
                    Select Your Service District / Hub
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Covering all 50 districts of Rajasthan &amp; major healthcare hubs across India
                  </p>
                </div>
                <button
                  onClick={() => setIsLocationModalOpen(false)}
                  className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search & State Filter Tabs */}
              <div className="py-4 space-y-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={districtSearch}
                    onChange={(e) => setDistrictSearch(e.target.value)}
                    placeholder="Search district, city or PIN (e.g. Nagaur, Jaipur, Delhi, Ahmedabad, Lucknow...)"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
                  {POPULAR_STATES.map((st) => (
                    <button
                      key={st.id}
                      onClick={() => {
                        setSelectedStateFilter(st.id);
                        setDistrictSearch('');
                      }}
                      className={cn(
                        'px-3 py-1.5 rounded-lg font-bold shrink-0 transition-all text-xs',
                        selectedStateFilter === st.id
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      )}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Districts Grid */}
              <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 gap-2 pb-2">
                <Link
                  href="/"
                  onClick={() => setIsLocationModalOpen(false)}
                  className="p-3 rounded-2xl border border-slate-200 hover:border-red-500 hover:bg-red-50/40 transition-colors flex items-start gap-2.5"
                >
                  <MapPin className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-sm text-slate-900 block">Jaipur Central Headquarters</span>
                    <span className="text-[11px] text-slate-500">200 Feet Bypass Road, Tagor Nagar (State Dispatch Hub)</span>
                  </div>
                </Link>

                {filteredDistricts.map((dist) => (
                  <Link
                    key={dist.slug}
                    href={`/${dist.slug}`}
                    onClick={() => setIsLocationModalOpen(false)}
                    className={cn(
                      'p-3 rounded-2xl border transition-colors flex items-start gap-2.5',
                      activeLocation.district?.slug === dist.slug
                        ? 'border-red-600 bg-red-50/60 font-bold'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    )}
                  >
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-bold text-sm text-slate-900 truncate">{dist.name}</span>
                        <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                          {dist.state || 'Rajasthan'}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 truncate block">
                        PIN: {dist.pincode} • {dist.landmark.slice(0, 38)}...
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          SEARCH OVERLAY
      ========================================================================= */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl p-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="font-bold text-sm text-slate-900">Search Diagnostic Instruments &amp; Reagents</span>
                <button
                  onClick={closeSearch}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative mt-4">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search CBC Analyzers, Biochemistry Reagents, Microscopes..."
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                />
              </div>

              <div className="mt-4 max-h-72 overflow-y-auto space-y-1 divide-y divide-slate-100">
                {filteredSuggestions.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={closeSearch}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors text-xs sm:text-sm text-slate-800"
                  >
                    <span className="font-medium">{item.label}</span>
                    <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          MOBILE DRAWER
      ========================================================================= */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.25 }}
              className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto z-10"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                  <Link
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 cursor-pointer"
                    title="Human Biomedical - Go to Homepage"
                  >
                    <img
                      src="/images/human-biomedical-logo.png"
                      alt="Human Biomedical Logo"
                      className="h-10 w-auto"
                    />
                    <span className="font-extrabold text-base text-slate-900">Human Biomedical</span>
                  </Link>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1 rounded-full text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block p-3 rounded-xl font-bold text-slate-800 hover:bg-slate-50 hover:text-red-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsLocationModalOpen(true);
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800"
                  >
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-600" />
                      <span>{activeLocation.isDistrictActive ? `${activeLocation.district?.name} Hub` : 'Select District Hub'}</span>
                    </span>
                    <span className="text-red-600">Change →</span>
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <a
                  href="tel:+919829088234"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-red-600 text-white font-bold text-sm shadow-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call +91 98290 88234</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
