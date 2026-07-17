import { useModal } from '@/context/ModalContext'
import { useRecruiterData } from '@/context/RecruiterDataContext'
import { SimpleFormModal } from '@/components/shared/SimpleFormModal'

export function RecordResultModal({ index }: { index: number }) {
  const { closeModal } = useModal()
  const { saveResult } = useRecruiterData()

  return (
    <SimpleFormModal
      submitLabel="Save result"
      fields={[
        { id: 'res', label: 'Outcome', type: 'select', options: ['Selected', 'On hold', 'Rejected'], full: true },
        { id: 'fb', label: 'Interviewer feedback', type: 'textarea', rows: 3, full: true },
      ]}
      onSubmit={() => { saveResult(index); closeModal() }}
    />
  )
}
