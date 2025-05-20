"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export type CalendarProps = {
  mode?: "single"
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  className?: string
  initialFocus?: boolean
}

function Calendar({ className, selected, onSelect, mode = "single" }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(() => {
    return selected ? new Date(selected) : new Date()
  })

  React.useEffect(() => {
    if (selected) {
      setCurrentMonth(new Date(selected))
    }
  }, [selected])

  // Set to first day of month and get the day of week
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
  const startingDayOfWeek = firstDayOfMonth.getDay()

  // Get days in month
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()

  // Get days from previous month to fill the first week
  const daysFromPrevMonth = startingDayOfWeek

  // Previous month's days
  const prevMonthDays = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0).getDate()

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
  }

  const handleSelectDate = (day: number) => {
    if (onSelect) {
      const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      onSelect(newDate)
    }
  }

  const isSelected = (day: number) => {
    if (!selected) return false
    return (
      selected.getDate() === day &&
      selected.getMonth() === currentMonth.getMonth() &&
      selected.getFullYear() === currentMonth.getFullYear()
    )
  }

  const isToday = (day: number) => {
    const today = new Date()
    return (
      today.getDate() === day &&
      today.getMonth() === currentMonth.getMonth() &&
      today.getFullYear() === currentMonth.getFullYear()
    )
  }

  const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

  const renderDays = () => {
    const days = []

    // Previous month days
    for (let i = 0; i < daysFromPrevMonth; i++) {
      const day = prevMonthDays - daysFromPrevMonth + i + 1
      days.push(
        <Button
          key={`prev-${day}`}
          variant="ghost"
          className="h-9 w-9 p-0 font-normal text-muted-foreground opacity-50"
          disabled
        >
          {day}
        </Button>,
      )
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <Button
          key={`current-${day}`}
          variant="ghost"
          className={cn(
            "h-9 w-9 p-0 font-normal",
            isSelected(day) && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
            isToday(day) && !isSelected(day) && "bg-accent text-accent-foreground",
          )}
          onClick={() => handleSelectDate(day)}
        >
          {day}
        </Button>,
      )
    }

    // Fill remaining slots in the last week
    const totalDaysDisplayed = days.length
    const remainingSlots = 42 - totalDaysDisplayed // 6 rows of 7 days

    for (let day = 1; day <= remainingSlots; day++) {
      days.push(
        <Button
          key={`next-${day}`}
          variant="ghost"
          className="h-9 w-9 p-0 font-normal text-muted-foreground opacity-50"
          disabled
        >
          {day}
        </Button>,
      )
    }

    return days
  }

  return (
    <div className={cn("p-3", className)}>
      <div className="flex justify-center pt-1 relative items-center">
        <div className="text-sm font-medium">
          {currentMonth.toLocaleString("default", { month: "long" })} {currentMonth.getFullYear()}
        </div>
        <div className="space-x-1 flex items-center">
          <Button
            variant="outline"
            className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1"
            onClick={handlePrevMonth}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1"
            onClick={handleNextMonth}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1">
        {weekdays.map((day) => (
          <div key={day} className="text-center text-muted-foreground text-xs">
            {day}
          </div>
        ))}
        {renderDays()}
      </div>
    </div>
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
