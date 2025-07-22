import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-[#007acc] disabled:opacity-50 disabled:pointer-events-none';
    
    const variants = {
      default: 'bg-[#007acc] text-white hover:bg-[#1177bb] active:bg-[#005a9e]',
      outline: 'border border-[#3e3e42] bg-transparent text-[#cccccc] hover:bg-[#37373d] hover:border-[#007acc]',
      ghost: 'text-[#cccccc] hover:bg-[#2a2d2e] hover:text-white',
      destructive: 'bg-[#f14c4c] text-white hover:bg-[#d73a49]'
    };
    
    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base'
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };
