import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names into a single string using clsx and tailwind-merge
 * This utility helps with conditional class name application in components
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
