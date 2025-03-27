'use client';

import { Box } from '@mantine/core';
import { IProduct } from '../../types';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductGrid.module.css';

interface ProductGridProps {
  products: IProduct[];
  className?: string;
  isDisabled?: boolean;
}

const ProductGrid = ({
  products,
  className = '',
  isDisabled = false,
}: ProductGridProps) => {
  return (
    <Box className={`${styles.productsGrid} ${className}`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isDisabled={isDisabled}
        />
      ))}
    </Box>
  );
};

export default ProductGrid;
