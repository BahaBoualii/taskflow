#!/bin/bash

# TaskFlow Startup Script
# This script helps you get started with TaskFlow

set -e

echo "🚀 TaskFlow - Task Management Application"
echo "========================================"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first:"
    echo "   https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first:"
    echo "   https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose plugin is available
if ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose is not available. Please install Docker Compose:"
    echo "   https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✅ Docker and Docker Compose are available"
echo ""

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from example..."
    cp env.example .env
    echo "✅ .env file created. You can modify it if needed."
    echo ""
fi

# Function to start the application
start_app() {
    echo "🔧 Starting TaskFlow..."
    echo ""
    
    # Build and start containers
    docker compose up -d --build
    
    echo ""
    echo "✅ TaskFlow is starting up!"
    echo ""
    echo "🌐 Access the application:"
    echo "   Web App: http://localhost:3001"
    echo "   API Server: http://localhost:3000"
    echo ""
    echo "📊 View logs: docker compose logs -f"
    echo "🛑 Stop the app: docker compose down"
    echo ""
}

# Function to start development mode
start_dev() {
    echo "🔧 Starting TaskFlow in development mode..."
    echo ""
    
    # Build and start containers in development mode
    docker compose -f docker-compose.dev.yml up -d --build
    
    echo ""
    echo "✅ TaskFlow is starting up in development mode!"
    echo ""
    echo "🌐 Access the application:"
    echo "   Web App: http://localhost:3001"
    echo "   API Server: http://localhost:3000"
    echo ""
    echo "📊 View logs: docker compose -f docker-compose.dev.yml logs -f"
    echo "🛑 Stop the app: docker compose -f docker-compose.dev.yml down"
    echo ""
}

# Function to stop the application
stop_app() {
    echo "🛑 Stopping TaskFlow..."
    docker compose down
    docker compose -f docker-compose.dev.yml down 2>/dev/null || true
    echo "✅ TaskFlow stopped"
}

# Function to show status
show_status() {
    echo "📊 TaskFlow Status:"
    echo ""
    docker compose ps
    echo ""
}

# Function to show logs
show_logs() {
    echo "📋 TaskFlow Logs:"
    echo ""
    docker compose logs -f
}

# Parse command line arguments
case "${1:-start}" in
    "start")
        start_app
        ;;
    "dev")
        start_dev
        ;;
    "stop")
        stop_app
        ;;
    "status")
        show_status
        ;;
    "logs")
        show_logs
        ;;
    "help"|"-h"|"--help")
        echo "TaskFlow Startup Script"
        echo ""
        echo "Usage: ./start.sh [command]"
        echo ""
        echo "Commands:"
        echo "  start   - Start TaskFlow in production mode (default)"
        echo "  dev     - Start TaskFlow in development mode"
        echo "  stop    - Stop TaskFlow"
        echo "  status  - Show container status"
        echo "  logs    - Show container logs"
        echo "  help    - Show this help message"
        echo ""
        ;;
    *)
        echo "❌ Unknown command: $1"
        echo "Run './start.sh help' for usage information"
        exit 1
        ;;
esac 