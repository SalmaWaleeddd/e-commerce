// components/layout/Header.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, User, LogOut, Package, Plus, Menu, X } from 'lucide-react';

// ============ REUSABLE SUB-COMPONENTS ============

// Reusable Navigation Links Component
const NavigationLinks: React.FC<{ 
  isMobile?: boolean; 
  onLinkClick?: () => void;
}> = ({ isMobile = false, onLinkClick }) => {
  const { user } = useAuth();
  const { totalItems } = useCart();
  
  return (
    <>
      <Link 
        to="/products" 
        className={`${isMobile 
          ? 'text-gray-700 hover:text-blue-600 font-medium transition-colors py-2 px-2 rounded-lg hover:bg-gray-50 w-full text-left' 
          : 'text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm lg:text-base'
        }`}
        onClick={onLinkClick}
      >
        Products
      </Link>
      
      {!user && (
        <>
          <Link 
            to="/create-product" 
            className={`${isMobile
              ? 'flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
              : 'flex items-center space-x-1 px-2 sm:px-3 py-1 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md text-xs sm:text-sm'
            }`}
            onClick={onLinkClick}
          >
            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className={isMobile ? '' : 'hidden sm:inline'}>Create</span>
            {isMobile && <span>Product</span>}
          </Link>
          
          <Link 
            to="/cart" 
            className={`${isMobile
              ? 'flex items-center justify-between py-3 px-2 text-gray-700 hover:text-blue-600 rounded-lg hover:bg-gray-50'
              : 'text-gray-700 hover:text-blue-600 font-medium transition-colors relative'
            }`}
            onClick={onLinkClick}
          >
            <div className={`flex items-center ${isMobile ? 'space-x-3' : ''}`}>
              <ShoppingCart className={isMobile ? "h-5 w-5" : "h-5 w-5 sm:h-6 sm:w-6"} />
              {isMobile && <span>Cart</span>}
            </div>
            {totalItems > 0 && (
              <span className={`${
                isMobile 
                  ? 'bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1 min-w-6 text-center'
                  : 'absolute -top-2 -right-2 flex items-center justify-center min-w-4 h-4 sm:min-w-5 sm:h-5 bg-red-500 text-white text-xs font-bold rounded-full px-0.5 sm:px-1'
              }`}>
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </Link>
        </>
      )}
    </>
  );
};

// Reusable User Section Component
const UserSection: React.FC<{ 
  isMobile?: boolean; 
  onLinkClick?: () => void;
}> = ({ isMobile = false, onLinkClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
    onLinkClick?.();
  };
  
  if (!user) {
    return (
      <div className={isMobile ? "flex flex-col space-y-3" : "flex items-center space-x-3 lg:space-x-4"}>
        <Link
          to="/login"
          className={`${
            isMobile
              ? 'px-4 py-3 text-center text-blue-600 font-medium hover:text-blue-700 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors'
              : 'px-3 py-2 text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm lg:text-base'
          }`}
          onClick={onLinkClick}
        >
          Login
        </Link>
        <Link
          to="/signup"
          className={`${
            isMobile
              ? 'px-4 py-3 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors'
              : 'px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm lg:text-base'
          }`}
          onClick={onLinkClick}
        >
          Sign Up
        </Link>
      </div>
    );
  }
  
  return (
    <div className={isMobile ? "space-y-3" : "flex items-center space-x-3 lg:space-x-4"}>
      <div className={`${
        isMobile 
          ? 'flex items-center space-x-3 px-2 py-2 rounded-lg bg-gray-50'
          : 'flex items-center space-x-2 max-w-[180px] lg:max-w-[240px]'
      }`}>
        <User className={`${isMobile ? "h-5 w-5 text-gray-600" : "h-5 w-5 text-gray-600 flex-shrink-0"}`} />
        <div className={`${isMobile ? "flex-1 min-w-0" : ""}`}>
          <p className={`font-medium text-gray-700 truncate ${isMobile ? "text-sm" : "text-sm lg:text-base"}`}>
            {user.name || user.email}
          </p>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className={`${
          isMobile
            ? 'flex items-center justify-center space-x-2 w-full px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors'
            : 'flex items-center space-x-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm lg:text-base'
        }`}
        aria-label="Logout"
      >
        <LogOut className="h-4 w-4" />
        <span>Logout</span>
      </button>
    </div>
  );
};
// ============ MAIN HEADER COMPONENT ============

// Main Header Component
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Package className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            <span className="text-xl sm:text-2xl font-bold text-gray-800 truncate max-w-[120px] sm:max-w-none">
              ShopCart
            </span>
          </Link>

          {/* Desktop Navigation & User Section */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <NavigationLinks />
          </div>
          <div className="hidden md:flex">
            <UserSection />
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 text-gray-700" />
            ) : (
              <Menu className="h-5 w-5 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4 animate-slideDown">
            <div className="flex flex-col space-y-3">
              <NavigationLinks 
                isMobile 
                onLinkClick={() => setIsMenuOpen(false)} 
              />
              
              <div className="pt-4 border-t border-gray-200">
                <UserSection 
                  isMobile 
                  onLinkClick={() => setIsMenuOpen(false)} 
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;