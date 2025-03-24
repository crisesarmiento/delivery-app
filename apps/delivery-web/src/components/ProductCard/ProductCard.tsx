'use client';

import { useState } from 'react';
import { IProduct } from '../../types';
import { Card, Text, Badge, Image, Overlay, Flex } from '@mantine/core';
import styles from './ProductCard.module.css';
import DiscountBadge from '../DiscountBadge';

interface ProductCardProps {
  product: IProduct;
  onAddToCart?: (product: IProduct, quantity: number) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Check if product has discount (this would typically come from the product data)
  const hasDiscount =
    product.name.toLowerCase().includes('promo') || Math.random() > 0.7;

  // Calculate original price (this would typically come from the product data)
  const originalPrice = hasDiscount ? (product.price * 1.2).toFixed(2) : null;

  // Calculate discount percentage (this would typically come from the product data)
  const discountPercentage = hasDiscount ? 20 : 0;

  return (
    <Card
      className={styles.productCard}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        boxShadow: isHovered
          ? '0px 4px 8px rgba(0, 0, 0, 0.1)'
          : '0px 1px 3px rgba(0, 0, 0, 0.1)',
        backgroundColor: isHovered ? 'rgba(227, 232, 239, 1)' : 'white',
        border: isHovered
          ? '1px solid rgba(201, 205, 212, 1)'
          : 'rgba(238, 242, 246, 1)',
      }}
    >
      {!product.isAvailable && (
        <Overlay color="#000" backgroundOpacity={0.6} blur={1}>
          <Badge
            size="xl"
            color="red"
            variant="filled"
            className={styles.unavailableBadge}
          >
            No Disponible
          </Badge>
        </Overlay>
      )}

      {/* Discount badge */}
      {hasDiscount && (
        <DiscountBadge
          discountPercentage={discountPercentage}
          className={styles.discountBadge}
        />
      )}

      {/* Image container */}
      <div className={styles.imageContainer}>
        {product.imageUrl && (
          <Image
            src={product.imageUrl}
            alt={product.name}
            className={styles.image}
          />
        )}
      </div>

      {/* Content container */}
      <div className={styles.contentContainer}>
        <Text className={styles.productName} title={product.name}>
          {product.name}
        </Text>

        <Flex className={styles.priceContainer}>
          {hasDiscount && originalPrice && (
            <Text className={styles.originalPrice}>${originalPrice}</Text>
          )}
          <Text className={styles.price}>${product.price.toFixed(2)}</Text>
        </Flex>
      </div>
    </Card>
  );
}

export default ProductCard;
