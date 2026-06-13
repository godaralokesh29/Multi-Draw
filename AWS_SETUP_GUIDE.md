# AWS Deployment Setup Guide - Complete

This guide covers the complete setup of the Excalidraw project on AWS from git clone to running all services.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Environment Variables Setup](#environment-variables-setup)
3. [Initial Setup & Installation](#initial-setup--installation)
4. [Database Setup](#database-setup)
5. [Building the Project](#building-the-project)
6. [Running Services](#running-services)
7. [Port Configuration](#port-configuration)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Make sure you have on your AWS EC2 instance:
- Node.js ≥ 18 (recommended: Node 20 LTS)
- pnpm 9.0.0 or higher
- PostgreSQL database (managed RDS or self-hosted)
- Git (for SSH cloning)

### Install Node.js and pnpm (if not already installed)

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20 LTS using NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify Node.js installation
node --version  # Should show v20.x.x
npm --version

# Install pnpm globally
sudo npm install -g pnpm@9.0.0

# Verify pnpm installation
pnpm --version  # Should show 9.0.0
```

---

## Environment Variables Setup

### Step 1: Clone the Repository via SSH

```bash
cd /home/ubuntu  # or your preferred directory
git clone git@github.com:your-username/Excalidraw.git
cd Excalidraw
```

### Step 2: Create Environment Files

There are TWO sets of environment files needed:

#### A. Database Environment (.env in root)

Create `/home/ubuntu/Excalidraw/.env` for Prisma:

```bash
cat > .env << 'EOF'
# Database Connection URL for Prisma
# Format: postgresql://username:password@host:port/database
DATABASE_URL="postgresql://your_db_user:your_db_password@your_db_host:5432/excalidraw_db"

# JWT Secret Key - CHANGE THIS IN PRODUCTION!
# Use a strong random string
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production-use-openssl-rand-hex-32"
EOF
```

#### B. Frontend Production Environment

Create `apps/frontend-next/.env.production`:

```bash
cat > apps/frontend-next/.env.production << 'EOF'
# Production Backend API URL
NEXT_PUBLIC_BACKEND_URL=http://duodle.onthewifi.com

# Production WebSocket URL
# Use wss:// if your site uses HTTPS, ws:// if HTTP only
NEXT_PUBLIC_WS_URL=ws://duodle.onthewifi.com
EOF
```

### Step 3: Verify Environment Files

```bash
# Check root .env
cat .env

# Check frontend .env.production
cat apps/frontend-next/.env.production
```

---

## Initial Setup & Installation

### Step 1: Install Dependencies

```bash
# Install pnpm dependencies for entire monorepo
pnpm install

# Verify installation
pnpm list
```

### Step 2: List Installed Packages

```bash
# Check if all packages were installed correctly
ls -la node_modules/@repo/
```

---

## Database Setup

### Step 1: Create PostgreSQL Database (if using AWS RDS)

If you're using AWS RDS, skip to "Configure Connection". If self-hosted:

```bash
# Connect to PostgreSQL
sudo -u postgres psql

# In PostgreSQL prompt:
CREATE DATABASE excalidraw_db;
CREATE USER excalidraw_user WITH PASSWORD 'your_db_password';
GRANT ALL PRIVILEGES ON DATABASE excalidraw_db TO excalidraw_user;
\q
```

### Step 2: Configure Connection in .env

Update the `DATABASE_URL` in `.env`:

```bash
# For AWS RDS (recommended)
DATABASE_URL="postgresql://your_db_user:your_db_password@your-rds-instance.amazonaws.com:5432/excalidraw_db"

# For local PostgreSQL
DATABASE_URL="postgresql://excalidraw_user:your_db_password@localhost:5432/excalidraw_db"
```

### Step 3: Run Prisma Migrations

```bash
# Navigate to the database package
cd packages/db

# Generate Prisma Client
pnpm exec prisma generate

# Run migrations to create tables
pnpm exec prisma migrate deploy

# (Alternative: if deploy fails) Reset and re-run migrations
pnpm exec prisma migrate reset --force

# Verify database was created
pnpm exec prisma studio  # Opens web interface to view database (optional)

# Return to root
cd ../..
```

### Step 4: Verify Database Connection

```bash
# Test the connection
pnpm exec prisma db execute --stdin << 'EOF'
SELECT 1;
EOF
```

---

## Building the Project

### Step 1: Build All Services

```bash
# Build the entire monorepo
pnpm run build

# This will:
# - Build TypeScript for http-backend
# - Build TypeScript for ws-backend
# - Build Next.js frontend
# - Output to respective dist/ directories
```

### Step 2: Verify Build Output

```bash
# Check HTTP backend build
ls -la apps/http-backend/dist/

# Check WebSocket backend build
ls -la apps/ws-backend/dist/

# Check Next.js build
ls -la apps/frontend-next/.next/
```

---

## Running Services

**IMPORTANT**: Each service should run in its own terminal or use process manager like PM2/systemd

### Option A: Running Services in Separate Terminals

#### Terminal 1: HTTP Backend (port 3001)

```bash
cd /home/ubuntu/Excalidraw

# Make sure .env is loaded
export $(cat .env | xargs)

# Start HTTP backend
cd apps/http-backend
pnpm run dev
# or after build:
node ./dist/index.js

# You should see: Server running on port 3001
```

#### Terminal 2: WebSocket Backend (port 8080)

```bash
cd /home/ubuntu/Excalidraw

# Make sure .env is loaded
export $(cat .env | xargs)

# Start WebSocket backend
cd apps/ws-backend
pnpm run dev
# or after build:
node ./dist/index.js

# You should see: WebSocketServer running on port 8080
```

#### Terminal 3: Next.js Frontend (port 3000)

```bash
cd /home/ubuntu/Excalidraw/apps/frontend-next

# Development mode
pnpm run dev
# Runs on http://localhost:3000

# OR Production mode (after build)
pnpm run build
pnpm run start
```

### Option B: Using PM2 Process Manager (Recommended for Production)

#### Install PM2

```bash
sudo npm install -g pm2
```

#### Create PM2 Ecosystem Config

```bash
# From /home/ubuntu/Excalidraw
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [
    {
      name: 'http-backend',
      cwd: 'apps/http-backend',
      script: './dist/index.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
      instances: 1,
      watch: false,
      max_memory_restart: '500M',
    },
    {
      name: 'ws-backend',
      cwd: 'apps/ws-backend',
      script: './dist/index.js',
      env: {
        NODE_ENV: 'production',
        PORT: 8080,
      },
      instances: 1,
      watch: false,
      max_memory_restart: '500M',
    },
    {
      name: 'frontend',
      cwd: 'apps/frontend-next',
      script: 'pnpm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      instances: 1,
      watch: false,
      max_memory_restart: '500M',
    },
  ],
};
EOF
```

#### Start Services with PM2

```bash
# Build all first
pnpm run build

# Start all services
pm2 start ecosystem.config.js

# View status
pm2 status

# View logs
pm2 logs

# Stop services
pm2 stop all

# Restart services
pm2 restart all

# Remove from PM2
pm2 delete all

# Save PM2 config to restart on reboot
pm2 save
pm2 startup
```

### Option C: Using Systemd Services (Production Recommended)

#### Create systemd service for HTTP Backend

```bash
sudo tee /etc/systemd/system/excalidraw-http.service << 'EOF'
[Unit]
Description=Excalidraw HTTP Backend
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/Excalidraw/apps/http-backend
Environment="NODE_ENV=production"
Environment="DATABASE_URL=postgresql://your_db_user:your_db_password@your-rds-instance.amazonaws.com:5432/excalidraw_db"
Environment="JWT_SECRET=your-super-secret-jwt-key-change-this-in-production"
ExecStart=/usr/bin/node /home/ubuntu/Excalidraw/apps/http-backend/dist/index.js
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF
```

#### Create systemd service for WebSocket Backend

```bash
sudo tee /etc/systemd/system/excalidraw-ws.service << 'EOF'
[Unit]
Description=Excalidraw WebSocket Backend
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/Excalidraw/apps/ws-backend
Environment="NODE_ENV=production"
Environment="DATABASE_URL=postgresql://your_db_user:your_db_password@your-rds-instance.amazonaws.com:5432/excalidraw_db"
Environment="JWT_SECRET=your-super-secret-jwt-key-change-this-in-production"
ExecStart=/usr/bin/node /home/ubuntu/Excalidraw/apps/ws-backend/dist/index.js
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF
```

#### Create systemd service for Frontend

```bash
sudo tee /etc/systemd/system/excalidraw-frontend.service << 'EOF'
[Unit]
Description=Excalidraw Frontend (Next.js)
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/Excalidraw/apps/frontend-next
Environment="NODE_ENV=production"
ExecStart=/usr/bin/pnpm start
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF
```

#### Enable and Start systemd Services

```bash
# Reload systemd
sudo systemctl daemon-reload

# Enable services to start on boot
sudo systemctl enable excalidraw-http.service
sudo systemctl enable excalidraw-ws.service
sudo systemctl enable excalidraw-frontend.service

# Start services
sudo systemctl start excalidraw-http.service
sudo systemctl start excalidraw-ws.service
sudo systemctl start excalidraw-frontend.service

# Check status
sudo systemctl status excalidraw-http.service
sudo systemctl status excalidraw-ws.service
sudo systemctl status excalidraw-frontend.service

# View logs
sudo journalctl -u excalidraw-http.service -f
sudo journalctl -u excalidraw-ws.service -f
sudo journalctl -u excalidraw-frontend.service -f

# Stop services
sudo systemctl stop excalidraw-http.service
sudo systemctl stop excalidraw-ws.service
sudo systemctl stop excalidraw-frontend.service

# Restart services
sudo systemctl restart excalidraw-http.service
sudo systemctl restart excalidraw-ws.service
sudo systemctl restart excalidraw-frontend.service
```

---

## Port Configuration

### Current Ports

| Service | Port | URL |
|---------|------|-----|
| Frontend (Next.js) | 3000 | http://localhost:3000 |
| HTTP Backend | 3001 | http://localhost:3001 |
| WebSocket Backend | 8080 | ws://localhost:8080 |

### Using Nginx Reverse Proxy (Recommended)

```bash
# Install Nginx
sudo apt install -y nginx

# Create Nginx config
sudo tee /etc/nginx/sites-available/excalidraw << 'EOF'
upstream frontend {
  server localhost:3000;
}

upstream http_backend {
  server localhost:3001;
}

upstream ws_backend {
  server localhost:8080;
}

server {
  listen 80;
  server_name duodle.onthewifi.com;

  # Frontend
  location / {
    proxy_pass http://frontend;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }

  # HTTP API
  location ~ ^/(signup|signin|room|chats) {
    proxy_pass http://http_backend;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }

  # WebSocket
  location ~ ^/ws {
    proxy_pass http://ws_backend;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
EOF

# Enable the config
sudo ln -s /etc/nginx/sites-available/excalidraw /etc/nginx/sites-enabled/

# Test Nginx config
sudo nginx -t

# Start Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Check status
sudo systemctl status nginx
```

### Using AWS ALB (Alternative)

If using AWS Application Load Balancer:

1. Create target groups for each service (3000, 3001, 8080)
2. Add listener rules based on paths:
   - `/` → Frontend (3000)
   - `/signup`, `/signin`, `/room`, `/chats` → HTTP Backend (3001)
   - `/ws` → WebSocket (8080)

---

## Complete Quick Setup Commands

If you want to start from scratch quickly:

```bash
# 1. Clone
git clone git@github.com:your-username/Excalidraw.git
cd Excalidraw

# 2. Setup .env files
cat > .env << 'EOF'
DATABASE_URL="postgresql://your_db_user:your_db_password@your-rds-instance.amazonaws.com:5432/excalidraw_db"
JWT_SECRET="generate-this-with-openssl-rand-hex-32"
EOF

cat > apps/frontend-next/.env.production << 'EOF'
NEXT_PUBLIC_BACKEND_URL=http://duodle.onthewifi.com
NEXT_PUBLIC_WS_URL=ws://duodle.onthewifi.com
EOF

# 3. Install & setup DB
pnpm install
cd packages/db
pnpm exec prisma migrate deploy
cd ../..

# 4. Build
pnpm run build

# 5. Start (development mode)
# Terminal 1:
cd apps/http-backend && pnpm run dev

# Terminal 2:
cd apps/ws-backend && pnpm run dev

# Terminal 3:
cd apps/frontend-next && pnpm run dev
```

---

## Troubleshooting

### Problem: `DATABASE_URL` not found

**Solution:**
```bash
# Make sure .env exists in root
ls -la .env

# Load environment variables
export $(cat .env | xargs)

# Verify
echo $DATABASE_URL
```

### Problem: "pnpm: command not found"

**Solution:**
```bash
sudo npm install -g pnpm@9.0.0
pnpm --version
```

### Problem: "Cannot find module @repo/..."

**Solution:**
```bash
# Reinstall dependencies
pnpm install

# Verify monorepo setup
pnpm list @repo/db
```

### Problem: Port already in use

**Solution:**
```bash
# Find process using port
sudo lsof -i :3001  # or :8080, :3000

# Kill process
sudo kill -9 <PID>

# Or use different ports by updating code
```

### Problem: WebSocket connection fails

**Solution:**
1. Verify WS backend is running: `curl http://localhost:8080` (should fail, that's normal)
2. Check `.env.production` has correct WS_URL
3. If HTTPS site, use `wss://` instead of `ws://`
4. Check firewall allows port 8080

### Problem: "Not authenticated" on signup/signin

**Solution:**
1. Verify JWT_SECRET is set: `echo $JWT_SECRET`
2. Same JWT_SECRET must be used in both backends
3. Restart backends after changing JWT_SECRET

### Problem: Prisma migration fails

**Solution:**
```bash
# Check what migrations are pending
cd packages/db
pnpm exec prisma migrate status

# Reset database (WARNING: deletes data)
pnpm exec prisma migrate reset --force

# Or manually apply:
pnpm exec prisma db push
```

---

## Next Steps

1. ✅ Setup is complete!
2. 📦 Backup your `.env` file (don't commit to git)
3. 🔒 Use strong JWT_SECRET in production (generate with: `openssl rand -hex 32`)
4. 🌐 Setup SSL certificate (use Let's Encrypt with AWS Certificate Manager)
5. 📊 Monitor logs with PM2 or systemd
6. 🔄 Setup automated backups for PostgreSQL

---

## Security Checklist

- [ ] Changed default JWT_SECRET
- [ ] Used strong database password
- [ ] Set DATABASE_URL to production database
- [ ] Enabled HTTPS/SSL
- [ ] Setup firewall rules (only allow needed ports)
- [ ] Configured CORS properly
- [ ] Set NODE_ENV to "production"
- [ ] Disabled debug logging in production
- [ ] Backed up `.env` file securely
- [ ] Used environment variables for all secrets (not hardcoded)
