// components/common/ErrorMessage.tsx
import React, { ReactNode } from 'react';
import { 
  ERROR_TYPE_CONFIG, 
  ErrorType, 
} from '@/constants';

export interface ErrorMessageProps {
  message: string | ReactNode;
  type?: ErrorType;
  title?: string;
  showRetry?: boolean;
  onRetry?: () => void;
  showClose?: boolean;
  onClose?: () => void;
  className?: string;
  fullWidth?: boolean;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  type = 'error',
  title,
  showRetry = false,
  onRetry,
  showClose = false,
  onClose,
  className = '',
  fullWidth = false,
}) => {
  const config = ERROR_TYPE_CONFIG[type];
  const Icon = config.icon;

  return (
    <div
      className={`${config.bg} ${config.border} border rounded-lg p-4 ${fullWidth ? 'w-full' : ''} ${className}`}
      role="alert"
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className={`h-5 w-5 ${config.text}`} />
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={`text-sm font-medium ${config.title} mb-1`}>
              {title}
            </h3>
          )}
          <div className={`text-sm ${config.text}`}>
            {typeof message === 'string' ? <p>{message}</p> : message}
          </div>
          {(showRetry || showClose) && (
            <div className="mt-3 flex space-x-3">
              {showRetry && onRetry && (
                <button
                  type="button"
                  onClick={onRetry}
                  className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md ${config.button} transition-colors`}
                >
                  Try again
                </button>
              )}
              {showClose && onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  Dismiss
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};