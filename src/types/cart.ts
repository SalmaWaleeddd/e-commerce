// types/cart.ts
import type { Product } from './product';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartContextType {
  // State
  items: CartItem[];
  
  // Actions
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  
  // Calculations
  totalItems: number;
  totalPrice: number;
  isInCart: (productId: number) => boolean;
}