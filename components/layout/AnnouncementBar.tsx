'use client';

import React, { useState, useEffect } from 'react';
import { Truck, Gift, Sparkles, ChevronRight, X } from 'lucide-react';
import Link from 'next/link';

export interface AnnouncementItem {
  id: string;
  icon?: 'truck' | 'gift' | 'sparkles';
  text: string;
  highlightText?: string;
  linkText?: string;
  linkHref?: string;
}

const DEFAULT_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: '1',
    icon: 'truck',
    text: 'Free Express Shipping Across India & Global Delivery on Orders Above ₹999',
    highlightText: 'Free Shipping',
    linkText: 'Shop Spices',
    linkHref: '/shop',
  },
  {
    id: '2',
    icon: 'gift',
    text: 'Get 10% OFF on your first handcrafted order — Use code',
    highlightText: 'AAXOL10',
    linkText: 'Claim Offer',
    linkHref: '/offers',
  },
  {
    id: '3',
    icon: 'sparkles',
    text: 'Stone-ground, single-origin Malabar Black Pepper now in stock',
    highlightText: 'New Harvest',
    linkText: 'Explore',
    linkHref: '/product/malabar-black-pepper',
  },
];

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (DEFAULT_ANNOUNCEMENTS.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % DEFAULT_ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  const current = DEFAULT_ANNOUNCEMENTS[currentIndex];

  const renderIcon = () => {
    switch (current.icon) {
      case 'truck':
        return <Truck className="w-3.5 h-3.5 text-spice-turmeric shrink-0" />;
      case 'gift':
        return <Gift className="w-3.5 h-3.5 text-spice-turmeric shrink-0" />;
      case 'sparkles':
        return <Sparkles className="w-3.5 h-3.5 text-spice-turmeric shrink-0" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative bg-spice-cardamom text-spice-ivory text-[11px] sm:text-xs py-2 px-4 select-none z-50 border-b border-spice-cardamom-700/40">
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center">
        <div className="flex items-center gap-2 overflow-hidden animate-fadeIn">
          {renderIcon()}
          <span className="font-normal text-spice-ivory">
            {current.text}{' '}
            {current.highlightText && (
              <span className="font-semibold text-spice-turmeric underline underline-offset-2">
                {current.highlightText}
              </span>
            )}
          </span>
          {current.linkText && current.linkHref && (
            <Link
              href={current.linkHref}
              className="inline-flex items-center gap-0.5 ml-1 text-spice-ivory font-semibold hover:text-spice-turmeric transition-colors group"
            >
              <span>{current.linkText}</span>
              <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>
      </div>

      <button
        onClick={() => setIsVisible(false)}
        aria-label="Dismiss banner"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-spice-ivory/70 hover:text-spice-ivory transition-colors p-1"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
