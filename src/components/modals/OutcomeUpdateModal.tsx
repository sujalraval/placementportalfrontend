import { useModal } from '@/context/ModalContext'
import { useAdminData } from '@/context/AdminDataContext'
import { SimpleFormModal } from '@/components/shared/SimpleFormModal'
import type { EmploymentOutcome } from '@/data/mock/outcomes'

export function OutcomeUpdateModal({ index, item }: { index: number; item: EmploymentOutcome }) {
  const { closeModal } = useModal()
  const { updateOutcome } = useAdminData()

  return (
    <SimpleFormModal
      submitLabel="Save update"
      initial={{ status: item.status }}
      fields={[
        { id: 'status', label: 'Current status', type: 'select', options: ['Active', 'Promoted', 'Left', 'Higher Studies'], full: true },
        { id: 'note', label: 'Update note', placeholder: 'e.g. Promoted to Team Lead, Mar 2026', full: true },
      ]}
      onSubmit={(v) => {
        updateOutcome(index, v.status as EmploymentOutcome['status'], v.note)
        closeModal()
      }}
    />
  )
}
