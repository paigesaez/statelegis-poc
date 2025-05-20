import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export interface BillProps {
  id: string
  number: string
  title: string
  state: string
  status: string
  lastAction: string
  lastActionDate: string
  sponsors: string[]
}

export function BillCard({ bill }: { bill: BillProps }) {
  const statusVariant =
    bill.status === "Passed"
      ? "success"
      : bill.status === "Failed"
        ? "destructive"
        : bill.status === "Introduced"
          ? "default"
          : "secondary"

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{bill.state}</p>
            <CardTitle className="mt-1 text-lg">
              <Link href={`/bills/${bill.id}`} className="hover:underline">
                {bill.number}
              </Link>
            </CardTitle>
          </div>
          <Badge variant={statusVariant as "default" | "secondary" | "destructive" | "success"}>{bill.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="line-clamp-3 text-sm">{bill.title}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start pt-2">
        <p className="text-xs text-muted-foreground">
          <span className="font-medium">Last Action:</span> {bill.lastAction}
        </p>
        <p className="text-xs text-muted-foreground">
          <span className="font-medium">Date:</span> {new Date(bill.lastActionDate).toLocaleDateString()}
        </p>
        {bill.sponsors.length > 0 && (
          <p className="mt-1 text-xs text-muted-foreground">
            <span className="font-medium">Sponsors:</span> {bill.sponsors.join(", ")}
          </p>
        )}
      </CardFooter>
    </Card>
  )
}
