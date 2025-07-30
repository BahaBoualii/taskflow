# Use Node.js 18 Alpine for smaller image size
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install

# Rebuild source
FROM base AS builder
WORKDIR /app

# Copy deps
COPY --from=deps /app/node_modules ./node_modules

# Copy full monorepo
COPY . .

# 🔥 Set working dir to frontend app
WORKDIR /app/apps/web

# Install frontend deps if any (optional — only if you use nested package.json)
# RUN npm install

# Build frontend
RUN npm run build

# Production nginx image
FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html

# Clean default nginx files
RUN rm -rf ./*

# Copy built frontend files
COPY --from=builder /app/apps/web/dist ./

# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
