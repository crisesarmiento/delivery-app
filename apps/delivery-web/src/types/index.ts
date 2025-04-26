import {OrderStatus } from './enums';

// Define types for product customizations
export interface IIngredientOption {
  id: number;
  name: string;
  price?: number;
  default: boolean;
}

export interface ICondimentOption {
  [key: string]: {
    name: string;
    default: boolean;
  };
}


// Common condiment options
export const condiments: ICondimentOption = {
  Mayonesa: {
    name: 'Mayonesa',
    default: true,
  },
  Ketchup: {
    name: 'Ketchup',
    default: false,
  },
  Mostaza: {
    name: 'Mostaza',
    default: false,
  },
  BBQ: {
    name: 'BBQ',
    default: false,
  },
  Chimichurri: {
    name: 'Chimichurri',
    default: false,
  },
  'Salsa picante': {
    name: 'Salsa picante',
    default: false,
  },
};

// Extended product type with customization options
export interface IProductWithCustomization extends IProduct {
  customization: IProductCustomization;
}

export interface IProductCustomization {
  ingredientOptions: IIngredientOption[];
  condimentOptions: ICondimentOption;
  maxIngredientSelections?: number;
  maxCondimentSelections?: number;
}

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
