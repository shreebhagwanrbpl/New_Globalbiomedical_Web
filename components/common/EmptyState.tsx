import React from 'react';
import { cn } from '@/utils/cn';
import { PackageOpen } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  className,
  icon,
  title,
  description,
  actionLabel,
  onAction,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-8 md:p-12 rounded-spice-card border border-dashed border-spice-border bg-spice-ivory/60',
        className
      )}
      {...props}
    >
      <div className="w-14 h-14 rounded-full bg-spice-peach/60 flex items-center justify-center text-spice-terracotta mb-4">
        {icon || <PackageOpen className="w-7 h-7" />}
      </div>
      <h3 className="text-lg font-serif font-semibold text-spice-espresso">{title}</h3>
      <p className="text-sm text-spice-taupe mt-1 max-w-md">{description}</p>
      {actionLabel && onAction && (
        <div className="mt-6">
          <Button variant="primary" size="md" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
