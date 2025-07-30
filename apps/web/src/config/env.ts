// Environment configuration for the web app
export const config = {
  // App Configuration
  appName: import.meta.env.VITE_APP_NAME || 'TaskFlow',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
  nodeEnv: import.meta.env.VITE_NODE_ENV || 'development',
  
  // API Configuration
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  apiTimeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000', 10),
  
  // Server Configuration
  port: parseInt(import.meta.env.VITE_PORT || '3001', 10),
  
  // Feature Flags
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  enableDebugMode: import.meta.env.VITE_ENABLE_DEBUG_MODE === 'true',
  
  // Development
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const;

// Type-safe environment variables
export type Config = typeof config; 