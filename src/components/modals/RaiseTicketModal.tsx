import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { usePortalData } from '@/context/PortalDataContext'
import { SimpleFormModal } from '@/components/shared/SimpleFormModal'

const CATEGORIES = ['Application issue', 'Profile / documents', 'Training', 'Drive / interview', 'Technical / login', 'Other']

export function RaiseTicketModal() {
  const { closeModal } = useModal()
  const { showToast } = useToast()
  const { raiseTicket } = usePortalData()

  return (
    <SimpleFormModal
      submitLabel="Submit ticket"
      fields={[
        { id: 'cat', label: 'Category', type: 'select', options: CATEGORIES, full: true },
        { id: 'pri', label: 'Priority', type: 'select', options: ['Low', 'Medium', 'High'] },
        { id: 'sub', label: 'Subject', full: true },
        { id: 'body', label: 'Describe the issue', type: 'textarea', rows: 4, full: true },
      ]}
      onSubmit={(v) => {
        if (!v.sub) { showToast('Subject is required'); return }
        raiseTicket({ cat: v.cat, sub: v.sub, pri: v.pri as 'Low' | 'Medium' | 'High', body: v.body })
        closeModal()
        showToast('Ticket raised — SLA 24 hours')
      }}
    />
  )
}
