// pages/HomePage.tsx
import React, { useMemo } from 'react';
import { ProductGrid } from '@/components/product';
import { ProductSort, sortProducts } from '@/components/product';
import { ProductPagination } from '@/components/product';
import { useProducts } from '@/hooks/useProducts';
import { usePagination } from '@/hooks/usePagination';
import  MainLayout  from '@/components/layout/MainLayout';
import { ChevronDown } from 'lucide-react';
import type { SortOption } from '@/components/product';

const HomePage: React.FC = () => {
  // Items per page options
  const itemsPerPageOptions = [12, 24, 36, 48];
  
  // Fetch products
  const { products, categories, loading, error, refetchProducts } = useProducts();
  
  // State for sorting, filtering, and items per page
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [sortOption, setSortOption] = React.useState<SortOption>('default');
  const [itemsPerPage, setItemsPerPage] = React.useState(itemsPerPageOptions[0]);
  
  // Apply sorting and filtering
  const filteredProducts = useMemo(() => {
    return sortProducts(products, sortOption, selectedCategory);
  }, [products, sortOption, selectedCategory]);

  // Use pagination hook
  const pagination = usePagination({
    items: filteredProducts,
    itemsPerPage,
    initialPage: 1,
  });

  // Get paginated items
  const { pageItems } = pagination;

  // Handle clear filters
  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSortOption('default');
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
            onCategoryChange={setSelectedCategory}
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
                  (Page {pagination.currentPage} of {pagination.totalPages})
                </span>
              )}
            </p>
            {(selectedCategory !== 'all' || sortOption !== 'default') && (
              <p className="text-sm text-gray-500 mt-1">
                {selectedCategory !== 'all' && (
                  <span className="mr-3">Category: {selectedCategory}</span>
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
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
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
                    onRetry: refetchProducts,
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