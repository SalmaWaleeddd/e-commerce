// pages/HomePage.tsx
import React, { useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductGrid } from '@/components/product';
import { ProductSort } from '@/components/product/ProductSort';
import { ProductPagination } from '@/components/product';
import { useProductContext } from '@/contexts/ProductContext';
import { useProductOperations } from '@/hooks/useProductOperations';
import { usePagination } from '@/hooks/usePagination';
import MainLayout from '@/components/layout/MainLayout';
import { ChevronDown } from 'lucide-react';
import type { SortOption } from '@/constants/productSort';

const HomePage: React.FC = () => {
  // Items per page options
  const itemsPerPageOptions = [12, 24, 36, 48];
  
  // URL params for category
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Refs for tracking previous values to detect changes
  const prevCategoryRef = useRef<string>('all');
  const prevPageRef = useRef<number>(1);
  
  // Fetch products using context (global state)
  const { allProducts: products, categories, isLoading: loading, error, refetchAllData } = useProductContext();
  
  // Use product operations for sorting/filtering logic
  const { filterAndSortProducts } = useProductOperations();
  
  // State for sorting, filtering, and items per page
  const initialCategory = searchParams.get('category') || 'all';
  const [selectedCategory, setSelectedCategory] = React.useState(initialCategory);
  const [sortOption, setSortOption] = React.useState<SortOption>('default');
  const [itemsPerPage, setItemsPerPage] = React.useState(itemsPerPageOptions[0]);
  
  // Scroll to top when category changes
  useEffect(() => {
    if (prevCategoryRef.current !== selectedCategory) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      prevCategoryRef.current = selectedCategory;
    }
  }, [selectedCategory]);

  // Update URL when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    
    // Update URL parameter
    const newParams = new URLSearchParams(searchParams);
    if (category === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', category);
    }
    setSearchParams(newParams, { replace: true });
  };

  // Sync selectedCategory when URL changes (e.g., from Footer links)
  useEffect(() => {
    const urlCategory = searchParams.get('category') || 'all';
    if (urlCategory !== selectedCategory) {
      setSelectedCategory(urlCategory);
    }
  }, [searchParams]);

  // Apply sorting and filtering using the hook
  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(products, selectedCategory, sortOption);
  }, [products, selectedCategory, sortOption, filterAndSortProducts]);

  // Use pagination hook
  const pagination = usePagination({
    items: filteredProducts,
    itemsPerPage,
    initialPage: 1,
  });

  // Get paginated items
  const { pageItems, goToPage, currentPage } = pagination;

  // Scroll to top when page changes
  useEffect(() => {
    if (prevPageRef.current !== currentPage) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      prevPageRef.current = currentPage;
    }
  }, [currentPage]);

  // Handle clear filters
  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSortOption('default');
    
    // Clear category from URL
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('category');
    setSearchParams(newParams, { replace: true });
    
    // Reset to first page
    goToPage(1);
  };

  return (
    <MainLayout>
      <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Discover Our Products
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse through our curated collection of high-quality products
          </p>
        </div>

        {/* Sorting and Filtering Section */}
        <div className="mb-8">
          <ProductSort
            categories={categories}
            selectedCategory={selectedCategory}
            sortOption={sortOption}
            onCategoryChange={handleCategoryChange}
            onSortChange={setSortOption}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Results Summary and Items Per Page Selector */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-gray-700">
              Showing{' '}
              <span className="font-semibold">
                {pagination.startIndex + 1}-
                {Math.min(pagination.endIndex, pagination.totalItems)}
              </span>{' '}
              of{' '}
              <span className="font-semibold">{pagination.totalItems}</span> products
              {pagination.totalPages > 1 && (
                <span className="ml-2 text-gray-500">
                  (Page {currentPage} of {pagination.totalPages})
                </span>
              )}
            </p>
            {(selectedCategory !== 'all' || sortOption !== 'default') && (
              <p className="text-sm text-gray-500 mt-1">
                {selectedCategory !== 'all' && (
                  <span className="mr-3 capitalize">Category: {selectedCategory}</span>
                )}
                {sortOption !== 'default' && (
                  <span>Sorted by: {sortOption.replace('-', ' ')}</span>
                )}
              </p>
            )}
          </div>
          
          {/* Items Per Page Dropdown */}
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-500">Show:</div>
            <div className="relative">
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  // Reset to first page when items per page changes
                  goToPage(1);
                }}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                aria-label="Items per page"
              >
                {itemsPerPageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="mb-10">
          <ProductGrid
            products={pageItems}
            isLoading={loading}
            error={
              error
                ? {
                    message: error,
                    onRetry: refetchAllData,
                    type: 'error' as const,
                  }
                : undefined
            }
            emptyStateType={
              filteredProducts.length === 0 && (selectedCategory !== 'all' || sortOption !== 'default') 
                ? 'search' 
                : 'products'
            }
            showAddToCart={true}
          />
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="mt-12">
            <ProductPagination
              pagination={pagination}
              className="mt-8"
            />
          </div>
        )}

      </div>
    </MainLayout>
  );
};

export default HomePage;