import { useCart } from '@/context/CartContext';
import CartDrawer from './CartDrawer';
import { FC } from 'react';
import EmptyCart from './EmptyCart';
import { CartDrawerContainerProps } from './types';
import { Box } from '@mantine/core';
import useIsMobile from '@/hooks/useIsMobile';

const CartDrawerContainer: FC<CartDrawerContainerProps> = ({
  isHeaderCollapsed,
  isClosed,
}) => {
  const { cartItems, clearCart } = useCart();
  const isMobile = useIsMobile();
  if (isMobile) return null;

  // Only render one of these, and always pass clearCart to CartDrawer's onClose
  return (
    <Box
      style={{
        position: 'fixed',
        right: '0',
        top: isHeaderCollapsed ? (isClosed ? '35px' : '0') : '0',
      }}
    >
      {cartItems.length > 0 ? (
        <CartDrawer clearCart={clearCart} />
      ) : (
        <EmptyCart />
      )}
    </Box>
  );
};

export default CartDrawerContainer;
