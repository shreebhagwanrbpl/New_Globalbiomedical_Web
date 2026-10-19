'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { Product } from '@/types/product';
import { validateCoupon, CouponValidationResult } from '@/data/coupons';

export interface CartItem {
  id?: string;
  productId: string;
  title: string;
  slug: string;
  price: number;
  mrp: number;
  unitPrice: number;
  totalPrice: number;
  image: string;
  weight?: string;
  selectedPackSize: string;
  quantity: number;
  category?: string;
}

interface StoreContextType {
  cart: CartItem[];
  cartCount: number;
  cartItemCount: number;
  cartSubtotal: number;
  cartTotalDiscount: number;
  isCartOpen: boolean;
  isSearchOpen: boolean;
  wishlist: Product[];
  recentlyViewed: Product[];
  lastAddedItemId: string | null;
  appliedCoupon: string | null;
  couponDiscount: number;
  couponMessage: string | null;
  freeShippingThreshold: number;
  amountForFreeShipping: number;
  shippingFee: number;
  cartFinalTotal: number;
  addToCart: (product: Product | any, quantity?: number, selectedPackSize?: string) => void;
  updateQuantity: (productId: string, packSizeOrDelta: string | number, newQuantity?: number) => void;
  removeFromCart: (productId: string, selectedPackSize?: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
  toggleWishlist: (product: Product | string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  applyCoupon: (code: string, optionalDiscount?: number) => CouponValidationResult;
  removeCoupon: () => void;
  addRecentlyViewed: (product: Product) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  // Wishlist state
  const [wishlist, setWishlist] = useState<Product[]>([]);
  // Recently viewed
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  // UI Drawer states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [lastAddedItemId, setLastAddedItemId] = useState<string | null>(null);

  // Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [couponMessage, setCouponMessage] = useState<string | null>(null);

  // Hydrate from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedCart = localStorage.getItem('human_bio_cart') || localStorage.getItem('aaxol_cart');
        if (savedCart) setCart(JSON.parse(savedCart));

        const savedWishlist = localStorage.getItem('human_bio_wishlist') || localStorage.getItem('aaxol_wishlist');
        if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

        const savedRecent = localStorage.getItem('human_bio_recently_viewed') || localStorage.getItem('aaxol_recently_viewed');
        if (savedRecent) setRecentlyViewed(JSON.parse(savedRecent));

        const savedCoupon = localStorage.getItem('human_bio_applied_coupon') || localStorage.getItem('aaxol_applied_coupon');
        if (savedCoupon) {
          const parsed = JSON.parse(savedCoupon);
          if (parsed.code) {
            setAppliedCoupon(parsed.code);
          }
        }
      } catch (err) {
        console.error('Failed to load local storage state:', err);
      }
    }
  }, []);

  // Save cart changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('human_bio_cart', JSON.stringify(cart));
    }
  }, [cart]);

  // Save wishlist changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('human_bio_wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist]);

  // Save recently viewed changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('human_bio_recently_viewed', JSON.stringify(recentlyViewed));
    }
  }, [recentlyViewed]);

  // Derived calculations
  const cartItemCount = useMemo(() => {
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  }, [cart]);

  const cartCount = cartItemCount;

  const cartSubtotal = useMemo(() => {
    return cart.reduce((total, item) => total + (item.unitPrice || item.price || 0) * (item.quantity || 1), 0);
  }, [cart]);

  const cartTotalDiscount = useMemo(() => {
    return cart.reduce((total, item) => {
      const mrp = item.mrp || item.unitPrice || item.price || 0;
      const unitPrice = item.unitPrice || item.price || 0;
      const diff = Math.max(0, mrp - unitPrice);
      return total + diff * (item.quantity || 1);
    }, 0);
  }, [cart]);

  const freeShippingThreshold = 999;
  const amountForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  // Free shipping if cart is empty (0), subtotal >= 999, or FREESHIP coupon applied
  const isFreeShippingActive = cart.length > 0 && (cartSubtotal >= freeShippingThreshold || appliedCoupon === 'FREESHIP');
  const shippingFee = cart.length === 0 ? 0 : isFreeShippingActive ? 0 : 79;

  // Dynamic Coupon Recalculation whenever cartSubtotal or appliedCoupon changes
  useEffect(() => {
    if (!appliedCoupon) {
      setCouponDiscount(0);
      setCouponMessage(null);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('human_bio_applied_coupon');
      }
      return;
    }

    if (cart.length === 0) {
      setCouponDiscount(0);
      return;
    }

    const validation = validateCoupon(appliedCoupon, cartSubtotal);
    if (validation.isValid) {
      // If FREESHIP coupon is used, discount on items is 0 because shipping is already made 0
      const discount = appliedCoupon === 'FREESHIP' ? 0 : validation.discountAmount;
      setCouponDiscount(discount);
      setCouponMessage(appliedCoupon === 'FREESHIP' ? 'Free express shipping coupon applied!' : validation.message);
      if (typeof window !== 'undefined') {
        localStorage.setItem('human_bio_applied_coupon', JSON.stringify({ code: appliedCoupon, discount }));
      }
    } else {
      // Subtotal dropped below min requirement or coupon became invalid
      setCouponDiscount(0);
      setCouponMessage(validation.message);
    }
  }, [appliedCoupon, cartSubtotal, cart.length]);

  const cartFinalTotal = Math.max(0, cartSubtotal - couponDiscount + shippingFee);

  // Add to cart supporting product objects or shorthand items
  const addToCart = useCallback((product: Product | any, quantity: number = 1, selectedPackSize?: string) => {
    const pId = product.id || product.productId;
    const title = product.title || product.name || 'Biomedical Product';
    const slug = product.slug || pId;
    const pack = selectedPackSize || product.weight || product.selectedPackSize || 'Standard Unit';
    const unitPrice = product.salePrice || product.price || 199;
    const mrp = product.mrp || unitPrice;
    const image = (product.images && product.images[0]) || product.image || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&auto=format&fit=crop&q=80';

    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (i) => (i.productId === pId || i.id === pId) && i.selectedPackSize === pack
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        const item = updated[existingIdx];
        const newQty = item.quantity + quantity;
        updated[existingIdx] = {
          ...item,
          quantity: newQty,
          totalPrice: newQty * item.unitPrice,
        };
        return updated;
      }

      const newItem: CartItem = {
        productId: pId,
        id: `${pId}-${pack}`,
        title,
        slug,
        price: unitPrice,
        mrp,
        unitPrice,
        totalPrice: unitPrice * quantity,
        image,
        selectedPackSize: pack,
        quantity,
        category: product.category,
      };

      return [...prev, newItem];
    });

    setLastAddedItemId(pId);
    setTimeout(() => setLastAddedItemId(null), 1500);
  }, []);

  const updateQuantity = useCallback((productId: string, packSizeOrDelta: string | number, newQuantity?: number) => {
    setCart((prev) => {
      // Shorthand signature: updateQuantity(id, delta)
      if (typeof packSizeOrDelta === 'number') {
        const delta = packSizeOrDelta;
        return prev
          .map((item) => {
            if (item.productId === productId || item.id === productId) {
              const q = item.quantity + delta;
              return q > 0 ? { ...item, quantity: q, totalPrice: q * item.unitPrice } : null;
            }
            return item;
          })
          .filter(Boolean) as CartItem[];
      }

      // Explicit signature: updateQuantity(productId, packSize, quantity)
      const packSize = packSizeOrDelta;
      const targetQty = newQuantity ?? 1;
      return prev
        .map((item) => {
          if ((item.productId === productId || item.id === productId) && item.selectedPackSize === packSize) {
            return targetQty > 0
              ? { ...item, quantity: targetQty, totalPrice: targetQty * item.unitPrice }
              : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  }, []);

  const removeFromCart = useCallback((productId: string, selectedPackSize?: string) => {
    setCart((prev) =>
      prev.filter((item) => {
        if (selectedPackSize) {
          return !((item.productId === productId || item.id === productId) && item.selectedPackSize === selectedPackSize);
        }
        return item.productId !== productId && item.id !== productId;
      })
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    setAppliedCoupon(null);
    setCouponDiscount(0);
    setCouponMessage(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('human_bio_cart');
      localStorage.removeItem('human_bio_applied_coupon');
    }
  }, []);

  // Wishlist actions
  const toggleWishlist = useCallback((productOrId: Product | string) => {
    const id = typeof productOrId === 'string' ? productOrId : productOrId.id;
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === id);
      if (exists) {
        return prev.filter((p) => p.id !== id);
      }
      if (typeof productOrId === 'string') {
        return [...prev, { id, title: id, slug: id, price: 1999, mrp: 2499, description: '', images: [], category: 'all', brand: 'Human Biomedical LLP', sku: '', stock: 10, featured: false, bestSeller: false, offerEnabled: false, weight: 'Standard Unit', ingredients: [], countryOfOrigin: 'India', manufacturer: 'Human Biomedical LLP', fssaiInformation: { licenseNumber: '' }, createdAt: '', updatedAt: '' }];
      }
      return [...prev, productOrId];
    });
  }, []);

  const isInWishlist = useCallback((productId: string) => {
    return wishlist.some((p) => p.id === productId);
  }, [wishlist]);

  const clearWishlist = useCallback(() => {
    setWishlist([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('human_bio_wishlist');
    }
  }, []);

  // Recently viewed
  const addRecentlyViewed = useCallback((product: Product) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      return [product, ...filtered].slice(0, 8);
    });
  }, []);

  // Coupon actions
  const applyCoupon = useCallback((code: string, optionalDiscount?: number): CouponValidationResult => {
    const validation = validateCoupon(code, cartSubtotal);
    if (validation.isValid && validation.coupon) {
      const discount = validation.coupon.code === 'FREESHIP' ? 0 : (optionalDiscount ?? validation.discountAmount);
      setAppliedCoupon(validation.coupon.code);
      setCouponDiscount(discount);
      setCouponMessage(validation.message);
      if (typeof window !== 'undefined') {
        localStorage.setItem('human_bio_applied_coupon', JSON.stringify({ code: validation.coupon.code, discount }));
      }
    }
    return validation;
  }, [cartSubtotal]);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    setCouponMessage(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('human_bio_applied_coupon');
    }
  }, []);

  // Drawer triggers
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);

  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);
  const toggleSearch = useCallback(() => setIsSearchOpen((prev) => !prev), []);

  return (
    <StoreContext.Provider
      value={{
        cart,
        cartCount,
        cartItemCount,
        cartSubtotal,
        cartTotalDiscount,
        isCartOpen,
        isSearchOpen,
        wishlist,
        recentlyViewed,
        lastAddedItemId,
        appliedCoupon,
        couponDiscount,
        couponMessage,
        freeShippingThreshold,
        amountForFreeShipping,
        shippingFee,
        cartFinalTotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        openCart,
        closeCart,
        toggleCart,
        openSearch,
        closeSearch,
        toggleSearch,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        applyCoupon,
        removeCoupon,
        addRecentlyViewed,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
