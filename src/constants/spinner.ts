// constants/spinner.ts
export const SPINNER_SIZE_CLASSES = {
  xs: 'h-4 w-4',
  sm: 'h-5 w-5',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12',
} as const; // 'as const' makes it readonly - TypeScript knows exact values

export const SPINNER_VARIANT_CLASSES = {
  primary: 'text-blue-600',
  secondary: 'text-gray-600',
  light: 'text-gray-300',
  dark: 'text-gray-800',
} as const;

export const TEXT_SIZE_CLASSES = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
} as const;

export type SpinnerSize = keyof typeof SPINNER_SIZE_CLASSES;
export type SpinnerVariant = keyof typeof SPINNER_VARIANT_CLASSES;