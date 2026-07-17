import { useModal } from '@/context/ModalContext'
import { useRecruiterData } from '@/context/RecruiterDataContext'
import { SimpleFormModal } from '@/components/shared/SimpleFormModal'

export function ScheduleInterviewModal() {
  const { closeModal } = useModal()
  const { recCands, recJobs, saveInterview } = useRecruiterData()

  return (
    <SimpleFormModal
      submitLabel="Schedule & notify"
      fields={[
        { id: 'cand', label: 'Candidate', type: 'select', options: recCands.map((c) => c.name), full: true },
        { id: 'role', label: 'Role', type: 'select', options: recJobs.map((j) => j.role) },
        { id: 'round', label: 'Round', type: 'select', options: ['Aptitude', 'Online assessment', 'Case study', 'Technical', 'GD', 'HR'] },
        { id: 'date', label: 'Date', placeholder: '14 Jul' }, { id: 'slot', label: 'Time slot', placeholder: '11:00 AM' },
        { id: 'panel', label: 'Panel', placeholder: 'Panel A · Interviewer' },
        { id: 'mode', label: 'Mode', type: 'select', options: ['Virtual', 'On-campus', 'Phone'] },
      ]}
      onSubmit={(v) => {
        saveInterview({
          cand: v.cand, role: v.role, round: v.round, date: v.date || 'TBD', slot: v.slot || 'TBD',
          panel: v.panel || 'Panel A', mode: v.mode as 'Virtual' | 'On-campus' | 'Phone',
        })
        closeModal()
      }}
    />
  )
}
