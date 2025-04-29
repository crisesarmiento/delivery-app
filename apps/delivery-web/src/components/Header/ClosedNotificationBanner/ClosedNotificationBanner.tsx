'use client';
import { Box, Text } from '@mantine/core';
import styles from './ClosedNotificationBanner.module.css';
import { BRANCH_TEXTS } from '@/config/constants';
import { ClosedNotificationBannerProps } from './types';

const ClosedNotificationBanner: React.FC<ClosedNotificationBannerProps> = ({
  collapsedHeaderHeight,
}) => {
  const top = collapsedHeaderHeight;

  return (
    <Box
      className={styles.closedNotificationBanner}
      style={{
        top: top,
      }}
    >
      <Text className={styles.closedMessage}>{BRANCH_TEXTS.BRANCH_CLOSED}</Text>
    </Box>
  );
};

export default ClosedNotificationBanner;
