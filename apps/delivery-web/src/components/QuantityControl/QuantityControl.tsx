'use client';

import { Box, Text, Flex, Button } from '@mantine/core';
import {
  IconCircleMinus,
  IconCirclePlus,
  IconTrash,
} from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import styles from './QuantityControl.module.css';
import { ACCESSIBILITY_TEXTS } from '../../config/constants';

interface QuantityControlProps {
  initialQuantity?: number;
  minQuantity?: number;
  maxQuantity?: number;
  onChange?: (quantity: number) => void;
  onAddToCart?: () => void;
  isDisabled?: boolean;
  className?: string;
  buttonClassName?: string;
  quantityDisplayClassName?: string;
  variant?: 'default' | 'footer' | 'ingredient';
}

const QuantityControl = ({
  initialQuantity = 0,
  minQuantity = 0,
  maxQuantity = 99,
  onChange,
  onAddToCart,
  isDisabled = false,
  className = '',
  buttonClassName = '',
  quantityDisplayClassName = '',
  variant = 'default',
}: QuantityControlProps) => {
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

  // Get container class based on variant
  const getContainerClass = () => {
    const baseClass = `${styles.container} ${styles.quantityControl}`;

    switch (variant) {
      case 'footer':
        return `${baseClass} ${styles.footerVariant} ${className}`;
      case 'ingredient':
        return `${baseClass} ${styles.ingredientVariant} ${className}`;
      default:
        return `${baseClass} ${className}`;
    }
  };

  return (
    <Flex className={getContainerClass()}>
      <Button
        className={`${styles.button} ${buttonClassName}`}
        onClick={decrement}
        disabled={quantity <= minQuantity || isDisabled}
        aria-label={
          quantity <= 1
            ? ACCESSIBILITY_TEXTS.REMOVE_FROM_CART
            : ACCESSIBILITY_TEXTS.DECREASE_QUANTITY
        }
      >
        {quantity <= 1 ? (
          <IconTrash style={{ color: '#000000' }} />
        ) : (
          <IconCircleMinus style={{ color: '#000000' }} />
        )}
      </Button>

      <Box className={`${styles.quantityDisplay} ${quantityDisplayClassName}`}>
        <Text className={styles.quantityText}>{quantity}</Text>
      </Box>

      <Button
        className={`${styles.button} ${buttonClassName}`}
        onClick={increment}
        disabled={quantity >= maxQuantity || isDisabled}
        aria-label={ACCESSIBILITY_TEXTS.INCREASE_QUANTITY}
      >
        <IconCirclePlus style={{ color: '#000000' }} />
      </Button>
    </Flex>
  );
};

export default QuantityControl;
