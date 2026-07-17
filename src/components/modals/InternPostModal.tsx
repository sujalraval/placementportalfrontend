import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { usePortalData } from '@/context/PortalDataContext'
import { useRecruiterData } from '@/context/RecruiterDataContext'
import { SimpleFormModal } from '@/components/shared/SimpleFormModal'

export function InternPostModal() {
  const { closeModal } = useModal()
  const { showToast } = useToast()
  const { postInternship } = usePortalData()
  const { rec } = useRecruiterData()

  return (
    <SimpleFormModal
      submitLabel="Publish internship"
      initial={{ depts: 'All departments', cgpa: '6.0' }}
      fields={[
        { id: 'role', label: 'Role / title', full: true },
        { id: 'type', label: 'Type', type: 'select', options: ['Paid', 'Free'] },
        { id: 'stipend', label: 'Stipend (if paid)', placeholder: '₹15,000/mo' },
        { id: 'mode', label: 'Timing mode', type: 'select', options: ['Full-time · Fixed timing', 'Flexible hours', 'Part-time · Fixed timing'] },
        { id: 'affiliation', label: 'Affiliation', type: 'select', options: ['Independent', 'With College'] },
        { id: 'minWeeks', label: 'Minimum duration (weeks)', placeholder: '8' },
        { id: 'depts', label: 'Eligible departments', full: true },
        { id: 'cgpa', label: 'Minimum CGPA' }, { id: 'deadline', label: 'Application deadline', placeholder: '20 Jul' },
        { id: 'desc', label: 'Description', type: 'textarea', rows: 3, full: true },
      ]}
      onSubmit={(v) => {
        if (!v.role) { showToast('Role is required'); return }
        postInternship({
          role: v.role, co: rec.company, type: v.type as 'Paid' | 'Free',
          stipend: v.type === 'Paid' ? (v.stipend || '₹—/mo') : 'Unpaid — certificate',
          mode: v.mode, affiliation: v.affiliation as 'Independent' | 'With College',
          minWeeks: +v.minWeeks || 6, depts: v.depts, cgpa: v.cgpa || '6.0',
          batch: '2026', deadline: v.deadline || '—', status: 'Open', desc: v.desc,
        })
        closeModal()
        showToast('Internship posted — eligible students notified')
      }}
    />
  )
}
