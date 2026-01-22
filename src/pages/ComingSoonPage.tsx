// pages/ComingSoonPage.tsx
import React, { useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Construction, Sparkles } from "lucide-react";

const ComingSoonPage: React.FC = () => {
  useEffect(() => {
    // Scroll to top whenever page loads
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);
  return (
    <MainLayout showHeader={true} showFooter={true}>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon Section */}
          <div className="relative mb-10">
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-blue-100 rounded-full opacity-50"></div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-purple-100 rounded-full opacity-50"></div>

            <div className="relative inline-flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg mb-8">
              <div className="relative">
                <Construction className="h-16 w-16 text-blue-600" />
                <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-yellow-500" />
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Page Under{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Construction
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We're crafting something special for you. This page will be
              available soon with exciting new features.
            </p>
          </div>

          {/* Divider */}
          <div className="max-w-md mx-auto mb-12">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              Return Home
            </a>
          </div>

          {/* Bottom Note */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              Check back soon for updates. We're working hard to deliver an
              amazing experience.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ComingSoonPage;
