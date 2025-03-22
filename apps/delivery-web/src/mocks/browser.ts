// We're using MSW (Mock Service Worker) for API mocking
// https://mswjs.io/

import { handlers } from './handlers';

// This configures a Service Worker with the given request handlers.
let worker: any;

// Use dynamic import to prevent build errors
if (typeof window !== 'undefined') {
  const { setupWorker } = require('msw/browser');
  worker = setupWorker(...handlers);
}

export { worker };
