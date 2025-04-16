'use client';

import {
  ReactNode,
  useEffect,
  useState,
  useRef,
  forwardRef,
  useCallback,
} from 'react';
import { Box, BoxProps } from '@mantine/core';
import styles from './ContentWrapper.module.css';

interface ContentWrapperProps extends BoxProps {
  children: ReactNode;
  isHeaderCollapsed?: boolean;
  headerHeight?: number;
  collapsedHeaderHeight?: number;
  isMobile?: boolean;
  className?: string;
}

/**
 * ContentWrapper - A component that positions its children properly below the header
 * and maintains a consistent distance as the header collapses/expands.
 */
const ContentWrapper = forwardRef<HTMLDivElement, ContentWrapperProps>(
  (
    {
      children,
      isHeaderCollapsed = false,
      headerHeight = 280, // Default full header height (desktop)
      collapsedHeaderHeight = 70, // Default collapsed header height (desktop)
      isMobile = false,
      className = '',
      ...boxProps
    }: ContentWrapperProps,
    ref
  ) => {
    const [topOffset, setTopOffset] = useState(headerHeight);
    const contentRef = useRef<HTMLDivElement | null>(null);

    // Combine forwarded ref with internal ref
    const setRefs = (element: HTMLDivElement | null) => {
      contentRef.current = element;

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
        setTopOffset(isHeaderCollapsed ? 0 : 0); // No offset needed with fixed categories
      } else {
        setTopOffset(isHeaderCollapsed ? collapsedHeaderHeight : headerHeight);
      }
    }, [isHeaderCollapsed, headerHeight, collapsedHeaderHeight, isMobile]);

    // Public method to scroll to top of content
    const scrollToTop = useCallback(() => {
      if (contentRef.current) {
        contentRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, []);

    // Expose the scrollToTop method
    useEffect(() => {
      if (contentRef.current) {
        (contentRef.current as any).scrollToTop = scrollToTop;
      }

      return () => {
        if (contentRef.current) {
          delete (contentRef.current as any).scrollToTop;
        }
      };
    }, [scrollToTop]);

    // Render the ContentWrapper component
    return (
      <Box
        ref={setRefs}
        className={`${styles.contentWrapper} ${className}`}
        style={{
          marginTop: topOffset,
          transition: 'margin-top 0.3s ease',
        }}
        {...boxProps}
      >
        {children}
      </Box>
    );
  }
);

ContentWrapper.displayName = 'ContentWrapper';

export default ContentWrapper;
