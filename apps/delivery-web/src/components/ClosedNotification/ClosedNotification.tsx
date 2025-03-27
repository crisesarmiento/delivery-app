'use client';

import { Box, Text } from '@mantine/core';
import { useEffect } from 'react';
import styles from './ClosedNotification.module.css';

interface ClosedNotificationProps {
  message?: string;
}

const ClosedNotification = ({
  message = 'La sucursal se encuentra cerrada en este momento.',
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
