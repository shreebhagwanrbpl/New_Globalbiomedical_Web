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
  Sparkles,
  ArrowRight,
  Phone,
  Flame,
  Check,
} from 'lucide-react';
import { Container } from '../common/Container';
import { Badge } from '../common/Badge';
import { useStore } from '@/context/StoreContext';
import { cn } from '@/utils/cn';
import { LUXURY_EASE } from '../animations/Motion';

const SEARCH_SUGGESTIONS = [
  { label: 'Kashmiri Mongra Saffron', category: 'Royal Exotics', href: '/product/kashmiri-saffron' },
  { label: 'Tellicherry Malabar Black Pepper', category: 'Whole Spices', href: '/product/malabar-black-pepper' },
  { label: 'High-Curcumin Lakadong Turmeric', category: 'Spice Powders', href: '/product/lakadong-turmeric' },
  { label: 'Shahi Biryani Masala Blend', category: 'Blended Masalas', href: '/product/shahi-biryani-masala' },
  { label: 'Alleppey Green Cardamom 8mm+', category: 'Whole Spices', href: '/product/alleppey-green-cardamom' },
  { label: 'The Master Spice Vault 5-in-1', category: 'Combo Packs', href: '/offers#combos' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cartCount, wishlist, isSearchOpen, openSearch, closeSearch, toggleSearch, openCart, lastAddedItemId } = useStore();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer and search upon route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    closeSearch();
  }, [pathname, closeSearch]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: 'Shop', href: '/shop' },
    { label: 'Categories', href: '/category/whole-spices' },
    {
      label: 'Offers',
      href: '/offers',
      badge: 'SALE',
      highlight: true,
    },
    { label: 'Combos', href: '/offers#combos' },
    { label: 'Recipes', href: '/recipes' },
    { label: 'Our Story', href: '/about' },
  ];

  const filteredSuggestions = SEARCH_SUGGESTIONS.filter(
    (item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          paddingTop: isScrolled ? '10px' : '16px',
          paddingBottom: isScrolled ? '10px' : '16px',
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.96)' : 'rgba(251, 248, 243, 0.92)',
          boxShadow: isScrolled ? '0 2px 8px -2px rgba(59, 42, 36, 0.08)' : 'none',
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="sticky top-0 z-40 w-full backdrop-blur-md border-b border-spice-border/80"
      >
        <Container size="2xl">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Trigger & Logo */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                className="md:hidden p-2 rounded-lg text-spice-espresso hover:bg-spice-sand/60 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Brand Logo */}
              <Link href="/" className="flex items-center gap-2.5 group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-xl bg-gradient-to-br from-spice-terracotta to-spice-terracotta-600 flex items-center justify-center text-white font-serif font-bold text-lg shadow-warm-xs"
                >
                  A
                </motion.div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif font-bold text-xl tracking-tight text-spice-espresso leading-none">
                      AAXOL
                    </span>
                    <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-spice-cardamom bg-spice-cardamom-50 px-1.5 py-0.5 rounded border border-spice-cardamom/25">
                      by Organium
                    </span>
                  </div>
                  <span className="text-[9px] uppercase tracking-widest text-spice-taupe font-semibold mt-0.5">
                    Pure Artisanal Spices
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-7 lg:gap-8 text-sm font-medium text-spice-espresso">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'relative py-1 transition-colors hover:text-spice-terracotta flex items-center gap-1.5',
                      isActive ? 'text-spice-terracotta font-semibold' : 'text-spice-espresso',
                      link.highlight && 'text-spice-terracotta font-semibold'
                    )}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <Badge variant="offer" size="sm">
                        {link.badge}
                      </Badge>
                    )}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-spice-terracotta rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center gap-1.5 sm:gap-2 text-spice-espresso">
              {/* Search Toggle Button */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                type="button"
                onClick={toggleSearch}
                aria-label="Search spices"
                className={cn(
                  'p-2 sm:p-2.5 rounded-full transition-colors',
                  isSearchOpen
                    ? 'bg-spice-peach text-spice-terracotta'
                    : 'text-spice-espresso hover:text-spice-terracotta hover:bg-spice-sand/50'
                )}
              >
                <Search className="w-5 h-5" />
              </motion.button>

              {/* Account Link */}
              <Link
                href="/account"
                aria-label="My Account"
                className="p-2 sm:p-2.5 rounded-full text-spice-espresso hover:text-spice-terracotta hover:bg-spice-sand/50 transition-colors hidden sm:inline-flex"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Wishlist Icon with Live Count */}
              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className="p-2 sm:p-2.5 rounded-full text-spice-espresso hover:text-spice-terracotta hover:bg-spice-sand/50 transition-colors relative hidden sm:inline-flex items-center justify-center"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-0.5 rounded-full bg-spice-turmeric text-white text-[9px] font-bold flex items-center justify-center leading-none shadow-xs border border-white"
                  >
                    {wishlist.length}
                  </motion.span>
                )}
              </Link>

              {/* Cart Button with Animated Bounce Trigger */}
              <motion.button
                type="button"
                onClick={openCart}
                animate={lastAddedItemId ? { scale: [1, 1.12, 1] } : {}}
                transition={{ duration: 0.35 }}
                aria-label="Open shopping cart"
                className="flex items-center gap-2 bg-spice-sand/60 hover:bg-spice-sand text-spice-espresso px-3.5 py-2 rounded-xl font-medium text-xs sm:text-sm transition-all border border-spice-border shadow-warm-xs hover:border-spice-terracotta/30 ml-1 group shrink-0"
              >
                <div className="relative flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-5 h-5 text-spice-terracotta transition-transform group-hover:scale-110" />
                  {cartCount > 0 && (
                    <motion.span
                      key={cartCount}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                      className="absolute -top-2 -right-2.5 min-w-[18px] h-[18px] px-1 rounded-full bg-spice-terracotta text-white text-[10px] font-bold flex items-center justify-center leading-none shadow-xs border-2 border-white"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </div>
                <span className="hidden sm:inline font-semibold">Cart</span>
              </motion.button>
            </div>
          </div>

          {/* Quick Search Dropdown Bar */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: LUXURY_EASE }}
                className="overflow-hidden"
              >
                <div className="mt-3 pt-3 pb-3 border-t border-spice-border">
                  <div className="relative max-w-xl mx-auto">
                    <Search className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-spice-taupe" />
                    <input
                      type="text"
                      placeholder="Search whole spices, ground masalas, saffron, turmeric..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                      className="w-full pl-10 pr-10 py-2.5 rounded-spice-input bg-spice-white border border-spice-border text-sm text-spice-espresso placeholder:text-spice-taupe/70 focus:outline-none focus:ring-2 focus:ring-spice-terracotta/20 focus:border-spice-terracotta shadow-warm-sm"
                    />
                    <button
                      type="button"
                      onClick={closeSearch}
                      className="absolute right-3 top-3 text-spice-taupe hover:text-spice-espresso text-xs p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    {/* Instant Search Suggestions */}
                    <div className="mt-2 bg-spice-white rounded-spice-card border border-spice-border shadow-warm-md p-2 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-spice-taupe px-3 py-1 block">
                        Popular Spices & Harvests
                      </span>
                      {filteredSuggestions.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          onClick={closeSearch}
                          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-spice-espresso hover:bg-spice-sand/50 hover:text-spice-terracotta transition-colors group"
                        >
                          <span className="font-medium">{item.label}</span>
                          <span className="text-[10px] text-spice-taupe bg-spice-ivory px-2 py-0.5 rounded border border-spice-border/60">
                            {item.category}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </motion.header>

      {/* Mobile Slide-Over Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-spice-espresso/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.32, ease: LUXURY_EASE }}
              className="fixed inset-y-0 left-0 w-4/5 max-w-xs bg-spice-ivory shadow-warm-xl border-r border-spice-border p-6 flex flex-col justify-between z-10 overflow-y-auto"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-5 border-b border-spice-border">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-spice-terracotta to-spice-terracotta-600 flex items-center justify-center text-white font-serif font-bold text-sm shadow-warm-xs">
                      A
                    </div>
                    <div className="flex flex-col">
                      <span className="font-serif font-bold text-base text-spice-espresso leading-none">
                        AAXOL
                      </span>
                      <span className="text-[8px] font-sans font-bold uppercase tracking-wider text-spice-cardamom">
                        by Organium
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Close menu"
                    className="p-1 rounded-full text-spice-taupe hover:text-spice-espresso hover:bg-spice-sand"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Staggered Navigation Links */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
                    },
                  }}
                  className="py-4 space-y-1"
                >
                  {navLinks.map((link) => (
                    <motion.div
                      key={link.href}
                      variants={{
                        hidden: { opacity: 0, x: -12 },
                        visible: { opacity: 1, x: 0 },
                      }}
                    >
                      <Link
                        href={link.href}
                        className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-spice-espresso hover:bg-spice-sand/60 hover:text-spice-terracotta transition-colors"
                      >
                        <span>{link.label}</span>
                        {link.badge ? (
                          <Badge variant="offer" size="sm">
                            {link.badge}
                          </Badge>
                        ) : (
                          <ArrowRight className="w-3.5 h-3.5 text-spice-taupe/60" />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Quick Customer Links */}
                <div className="pt-4 border-t border-spice-border space-y-1">
                  <Link
                    href="/account"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-spice-espresso hover:bg-spice-sand/60 hover:text-spice-terracotta transition-colors"
                  >
                    <User className="w-4 h-4 text-spice-terracotta" />
                    <span>My Account</span>
                  </Link>
                  <Link
                    href="/wishlist"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-spice-espresso hover:bg-spice-sand/60 hover:text-spice-terracotta transition-colors"
                  >
                    <Heart className="w-4 h-4 text-spice-terracotta" />
                    <span>Saved Wishlist ({wishlist.length})</span>
                  </Link>
                </div>
              </div>

              {/* Bottom Support Badge */}
              <div className="pt-4 border-t border-spice-border">
                <div className="p-3.5 rounded-spice-card bg-spice-white border border-spice-border text-xs shadow-warm-xs">
                  <div className="flex items-center gap-2 text-spice-espresso font-semibold mb-1">
                    <Phone className="w-3.5 h-3.5 text-spice-terracotta" />
                    <span>Customer Support</span>
                  </div>
                  <p className="text-spice-taupe text-[11px] leading-relaxed">
                    Mon - Sat, 9am - 7pm IST
                  </p>
                  <p className="font-semibold text-spice-espresso mt-1">+91 98765 43210</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
