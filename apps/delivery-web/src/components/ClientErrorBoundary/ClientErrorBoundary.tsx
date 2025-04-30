'use client';

import dynamic from 'next/dynamic';
import { Props } from './types';

const ErrorBoundary = dynamic(() => import('../ErrorBoundary/ErrorBoundary'), {
  ssr: false,
});

const ClientErrorBoundary = ({ children }: Props) => {
  return <ErrorBoundary>{children}</ErrorBoundary>;
};

export default ClientErrorBoundary;
