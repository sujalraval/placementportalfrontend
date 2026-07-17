import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { useRecruiterData } from '@/context/RecruiterDataContext'
import { SimpleFormModal } from '@/components/shared/SimpleFormModal'

export function ScheduleDriveModal() {
  const { closeModal } = useModal()
  const { showToast } = useToast()
  const { saveDrive } = useRecruiterData()

  return (
    <SimpleFormModal
      submitLabel="Schedule drive"
      initial={{ depts: 'All departments' }}
      fields={[
        { id: 'title', label: 'Drive title', placeholder: 'SDE Hiring Drive', full: true },
        { id: 'date', label: 'Date', placeholder: '14 Jul' },
        { id: 'mode', label: 'Mode', type: 'select', options: ['On-campus', 'Off-campus', 'Virtual'] },
        { id: 'depts', label: 'Departments', full: true },
        { id: 'rounds', label: 'Rounds', placeholder: 'Aptitude · Technical · HR', full: true },
      ]}
      onSubmit={(v) => {
        if (!v.title) { showToast('Drive title is required'); return }
        saveDrive({ title: v.title, date: v.date || 'TBD', depts: v.depts, rounds: v.rounds, mode: v.mode as 'On-campus' | 'Off-campus' | 'Virtual' })
        closeModal()
      }}
    />
  )
}
