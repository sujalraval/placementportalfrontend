import { useModal } from '@/context/ModalContext'
import { usePortalData } from '@/context/PortalDataContext'
import { SimpleFormModal } from '@/components/shared/SimpleFormModal'

export function FacultyEvalModal({ index }: { index: number }) {
  const { closeModal } = useModal()
  const { mentees, saveFacultyEvaluation } = usePortalData()
  const e = mentees[index]?.evaluation

  return (
    <SimpleFormModal
      submitLabel="Save evaluation"
      initial={{ grade: e?.grade ?? 'A', marks: e ? String(e.marks) : '', remarks: e?.remarks ?? '' }}
      fields={[
        { id: 'grade', label: 'Grade', type: 'select', options: ['A', 'B', 'C', 'D'] },
        { id: 'marks', label: 'Marks (out of 100)', placeholder: '85' },
        { id: 'remarks', label: 'Remarks', type: 'textarea', rows: 3, full: true },
      ]}
      onSubmit={(v) => {
        saveFacultyEvaluation(index, { grade: v.grade, marks: +v.marks || 0, remarks: v.remarks })
        closeModal()
      }}
    />
  )
}
