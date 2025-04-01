'use client';

import { Box } from '@mantine/core';
import { IProduct } from '../../types';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductGrid.module.css';
import { useEffect, useRef } from 'react';
import { PRODUCT_GRID_LOGS } from '../../config/constants';

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
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Log grid dimensions for debugging
    const logGridDetails = () => {
      if (!gridRef.current) return;

      const width = gridRef.current.offsetWidth;
      const scrollWidth = gridRef.current.scrollWidth;

      console.log(
        PRODUCT_GRID_LOGS.GRID_DIMENSIONS.replace('{0}', width.toString())
          .replace('{1}', scrollWidth.toString())
          .replace('{2}', (scrollWidth > width).toString())
      );
    };

    // Initial log
    logGridDetails();

    // Log on resize
    const handleResize = () => {
      logGridDetails();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [products]);

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
        />
      ))}
    </Box>
  );
};

export default ProductGrid;
