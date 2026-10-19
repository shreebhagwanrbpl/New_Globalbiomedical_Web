import React from 'react';
import { cn } from '@/utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | 'offer'
    | 'bestseller'
    | 'organic'
    | 'spicy'
    | 'new'
    | 'limited'
    | 'neutral'
    | 'instock'
    | 'lowstock'
    | 'outofstock';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
}

export function Badge({
  className,
  variant = 'neutral',
  size = 'md',
  dot = false,
  children,
  ...props
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center font-medium tracking-wide rounded-full select-none';

  const variants = {
    offer: 'bg-spice-peach text-spice-terracotta border border-spice-terracotta/25 font-semibold',
    bestseller: 'bg-amber-100 text-amber-900 border border-amber-300 font-semibold',
    organic: 'bg-emerald-50 text-spice-cardamom border border-emerald-200 font-semibold',
    new: 'bg-spice-cardamom-50 text-spice-cardamom border border-spice-cardamom-200 font-semibold',
    spicy: 'bg-spice-terracotta-50 text-spice-terracotta border border-spice-terracotta-200',
    limited: 'bg-spice-sand text-spice-espresso border border-spice-border font-semibold',
    neutral: 'bg-spice-sand/70 text-spice-taupe border border-spice-border',
    instock: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    lowstock: 'bg-amber-50 text-amber-800 border border-amber-200 font-medium',
    outofstock: 'bg-spice-terracotta-50 text-spice-terracotta border border-spice-terracotta-200',
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-xs px-3.5 py-1.5 gap-2 font-semibold',
  };

  const dotColors = {
    offer: 'bg-spice-terracotta',
    bestseller: 'bg-spice-turmeric',
    organic: 'bg-spice-cardamom',
    new: 'bg-spice-cardamom',
    spicy: 'bg-spice-terracotta',
    limited: 'bg-spice-espresso',
    neutral: 'bg-spice-taupe',
    instock: 'bg-emerald-500',
    lowstock: 'bg-amber-500',
    outofstock: 'bg-spice-terracotta',
  };

  return (
    <span
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {dot && (
        <span
          className={cn('w-1.5 h-1.5 rounded-full shrink-0', dotColors[variant])}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
