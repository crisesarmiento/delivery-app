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
  const router = useRouter();

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
    return <EmptyCart isVisible={isVisible} />;
  }

  // For non-empty cart - show items and checkout option
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
        {cartItems.map((item) => (
          <CartItem key={item.productId} item={item} />
        ))}
      </Box>

      <CartFooter cartTotal={cartTotal} onCheckout={handleGoToCheckout} />
    </Box>
  );
};

export default CartDrawer;
