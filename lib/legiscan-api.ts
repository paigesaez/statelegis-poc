import { get } from './api-client'

const LEGISCAN_BASE_URL = 'https://api.legiscan.com'

/**
 * Fetches data from the LegiScan API
 * @param operation The LegiScan API operation to perform
 * @param params Additional query parameters
 * @returns Promise with the API response data
 */
export async function fetchFromLegiScan<T>(
  operation: string,
  params: Record<string, string | number> = {}
): Promise<T> {
  try {
    // Add the API key and operation to the query parameters
    const queryParams = new URLSearchParams({
      key: process.env.VITE_LEGISCAN_API_KEY || '',
      op: operation,
      ...Object.fromEntries(
        Object.entries(params).map(([key, value]) => [key, String(value)])
      ),
    })

    const response = await get<{ status: string; [key: string]: any }>(
      `${LEGISCAN_BASE_URL}/?${queryParams.toString()}`
    )

    // Check for API errors
    if (response.status !== 'OK') {
      throw new Error(`LegiScan API error: ${response.status}`)
    }

    // The actual data is in a property named after the operation
    return response[operation.toLowerCase()] as T
  } catch (error) {
    console.error('Error in fetchFromLegiScan:', error)
    throw error
  }
}

/**
 * Fetches session list for a state
 * @param state State abbreviation (e.g., 'CA')
 */
export async function getSessionList(state: string) {
  return fetchFromLegiScan<Array<{
    session_id: number
    state_id: string
    state: string
    name: string
    title: string
    year_start: number
    year_end: number
    special: number
    session_tag: string
    status: string
  }>>('getSessionList', { state })
}

/**
 * Fetches bill details by ID
 * @param id Bill ID
 */
export async function getBill(id: number | string) {
  const response = await fetchFromLegiScan<{ bill: any }>('getBill', { id })
  return response.bill
}

/**
 * Fetches bill text by document ID
 * @param id Document ID
 */
export async function getBillText(id: number | string) {
  const response = await fetchFromLegiScan<{ text: any }>('getBillText', { id })
  return response.text
}

/**
 * Fetches bill amendments
 * @param id Bill ID
 */
export async function getAmendment(id: number | string) {
  const response = await fetchFromLegiScan<{ amendment: any }>('getAmendment', { id })
  return response.amendment
}

/**
 * Fetches bill supplements
 * @param id Bill ID
 */
export async function getSupplement(id: number | string) {
  const response = await fetchFromLegiScan<{ supplement: any }>('getSupplement', { id })
  return response.supplement
}

/**
 * Fetches bill sponsors
 * @param id Bill ID
 */
export async function getSponsors(id: number | string) {
  const response = await fetchFromLegiScan<{ sponsors: any[] }>('getSponsors', { id })
  return response.sponsors
}

/**
 * Fetches bill votes
 * @param id Bill ID
 */
export async function getVotes(id: number | string) {
  const response = await fetchFromLegiScan<{ votes: any }>('getVotes', { id })
  return response.votes
}

/**
 * Fetches bill text by document ID
 * @param id Document ID
 */
export async function getText(id: number | string) {
  const response = await fetchFromLegiScan<{ text: any }>('getText', { id })
  return response.text
}

/**
 * Fetches bill subjects by ID
 * @param id Bill ID
 */
export async function getSubjects(id: number | string) {
  const response = await fetchFromLegiScan<{ subjects: any[] }>('getSubjects', { id })
  return response.subjects
}

/**
 * Searches for bills
 * @param query Search query
 * @param state State abbreviation (e.g., 'CA')
 * @param year Session year
 * @param page Page number
 */
export async function searchBills(
  query: string,
  state?: string,
  year?: number,
  page = 1
) {
  const params: Record<string, string | number> = { query, page }
  if (state) params.state = state
  if (year) params.year = year
  
  const response = await fetchFromLegiScan<{
    searchresult: {
      summary: any
      results: Array<{
        relevance: number
        bill: any
      }>
    }
  }>('search', params)
  
  return response.searchresult
}

/**
 * Fetches master list of states
 */
export async function getStateList() {
  const response = await fetchFromLegiScan<{ states: any }>('getStateList')
  return response.states
}
