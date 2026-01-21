// components/cart/CartSummary.tsx
import React from "react";
import { ShoppingBag, Tag, Truck, ShieldCheck, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  itemCount: number;
  onCheckout: () => void;
  isLoading?: boolean;
  isAuthenticated?: boolean;
  className?: string;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  shipping,
  tax,
  total,
  itemCount,
  onCheckout,
  isLoading = false,
  isAuthenticated = true,
  className = "",
}) => {
  // Free shipping threshold
  const FREE_SHIPPING_THRESHOLD = 50;
  const shippingNeededForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`}
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <ShoppingBag className="h-6 w-6" />
          Order Summary
        </h2>

        {/* Order Details */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal ({itemCount} items)</span>
            <span className="font-medium text-gray-900">
              ${subtotal.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium text-gray-900">
              {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
          </div>

          {/* Free Shipping Progress */}
          {shippingNeededForFree > 0 && (
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">
                  Add ${shippingNeededForFree.toFixed(2)} more for free
                  shipping!
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Total */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">Total</span>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900">
                  ${total.toFixed(2)}
                </div>
                <div className="text-sm text-gray-500">
                  Including tax and shipping
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Button */}
        {isAuthenticated ? (
          <Button
            onClick={onCheckout}
            disabled={isLoading || itemCount === 0}
            className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-base sm:text-lg font-semibold" // 🔥 Added responsive text
            size="lg"
          >
            {isLoading ? (
              <>
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                <span className="text-sm sm:text-base">Processing...</span>
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-sm sm:text-base">
                  Proceed to Checkout
                </span>
              </>
            )}
          </Button>
        ) : (
          <div className="space-y-3">
            <Button
              onClick={onCheckout}
              disabled={isLoading || itemCount === 0}
              className="w-full py-6 text-lg font-semibold bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              Sign in to Checkout
            </Button>
            <p className="text-sm text-center text-gray-500">
              Sign in for faster checkout and order tracking
            </p>
          </div>
        )}

        {/* Security Badge */}
        <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-center gap-2">
          <ShieldCheck className="h-4 w-4 text-green-600" />
          <span className="text-sm text-gray-600">Secure checkout</span>
        </div>
      </div>

      {/* Promo Code Section */}
      <div className="border-t border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Tag className="h-4 w-4" />
          Apply Promo Code
        </h3>

        {/* Responsive layout */}
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Enter promo code"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <Button
            variant="outline"
            className="whitespace-nowrap sm:w-auto w-full"
          >
            Apply
          </Button>
        </div>

        <p className="text-xs text-gray-500 mt-2">
          Popular codes: <span className="font-medium">SAVE10</span>,{" "}
          <span className="font-medium">FREESHIP</span>
        </p>
      </div>

      {/* Additional Info */}
      <div className="border-t border-gray-200 p-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center">
            <div className="text-gray-900 font-medium mb-1">30 Days</div>
            <div className="text-gray-600">Return Policy</div>
          </div>
          <div className="text-center">
            <div className="text-gray-900 font-medium mb-1">Free</div>
            <div className="text-gray-600">
              Shipping over ${FREE_SHIPPING_THRESHOLD}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
