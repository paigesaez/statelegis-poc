"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"
import { useState, useEffect } from "react"

// Type definitions
type BooleanOperator = 'AND' | 'OR' | 'NOT'

interface Option {
  value: string
  label: string
}

interface SearchCriteria {
  keywords: string[]
  booleanOperators: BooleanOperator[]
  sponsors: string[]
  committees: string[]
  topics: string[]
}

const topics = [
  { value: "zoning", label: "Zoning" },
  { value: "permitting", label: "Permitting" },
  { value: "taxation", label: "Taxation" },
  { value: "environment", label: "Environment" },
  { value: "housing", label: "Housing" },
  { value: "transportation", label: "Transportation" },
  { value: "education", label: "Education" },
  { value: "healthcare", label: "Healthcare" },
  { value: "economy", label: "Economy" },
  { value: "technology", label: "Technology" }
]

const sponsors = [
  { value: 'sponsor1', label: 'John Smith' },
]

export default function TrackingPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    keywords: [],
    booleanOperators: [],
    sponsors: [],
    committees: [],
    topics: []
  })

  const [sponsors, setSponsors] = useState<Option[]>([])
  const [committees, setCommittees] = useState<Option[]>([])
  const [topics, setTopics] = useState<Option[]>([])

  useEffect(() => {
    // Fetch sponsors, committees, and topics data
    const fetchOptions = async () => {
      try {
        const [sponsorsResponse, committeesResponse, topicsResponse] = await Promise.all([
          fetch('/api/sponsors'),
          fetch('/api/committees'),
          fetch('/api/topics')
        ])

        if (!sponsorsResponse.ok || !committeesResponse.ok || !topicsResponse.ok) {
          throw new Error('Failed to fetch options')
        }

        const [sponsorsData, committeesData, topicsData] = await Promise.all([
          sponsorsResponse.json(),
          committeesResponse.json(),
          topicsResponse.json()
        ])

        setSponsors(sponsorsData)
        setCommittees(committeesData)
        setTopics(topicsData)
      } catch (err) {
        console.error('Error fetching options:', err)
      }
    }

    fetchOptions()
  }, [])

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value.trim()
    if (keyword && !searchCriteria.keywords.includes(keyword)) {
      setSearchCriteria(prev => ({
        ...prev,
        keywords: [...prev.keywords, keyword]
      }))
    }
  }

  const removeKeyword = (keyword: string) => {
    setSearchCriteria(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }))
  }

  const handleSponsorsChange = (value: string) => {
    const selectedSponsor = sponsors.find(s => s.value === value)
    if (selectedSponsor) {
      setSearchCriteria(prev => ({
        ...prev,
        sponsors: [...prev.sponsors, selectedSponsor.label]
      }))
    }
  }

  const handleCommitteesChange = (value: string) => {
    const selectedCommittee = committees.find(c => c.value === value)
    if (selectedCommittee) {
      setSearchCriteria(prev => ({
        ...prev,
        committees: [...prev.committees, selectedCommittee.label]
      }))
    }
  }

  const handleTopicsChange = (value: string) => {
    const selectedTopic = topics.find(t => t.value === value)
    if (selectedTopic) {
      setSearchCriteria(prev => ({
        ...prev,
        topics: [...prev.topics, selectedTopic.label]
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccessMessage(null)

    try {
      // TODO: Implement actual tracking logic
      // For now, just show a success message
      setSuccessMessage('Tracking criteria saved successfully')
    } catch (err) {
      console.error('Error saving tracking criteria:', err)
      setError('Failed to save tracking criteria')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col gap-4">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {successMessage && (
            <Alert variant="default" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Track Bills</CardTitle>
                <Button
                  type="submit"
                  form="tracking-form"
                  size="lg"
                  disabled={loading}
                  className="w-full md:w-auto"
                >
                  {loading ? 'Tracking...' : 'Track Bills'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form id="tracking-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <Label>Keywords</Label>
                      <div className="mt-2">
                        <div className="relative">
                          <Input
                            placeholder="Enter keywords with operators..."
                            onChange={(e) => {
                              const input = e.target.value.trim()
                              const keywords = input.split(/\s+(?:AND|OR|NOT)\s+/).filter(Boolean)
                              const operators = input.match(/\b(AND|OR|NOT)\b/g)?.map(op => op as BooleanOperator) || []
                              
                              // Validate input
                              if (keywords.length === 0) {
                                setError("Please enter at least one keyword")
                                return
                              }
                              
                              if (operators.length > keywords.length - 1) {
                                setError("Too many operators. Each operator should be between keywords.")
                                return
                              }

                              setError(null)
                              setSearchCriteria(prev => ({
                                ...prev,
                                keywords,
                                booleanOperators: operators
                              }))
                            }}
                          />
                          {error && (
                            <p className="mt-1 text-sm text-red-500">{error}</p>
                          )}
                          <p className="mt-1 text-sm text-muted-foreground">
                            Enter keywords with operators (AND, OR, NOT). Example: "tax AND healthcare OR education"
                          </p>
                        </div>
                        {searchCriteria.keywords.length > 0 && (
                          <div className="mt-4 flex flex-col gap-2">
                            <div className="flex flex-wrap gap-2">
                              {searchCriteria.keywords.map((keyword, index) => (
                                <Badge
                                  key={keyword}
                                  variant="outline"
                                  className="flex items-center gap-1 bg-muted/50"
                                >
                                  {keyword}
                                  {index < searchCriteria.booleanOperators.length && (
                                    <span className="text-muted-foreground font-medium">
                                      {searchCriteria.booleanOperators[index]}
                                    </span>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-4 w-4 p-0"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setSearchCriteria(prev => ({
                                        ...prev,
                                        keywords: prev.keywords.filter(k => k !== keyword),
                                        booleanOperators: prev.booleanOperators.filter((_, i) => i !== index)
                                      }))
                                    }}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </Badge>
                              ))}
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSearchCriteria(prev => ({
                                  ...prev,
                                  keywords: [],
                                  booleanOperators: []
                                }))
                              }}
                              className="w-full justify-start"
                            >
                              Clear All
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <Label>Sponsors</Label>
                    <Select onValueChange={handleSponsorsChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sponsors...">
                          {searchCriteria.sponsors.length > 0 ? 
                            searchCriteria.sponsors.map((sponsor) => (
                              <span key={sponsor} className="mr-2">{sponsor}</span>
                            ))
                            : null
                          }
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {sponsors.map((sponsor) => (
                          <SelectItem key={sponsor.value} value={sponsor.value}>
                            {sponsor.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Committees</Label>
                    <Select onValueChange={handleCommitteesChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select committees...">
                          {searchCriteria.committees.length > 0 ? 
                            searchCriteria.committees.map((committee) => (
                              <span key={committee} className="mr-2">{committee}</span>
                            ))
                            : null
                          }
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {committees.map((committee) => (
                          <SelectItem key={committee.value} value={committee.value}>
                            {committee.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Topics</Label>
                    <Select onValueChange={handleTopicsChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select topics...">
                          {searchCriteria.topics.length > 0 ? 
                            searchCriteria.topics.map((topic) => (
                              <Button type="submit" className="w-full">Track Bills</Button>
                            ))
                            : null
                          }
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {topics.map((topic) => (
                          <SelectItem key={topic.value} value={topic.value}>
                            {topic.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
