'use client';

import { Box } from '@mantine/core';
import styles from './ProductsHeaderWrapper.module.css';

import { ProductsHeaderWrapperProps } from './types';

const ProductsHeaderWrapper: React.FC<ProductsHeaderWrapperProps> = ({
  header,
  categories,
}) => {
  return (
    <Box style={{ backgroundColor: '#ffffff' }}>
      {header}
      {categories}
      <Box className={styles.productsHeaderWrapper} />
    </Box>
  );
};

export default ProductsHeaderWrapper;
