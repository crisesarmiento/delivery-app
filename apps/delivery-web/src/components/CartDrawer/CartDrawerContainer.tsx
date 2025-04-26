import { useCart } from '@/context/CartContext';
import CartDrawer from './CartDrawer';
import { FC } from 'react';
import EmptyCart from './EmptyCart';
import { CartDrawerContainerProps } from './types';

const CartDrawerContainer: FC<CartDrawerContainerProps> = ({ isMobile }) => {
  const { cartItems, clearCart } = useCart();

  if (isMobile) return null;

  // Only render one of these, and always pass clearCart to CartDrawer's onClose
  return cartItems.length > 0 ? (
    <CartDrawer clearCart={clearCart} />
  ) : (
    <EmptyCart />
  );
};

export default CartDrawerContainer;
