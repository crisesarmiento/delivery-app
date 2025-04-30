import { ActionIcon } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import styles from './AddToCartButton.module.css';
import { PRODUCT_TEXTS } from '../../config/constants';
import { AddToCartButtonProps } from './types';

const AddToCartButton = ({
  product,
  onAddToCart,
  className,
}: AddToCartButtonProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.isAvailable) {
      onAddToCart(product, 1);
    }
  };

  return (
    <ActionIcon
      className={`${styles.addToCartButton} ${className || ''}`}
      onClick={handleClick}
      aria-label={PRODUCT_TEXTS.ADD_TO_CART_ARIA}
    >
      <IconShoppingCart size={20} />
    </ActionIcon>
  );
};

export default AddToCartButton;
