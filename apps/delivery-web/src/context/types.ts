import { IProduct } from '@/types';

// Define cart item interface with product customizations
export interface CartItem {
  uniqueId?: string; // Unique identifier for this specific item
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
}   

export interface CartItemCustomization {
  product: IProduct;
  quantity: number;
  uniqueId?: string;
  ingredients?: Array<{ name: string; quantity: number; price?: number }>;
  condiments?: string[];
  comments?: string;
  totalPrice?: number;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  updateCartItem: (
    productId: number,
    updates: Partial<CartItem>,
    uniqueId?: string
  ) => void;
  removeFromCart: (productId: number) => void;
  getCartItemQuantity: (productId: number) => number;
  getCartItemsByProductId: (productId: number) => CartItem[];
  getTotalItems: () => number;
  getTotalPrice: () => number;
  clearCart: () => void;
  cartItems: CartItem[];
  cartTotal: number;
  currentBranchId: number | null;
  setBranchId: (branchId: number) => void;
}