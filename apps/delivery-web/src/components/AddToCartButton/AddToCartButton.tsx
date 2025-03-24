import { ActionIcon } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import { IProduct } from '../../types';
import styles from './AddToCartButton.module.css';

interface AddToCartButtonProps {
  product: IProduct;
  onAddToCart: (product: IProduct, quantity: number) => void;
  className?: string;
}

export function AddToCartButton({
  product,
  onAddToCart,
  className,
}: AddToCartButtonProps) {
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
      aria-label="Add to cart"
    >
      <IconShoppingCart size={20} />
    </ActionIcon>
  );
}

export default AddToCartButton;
