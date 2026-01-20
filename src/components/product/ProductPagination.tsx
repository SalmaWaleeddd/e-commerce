// components/products/ProductPagination.tsx
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { UsePaginationReturn } from '@/hooks/usePagination';

interface ProductPaginationProps<T> {
  pagination: UsePaginationReturn<T>;
  className?: string;
}

export const ProductPagination = <T,>({
  pagination,
  className = '',
}: ProductPaginationProps<T>): React.ReactElement | null => {
  const {
    currentPage,
    totalPages,
    goToPage,
    goToPrevious,
    goToNext,
    hasPrevious,
    hasNext,
    getVisiblePages,
    startIndex,
    endIndex,
    totalItems,
  } = pagination;

  // Don't show pagination if only one page
  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = getVisiblePages();

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Summary */}
      <div className="text-center text-sm text-gray-600">
        Showing{' '}
        <span className="font-semibold">
          {startIndex + 1}-{Math.min(endIndex, totalItems)}
        </span>{' '}
        of <span className="font-semibold">{totalItems}</span> products
      </div>

      {/* Pagination Controls */}
      <Pagination>
        <PaginationContent>
          {/* Previous Button */}
          <PaginationItem>
            <PaginationPrevious
              onClick={goToPrevious}
              className={
                !hasPrevious
                  ? 'pointer-events-none opacity-50'
                  : 'cursor-pointer'
              }
              aria-label="Go to previous page"
            />
          </PaginationItem>

          {/* Page Numbers */}
          {visiblePages.map((page, index) => {
            if (page === 'ellipsis') {
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            const pageNum = page as number;
            return (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  onClick={() => goToPage(pageNum)}
                  isActive={currentPage === pageNum}
                  className="cursor-pointer min-w-9"
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {/* Next Button */}
          <PaginationItem>
            <PaginationNext
              onClick={goToNext}
              className={
                !hasNext ? 'pointer-events-none opacity-50' : 'cursor-pointer'
              }
              aria-label="Go to next page"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ProductPagination;