// components/products/ProductCard.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, Star, Truck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { 
  ButtonSpinner,
  Spinner
} from '@/components/common';

interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
  isLoading?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showAddToCart = true,
  isLoading = false,
}) => {
  const { addToCart, addingToCart } = useCart();
  const [imageError, setImageError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAdding(true);
    try {
      await addToCart(product);
      // Show success feedback (toast, etc.)
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col items-center justify-center p-8">
        <Spinner size="md" variant="primary" withText text="Loading product..." />
      </div>
    );
  }

  return (
    <Link 
      to={`/products/${product.id}`}
      className="block group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-xl"
    >
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col">
        {/* Product Image */}
        <div className="relative overflow-hidden bg-gray-50 flex-grow">
          {imageError ? (
            <div className="w-full h-48 flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <div className="text-gray-400 mb-2">🖼️</div>
                <p className="text-sm text-gray-500">Image not available</p>
              </div>
            </div>
          ) : (
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-contain p-4 group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              onError={handleImageError}
            />
          )}
          
          <div className="absolute top-3 left-3">
            <Badge 
              variant="secondary" 
              className="font-medium capitalize bg-blue-100 text-blue-800 hover:bg-blue-200"
            >
              {product.category}
            </Badge>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-3 flex flex-col">
          {/* Product Title */}
          <h3 className="font-semibold text-gray-900 line-clamp-2 min-h-[3.5rem] hover:text-blue-600 transition-colors">
            {product.title}
          </h3>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="ml-1 font-medium text-gray-700">
                  {product.rating.rate}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                ({product.rating.count} reviews)
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="text-2xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.price > 50 && (
                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 ml-2">
                  <Truck className="mr-1 h-3 w-3" />
                  Free Shipping
                </Badge>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            {showAddToCart ? (
              <button
                onClick={handleAddToCart}
                disabled={isAdding || addingToCart}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label={`Add ${product.title} to cart`}
              >
                {(isAdding || addingToCart) ? (
                  <>
                    <ButtonSpinner />
                    <span>Adding...</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            ) : (
              <Link
                to={`/products/${product.id}`}
                className="flex-1 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-center"
              >
                View Details
              </Link>
            )}
            
            {/* Changed from button to Link for View Details */}
            <Link
              to={`/products/${product.id}`}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              aria-label={`View details of ${product.title}`}
            >
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">View Details</span>
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
};