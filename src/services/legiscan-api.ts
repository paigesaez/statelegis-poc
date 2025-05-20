/**
 * LegiScan API service
 * Handles all interactions with the LegiScan API
 */

const API_KEY = import.meta.env.VITE_LEGISCAN_API_KEY
const BASE_URL = "https://api.legiscan.com/"

/**
 * Fetches data from the LegiScan API
 * @param operation - The API operation to perform
 * @param params - Additional parameters for the request
 * @returns The parsed JSON response
 */
export async function fetchFromLegiScan(operation: string, params: Record<string, string> = {}) {
  const url = new URL(BASE_URL)

  // Add API key and operation
  url.searchParams.append("key", API_KEY)
  url.searchParams.append("op", operation)

  // Add additional parameters
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value)
  })

  try {
    const response = await fetch(url.toString())

    // Check if the response is ok
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    // Properly parse the JSON response
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching from LegiScan API:", error)
    throw error
  }
}

/**
 * Fetches a list of bills based on search criteria
 * @param state - The state to search in
 * @param query - The search query
 * @returns A list of bills matching the criteria
 */
export async function searchBills(state?: string, query?: string) {
  const params: Record<string, string> = {}

  if (state && state !== "all") {
    params.state = state
  }

  if (query) {
    params.query = query
  }

  return fetchFromLegiScan("getSearchResults", params)
}

/**
 * Fetches details for a specific bill
 * @param id - The bill ID
 * @returns Detailed information about the bill
 */
export async function getBillDetails(id: string) {
  return fetchFromLegiScan("getBill", { id })
}

/**
 * Fetches a list of recent sessions
 * @returns A list of legislative sessions
 */
export async function getSessions() {
  return fetchFromLegiScan("getSessionList")
}

/**
 * Fetches a list of people (legislators)
 * @param state - The state to filter by
 * @returns A list of people matching the criteria
 */
export async function getPeople(state?: string) {
  const params: Record<string, string> = {}

  if (state && state !== "all") {
    params.state = state
  }

  return fetchFromLegiScan("getPeople", params)
}

/**
 * Fetches details for a specific person
 * @param id - The person ID
 * @returns Detailed information about the person
 */
export async function getPersonDetails(id: string) {
  return fetchFromLegiScan("getPerson", { id })
}
