import { Box, Text, Image, Button } from '@mantine/core';
import { useState } from 'react';
import styles from './ProductCard.module.css';
import { IProduct } from '../../types';
import { PRODUCT_TEXTS } from '../../config/constants';

interface ProductCardProps {
  product: IProduct;
  onAddToCart: (product: IProduct, quantity: number) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product, 1);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Box className={styles.productCard}>
      <Box className={styles.productImageContainer}>
        <Image
          src={imageError ? '/images/placeholder-food.jpg' : product.imageUrl}
          alt={product.name}
          className={styles.productImage}
          onError={handleImageError}
        />
      </Box>
      <Box className={styles.productDetails}>
        <Text className={styles.productName}>{product.name}</Text>
        <Text className={styles.productDescription}>{product.description}</Text>
        <Box className={styles.priceAndButtonContainer}>
          <Text className={styles.productPrice}>
            ${product.price.toLocaleString()}
          </Text>
          <Button
            className={styles.addButton}
            onClick={handleAddToCart}
            title={PRODUCT_TEXTS.ADD_TO_CART}
          >
            +
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;
