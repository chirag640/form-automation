import { ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen';
}

const Modal = ({ isOpen, onClose, children, title, size = 'md' }: ModalProps) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    fullscreen: 'max-w-none w-full h-full'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={cn(
        'relative bg-gray-800 rounded-lg shadow-xl border border-gray-700',
        size === 'fullscreen' ? 'w-full h-full rounded-none' : sizeClasses[size],
        'mx-4 max-h-[90vh] overflow-hidden'
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          {title && (
            <h2 className="text-xl font-semibold text-white">{title}</h2>
          )}
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Content */}
        <div className="overflow-auto" style={{ maxHeight: size === 'fullscreen' ? 'calc(100vh - 73px)' : 'calc(90vh - 73px)' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export { Modal };
