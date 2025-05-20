import { cn } from "@/lib/utils"

interface TestComponentProps {
  className?: string
}

export default function TestComponent({ className }: TestComponentProps) {
  return <div className={cn("bg-gray-100 p-4 rounded", className)}>This component uses the cn utility function</div>
}
