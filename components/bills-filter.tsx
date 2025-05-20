"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { CalendarIcon, Filter } from "lucide-react"
import { cn } from "@/lib/utils"
import { getStates } from "@/lib/data-service"
import type { State } from "@/lib/data-service"

const statuses = [
  { value: "all", label: "All Statuses" },
  { value: "introduced", label: "Introduced" },
  { value: "in_committee", label: "In Committee" },
  { value: "passed", label: "Passed" },
  { value: "failed", label: "Failed" },
  { value: "vetoed", label: "Vetoed" },
  { value: "enacted", label: "Enacted" },
]

const FormSchema = z.object({
  state: z.string(),
  status: z.string(),
  fromDate: z.date().optional(),
  toDate: z.date().optional(),
})

export function BillsFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [states, setStates] = useState<State[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadStates() {
      try {
        const statesData = await getStates()
        setStates(statesData)
      } catch (error) {
        console.error("Error loading states:", error)
        // Fallback to a minimal set of states
        setStates([
          { value: "all", label: "All States" },
          { value: "ca", label: "California" },
          { value: "ny", label: "New York" },
          { value: "tx", label: "Texas" },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    loadStates()
  }, [])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      state: searchParams.get("state") || "all",
      status: searchParams.get("status") || "all",
      fromDate: searchParams.get("fromDate") ? new Date(searchParams.get("fromDate") as string) : undefined,
      toDate: searchParams.get("toDate") ? new Date(searchParams.get("toDate") as string) : undefined,
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const params = new URLSearchParams()

    if (data.state !== "all") params.set("state", data.state)
    if (data.status !== "all") params.set("status", data.status)
    if (data.fromDate) params.set("fromDate", data.fromDate.toISOString().split("T")[0])
    if (data.toDate) params.set("toDate", data.toDate.toISOString().split("T")[0])

    router.push(`/bills?${params.toString()}`)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={isLoading ? "Loading..." : "Select state"} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state.value} value={state.value}>
                        {state.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fromDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>From Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="toDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>To Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full md:w-auto">
          <Filter className="mr-2 h-4 w-4" />
          Apply Filters
        </Button>
      </form>
    </Form>
  )
}
