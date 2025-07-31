# TaskFlow API

A RESTful API for managing tasks built with Express, TypeScript, and Zod for validation.

## Features

- ✅ Full CRUD operations for tasks
- ✅ Type-safe with TypeScript
- ✅ Input validation with Zod
- ✅ In-memory storage
- ✅ Comprehensive error handling
- ✅ Clean, modular architecture

## Project Structure

```
src/
├── controllers/     # Request handlers
├── middleware/      # Error handling and other middleware
├── routes/          # API route definitions
├── schemas/         # Zod validation schemas
├── services/        # Business logic layer
├── types/           # TypeScript type definitions
└── index.ts         # Main application entry point
```

## Design Decisions

🤔 Why Express?
- I chose Express because it's lightweight, unopinionated, and familiar to most developers. It offers full control over routing and middleware, making it a great fit for a small, focused API like this task manager.

🤔 Why Zod for validation?
- Zod is a TypeScript-first schema validation library that enforces runtime validation without losing type safety. It provides an elegant way to validate request bodies and query params while keeping types in sync with the rest of the application.

🤔 Error handling approach
- A centralized error handler was implemented to catch common API errors like "task not found" or "invalid input." Simplicity was prioritized over abstraction to ensure clarity during evaluation.

🤔 Project structure
- The backend is organized by responsibility: routes, services, schemas, and types. This separation improves maintainability and allows for future scaling (e.g., feature-based modules or testing layers).

## API Endpoints

### GET /tasks
Get all tasks.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "task-1",
      "title": "Complete Project",
      "description": "Finish the task management API",
      "status": "pending",
      "createdAt": "2025-07-30T21:00:06.973Z",
      "updatedAt": "2025-07-30T21:00:06.973Z"
    }
  ]
}
```

### POST /tasks
Create a new task.

**Request Body:**
```json
{
  "title": "New Task",
  "description": "Task description"
}
```

**Validation Rules:**
- `title`: Required, 1-100 characters
- `description`: Required, 1-500 characters

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "task-1",
    "title": "New Task",
    "description": "Task description",
    "status": "pending",
    "createdAt": "2025-07-30T21:00:06.973Z",
    "updatedAt": "2025-07-30T21:00:06.973Z"
  }
}
```

### PATCH /tasks/:id
Update task status.

**Request Body:**
```json
{
  "status": "done"
}
```

**Validation Rules:**
- `status`: Must be "pending" or "done"
- `id`: Must match pattern `task-{number}`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "task-1",
    "title": "New Task",
    "description": "Task description",
    "status": "done",
    "createdAt": "2025-07-30T21:00:06.973Z",
    "updatedAt": "2025-07-30T21:00:13.837Z"
  }
}
```

### DELETE /tasks/:id
Delete a task by ID.

**Response:**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "Invalid input data",
  "details": [
    {
      "origin": "string",
      "code": "too_small",
      "minimum": 1,
      "inclusive": true,
      "path": ["title"],
      "message": "Title is required"
    }
  ]
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Task not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Internal Server Error"
}
```

## Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

The server will start on `http://localhost:3000`

### Type Checking
```bash
npm run check-types
```

### Build
```bash
npm run build
```

### Testing

The project includes comprehensive unit and integration tests:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run only unit tests
npm run test:unit

# Run only integration tests
npm run test:integration
```

#### Test Coverage

Current test coverage:
- **Overall**: 94.62% statements, 87.5% branches, 94.11% functions, 94.31% lines
- **Services**: 100% coverage
- **Schemas**: 100% coverage  
- **Controllers**: 88.57% coverage
- **Routes**: 100% coverage
- **Middleware**: 100% coverage

#### Test Structure

```
src/tests/
├── unit/                    # Unit tests
│   ├── taskService.test.ts  # Service layer tests
│   └── schemas.test.ts      # Zod schema validation tests
├── integration/             # Integration tests
│   └── taskApi.test.ts      # API endpoint tests
└── testApp.ts              # Test app factory
```

#### Test Types

**Unit Tests:**
- Service layer business logic
- Zod schema validation
- Individual function behavior

**Integration Tests:**
- Full API endpoint testing
- Request/response validation
- Error handling scenarios
- End-to-end workflows

## Environment Variables

The server uses the following environment variables:

### Required Variables
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment mode (development/production)

### Optional Variables
- `CORS_ORIGIN`: CORS origin (default: "*")
- `API_VERSION`: API version (default: "1.0.0")
- `API_NAME`: API name (default: "Task Management API")
- `LOG_LEVEL`: Logging level (default: "info")

### Environment Setup

1. Copy the example environment file:
   ```bash
   cp env.example .env
   ```

2. Modify the `.env` file with your desired values:
   ```bash
   PORT=3000
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:3001
   API_VERSION=1.0.0
   API_NAME="Task Management API"
   LOG_LEVEL=info
   ```

## Architecture

### Layers

1. **Routes** (`/routes`): Define API endpoints and connect to controllers
2. **Controllers** (`/controllers`): Handle HTTP requests and responses
3. **Services** (`/services`): Business logic and data operations
4. **Schemas** (`/schemas`): Zod validation schemas
5. **Types** (`/types`): TypeScript type definitions
6. **Middleware** (`/middleware`): Error handling and other middleware

### Data Flow

1. Request comes in through routes
2. Controller validates input using Zod schemas
3. Controller calls service methods
4. Service performs business logic
5. Controller formats response
6. Response sent back to client

### Error Handling

- Input validation errors return 400 with detailed error messages
- Not found errors return 404
- Server errors return 500
- All errors follow a consistent JSON format

## Testing the API

You can test the API using curl or any HTTP client:

```bash
# Get all tasks
curl http://localhost:3000/tasks

# Create a task
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Test Task", "description": "Test description"}'

# Update task status
curl -X PATCH http://localhost:3000/tasks/task-1 \
  -H "Content-Type: application/json" \
  -d '{"status": "done"}'

# Delete a task
curl -X DELETE http://localhost:3000/tasks/task-1
```
