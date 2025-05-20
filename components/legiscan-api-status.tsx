"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from "lucide-react"
import { getApiUrl } from "@/lib/legiscan-api"

export function LegiScanApiStatus() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    async function checkApiStatus() {
      try {
        const url = await getApiUrl("getSessionList", { state: "CA" })
        const response = await fetch(url)

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`)
        }

        const data = await response.json()

        if (data.status === "OK") {
          setStatus("success")
          setMessage("LegiScan API is connected and working properly.")
        } else {
          setStatus("error")
          setMessage(`API returned error: ${data.alert || "Unknown error"}`)
        }
      } catch (error) {
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
          <Badge variant={status === "success" ? "success" : status === "error" ? "destructive" : "secondary"}>
            {status === "loading" ? "Checking..." : status === "success" ? "Connected" : "Error"}
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
