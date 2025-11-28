import React, { useEffect } from 'react';
import { X, CheckCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div
      className="fixed bottom-5 left-1/2 -translate-x-1/2 w-auto max-w-sm p-4 bg-slate-800 text-white rounded-lg shadow-2xl flex items-center gap-3 z-50 animate-toast-in"
      role="alert"
      aria-live="assertive"
    >
      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
      <p className="text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="ml-auto p-1 rounded-full hover:bg-slate-700 transition-colors"
        aria-label="Tutup notifikasi"
      >
        <X className="w-4 h-4" />
      </button>
      <style>{`
        @keyframes toast-in {
          from {
            transform: translate(-50%, 100%);
            opacity: 0;
          }
          to {
            transform: translate(-50%, 0);
            opacity: 1;
          }
        }
        .animate-toast-in {
          animation: toast-in 0.5s cubic-bezier(0.21, 1.02, 0.73, 1) forwards;
        }
      `}</style>
    </div>
  );
};
