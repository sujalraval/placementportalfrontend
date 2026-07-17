import { useModal } from '@/context/ModalContext'
import { useRecruiterData } from '@/context/RecruiterDataContext'
import { SimpleFormModal } from '@/components/shared/SimpleFormModal'
import { RND } from '@/data/mock/candidates'

export function MarkEvaluationModal({ index }: { index: number }) {
  const { closeModal } = useModal()
  const { saveMarks } = useRecruiterData()

  return (
    <SimpleFormModal
      submitLabel="Save evaluation"
      fields={[
        { id: 'round', label: 'Round', type: 'select', options: RND.map((r) => r[1]), full: true },
        { id: 'score', label: 'Marks (out of 100)', placeholder: 'e.g. 78' },
        { id: 'result', label: 'Result', type: 'select', options: ['Pass — advance', 'Hold', 'Fail — reject'] },
        { id: 'rem', label: 'Evaluator remarks', type: 'textarea', rows: 3, full: true },
      ]}
      onSubmit={(v) => {
        saveMarks(index, v.round, +v.score || 0, v.result)
        closeModal()
      }}
    />
  )
}
