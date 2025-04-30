import { forwardRef } from 'react';
import { Box } from '@mantine/core';
import styles from './ProductsContentWrapper.module.css';
import { ContentWrapperProps } from './types';

const ProductsContentWrapper = forwardRef<
  HTMLDivElement | null,
  ContentWrapperProps
>(({ topOffset, children }, ref) => {
  return (
    <Box
      className={styles.productsContentWrapper}
      style={{ marginTop: topOffset, marginBottom: '97px' }}
      ref={ref}
    >
      {children}
    </Box>
  );
});

ProductsContentWrapper.displayName = 'ProductsContentWrapper';

export default ProductsContentWrapper;
