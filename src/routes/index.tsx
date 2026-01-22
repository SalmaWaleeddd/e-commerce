// routes/index.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import ProductDetailPage from "@/pages/ProductDetailsPage";
import { NotFound } from "@/pages/NotFoundPage";
import CartPage from "@/pages/CartPage";
import CreateProductPage from "@/pages/CreateProductPage";
import ComingSoonPage from "@/pages/ComingSoonPage";
import SignUp from "@/pages/SignupPage";
import Login from "@/pages/LoginPage";
import NotAuthenticated from "@/pages/NotAuthenticatedPage";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<HomePage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="/about" element={<ComingSoonPage />} />
      <Route path="/contact" element={<ComingSoonPage />} />
      <Route path="/privacy" element={<ComingSoonPage />} />
      
      {/* Auth Pages (Public-only) */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      
      {/* NEW: Dedicated Not Authenticated page */}
      <Route path="/not-authenticated" element={<NotAuthenticated />} />

      {/* Protected Routes - Show custom NotAuthenticated page */}
      <Route 
        path="/cart" 
        element={
          <ProtectedRoute showNotAuthPage={true}>
            <CartPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/create-product" 
        element={
          <ProtectedRoute showNotAuthPage={true}>
            <CreateProductPage />
          </ProtectedRoute>
        } 
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};