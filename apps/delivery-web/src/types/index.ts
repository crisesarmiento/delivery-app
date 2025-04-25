// Basic types for the Smarty delivery web app

// Branch opening hours type
export interface IOpeningHours {
  mondayToThursday: {
    open: string; // Format: "HH:MM" in 24h format
    close: string; // Format: "HH:MM" in 24h format
  };
  fridayToSunday: {
    firstShift: {
      open: string;
      close: string;
    };
    secondShift: {
      open: string;
      close: string;
    };
  };
}

// Branch type
export interface IBranch {
  id: number;
  name: string;
  description: string;
  address: string;
  phoneNumber?: string;
  openingHours?: string; // Legacy field for display purposes
  openingHoursStructured?: IOpeningHours; // Structured opening hours for logic
  isOpen?: boolean; // Will be calculated based on current time and openingHoursStructured
  imageUrl?: string;
}

// Product type
export interface IProduct {
  id: number;
  branchId: number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  isAvailable: boolean;
  ingredients?: string;
  category?: string;
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
