import { BillsFilter } from "@/components/bills-filter"
import { BillCard, type BillProps } from "@/components/bill-card"
import { Pagination } from "@/components/pagination"

// Mock data for bills
const mockBills: BillProps[] = [
  {
    id: "ca-sb1",
    number: "SB 1",
    title: "California Environmental Quality Act: housing and land use",
    state: "California",
    status: "Passed",
    lastAction: "Signed by Governor",
    lastActionDate: "2023-10-10",
    sponsors: ["Senator Scott Wiener"],
  },
  {
    id: "ny-a1",
    number: "A 1",
    title: "Relates to establishing the New York health act and to making appropriations therefor",
    state: "New York",
    status: "In Committee",
    lastAction: "Referred to Health Committee",
    lastActionDate: "2023-01-04",
    sponsors: ["Assemblymember Richard Gottfried", "Assemblymember Jessica González-Rojas"],
  },
  {
    id: "tx-hb1",
    number: "HB 1",
    title: "General Appropriations Bill",
    state: "Texas",
    status: "Passed",
    lastAction: "Signed by Governor",
    lastActionDate: "2023-05-29",
    sponsors: ["Representative Greg Bonnen"],
  },
  {
    id: "fl-sb1",
    number: "SB 1",
    title: "Relating to Child Welfare",
    state: "Florida",
    status: "Introduced",
    lastAction: "Introduced",
    lastActionDate: "2023-03-07",
    sponsors: ["Senator Corey Simon"],
  },
  {
    id: "il-hb1",
    number: "HB 1",
    title: "BUDGET IMPLEMENTATION",
    state: "Illinois",
    status: "Passed",
    lastAction: "Public Act",
    lastActionDate: "2023-06-01",
    sponsors: ["Representative Harris"],
  },
  {
    id: "pa-hb1",
    number: "HB 1",
    title: "An Act providing for competitive integrated employment for individuals with disabilities",
    state: "Pennsylvania",
    status: "Failed",
    lastAction: "Laid on the table",
    lastActionDate: "2023-06-30",
    sponsors: ["Representative Klunk"],
  },
  {
    id: "ca-ab22",
    number: "AB 22",
    title: "Tenant protections: just cause termination: rent caps",
    state: "California",
    status: "In Committee",
    lastAction: "In committee: Set, first hearing. Hearing canceled at the request of author.",
    lastActionDate: "2023-04-26",
    sponsors: ["Assemblymember Matt Haney"],
  },
  {
    id: "ny-s222",
    number: "S 222",
    title:
      "Relates to prohibiting landlords from declining to rent or lease a residential unit to a potential tenant on the sole basis that the potential tenant was previously involved in a landlord-tenant action",
    state: "New York",
    status: "Introduced",
    lastAction: "Referred to Judiciary",
    lastActionDate: "2023-01-04",
    sponsors: ["Senator Brad Hoylman-Sigal"],
  },
]

interface BillsPageProps {
  searchParams: {
    page?: string
    perPage?: string
    state?: string
    status?: string
    fromDate?: string
    toDate?: string
    keyword?: string
  }
}

export default function BillsPage({ searchParams }: BillsPageProps) {
  const page = Number(searchParams.page) || 1
  const perPage = Number(searchParams.perPage) || 10
  const state = searchParams.state || "all"
  const status = searchParams.status || "all"
  const keyword = searchParams.keyword || ""

  // Filter bills based on search params
  let filteredBills = [...mockBills]

  if (state !== "all") {
    filteredBills = filteredBills.filter((bill) => bill.state.toLowerCase() === state.toLowerCase())
  }

  if (status !== "all") {
    filteredBills = filteredBills.filter((bill) => bill.status.toLowerCase() === status.toLowerCase())
  }

  if (keyword) {
    filteredBills = filteredBills.filter(
      (bill) =>
        bill.title.toLowerCase().includes(keyword.toLowerCase()) ||
        bill.number.toLowerCase().includes(keyword.toLowerCase()),
    )
  }

  if (searchParams.fromDate) {
    const fromDate = new Date(searchParams.fromDate)
    filteredBills = filteredBills.filter((bill) => new Date(bill.lastActionDate) >= fromDate)
  }

  if (searchParams.toDate) {
    const toDate = new Date(searchParams.toDate)
    filteredBills = filteredBills.filter((bill) => new Date(bill.lastActionDate) <= toDate)
  }

  // Paginate bills
  const totalItems = filteredBills.length
  const paginatedBills = filteredBills.slice((page - 1) * perPage, page * perPage)

  return (
    <div className="container space-y-6 py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bills</h1>
        <p className="text-muted-foreground">Browse and search legislative bills across the United States.</p>
      </div>

      <BillsFilter />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {paginatedBills.map((bill) => (
          <BillCard key={bill.id} bill={bill} />
        ))}
      </div>

      {filteredBills.length === 0 && (
        <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed">
          <p className="text-muted-foreground">No bills found matching your criteria.</p>
        </div>
      )}

      {filteredBills.length > 0 && <Pagination totalItems={totalItems} itemsPerPage={perPage} currentPage={page} />}
    </div>
  )
}
