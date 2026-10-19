import React from 'react';
import { cn } from '@/utils/cn';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'rectangular' | 'circular';
}

export function Skeleton({
  className,
  variant = 'rectangular',
  ...props
}: SkeletonProps) {
  const variants = {
    text: 'h-4 w-full rounded',
    rectangular: 'rounded-spice-button',
    circular: 'rounded-full',
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-spice-sand/80',
        variants[variant],
        className
      )}
      {...props}
    ></div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-spice-card border border-spice-border p-4 flex flex-col gap-3 bg-spice-white shadow-warm-xs">
      <Skeleton className="aspect-square w-full rounded-spice-input" />
      <Skeleton variant="text" className="w-1/3 h-3" />
      <Skeleton variant="text" className="w-4/5 h-4" />
      <div className="flex items-center justify-between mt-2">
        <Skeleton variant="text" className="w-1/4 h-5" />
        <Skeleton className="w-20 h-8 rounded-spice-button" />
      </div>
    </div>
  );
}
