import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { usePortalData } from '@/context/PortalDataContext'
import { SimpleFormModal } from '@/components/shared/SimpleFormModal'

const AUDIENCES = ['Participants', 'Enrolled students', 'Recruiters', 'All students', 'Batch 2026']

export function SurveyFormModal() {
  const { closeModal } = useModal()
  const { showToast } = useToast()
  const { createSurvey } = usePortalData()

  return (
    <SimpleFormModal
      submitLabel="Launch survey"
      initial={{ aud: AUDIENCES[0] }}
      fields={[
        { id: 'name', label: 'Survey name', full: true },
        { id: 'aud', label: 'Audience', type: 'select', options: AUDIENCES, full: true },
      ]}
      onSubmit={(v) => {
        if (!v.name) { showToast('Name is required'); return }
        createSurvey({ name: v.name, aud: v.aud })
        closeModal()
      }}
    />
  )
}
