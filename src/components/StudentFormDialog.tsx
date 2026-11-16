import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import type { Student } from '@/types/student'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export type StudentFormData = Omit<Student, 'id'>

const emptyForm: StudentFormData = {
  name: '',
  email: '',
  course: '',
  grade: 0,
}

interface StudentFormDialogProps {
  open: boolean
  student: Student | null
  onSave: (data: StudentFormData) => void
  onClose: () => void
}

function StudentFormDialog({ open, student, onSave, onClose }: StudentFormDialogProps) {
  const isEditing = student !== null

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit student' : 'Add student'}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Change the details below and click Save.'
              : 'Fill in the details below and click Add.'}
          </DialogDescription>
        </DialogHeader>
        {open && (
          <StudentForm
            key={student?.id ?? 'new'}
            initialData={student ?? emptyForm}
            submitLabel={isEditing ? 'Save' : 'Add'}
            onSave={onSave}
            onCancel={onClose}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

interface StudentFormProps {
  initialData: StudentFormData
  submitLabel: string
  onSave: (data: StudentFormData) => void
  onCancel: () => void
}

function StudentForm({ initialData, submitLabel, onSave, onCancel }: StudentFormProps) {
  const [form, setForm] = useState<StudentFormData>({
    name: initialData.name,
    email: initialData.email,
    course: initialData.course,
    grade: initialData.grade,
  })

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: name === 'grade' ? Number(value) : value,
    })
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    onSave(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" value={form.name} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="course">Course</Label>
        <Input id="course" name="course" value={form.course} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="grade">Grade (%)</Label>
        <Input id="grade" name="grade" type="number" inputMode="numeric" min={0} max={100} value={form.grade} onChange={handleChange} required />
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{submitLabel}</Button>
      </DialogFooter>
    </form>
  )
}

export default StudentFormDialog