import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { useAdminData } from '@/context/AdminDataContext'
import { SimpleFormModal } from '@/components/shared/SimpleFormModal'
import type { AdminEvent } from '@/data/mock/adminContent'

export function EventFormModal({ index, item }: { index: number; item?: AdminEvent }) {
  const { closeModal } = useModal()
  const { showToast } = useToast()
  const { saveEvent } = useAdminData()

  return (
    <SimpleFormModal
      submitLabel="Save"
      initial={item ? { title: item.title, date: item.date, mode: item.mode, dept: item.dept, status: item.status } : { mode: 'On-campus', dept: 'All departments', status: 'Upcoming' }}
      fields={[
        { id: 'title', label: 'Event title', full: true },
        { id: 'date', label: 'Date', placeholder: '13 Jul' },
        { id: 'mode', label: 'Mode', type: 'select', options: ['On-campus', 'Webinar', 'Off-campus', 'Virtual'] },
        { id: 'dept', label: 'Departments', full: true },
        { id: 'status', label: 'Status', type: 'select', options: ['Upcoming', 'Completed'] },
      ]}
      onSubmit={(v) => {
        if (!v.title) { showToast('Title is required'); return }
        saveEvent(index, { title: v.title, date: v.date, mode: v.mode as AdminEvent['mode'], dept: v.dept, status: v.status as AdminEvent['status'] })
        closeModal()
      }}
    />
  )
}
