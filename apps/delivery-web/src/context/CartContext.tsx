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
import { CartItem } from '@/context/types';
import { CartContextType } from '@/context/types';

// Create the context with a default empty value
const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  updateCartItem: () => {},
  removeFromCart: () => {},
  getCartItemQuantity: () => 0,
  getCartItemsByProductId: () => [],
  getTotalItems: () => 0,
  getTotalPrice: () => 0,
  clearCart: () => {},
  cartItems: [],
  cartProductsTotal: 0,
  cartTotal: 0,
  currentBranchId: null,
  setCurrentBranchId: () => {},
});

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);

// Provider component to wrap the application
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [currentBranchId, setCurrentBranchId] = useState<number | null>(null);

  // Load cart from localStorage on initial render
  useEffect(() => {
    // Skip during server-side rendering
    if (typeof window === 'undefined') return;

    const savedCart = localStorage.getItem('smarty-cart');
    const savedBranchId = Number(localStorage.getItem('smarty-current-branch'));

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
      localStorage.setItem('smarty-current-branch', String(currentBranchId));
    } else {
      localStorage.removeItem('smarty-current-branch');
    }
  }, [currentBranchId]);

  // Remove an item from the cart
  const removeFromCart = useCallback((productId: number) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
  }, []);

  // Add item to cart, annotating with discount info
  const addToCart = useCallback((item: CartItem) => {
    const discountPercent = item.discountPercentage || 0;
    const hasDiscount = discountPercent > 0;
    const originalPrice = item.originalPrice;
    setItems((prevItems) => [
      ...prevItems,
      {
        ...item,
        hasDiscount,
        discountPercent,
        originalPrice,
      },
    ]);
  }, []);

  // Update cart item, ensuring discount info is updated as well
  const updateCartItem = useCallback(
    (productId: number, updates: Partial<CartItem>, uniqueId?: string) => {
      setItems((prevItems) => {
        return prevItems
          .map((item) => {
            const isMatch = uniqueId
              ? item.uniqueId === uniqueId
              : item.product.id === productId;
            if (!isMatch) return item;
            const updatedItem = { ...item, ...updates };
            // If the updated quantity is 0 or less, we'll remove this item in the filter below
            const discountPercent = updatedItem.discountPercentage || 0;
            const hasDiscount = discountPercent > 0;
            const originalPrice = updatedItem.originalPrice;
            return {
              ...updatedItem,
              hasDiscount,
              discountPercent,
              originalPrice,
            };
          })
          .filter((item) => item.quantity > 0); // Remove items with quantity 0 or less
      });
    },
    []
  );

  // Get quantity of a specific product
  const getCartItemQuantity = useCallback(
    (productId: number): number => {
      const item = items.find((item) => item.product.id === productId);
      return item ? item.quantity : 0;
    },
    [items]
  );

  // Get all cart items for a specific product ID
  const getCartItemsByProductId = useCallback(
    (productId: number): CartItem[] => {
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

  const getProductsTotal = useCallback((): number => {
    return items.reduce(
      (total, item) => total + item.product.price * item.quantity,
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
      cartProductsTotal: getProductsTotal(),
      cartTotal: getTotalPrice(),
      currentBranchId,
      setCurrentBranchId,
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
      getProductsTotal,
      currentBranchId,
      setCurrentBranchId,
    ]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartContext;
