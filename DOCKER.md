# TaskFlow - Docker Setup

This document explains how to run TaskFlow using Docker and Docker Compose.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (version 20.10 or higher)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 2.0 or higher)

## Quick Start

### Production Mode

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd taskflow
   ```

2. **Run with Docker Compose:**
   ```bash
   docker compose up -d
   ```

3. **Access the application:**
   - Web App: http://localhost:3001
   - API Server: http://localhost:3000

### Development Mode

1. **Run in development mode with hot reloading:**
   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

2. **View logs:**
   ```bash
   # All services
   docker compose logs -f
   
   # Specific service
   docker compose logs -f server
   docker compose logs -f web
   ```

## Docker Commands

### Production Commands

```bash
# Start all services
docker compose up -d

# Stop all services
docker compose down

# Rebuild and start
docker compose up -d --build

# View logs
docker compose logs -f

# Stop and remove containers, networks, and volumes
docker compose down -v
```

### Development Commands

```bash
# Start development environment
docker compose -f docker-compose.dev.yml up -d

# Stop development environment
docker compose -f docker-compose.dev.yml down

# Rebuild development containers
docker compose -f docker-compose.dev.yml up -d --build

# View development logs
docker compose -f docker-compose.dev.yml logs -f
```

### Individual Service Commands

```bash
# Build specific service
docker compose build server
docker compose build web

# Run specific service
docker compose up -d server
docker compose up -d web

# View specific service logs
docker compose logs -f server
docker compose logs -f web
```

## Environment Variables

### Production Environment

The production Docker Compose file uses the following environment variables:

**Server:**
- `NODE_ENV=production`
- `PORT=3000`
- `CORS_ORIGIN=http://localhost:3001`
- `API_VERSION=1.0.0`
- `API_NAME=TaskFlow API`
- `LOG_LEVEL=info`

**Web App:**
- `VITE_API_BASE_URL=http://localhost:3000`
- `VITE_APP_NAME=TaskFlow`
- `VITE_APP_VERSION=1.0.0`

### Customizing Environment Variables

1. **Create a `.env` file in the root directory:**
   ```bash
   cp env.example .env
   ```

2. **Modify the `.env` file with your desired values**

3. **Update the docker-compose.yml file to use your environment variables:**
   ```yaml
   environment:
     - NODE_ENV=${NODE_ENV:-production}
     - PORT=${SERVER_PORT:-3000}
     - CORS_ORIGIN=${SERVER_CORS_ORIGIN:-http://localhost:3001}
   ```

## Architecture

### Production Architecture

```
┌─────────────────┐    ┌─────────────────┐
│   Nginx (Web)   │    │  Node.js (API)  │
│   Port: 80      │    │   Port: 3000    │
│   Container     │    │   Container     │
└─────────────────┘    └─────────────────┘
         │                       │
         └───────────────────────┘
                    │
         ┌─────────────────┐
         │   Docker        │
         │   Network       │
         └─────────────────┘
```

### Development Architecture

```
┌─────────────────┐    ┌─────────────────┐
│   Vite (Web)    │    │  tsx (API)      │
│   Port: 3001    │    │   Port: 3000    │
│   Container     │    │   Container     │
└─────────────────┘    └─────────────────┘
         │                       │
         └───────────────────────┘
                    │
         ┌─────────────────┐
         │   Docker        │
         │   Network       │
         └─────────────────┘
```

## Troubleshooting

### Common Issues

1. **Port already in use:**
   ```bash
   # Check what's using the port
   lsof -i :3000
   lsof -i :3001
   
   # Stop the service using the port
   sudo kill -9 <PID>
   ```

2. **Container won't start:**
   ```bash
   # Check container logs
   docker compose logs server
   docker compose logs web
   
   # Rebuild containers
   docker compose down
   docker compose up -d --build
   ```

3. **Permission issues:**
   ```bash
   # Fix file permissions
   sudo chown -R $USER:$USER .
   ```

4. **Network issues:**
   ```bash
   # Remove all containers and networks
   docker compose down -v
   docker system prune -f
   docker compose up -d
   ```

### Health Checks

The containers include health checks to ensure services are running properly:

```bash
# Check container health
docker compose ps

# Expected output:
# Name                Command               State           Ports
# -------------------------------------------------------------------------------
# taskflow-server     node dist/index.js    Up (healthy)    0.0.0.0:3000->3000/tcp
# taskflow-web        nginx -g daemon off;  Up (healthy)    0.0.0.0:3001->80/tcp
```

## Performance Optimization

### Production Optimizations

1. **Multi-stage builds** - Reduces final image size
2. **Alpine Linux** - Smaller base images
3. **Nginx** - Efficient static file serving
4. **Gzip compression** - Faster content delivery
5. **Caching headers** - Better performance for static assets

### Development Optimizations

1. **Volume mounts** - Hot reloading for development
2. **Node modules caching** - Faster rebuilds
3. **Development dependencies** - Full toolchain available

## Security Considerations

1. **Non-root user** - Containers run as non-root users
2. **Security headers** - Nginx includes security headers
3. **Network isolation** - Services communicate via Docker network
4. **Environment variables** - Sensitive data kept out of images

## Monitoring and Logs

### Viewing Logs

```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f server
docker compose logs -f web

# Last 100 lines
docker compose logs --tail=100 server
```

### Monitoring Resources

```bash
# Container resource usage
docker stats

# Container details
docker compose ps
docker inspect taskflow-server
docker inspect taskflow-web
```

## Deployment

### Production Deployment

1. **Build and push images:**
   ```bash
docker compose build
docker tag taskflow-server your-registry/taskflow-server:latest
docker tag taskflow-web your-registry/taskflow-web:latest
docker push your-registry/taskflow-server:latest
docker push your-registry/taskflow-web:latest
```

2. **Deploy to production:**
   ```bash
   docker compose -f docker-compose.prod.yml up -d
   ```

### Environment-Specific Configurations

Create environment-specific compose files:

- `docker-compose.prod.yml` - Production settings
- `docker-compose.staging.yml` - Staging settings
- `docker-compose.dev.yml` - Development settings

## Support

For issues related to Docker setup:

1. Check the troubleshooting section above
2. Review container logs: `docker-compose logs`
3. Verify environment variables are set correctly
4. Ensure Docker and Docker Compose are up to date 