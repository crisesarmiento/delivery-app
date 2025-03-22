// We're using 'msw' types without installing the package yet.
// This file will be used once we resolve the dependency conflicts and install MSW.

import { setupWorker } from 'msw';
import { handlers } from './handlers';

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers);