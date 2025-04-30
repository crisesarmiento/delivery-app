import { Box, Loader as MantineLoader, Text } from '@mantine/core';
import React from 'react';
import { AppLoaderProps } from './types';

const AppLoader: React.FC<AppLoaderProps> = ({
  message = 'Cargando...',
  size = 'lg',
}) => (
  <Box style={{ textAlign: 'center', padding: '2rem' }}>
    <MantineLoader size={size} />
    <Text mt="md" color="dimmed">
      {message}
    </Text>
  </Box>
);

export default AppLoader;
