# Use Node.js 18 Alpine for smaller image size
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app

# Copy root package files
COPY package.json package-lock.json* ./
COPY turbo.json ./

# Copy workspace package files
COPY apps/web/package.json ./apps/web/
COPY apps/server/package.json ./apps/server/

# Install all dependencies
RUN npm install

# Rebuild source
FROM base AS builder
WORKDIR /app

# Copy deps
COPY --from=deps /app/node_modules ./node_modules

# Copy full monorepo
COPY . .

# Build frontend from web app directory
WORKDIR /app/apps/web
RUN npm run build

# Production nginx image
FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html

# Clean default nginx files
RUN rm -rf ./*

# Copy built frontend files
COPY --from=builder /app/apps/web/dist ./

# Copy nginx config
COPY apps/web/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
