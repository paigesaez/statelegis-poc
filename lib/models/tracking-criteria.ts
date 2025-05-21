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
