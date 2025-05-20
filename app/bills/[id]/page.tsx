import Link from "next/link"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, FileText, Users } from "lucide-react"
import { getBillById } from "@/lib/data-service"

export default async function BillDetailPage({ params }: { params: { id: string } }) {
  const bill = await getBillById(params.id)

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
                <p className="mt-1 text-muted-foreground">{bill.description}</p>
              </div>

              <div>
                <h3 className="font-medium">Last Action</h3>
                <p className="mt-1 text-muted-foreground">
                  {bill.last_action} ({new Date(bill.last_action_date).toLocaleDateString()})
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
                    <pre className="whitespace-pre-wrap text-sm">{bill.full_text || "Full text not available"}</pre>
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
