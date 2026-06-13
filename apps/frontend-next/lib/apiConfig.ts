/**
 * Environment Configuration Utility
 * Manages API endpoints and environment-specific settings
 * 
 * USAGE:
 * - For local development: URLs default to localhost
 * - For production: URLs default to duodle.onthewifi.com
 * - Override with .env.local or .env.production files
 * - Or set NEXT_PUBLIC_BACKEND_URL and NEXT_PUBLIC_WS_URL environment variables
 */

import { HTTP_BACKEND, WS_URL } from '../config';

export interface ApiConfig {
  httpBackend: string;
  wsUrl: string;
  isProduction: boolean;
  isDevelopment: boolean;
}

/**
 * Get current API configuration
 */
export const getApiConfig = (): ApiConfig => {
  const isProduction = process.env.NODE_ENV === "production";
  const isDevelopment = process.env.NODE_ENV === "development";

  return {
    httpBackend: HTTP_BACKEND,
    wsUrl: WS_URL,
    isProduction,
    isDevelopment,
  };
};

/**
 * Validate that APIs are reachable (optional health check)
 */
export const validateApiConnection = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${HTTP_BACKEND}/health`, {
      method: 'GET',
      timeout: 5000,
    }).catch(() => null);
    
    return response?.ok ?? false;
  } catch (error) {
    console.error('API validation failed:', error);
    return false;
  }
};

/**
 * Get full URL for API endpoint
 * @param path - API path without domain (e.g., "/room", "/chats/123")
 */
export const getApiUrl = (path: string): string => {
  return `${HTTP_BACKEND}${path}`;
};

/**
 * Get full URL for WebSocket endpoint
 * @param queryParams - Optional query parameters (e.g., "?token=abc")
 */
export const getWebSocketUrl = (queryParams: string = ''): string => {
  return `${WS_URL}${queryParams}`;
};

// Export for debugging
export const logApiConfig = () => {
  const config = getApiConfig();
  console.group('API Configuration');
  console.log('Environment:', config.isProduction ? 'PRODUCTION' : 'DEVELOPMENT');
  console.log('HTTP Backend:', config.httpBackend);
  console.log('WebSocket URL:', config.wsUrl);
  console.groupEnd();
};
