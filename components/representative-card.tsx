import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export interface RepresentativeProps {
  id: string
  name: string
  state: string
  district: string
  party: string
  active: boolean
  imageUrl?: string
  committees: string[]
  billsSponsored: number
}

export function RepresentativeCard({ representative }: { representative: RepresentativeProps }) {
  const partyColor =
    representative.party === "Democratic"
      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      : representative.party === "Republican"
        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
        : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="h-16 w-16 overflow-hidden rounded-full bg-muted">
          {representative.imageUrl ? (
            <Image
              src={representative.imageUrl || "/placeholder.svg"}
              alt={representative.name}
              width={64}
              height={64}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xl font-bold">
              {representative.name.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <Link href={`/representatives/${representative.id}`} className="font-semibold hover:underline">
            {representative.name}
          </Link>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className={partyColor}>
              {representative.party}
            </Badge>
            {!representative.active && <Badge variant="outline">Inactive</Badge>}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium">State:</span> {representative.state}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium">District:</span> {representative.district}
        </p>
        {representative.committees.length > 0 && (
          <div className="mt-2">
            <p className="text-sm font-medium">Committees:</p>
            <ul className="mt-1 list-inside list-disc text-sm text-muted-foreground">
              {representative.committees.slice(0, 2).map((committee, index) => (
                <li key={index} className="line-clamp-1">
                  {committee}
                </li>
              ))}
              {representative.committees.length > 2 && (
                <li className="text-sm text-muted-foreground">+{representative.committees.length - 2} more</li>
              )}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium">Bills Sponsored:</span> {representative.billsSponsored}
        </p>
      </CardFooter>
    </Card>
  )
}
