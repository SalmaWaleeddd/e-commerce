// src/hooks/useProducts.ts
import { useState, useEffect, useCallback } from 'react';
import { productService } from '@/services/productService';
import type { Product, CreateProduct } from '@/types/product';

interface UseProductsReturn {
  // State
  products: Product[];
  categories: string[];
  loading: boolean;
  error: string | null;
  
  // Actions
  refetchProducts: () => Promise<void>;
  refetchCategories: () => Promise<void>;
  getProductById: (id: number) => Promise<Product | null>;
  createProduct: (data: CreateProduct) => Promise<Product | null>;
  
  // Utilities
  totalProducts: number;
  isLoading: boolean;
  hasError: boolean;
}

export const useProducts = (): UseProductsReturn => {
  // Products state
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products - returns void, not Product[]
  const fetchProducts = useCallback(async (): Promise<void> => {
    try {
      setError(null);
      const data = await productService.getProducts();
      setProducts(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch products';
      setError(message);
      console.error('Error fetching products:', err);
    }
  }, []);

  // Fetch categories - returns void, not string[]
  const fetchCategories = useCallback(async (): Promise<void> => {
    try {
      const data = await productService.getCategories();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
      // Extract categories from products as fallback
      try {
        const productsData = await productService.getProducts();
        const uniqueCategories = [...new Set(productsData.map(p => p.category))];
        setCategories(uniqueCategories);
      } catch (fallbackErr) {
        console.error('Failed to extract categories from products:', fallbackErr);
      }
    }
  }, []);

  // Get single product by ID
  const getProductById = useCallback(async (id: number): Promise<Product | null> => {
    try {
      const product = await productService.getProductById(id);
      return product;
    } catch (err) {
      console.error(`Error fetching product ${id}:`, err);
      return null;
    }
  }, []);

  // Create product
  const createProduct = useCallback(async (data: CreateProduct): Promise<Product | null> => {
    try {
      const newProduct = await productService.createProduct(data);
      
      // Refresh products list
      await fetchProducts();
      
      return newProduct;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create product';
      setError(message);
      console.error('Error creating product:', err);
      return null;
    }
  }, [fetchProducts]);

  // Load all initial data
  const loadInitialData = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      await Promise.all([fetchProducts(), fetchCategories()]);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load initial data';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [fetchProducts, fetchCategories]);

  // Initial load
  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  // Return everything
  return {
    // State
    products,
    categories,
    loading,
    error,
    
    // Actions
    refetchProducts: fetchProducts,
    refetchCategories: fetchCategories,
    getProductById,
    createProduct,
    
    // Utilities
    totalProducts: products.length,
    isLoading: loading,
    hasError: error !== null,
  };
};
