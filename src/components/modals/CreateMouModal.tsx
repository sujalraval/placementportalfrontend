import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { useDocViewer } from '@/context/DocViewerContext'
import { useRecruiterData } from '@/context/RecruiterDataContext'
import { SimpleFormModal } from '@/components/shared/SimpleFormModal'
import { MouDocument } from '@/components/shared/RecruiterDocuments'

export function CreateMouModal() {
  const { closeModal } = useModal()
  const { showToast } = useToast()
  const { openDoc } = useDocViewer()
  const { rec, saveMOU } = useRecruiterData()
  const d = rec.mouData

  return (
    <SimpleFormModal
      submitLabel="Generate & sign MOU"
      initial={{ commit: d.commit, valid: d.valid, signatory: d.signatory, terms: d.terms }}
      fields={[
        { id: 'commit', label: 'Hiring commitment (positions / year)', full: true },
        { id: 'valid', label: 'Valid until' },
        { id: 'signatory', label: 'Company signatory' },
        { id: 'terms', label: 'Terms', type: 'textarea', rows: 4, full: true },
      ]}
      onSubmit={(v) => {
        saveMOU({ commit: v.commit, valid: v.valid, signatory: v.signatory, terms: v.terms })
        closeModal()
        openDoc(`Memorandum of Understanding · ${rec.company}`, 'Gujarat University · Training & Placement Cell', <MouDocument mou={{ ...d, ...v }} />, `${rec.company}_MOU`)
        showToast('MOU generated — signed copy saved')
      }}
    />
  )
}
