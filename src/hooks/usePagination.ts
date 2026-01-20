// hooks/usePagination.ts
import { useState, useEffect } from 'react';

export interface UsePaginationProps<T> {
  items: T[];
  itemsPerPage: number;
  initialPage?: number;
}

export interface UsePaginationReturn<T> {
  // Current state
  currentPage: number;
  totalPages: number;
  pageItems: T[];
  
  // Actions
  goToPage: (page: number) => void;
  goToNext: () => void;
  goToPrevious: () => void;
  goToFirst: () => void;
  goToLast: () => void;
  
  // Info
  startIndex: number;
  endIndex: number;
  totalItems: number;
  hasNext: boolean;
  hasPrevious: boolean;
  
  // For UI
  getVisiblePages: () => (number | 'ellipsis')[];
}

export function usePagination<T>({
  items,
  itemsPerPage = 12,
  initialPage = 1,
}: UsePaginationProps<T>): UsePaginationReturn<T> {
  const [currentPage, setCurrentPage] = useState(initialPage);
  
  // Reset to page 1 when items change significantly
  useEffect(() => {
    setCurrentPage(1);
  }, [items.length]); // Reset when total items change

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageItems = items.slice(startIndex, endIndex);
  
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };
  
  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };
  
  const goToFirst = () => setCurrentPage(1);
  const goToLast = () => setCurrentPage(totalPages);
  
  const getVisiblePages = (maxVisible = 5): (number | 'ellipsis')[] => {
    const pages: (number | 'ellipsis')[] = [];
    
    if (totalPages <= maxVisible) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // Calculate middle pages
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust when near edges
      if (currentPage <= 2) {
        start = 2;
        end = 4;
      } else if (currentPage >= totalPages - 1) {
        start = totalPages - 3;
        end = totalPages - 1;
      }
      
      // Add ellipsis if needed
      if (start > 2) {
        pages.push('ellipsis');
      }
      
      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (end < totalPages - 1) {
        pages.push('ellipsis');
      }
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  return {
    // Current state
    currentPage,
    totalPages,
    pageItems,
    
    // Actions
    goToPage,
    goToNext,
    goToPrevious,
    goToFirst,
    goToLast,
    
    // Info
    startIndex,
    endIndex,
    totalItems: items.length,
    hasNext: currentPage < totalPages,
    hasPrevious: currentPage > 1,
    
    // For UI
    getVisiblePages,
  };
}