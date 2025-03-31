'use client';

import { useState } from 'react';
import CartDrawer from '@/components/CartDrawer/CartDrawer';
import MobileCartButton from '@/components/MobileCartButton';
import { useCart } from '@/context/CartContext';

export const CartContent = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items, getTotalPrice } = useCart();

  const closeCart = () => {
    setIsCartOpen(false);
  };

  // Transform cart items to format expected by CartDrawer
  const cartItems = items.map((item) => ({
    productId: String(item.product.id),
    quantity: item.quantity,
    product: item.product,
  }));

  return (
    <>
      <CartDrawer
        opened={isCartOpen}
        onClose={closeCart}
        cartItems={cartItems}
        cartTotal={getTotalPrice()}
      />
      <MobileCartButton cartItems={cartItems} cartTotal={getTotalPrice()} />
    </>
  );
};
