import { Link } from "react-router-dom"

// Mock data for recent legislative sessions
const recentSessions = [
  {
    id: 1,
    state: "California",
    name: "2023-2024 Regular Session",
    startDate: "2023-01-04",
    endDate: "2024-08-31",
    status: "In Progress",
  },
  {
    id: 2,
    state: "New York",
    name: "2023 Regular Session",
    startDate: "2023-01-04",
    endDate: "2023-06-10",
    status: "Completed",
  },
  {
    id: 3,
    state: "Texas",
    name: "88th Legislature Regular Session",
    startDate: "2023-01-10",
    endDate: "2023-05-29",
    status: "Completed",
  },
  {
    id: 4,
    state: "Florida",
    name: "2023 Regular Session",
    startDate: "2023-03-07",
    endDate: "2023-05-05",
    status: "Completed",
  },
  {
    id: 5,
    state: "Illinois",
    name: "103rd General Assembly",
    startDate: "2023-01-11",
    endDate: "2024-01-10",
    status: "In Progress",
  },
  {
    id: 6,
    state: "Pennsylvania",
    name: "2023-2024 Regular Session",
    startDate: "2023-01-03",
    endDate: "2024-11-30",
    status: "In Progress",
  },
]

export default function RecentSessions() {
  return (
    <div className="rounded-lg border shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">Recent Legislative Sessions</h3>
      </div>
      <div className="p-6 pt-0">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recentSessions.map((session) => (
            <Link key={session.id} to={`/bills?state=${session.state.toLowerCase()}`} className="block">
              <div className="rounded-lg border p-4 transition-colors hover:bg-muted">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{session.state}</h3>
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                      session.status === "In Progress"
                        ? "border-transparent bg-primary text-primary-foreground"
                        : "border-transparent bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {session.status}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{session.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {new Date(session.startDate).toLocaleDateString()} - {new Date(session.endDate).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
