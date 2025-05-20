"use client"

import React from "react"
import { Button } from "@/components/ui/button"

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo)
    this.setState({ errorInfo })

    // You could send this to a logging service in production
    if (process.env.NODE_ENV === "production") {
      // Example: sendToErrorReporting(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
          <h2 className="mb-2 text-2xl font-bold">Something went wrong</h2>
          <p className="mb-6 text-muted-foreground">We apologize for the inconvenience. Please try again later.</p>
          <div className="space-y-4">
            <Button onClick={() => this.setState({ hasError: false })}>Try again</Button>
            <Button variant="outline" onClick={() => (window.location.href = "/")}>
              Return to home page
            </Button>
          </div>
          {process.env.NODE_ENV !== "production" && this.state.error && (
            <div className="mt-6 max-w-full overflow-auto rounded border bg-muted p-4 text-left">
              <p className="font-mono text-sm text-red-500">{this.state.error.toString()}</p>
              {this.state.errorInfo && (
                <pre className="mt-2 text-xs text-muted-foreground">{this.state.errorInfo.componentStack}</pre>
              )}
            </div>
          )}
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
