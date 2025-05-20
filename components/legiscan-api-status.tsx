"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react"
import { LEGISCAN_API_KEY } from "@/lib/env"

export function LegiScanApiStatus() {
  const [status, setStatus] = useState<"loading" | "success" | "error" | "missing-key">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    async function checkApiStatus() {
      try {
        // First check if API key is available
        if (!LEGISCAN_API_KEY) {
          setStatus("missing-key")
          setMessage("LegiScan API key is not configured. Please check your environment variables.")
          return
        }

        // Use a simple fetch directly to avoid circular dependencies
        const response = await fetch("/api/legiscan?op=getSessionList&state=CA")

        // Check for HTTP errors
        if (!response.ok) {
          let errorMessage = `HTTP error: ${response.status} ${response.statusText}`

          try {
            const errorData = await response.json()
            if (errorData.error) {
              errorMessage = errorData.error
            }
          } catch (e) {
            // If we can't parse the error as JSON, just use the status text
          }

          throw new Error(errorMessage)
        }

        // Parse the response
        const data = await response.json()

        if (data.status === "OK") {
          setStatus("success")
          setMessage("LegiScan API is connected and working properly.")
        } else if (data.status === "ERROR") {
          throw new Error(`LegiScan API error: ${data.alert || "Unknown error"}`)
        } else {
          throw new Error("Unexpected response from LegiScan API")
        }
      } catch (error) {
        console.error("Error checking LegiScan API status:", error)
        setStatus("error")
        setMessage(`Failed to connect to LegiScan API: ${error instanceof Error ? error.message : String(error)}`)
      }
    }

    checkApiStatus()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>LegiScan API Status</CardTitle>
        <CardDescription>Checking connection to the LegiScan API</CardDescription>
      </CardHeader>
      <CardContent>
        {status === "loading" && (
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            <p>Checking API connection...</p>
          </div>
        )}

        {status === "success" && (
          <Alert variant="default" className="bg-success/10 border-success/50">
            <CheckCircle className="h-4 w-4 text-success" />
            <AlertTitle>Connected</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {status === "missing-key" && (
          <Alert
            variant="default"
            className="bg-yellow-100 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-900/30"
          >
            <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
            <AlertTitle>API Key Missing</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {status === "error" && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Connection Error</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <div className="flex items-center space-x-2">
          <Badge
            variant={
              status === "success"
                ? "success"
                : status === "error"
                  ? "destructive"
                  : status === "missing-key"
                    ? "outline"
                    : "secondary"
            }
          >
            {status === "loading"
              ? "Checking..."
              : status === "success"
                ? "Connected"
                : status === "missing-key"
                  ? "API Key Missing"
                  : "Error"}
          </Badge>
          {status !== "loading" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setStatus("loading")
                setTimeout(() => {
                  window.location.reload()
                }, 500)
              }}
            >
              Retry
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
