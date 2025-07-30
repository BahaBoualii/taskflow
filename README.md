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

### Option 1: Docker (Recommended)

**Prerequisites:**
- [Docker](https://docs.docker.com/get-docker/) (version 20.10 or higher)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 2.0 or higher)

**Quick Start:**
```bash
# Clone the repository
git clone <repository-url>
cd taskflow

# Run with Docker Compose
docker compose up -d

# Access the application
# Web App: http://localhost:3001
# API Server: http://localhost:3000
```

**Development Mode:**
```bash
# Run with hot reloading
docker compose -f docker-compose.dev.yml up -d
```

For detailed Docker instructions, see [DOCKER.md](./DOCKER.md).

### Option 2: Local Development

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
