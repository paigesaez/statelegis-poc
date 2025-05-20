"use client"

import { useState } from "react"
import { Link } from "react-router-dom"

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      >
        <span className="sr-only">Open main menu</span>
        {isOpen ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-16 z-50 mt-2 bg-background p-4 shadow-lg">
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className="text-lg font-medium transition-colors hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/bills"
              className="text-lg font-medium transition-colors hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Bills
            </Link>
            <Link
              to="/representatives"
              className="text-lg font-medium transition-colors hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Representatives
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
