'use client';
import { Box, Text } from '@mantine/core';
import styles from './ClosedNotificationBanner.module.css';
import { BRANCH_TEXTS } from '@/config/constants';
import { ClosedNotificationBannerProps } from './types';

const ClosedNotificationBanner: React.FC<ClosedNotificationBannerProps> = ({
  message = BRANCH_TEXTS.BRANCH_CLOSED,
}: ClosedNotificationBannerProps) => {
  return (
    <Box className={styles.closedNotificationBanner}>
      <Text className={styles.closedMessage}>{message}</Text>
    </Box>
  );
};

export default ClosedNotificationBanner;
