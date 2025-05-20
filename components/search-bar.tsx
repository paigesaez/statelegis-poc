"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const states = [
  { value: "all", label: "All States" },
  { value: "ca", label: "California" },
  { value: "ny", label: "New York" },
  { value: "tx", label: "Texas" },
  { value: "fl", label: "Florida" },
  { value: "il", label: "Illinois" },
  // Add more states as needed
]

export function SearchBar() {
  const router = useRouter()
  const [keyword, setKeyword] = useState("")
  const [state, setState] = useState("all")

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
      <Select value={state} onValueChange={setState}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Select state" />
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
