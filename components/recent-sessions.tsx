import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getSessions } from "@/lib/data-service"

export async function RecentSessions() {
  const sessions = await getSessions({})

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Legislative Sessions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sessions.map((session) => (
            <Link key={session.session_id} href={`/bills?state=${session.state_id.toLowerCase()}`} className="block">
              <div className="rounded-lg border p-4 transition-colors hover:bg-muted">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{session.state}</h3>
                  <Badge variant={session.status === "In Progress" ? "default" : "secondary"}>{session.status}</Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{session.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {new Date(session.startDate).toLocaleDateString()} - {new Date(session.endDate).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
