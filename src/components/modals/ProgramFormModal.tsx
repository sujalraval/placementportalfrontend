import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { useAdminData } from '@/context/AdminDataContext'
import { SimpleFormModal } from '@/components/shared/SimpleFormModal'
import type { Program } from '@/data/mock/programs'

const DEGREES = ['Undergraduate', 'Postgraduate', 'Diploma', 'Doctoral']

export function ProgramFormModal({ index, item }: { index: number; item?: Program }) {
  const { closeModal } = useModal()
  const { showToast } = useToast()
  const { saveProgram, depts } = useAdminData()

  return (
    <SimpleFormModal
      submitLabel="Save"
      initial={item ? { name: item.name, code: item.code || '', dept: item.dept, degree: item.degree, seats: String(item.seats), duration: item.duration } : { dept: depts[0]?.name, degree: DEGREES[0] }}
      fields={[
        { id: 'name', label: 'Program name', full: true },
        { id: 'code', label: 'Program Code (e.g. BCA)' },
        { id: 'dept', label: 'Department', type: 'select', options: depts.map((d) => d.name) },
        { id: 'degree', label: 'Level', type: 'select', options: DEGREES },
        { id: 'seats', label: 'Seats', type: 'number' },
        { id: 'duration', label: 'Duration (years)', placeholder: '3', type: 'number' },
      ]}
      onSubmit={(v) => {
        if (!v.name) { showToast('Name is required'); return }
        if (!v.code) { showToast('Code is required'); return }
        saveProgram(index, { name: v.name, code: v.code.toUpperCase(), dept: v.dept, degree: v.degree as Program['degree'], seats: +v.seats || 0, duration: v.duration })
        closeModal()
      }}
    />
  )
}
