'use client';

import { MantineProvider } from '@mantine/core';
import { CartProvider } from '../context/CartContext';
import Footer from '@/components/Footer';
import ClientErrorBoundary from '@/components/ClientErrorBoundary/ClientErrorBoundary';
import { theme } from '../theme/theme';
import { ReactNode } from 'react';

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <MantineProvider theme={theme}>
      <div style={{ width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
        <CartProvider>
          <ClientErrorBoundary>{children}</ClientErrorBoundary>
        </CartProvider>
        <Footer />
      </div>
    </MantineProvider>
  );
}
