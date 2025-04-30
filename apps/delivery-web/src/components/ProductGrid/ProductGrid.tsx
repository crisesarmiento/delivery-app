'use client';

import { Box } from '@mantine/core';

import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductGrid.module.css';
import { useRef } from 'react';
import { ProductGridProps } from './types';

const ProductGrid = ({
  products,
  className = '',
  isBranchClosed,
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
          isBranchClosed={isBranchClosed}
          isDisabled={isDisabled}
          data-testid={`product-grid-item-${product.id}`}
          onProductClick={onProductClick}
        />
      ))}
    </Box>
  );
};

export default ProductGrid;
