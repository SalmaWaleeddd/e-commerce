import React from 'react';
import { Link } from 'react-router-dom';
import {  Code } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Company Info */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">ShopCart</h3>
            <p className="text-gray-400">
              Your one-stop shop for amazing products
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-2 mb-6 md:mb-0">
            <h4 className="font-semibold mb-2">Quick Links</h4>
            <Link to="/products" className="text-gray-400 hover:text-white transition-colors">
              Products
            </Link>
            <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
              Contact
            </Link>
            <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </div>

          {/* Categories */}
          <div className="flex flex-col space-y-2">
            <h4 className="font-semibold mb-2">Categories</h4>
            <Link to="/products?category=electronics" className="text-gray-400 hover:text-white transition-colors">
              Electronics
            </Link>
           
            <Link to="/products?category=jewelry" className="text-gray-400 hover:text-white transition-colors">
              Jewelry
            </Link>
             <Link to="/products?category=men's clothing" className="text-gray-400 hover:text-white transition-colors">
              Men's Clothing
            </Link>
            <Link to="/products?category=women's clothing" className="text-gray-400 hover:text-white transition-colors">
              Women's Clothing
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} ShopCart. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-4">
            <a 
              href="https://github.com/SalmaWaleeddd/e-commerce" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Code className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;