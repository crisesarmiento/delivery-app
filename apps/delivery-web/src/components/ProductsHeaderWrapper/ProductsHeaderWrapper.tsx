'use client';

import {
  ReactNode,
  useEffect,
  useState,
  useRef,
  useCallback,
  forwardRef,
} from 'react';
import { Box, BoxProps } from '@mantine/core';
import styles from './ProductsHeaderWrapper.module.css';

interface ProductsHeaderWrapperProps extends BoxProps {
  header: ReactNode;
  categories: ReactNode;
  isHeaderCollapsed?: boolean;
  headerHeight?: number;
  isMobile: boolean;
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
      isMobile = false,
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
      if (isMobile) {
        setTopOffset(isHeaderCollapsed ? 70 : 0); // No offset needed with fixed categories
      } else {
        setTopOffset(isHeaderCollapsed ? collapsedHeaderHeight : headerHeight);
      }
    }, [isHeaderCollapsed, headerHeight, collapsedHeaderHeight, isMobile]);

    // Public method to scroll to top of content
    const scrollToTop = useCallback(() => {
      if (wrapperRef.current) {
        wrapperRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, []);

    // Expose the scrollToTop method
    useEffect(() => {
      if (wrapperRef.current) {
        (wrapperRef.current as any).scrollToTop = scrollToTop;
      }

      return () => {
        if (wrapperRef.current) {
          delete (wrapperRef.current as any).scrollToTop;
        }
      };
    }, [scrollToTop]);

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
