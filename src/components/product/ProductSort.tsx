// components/products/ProductSort.tsx
import React from "react";
import { ChevronDown, Filter, SortAsc, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SORT_OPTIONS, SortOption } from "@/constants";

export interface ProductSortProps {
  categories: string[];
  selectedCategory: string;
  sortOption: SortOption;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: SortOption) => void;
  onClearFilters: () => void;
  className?: string;
}

export const ProductSort: React.FC<ProductSortProps> = ({
  categories,
  selectedCategory,
  sortOption,
  onCategoryChange,
  onSortChange,
  onClearFilters,
  className = "",
}) => {
  const hasActiveFilters =
    selectedCategory !== "all" || sortOption !== "default";
  const activeFilterCount =
    (selectedCategory !== "all" ? 1 : 0) + (sortOption !== "default" ? 1 : 0);

  return (
    <div className={`space-y-4 md:space-y-6 ${className}`}>
      {/* Category Filter Section */}
      <div className="space-y-2 md:space-y-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 md:h-5 md:w-5 text-gray-500" />
          <h3 className="text-base md:text-lg font-semibold text-gray-900">
            Categories
          </h3>
          {selectedCategory !== "all" && (
            <span className="text-xs md:text-sm text-gray-500">
              (Selected: {selectedCategory})
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-1 md:gap-2">
          <button
            onClick={() => onCategoryChange("all")}
            className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-sm md:text-base font-medium transition-colors ${
              selectedCategory === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Products
          </button>

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-sm md:text-base font-medium transition-colors capitalize ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Sort & Actions Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Sort Dropdown */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <SortAsc className="h-4 w-4 md:h-5 md:w-5 text-gray-500" />
            <h3 className="text-base md:text-lg font-semibold text-gray-900">
              Sort By
            </h3>
          </div>

          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="w-full md:w-64 px-3 md:px-4 py-2 pl-9 md:pl-10 rounded-lg border border-gray-300 bg-white text-sm md:text-base text-gray-700 font-medium appearance-none pr-9 md:pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <div className="absolute left-2.5 md:left-3 top-1/2 transform -translate-y-1/2">
              {SORT_OPTIONS.find((opt) => opt.value === sortOption)?.icon ? (
                React.createElement(
                  SORT_OPTIONS.find((opt) => opt.value === sortOption)!.icon!,
                  { className: "h-3.5 w-3.5 md:h-4 md:w-4 text-gray-400" },
                )
              ) : (
                <SortAsc className="h-3.5 w-3.5 md:h-4 md:w-4 text-gray-400" />
              )}
            </div>

            <ChevronDown className="absolute right-2.5 md:right-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 md:h-4 md:w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <div className="space-y-2 self-start md:self-auto">
            <div className="text-xs md:text-sm text-gray-500 md:text-right">
              Active Filters
            </div>
            <button
              onClick={onClearFilters}
              className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors border border-gray-300"
            >
              <X className="h-3.5 w-3.5 md:h-4 md:w-4" />
              Clear Filters
              <Badge variant="secondary" className="bg-gray-200 text-gray-700 text-xs">
                {activeFilterCount}
              </Badge>
            </button>
          </div>
        )}
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="p-3 md:p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0">
            <div className="flex items-center gap-2">
              <span className="font-medium text-blue-700 text-sm md:text-base">
                Active Filters:
              </span>
              <Badge 
                variant="secondary" 
                className="bg-blue-100 text-blue-700 text-xs"
              >
                {activeFilterCount}
              </Badge>
            </div>
            <div className="text-xs md:text-sm text-gray-600 flex flex-col md:flex-row md:space-x-4 gap-1 md:gap-0">
              {selectedCategory !== "all" && (
                <span>
                  Category:{" "}
                  <span className="font-medium capitalize">
                    {selectedCategory}
                  </span>
                </span>
              )}
              {sortOption !== "default" && (
                <span>
                  Sort:{" "}
                  <span className="font-medium">
                    {
                      SORT_OPTIONS.find((opt) => opt.value === sortOption)
                        ?.label
                    }
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSort;