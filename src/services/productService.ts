// src/services/productService.ts
import { config } from '@/config';
import type { Product, CreateProduct } from '@/types/product';

// Using fetch for simplicity (no axios dependency yet)
const { baseUrl } = config.api;

export const productService = {
  // Get all products
  getProducts: async (): Promise<Product[]> => {
    const response = await fetch(`${baseUrl}/products`);
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }
    return response.json();
  },

  // Get single product by ID
  getProductById: async (id: number): Promise<Product> => {
    const response = await fetch(`${baseUrl}/products/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product ${id}: ${response.status}`);
    }
    return response.json();
  },

  // Get all categories
  getCategories: async (): Promise<string[]> => {
    const response = await fetch(`${baseUrl}/products/categories`);
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`);
    }
    return response.json();
  },

  // Create a new product (for CreateProductPage)
  createProduct: async (productData: CreateProduct): Promise<Product> => {
    const response = await fetch(`${baseUrl}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error(`Failed to create product: ${response.status}`);
    }
    return response.json();
  },
};