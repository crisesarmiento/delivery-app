'use client';

import { Box } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { IProduct } from '../../types';
import { useEffect, useState } from 'react';
import { CART_TEXTS, ERROR_TEXTS } from '../../config/constants';
import EmptyCart from './EmptyCart';
import CartHeader from './CartHeader';
import CartItem from './CartItem';
import CartFooter from './CartFooter';

interface CartItem {
  productId: string;
  quantity: number;
  product: IProduct;
  uniqueId?: string;
}

interface CartDrawerProps {
  opened: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  cartTotal: number;
  onClearCart?: () => void;
  branchId?: string;
}

const CartDrawer = ({
  opened,
  onClose,
  cartItems,
  cartTotal,
  onClearCart,
  branchId,
}: CartDrawerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  // Check if viewport is mobile
  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth <= 768;
      console.log(
        'Window width:',
        window.innerWidth,
        'Mobile view:',
        isMobileView
      );
      setIsMobile(isMobileView);
    };

    // Check on mount
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Clean up
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setIsVisible(opened);
  }, [opened]);

  const handleClearCart = () => {
    // Add confirmation dialog before clearing cart
    const confirmClear = window.confirm(CART_TEXTS.CART_EMPTY_CONFIRM);

    if (confirmClear) {
      if (onClearCart) {
        onClearCart();
      } else {
        // Fallback implementation if onClearCart is not provided
        alert(ERROR_TEXTS.MISSING_CALLBACK);
      }
    }
  };

  const handleGoToCheckout = () => {
    if (branchId) {
      router.push(`/branches/${branchId}/cart`);
    } else {
      console.error('Branch ID not provided to CartDrawer');
      alert(CART_TEXTS.NO_BRANCH_SELECTED);
    }
  };

  // For empty cart - compact floating card with specified dimensions
  if (cartItems.length === 0) {
    return isMobile ? null : (
      <EmptyCart isVisible={isVisible} isMobile={isMobile} />
    );
  }

  // For non-empty cart - show items and checkout option
  // Don't render at all in mobile view
  if (isMobile) {
    return null;
  }

  return (
    <Box
      style={{
        position: 'fixed',
        top: '406px',
        right: isVisible ? '40px' : '-240px',
        width: '200px',
        maxHeight: '242px',
        background: '#FFFFFF',
        border: '1px solid #EEF2F6',
        boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
        borderRadius: '4px',
        transition: 'right 0.3s ease',
        zIndex: 1000,
        overflow: 'hidden',
        boxSizing: 'border-box',
        padding: '12px 0',
      }}
    >
      <CartHeader onClearCart={handleClearCart} />

      <Box
        style={{
          maxHeight: '200px',
          overflowY: 'auto',
          padding: '4px 16px 8px',
        }}
      >
        {cartItems.map((item, index) => {
          // Create a stable unique key for each cart item
          const itemKey =
            item.uniqueId || `cart-item-${item.productId}-${index}`;
          return <CartItem key={itemKey} item={item} />;
        })}
      </Box>

      <CartFooter cartTotal={cartTotal} onCheckout={handleGoToCheckout} />
    </Box>
  );
};

export default CartDrawer;
