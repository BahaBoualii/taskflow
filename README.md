# TaskFlow

TaskFlow is a simple fullstack task management application designed for internal team use. It allows you to create, view, delete, and update the status of tasks through a minimal, modern interface.

This project was created with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), a modern TypeScript stack that combines React, TanStack Router, Express, and more.

## Features

- **TypeScript** - For type safety and improved developer experience
- **TanStack Router** - File-based routing with full type safety
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Reusable UI components
- **Express** - Fast, unopinionated web framework
- **Node.js** - Runtime environment
- **Turborepo** - Optimized monorepo build system

## Getting Started

### 🐳 Docker Compose (Recommended)

The **recommended way** to run TaskFlow is using Docker Compose. This method ensures consistent environments across different machines and eliminates dependency conflicts.

**Prerequisites:**
- [Docker](https://docs.docker.com/get-docker/) (version 20.10 or higher)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 2.0 or higher)

**Quick Start:**
```bash
# Clone the repository
git clone <repository-url>
cd taskflow

# Start all services with Docker Compose
docker compose up -d

# Access the application
# Web App: http://localhost:3001
# API Server: http://localhost:3000
```

**Stopping the application:**
```bash
# Stop all services
docker compose down

# Stop and remove volumes (data will be lost)
docker compose down -v
```

**Viewing logs:**
```bash
# View all logs
docker compose logs

# View specific service logs
docker compose logs web
docker compose logs server

# Follow logs in real-time
docker compose logs -f
```

**Rebuilding after changes:**
```bash
# Rebuild and start services
docker compose up -d --build
```

For detailed Docker instructions and advanced configurations, see [DOCKER.md](./DOCKER.md).

### 💻 Local Development

**Note:** Docker Compose is the recommended method for running TaskFlow. Use local development only if you need to modify the code or have specific development requirements.

**Prerequisites:**
- Node.js 18+
- npm or yarn

**Installation:**
```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser to see the web application.
The API is running at [http://localhost:3000](http://localhost:3000).



## Project Structure

TaskFlow is structured as a monorepo to keep both the backend and frontend codebases in sync within a single repository. This approach provides several benefits:

✅ Simplified dependency management – everything lives under one package.json (or shared tooling when needed)

✅ Easier development workflow – no need to switch repos for fullstack work

✅ Consistent tooling – shared ESLint, Prettier, TypeScript configs, etc.

✅ Better collaboration – clearer context when working on features that touch both API and UI

✅ Unified CI/CD pipelines – easier to test and deploy both layers together

```
TaskFlow/
├── apps/
│   ├── web/         # Frontend application (React + TanStack Router)
│   └── server/      # Backend API (Express)
```
📘 Note: For specific details about implementation, tools, architecture, and decisions in each app, refer to the README.md inside each subdirectory:

apps/server/README.md

apps/web/README.md

## Available Scripts

- `npm run dev`: Start all applications in development mode
- `npm run build`: Build all applications
- `npm run dev:web`: Start only the web application
- `npm run dev:server`: Start only the server
- `npm run check-types`: Check TypeScript types across all apps

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration. The pipeline includes:

### 🔄 **Continuous Integration (`ci.yml`)**
Runs on every push and pull request to `main` and `develop` branches:
- **Type Checking**: Validates TypeScript types across all applications
- **Build Testing**: Ensures all applications build successfully
- **Unit Testing**: Runs server tests with Jest
- **Security Audit**: Checks for known vulnerabilities in dependencies

### 📋 **Pull Request Validation (`pr.yml`)**
Provides enhanced validation for pull requests:
- **Comprehensive Testing**: All CI checks plus additional validations
- **Security Scanning**: Vulnerability assessment for PR changes
- **Docker Validation**: Ensures Docker builds work with PR changes
- **Automated Comments**: Posts validation results directly on PRs

### 📊 **Pipeline Status**

You can monitor the pipeline status:
- **GitHub Actions Tab**: View all workflow runs and their results
- **PR Comments**: Automated status updates on pull requests
- **Branch Protection**: Configure branch protection rules to require CI checks to pass
