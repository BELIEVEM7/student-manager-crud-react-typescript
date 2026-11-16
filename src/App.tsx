import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { initialStudents } from './data/students'
import type { Student } from './types/student'
import StudentTable from './components/StudentTable'
import StudentFormDialog from './components/StudentFormDialog'
import type { StudentFormData } from './components/StudentFormDialog'
import DeleteStudentDialog from './components/DeleteStudentDialog'
import DeleteAllDialog from './components/DeleteAllDialog'
import StudentFilters from './components/StudentFilters'
import ExportMenu from './components/ExportMenu'
import { exportToCsv, exportToPdf } from './lib/exportStudents'
import { Button } from '@/components/ui/button'

function App() {
  const [students, setStudents] = useState<Student[]>(initialStudents)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [deletingStudent, setDeletingStudent] = useState<Student | null>(null)
  const [isDeleteAllOpen, setIsDeleteAllOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [courseFilter, setCourseFilter] = useState('all')

  // --- Derived data (calculated from state, not stored) ---
  const courses = Array.from(new Set(students.map((s) => s.course))).sort()
  const activeCourse = courses.includes(courseFilter) ? courseFilter : 'all'

  const query = search.trim().toLowerCase()
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      query === '' ||
      s.name.toLowerCase().includes(query) ||
      s.course.toLowerCase().includes(query)
    const matchesCourse = activeCourse === 'all' || s.course === activeCourse
    return matchesSearch && matchesCourse
  })

  // --- Add / Edit ---
  function openAddForm() {
    setEditingStudent(null)
    setIsFormOpen(true)
  }

  function openEditForm(student: Student) {
    setEditingStudent(student)
    setIsFormOpen(true)
  }

  function closeForm() {
    setIsFormOpen(false)
    setEditingStudent(null)
  }

  function handleSave(data: StudentFormData) {
    if (editingStudent) {
      setStudents(
        students.map((s) => (s.id === editingStudent.id ? { ...s, ...data } : s))
      )
    } else {
      const nextId = students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1
      setStudents([...students, { id: nextId, ...data }])
    }
    closeForm()
  }

  // --- Delete one / Delete all ---
  function handleConfirmDelete() {
    if (deletingStudent) {
      setStudents(students.filter((s) => s.id !== deletingStudent.id))
    }
    setDeletingStudent(null)
  }

  function handleConfirmDeleteAll() {
    setStudents([])
    setIsDeleteAllOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Student Manager</h1>
          <Button onClick={openAddForm}>
            <Plus className="h-4 w-4" />
            Add Student
          </Button>
        </div>

        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <StudentFilters
            search={search}
            onSearchChange={setSearch}
            course={activeCourse}
            onCourseChange={setCourseFilter}
            courses={courses}
          />
          <div className="flex gap-2">
            <ExportMenu
              disabled={filteredStudents.length === 0}
              onExportCsv={() => exportToCsv(filteredStudents)}
              onExportPdf={() => exportToPdf(filteredStudents)}
            />
            <Button
              variant="destructive"
              disabled={students.length === 0}
              onClick={() => setIsDeleteAllOpen(true)}
            >
              <Trash2 className="h-4 w-4" />
              Delete All
            </Button>
          </div>
        </div>

        <p className="mb-2 text-sm text-gray-500">
          Showing {filteredStudents.length} of {students.length} students
        </p>

        <StudentTable
          students={filteredStudents}
          onEdit={openEditForm}
          onDelete={setDeletingStudent}
        />

        <StudentFormDialog
          open={isFormOpen}
          student={editingStudent}
          onSave={handleSave}
          onClose={closeForm}
        />
        <DeleteStudentDialog
          student={deletingStudent}
          onConfirm={handleConfirmDelete}
          onClose={() => setDeletingStudent(null)}
        />
        <DeleteAllDialog
          open={isDeleteAllOpen}
          count={students.length}
          onConfirm={handleConfirmDeleteAll}
          onClose={() => setIsDeleteAllOpen(false)}
        />
      </div>
    </div>
  )
}

export default App