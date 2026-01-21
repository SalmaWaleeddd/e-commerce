// constants/productSort.ts
import { SortAsc, SortDesc, ArrowDownAZ, ArrowDownZA } from 'lucide-react';


export const SORT_OPTIONS = [
  { value: 'default', label: 'Default', icon: null },
  { value: 'price-asc', label: 'Price: Low to High', icon: SortAsc },
  { value: 'price-desc', label: 'Price: High to Low', icon: SortDesc },
  { value: 'name-asc', label: 'Name: A to Z', icon: ArrowDownAZ },
  { value: 'name-desc', label: 'Name: Z to A', icon: ArrowDownZA },
] as const;

export type SortOption = typeof SORT_OPTIONS[number]['value'];

// Type helper
export type SortOptionConfig = typeof SORT_OPTIONS[number];

// Helper functions
export const getSortOptionConfig = (value: SortOption): SortOptionConfig => {
  return SORT_OPTIONS.find(opt => opt.value === value) || SORT_OPTIONS[0];
};

export const getSortOptionLabel = (value: SortOption): string => {
  return getSortOptionConfig(value).label;
};

export const getSortOptionIcon = (value: SortOption) => {
  return getSortOptionConfig(value).icon;
};