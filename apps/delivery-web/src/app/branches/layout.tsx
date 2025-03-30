'use client';

import { ReactNode } from 'react';
import { Box } from '@mantine/core';

interface BranchesLayoutProps {
  children: ReactNode;
}

export default function BranchesLayout({ children }: BranchesLayoutProps) {
  return (
    <Box
      style={{
        backgroundColor: '#ffffff',
        minHeight: '100vh',
        paddingTop: '60px', // Leave space for header if needed
      }}
    >
      {children}
    </Box>
  );
}
