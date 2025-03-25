'use client';

import { Box, Text, Flex, Button } from '@mantine/core';
import {
  IconCircleMinus,
  IconCirclePlus,
  IconTrash,
} from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import styles from './QuantityControl.module.css';

interface QuantityControlProps {
  initialQuantity?: number;
  minQuantity?: number;
  maxQuantity?: number;
  onChange?: (quantity: number) => void;
  onAddToCart?: () => void;
}

export function QuantityControl({
  initialQuantity = 0,
  minQuantity = 1,
  maxQuantity = 99,
  onChange,
  onAddToCart,
}: QuantityControlProps) {
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const increment = () => {
    if (quantity < maxQuantity) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      if (onChange) onChange(newQuantity);
      if (onAddToCart) onAddToCart();
    }
  };

  const decrement = () => {
    if (quantity > minQuantity) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      if (onChange) onChange(newQuantity);
    }
  };

  return (
    <Flex className={`${styles.container} ${styles.quantityControl}`}>
      <Button
        className={`${styles.button}`}
        onClick={decrement}
        disabled={quantity <= minQuantity}
        aria-label={quantity <= 1 ? 'Remove from cart' : 'Decrease quantity'}
      >
        {quantity <= 1 ? (
          <IconTrash style={{ color: '#000000' }} />
        ) : (
          <IconCircleMinus style={{ color: '#000000' }} />
        )}
      </Button>

      <Box className={styles.quantityDisplay}>
        <Text className={styles.quantityText}>{quantity}</Text>
      </Box>

      <Button
        className={`${styles.button}`}
        style={{ background: '#b3ff00', border: 'none' }}
        onClick={increment}
        disabled={quantity >= maxQuantity}
        aria-label="Increase quantity"
      >
        <IconCirclePlus style={{ color: '#000000' }} />
      </Button>
    </Flex>
  );
}

export default QuantityControl;
