'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { IProduct } from '@/types';

// Define cart item interface with product customizations
export interface CartItem {
  product: IProduct;
  quantity: number;
  ingredients?: { name: string; quantity: number; price?: number }[];
  condiments?: string[];
  comments?: string;
  totalPrice?: number;
  uniqueId?: string; // Unique identifier for this specific item
  customizations?: {
    ingredients?: { name: string; quantity: number; price?: number }[];
    condiments?: string[];
    comments?: string;
  };
}

// Define cart context interface
interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  updateCartItem: (
    productId: string | number,
    updates: Partial<CartItem>,
    uniqueId?: string
  ) => void;
  removeFromCart: (productId: string | number) => void;
  getCartItemQuantity: (productId: string | number) => number;
  getCartItemsByProductId: (productId: string | number) => CartItem[];
  getTotalItems: () => number;
  getTotalPrice: () => number;
  clearCart: () => void;
  cartItems: CartItem[];
  cartTotal: number;
  currentBranchId: string | null;
  setBranchId: (branchId: string) => void;
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
  getCartItemsByProductId: () => [],
  getTotalItems: () => 0,
  getTotalPrice: () => 0,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  clearCart: () => {},
  cartItems: [],
  cartTotal: 0,
  currentBranchId: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setBranchId: () => {},
});

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);

// Provider component to wrap the application
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [currentBranchId, setCurrentBranchId] = useState<string | null>(null);

  // Load cart from localStorage on initial render
  useEffect(() => {
    // Skip during server-side rendering
    if (typeof window === 'undefined') return;

    const savedCart = localStorage.getItem('smarty-cart');
    const savedBranchId = localStorage.getItem('smarty-current-branch');

    if (savedBranchId) {
      setCurrentBranchId(savedBranchId);
    }

    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setItems(parsedCart);
        }
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    // Skip during server-side rendering
    if (typeof window === 'undefined') return;

    localStorage.setItem('smarty-cart', JSON.stringify(items));
  }, [items]);

  // Save current branch ID to localStorage whenever it changes
  useEffect(() => {
    // Skip during server-side rendering
    if (typeof window === 'undefined') return;

    if (currentBranchId) {
      localStorage.setItem('smarty-current-branch', currentBranchId);
    } else {
      localStorage.removeItem('smarty-current-branch');
    }
  }, [currentBranchId]);

  // Set current branch ID and clear cart if branch changes
  const setBranchId = useCallback(
    (branchId: string) => {
      // If branch ID changes, clear the cart
      if (currentBranchId && currentBranchId !== branchId) {
        setItems([]);
      }
      setCurrentBranchId(branchId);
    },
    [currentBranchId]
  );

  // Generate a unique identifier for cart items based on product ID and customizations
  const generateCartItemId = useCallback((item: CartItem): string => {
    const productId = String(item.product.id);

    // Sort and stringify ingredients to ensure consistent ordering
    const ingredientsStr = item.ingredients
      ? JSON.stringify(
          item.ingredients
            .filter((ing) => ing.quantity > 0) // Only include ingredients with quantity > 0
            .sort((a, b) => a.name.localeCompare(b.name))
        )
      : '';

    // Sort and stringify condiments to ensure consistent ordering
    const condimentsStr = item.condiments
      ? JSON.stringify(item.condiments.sort())
      : '';

    // Include comments in the unique ID
    const commentsStr = item.comments || '';

    // Combine all parts to create a unique identifier
    return `${productId}-${ingredientsStr}-${condimentsStr}-${commentsStr}`;
  }, []);

  // Add a new item or update existing one
  const addToCart = useCallback(
    (item: CartItem) => {
      setItems((prevItems) => {
        // Generate unique ID for the new item
        const newItemId = generateCartItemId(item);

        // Find existing item with matching ID (same product + same customizations)
        const existingItemIndex = prevItems.findIndex(
          (i) => generateCartItemId(i) === newItemId
        );

        if (existingItemIndex >= 0) {
          // Update existing item (same product with same customizations)
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + item.quantity,
            totalPrice: item.totalPrice
              ? (updatedItems[existingItemIndex].totalPrice || 0) +
                item.totalPrice
              : undefined,
          };
          return updatedItems;
        } else {
          // Add new item (new product or same product with different customizations)
          // Assign the unique ID to the new item
          const newItem = {
            ...item,
            uniqueId: newItemId,
          };
          return [...prevItems, newItem];
        }
      });
    },
    [generateCartItemId]
  );

  // Update an existing cart item
  const updateCartItem = useCallback(
    (
      productId: string | number,
      updates: Partial<CartItem>,
      uniqueId?: string
    ) => {
      setItems((prevItems) => {
        let existingItemIndex = -1;

        if (uniqueId) {
          // If uniqueId is provided, use it to find the exact item instance
          existingItemIndex = prevItems.findIndex(
            (i) => i.uniqueId === uniqueId
          );
        } else {
          // Fallback to product ID for backward compatibility
          existingItemIndex = prevItems.findIndex(
            (i) => String(i.product.id) === String(productId)
          );
        }

        if (existingItemIndex >= 0) {
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            ...updates,
          };

          // If quantity is 0, remove the item
          if (updates.quantity === 0) {
            return updatedItems.filter(
              (item) => item !== updatedItems[existingItemIndex]
            );
          }

          return updatedItems;
        }

        return prevItems;
      });
    },
    []
  );

  // Remove an item from the cart
  const removeFromCart = useCallback((productId: string | number) => {
    setItems((prevItems) =>
      prevItems.filter((item) => String(item.product.id) !== String(productId))
    );
  }, []);

  // Get quantity of a specific product
  const getCartItemQuantity = useCallback(
    (productId: string | number): number => {
      const item = items.find(
        (item) => String(item.product.id) === String(productId)
      );
      return item ? item.quantity : 0;
    },
    [items]
  );

  // Get all cart items for a specific product ID
  const getCartItemsByProductId = useCallback(
    (productId: string | number): CartItem[] => {
      return items.filter(
        (item) => String(item.product.id) === String(productId)
      );
    },
    [items]
  );

  // Get total number of items in cart
  const getTotalItems = useCallback((): number => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  // Get total price of all items in cart
  const getTotalPrice = useCallback((): number => {
    return items.reduce(
      (total, item) =>
        total + (item.totalPrice || item.product.price * item.quantity),
      0
    );
  }, [items]);

  // Clear all items from cart
  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      items,
      addToCart,
      updateCartItem,
      removeFromCart,
      getCartItemQuantity,
      getCartItemsByProductId,
      getTotalItems,
      getTotalPrice,
      clearCart,
      cartItems: items,
      cartTotal: getTotalPrice(),
      currentBranchId,
      setBranchId,
    }),
    [
      items,
      addToCart,
      updateCartItem,
      removeFromCart,
      getCartItemQuantity,
      getCartItemsByProductId,
      getTotalItems,
      getTotalPrice,
      clearCart,
      currentBranchId,
      setBranchId,
    ]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartContext;
