'use client';

import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Text } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import styles from './MobileCartButton.module.css';
import { CART_TITLE } from '@/constants/text';
import { MobileCartButtonProps } from './types';

const MobileCartButton = ({ cartTotal, onClick }: MobileCartButtonProps) => {
  const [isFooterInView, setIsFooterInView] = useState(false);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterInView(entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, [isFooterInView]);

  const buttonStyle = isFooterInView
    ? {
        position: 'absolute' as const,
        bottom: '-45px',
        left: 0,
        right: 0,
        zIndex: 9999,
      }
    : {
        position: 'fixed' as const,
        bottom: '10px',
        left: 0,
        right: 0,
        zIndex: 9999,
      };

  return (
    <Box style={buttonStyle}>
      <Flex className={styles.mobileCartButton}>
        <Button unstyled className={styles.button} onClick={onClick}>
          <div style={{ width: '100%', position: 'relative', height: '100%' }}>
            <div
              style={{
                position: 'absolute',
                left: 0,
                display: 'flex',
                alignItems: 'center',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            >
              <IconShoppingCart className={styles.iconShoppingCart} />
              <Text className={styles.buttonText} style={{ marginLeft: '8px' }}>
                {CART_TITLE}
              </Text>
            </div>
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            >
              <Text className={styles.totalAmount}>
                Subtotal: ${cartTotal.toLocaleString()}
              </Text>
            </div>
          </div>
        </Button>
      </Flex>
    </Box>
  );
};

export default MobileCartButton;
