import { get } from '../api-client'
import { 
  Bill, 
  Session, 
  Representative, 
  State, 
  TrackingCriteria, 
  TrackedBill 
} from '../types/legislation'

// Configuration
const API_BASE_URL = '/api/legiscan'

/**
 * Service for handling legislative data operations
 */
export class LegislationService {
  /**
   * Fetches bills based on filters
   */
  static async getBills(filters: {
    state?: string
    status?: string
    fromDate?: string
    toDate?: string
    keyword?: string
    page?: number
    perPage?: number
  }): Promise<{ bills: Bill[]; total: number }> {
    try {
      const queryParams = new URLSearchParams()
      
      // Add filters to query params
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          queryParams.set(key, String(value))
        }
      })

      const response = await get<{ bills: Bill[]; total: number }>(
        `${API_BASE_URL}/bills?${queryParams.toString()}`
      )
      
      return response
    } catch (error) {
      console.error('Error fetching bills:', error)
      throw error
    }
  }

  /**
   * Fetches a single bill by ID
   */
  static async getBillById(id: string): Promise<Bill | null> {
    try {
      const response = await get<{ bill: Bill }>(`${API_BASE_URL}/bills/${id}`)
      return response.bill
    } catch (error) {
      console.error(`Error fetching bill ${id}:`, error)
      return null
    }
  }

  /**
   * Fetches legislative sessions
   */
  static async getSessions(filters: {
    state?: string
    year?: number
    status?: string
  } = {}): Promise<Session[]> {
    try {
      const queryParams = new URLSearchParams()
      
      // Add filters to query params
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.set(key, String(value))
        }
      })

      const response = await get<{ sessions: Session[] }>(
        `${API_BASE_URL}/sessions?${queryParams.toString()}`
      )
      
      return response.sessions
    } catch (error) {
      console.error('Error fetching sessions:', error)
      return []
    }
  }

  /**
   * Searches bills by query and optional state filter
   */
  static async searchBills(query: string, state?: string): Promise<Bill[]> {
    try {
      const queryParams = new URLSearchParams({ q: query })
      if (state) {
        queryParams.set('state', state)
      }

      const response = await get<{ bills: Bill[] }>(
        `${API_BASE_URL}/search?${queryParams.toString()}`
      )
      
      return response.bills
    } catch (error) {
      console.error('Error searching bills:', error)
      return []
    }
  }

  /**
   * Saves tracking criteria for a user
   */
  static async saveTrackingCriteria(criteria: Omit<TrackingCriteria, 'id' | 'createdAt' | 'updatedAt'>): Promise<TrackingCriteria> {
    try {
      const response = await fetch(`${API_BASE_URL}/tracking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(criteria),
      })

      if (!response.ok) {
        throw new Error('Failed to save tracking criteria')
      }

      return await response.json()
    } catch (error) {
      console.error('Error saving tracking criteria:', error)
      throw error
    }
  }

  /**
   * Gets tracked bills for a user
   */
  static async getTrackedBills(userId: string): Promise<TrackedBill[]> {
    try {
      const response = await get<{ trackedBills: TrackedBill[] }>(
        `${API_BASE_URL}/tracking?userId=${userId}`
      )
      return response.trackedBills
    } catch (error) {
      console.error('Error fetching tracked bills:', error)
      return []
    }
  }
}
