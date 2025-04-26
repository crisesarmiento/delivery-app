'use client';

import { Box } from '@mantine/core';
import { IProduct } from '../../types';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductGrid.module.css';
import { useRef } from 'react';

interface ProductGridProps {
  products: IProduct[];
  className?: string;
  isDisabled?: boolean;
  onProductClick?: (product: IProduct) => void;
}

const ProductGrid = ({
  products,
  className = '',
  isDisabled = false,
  onProductClick,
}: ProductGridProps) => {
  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <Box
      className={`${styles.productsGrid} ${className}`}
      ref={gridRef}
      data-testid="product-grid"
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isDisabled={isDisabled}
          data-testid={`product-grid-item-${product.id}`}
          onProductClick={onProductClick}
        />
      ))}
    </Box>
  );
};

export default ProductGrid;
