// components/product/CreateProductForm.tsx
import React, { useEffect, useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage, Spinner } from "@/components/common";
import { AlertCircle, CheckCircle } from "lucide-react";
import type { CreateProduct } from "@/types/product";
import {
  createProductSchema,
  type CreateProductFormData,
  isValidImageUrl,
} from "@/utils/createProduct.validators";

interface CreateProductFormProps {
  categories: string[];
  onSubmit: (data: CreateProductFormData) => Promise<void>;
  isLoading: boolean;
  initialData?: Partial<CreateProduct>;
}

export const CreateProductForm: React.FC<CreateProductFormProps> = ({
  categories,
  onSubmit,
  isLoading,
  initialData,
}) => {
  const [isImageValid, setIsImageValid] = useState<boolean | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    watch,
    reset,
  } = useForm<CreateProductFormData>({
    resolver: zodResolver(
      createProductSchema,
    ) as Resolver<CreateProductFormData>,
    mode: "onChange",
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      price: initialData?.price || 0,
      category: initialData?.category || categories[0] || "",
      image: initialData?.image || "",
    },
  });

  const title = watch("title");
  const description = watch("description");
  const price = watch("price");
  const category = watch("category");
  const imageUrl = watch("image");

  useEffect(() => {
    if (imageUrl) {
      setIsImageValid(isValidImageUrl(imageUrl));
    } else {
      setIsImageValid(null);
    }
  }, [imageUrl]);

  const onSubmitForm = handleSubmit(async (data: any) => {
    await onSubmit(data as CreateProductFormData);
    reset();
    setIsImageValid(null);
  });
  const getCompletionPercentage = () => {
    const fields = ["title", "description", "price", "category", "image"];
    const completedFields = fields.filter((field) => {
      const value = watch(field as keyof CreateProductFormData);
      return value && !errors[field as keyof CreateProductFormData];
    }).length;
    return Math.round((completedFields / fields.length) * 100);
  };

  const completionPercentage = getCompletionPercentage();

  const getFieldClass = (fieldName: keyof CreateProductFormData) => {
    const hasError = !!errors[fieldName];
    const isTouched = touchedFields[fieldName];
    const value = watch(fieldName);
    const isValidField = !hasError && value && isTouched;

    return `
      w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
      transition duration-200 ease-in-out
      ${
        hasError
          ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500"
          : isValidField
            ? "border-green-300 bg-green-50 focus:border-green-500 focus:ring-green-500"
            : "border-gray-300 hover:border-gray-400 focus:border-blue-500"
      }
      ${isLoading ? "opacity-60 cursor-not-allowed" : ""}
    `;
  };

  return (
    <form onSubmit={onSubmitForm} className="space-y-6">
      {/* Progress Indicator */}
      <div className="mb-2">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">
            Form completion: {completionPercentage}%
          </span>
          {isValid && (
            <span className="text-sm font-medium text-green-600 flex items-center">
              <CheckCircle className="h-4 w-4 mr-1" />
              Ready to submit
            </span>
          )}
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              completionPercentage === 100 ? "bg-green-500" : "bg-blue-500"
            }`}
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className={getFieldClass("title")}
          placeholder="Enter product title"
          disabled={isLoading}
          maxLength={100}
          {...register("title")}
        />
        <div className="flex justify-between items-center mt-1">
          {errors.title ? (
            <ErrorMessage
              message={errors.title.message as string}
              type="error"
              className="text-sm"
            />
          ) : (
            <div className="text-xs text-gray-500">
              {title?.length || 0}/100 characters
              {!errors.title && title && touchedFields.title && (
                <span className="ml-2 text-green-600">✓</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          className={getFieldClass("description")}
          rows={4}
          placeholder="Describe your product in detail..."
          disabled={isLoading}
          maxLength={1000}
          {...register("description")}
        />
        <div className="flex justify-between items-center mt-1">
          {errors.description ? (
            <ErrorMessage
              message={errors.description.message as string}
              type="error"
              className="text-sm"
            />
          ) : (
            <div className="text-xs text-gray-500">
              {description?.length || 0}/1000 characters
              {!errors.description &&
                description &&
                touchedFields.description && (
                  <span className="ml-2 text-green-600">✓</span>
                )}
            </div>
          )}
        </div>
      </div>

      {/* Price & Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price (USD) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              $
            </span>
            <input
              type="number"
              className={`${getFieldClass("price")} pl-8`}
              placeholder="0.00"
              min="0.01"
              max="1000000"
              step="0.01"
              disabled={isLoading}
              {...register("price", { valueAsNumber: true })}
            />
          </div>
          {errors.price && (
            <ErrorMessage
              message={errors.price.message as string}
              type="error"
              className="mt-1 text-sm"
            />
          )}
          {!errors.price && price && touchedFields.price && (
            <div className="text-xs text-green-600 mt-1 flex items-center">
              <CheckCircle className="h-3 w-3 mr-1" />
              Valid price
            </div>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            className={getFieldClass("category")}
            disabled={isLoading || categories.length === 0}
            {...register("category")}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <ErrorMessage
              message={errors.category.message as string}
              type="error"
              className="mt-1 text-sm"
            />
          )}
          {!errors.category && category && touchedFields.category && (
            <div className="text-xs text-green-600 mt-1 flex items-center">
              <CheckCircle className="h-3 w-3 mr-1" />
              Category selected
            </div>
          )}
        </div>
      </div>

      {/* Image URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image URL <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="url"
            className={`${getFieldClass("image")} pr-10`}
            placeholder="https://example.com/image.jpg"
            disabled={isLoading}
            {...register("image")}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {isImageValid === true && (
              <CheckCircle className="h-5 w-5 text-green-500" />
            )}
            {isImageValid === false && (
              <AlertCircle className="h-5 w-5 text-red-500" />
            )}
          </div>
        </div>

        <div className="mt-1 space-y-2">
          {errors.image && (
            <ErrorMessage
              message={errors.image.message as string}
              type="error"
              className="text-sm"
            />
          )}

          {!errors.image && imageUrl && touchedFields.image && isImageValid && (
            <div className="text-sm text-green-600 flex items-center">
              <CheckCircle className="h-4 w-4 mr-1" />
              Valid image URL
            </div>
          )}

          {/* Image Preview */}
          {imageUrl && isImageValid !== false && (
            <div className="mt-3">
              <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
              <div className="w-40 h-40 border rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                {isImageValid === true ? (
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={() => setIsImageValid(false)}
                  />
                ) : (
                  <div className="text-gray-400 text-sm">
                    Preview will appear here
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isLoading || !isValid}
          className={`
            w-full py-3 px-4 rounded-lg font-medium text-white 
            transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2
            ${
              isLoading
                ? "bg-blue-400 cursor-not-allowed flex items-center justify-center"
                : !isValid
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 hover:shadow-md transform hover:-translate-y-0.5"
            }
          `}
        >
          {isLoading ? (
            <>
              <Spinner size="sm" variant="light" className="mr-2" />
              Creating Product...
            </>
          ) : !isValid ? (
            "Please fill all required fields"
          ) : (
            "Create Product"
          )}
        </button>

        {!isValid && completionPercentage > 0 && completionPercentage < 100 && (
          <p className="text-sm text-gray-500 mt-2 text-center">
            Complete all fields ({completionPercentage}% done) to enable
            submission
          </p>
        )}
      </div>
    </form>
  );
};

export default CreateProductForm;
