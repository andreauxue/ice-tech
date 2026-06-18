import { cn } from '../lib/utils';

interface BadgeProps {
  variant?: 'success' | 'warning' | 'error' | 'default';
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        {
          'bg-emerald-100 text-emerald-700': variant === 'success',
          'bg-amber-100 text-amber-700': variant === 'warning',
          'bg-red-100 text-red-700': variant === 'error',
          'bg-gray-100 text-gray-700': variant === 'default',
        },
        className
      )}
    >
      {children}
    </span>
  );
}
