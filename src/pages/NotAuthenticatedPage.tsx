// pages/NotAuthenticated.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { EmptyState } from '@/components/common/EmptyState';
import { Lock } from 'lucide-react';

const NotAuthenticated: React.FC = () => {
  const location = useLocation();
  const fromPath = location.state?.from?.pathname || '/products';

  return (
    <MainLayout
      showHeader={true}
      showFooter={false}
      containerClassName="flex items-center justify-center"
    >
      <div className="w-full max-w-lg">
        <EmptyState
          icon={<Lock className="h-16 w-16" />}
          title="Authentication Required"
          description={
            <div className="space-y-2">
              <p>You need to be logged in to access this page.</p>
              <p className="text-sm">
                Please sign in to continue to{' '}
                <span className="font-medium text-blue-600">
                  {fromPath === '/' ? 'home' : fromPath.replace('/', '')}
                </span>
              </p>
            </div>
          }
          primaryAction={{
            label: 'Sign In',
            onClick: () => window.location.href = `/login?redirect=${encodeURIComponent(fromPath)}`,
            icon: <Lock className="h-4 w-4" />
          }}
          secondaryAction={{
            label: 'Create Account',
            onClick: () => window.location.href = `/signup?redirect=${encodeURIComponent(fromPath)}`,
          }}
          fullHeight
          bordered
        />
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Or return to{' '}
            <Link to="/products" className="text-blue-600 hover:text-blue-800 font-medium">
              products page
            </Link>
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotAuthenticated;