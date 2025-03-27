'use client';

import { Box, BoxProps } from '@mantine/core';
import { ReactNode, useEffect, useState } from 'react';
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
  // Check if the notification is present
  const [hasNotification, setHasNotification] = useState(false);

  useEffect(() => {
    // Check on mount and when the DOM changes
    const checkNotification = () => {
      setHasNotification(document.body.classList.contains('has-notification'));
    };

    checkNotification();

    // Create a mutation observer to watch for class changes on body
    const observer = new MutationObserver(checkNotification);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      className={`${styles.pageContainer} ${className || ''} ${
        hasNotification ? styles.hasNotification : ''
      }`}
      {...boxProps}
    >
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
