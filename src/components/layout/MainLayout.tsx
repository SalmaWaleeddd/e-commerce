// components/layout/MainLayout.tsx
import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { ErrorBoundary } from './ErrorBoundary'; // We'll create this

interface MainLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  containerClassName?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children,
  showHeader = true,
  showFooter = true,
  containerClassName = ''
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {showHeader && <Header />}
      
      <main className={`flex-grow container mx-auto px-4 py-8 ${containerClassName}`}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>
      
      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;