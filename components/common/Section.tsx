import React from 'react';
import { cn } from '@/utils/cn';
import { Container } from './Container';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'white' | 'lightcream' | 'ivory' | 'cream' | 'sand' | 'peach' | 'cardamom' | 'cocoa';
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  title?: string;
  subtitle?: string;
  badge?: string;
  headerAlign?: 'left' | 'center' | 'right';
  rounded?: boolean;
}

export function Section({
  className,
  variant = 'ivory',
  containerSize = '2xl',
  title,
  subtitle,
  badge,
  headerAlign = 'center',
  rounded = false,
  children,
  ...props
}: SectionProps) {
  const variants = {
    white: 'bg-spice-white text-spice-espresso',
    lightcream: 'bg-spice-ivory text-spice-espresso',
    ivory: 'bg-spice-ivory text-spice-espresso',
    cream: 'bg-spice-sand text-spice-espresso',
    sand: 'bg-spice-sand text-spice-espresso',
    peach: 'bg-spice-peach/40 text-spice-espresso',
    cardamom: 'bg-spice-cardamom text-spice-white',
    cocoa: 'bg-spice-cardamom text-spice-white',
  };

  const isDark = variant === 'cardamom' || variant === 'cocoa';

  const alignStyles = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  };

  return (
    <section
      className={cn(
        'py-12 sm:py-16 md:py-20 lg:py-24', // Generous responsive vertical breathing room
        variants[variant],
        rounded && 'rounded-spice-section mx-4 sm:mx-6 lg:mx-8 my-6',
        className
      )}
      {...props}
    >
      <Container size={containerSize}>
        {(title || subtitle || badge) && (
          <div className={cn('flex flex-col mb-10 md:mb-14 max-w-2xl', alignStyles[headerAlign])}>
            {badge && (
              <span className={cn(
                'text-xs font-semibold uppercase tracking-widest mb-2.5',
                isDark ? 'text-spice-turmeric' : 'text-spice-terracotta'
              )}>
                {badge}
              </span>
            )}
            {title && (
              <h2
                className={cn(
                  'text-2xl sm:text-3xl md:text-4xl font-serif font-semibold tracking-tight leading-snug',
                  isDark ? 'text-spice-white' : 'text-spice-espresso'
                )}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className={cn(
                  'mt-3 text-sm md:text-base font-normal leading-relaxed',
                  isDark ? 'text-spice-ivory/80' : 'text-spice-taupe'
                )}
              >
                {subtitle}
              </p>
            )}
            <div className={cn('w-10 h-0.5 mt-4 rounded-full', isDark ? 'bg-spice-turmeric' : 'bg-spice-terracotta')} />
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
