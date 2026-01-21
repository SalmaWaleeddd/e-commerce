// components/cart/CartItem.tsx
import React, { useState } from "react";
import { X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuantitySelector from "./QuantitySelector";
import type { CartItem as CartItemType } from "@/types";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onRemove(item.product.id);
    }, 300);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const subtotal = item.product.price * item.quantity;

  return (
    <div
      className={`transition-all duration-300 ${
        isRemoving ? "opacity-0 transform -translate-x-4" : ""
      }`}
    >
      {/* MOBILE LAYOUT (Compact) - Only visible on mobile */}
      <div className="md:hidden">
        <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
              {imageError ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <span className="text-gray-400 text-xs">No image</span>
                </div>
              ) : (
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="w-full h-full object-contain p-1"
                  onError={handleImageError}
                />
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 truncate text-sm">
              {item.product.title}
            </h3>
            <p className="text-sm text-gray-500 capitalize">
              {item.product.category}
            </p>
            <div className="flex items-center justify-between mt-2">
              <span className="font-semibold text-gray-900">
                ${item.product.price.toFixed(2)}
              </span>
              <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
            </div>
          </div>

          {/* Remove Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRemove}
            className="h-8 w-8 text-gray-400 hover:text-red-600 hover:bg-red-50"
            aria-label="Remove item"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* DESKTOP LAYOUT (Full) - Only visible on desktop */}
      <div className="hidden md:block">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 bg-white rounded-xl border border-gray-200 hover:border-gray-300">
          {/* Image and Info - spans 8 columns on desktop */}
          <div className="md:col-span-8 flex gap-6">
            {/* Product Image */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                {imageError ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <div className="text-center">
                      <div className="text-gray-300 text-4xl mb-1">🖼️</div>
                      <p className="text-xs text-gray-400">No image</p>
                    </div>
                  </div>
                ) : (
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-full h-full object-contain p-2"
                    onError={handleImageError}
                  />
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {item.product.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full capitalize">
                      {item.product.category}
                    </span>
                    {item.product.rating && (
                      <span className="text-sm text-gray-500">
                        ⭐ {item.product.rating.rate} ({item.product.rating.count})
                      </span>
                    )}
                  </div>
                </div>

                {/* Price - Mobile only (hidden on desktop) */}
                <div className="md:hidden">
                  <div className="text-xl font-bold text-gray-900">
                    ${subtotal.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500 text-right">
                    ${item.product.price.toFixed(2)} each
                  </div>
                </div>
              </div>

              <p className="text-gray-600 line-clamp-2 mb-4">
                {item.product.description}
              </p>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between">
                <QuantitySelector
                  quantity={item.quantity}
                  onIncrease={() =>
                    onUpdateQuantity(item.product.id, item.quantity + 1)
                  }
                  onDecrease={() =>
                    onUpdateQuantity(item.product.id, item.quantity - 1)
                  }
                  onChange={(qty) => onUpdateQuantity(item.product.id, qty)}
                  min={1}
                  max={99}
                />

                {/* Remove Button */}
                <Button
                  variant="ghost"
                  onClick={handleRemove}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              </div>
            </div>
          </div>

          {/* Price and Total - spans 4 columns on desktop */}
          <div className="md:col-span-4 md:border-l md:border-gray-200 md:pl-6">
            <div className="space-y-4">
              {/* Unit Price */}
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Unit Price</span>
                <span className="text-lg font-semibold text-gray-900">
                  ${item.product.price.toFixed(2)}
                </span>
              </div>

              {/* Quantity */}
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Quantity</span>
                <span className="text-lg font-medium text-gray-900">
                  {item.quantity}
                </span>
              </div>

              {/* Subtotal */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">
                    Subtotal
                  </span>
                  <span className="text-2xl font-bold text-gray-900">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;