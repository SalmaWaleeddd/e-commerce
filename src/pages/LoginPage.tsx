// pages/Login.tsx
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import LoginForm from '@/components/auth/LoginForm';
import { PageSpinner } from '@/components/common/Spinner';

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <MainLayout
        showHeader={true}
        showFooter={false}
        containerClassName="flex items-center justify-center"
      >
        <PageSpinner message="Loading login..." />
      </MainLayout>
    );
  }

  return (
    <MainLayout
      showHeader={true}
      showFooter={false}
      containerClassName="flex items-center justify-center"
    >
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-2">
            Sign in to your account to continue shopping
          </p>
        </div>
        
        <LoginForm />
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            By logging in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;