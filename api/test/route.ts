import { NextResponse } from "next/server"

// A simple test endpoint to verify API routes are working
export async function GET() {
  return NextResponse.json({ status: "OK", message: "API test endpoint is working" })
}
