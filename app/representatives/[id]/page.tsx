import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BillCard } from "@/components/bill-card"
import { ChevronLeft, Mail, MapPin, Phone } from "lucide-react"
import { getRepresentativeById } from "@/lib/data-service"

export default async function RepresentativeDetailPage({ params }: { params: { id: string } }) {
  const representative = await getRepresentativeById(params.id)

  if (!representative) {
    notFound()
  }

  const partyColor =
    representative.party === "Democratic"
      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      : representative.party === "Republican"
        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
        : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"

  return (
    <div className="container space-y-6 py-8">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/representatives">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Representatives
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="h-24 w-24 overflow-hidden rounded-full bg-muted sm:h-32 sm:w-32">
                {representative.imageUrl ? (
                  <Image
                    src={representative.imageUrl || "/placeholder.svg"}
                    alt={representative.name}
                    width={128}
                    height={128}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-3xl font-bold">
                    {representative.name.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{representative.name}</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge variant="outline" className={partyColor}>
                    {representative.party}
                  </Badge>
                  {!representative.active && <Badge variant="outline">Inactive</Badge>}
                </div>
                <p className="mt-2 text-muted-foreground">
                  {representative.state}, District {representative.district}
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Biography</h3>
                <p className="mt-1 text-muted-foreground">{representative.bio}</p>
              </div>

              <Tabs defaultValue="committees">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="committees">Committees</TabsTrigger>
                  <TabsTrigger value="contact">Contact Information</TabsTrigger>
                </TabsList>

                <TabsContent value="committees" className="space-y-4">
                  <div className="mt-4 space-y-2">
                    {representative.committees.map((committee, index) => (
                      <div key={index} className="rounded-md border p-3">
                        {committee}
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="contact">
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <span>{representative.contact.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <span>{representative.contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <span>{representative.contact.office}</span>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span>{representative.contact.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span>{representative.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span>{representative.contact.office}</span>
              </div>
              <Button className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                Contact Representative
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Sponsored Bills</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {representative.sponsoredBills.map((bill) => (
            <BillCard key={bill.id} bill={bill} />
          ))}
        </div>
      </div>
    </div>
  )
}
