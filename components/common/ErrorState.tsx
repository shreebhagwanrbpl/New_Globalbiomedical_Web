import React from 'react';
import { cn } from '@/utils/cn';
import { AlertCircle } from 'lucide-react';
import { Button } from './Button';

export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export function ErrorState({
  className,
  title = 'Something went wrong',
  message = 'We encountered an error while loading the spice information. Please try again.',
  onRetry,
  retryLabel = 'Try Again',
  ...props
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-8 rounded-spice-card border border-spice-terracotta/20 bg-spice-peach/30',
        className
      )}
      {...props}
    >
      <div className="w-12 h-12 rounded-full bg-spice-peach flex items-center justify-center text-spice-terracotta mb-3">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-spice-espresso">{title}</h3>
      <p className="text-xs text-spice-taupe mt-1 max-w-sm">{message}</p>
      {onRetry && (
        <div className="mt-4">
          <Button variant="outline" size="sm" onClick={onRetry}>
            {retryLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
