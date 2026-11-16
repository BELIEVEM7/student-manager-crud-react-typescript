import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface StudentFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  course: string
  onCourseChange: (value: string) => void
  courses: string[]
}

function StudentFilters({
  search,
  onSearchChange,
  course,
  onCourseChange,
  courses,
}: StudentFiltersProps) {
  // Tells the Select which label to display for each value
  const items = [
    { value: 'all', label: 'All courses' },
    ...courses.map((c) => ({ value: c, label: c })),
  ]

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative w-full sm:w-64">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name or course..."
          className="w-full pl-9"
        />
      </div>

      <Select
        value={course}
        items={items}
        onValueChange={(value) => onCourseChange(value ?? 'all')}
      >
        <SelectTrigger className="w-full sm:w-52">
          <SelectValue placeholder="All courses" />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default StudentFilters