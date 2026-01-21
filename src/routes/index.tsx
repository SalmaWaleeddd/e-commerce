// routes/index.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import ProductDetailPage from '@/pages/ProductDetailsPage';
import { NotFound } from '@/pages/NotFoundPage';
import CartPage from '@/pages/CartPage';


export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<HomePage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="/cart" element={<CartPage />} />
      

      
      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};