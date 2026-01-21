// hooks/useProductCRUD.ts
import { useCallback, useState } from "react";
import { productService } from "@/services/productService";
import type { CreateProduct, Product } from "@/types/product";
import { useProductContext } from "@/contexts/ProductContext";

interface UseProductCRUDReturn {
  // Create
  createProduct: (data: CreateProduct) => Promise<Product>;
  
  // Status
  isCreating: boolean;
}

export const useProductCRUD = (): UseProductCRUDReturn => {
  const { fetchAllProducts } = useProductContext();
  const [isCreating, setIsCreating] = useState(false);

  // ========== CREATE ==========

  const createProduct = useCallback(
    async (data: CreateProduct): Promise<Product> => {
      setIsCreating(true);
      try {
        const newProduct = await productService.createProduct(data);
        await fetchAllProducts(); // Refresh the global list
        return newProduct;
      } catch (error) {
        console.error("Error creating product:", error);
        throw new Error(
          `Failed to create product: ${error instanceof Error ? error.message : "Unknown error"}`,
        );
      } finally {
        setIsCreating(false);
      }
    },
    [fetchAllProducts],
  );

  return {
    // Create
    createProduct,

    // Status
    isCreating,
  };
};