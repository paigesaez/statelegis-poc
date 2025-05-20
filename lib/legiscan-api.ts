// LegiScan API service

const API_KEY = process.env.VITE_LEGISCAN_API_KEY

export async function getApiUrl(operation: string, params: Record<string, string> = {}) {
  const baseUrl = "https://api.legiscan.com/"
  const queryParams = new URLSearchParams({ key: API_KEY || "", op: operation, ...params })
  return `${baseUrl}?${queryParams.toString()}`
}

export async function fetchFromLegiScan(operation: string, params: Record<string, string> = {}) {
  try {
    const url = await getApiUrl(operation, params)
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`LegiScan API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    if (data.status === "ERROR") {
      throw new Error(`LegiScan API error: ${data.alert}`)
    }

    return data
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
