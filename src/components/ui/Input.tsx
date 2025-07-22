import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-[#cccccc]">
            {label}
            {props.required && <span className="text-[#f14c4c] ml-1">*</span>}
          </label>
        )}
        <input
          className={cn(
            'w-full px-3 py-2 bg-[#3c3c3c] border border-[#3e3e42] rounded text-[#cccccc] placeholder-[#858585] focus:outline-none focus:ring-1 focus:ring-[#007acc] focus:border-[#007acc] transition-colors',
            error && 'border-[#f14c4c] focus:ring-[#f14c4c] focus:border-[#f14c4c]',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-sm text-[#f14c4c]">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-sm text-[#858585]">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
