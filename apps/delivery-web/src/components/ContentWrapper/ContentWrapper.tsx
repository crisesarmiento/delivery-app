'use client';

import { ReactNode, useEffect, useState } from 'react';
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
export function ContentWrapper({
  children,
  isHeaderCollapsed = false,
  headerHeight = 280, // Default full header height (desktop)
  collapsedHeaderHeight = 70, // Default collapsed header height (desktop)
  isMobile = false,
  className = '',
  ...boxProps
}: ContentWrapperProps) {
  const [topOffset, setTopOffset] = useState(headerHeight);

  useEffect(() => {
    if (isMobile) {
      setTopOffset(isHeaderCollapsed ? 0 : 0); // No offset needed with fixed categories
    } else {
      setTopOffset(isHeaderCollapsed ? collapsedHeaderHeight : headerHeight);
    }
  }, [isHeaderCollapsed, headerHeight, collapsedHeaderHeight, isMobile]);

  // Render the ContentWrapper component
  return (
    <Box
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

export default ContentWrapper;
