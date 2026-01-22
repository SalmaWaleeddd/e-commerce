// utils/validators.ts
import { z } from 'zod';

// Create Product Form Schema
export const createProductSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must not exceed 100 characters'),
  
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must not exceed 1000 characters'),
  
  price: z.coerce
    .number()
    .positive('Price must be greater than 0')
    .max(1000000, 'Price must be less than $1,000,000'),
  
  category: z.string().min(1, 'Category is required'),
  
  image: z.string()
    .url('Please enter a valid URL')
    .regex(
      /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))(?:\?.*)?$/i,
      'Please enter a valid image URL (png, jpg, jpeg, gif, webp, svg)'
    )
});

// Type for form data
export type CreateProductFormData = z.infer<typeof createProductSchema>;

// Helper to validate image URL format (for real-time preview)
export const isValidImageUrl = (url: string): boolean => {
  if (!url.trim()) return false;
  const pattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))(?:\?.*)?$/i;
  return pattern.test(url);
};

// Convert form data to CreateProduct type
export const formDataToCreateProduct = (data: CreateProductFormData) => ({
  title: data.title.trim(),
  description: data.description.trim(),
  price: data.price,
  category: data.category.trim(),
  image: data.image.trim()
});