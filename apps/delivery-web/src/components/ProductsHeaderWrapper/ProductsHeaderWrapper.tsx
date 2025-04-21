'use client';

import { ReactNode, useEffect, useState, useRef, forwardRef } from 'react';
import { Box, BoxProps } from '@mantine/core';
import styles from './ProductsHeaderWrapper.module.css';

interface ProductsHeaderWrapperProps extends BoxProps {
  header: ReactNode;
  categories: ReactNode;
  isHeaderCollapsed?: boolean;
  headerHeight?: number;
  collapsedHeaderHeight?: number;
}

const ProductsHeaderWrapper = forwardRef<
  HTMLDivElement,
  ProductsHeaderWrapperProps
>(
  (
    {
      header,
      categories,
      isHeaderCollapsed = false,
      headerHeight = 280, // Default full header height (desktop)
      collapsedHeaderHeight = 70, // Default collapsed header height (desktop)
      ...boxProps
    }: ProductsHeaderWrapperProps,
    ref
  ) => {
    const [topOffset, setTopOffset] = useState(headerHeight);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Combine forwarded ref with internal ref
    const setRefs = (element: HTMLDivElement | null) => {
      wrapperRef.current = element;

      // Handle forwarded ref
      if (typeof ref === 'function') {
        ref(element);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current =
          element;
      }
    };

    useEffect(() => {
      setTopOffset(isHeaderCollapsed ? collapsedHeaderHeight : headerHeight);
    }, [isHeaderCollapsed, headerHeight, collapsedHeaderHeight]);

    return (
      <Box className={styles.productsHeaderWrapper} ref={setRefs} {...boxProps}>
        {/* Header container */}
        <Box className={styles.headerContainer}>{header}</Box>

        {/* Categories container that synchronizes with header state */}
        <Box
          className={`${styles.categoriesContainer}`}
          style={{
            top: topOffset,
            transition: 'top 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          data-testid="products-header-categories"
        >
          {categories}
        </Box>
      </Box>
    );
  }
);

ProductsHeaderWrapper.displayName = 'ProductsHeaderWrapper';

export default ProductsHeaderWrapper;
