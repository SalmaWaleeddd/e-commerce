// pages/CreateProductPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductCRUD } from "@/hooks/useProductCRUD";
import { useProductContext } from "@/contexts/ProductContext";
import { CreateProductForm } from "@/components/product";
import { ErrorMessage, EmptyState, PageSpinner } from "@/components/common";
import { toast } from "sonner";
import type { CreateProduct } from "@/types/product";
import { formDataToCreateProduct } from "@/utils/createProduct.validators";
import MainLayout from "@/components/layout/MainLayout";
import { ArrowLeft } from "lucide-react";

const CreateProductPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    categories,
    isLoading: isLoadingCategories,
    error: categoriesError,
    refetchAllData,
  } = useProductContext();
  const { createProduct, isCreating } = useProductCRUD();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const FORM_TIPS = [
    "Use high-quality images for better appeal",
    "Be descriptive but concise in your title",
    "Include all key features in the description",
    "Price competitively within your category",
  ];

  useEffect(() => {
    // Scroll to top whenever page loads
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);
  const handleSubmit = async (data: CreateProduct) => {
    setSubmitError(null);
    const productData = formDataToCreateProduct(data);

    // Show loading toast
    const loadingToast = toast.loading("Creating product...");

    try {
      const newProduct = await createProduct(productData);
      toast.dismiss(loadingToast);
      toast.success("Product created successfully!", {
        description: `${newProduct.title} has been added to your catalog.`,
        action: {
          label: "View",
          onClick: () => navigate(`/products/${newProduct.id}`),
        },
        duration: 5000,
      });

      // Auto-navigate after delay
      setTimeout(() => {
        navigate("/products");
      }, 2000);
    } catch (err) {
      // Dismiss loading toast and show error
      toast.dismiss(loadingToast);

      const errorMessage =
        err instanceof Error ? err.message : "Failed to create product";
      setSubmitError(errorMessage);

      toast.error("Failed to create product", {
        description: errorMessage,
        duration: 5000,
      });
    }
  };

  const handleBack = () => {
    navigate("/products");
  };

  const backButton = (
    <button
      onClick={handleBack}
      className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors duration-200 group"
    >
      <ArrowLeft className="w-5 h-5 mr-2 transition-transform duration-200 group-hover:-translate-x-1" />
      Back to Products
    </button>
  );

  const handleRetry = async () => {
    // Show loading toast for retry
    const loadingToast = toast.loading("Loading categories...");

    try {
      await refetchAllData();
      toast.dismiss(loadingToast);
      toast.success("Categories loaded successfully");
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("Failed to load categories");
    }
  };

  // Loading state for categories
  if (isLoadingCategories) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <PageSpinner message="Loading form..." />
        </div>
      </div>
    );
  }

  // Error state for categories
  if (categoriesError) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-8">{backButton}</div>

          <ErrorMessage
            message={categoriesError}
            type="error"
            title="Failed to load categories"
            showRetry
            onRetry={handleRetry}
            fullWidth
          />

          {/* Help Text */}
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Tip:</strong> If categories fail to load, you can still
              create products by manually entering a category name.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          {backButton}
          <h1 className="text-3xl font-bold text-gray-900">
            Create New Product
          </h1>
          <p className="text-gray-600 mt-2">
            Add a new product to your catalog
          </p>
        </div>

        {/* Submit Error Message */}
        {submitError && (
          <div className="mb-6">
            <ErrorMessage
              message={submitError}
              type="error"
              title="Creation failed"
              showClose
              onClose={() => setSubmitError(null)}
              fullWidth
            />
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <CreateProductForm
            categories={categories}
            onSubmit={handleSubmit}
            isLoading={isCreating}
          />
        </div>

        {/* Help Section */}
        <div className="mt-6 sm:mt-8">
          <EmptyState
            type="default"
            title="Creating your first product?"
            description={
              <div className="text-left space-y-2 sm:space-y-3">
                <div>
                  <p className="font-medium text-gray-800 mb-1 text-sm md:text-base">
                    Quick tips:
                  </p>
                  <ul className="text-gray-600 space-y-1 pl-4 list-disc">
                    {FORM_TIPS.map((tip, index) => (
                      <li key={index} className="text-xs md:text-sm">
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-xs md:text-sm text-gray-500">
                    <span className="text-red-500">*</span> Required fields
                  </p>
                </div>
              </div>
            }
            bordered
            compact
            className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200"
          />
        </div>
      </div>

      {/* Global loading indicator for submission */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <PageSpinner message="Creating product..." />
        </div>
      )}
    </MainLayout>
  );
};

export default CreateProductPage;
