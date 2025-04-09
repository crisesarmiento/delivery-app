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
      <div
        style={{
          width: '100%',
          maxWidth: '100%',
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '100%',
            position: 'relative',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <CartProvider>
            <ClientErrorBoundary>
              <div
                style={{
                  flex: 1,
                  width: '100%',
                  maxWidth: '1440px',
                }}
              >
                {children}
              </div>
            </ClientErrorBoundary>
          </CartProvider>
          <Footer />
        </div>
      </div>
    </MantineProvider>
  );
}
