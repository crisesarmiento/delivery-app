'use client';

import { Box, Button, Text } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import { IProduct } from '../../types';
import styles from './MobileCartButton.module.css';
import { CART_TITLE } from '@/constants/text';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';

interface CartItem {
  productId: string;
  quantity: number;
  product: IProduct;
}

interface MobileCartButtonProps {
  cartItems: CartItem[];
  cartTotal: number;
  onClick?: () => void;
}

const MobileCartButton = ({ onClick }: MobileCartButtonProps) => {
  const { cartTotal } = useCart();
  const pathname = usePathname();
  if (pathname === '/branches') return null;

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div className={styles.mobileCartButton}>
      <Button className={styles.button} onClick={handleClick}>
        <Box className={styles.addToCartLeft}>
          <IconShoppingCart className={styles.iconShoppingCart} />
          <Text className={styles.buttonText}>{CART_TITLE}</Text>
        </Box>
        <Box className={styles.addToCartRight}>
          <Text className={styles.totalAmount}>
            Subtotal: ${cartTotal.toLocaleString()}
          </Text>
        </Box>
      </Button>
    </div>
  );
};

export default MobileCartButton;
