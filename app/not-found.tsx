import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container flex min-h-[400px] flex-col items-center justify-center py-8">
      <h2 className="mb-2 text-2xl font-bold">Page Not Found</h2>
      <p className="mb-6 text-muted-foreground">The page you are looking for does not exist or has been moved.</p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  )
}
