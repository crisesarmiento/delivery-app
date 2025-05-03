import { IProduct } from '@/types';

// Define cart item interface with product customizations
export interface CartItem {
  uniqueId: string; // Unique identifier for this specific item
  product: IProduct;
  quantity: number;
  ingredients?: { name: string; quantity: number; price?: number }[];
  condiments?: string[];
  comments?: string;
  totalPrice?: number;
  customizations?: {
    ingredients?: { name: string; quantity: number; price?: number }[];
    condiments?: string[];
    comments?: string;
  };
  // Discount fields (added for consistency)
  hasDiscount?: boolean;
  discountPercentage?: number;
  originalPrice?: number | null;
}
// Define cart context type

export interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  updateCartItem: (
    updatedItem: Partial<CartItem>,
    uniqueId: string
  ) => void;
  updateCartItemQuantity: (uniqueId: string, newQuantity: number) => void;
  removeFromCart: (uniqueId: string) => void;
  getCartItemQuantity: (uniqueId: string) => number;
  getCartItem: (uniqueId: string) => CartItem | null;
  getCartItemsByProductId: (productId: number) => CartItem[];
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getCartItemsByBranchId: (branchId: number) => CartItem[];
  clearCart: () => void;
  cartProductsTotal: number;
  cartTotal: number;
  currentBranchId: number | null;
  setCurrentBranchId: (branchId: number) => void;
}
