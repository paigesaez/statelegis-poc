import { RepresentativesFilter } from "@/components/representatives-filter"
import { RepresentativeCard, type RepresentativeProps } from "@/components/representative-card"
import { Pagination } from "@/components/pagination"

// Mock data for representatives
const mockRepresentatives: RepresentativeProps[] = [
  {
    id: "ca-sen-wiener",
    name: "Scott Wiener",
    state: "California",
    district: "11",
    party: "Democratic",
    active: true,
    committees: ["Housing Committee", "Environmental Quality Committee", "Judiciary Committee"],
    billsSponsored: 42,
  },
  {
    id: "ny-asm-gottfried",
    name: "Richard Gottfried",
    state: "New York",
    district: "75",
    party: "Democratic",
    active: false,
    committees: ["Health Committee", "Judiciary Committee"],
    billsSponsored: 87,
  },
  {
    id: "tx-rep-bonnen",
    name: "Greg Bonnen",
    state: "Texas",
    district: "24",
    party: "Republican",
    active: true,
    committees: ["Appropriations Committee", "Public Health Committee"],
    billsSponsored: 31,
  },
  {
    id: "fl-sen-simon",
    name: "Corey Simon",
    state: "Florida",
    district: "3",
    party: "Republican",
    active: true,
    committees: ["Education Committee", "Children, Families, and Elder Affairs Committee"],
    billsSponsored: 12,
  },
  {
    id: "il-rep-harris",
    name: "Gregory Harris",
    state: "Illinois",
    district: "13",
    party: "Democratic",
    active: false,
    committees: ["Appropriations Committee", "Human Services Committee"],
    billsSponsored: 65,
  },
  {
    id: "pa-rep-klunk",
    name: "Kate Klunk",
    state: "Pennsylvania",
    district: "169",
    party: "Republican",
    active: true,
    committees: ["Labor and Industry Committee", "Children and Youth Committee"],
    billsSponsored: 28,
  },
  {
    id: "ca-asm-haney",
    name: "Matt Haney",
    state: "California",
    district: "17",
    party: "Democratic",
    active: true,
    committees: ["Housing and Community Development Committee", "Budget Committee"],
    billsSponsored: 19,
  },
  {
    id: "ny-sen-hoylman",
    name: "Brad Hoylman-Sigal",
    state: "New York",
    district: "47",
    party: "Democratic",
    active: true,
    committees: ["Judiciary Committee", "Environmental Conservation Committee"],
    billsSponsored: 53,
  },
]

interface RepresentativesPageProps {
  searchParams: {
    page?: string
    perPage?: string
    state?: string
    party?: string
    activeOnly?: string
  }
}

export default function RepresentativesPage({ searchParams }: RepresentativesPageProps) {
  const page = Number(searchParams.page) || 1
  const perPage = Number(searchParams.perPage) || 10
  const state = searchParams.state || "all"
  const party = searchParams.party || "all"
  const activeOnly = searchParams.activeOnly === "true"

  // Filter representatives based on search params
  let filteredRepresentatives = [...mockRepresentatives]

  if (state !== "all") {
    filteredRepresentatives = filteredRepresentatives.filter((rep) => rep.state.toLowerCase() === state.toLowerCase())
  }

  if (party !== "all") {
    filteredRepresentatives = filteredRepresentatives.filter((rep) => rep.party.toLowerCase() === party.toLowerCase())
  }

  if (activeOnly) {
    filteredRepresentatives = filteredRepresentatives.filter((rep) => rep.active)
  }

  // Paginate representatives
  const totalItems = filteredRepresentatives.length
  const paginatedRepresentatives = filteredRepresentatives.slice((page - 1) * perPage, page * perPage)

  return (
    <div className="container space-y-6 py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Representatives</h1>
        <p className="text-muted-foreground">Browse and search legislators across the United States.</p>
      </div>

      <RepresentativesFilter />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {paginatedRepresentatives.map((representative) => (
          <RepresentativeCard key={representative.id} representative={representative} />
        ))}
      </div>

      {filteredRepresentatives.length === 0 && (
        <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed">
          <p className="text-muted-foreground">No representatives found matching your criteria.</p>
        </div>
      )}

      {filteredRepresentatives.length > 0 && (
        <Pagination totalItems={totalItems} itemsPerPage={perPage} currentPage={page} />
      )}
    </div>
  )
}
