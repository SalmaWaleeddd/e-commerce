// constants/error.ts
import { XCircle, AlertTriangle, Info, AlertCircle, LucideIcon } from 'lucide-react';

export type ErrorType = 'error' | 'warning' | 'info' | 'success';

export interface ErrorTypeConfig {
  icon: LucideIcon;
  bg: string;
  border: string;
  text: string;
  title: string;
  button: string;
}

export const ERROR_TYPE_CONFIG: Record<ErrorType, ErrorTypeConfig> = {
  error: {
    icon: XCircle,
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
    title: 'text-red-900',
    button: 'bg-red-100 text-red-700 hover:bg-red-200',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-800',
    title: 'text-yellow-900',
    button: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200',
  },
  info: {
    icon: Info,
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-800',
    title: 'text-blue-900',
    button: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
  },
  success: {
    icon: AlertCircle,
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-800',
    title: 'text-green-900',
    button: 'bg-green-100 text-green-700 hover:bg-green-200',
  },
} as const;

// Helper function to get config
export const getErrorConfig = (type: ErrorType): ErrorTypeConfig => 
  ERROR_TYPE_CONFIG[type];

// Export individual styles for reuse
export const ERROR_STYLES = {
  error: ERROR_TYPE_CONFIG.error,
  warning: ERROR_TYPE_CONFIG.warning,
  info: ERROR_TYPE_CONFIG.info,
  success: ERROR_TYPE_CONFIG.success,
} as const;