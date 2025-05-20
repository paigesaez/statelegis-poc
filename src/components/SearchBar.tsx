"use client"

import type React from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

const states = [
  { value: "all", label: "All States" },
  { value: "ca", label: "California" },
  { value: "ny", label: "New York" },
  { value: "tx", label: "Texas" },
  { value: "fl", label: "Florida" },
  { value: "il", label: "Illinois" },
  // Add more states as needed
]

export default function SearchBar() {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState("")
  const [state, setState] = useState("all")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    navigate(`/bills?keyword=${keyword}&state=${state}`)
  }

  return (
    <form onSubmit={handleSearch} className="flex w-full flex-col gap-4 md:flex-row">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search bills by keyword..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
      <select
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:w-[180px]"
      >
        {states.map((state) => (
          <option key={state.value} value={state.value}>
            {state.label}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-full md:w-auto"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
        Search
      </button>
    </form>
  )
}
