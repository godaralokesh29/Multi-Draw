# API Configuration Setup Guide

## Overview

This guide explains how to configure the frontend to work with both local development and production environments.

## Environment Setup

### Local Development (localhost)

The default configuration for local development:
- **HTTP Backend**: `http://localhost:3001`
- **WebSocket**: `ws://localhost:8080`

No additional setup needed - these are the default fallback values.

### Production Deployment (duodle.onthewifi.com)

For production, environment variables are loaded from `.env.production`:
- **HTTP Backend**: `http://duodle.onthewifi.com`
- **WebSocket**: `ws://duodle.onthewifi.com`

## Configuration Files

### `.env.local` (Development)
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
NEXT_PUBLIC_WS_URL=ws://localhost:8080
```
- Used when running locally: `npm run dev`
- Do NOT commit this file to git (.gitignore already excludes it)

### `.env.production` (Production)
```env
NEXT_PUBLIC_BACKEND_URL=http://duodle.onthewifi.com
NEXT_PUBLIC_WS_URL=ws://duodle.onthewifi.com
```
- Used when building for production: `npm run build`
- Can be committed or set via deployment platform environment variables

### `.env.example` (Template)
Reference template showing all available environment variables.

## How It Works

1. **File**: `config.ts` detects the environment (development/production)
2. **Environment Variables**: Loads `NEXT_PUBLIC_*` variables
3. **Fallback Values**: Uses sensible defaults:
   - Development → localhost
   - Production → duodle.onthewifi.com

## Important Notes

### NEXT_PUBLIC_ Prefix
- All API URLs must have `NEXT_PUBLIC_` prefix to be available in the browser
- Without this prefix, the variables are only available on the server
- Next.js automatically includes these in the client bundle during build

### WebSocket Protocol
For **secure production** (HTTPS sites), use:
```
NEXT_PUBLIC_WS_URL=wss://duodle.onthewifi.com
```

For **HTTP sites**, use:
```
NEXT_PUBLIC_WS_URL=ws://duodle.onthewifi.com
```

## Testing Your Configuration

### Local Development
```bash
npm run dev
```
Should connect to `http://localhost:3001` and `ws://localhost:8080`

### Production Build
```bash
npm run build
npm start
```
Should connect to `http://duodle.onthewifi.com` and `ws://duodle.onthewifi.com`

### Check Config in Browser Console
```javascript
// In browser DevTools console
import { getApiConfig } from '@/lib/apiConfig';
console.log(getApiConfig());
```

## Deployment Steps

### 1. Vercel Deployment
If deploying to Vercel, add environment variables in Vercel dashboard:
```
NEXT_PUBLIC_BACKEND_URL=http://duodle.onthewifi.com
NEXT_PUBLIC_WS_URL=ws://duodle.onthewifi.com
```

### 2. Self-Hosted Deployment
1. Ensure `.env.production` is present or set environment variables
2. Run `npm run build`
3. Start with `npm start` or your deployment command

### 3. Docker Deployment
Add to your Dockerfile:
```dockerfile
ENV NEXT_PUBLIC_BACKEND_URL=http://duodle.onthewifi.com
ENV NEXT_PUBLIC_WS_URL=ws://duodle.onthewifi.com
```

## Troubleshooting

### "Cannot connect to backend"
1. Check browser console for actual URLs being used
2. Verify `.env.production` or environment variables are set correctly
3. Ensure backend server is running on the configured URL
4. Check browser console → Application → Environment variables

### "Failed to connect to room"
1. Verify WebSocket URL is correct
2. Check WebSocket server is running
3. For HTTPS sites, use `wss://` instead of `ws://`
4. Check browser console for CORS/connection errors

### Static Exports
If using `next export` (static HTML export), ensure:
1. No server-side rendering
2. Environment variables are set BEFORE build
3. Use `.env.production` for production builds

## Helper Functions

Use the utility functions in `lib/apiConfig.ts`:

```typescript
import { getApiUrl, getWebSocketUrl, getApiConfig } from '@/lib/apiConfig';

// Get full API URL
const url = getApiUrl('/room');  // → http://localhost:3001/room (dev)

// Get WebSocket URL with params
const wsUrl = getWebSocketUrl('?token=abc');  // → ws://localhost:8080?token=abc

// Get current config
const config = getApiConfig();
console.log(config.isProduction);  // true/false
```

## Current Configuration

- **config.ts**: Main configuration file (auto-detects environment)
- **lib/apiConfig.ts**: Helper functions for API configuration
- **.env.local**: Local development overrides (git-ignored)
- **.env.production**: Production configuration
- **.env.example**: Template reference

## Files Modified

1. `config.ts` - Updated to be environment-aware
2. `draw/api.ts` - Already uses HTTP_BACKEND from config
3. `draw/http.ts` - Already uses HTTP_BACKEND from config
4. `Components/RoomCanvas.tsx` - Already uses WS_URL from config

All imports of `HTTP_BACKEND` and `WS_URL` will automatically use the correct values!
