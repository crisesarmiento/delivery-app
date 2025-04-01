'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { IProduct } from '../types';

// Define cart item interface with product customizations
export interface CartItem {
  product: IProduct;
  quantity: number;
  ingredients?: { name: string; quantity: number; price?: number }[];
  condiments?: string[];
  comments?: string;
}

// Define cart context interface
interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  updateCartItem: (
    productId: string | number,
    updates: Partial<CartItem>
  ) => void;
  removeFromCart: (productId: string | number) => void;
  getCartItemQuantity: (productId: string | number) => number;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  clearCart: () => void;
  cartItems: CartItem[];
  cartTotal: number;
}

// Create the context with a default empty value
const CartContext = createContext<CartContextType>({
  items: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addToCart: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateCartItem: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeFromCart: () => {},
  getCartItemQuantity: () => 0,
  getTotalItems: () => 0,
  getTotalPrice: () => 0,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  clearCart: () => {},
  cartItems: [],
  cartTotal: 0,
});

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);

// Provider component to wrap the application
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Add a new item or update existing one
  const addToCart = (item: CartItem) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (i) => i.product.id === item.product.id
      );

      if (existingItemIndex >= 0) {
        // Update existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          ...item,
        };
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, item];
      }
    });
  };

  // Update an existing cart item
  const updateCartItem = (
    productId: string | number,
    updates: Partial<CartItem>
  ) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (i) => String(i.product.id) === String(productId)
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          ...updates,
        };

        // If quantity is 0, remove the item
        if (updates.quantity === 0) {
          return updatedItems.filter(
            (item) => String(item.product.id) !== String(productId)
          );
        }

        return updatedItems;
      }

      return prevItems;
    });
  };

  // Remove an item from the cart
  const removeFromCart = (productId: string | number) => {
    setItems((prevItems) =>
      prevItems.filter((item) => String(item.product.id) !== String(productId))
    );
  };

  // Get quantity of a specific product
  const getCartItemQuantity = (productId: string | number): number => {
    const item = items.find(
      (item) => String(item.product.id) === String(productId)
    );
    return item ? item.quantity : 0;
  };

  // Get total number of items in cart
  const getTotalItems = (): number => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  // Get total price of all items in cart
  const getTotalPrice = (): number => {
    return items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  // Clear all items from cart
  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateCartItem,
        removeFromCart,
        getCartItemQuantity,
        getTotalItems,
        getTotalPrice,
        clearCart,
        cartItems: items,
        cartTotal: getTotalPrice(),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
