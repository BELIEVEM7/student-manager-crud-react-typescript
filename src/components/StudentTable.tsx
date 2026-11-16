import { Pencil, Trash2 } from 'lucide-react'
import type { Student } from '@/types/student'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface StudentTableProps {
  students: Student[]
  onEdit: (student: Student) => void
  onDelete: (student: Student) => void
}

function StudentTable({ students, onEdit, onDelete }: StudentTableProps) {
  // One empty state for both layouts
  if (students.length === 0) {
    return (
      <div className="rounded-lg border bg-white p-8 text-center text-gray-500 shadow-sm">
        No students found.
      </div>
    )
  }

  return (
    <>
      {/* Tablet and desktop: table */}
      <div className="hidden rounded-lg border bg-white shadow-sm md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Course</TableHead>
              <TableHead className="text-right">Grade</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.course}</TableCell>
                <TableCell className="text-right">{student.grade}%</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => onEdit(student)}>
                      <Pencil className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => onDelete(student)}>
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile: cards */}
      <ul className="space-y-3 md:hidden">
        {students.map((student) => (
          <li key={student.id} className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-medium text-gray-900">{student.name}</p>
                <p className="truncate text-sm text-gray-500">{student.email}</p>
              </div>
              <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-0.5 text-sm font-semibold text-gray-700">
                {student.grade}%
              </span>
            </div>

            <p className="mt-2 text-sm text-gray-600">
              <span className="text-gray-400">#{student.id}</span> · {student.course}
            </p>

            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm" className="flex-1" onClick={() => onEdit(student)}>
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
              <Button variant="destructive" size="sm" className="flex-1" onClick={() => onDelete(student)}>
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default StudentTable