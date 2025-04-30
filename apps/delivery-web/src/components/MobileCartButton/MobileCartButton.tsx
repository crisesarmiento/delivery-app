'use client';

import { Button, Flex, Text } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';

import styles from './MobileCartButton.module.css';
import { CART_TITLE } from '@/constants/text';
import { MobileCartButtonProps } from './types';

const MobileCartButton = ({ cartTotal, onClick }: MobileCartButtonProps) => {
  return (
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
  );
};

export default MobileCartButton;
