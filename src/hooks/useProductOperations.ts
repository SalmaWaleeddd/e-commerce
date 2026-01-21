// hooks/useProductOperations.ts
import { useCallback, useMemo } from 'react';
import { productService } from '@/services/productService';
import type { Product } from '@/types/product';
import { useProductContext } from '@/contexts/ProductContext';
import { SortOption } from '@/constants';



interface UseProductOperationsReturn {
  // Product Retrieval
  getProductById: (id: number) => Promise<Product | null>;
  getCachedProductById: (id: number) => Product | undefined;
  
  // Searching & Filtering
  searchProducts: (query: string) => Product[];
  filterByCategory: (category: string) => Product[];
  
  // Sorting
  sortProducts: (products: Product[], sortOption: SortOption) => Product[];
  
  // Combined filter + sort
  filterAndSortProducts: (
    products: Product[], 
    category: string, 
    sortOption: SortOption
  ) => Product[];
  
  // Utility Getters
  getProductsByCategory: (category: string) => Product[];
  
  // Stats & Info
  getCategoryStats: () => Record<string, number>;
  getPriceStats: () => { min: number; max: number; average: number };
}

export const useProductOperations = (): UseProductOperationsReturn => {
  const { allProducts } = useProductContext();

  // ========== PRODUCT RETRIEVAL ==========
  
  // Get product by ID (tries cache first, then API)
  const getProductById = useCallback(async (id: number): Promise<Product | null> => {
    try {
      // First check local cache
      const cachedProduct = allProducts.find(p => p.id === id);
      if (cachedProduct) return cachedProduct;
      
      // If not in cache, fetch from API
      const product = await productService.getProductById(id);
      return product;
    } catch (err) {
      console.error(`Error fetching product ${id}:`, err);
      return null;
    }
  }, [allProducts]);

  // Get product from cache only (no API call)
  const getCachedProductById = useCallback((id: number): Product | undefined => {
    return allProducts.find(p => p.id === id);
  }, [allProducts]);

  // ========== SEARCHING & FILTERING ==========
  
  const searchProducts = useCallback((query: string): Product[] => {
    if (!query.trim()) return allProducts;
    
    const searchTerm = query.toLowerCase();
    
    return allProducts.filter(product => 
      product.title.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  }, [allProducts]);

  const filterByCategory = useCallback((category: string): Product[] => {
    if (!category || category === 'all' || category === '') {
      return allProducts;
    }
    return allProducts.filter(product => product.category === category);
  }, [allProducts]);

  // ========== SORTING ==========
  
  const sortProducts = useCallback((
    products: Product[], 
    sortOption: SortOption = 'default'
  ): Product[] => {
    const sorted = [...products];
    
    switch (sortOption) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        // Keep original order
        break;
    }
    
    return sorted;
  }, []);

  // Combined filter + sort (for convenience)
  const filterAndSortProducts = useCallback((
    products: Product[], 
    category: string = 'all', 
    sortOption: SortOption = 'default'
  ): Product[] => {
    let result = [...products];
    
    // Filter by category
    if (category !== 'all') {
      result = result.filter(product => product.category === category);
    }
    
    // Sort
    return sortProducts(result, sortOption);
  }, [sortProducts]);

  // ========== UTILITY GETTERS ==========

  const getProductsByCategory = useCallback((category: string): Product[] => {
    return allProducts.filter(product => product.category === category);
  }, [allProducts]);

  // ========== STATS & INFO ==========
  
  const getCategoryStats = useCallback((): Record<string, number> => {
    const stats: Record<string, number> = {};
    
    allProducts.forEach(product => {
      stats[product.category] = (stats[product.category] || 0) + 1;
    });
    
    return stats;
  }, [allProducts]);

  const getPriceStats = useCallback(() => {
    if (allProducts.length === 0) {
      return { min: 0, max: 0, average: 0 };
    }
    
    const prices = allProducts.map(p => p.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const average = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    
    return { min, max, average: Number(average.toFixed(2)) };
  }, [allProducts]);

  // Memoize the return value for performance
  return useMemo(() => ({
    // Product Retrieval
    getProductById,
    getCachedProductById,
    
    // Searching & Filtering
    searchProducts,
    filterByCategory,
    
    // Sorting
    sortProducts,
    filterAndSortProducts,
    
    // Utility Getters
    getProductsByCategory,
    
    // Stats & Info
    getCategoryStats,
    getPriceStats,
  }), [
    getProductById,
    getCachedProductById,
    searchProducts,
    filterByCategory,
    sortProducts,
    filterAndSortProducts,
    getProductsByCategory,
    getCategoryStats,
    getPriceStats,
  ]);
};