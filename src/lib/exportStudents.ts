import type { Student } from '@/types/student'

const headers = ['ID', 'Name', 'Email', 'Course', 'Grade (%)']

function toRows(students: Student[]) {
  return students.map((s) => [s.id, s.name, s.email, s.course, s.grade])
}

// Wrap a value in quotes, and double any quotes inside it
function escapeCsv(value: string | number) {
  return `"${String(value).replace(/"/g, '""')}"`
}

function fileName(extension: string) {
  const today = new Date().toISOString().slice(0, 10) // e.g. 2026-11-16
  return `students-${today}.${extension}`
}

export function exportToCsv(students: Student[]) {
  const lines = [headers, ...toRows(students)].map((row) =>
    row.map(escapeCsv).join(',')
  )
  // The \uFEFF at the start helps Excel read names with accents correctly
  const csv = '\uFEFF' + lines.join('\r\n')

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = fileName('csv')
  link.click()

  URL.revokeObjectURL(url)
}

export async function exportToPdf(students: Student[]) {
  // Load the PDF libraries only when this function is called
  const [{ jsPDF }, { default: autoTable }] = await Promise.all([
    import('jspdf'),
    import('jspdf-autotable'),
  ])

  const doc = new jsPDF()
  doc.setFontSize(16)
  doc.text('Student List', 14, 16)

  autoTable(doc, {
    startY: 22,
    head: [headers],
    body: toRows(students),
  })

  doc.save(fileName('pdf'))
}