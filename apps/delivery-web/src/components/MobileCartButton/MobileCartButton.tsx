'use client';

import { Box, Text, useMantineTheme, Flex } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { CART_TEXTS } from '../../config/constants';
import styles from './MobileCartButton.module.css';

interface MobileCartButtonProps {
  cartItemsCount: number;
  cartTotal: number;
  onClick: () => void;
}

const MobileCartButton = ({
  cartItemsCount,
  cartTotal,
  onClick,
}: MobileCartButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const theme = useMantineTheme();

  // Only show on mobile devices
  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth <= 768);

      // Log viewport dimensions to help with positioning
      if (window.innerWidth <= 768) {
        console.log('Mobile viewport dimensions:', {
          width: window.innerWidth,
          height: window.innerHeight,
          pageHeight: document.body.scrollHeight,
        });
      }
    };

    // Check on mount
    handleResize();

    // Add resize listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Don't render anything on desktop
  if (!isVisible) {
    return null;
  }

  // Determine appropriate button text based on cart state
  const buttonText =
    cartItemsCount === 0 ? CART_TEXTS.ADD_TO_CART : CART_TEXTS.CART_TITLE;

  return (
    <Box
      className={styles.mobileCartButtonContainer}
      data-testid="mobile-cart-button-container"
    >
      <Box
        className={styles.mobileCartFixed}
        onClick={onClick}
        style={{ cursor: 'pointer' }}
      >
        <Flex align="center" gap={8} style={{ width: '100%' }}>
          <IconShoppingCart
            size={18}
            color={theme.colors.action?.[4] || '#B3FF00'}
            stroke={2}
          />
          <Text
            style={{
              color: theme.colors.action?.[4] || '#B3FF00',
              fontWeight: 600,
              fontSize: theme.fontSizes.sm,
              lineHeight: '20px',
            }}
          >
            {buttonText}
          </Text>
        </Flex>

        <Text
          style={{
            color: theme.colors.action?.[4] || '#B3FF00',
            fontWeight: 600,
            fontSize: theme.fontSizes.sm,
            lineHeight: '20px',
          }}
        >
          {CART_TEXTS.SUBTOTAL}: ${cartTotal.toLocaleString()}
        </Text>
      </Box>
    </Box>
  );
};

export default MobileCartButton;
