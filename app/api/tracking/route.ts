import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { TrackingCriteria, TrackedBill } from "@/lib/models/tracking-criteria"
import { getTopicsForBill } from "@/lib/services/topic-mapping"
import { getBills } from "@/lib/data-service"

export async function POST(request: Request) {
  try {
    const { userId, name, keywords, booleanOperators, topics, sponsors, committees } = await request.json()

    // Validate input
    if (!userId || !name) {
      return NextResponse.json(
        { error: "User ID and name are required" },
        { status: 400 }
      )
    }

    if (!keywords.length && !topics.length && !sponsors.length && !committees.length) {
      return NextResponse.json(
        { error: "At least one tracking criterion must be specified" },
        { status: 400 }
      )
    }

    if (keywords.length && keywords.length - 1 !== booleanOperators.length) {
      return NextResponse.json(
        { error: "Number of boolean operators must be one less than the number of keywords" },
        { status: 400 }
      )
    }

    // Create tracking criteria
    const trackingCriteria = await prisma.trackingCriteria.create({
      data: {
        userId,
        name,
        keywords,
        booleanOperators,
        topics,
        sponsors,
        committees,
        isActive: true,
        lastCheckedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    // Schedule initial check
    await checkTrackingCriteria(trackingCriteria)

    return NextResponse.json({ trackingCriteria })
  } catch (error) {
    console.error("Error creating tracking criteria:", error)
    return NextResponse.json(
      { error: "Failed to create tracking criteria" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const trackingCriteria = await prisma.trackingCriteria.findMany({
      orderBy: {
        createdAt: "desc"
      }
    })
    return NextResponse.json({ trackingCriteria })
  } catch (error) {
    console.error("Error fetching tracking criteria:", error)
    return NextResponse.json(
      { error: "Failed to fetch tracking criteria" },
      { status: 500 }
    )
  }
}

async function checkTrackingCriteria(criteria: TrackingCriteria) {
  try {
    // Build search query based on criteria
    const searchQuery = buildSearchQuery(criteria)
    
    // Get bills from LegiScan API
    const { bills } = await getBills({
      keyword: searchQuery,
      page: 1,
      perPage: 100
    })

    // Process each bill
    for (const bill of bills) {
      // Check topics
      const billTopics = getTopicsForBill(bill)
      
      // Check if bill matches criteria
      if (matchesCriteria(bill, criteria, billTopics)) {
        // Save tracked bill
        await prisma.trackedBill.create({
          data: {
            trackingCriteriaId: criteria.id,
            billId: bill.id,
            lastMatchedAt: new Date(),
            metadata: {
              title: bill.title,
              number: bill.number,
              state: bill.state,
              status: bill.status
            }
          }
        })
      }
    }

    // Update last checked time
    await prisma.trackingCriteria.update({
      where: { id: criteria.id },
      data: { lastCheckedAt: new Date() }
    })
  } catch (error) {
    console.error("Error checking tracking criteria:", error)
  }
}

function buildSearchQuery(criteria: TrackingCriteria): string {
  // Combine keywords with boolean operators
  let query = criteria.keywords[0]
  for (let i = 1; i < criteria.keywords.length; i++) {
    query += ` ${criteria.booleanOperators[i - 1]} ${criteria.keywords[i]}`
  }
  return query
}

function matchesCriteria(bill: any, criteria: TrackingCriteria, billTopics: string[]): boolean {
  // Check sponsors
  if (criteria.sponsors.length > 0 && !criteria.sponsors.some(sponsor => 
    bill.sponsors.some(billSponsor => billSponsor.name.toLowerCase().includes(sponsor.toLowerCase()))
  )) {
    return false
  }

  // Check committees
  if (criteria.committees.length > 0 && !criteria.committees.some(committee =>
    bill.committees.some(billCommittee => billCommittee.toLowerCase().includes(committee.toLowerCase()))
  )) {
    return false
  }

  // Check topics
  if (criteria.topics.length > 0 && !criteria.topics.some(topic =>
    billTopics.includes(topic)
  )) {
    return false
  }

  return true
}
