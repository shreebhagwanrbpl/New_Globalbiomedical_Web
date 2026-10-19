import React from 'react';
import { cn } from '@/utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'white' | 'cream' | 'ivory' | 'beige' | 'sand' | 'peach' | 'cardamom' | 'cocoa' | 'flat';
  hoverEffect?: boolean;
}

export function Card({
  className,
  variant = 'white',
  hoverEffect = false,
  children,
  ...props
}: CardProps) {
  const variants = {
    white: 'bg-spice-white border border-spice-border shadow-warm-sm',
    cream: 'bg-spice-ivory border border-spice-border shadow-warm-xs',
    ivory: 'bg-spice-ivory border border-spice-border shadow-warm-xs',
    beige: 'bg-spice-sand border border-spice-border shadow-warm-xs',
    sand: 'bg-spice-sand border border-spice-border shadow-warm-xs',
    peach: 'bg-spice-peach/60 border border-spice-terracotta/20 shadow-warm-xs',
    cardamom: 'bg-spice-cardamom text-spice-white border border-spice-cardamom-700 shadow-warm-md',
    cocoa: 'bg-spice-cardamom text-spice-white border border-spice-cardamom-700 shadow-warm-md',
    flat: 'bg-spice-sand/40 border border-spice-border/60 shadow-none',
  };

  return (
    <div
      className={cn(
        'rounded-spice-card transition-all duration-300 overflow-hidden',
        variants[variant],
        hoverEffect &&
          'hover:-translate-y-1 hover:shadow-warm-lg hover:border-spice-terracotta/30 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
