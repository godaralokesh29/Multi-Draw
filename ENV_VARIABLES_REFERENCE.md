# Environment Variables Reference

This document explains all environment variables used in the project.

## Required Environment Variables

### Root Level (.env)

These variables are required for the backend services and database.

```bash
# Database Connection URL - REQUIRED
# Used by Prisma ORM for database migrations and connections
# Format: postgresql://username:password@hostname:port/database
# For AWS RDS: postgresql://user:password@your-instance.amazonaws.com:5432/dbname
DATABASE_URL="postgresql://user:password@localhost:5432/excalidraw_db"

# JWT Secret Key - REQUIRED
# Used to sign and verify JWT tokens for authentication
# Generate with: openssl rand -hex 32
# CHANGE THIS IN PRODUCTION!
JWT_SECRET="your-secret-key-here"
```

### Frontend (.env.production)

These variables are for the Next.js frontend production build.

```bash
# HTTP Backend API URL - REQUIRED
# Must have NEXT_PUBLIC_ prefix to be available in browser
# Used by frontend to make API calls (signup, signin, create room)
NEXT_PUBLIC_BACKEND_URL="http://duodle.onthewifi.com"

# WebSocket URL - REQUIRED
# Must have NEXT_PUBLIC_ prefix to be available in browser
# Used for real-time drawing synchronization
# For HTTPS sites, use wss:// instead of ws://
NEXT_PUBLIC_WS_URL="ws://duodle.onthewifi.com"
```

### Frontend (.env.local)

For local development:

```bash
NEXT_PUBLIC_BACKEND_URL="http://localhost:3001"
NEXT_PUBLIC_WS_URL="ws://localhost:8080"
```

## Environment Variables by Service

### HTTP Backend (apps/http-backend)

| Variable | Source | Purpose |
|----------|--------|---------|
| `DATABASE_URL` | Root `.env` | Connect to PostgreSQL database |
| `JWT_SECRET` | Root `.env` | Sign/verify JWT tokens |
| `NODE_ENV` | System env | Set to "production" for production |
| `PORT` | Code default | HTTP server port (default: 3001) |

### WebSocket Backend (apps/ws-backend)

| Variable | Source | Purpose |
|----------|--------|---------|
| `DATABASE_URL` | Root `.env` | Save messages to PostgreSQL |
| `JWT_SECRET` | Root `.env` | Verify tokens from clients |
| `NODE_ENV` | System env | Set to "production" for production |
| `PORT` | Code default | WebSocket server port (default: 8080) |

### Frontend (apps/frontend-next)

| Variable | Source | Purpose |
|----------|--------|---------|
| `NEXT_PUBLIC_BACKEND_URL` | `.env.production` | API endpoint (must have NEXT_PUBLIC_ prefix) |
| `NEXT_PUBLIC_WS_URL` | `.env.production` | WebSocket endpoint (must have NEXT_PUBLIC_ prefix) |
| `NODE_ENV` | Build system | Determines which .env.* file is used |

## How Environment Variables Are Loaded

### Development (npm run dev)

1. `.env.local` is read by Next.js
2. Variables are loaded into the build process
3. NEXT_PUBLIC_* variables are embedded in the client bundle

### Production (npm run build)

1. `.env.production` is read by Next.js (or environment variables)
2. Variables are embedded at build time
3. NEXT_PUBLIC_* variables are baked into the JavaScript bundle

### Backend Services

Environment variables should be set in the shell environment before starting the service:

```bash
export DATABASE_URL="postgresql://..."
export JWT_SECRET="..."
node ./dist/index.js
```

Or using systemd/PM2 where they're defined in the service configuration.

## Important Notes

### NEXT_PUBLIC_ Prefix

- Variables for the **browser/client** need `NEXT_PUBLIC_` prefix
- They're embedded in the client JavaScript bundle at build time
- Without this prefix, they're only available on the server
- Example: Frontend needs URLs, so they're `NEXT_PUBLIC_BACKEND_URL`

### Backend Environment Variables

- Backend services read directly from shell environment
- Use root `.env` file with `dotenv` or similar
- No `NEXT_PUBLIC_` prefix needed
- Not exposed to the browser

### Security

- Never commit `.env` files to git
- `.env` and `.env.local` should be in `.gitignore`
- `.env.production` can be committed or set via deployment platform
- Regenerate `JWT_SECRET` for each environment
- Use strong database passwords

## Generating Secure Values

### Generate JWT_SECRET

```bash
# Option 1: Using openssl (Unix/Linux)
openssl rand -hex 32

# Option 2: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Option 3: Online (use with caution)
# https://www.random.org/ or similar
```

## Environment Variables by Deployment Location

### Local Development
```
DATABASE_URL=postgresql://user:pass@localhost:5432/excalidraw_db
JWT_SECRET=local-secret-key-not-secure
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
NEXT_PUBLIC_WS_URL=ws://localhost:8080
```

### AWS EC2 Deployment
```
DATABASE_URL=postgresql://user:pass@your-rds.amazonaws.com:5432/excalidraw_db
JWT_SECRET=your-generated-secure-key
NEXT_PUBLIC_BACKEND_URL=http://duodle.onthewifi.com
NEXT_PUBLIC_WS_URL=ws://duodle.onthewifi.com
```

### Docker Container
```
DATABASE_URL=postgresql://user:pass@db-service:5432/excalidraw_db
JWT_SECRET=your-generated-secure-key
NEXT_PUBLIC_BACKEND_URL=http://api.yourdomain.com
NEXT_PUBLIC_WS_URL=ws://api.yourdomain.com
```

### Vercel Deployment
- Add environment variables in Vercel dashboard
- Use `NEXT_PUBLIC_*` prefix for frontend variables
- Non-public variables only available during build time

## Troubleshooting

### "Cannot read property DATABASE_URL of undefined"
- Make sure `.env` file exists in root directory
- Run `export $(cat .env | xargs)` to load variables

### Frontend can't connect to backend
- Check NEXT_PUBLIC_BACKEND_URL is set correctly
- Check backend service is running on that URL
- Use browser DevTools → Console to see actual URL being used

### JWT_SECRET different between backends
- Ensure both http-backend and ws-backend use same JWT_SECRET
- Tokens signed by one backend must be verifiable by the other

### Build fails with "missing variable"
- Frontend variables must have `NEXT_PUBLIC_` prefix
- Check `.env.production` or system environment variables
- Run `npm run build` with correct environment set
