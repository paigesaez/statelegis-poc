// Core types for the legislative tracking application

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

export interface TrackingCriteria {
  id: string
  userId: string
  name: string
  keywords: string[]
  booleanOperators: ('AND' | 'OR' | 'NOT')[]
  topics: string[]
  sponsors: string[]
  committees: string[]
  isActive: boolean
  lastCheckedAt: Date
  createdAt: Date
  updatedAt: Date
}

export interface TrackedBill {
  trackingCriteriaId: string
  billId: string
  lastMatchedAt: Date
  metadata: {
    title: string
    number: string
    state: string
    status: string
  }
}
