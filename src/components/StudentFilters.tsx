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
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative w-full sm:w-auto">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name or course..."
          className="w-full pl-9 sm:w-64"
        />
      </div>

      <Select value={course} onValueChange={onCourseChange}>
        <SelectTrigger className="w-full sm:w-52">
          <SelectValue placeholder="All courses" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All courses</SelectItem>
          {courses.map((c) => (
            <SelectItem key={c} value={c}>
              {c}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default StudentFilters