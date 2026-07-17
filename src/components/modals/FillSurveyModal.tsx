import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { SimpleFormModal } from '@/components/shared/SimpleFormModal'

export function FillSurveyModal() {
  const { closeModal } = useModal()
  const { showToast } = useToast()

  return (
    <SimpleFormModal
      submitLabel="Submit"
      fields={[
        { id: 'r1', label: 'Overall experience (1–5)', type: 'select', options: ['5 — Excellent', '4 — Good', '3 — Average', '2 — Poor', '1 — Very poor'], full: true },
        { id: 'r2', label: 'What went well?', type: 'textarea', rows: 2, full: true },
        { id: 'r3', label: 'What should improve?', type: 'textarea', rows: 2, full: true },
      ]}
      onSubmit={() => { closeModal(); showToast('Feedback submitted — thank you!') }}
    />
  )
}
