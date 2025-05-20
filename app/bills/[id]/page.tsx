import Link from "next/link"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, FileText, Users } from "lucide-react"

// Mock data for bill details
const mockBills = [
  {
    id: "ca-sb1",
    number: "SB 1",
    title: "California Environmental Quality Act: housing and land use",
    state: "California",
    status: "Passed",
    lastAction: "Signed by Governor",
    lastActionDate: "2023-10-10",
    sponsors: [{ id: "ca-sen-wiener", name: "Senator Scott Wiener", party: "Democratic", district: "11" }],
    summary:
      "This bill would make various changes to the California Environmental Quality Act (CEQA) to facilitate the development of housing. It would exempt certain housing projects from CEQA review, streamline the CEQA process for housing projects, and limit the grounds upon which a court could invalidate a housing project's approval under CEQA.",
    history: [
      { date: "2022-12-05", action: "Introduced" },
      { date: "2023-01-12", action: "Referred to Committee on Environmental Quality" },
      { date: "2023-03-15", action: "Passed Committee (5-2)" },
      { date: "2023-04-20", action: "Passed Senate (28-12)" },
      { date: "2023-05-18", action: "Referred to Assembly Committee on Natural Resources" },
      { date: "2023-06-22", action: "Passed Committee (7-3)" },
      { date: "2023-07-15", action: "Passed Assembly (54-19)" },
      { date: "2023-07-20", action: "Returned to Senate" },
      { date: "2023-08-01", action: "Senate concurred in Assembly amendments (27-13)" },
      { date: "2023-08-10", action: "Enrolled and presented to Governor" },
      { date: "2023-10-10", action: "Signed by Governor. Chapter 310, Statutes of 2023." },
    ],
    fullText:
      'SECTION 1. The Legislature finds and declares all of the following:\n(a) California is experiencing a housing supply crisis, with housing demand far outstripping supply.\n(b) The California Environmental Quality Act (Division 13 (commencing with Section 21000) of the Public Resources Code) (CEQA) can be misused to impede the development of housing, including affordable housing.\n(c) It is the intent of the Legislature to streamline the CEQA process for housing projects while maintaining environmental protections.\n\nSECTION 2. Section 21080.XX is added to the Public Resources Code, to read:\n21080.XX. (a) This division does not apply to a housing development project that meets all of the following requirements:\n(1) The project is located on an infill site.\n(2) The project is located in an urbanized area.\n(3) The project consists of at least 50 percent residential use.\n(4) The project includes at least 10 percent affordable housing units.\n(b) For purposes of this section, the following definitions apply:\n(1) "Affordable housing unit" means a unit that is made available at an affordable rent, as defined in Section 50053 of the Health and Safety Code, to a household earning no more than 80 percent of the area median income.\n(2) "Infill site" means a site that meets the criteria specified in Section 21061.3.\n(3) "Urbanized area" means an area that meets the criteria specified in Section 21071.',
    committees: [
      "Senate Committee on Environmental Quality",
      "Senate Committee on Housing",
      "Assembly Committee on Natural Resources",
      "Assembly Committee on Housing and Community Development",
    ],
  },
  // Add more mock bills as needed
]

export default function BillDetailPage({ params }: { params: { id: string } }) {
  const bill = mockBills.find((b) => b.id === params.id)

  if (!bill) {
    notFound()
  }

  const statusVariant =
    bill.status === "Passed"
      ? "success"
      : bill.status === "Failed"
        ? "destructive"
        : bill.status === "Introduced"
          ? "default"
          : "secondary"

  return (
    <div className="container space-y-6 py-8">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/bills">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Bills
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{bill.state}</p>
                  <CardTitle className="text-2xl">{bill.number}</CardTitle>
                </div>
                <Badge variant={statusVariant as "default" | "secondary" | "destructive" | "success"} className="w-fit">
                  {bill.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <h2 className="text-xl font-semibold">{bill.title}</h2>

              <div>
                <h3 className="font-medium">Summary</h3>
                <p className="mt-1 text-muted-foreground">{bill.summary}</p>
              </div>

              <div>
                <h3 className="font-medium">Last Action</h3>
                <p className="mt-1 text-muted-foreground">
                  {bill.lastAction} ({new Date(bill.lastActionDate).toLocaleDateString()})
                </p>
              </div>

              <Tabs defaultValue="history">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="text">Full Text</TabsTrigger>
                  <TabsTrigger value="committees">Committees</TabsTrigger>
                </TabsList>

                <TabsContent value="history" className="space-y-4">
                  <div className="mt-4 space-y-4">
                    {bill.history.map((event, index) => (
                      <div key={index} className="flex gap-4 border-l-2 border-muted pl-4">
                        <div className="min-w-[100px] text-sm text-muted-foreground">
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                        <div className="text-sm">{event.action}</div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="text">
                  <div className="mt-4 rounded-md border p-4">
                    <pre className="whitespace-pre-wrap text-sm">{bill.fullText}</pre>
                  </div>
                </TabsContent>

                <TabsContent value="committees">
                  <div className="mt-4 space-y-2">
                    {bill.committees.map((committee, index) => (
                      <div key={index} className="rounded-md border p-3">
                        {committee}
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Sponsors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bill.sponsors.map((sponsor) => (
                  <div key={sponsor.id} className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      {sponsor.name.charAt(0)}
                    </div>
                    <div>
                      <Link href={`/representatives/${sponsor.id}`} className="font-medium hover:underline">
                        {sponsor.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {sponsor.party}, District {sponsor.district}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Bill Text (PDF)
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Analysis (PDF)
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Vote History (PDF)
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
