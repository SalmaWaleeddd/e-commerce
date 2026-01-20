// constants/empty-state.ts
import { 
  Package, 
  Search, 
  ShoppingCart, 
  FileText, 
  Users, 
  Settings,
  LucideIcon 
} from 'lucide-react';

export type EmptyStateType = 
  | 'products' 
  | 'search' 
  | 'cart' 
  | 'orders' 
  | 'users' 
  | 'settings'
  | 'default';

export interface EmptyStateConfig {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const EMPTY_STATE_CONFIG: Record<EmptyStateType, EmptyStateConfig> = {
  products: {
    icon: Package,
    title: 'No products found',
    description: 'There are no products available at the moment.',
  },
  search: {
    icon: Search,
    title: 'No results found',
    description: 'Try adjusting your search or filter to find what you\'re looking for.',
  },
  cart: {
    icon: ShoppingCart,
    title: 'Your cart is empty',
    description: 'Add some products to your cart and they will appear here.',
  },
  orders: {
    icon: FileText,
    title: 'No orders yet',
    description: 'Your orders will appear here once you make a purchase.',
  },
  users: {
    icon: Users,
    title: 'No users found',
    description: 'There are no users to display.',
  },
  settings: {
    icon: Settings,
    title: 'No settings available',
    description: 'Settings will appear here once configured.',
  },
  default: {
    icon: Package,
    title: 'No data available',
    description: 'There is no data to display.',
  },
} as const;

// Helper function to get config
export const getEmptyStateConfig = (type: EmptyStateType = 'default'): EmptyStateConfig => 
  EMPTY_STATE_CONFIG[type];