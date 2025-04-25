'use client';

import { MantineProvider } from '@mantine/core';
import { CartProvider } from '../context/CartContext';
import Footer from '@/components/Footer';
import ClientErrorBoundary from '@/components/ClientErrorBoundary/ClientErrorBoundary';
import { theme } from '../theme/theme';
import { ReactNode, useState, useEffect, memo } from 'react';
import { NavProvider } from '../context/navContext';

// Use memo to prevent unnecessary re-renders
const MemoizedCart = memo(({ children }: { children: ReactNode }) => {
  return <CartProvider>{children}</CartProvider>;
});
MemoizedCart.displayName = 'MemoizedCart';

export default function ClientLayout({ children }: { children: ReactNode }) {
  // Add client-side only rendering to prevent hydration issues
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <MantineProvider theme={theme}>
      <NavProvider>
        <div
          style={{
            width: '100%',
            maxWidth: '100%',
            overflowX: 'hidden',
            overflowY: 'visible',
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
            {isMounted ? (
              <MemoizedCart>
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
              </MemoizedCart>
            ) : (
              <div style={{ flex: 1, width: '100%', maxWidth: '1440px' }}>
                {/* Empty div for SSR placeholder */}
              </div>
            )}
            <Footer />
          </div>
        </div>
      </NavProvider>
    </MantineProvider>
  );
}
