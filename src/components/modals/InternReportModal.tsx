import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { usePortalData } from '@/context/PortalDataContext'
import { SimpleFormModal } from '@/components/shared/SimpleFormModal'

export function InternReportModal({ index }: { index: number }) {
  const { closeModal } = useModal()
  const { showToast } = useToast()
  const { submitInternshipReport } = usePortalData()

  return (
    <SimpleFormModal
      submitLabel="Submit report"
      fields={[
        { id: 'objectives', label: 'Internship objectives', type: 'textarea', rows: 2, full: true },
        { id: 'summary', label: 'Summary of work done', type: 'textarea', rows: 3, full: true },
        { id: 'learnings', label: 'Key learnings', type: 'textarea', rows: 2, full: true },
      ]}
      onSubmit={(v) => {
        if (!v.summary) { showToast('Please summarise the work done'); return }
        submitInternshipReport(index, { objectives: v.objectives, summary: v.summary, learnings: v.learnings })
        closeModal()
        showToast('Internship report submitted to your department coordinator')
      }}
    />
  )
}
