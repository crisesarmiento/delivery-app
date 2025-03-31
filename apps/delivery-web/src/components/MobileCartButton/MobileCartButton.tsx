'use client';

import { Button, Text, Box } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconShoppingCart } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { IProduct } from '../../types';
import styles from './MobileCartButton.module.css';
import { CART_VIEW_BUTTON } from '@/constants/text';

interface CartItem {
  productId: string;
  quantity: number;
  product: IProduct;
}

interface MobileCartButtonProps {
  cartItems: CartItem[];
  cartTotal: number;
}

const MobileCartButton = ({ cartItems, cartTotal }: MobileCartButtonProps) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on mobile and when there are items in the cart
    const shouldBeVisible = !!isMobile && cartItems.length > 0;
    setIsVisible(shouldBeVisible);

    console.log('MobileCartButton', {
      isMobile,
      cartItemsCount: cartItems.length,
      shouldBeVisible,
    });
  }, [isMobile, cartItems]);

  if (!isVisible) return null;

  return (
    <Box className={styles.mobileCartButton}>
      <Link href="/checkout" style={{ textDecoration: 'none' }}>
        <Button fullWidth className={styles.button}>
          <Box className={styles.buttonContent}>
            <IconShoppingCart size={20} color="#B3FF00" stroke={2} />
            <Text className={styles.buttonText}>{CART_VIEW_BUTTON}</Text>
          </Box>
          <Text className={styles.totalAmount}>
            ${cartTotal.toLocaleString()}
          </Text>
        </Button>
      </Link>
    </Box>
  );
};

export default MobileCartButton;
