'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { Loader2, ArrowRight } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'dark' | 'cardamom' | 'turmeric' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showArrow?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      showArrow = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'group inline-flex items-center justify-center font-medium tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-spice-terracotta/25 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98] rounded-spice-button';

    const variants = {
      primary:
        'bg-spice-terracotta text-spice-white hover:bg-spice-terracotta-600 shadow-warm-sm hover:shadow-warm-md active:bg-spice-terracotta-700',
      secondary:
        'bg-spice-white border border-spice-terracotta text-spice-terracotta hover:bg-spice-peach/60 hover:border-spice-terracotta-600 active:bg-spice-sand',
      outline:
        'border border-spice-border bg-transparent text-spice-espresso hover:border-spice-espresso hover:bg-spice-sand/50 active:bg-spice-sand',
      dark:
        'bg-spice-cardamom text-spice-white hover:bg-spice-cardamom-700 active:bg-spice-cardamom-800 shadow-warm-sm',
      cardamom:
        'bg-spice-cardamom text-spice-white hover:bg-spice-cardamom-700 active:bg-spice-cardamom-800 shadow-warm-sm',
      turmeric:
        'bg-spice-turmeric text-spice-white font-semibold hover:bg-spice-turmeric-600 active:bg-spice-turmeric-700 shadow-warm-sm',
      ghost:
        'bg-transparent text-spice-espresso hover:bg-spice-sand/60 hover:text-spice-terracotta active:bg-spice-sand',
      link:
        'text-spice-terracotta hover:text-spice-terracotta-700 underline-offset-4 hover:underline p-0 h-auto focus:ring-0',
    };

    const sizes = {
      sm: 'text-xs px-3.5 py-1.5 gap-1.5 h-8.5',
      md: 'text-sm px-5 py-2.5 gap-2 h-10.5',
      lg: 'text-base px-6.5 py-3.5 gap-2.5 h-12.5 font-medium',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variants[variant],
          variant !== 'link' && sizes[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin shrink-0 text-current" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
        {!isLoading && showArrow && (
          <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
