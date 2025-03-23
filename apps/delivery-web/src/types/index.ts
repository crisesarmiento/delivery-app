// Basic types for the Smarty delivery web app

// Branch type
export interface IBranch {
  id: string;
  name: string;
  address: string;
  isOpen: boolean;
  openingHours: string;
  phoneNumber: string;
  imageUrl?: string;
}

// Product type
export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  isAvailable: boolean;
  branchId: string;
}

// Order status enum
export enum OrderStatus {
  Pending = 'pendiente',
  Processing = 'en_proceso',
  Completed = 'completado',
  Cancelled = 'cancelado',
}

// Order type
export interface IOrder {
  id: string;
  items: IOrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  userId: string;
  branchId: string;
}

// Order item type
export interface IOrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  name: string;
}

// API response type
export interface IApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
