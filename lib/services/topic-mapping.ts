import { Bill } from "@/lib/data-service"

export interface TopicMapping {
  keywords: string[]
  topics: string[]
}

// This will be populated with actual mappings based on bill content analysis
export const topicMappings: TopicMapping[] = [
  {
    keywords: [
      "zoning", "land use", "property", "development", "building",
      "construction", "housing", "residential", "commercial"
    ],
    topics: ["zoning", "housing", "development"]
  },
  {
    keywords: [
      "tax", "revenue", "income", "property tax", "sales tax",
      "corporate tax", "tax reform", "tax relief"
    ],
    topics: ["taxation", "revenue", "finance"]
  },
  {
    keywords: [
      "environment", "climate", "pollution", "air quality",
      "water", "conservation", "wildlife"
    ],
    topics: ["environment", "conservation", "climate"]
  },
  // Add more mappings as needed
]

export function getTopicsForBill(bill: Bill): string[] {
  const billText = [bill.title, bill.description].join(' ').toLowerCase()
  const matchedTopics = new Set<string>()

  for (const mapping of topicMappings) {
    if (mapping.keywords.some(keyword => billText.includes(keyword.toLowerCase()))) {
      mapping.topics.forEach(topic => matchedTopics.add(topic))
    }
  }

  return Array.from(matchedTopics)
}

export function getTopicKeywords(topic: string): string[] {
  return topicMappings
    .filter(mapping => mapping.topics.includes(topic))
    .flatMap(mapping => mapping.keywords)
}
