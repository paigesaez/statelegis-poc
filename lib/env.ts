/**
 * Safe environment variable access
 */

export function getEnv(key: string, defaultValue = ""): string {
  // For client-side code
  if (typeof window !== "undefined") {
    // Only access NEXT_PUBLIC_ variables on the client
    if (!key.startsWith("NEXT_PUBLIC_")) {
      console.warn(`Attempted to access non-public env var '${key}' on the client`)
      return defaultValue
    }
  }

  // For both client and server
  const value = process.env[key]
  return value || defaultValue
}

export function getRequiredEnv(key: string): string {
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

// Specific environment variables
export const LEGISCAN_API_KEY = getEnv("VITE_LEGISCAN_API_KEY")
