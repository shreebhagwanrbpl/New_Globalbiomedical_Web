import React from 'react';
import { cn } from '@/utils/cn';

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export function Loading({
  className,
  size = 'md',
  text,
  ...props
}: LoadingProps) {
  const sizes = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className={cn('flex flex-col items-center justify-center gap-3 p-6', className)} {...props}>
      <div
        className={cn(
          'rounded-full animate-spin border-spice-peach border-t-spice-terracotta',
          sizes[size]
        )}
      />
      {text && (
        <p className="text-xs font-medium text-spice-taupe tracking-wide uppercase">
          {text}
        </p>
      )}
    </div>
  );
}
