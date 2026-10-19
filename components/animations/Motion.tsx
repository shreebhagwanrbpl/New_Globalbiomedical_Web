'use client';

import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, type HTMLMotionProps } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { Heart, ShoppingBag, Check, Loader2, ArrowRight } from 'lucide-react';
import { cn } from '@/utils/cn';
import Image from 'next/image';

// Smooth luxury editorial cubic-bezier easing
export const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;
export const FAST_EASE = [0.25, 0.1, 0.25, 1] as const;

// 1. ScrollReveal: Viewport-triggered section entrance (Slower, graceful, once only on scroll down)
export interface ScrollRevealProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  scaleOffset?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  once?: boolean;
}

export function ScrollReveal({
  children,
  delay = 0,
  duration = 0.75,
  yOffset = 20,
  scaleOffset = 0.98,
  direction = 'up',
  className,
  once = true,
  ...props
}: ScrollRevealProps) {
  const shouldReduce = usePrefersReducedMotion();

  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  const getInitial = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: yOffset, scale: scaleOffset };
      case 'down':
        return { opacity: 0, y: -yOffset, scale: scaleOffset };
      case 'left':
        return { opacity: 0, x: yOffset, scale: scaleOffset };
      case 'right':
        return { opacity: 0, x: -yOffset, scale: scaleOffset };
      default:
        return { opacity: 0, scale: scaleOffset };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration, delay, ease: LUXURY_EASE }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// 2. FadeIn for page load or standalone element
export interface FadeInProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.65,
  direction = 'up',
  className,
  ...props
}: FadeInProps) {
  const shouldReduce = usePrefersReducedMotion();

  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  const offset =
    direction === 'up'
      ? { y: 16 }
      : direction === 'down'
      ? { y: -16 }
      : direction === 'left'
      ? { x: 16 }
      : direction === 'right'
      ? { x: -16 }
      : {};

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay, ease: LUXURY_EASE }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// 3. SlideUp for section titles and badges
export interface SlideUpProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}

export function SlideUp({
  children,
  delay = 0,
  duration = 0.7,
  className,
  ...props
}: SlideUpProps) {
  const shouldReduce = usePrefersReducedMotion();

  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration, delay, ease: LUXURY_EASE }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// 4. StaggerContainer & StaggerItem for grids (100–140ms graceful delays)
export interface StaggerContainerProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: React.ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
}

export function StaggerContainer({
  children,
  staggerDelay = 0.12,
  delayChildren = 0.08,
  className,
  ...props
}: StaggerContainerProps) {
  const shouldReduce = usePrefersReducedMotion();

  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  ...props
}: Omit<HTMLMotionProps<'div'>, 'children'> & { children: React.ReactNode }) {
  const shouldReduce = usePrefersReducedMotion();

  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.98 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.65, ease: LUXURY_EASE },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// 5. WordReveal: Editorial headline word-by-word reveal
export function WordReveal({
  text,
  className,
  highlightWord,
  highlightClass = 'text-spice-terracotta italic font-serif',
  delay = 0.2,
}: {
  text: string;
  className?: string;
  highlightWord?: string;
  highlightClass?: string;
  delay?: number;
}) {
  const shouldReduce = usePrefersReducedMotion();
  const words = text.split(' ');

  if (shouldReduce) {
    return <h1 className={className}>{text}</h1>;
  }

  return (
    <motion.h1
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.08,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {words.map((word, i) => {
        const isHighlight = highlightWord && word.toLowerCase().includes(highlightWord.toLowerCase());
        return (
          <motion.span
            key={i}
            variants={{
              hidden: { opacity: 0, y: 14, filter: 'blur(3px)' },
              visible: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { duration: 0.6, ease: LUXURY_EASE },
              },
            }}
            className={cn('inline-block mr-[0.28em] last:mr-0', isHighlight && highlightClass)}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.h1>
  );
}

// 6. Parallax: Subtle scroll-linked movement (5-20px)
export function Parallax({
  children,
  offset = 15,
  className,
}: {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}) {
  const shouldReduce = usePrefersReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, -offset]);

  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

// 7. HoverLift: Smooth -4px card elevation with shadow expansion
export function HoverLift({
  children,
  yOffset = -4,
  className,
  ...props
}: Omit<HTMLMotionProps<'div'>, 'children'> & { children: React.ReactNode; yOffset?: number }) {
  const shouldReduce = usePrefersReducedMotion();

  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      whileHover={{ y: yOffset }}
      transition={{ duration: 0.25, ease: FAST_EASE }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// 8. ScaleOnHover
export function ScaleOnHover({
  children,
  scale = 1.03,
  className,
  ...props
}: Omit<HTMLMotionProps<'div'>, 'children'> & { children: React.ReactNode; scale?: number }) {
  const shouldReduce = usePrefersReducedMotion();

  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: FAST_EASE }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// 9. WishlistButton with spring scale feedback
export function WishlistButton({
  isFavorite,
  isWishlisted,
  onToggle,
  onClick,
  className,
}: {
  isFavorite?: boolean;
  isWishlisted?: boolean;
  onToggle?: () => void;
  onClick?: (e?: any) => void;
  className?: string;
}) {
  const active = isWishlisted !== undefined ? isWishlisted : (isFavorite || false);
  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClick) onClick(e);
    else if (onToggle) onToggle();
  };

  return (
    <motion.button
      type="button"
      onClick={handleToggle}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.85 }}
      transition={{ type: 'spring', stiffness: 450, damping: 17 }}
      aria-label={active ? 'Remove from wishlist' : 'Add to wishlist'}
      className={cn(
        'w-8.5 h-8.5 rounded-full flex items-center justify-center transition-colors shadow-warm-xs backdrop-blur-sm',
        active
          ? 'bg-spice-peach text-spice-terracotta border border-spice-terracotta/30'
          : 'bg-white/90 text-spice-espresso hover:text-spice-terracotta border border-spice-border',
        className
      )}
    >
      <Heart
        className={cn('w-4 h-4 transition-all', active ? 'fill-spice-terracotta text-spice-terracotta' : '')}
      />
    </motion.button>
  );
}

// 10. AddToCartButton: 3-state animated button (Idle -> Adding... -> ✓ Added)
export function AddToCartButton({
  onAdd,
  size = 'md',
  showText = true,
  className,
}: {
  onAdd: () => void;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}) {
  const [state, setState] = useState<'idle' | 'loading' | 'added'>('idle');

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (state !== 'idle') return;

    setState('loading');
    setTimeout(() => {
      onAdd();
      setState('added');
      setTimeout(() => setState('idle'), 1400);
    }, 450);
  };

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 h-8 gap-1.5',
    md: 'text-xs sm:text-sm px-4 py-2 h-9.5 gap-2',
    lg: 'text-sm sm:text-base px-6 py-2.5 h-11 gap-2.5',
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileHover={{ scale: state === 'idle' ? 1.02 : 1 }}
      whileTap={{ scale: 0.97 }}
      disabled={state === 'loading'}
      aria-label="Add to cart"
      className={cn(
        'group relative inline-flex items-center justify-center font-medium rounded-spice-button select-none transition-all shadow-warm-sm',
        state === 'added'
          ? 'bg-spice-cardamom text-white shadow-cardamom-glow'
          : 'bg-spice-terracotta text-white hover:bg-spice-terracotta-600 shadow-terracotta-glow',
        sizeClasses[size],
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {state === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-1.5"
          >
            <Loader2 className="w-4 h-4 animate-spin shrink-0" />
            {showText && <span>Adding...</span>}
          </motion.div>
        )}

        {state === 'added' && (
          <motion.div
            key="added"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ type: 'spring', stiffness: 500, damping: 20 }}
            className="inline-flex items-center gap-1.5"
          >
            <Check className="w-4 h-4 shrink-0" />
            {showText && <span>Added!</span>}
          </motion.div>
        )}

        {state === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:scale-110" />
            {showText && <span>Add to Cart</span>}
            <ArrowRight className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-1" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// 11. DiscountBadge: Subtle scale-in 0.85 -> 1 with opacity
export function DiscountBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const shouldReduce = usePrefersReducedMotion();

  if (shouldReduce) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, ease: LUXURY_EASE }}
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-spice-peach text-spice-terracotta border border-spice-terracotta/25 text-[11px] font-bold shadow-warm-xs',
        className
      )}
    >
      {children}
    </motion.span>
  );
}

// 12. ShimmerImage with soft skeleton #F6EBDD and fade-in
export function ShimmerImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className,
  priority = false,
  sizes,
}: {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={cn('relative overflow-hidden bg-[#F6EBDD]', className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-[#F6EBDD] animate-pulse z-0" />
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        priority={priority}
        sizes={sizes}
        onLoad={() => setIsLoading(false)}
        className={cn(
          'transition-all duration-500 ease-out object-cover',
          isLoading ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'
        )}
      />
    </div>
  );
}
