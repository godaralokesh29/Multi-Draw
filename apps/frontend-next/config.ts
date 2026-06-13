/**
 * Environment-aware configuration for API endpoints
 * Supports both local development and production environments
 */

const isProduction = process.env.NODE_ENV === "production";
const isDevelopment = process.env.NODE_ENV === "development";

// HTTP Backend API URL
export const HTTP_BACKEND = isProduction
  ? process.env.NEXT_PUBLIC_BACKEND_URL || "http://duodle.onthewifi.com:3001"
  : process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

// WebSocket URL
export const WS_URL = isProduction
  ? process.env.NEXT_PUBLIC_WS_URL || "ws://duodle.onthewifi.com:8080"
  : process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080";

// Debug logging
if (isDevelopment) {
  console.log("API Config:", { HTTP_BACKEND, WS_URL, NODE_ENV: process.env.NODE_ENV });
}