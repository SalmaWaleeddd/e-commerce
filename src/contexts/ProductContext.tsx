// contexts/ProductContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { productService } from '@/services/productService';
import type { Product } from '@/types/product';

interface ProductContextType {
  // Global State
  allProducts: Product[];
  categories: string[];
  isLoading: boolean;
  error: string | null;
  
  // Global Actions (for fetching ALL data)
  fetchAllProducts: () => Promise<void>;
  fetchAllCategories: () => Promise<void>;
  refetchAllData: () => Promise<void>;
  
  // Utilities
  totalProducts: number;
  hasError: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch ALL products for the entire app
  const fetchAllProducts = useCallback(async (): Promise<void> => {
    try {
      setError(null);
      const data = await productService.getProducts();
      setAllProducts(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch products';
      setError(message);
      console.error('Error fetching products:', err);
    }
  }, []);

  // Fetch ALL categories for the entire app
  const fetchAllCategories = useCallback(async (): Promise<void> => {
    try {
      const data = await productService.getCategories();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  }, []);

  // Refresh ALL data at once
  const refetchAllData = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      await Promise.all([fetchAllProducts(), fetchAllCategories()]);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load data';
      setError(message);
      console.error('Error loading data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [fetchAllProducts, fetchAllCategories]);

  // Initial data load on mount
  useEffect(() => {
    refetchAllData();
  }, []);

  // Context value
  const value: ProductContextType = {
    // State
    allProducts,
    categories,
    isLoading,
    error,
    
    // Actions
    fetchAllProducts,
    fetchAllCategories,
    refetchAllData,
    
    // Utilities
    totalProducts: allProducts.length,
    hasError: error !== null,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use the context
export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};