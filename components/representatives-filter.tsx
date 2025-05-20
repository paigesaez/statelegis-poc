"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Filter } from "lucide-react"
import { getStates } from "@/lib/data-service"
import type { State } from "@/lib/data-service"

const parties = [
  { value: "all", label: "All Parties" },
  { value: "democratic", label: "Democratic" },
  { value: "republican", label: "Republican" },
  { value: "independent", label: "Independent" },
]

const FormSchema = z.object({
  state: z.string(),
  party: z.string(),
  activeOnly: z.boolean(),
})

export function RepresentativesFilter() {
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
      party: searchParams.get("party") || "all",
      activeOnly: searchParams.get("activeOnly") === "true",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const params = new URLSearchParams()

    if (data.state !== "all") params.set("state", data.state)
    if (data.party !== "all") params.set("party", data.party)
    if (data.activeOnly) params.set("activeOnly", "true")

    router.push(`/representatives?${params.toString()}`)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
            name="party"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Party</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select party" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {parties.map((party) => (
                      <SelectItem key={party.value} value={party.value}>
                        {party.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="activeOnly"
            render={({ field }) => (
              <FormItem className="flex flex-row items-end space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>Active Representatives Only</FormLabel>
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
