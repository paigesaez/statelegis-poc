import { BillsFilter } from "@/components/bills-filter"
import { BillCard, type BillProps } from "@/components/bill-card"
import { Pagination } from "@/components/pagination"
import { getBills } from "@/lib/data-service"
import { Suspense } from "react"
import { Loader2 } from "lucide-react"

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

export default async function BillsPage({ searchParams }: BillsPageProps) {
  const page = Number(searchParams.page) || 1
  const perPage = Number(searchParams.perPage) || 10
  const state = searchParams.state || "all"
  const status = searchParams.status || "all"
  const keyword = searchParams.keyword || ""
  const fromDate = searchParams.fromDate
  const toDate = searchParams.toDate

  // Fetch bills with filters
  const { bills, total } = await getBills({
    state,
    status,
    fromDate,
    toDate,
    keyword,
    page,
    perPage,
  })

  // Convert to BillProps format
  const billProps: BillProps[] = bills.map((bill) => ({
    id: bill.id,
    number: bill.number,
    title: bill.title,
    state: bill.state,
    status: bill.status,
    lastAction: bill.last_action,
    lastActionDate: bill.last_action_date,
    sponsors: bill.sponsors.map((sponsor) => sponsor.name),
  }))

  return (
    <div className="container space-y-6 py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bills</h1>
        <p className="text-muted-foreground">Browse and search legislative bills across the United States.</p>
      </div>

      <BillsFilter />

      <Suspense
        fallback={
          <div className="flex h-[400px] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        }
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {billProps.map((bill) => (
            <BillCard key={bill.id} bill={bill} />
          ))}
        </div>

        {billProps.length === 0 && (
          <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed">
            <p className="text-muted-foreground">No bills found matching your criteria.</p>
          </div>
        )}

        {billProps.length > 0 && <Pagination totalItems={total} itemsPerPage={perPage} currentPage={page} />}
      </Suspense>
    </div>
  )
}
