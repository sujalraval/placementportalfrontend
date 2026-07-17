import { useModal } from '@/context/ModalContext'
import { usePortalData } from '@/context/PortalDataContext'
import { SimpleFormModal } from '@/components/shared/SimpleFormModal'

export function CreditsModal({ index }: { index: number }) {
  const { closeModal } = useModal()
  const { finalizeInternApproval } = usePortalData()

  return (
    <SimpleFormModal
      submitLabel="Approve & map credits"
      fields={[
        { id: 'course', label: 'Course code', placeholder: 'COL-INT-401', full: true },
        { id: 'count', label: 'Academic credits', placeholder: '4' },
        { id: 'evalBasis', label: 'Evaluation basis', type: 'select', options: ['Report + Viva', 'Continuous assessment', 'Report only', 'Faculty mentor evaluation'] },
      ]}
      onSubmit={(v) => {
        finalizeInternApproval(index, { course: v.course, count: v.count, evalBasis: v.evalBasis })
        closeModal()
      }}
    />
  )
}
