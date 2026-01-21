// pages/CartPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Trash2 } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import { useCart } from "@/contexts/CartContext";
//import { useAuth } from '@/contexts/AuthContext'; // You'll need to create this
import { PageSpinner } from "@/components/common";

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();
  //const { isAuthenticated, user } = useAuth(); // Assuming you have auth context

  const [isClearing, setIsClearing] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Calculate cart totals
  const shipping = totalPrice > 50 ? 0 : 5.99; // Free shipping over $50
  const tax = totalPrice * 0.08; // 8% tax rate 
  const orderTotal = totalPrice + shipping + tax;

  const handleClearCart = () => {
    setIsClearing(true);
    setTimeout(() => {
      clearCart();
      setIsClearing(false);
    }, 300);
  };

  const handleCheckout = () => {
    /*   if (!isAuthenticated) {
      navigate('/login', { state: { from: '/cart' } });
      return;
    } */

    if (items.length === 0) return;

    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      alert("Checkout functionality would be implemented here!");
      setIsCheckingOut(false);
    }, 2000);
  };

  const handleContinueShopping = () => {
    navigate("/products");
  };

  // Loading state
  if (isClearing) {
    return (
      <MainLayout>
        <div className="py-8">
          <PageSpinner message="Clearing cart..." />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="py-8 max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate("/products")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Button>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
            <ShoppingBag className="h-8 w-8" />
            Your Shopping Cart
          </h1>
          <p className="text-gray-600 mt-2">
            {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        {items.length === 0 ? (
          // Empty Cart State
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="text-gray-300 text-6xl mb-4">🛒</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-8">
                Looks like you haven't added any products to your cart yet.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleContinueShopping}
                  className="px-8 py-3"
                  size="lg"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Browse Products
                </Button>
                {/*   {isAuthenticated && (
                  <Button
                    variant="outline"
                    onClick={() => navigate('/products')}
                    className="px-8 py-3"
                    size="lg"
                  >
                    View Your Wishlist
                  </Button>
                )} */}
              </div>
            </div>
          </div>
        ) : (
          // Cart with Items
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items - Left column (2/3 on desktop) */}
            <div className="lg:col-span-2">
              {/* Cart Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Cart Items ({totalItems})
                </h2>
                <Button
                  variant="ghost"
                  onClick={handleClearCart}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear Cart
                </Button>
              </div>

              {/* Cart Items List */}
              <div className="space-y-6">
                {items
                  .filter((item) => item?.product)
                  .map((item) => (
                    <CartItem
                      key={item.product.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeFromCart}
                    />
                  ))}
              </div>

              {/* Continue Shopping */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={handleContinueShopping}
                  className="w-full sm:w-auto"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Button>
              </div>
            </div>

            {/* Order Summary - Right column (1/3 on desktop) */}
            <div className="lg:col-span-1">
              <CartSummary
                subtotal={totalPrice}
                shipping={shipping}
                tax={tax}
                total={orderTotal}
                itemCount={totalItems}
                onCheckout={handleCheckout}
                isLoading={isCheckingOut}
                isAuthenticated={true}
              />

              {/* Security Features */}
              <div className="mt-6 bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Shopping with confidence
                </h3>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    Secure encrypted checkout
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    30-day return policy
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    Price match guarantee
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CartPage;
