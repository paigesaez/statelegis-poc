"use client"

import { useParams, Link } from "react-router-dom"

export default function BillDetail() {
  const { id } = useParams()

  return (
    <div className="container space-y-6 py-8">
      <div className="flex items-center gap-2">
        <Link
          to="/bills"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
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
            <path d="m15 18-6-6 6-6"></path>
          </svg>
          Back to Bills
        </Link>
      </div>

      <div className="rounded-lg border shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h2 className="text-2xl font-semibold">Bill Detail</h2>
          <p>ID: {id}</p>
        </div>
        <div className="p-6 pt-0">
          <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed">
            <p className="text-muted-foreground">Bill detail will be implemented here.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
