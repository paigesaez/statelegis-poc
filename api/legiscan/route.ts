import { type NextRequest, NextResponse } from "next/server"
import { LEGISCAN_API_KEY } from "@/lib/env"

export async function GET(request: NextRequest) {
  try {
    // Get operation and parameters from query string
    const searchParams = request.nextUrl.searchParams
    const operation = searchParams.get("op")

    if (!operation) {
      return NextResponse.json({ error: "Missing operation parameter" }, { status: 400 })
    }

    // Check if API key is available
    if (!LEGISCAN_API_KEY) {
      console.error("LegiScan API key is not configured")
      return NextResponse.json(
        {
          error: "API key not configured",
          message: "The LegiScan API key is missing. Please check your environment variables.",
        },
        { status: 500 },
      )
    }

    // Build LegiScan API URL
    const baseUrl = "https://api.legiscan.com/"
    const apiParams = new URLSearchParams()

    // Add API key and operation
    apiParams.set("key", LEGISCAN_API_KEY)
    apiParams.set("op", operation)

    // Add all other parameters from the request
    searchParams.forEach((value, key) => {
      if (key !== "op") {
        apiParams.set(key, value)
      }
    })

    const apiUrl = `${baseUrl}?${apiParams.toString()}`
    console.log("Calling LegiScan API:", apiUrl.replace(LEGISCAN_API_KEY, "[REDACTED]"))

    // Make the request to LegiScan
    const response = await fetch(apiUrl)

    if (!response.ok) {
      console.error(`LegiScan API error: ${response.status} ${response.statusText}`)
      return NextResponse.json(
        { error: `LegiScan API error: ${response.status} ${response.statusText}` },
        { status: response.status },
      )
    }

    // Parse the response
    const text = await response.text()
    let data

    try {
      data = JSON.parse(text)
    } catch (error) {
      console.error("Error parsing LegiScan API response:", error)
      console.error("Response text:", text)
      return NextResponse.json({ error: "Failed to parse LegiScan API response" }, { status: 500 })
    }

    if (data.status === "ERROR") {
      console.error("LegiScan API returned error:", data.alert)
      return NextResponse.json({ error: data.alert }, { status: 400 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in LegiScan API route:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}
