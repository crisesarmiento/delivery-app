'use client';

import { Box, BoxProps } from '@mantine/core';
import { ReactNode } from 'react';
import styles from './BasePage.module.css';

interface BasePageProps extends BoxProps {
  children: ReactNode;
  headerSlot?: ReactNode;
  footerSlot?: ReactNode;
  sidebarSlot?: ReactNode;
}

const BasePage = ({
  children,
  headerSlot,
  footerSlot,
  sidebarSlot,
  className,
  ...boxProps
}: BasePageProps) => {
  return (
    <Box className={`${styles.pageContainer} ${className || ''}`} {...boxProps}>
      {headerSlot && <Box className={styles.headerContainer}>{headerSlot}</Box>}

      <Box className={styles.contentWrapper}>
        {sidebarSlot && (
          <Box className={styles.sidebarContainer}>{sidebarSlot}</Box>
        )}
        <Box className={styles.mainContent}>{children}</Box>
      </Box>

      {footerSlot && <Box className={styles.footerContainer}>{footerSlot}</Box>}
    </Box>
  );
};

export default BasePage;
