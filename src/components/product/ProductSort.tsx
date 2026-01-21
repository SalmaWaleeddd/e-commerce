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
    <div className={`space-y-6 ${className}`}>
      {/* Category Filter Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
          {selectedCategory !== "all" && (
            <span className="text-sm text-gray-500">
              (Selected: {selectedCategory})
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onCategoryChange("all")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
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
              className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
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
      <div className="flex items-center justify-between">
        {/* Sort Dropdown */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <SortAsc className="h-5 w-5 text-gray-500" />
            <h3 className="text-lg font-semibold text-gray-900">Sort By</h3>
          </div>

          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="w-64 px-4 py-2 pl-10 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              {SORT_OPTIONS.find((opt) => opt.value === sortOption)?.icon ? (
                React.createElement(
                  SORT_OPTIONS.find((opt) => opt.value === sortOption)!.icon!,
                  { className: "h-4 w-4 text-gray-400" },
                )
              ) : (
                <SortAsc className="h-4 w-4 text-gray-400" />
              )}
            </div>

            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <div className="space-y-2">
            <div className="text-sm text-gray-500 text-right">
              Active Filters
            </div>
            <button
              onClick={onClearFilters}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors border border-gray-300"
            >
              <X className="h-4 w-4" />
              Clear Filters
              <Badge variant="secondary" className="bg-gray-200 text-gray-700">
                {activeFilterCount}
              </Badge>
            </button>
          </div>
        )}
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-medium text-blue-700">Active Filters:</span>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                {activeFilterCount}
              </Badge>
            </div>
            <div className="text-sm text-gray-600 space-x-4">
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
