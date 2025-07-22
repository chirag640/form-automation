import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className }: CardProps) => {
  return (
    <div className={cn('bg-[#252526] border border-[#3e3e42] rounded-md shadow-sm', className)}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className }: CardProps) => {
  return (
    <div className={cn('p-6 pb-4', className)}>
      {children}
    </div>
  );
};

const CardContent = ({ children, className }: CardProps) => {
  return (
    <div className={cn('p-6 pt-0', className)}>
      {children}
    </div>
  );
};

const CardTitle = ({ children, className }: CardProps) => {
  return (
    <h3 className={cn('text-lg font-semibold text-white', className)}>
      {children}
    </h3>
  );
};

export { Card, CardHeader, CardContent, CardTitle };
