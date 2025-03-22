// Basic types for the Smarty delivery web app

// Branch type
export interface Branch {
  id: string;
  name: string;
  address: string;
  isOpen: boolean;
  openingHours: string;
  phoneNumber: string;
  imageUrl?: string;
}

// Product type
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  isAvailable: boolean;
  branchId: string;
}

// Order type
export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
  userId: string;
  branchId: string;
}

// Order item type
export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  name: string;
}

// API response type
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}