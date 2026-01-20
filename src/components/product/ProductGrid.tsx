// components/products/ProductGrid.tsx
import React from 'react';
import { ProductCard } from './ProductCard';
import { EmptyState, ErrorMessage, PageSpinner } from '@/components/common';
import { ErrorBoundary } from '@/components/layout/ErrorBoundary';
import type { Product } from '@/types';
import type { EmptyStateType } from '@/constants/empty-state';
import type { ErrorType } from '@/constants/error';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  error?: {
    message: string;
    onRetry?: () => void;
    type?: ErrorType;
  };
  emptyStateType?: EmptyStateType;
  showAddToCart?: boolean;
  gridClassName?: string;
  showErrorBoundary?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading = false,
  error,
  emptyStateType = 'products',
  showAddToCart = true,
  gridClassName = '',
  showErrorBoundary = true,
}) => {
  // Error state
  if (error) {
    return (
      <div className="py-8">
        <ErrorMessage
          title="Failed to load products"
          message={error.message}
          showRetry={!!error.onRetry}
          onRetry={error.onRetry}
          type={error.type || 'error'}
          fullWidth
        />
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return <PageSpinner message="Loading products..." />;
  }

  // Empty state - uses config for everything
  if (products.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <EmptyState
          type={emptyStateType}
          bordered
          fullHeight
        />
      </div>
    );
  }

  // Product grid
  const gridContent = (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${gridClassName}`}>
      {products.map((product) => (
        <ErrorBoundary key={product.id}>
          <ProductCard
            product={product}
            showAddToCart={showAddToCart}
          />
        </ErrorBoundary>
      ))}
    </div>
  );

  return showErrorBoundary ? (
    <ErrorBoundary>{gridContent}</ErrorBoundary>
  ) : gridContent;
};

export default ProductGrid;