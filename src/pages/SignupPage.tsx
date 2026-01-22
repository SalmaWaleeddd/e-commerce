// pages/SignUp.tsx
import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import SignupForm from '../components/auth/SignupForm';
import { PageSpinner } from '@/components/common/Spinner';

const SignUp: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial loading (e.g., checking auth state, fetching config)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Short delay for smooth UX

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <MainLayout
        showHeader={true}
        showFooter={false}
        containerClassName="flex items-center justify-center"
      >
        <PageSpinner message="Loading sign up form..." />
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
          <h1 className="text-3xl font-bold text-gray-900">Join Us Today</h1>
          <p className="text-gray-600 mt-2">
            Create your account to start shopping
          </p>
        </div>
        
        <SignupForm />
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default SignUp;