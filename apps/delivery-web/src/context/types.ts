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