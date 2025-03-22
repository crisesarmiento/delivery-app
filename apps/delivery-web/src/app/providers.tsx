'use client';

import { ReactNode, useEffect, useState } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    async function initMsw() {
      if (process.env.NODE_ENV === 'development') {
        try {
          const { worker } = await import('../mocks/browser');
          await worker.start({
            onUnhandledRequest: 'bypass',
          });
          setMswReady(true);
        } catch (error) {
          console.error('Error starting MSW worker:', error);
          // Even if MSW fails, we should show the app
          setMswReady(true);
        }
      } else {
        // In production, no need to initialize MSW
        setMswReady(true);
      }
    }

    initMsw();
  }, []);

  if (!mswReady) {
    return <div>Loading API mocks...</div>;
  }

  return <>{children}</>;
}
