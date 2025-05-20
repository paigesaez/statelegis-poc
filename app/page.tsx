import { SearchBar } from "@/components/search-bar"
import { RecentSessions } from "@/components/recent-sessions"
import { LegiScanApiStatus } from "@/components/legiscan-api-status"

export default function Home() {
  return (
    <div className="container space-y-8 py-8 md:py-12 lg:py-16">
      <section className="space-y-4 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">U.S. Legislative Data Browser</h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Search and browse legislative data from across the United States.
        </p>
      </section>

      <section className="mx-auto max-w-3xl">
        <SearchBar />
      </section>

      <section className="mx-auto max-w-3xl">
        <LegiScanApiStatus />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tighter">Recent Legislative Sessions</h2>
        <RecentSessions />
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-6">
          <h3 className="text-xl font-bold">Browse Bills</h3>
          <p className="mt-2 text-muted-foreground">Search and filter bills by state, status, and date range.</p>
        </div>
        <div className="rounded-lg border p-6">
          <h3 className="text-xl font-bold">Find Representatives</h3>
          <p className="mt-2 text-muted-foreground">
            Discover information about legislators and their sponsored bills.
          </p>
        </div>
        <div className="rounded-lg border p-6">
          <h3 className="text-xl font-bold">Track Legislation</h3>
          <p className="mt-2 text-muted-foreground">
            Follow the progress of important bills through the legislative process.
          </p>
        </div>
      </section>
    </div>
  )
}
