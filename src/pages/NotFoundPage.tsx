// pages/NotFound.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Animated/Creative 404 */}
        <div className="relative mb-12">
          <div className="text-9xl font-black text-gray-200">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-4xl font-bold text-gray-900">
              <span className="text-blue-600">4</span>
              <span className="text-purple-600">0</span>
              <span className="text-pink-600">4</span>
            </div>
          </div>
          <Compass className="absolute -top-6 -right-6 h-12 w-12 text-gray-400 animate-spin-slow" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Lost your way?
        </h2>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          Sorry, we can't find that page. You'll find loads to explore on the home page.
        </p>
        
        <Link
          to="/"
          className="inline-flex items-center justify-center w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] gap-2"
        >
          <Home className="h-5 w-5" />
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};