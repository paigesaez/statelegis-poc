import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export function MockDataNotice() {
  return (
    <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-900/30">
      <InfoIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      <AlertTitle>Using Mock Data</AlertTitle>
      <AlertDescription>
        This application is currently using mock data. Connect to the LegiScan API to see real legislative data.
      </AlertDescription>
    </Alert>
  )
}
