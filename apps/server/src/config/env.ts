// Environment configuration for the server
export const config = {
  // Server Configuration
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // CORS Configuration
  corsOrigin: process.env.CORS_ORIGIN || "*",
  
  // API Configuration
  apiVersion: process.env.API_VERSION || "1.0.0",
  apiName: process.env.API_NAME || "Task Management API",
  
  // Logging
  logLevel: process.env.LOG_LEVEL || "info",
  
  // Development
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
} as const;

// Type-safe environment variables
export type Config = typeof config; 