# Quick Start Commands for AWS

Copy and paste these commands to quickly set up the entire project on AWS.

## 1. Prerequisites Setup (Run Once)

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install pnpm
sudo npm install -g pnpm@9.0.0

# Verify installations
node --version
npm --version
pnpm --version
```

## 2. Clone and Setup Project

```bash
# Clone repository
cd /home/ubuntu
git clone git@github.com:your-username/Excalidraw.git
cd Excalidraw

# Create root .env file
cat > .env << 'EOF'
DATABASE_URL="postgresql://dbuser:dbpassword@your-rds.amazonaws.com:5432/excalidraw_db"
JWT_SECRET="$(openssl rand -hex 32)"
EOF

# Create frontend production env
cat > apps/frontend-next/.env.production << 'EOF'
NEXT_PUBLIC_BACKEND_URL=http://duodle.onthewifi.com
NEXT_PUBLIC_WS_URL=ws://duodle.onthewifi.com
EOF

# Verify files were created
cat .env
cat apps/frontend-next/.env.production
```

## 3. Install Dependencies

```bash
cd /home/ubuntu/Excalidraw

# Install all packages
pnpm install

# Wait for this to complete... (may take 2-3 minutes)
```

## 4. Setup Database

```bash
# Navigate to db package
cd packages/db

# Generate Prisma Client
pnpm exec prisma generate

# Run database migrations
pnpm exec prisma migrate deploy

# Return to root
cd ../..

echo "✅ Database setup complete!"
```

## 5. Build All Services

```bash
# Build everything
pnpm run build

# Verify builds
ls -la apps/http-backend/dist/
ls -la apps/ws-backend/dist/
ls -la apps/frontend-next/.next/

echo "✅ Build complete!"
```

## 6. Test Services (Development Mode - Quick Test)

If you want to quickly test that everything works:

```bash
# Terminal 1: HTTP Backend
cd /home/ubuntu/Excalidraw/apps/http-backend
pnpm run dev
# Should see: Server running on port 3001

# Terminal 2: WebSocket Backend
cd /home/ubuntu/Excalidraw/apps/ws-backend
pnpm run dev
# Should see: WebSocketServer running on port 8080

# Terminal 3: Frontend
cd /home/ubuntu/Excalidraw/apps/frontend-next
pnpm run dev
# Should see: ▲ Next.js running on http://localhost:3000

# Then visit: http://your-aws-instance-ip:3000
# Test: Signup → Create Room → Join Room → Try drawing
```

## 7. Production Setup with PM2

```bash
cd /home/ubuntu/Excalidraw

# Install PM2 globally
sudo npm install -g pm2

# Create ecosystem config
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [
    {
      name: 'http-backend',
      cwd: 'apps/http-backend',
      script: './dist/index.js',
      env: {
        NODE_ENV: 'production',
        DATABASE_URL: process.env.DATABASE_URL,
        JWT_SECRET: process.env.JWT_SECRET,
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
        DATABASE_URL: process.env.DATABASE_URL,
        JWT_SECRET: process.env.JWT_SECRET,
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
      },
      instances: 1,
      watch: false,
      max_memory_restart: '500M',
    },
  ],
};
EOF

# Load environment variables
export $(cat .env | xargs)

# Start all services with PM2
pm2 start ecosystem.config.js

# View status
pm2 status

# View logs
pm2 logs

# Save configuration for restart on reboot
pm2 save
sudo pm2 startup

echo "✅ PM2 setup complete! Services are running."
echo "View logs: pm2 logs"
echo "Restart: pm2 restart all"
echo "Stop: pm2 stop all"
```

## 8. Setup Nginx Reverse Proxy

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

  location / {
    proxy_pass http://frontend;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }

  location ~ ^/(signup|signin|room|chats) {
    proxy_pass http://http_backend;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }

  location ~ ^/ws {
    proxy_pass http://ws_backend;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
  }
}
EOF

# Enable the site
sudo ln -s /etc/nginx/sites-available/excalidraw /etc/nginx/sites-enabled/

# Test and start Nginx
sudo nginx -t
sudo systemctl start nginx
sudo systemctl enable nginx

echo "✅ Nginx setup complete!"
echo "Your application should now be accessible at: http://duodle.onthewifi.com"
```

## 9. Setup HTTPS with Let's Encrypt (Recommended)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d duodle.onthewifi.com

# Auto-renewal
sudo systemctl restart certbot.timer

echo "✅ HTTPS setup complete!"
echo "Your application is now at: https://duodle.onthewifi.com"
```

## All-in-One Complete Setup Script

Save this as `setup.sh` and run with `bash setup.sh`:

```bash
#!/bin/bash

set -e  # Exit on error

echo "=========================================="
echo "Excalidraw AWS Complete Setup"
echo "=========================================="

# Prerequisites
echo "Installing prerequisites..."
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs nginx certbot python3-certbot-nginx
sudo npm install -g pnpm@9.0.0 pm2

# Clone
echo "Cloning repository..."
cd /home/ubuntu
git clone git@github.com:your-username/Excalidraw.git || cd Excalidraw
git pull

# Environment setup
echo "Setting up environment variables..."
cat > .env << 'EOF'
DATABASE_URL="postgresql://dbuser:dbpassword@your-rds.amazonaws.com:5432/excalidraw_db"
JWT_SECRET="$(openssl rand -hex 32)"
EOF

cat > apps/frontend-next/.env.production << 'EOF'
NEXT_PUBLIC_BACKEND_URL=http://duodle.onthewifi.com
NEXT_PUBLIC_WS_URL=ws://duodle.onthewifi.com
EOF

# Dependencies
echo "Installing dependencies..."
pnpm install

# Database
echo "Setting up database..."
cd packages/db
pnpm exec prisma generate
pnpm exec prisma migrate deploy
cd ../..

# Build
echo "Building services..."
pnpm run build

# PM2
echo "Starting services with PM2..."
export $(cat .env | xargs)
pm2 start ecosystem.config.js
pm2 save
sudo pm2 startup

echo "=========================================="
echo "✅ Setup complete!"
echo "=========================================="
echo ""
echo "Services running:"
echo "  - Frontend: http://localhost:3000"
echo "  - HTTP API: http://localhost:3001"
echo "  - WebSocket: ws://localhost:8080"
echo ""
echo "View status: pm2 status"
echo "View logs: pm2 logs"
echo "Website: http://duodle.onthewifi.com"
```

## Common Commands During Deployment

```bash
# Check if services are running
pm2 status
curl http://localhost:3001/health  # HTTP backend
curl http://localhost:3000         # Frontend

# View logs
pm2 logs http-backend
pm2 logs ws-backend
pm2 logs frontend

# Restart services
pm2 restart all
pm2 restart http-backend

# Stop services
pm2 stop all

# Check ports
sudo lsof -i :3000
sudo lsof -i :3001
sudo lsof -i :8080

# Check nginx
sudo nginx -t
sudo systemctl status nginx
sudo systemctl restart nginx

# Database backup
pg_dump -h your-rds.amazonaws.com -U dbuser excalidraw_db > backup.sql

# Update code and redeploy
cd /home/ubuntu/Excalidraw
git pull
pnpm install
pnpm run build
pm2 restart all
```

## Troubleshooting

```bash
# Database connection issues
psql -h your-rds.amazonaws.com -U dbuser -d excalidraw_db

# Check if ports are in use
lsof -i :3000
lsof -i :3001
lsof -i :8080

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# PM2 logs with timestamps
pm2 logs --lines 100

# Check system resources
free -h
df -h
top

# Kill process on specific port (careful!)
sudo fuser -k 3001/tcp
```

## Useful Links

- AWS RDS Console: https://console.aws.amazon.com/rds
- PM2 Documentation: https://pm2.keymetrics.io/
- Nginx Documentation: https://nginx.org/
- Let's Encrypt: https://letsencrypt.org/
- Prisma Documentation: https://www.prisma.io/docs/

## Important Reminders

✅ Change `JWT_SECRET` to a secure random value
✅ Update `DATABASE_URL` with your actual RDS endpoint
✅ Update domain name from `duodle.onthewifi.com` to your domain
✅ Setup SSL certificate with Let's Encrypt
✅ Backup database regularly
✅ Monitor error logs
✅ Keep application logs for debugging
