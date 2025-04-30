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
import { QuantityControlProps } from './types';

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
  isMobile = false,
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
      case 'productCard':
        return `${baseClass} ${styles.productCardVariant} ${className}`;
      case 'checkout':
        return `${baseClass} ${styles.checkoutVariant} ${className}`;
      default:
        return `${baseClass} ${className}`;
    }
  };

  // Calculate icon size based on variant and mobile state
  const getIconSize = () => {
    if (variant === 'footer') {
      return 24;
    } else if (variant === 'productCard') {
      return 18;
    } else if (variant === 'checkout') {
      return isMobile ? 14 : 26;
    } else {
      return 14;
    }
  };

  // Calculate trash icon size based on variant and mobile state
  const getTrashIconSize = () => {
    if (variant === 'checkout' && isMobile) {
      return 14; // Larger trash icon on mobile for checkout variant
    }
    return getIconSize();
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
          <IconTrash
            size={getTrashIconSize()}
            className={`${styles.button} ${buttonClassName}`}
            stroke={variant === 'checkout' ? 1.5 : 2}
            style={{ color: '#000000', cursor: 'pointer' }}
          />
        ) : (
          <IconCircleMinus
            size={getIconSize()}
            className={`${styles.button} ${buttonClassName}`}
            style={{ color: '#000000', cursor: 'pointer' }}
            stroke={variant === 'checkout' ? 1.5 : 2}
          />
        )}
      </Button>

      <Box className={`${styles.quantityDisplay} ${quantityDisplayClassName}`}>
        <Text
          className={styles.quantityText}
          fw={variant === 'checkout' ? 600 : undefined}
        >
          {quantity}
        </Text>
      </Box>

      <Button
        className={`${styles.button} ${buttonClassName}`}
        onClick={increment}
        disabled={quantity >= maxQuantity || isDisabled}
        aria-label={ACCESSIBILITY_TEXTS.INCREASE_QUANTITY}
      >
        <IconCirclePlus
          size={getIconSize()}
          className={`${styles.button} ${buttonClassName}`}
          stroke={variant === 'checkout' ? 1.5 : 2}
        />
      </Button>
    </Flex>
  );
};

export default QuantityControl;
