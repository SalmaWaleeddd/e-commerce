// components/layout/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Code } from 'lucide-react';
import { useProductContext } from '@/contexts/ProductContext';
import { Spinner } from '@/components/common';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { categories, isLoading } = useProductContext();

  // Filter out empty categories and limit to 4 for footer
  const displayCategories = categories
    .filter(cat => cat && cat.trim() !== '')
    .slice(0, 4);

  // Default categories as fallback
  const defaultCategories = [
    "electronics",
    "jewelry", 
    "men's clothing",
    "women's clothing"
  ];

  const finalCategories = displayCategories.length > 0 ? displayCategories : defaultCategories;

  return (
    <footer className="bg-gray-800 text-white py-6 sm:py-8">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {/* Company Info - Takes 4 columns on desktop */}
          <div className="md:col-span-4 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">ShopCart</h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Your one-stop shop for amazing products at great prices
            </p>
          </div>

          {/* Quick Links - Takes 4 columns on desktop */}
          <div className="md:col-span-4">
            <h4 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Quick Links</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:flex sm:flex-col sm:space-y-2">
              <Link 
                to="/products" 
                className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base truncate py-1"
                title="Browse Products"
              >
                Products
              </Link>
              <Link 
                to="/about" 
                className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base truncate py-1"
                title="About Us"
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base truncate py-1"
                title="Contact Us"
              >
                Contact
              </Link>
              <Link 
                to="/privacy" 
                className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base truncate py-1"
                title="Privacy Policy"
              >
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Categories - Takes 4 columns on desktop */}
          <div className="md:col-span-4">
            <h4 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Categories</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:flex sm:flex-col sm:space-y-2">
              {isLoading ? (
                // Spinner with text - spans full width on mobile
                <div className="col-span-2 sm:col-span-1 flex items-center justify-center py-2">
                  <Spinner 
                    size="sm" 
                    variant="light" 
                    className="text-gray-500" 
                    withText 
                    text="Loading..." 
                  />
                </div>
              ) : (
                finalCategories.map((category) => (
                  <Link 
                    key={category}
                    to={`/products?category=${encodeURIComponent(category)}`}
                    className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base truncate py-1 capitalize"
                    title={category}
                  >
                    {category}
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-4 sm:my-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
            © {currentYear} ShopCart. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-4">
            <a 
              href="https://github.com/SalmaWaleeddd/e-commerce" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-gray-700"
              aria-label="GitHub Repository"
            >
              <Code className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;