// pages/ProductDetailPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star, Package, Truck } from 'lucide-react';
import  MainLayout  from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import { PageSpinner, ErrorMessage } from '@/components/common';
import type { Product } from '@/types';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById } = useProducts();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const productId = parseInt(id);
        const data = await getProductById(productId);
        
        if (data) {
          setProduct(data);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, getProductById]);

    useEffect(() => {
    // Scroll to top whenever product detail page loads
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [location.pathname]);

  // Handle add to cart
  const handleAddToCart = async () => {
    if (!product) return;
    
    setAddingToCart(true);
    try {
      await addToCart(product);
    } catch (err) {
      console.error('Failed to add to cart:', err);
    } finally {
      setAddingToCart(false);
    }
  };

  // Handle image error
  const handleImageError = () => {
    setImageError(true);
  };

  // Loading state
  if (loading) {
    return (
      <MainLayout>
        <div className="py-8">
          <PageSpinner message="Loading product details..." />
        </div>
      </MainLayout>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <MainLayout>
        <div className="py-8 max-w-7xl mx-auto px-4">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
          
          <ErrorMessage
            title="Product Not Found"
            message={error || 'The product you are looking for does not exist.'}
            showRetry={false}
            fullWidth
          />
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
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                {imageError ? (
                  <div className="aspect-square flex items-center justify-center bg-gray-100">
                    <div className="text-center">
                      <div className="text-gray-400 mb-2 text-6xl">🖼️</div>
                      <p className="text-gray-500">Image not available</p>
                    </div>
                  </div>
                ) : (
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain aspect-square p-8"
                    onError={handleImageError}
                  />
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Category and Rating */}
              <div className="flex items-center justify-between">
                <Badge 
                  variant="secondary" 
                  className="font-medium capitalize bg-blue-100 text-blue-800"
                >
                  <Package className="mr-2 h-3 w-3" />
                  {product.category}
                </Badge>
                
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
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.price > 50 && (
                    <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                      <Truck className="mr-1 h-3 w-3" />
                      Free Shipping
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-500">Inclusive of all taxes</p>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={handleAddToCart}
                    disabled={addingToCart}
                    className="flex-1 py-6 text-lg font-medium bg-blue-600 hover:bg-blue-700"
                    size="lg"
                  >
                    {addingToCart ? (
                      <>
                        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Adding to Cart...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="flex-1 py-6 text-lg font-medium"
                    size="lg"
                    onClick={() => {
                      handleAddToCart();
                      navigate('/cart');
                    }}
                  >
                    Buy Now
                  </Button>
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Delivery</div>
                  <div className="font-medium text-gray-9">
                    {product.price > 50 ? 'Free' : '$5.99'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Section - Placeholder */}
          <div className="border-t border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              You Might Also Like
            </h2>
            <div className="text-center py-8 text-gray-500">
              <p>Related products would be displayed here</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => navigate('/products')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Browse All Products
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetailPage;