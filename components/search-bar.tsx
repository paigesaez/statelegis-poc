"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getStates } from "@/lib/data-service"
import type { State } from "@/lib/data-service"

export function SearchBar() {
  const router = useRouter()
  const [keyword, setKeyword] = useState("")
  const [state, setState] = useState("all")
  const [states, setStates] = useState<State[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadStates() {
      try {
        const statesData = await getStates()
        setStates(statesData)
      } catch (error) {
        console.error("Error loading states:", error)
        // Fallback to a minimal set of states
        setStates([
          { value: "all", label: "All States" },
          { value: "ca", label: "California" },
          { value: "ny", label: "New York" },
          { value: "tx", label: "Texas" },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    loadStates()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/bills?keyword=${keyword}&state=${state}`)
  }

  return (
    <form onSubmit={handleSearch} className="flex w-full flex-col gap-4 md:flex-row">
      <div className="flex-1">
        <Input
          placeholder="Search bills by keyword..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full"
        />
      </div>
      <Select value={state} onValueChange={setState} disabled={isLoading}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder={isLoading ? "Loading..." : "Select state"} />
        </SelectTrigger>
        <SelectContent>
          {states.map((state) => (
            <SelectItem key={state.value} value={state.value}>
              {state.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="submit" className="w-full md:w-auto">
        <Search className="mr-2 h-4 w-4" />
        Search
      </Button>
    </form>
  )
}
