// Data service to handle both mock and real data

import { delay } from "./mock-data"
import { bills } from "./mock-data/bills"
import { sessions } from "./mock-data/sessions"
import { representatives } from "./mock-data/representatives"
import { states } from "./mock-data/states"

// Configuration
const USE_MOCK_DATA = true // Set to false to use real API
const SIMULATE_DELAY = true // Set to false for instant responses
const DELAY_MS = 500 // Milliseconds to delay mock responses

// Types
export interface Bill {
  id: string
  bill_id: number
  number: string
  title: string
  state: string
  state_id: string
  session_id: number
  status: string
  status_date: string
  last_action: string
  last_action_date: string
  description: string
  sponsors: Array<{
    id: string
    name: string
    party: string
    district: string
  }>
  history: Array<{
    date: string
    action: string
  }>
  committees: string[]
  full_text?: string
}

export interface Session {
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
  startDate: string
  endDate: string
}

export interface Representative {
  id: string
  name: string
  state: string
  state_id: string
  district: string
  party: string
  active: boolean
  imageUrl?: string
  bio: string
  committees: string[]
  contact: {
    email: string
    phone: string
    office: string
  }
  sponsoredBills: Array<{
    id: string
    number: string
    title: string
    state: string
    status: string
    lastAction: string
    lastActionDate: string
    sponsors: string[]
  }>
}

export interface State {
  value: string
  label: string
}

// Helper function to simulate API delay
async function simulateDelay<T>(data: T): Promise<T> {
  if (SIMULATE_DELAY) {
    await delay(DELAY_MS)
  }
  return data
}

// Bills API
export async function getBills(filters: {
  state?: string
  status?: string
  fromDate?: string
  toDate?: string
  keyword?: string
  page?: number
  perPage?: number
}): Promise<{ bills: Bill[]; total: number }> {
  if (USE_MOCK_DATA) {
    let filteredBills = [...bills]

    // Apply filters
    if (filters.state && filters.state !== "all") {
      filteredBills = filteredBills.filter((bill) => bill.state_id.toLowerCase() === filters.state.toLowerCase())
    }

    if (filters.status && filters.status !== "all") {
      filteredBills = filteredBills.filter((bill) => bill.status.toLowerCase() === filters.status.toLowerCase())
    }

    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase()
      filteredBills = filteredBills.filter(
        (bill) =>
          bill.title.toLowerCase().includes(keyword) ||
          bill.number.toLowerCase().includes(keyword) ||
          bill.description.toLowerCase().includes(keyword),
      )
    }

    if (filters.fromDate) {
      const fromDate = new Date(filters.fromDate)
      filteredBills = filteredBills.filter((bill) => new Date(bill.last_action_date) >= fromDate)
    }

    if (filters.toDate) {
      const toDate = new Date(filters.toDate)
      filteredBills = filteredBills.filter((bill) => new Date(bill.last_action_date) <= toDate)
    }

    // Pagination
    const page = filters.page || 1
    const perPage = filters.perPage || 10
    const total = filteredBills.length
    const paginatedBills = filteredBills.slice((page - 1) * perPage, page * perPage)

    return simulateDelay({ bills: paginatedBills, total })
  } else {
    // Real API implementation would go here
    throw new Error("Real API not implemented yet")
  }
}

export async function getBillById(id: string): Promise<Bill | null> {
  if (USE_MOCK_DATA) {
    const bill = bills.find((b) => b.id === id) || null
    return simulateDelay(bill)
  } else {
    // Real API implementation would go here
    throw new Error("Real API not implemented yet")
  }
}

// Sessions API
export async function getSessions(filters: {
  state?: string
  year?: number
  status?: string
}): Promise<Session[]> {
  if (USE_MOCK_DATA) {
    let filteredSessions = [...sessions]

    // Apply filters
    if (filters.state && filters.state !== "all") {
      filteredSessions = filteredSessions.filter(
        (session) => session.state_id.toLowerCase() === filters.state.toLowerCase(),
      )
    }

    if (filters.year) {
      filteredSessions = filteredSessions.filter(
        (session) => session.year_start <= filters.year! && session.year_end >= filters.year!,
      )
    }

    if (filters.status) {
      filteredSessions = filteredSessions.filter(
        (session) => session.status.toLowerCase() === filters.status.toLowerCase(),
      )
    }

    return simulateDelay(filteredSessions)
  } else {
    // Real API implementation would go here
    throw new Error("Real API not implemented yet")
  }
}

// Representatives API
export async function getRepresentatives(filters: {
  state?: string
  party?: string
  activeOnly?: boolean
  page?: number
  perPage?: number
}): Promise<{ representatives: Representative[]; total: number }> {
  if (USE_MOCK_DATA) {
    let filteredReps = [...representatives]

    // Apply filters
    if (filters.state && filters.state !== "all") {
      filteredReps = filteredReps.filter((rep) => rep.state_id.toLowerCase() === filters.state.toLowerCase())
    }

    if (filters.party && filters.party !== "all") {
      filteredReps = filteredReps.filter((rep) => rep.party.toLowerCase() === filters.party.toLowerCase())
    }

    if (filters.activeOnly) {
      filteredReps = filteredReps.filter((rep) => rep.active)
    }

    // Pagination
    const page = filters.page || 1
    const perPage = filters.perPage || 10
    const total = filteredReps.length
    const paginatedReps = filteredReps.slice((page - 1) * perPage, page * perPage)

    return simulateDelay({ representatives: paginatedReps, total })
  } else {
    // Real API implementation would go here
    throw new Error("Real API not implemented yet")
  }
}

export async function getRepresentativeById(id: string): Promise<Representative | null> {
  if (USE_MOCK_DATA) {
    const rep = representatives.find((r) => r.id === id) || null
    return simulateDelay(rep)
  } else {
    // Real API implementation would go here
    throw new Error("Real API not implemented yet")
  }
}

// States API
export async function getStates(): Promise<State[]> {
  if (USE_MOCK_DATA) {
    return simulateDelay(states)
  } else {
    // Real API implementation would go here
    throw new Error("Real API not implemented yet")
  }
}

// Search API
export async function searchBills(query: string, state?: string): Promise<Bill[]> {
  if (USE_MOCK_DATA) {
    if (!query) return simulateDelay([])

    const keyword = query.toLowerCase()
    let filteredBills = bills.filter(
      (bill) =>
        bill.title.toLowerCase().includes(keyword) ||
        bill.number.toLowerCase().includes(keyword) ||
        bill.description.toLowerCase().includes(keyword),
    )

    if (state && state !== "all") {
      filteredBills = filteredBills.filter((bill) => bill.state_id.toLowerCase() === state.toLowerCase())
    }

    return simulateDelay(filteredBills.slice(0, 10)) // Return top 10 results
  } else {
    // Real API implementation would go here
    throw new Error("Real API not implemented yet")
  }
}
