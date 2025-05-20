// Mock data index file
import { sessions } from "./sessions"
import { bills } from "./bills"
import { representatives } from "./representatives"

export const mockData = {
  sessions,
  bills,
  representatives,
}

// Helper to simulate API delay
export function delay(ms = 500): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
