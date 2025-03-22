'use client';

import { useEffect } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const initMocks = async () => {
      if (process.env.NODE_ENV === 'development') {
        try {
          const { worker } = await import('../mocks/browser');
          await worker?.start({
            onUnhandledRequest: 'bypass', // Don't warn about unhandled requests
          });
          console.log('🔶 MSW initialized');
        } catch (error) {
          console.error('❌ MSW initialization failed:', error);
        }
      }
    };

    initMocks();
  }, []);

  return <>{children}</>;
}
