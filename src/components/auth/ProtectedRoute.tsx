// components/auth/ProtectedRoute.tsx
import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { PageSpinner } from '@/components/common/Spinner';
import NotAuthenticatedPage from '@/pages/NotAuthenticatedPage';

interface ProtectedRouteProps {
  children: ReactNode;
  showNotAuthPage?: boolean; // NEW: Show custom page instead of redirect
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  showNotAuthPage = true, // Default to showing custom page
  redirectTo = '/login'
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <PageSpinner message="Checking authentication..." />;
  }

  if (!isAuthenticated) {
    if (showNotAuthPage) {
      // Show custom NotAuthenticated page with state
      return <NotAuthenticatedPage />;
    }
    
    // Or redirect to login (original behavior)
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;