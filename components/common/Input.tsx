'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold text-spice-espresso tracking-wide"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-spice-taupe">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={cn(
              'w-full rounded-spice-input border bg-spice-white px-3.5 py-2.5 text-sm text-spice-espresso placeholder:text-spice-taupe/60',
              'transition-all duration-200 shadow-warm-xs',
              'focus:outline-none focus:ring-2 focus:ring-spice-terracotta/20 focus:border-spice-terracotta',
              'disabled:bg-spice-sand/50 disabled:cursor-not-allowed disabled:text-spice-taupe',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error
                ? 'border-spice-terracotta focus:border-spice-terracotta focus:ring-spice-terracotta/20'
                : 'border-spice-border hover:border-spice-taupe/40',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 flex items-center text-spice-taupe">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-spice-terracotta font-medium">{error}</p>}
        {!error && helperText && (
          <p className="text-xs text-spice-taupe">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
