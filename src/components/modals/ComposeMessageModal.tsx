import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { SimpleFormModal } from '@/components/shared/SimpleFormModal'

export function ComposeMessageModal() {
  const { closeModal } = useModal()
  const { showToast } = useToast()

  return (
    <SimpleFormModal
      submitLabel="Send"
      fields={[
        { id: 'to', label: 'To', type: 'select', options: ['Placement Cell (TPO)', 'CS Coordinator', 'Commerce Coordinator', 'MBA Coordinator'], full: true },
        { id: 'subject', label: 'Subject', full: true },
        { id: 'body', label: 'Message', type: 'textarea', rows: 4, full: true },
      ]}
      onSubmit={() => { closeModal(); showToast('Message sent to the Placement Cell') }}
    />
  )
}
