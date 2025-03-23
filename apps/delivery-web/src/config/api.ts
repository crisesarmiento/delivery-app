/**
 * API configuration for mocked endpoints
 */
import { IApiResponse } from '@/types';

export const API_CONFIG = {
  BASE_URL: '/api',
  ENDPOINTS: {
    BRANCHES: '/branches',
    PRODUCTS: '/products',
    ORDERS: '/orders',
  },
  MOCK_DELAY: 500, // Simulated network delay in ms
};

/**
 * Helper function to format success responses
 */
export function createSuccessResponse<T>(data: T): IApiResponse<T> {
  return {
    success: true,
    data,
  };
}

/**
 * Helper function to format error responses
 */
export function createErrorResponse(
  error: string,
  message: string
): IApiResponse<never> {
  return {
    success: false,
    error,
    message,
  };
}
