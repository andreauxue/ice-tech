import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'w-full px-3 py-2 rounded-lg border border-border bg-input-background',
            'focus:outline-none focus:ring-2 focus:ring-ring',
            'placeholder:text-muted-foreground',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';
