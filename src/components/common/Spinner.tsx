import React from 'react';
import { Loader2 } from 'lucide-react';
import { SPINNER_SIZE_CLASSES,SPINNER_VARIANT_CLASSES, SpinnerSize, SpinnerVariant, TEXT_SIZE_CLASSES } from '@/constants';

export interface SpinnerProps {
  /** Size of the spinner */
  size?: SpinnerSize;
  /** Color variant */
  variant?: SpinnerVariant;
  /** Additional CSS classes */
  className?: string;
  /** Whether to show text */
  withText?: boolean;
  /** Text to display */
  text?: string;
  /** Full page overlay */
  fullScreen?: boolean;
}



export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  variant = 'primary',
  className = '',
  withText = false,
  text = 'Loading...',
  fullScreen = false,
}) => {
  const spinner = (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2
        className={`${SPINNER_SIZE_CLASSES[size]} ${SPINNER_VARIANT_CLASSES[variant]} animate-spin`}
        aria-label={text}
      />
      {withText && (
        <span className={`ml-2 ${TEXT_SIZE_CLASSES[size]} text-gray-600`}>
          {text}
        </span>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        <div className="flex flex-col items-center">
          {spinner}
          <p className="mt-2 text-sm text-gray-600">{text}</p>
        </div>
      </div>
    );
  }

  return spinner;
};


export const PageSpinner: React.FC<{ message?: string }> = ({ message = 'Loading page...' }) => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="text-center">
      <Spinner size="lg" variant="primary" />
      <p className="mt-3 text-gray-600">{message}</p>
    </div>
  </div>
);

export const ButtonSpinner: React.FC<{ size?: SpinnerProps['size'] }> = ({ size = 'sm' }) => (
  <Spinner size={size} variant="light" className="inline-flex" />
);

export default Spinner;