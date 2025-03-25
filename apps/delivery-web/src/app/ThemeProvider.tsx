'use client';

import { MantineProvider } from '@mantine/core';
import { theme } from '../theme/theme';
import { ReactNode } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      {children}
    </MantineProvider>
  );
};

export default ThemeProvider;
