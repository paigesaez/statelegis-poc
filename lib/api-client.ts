/**
 * Safe API client utility to handle fetch requests
 */

export async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, options)

    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
      // Try to get more detailed error information if available
      let errorDetail = ""
      try {
        const errorData = await response.json()
        errorDetail = errorData.error || errorData.message || JSON.stringify(errorData)
      } catch (e) {
        // If we can't parse the error as JSON, just use the status text
        errorDetail = response.statusText
      }

      throw new Error(`API error: ${response.status} ${errorDetail}`)
    }

    // Safely parse JSON
    try {
      const data = await response.json()
      return data as T
    } catch (error) {
      console.error("Error parsing JSON:", error)
      throw new Error("Failed to parse response as JSON")
    }
  } catch (error) {
    console.error("Fetch error:", error)
    throw error
  }
}

export async function get<T>(url: string, options?: RequestInit): Promise<T> {
  return fetchJson<T>(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    ...options,
  })
}

export async function post<T>(url: string, data: any, options?: RequestInit): Promise<T> {
  return fetchJson<T>(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
    ...options,
  })
}
