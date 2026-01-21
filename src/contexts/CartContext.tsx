// contexts/CartContext.tsx
import React, { createContext, useContext } from 'react';
import { useCartLogic } from '@/hooks/useCartLogic';
import type { CartContextType } from '@/types/cart';

// Create Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider Component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const cartLogic = useCartLogic();
  
  return (
    <CartContext.Provider value={cartLogic}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
};