# Task Management Frontend

A modern, responsive task management application built with React, TypeScript, and modern web technologies.

## Features

- ✅ **Full CRUD Operations**: Create, read, update, and delete tasks
- ✅ **Real-time Status Updates**: Toggle task completion status
- ✅ **Modern UI**: Clean, accessible interface using ShadCN UI components
- ✅ **Type Safety**: Fully typed with TypeScript
- ✅ **Form Validation**: React Hook Form with Zod validation
- ✅ **State Management**: Zustand for global state
- ✅ **Data Fetching**: TanStack Query for API calls and caching
- ✅ **Responsive Design**: Works on desktop, tablet, and mobile
- ✅ **Error Handling**: Comprehensive error states and user feedback
- ✅ **Loading States**: Smooth loading indicators and feedback

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN UI (Radix UI primitives)
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Form Handling**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **Routing**: TanStack Router
- **Notifications**: Sonner (Toast notifications)
- **Icons**: Lucide React

## Project Structure

```
src/
├── api/                    # API client and functions
│   └── client.ts          # Axios client and API functions
├── components/             # React components
│   ├── tasks/             # Task-specific components
│   │   ├── TaskManager.tsx    # Main task management component
│   │   ├── TaskList.tsx       # Task list with filtering
│   │   ├── TaskItem.tsx       # Individual task display
│   │   ├── TaskForm.tsx       # Create task form
│   │   └── StatusToggle.tsx   # Task status toggle
│   └── ui/                # ShadCN UI components
├── hooks/                 # Custom React hooks
│   └── useTasks.ts        # TanStack Query hooks
├── lib/                   # Utility functions
│   └── schemas.ts         # Zod validation schemas
├── store/                 # State management
│   └── taskStore.ts       # Zustand store
├── types/                 # TypeScript type definitions
│   └── task.ts            # Task-related types
└── routes/                # Application routes
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend API running on `http://localhost:3000`

### Environment Setup

1. Copy the example environment file:
   ```bash
   cp env.example .env
   ```

2. Modify the `.env` file with your desired values:
   ```bash
   VITE_PORT=3001
   VITE_NODE_ENV=development
   VITE_API_BASE_URL=http://localhost:3000
   VITE_API_TIMEOUT=10000
   VITE_APP_NAME="TaskFlow"
   VITE_APP_VERSION=1.0.0
   VITE_ENABLE_ANALYTICS=false
   VITE_ENABLE_DEBUG_MODE=true
   ```

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3001` (or the port specified in VITE_PORT)

### Build for Production

```bash
npm run build
```

## Environment Variables

The web app uses the following environment variables:

### Required Variables
- `VITE_API_BASE_URL`: Backend API base URL (default: http://localhost:3000)
- `VITE_PORT`: Development server port (default: 3001)

### Optional Variables
- `VITE_APP_NAME`: Application name (default: "TaskFlow")
- `VITE_APP_VERSION`: Application version (default: "1.0.0")
- `VITE_API_TIMEOUT`: API request timeout in milliseconds (default: 10000)
- `VITE_NODE_ENV`: Environment mode (default: "development")
- `VITE_ENABLE_ANALYTICS`: Enable analytics (default: false)
- `VITE_ENABLE_DEBUG_MODE`: Enable debug mode (default: true)

## API Integration

The frontend connects to the backend API with the following endpoints:

- `GET /tasks` - Fetch all tasks
- `POST /tasks` - Create a new task
- `PATCH /tasks/:id` - Update task status
- `DELETE /tasks/:id` - Delete a task

## Key Components

### TaskManager
The main component that orchestrates the entire task management interface. It includes:
- Task creation form
- Task list with filtering
- Statistics dashboard

### TaskForm
A form component for creating new tasks with:
- Title and description fields
- Real-time validation using Zod
- Loading states and error handling
- Form reset after successful submission

### TaskList
Displays tasks organized by status:
- Pending tasks section
- Completed tasks section
- Loading and error states
- Empty state handling

### TaskItem
Individual task display with:
- Task title and description
- Status toggle (checkbox)
- Delete button
- Creation date and time
- Visual feedback for completed tasks

### StatusToggle
A checkbox component for updating task status:
- Toggle between pending and done
- Loading state during updates
- Optimistic updates with rollback on error

## State Management

### Zustand Store
The `taskStore` manages global application state:
- Task list
- Loading states
- Error handling
- Computed values (pending/completed tasks)

### TanStack Query
Handles server state with:
- Automatic caching
- Background refetching
- Optimistic updates
- Error retry logic

## Form Validation

Uses React Hook Form with Zod schemas:
- Required field validation
- Length constraints (title: 1-100 chars, description: 1-500 chars)
- Real-time validation feedback
- Type-safe form data

## Error Handling

Comprehensive error handling throughout the application:
- API error responses
- Network failures
- Validation errors
- User-friendly error messages
- Toast notifications for feedback

## Responsive Design

The application is fully responsive:
- Mobile-first design
- Grid layouts that adapt to screen size
- Touch-friendly interactions
- Accessible keyboard navigation

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run serve        # Preview production build
npm run check-types  # TypeScript type checking
```

### Code Quality

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Consistent component structure

## Future Enhancements

- Task categories and tags
- Due dates and reminders
- Task search and filtering
- Drag and drop reordering
- Bulk operations
- Offline support
- User authentication
- Task sharing and collaboration 