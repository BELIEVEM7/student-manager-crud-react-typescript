import type { Student } from '@/types/student'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface DeleteStudentDialogProps {
  student: Student | null
  onConfirm: () => void
  onClose: () => void
}

function DeleteStudentDialog({ student, onConfirm, onClose }: DeleteStudentDialogProps) {
  return (
    <AlertDialog open={student !== null} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete student?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently remove <strong>{student?.name}</strong> from the list.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteStudentDialog