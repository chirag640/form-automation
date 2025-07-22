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
    sm: 'max-w-md w-full',
    md: 'max-w-2xl w-full',
    lg: 'max-w-4xl w-full',
    xl: 'max-w-6xl w-full',
    fullscreen: 'max-w-none w-[95vw] h-[95vh]'
  };

  const isFullscreen = size === 'fullscreen';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={cn(
        'relative bg-[#1e1e1e] shadow-2xl border border-[#3e3e42] flex flex-col',
        'backdrop-blur-md',
        isFullscreen ? 'rounded-lg' : 'rounded-lg',
        sizeClasses[size],
        isFullscreen ? 'h-[95vh]' : 'max-h-[85vh]'
      )}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#3e3e42] bg-[#2d2d30] rounded-t-lg flex-shrink-0">
          {title && (
            <h2 className="text-lg font-medium text-[#cccccc] select-none">{title}</h2>
          )}
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-[#464647] rounded transition-colors text-[#cccccc] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-hidden bg-[#1e1e1e]">
          <div className="h-full overflow-y-auto overflow-x-hidden custom-scrollbar">
            <div className="p-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Modal };
