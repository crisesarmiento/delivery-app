'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

const ErrorBoundary = dynamic(() => import('../ErrorBoundary/ErrorBoundary'), {
  ssr: false,
});

interface Props {
  children: ReactNode;
}

const ClientErrorBoundary = ({ children }: Props) => {
  return <ErrorBoundary>{children}</ErrorBoundary>;
};

export default ClientErrorBoundary;
