// LegiScan API service using our server-side API route

import { get } from "./api-client"

export interface LegiScanResponse<T> {
  status: string
  data?: T
  alert?: string
}

export async function fetchFromLegiScan<T>(operation: string, params: Record<string, string> = {}): Promise<T> {
  try {
    // Build query parameters
    const queryParams = new URLSearchParams({ op: operation, ...params })
    const url = `/api/legiscan?${queryParams.toString()}`

    // Use our safe API client
    const response = await get<LegiScanResponse<T>>(url)

    if (response.status === "ERROR") {
      throw new Error(`LegiScan API error: ${response.alert || "Unknown error"}`)
    }

    if (!response.data) {
      throw new Error("LegiScan API returned no data")
    }

    return response.data
  } catch (error) {
    console.error("Error fetching from LegiScan:", error)
    throw error
  }
}

// Example functions for different API operations
export async function getSessionList(state: string) {
  return fetchFromLegiScan("getSessionList", { state })
}

export async function getBillList(sessionId: string) {
  return fetchFromLegiScan("getBillList", { id: sessionId })
}

export async function getBill(billId: string) {
  return fetchFromLegiScan("getBill", { id: billId })
}

export async function getPersonDetail(peopleId: string) {
  return fetchFromLegiScan("getPerson", { id: peopleId })
}

export async function searchBills(state: string, query: string, year?: number) {
  const params: Record<string, string> = { state, query }
  if (year) params.year = year.toString()
  return fetchFromLegiScan("searchBills", params)
}
