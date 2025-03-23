'use client';

import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  // According to the rules, we should avoid MSW for this MVP
  // Using simple mock implementations (e.g., JSON files or in-memory data)

  return <>{children}</>;
}
