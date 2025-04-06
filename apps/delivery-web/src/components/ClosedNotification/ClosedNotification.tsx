'use client';

import { Box, Text } from '@mantine/core';
import { useEffect } from 'react';
import styles from './ClosedNotification.module.css';
import { BRANCH_TEXTS } from '../../config/constants';

interface ClosedNotificationProps {
  message?: string;
}

const ClosedNotification = ({
  message = BRANCH_TEXTS.BRANCH_CLOSED,
}: ClosedNotificationProps) => {
  // Add a class to the body when the notification is displayed
  useEffect(() => {
    document.body.classList.add('has-notification');

    return () => {
      document.body.classList.remove('has-notification');
    };
  }, []);

  return (
    <Box className={styles.closedNotification}>
      <Text className={styles.closedMessage}>{message}</Text>
    </Box>
  );
};

export default ClosedNotification;
