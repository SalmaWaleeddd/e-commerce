// hooks/useCartLogic.ts
import { useState, useEffect, useCallback, useMemo } from 'react';
import type { CartItem, CartContextType } from '@/types/cart';
import type { Product } from '@/types/product';
import { toast } from 'sonner';

// Pure helper functions (can be exported for testing)
export const cartHelpers = {
  findItemIndex: (items: CartItem[], productId: number): number => {
    return items.findIndex(item => item?.product?.id === productId);
  },
  
  isProductInCart: (items: CartItem[], productId: number): boolean => {
    return cartHelpers.findItemIndex(items, productId) !== -1;
  },
  
  calculateTotalItems: (items: CartItem[]): number => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  },
  
  calculateTotalPrice: (items: CartItem[]): number => {
  return items.reduce((sum, item) => {
    // Add null check
    const price = item?.product?.price;
    const quantity = item?.quantity || 0;
    if (!price || isNaN(price)) return sum;
    return sum + (price * quantity);
  }, 0);
},
};

export const useCartLogic = (): CartContextType => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save cart:', error);
    }
  }, [items]);

  // Operations
  const addToCart = useCallback((product: Product) => {
    setItems(prev => {
      const existingIndex = cartHelpers.findItemIndex(prev, product.id);
      
      if (existingIndex !== -1) {
        return prev.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    toast.success('Product added to cart');
      console.log('🛒 Product added to cart:', product.title);
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setItems(prev => prev.filter(item => item?.product?.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setItems(prev => {
      const existingIndex = cartHelpers.findItemIndex(prev, productId);
      if (existingIndex === -1) return prev;
      
      return prev.map((item, index) =>
        index === existingIndex ? { ...item, quantity } : item
      );
    });
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // Public interface
  const isInCart = useCallback(
    (productId: number) => cartHelpers.isProductInCart(items, productId),
    [items]
  );

  const totalItems = useMemo(
    () => cartHelpers.calculateTotalItems(items),
    [items]
  );

  const totalPrice = useMemo(
    () => cartHelpers.calculateTotalPrice(items),
    [items]
  );

  return {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isInCart,
  };
};