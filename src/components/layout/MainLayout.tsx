// components/layout/MainLayout.tsx
import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { ErrorBoundary } from './ErrorBoundary';

interface MainLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  containerClassName?: string;
  fullWidth?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children,
  showHeader = true,
  showFooter = true,
  containerClassName = '',
  fullWidth = false
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {showHeader && <Header />}
      
      <main className={`flex-grow ${fullWidth ? 'w-full' : 'container mx-auto'} px-3 sm:px-4 py-4 md:py-6 lg:py-8 ${containerClassName}`}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>
      
      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;