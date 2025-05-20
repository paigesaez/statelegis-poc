import { RepresentativesFilter } from "@/components/representatives-filter"
import { RepresentativeCard } from "@/components/representative-card"
import { Pagination } from "@/components/pagination"
import { getRepresentatives } from "@/lib/data-service"
import { Suspense } from "react"
import { Loader2 } from "lucide-react"

interface RepresentativesPageProps {
  searchParams: {
    page?: string
    perPage?: string
    state?: string
    party?: string
    activeOnly?: string
  }
}

export default async function RepresentativesPage({ searchParams }: RepresentativesPageProps) {
  const page = Number(searchParams.page) || 1
  const perPage = Number(searchParams.perPage) || 10
  const state = searchParams.state || "all"
  const party = searchParams.party || "all"
  const activeOnly = searchParams.activeOnly === "true"

  // Fetch representatives with filters
  const { representatives, total } = await getRepresentatives({
    state,
    party,
    activeOnly,
    page,
    perPage,
  })

  return (
    <div className="container space-y-6 py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Representatives</h1>
        <p className="text-muted-foreground">Browse and search legislators across the United States.</p>
      </div>

      <RepresentativesFilter />

      <Suspense
        fallback={
          <div className="flex h-[400px] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        }
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {representatives.map((representative) => (
            <RepresentativeCard key={representative.id} representative={representative} />
          ))}
        </div>

        {representatives.length === 0 && (
          <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed">
            <p className="text-muted-foreground">No representatives found matching your criteria.</p>
          </div>
        )}

        {representatives.length > 0 && <Pagination totalItems={total} itemsPerPage={perPage} currentPage={page} />}
      </Suspense>
    </div>
  )
}
