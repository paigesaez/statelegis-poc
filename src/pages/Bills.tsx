"use client"

import { useSearchParams } from "react-router-dom"

export default function Bills() {
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get("keyword") || ""
  const state = searchParams.get("state") || "all"

  return (
    <div className="container space-y-6 py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bills</h1>
        <p className="text-muted-foreground">Browse and search legislative bills across the United States.</p>
      </div>

      <div>
        <p>Showing results for:</p>
        <ul>
          <li>Keyword: {keyword || "None"}</li>
          <li>State: {state}</li>
        </ul>
      </div>

      <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed">
        <p className="text-muted-foreground">Bills list will be implemented here.</p>
      </div>
    </div>
  )
}
