'use client';

import { Box } from '@mantine/core';
import { IProduct } from '../../types';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductGrid.module.css';
import { useEffect } from 'react';

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
  useEffect(() => {
    const handleResize = () => {
      console.log(
        `ProductGrid rendering with window width: ${window.innerWidth}px`
      );
    };

    // Log on initial render
    handleResize();

    // Add resize listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
