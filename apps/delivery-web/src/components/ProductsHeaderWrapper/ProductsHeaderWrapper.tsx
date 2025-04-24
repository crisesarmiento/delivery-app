'use client';

import { ReactNode } from 'react';
import { Box } from '@mantine/core';
import styles from './ProductsHeaderWrapper.module.css';

interface ProductsHeaderWrapperProps {
  isHeaderCollapsed: boolean;
  headerHeight: number;
  collapsedHeaderHeight: number;
  header: ReactNode;
  categories: ReactNode;
}

const ProductsHeaderWrapper: React.FC<ProductsHeaderWrapperProps> = ({
  header,
  categories,
}) => {
  return (
    <Box>
      {header}
      {categories} {/* Rely on CategoryTabs' own positioning */}
      <Box className={styles.productsHeaderWrapper} />
    </Box>
  );
};

export default ProductsHeaderWrapper;
