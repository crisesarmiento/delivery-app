'use client';

import { Box } from '@mantine/core';
import { IProduct } from '../../types';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductGrid.module.css';

interface ProductGridProps {
  products: IProduct[];
  className?: string;
}

const ProductGrid = ({ products, className = '' }: ProductGridProps) => {
  return (
    <Box className={`${styles.productsGrid} ${className}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Box>
  );
};

export default ProductGrid;
