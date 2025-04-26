import { productCategories } from '@/types/enums';
import { IProductWithCustomization } from '@/types';
import products from '../mocks/products.mock';

// Helper function to get products by category
export const getProductsByCategory = (
  category: productCategories
): IProductWithCustomization[] => {
  return products.filter((product) => product.category === category);
};

// Helper function to get a product by ID
export const getProductById = (
  id: string | number
): IProductWithCustomization | undefined => {
  // Convert ID to string for comparison
  const stringId = String(id);

  // Find the product
  const product = products.find((product) => String(product.id) === stringId);

  if (!product) {
    console.warn(`Product with ID ${stringId} not found`);
  }

  return product;
};

