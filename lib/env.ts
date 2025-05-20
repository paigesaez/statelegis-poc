/**
 * Enhanced environment variable access with better error handling
 */

// Define environment variable types for better type safety
interface EnvVariables {
  VITE_LEGISCAN_API_KEY: string
  // Add other environment variables here
}

export function getEnv<K extends keyof EnvVariables>(key: K, defaultValue = ""): string {
  // For client-side code
  if (typeof window !== "undefined") {
    // Only access NEXT_PUBLIC_ variables on the client
    if (!key.toString().startsWith("NEXT_PUBLIC_")) {
      console.warn(`Attempted to access non-public env var '${key}' on the client`)
      return defaultValue
    }
  }

  // For both client and server
  const value = process.env[key as string]
  return value || defaultValue
}

export function getRequiredEnv<K extends keyof EnvVariables>(key: K): string {
  const value = getEnv(key)
  if (!value) {
    // In development, warn but don't crash
    if (process.env.NODE_ENV === "development") {
      console.error(`Required environment variable ${key} is not set`)
      return "[NOT SET]"
    }
    // In production, this is a critical error
    throw new Error(`Required environment variable ${key} is not set`)
  }
  return value
}

// Specific environment variables with fallbacks for development
export const LEGISCAN_API_KEY = getEnv("VITE_LEGISCAN_API_KEY")

// Function to check if all required environment variables are set
export function validateEnvironment(): { valid: boolean; missing: string[] } {
  const requiredVars = ["VITE_LEGISCAN_API_KEY"]
  const missing = requiredVars.filter((v) => !process.env[v])

  return {
    valid: missing.length === 0,
    missing,
  }
}
