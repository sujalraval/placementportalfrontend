import { useModal } from '@/context/ModalContext'
import { useRecruiterData } from '@/context/RecruiterDataContext'
import { SimpleFormModal } from '@/components/shared/SimpleFormModal'

export function FinalizeSalaryModal({ index }: { index: number }) {
  const { closeModal } = useModal()
  const { saveSalary } = useRecruiterData()

  return (
    <SimpleFormModal
      submitLabel="Finalize & release offer"
      fields={[
        { id: 'ctc', label: 'Total CTC', placeholder: '₹7.0 LPA', full: true },
        { id: 'fixed', label: 'Fixed component', placeholder: '₹6.2 L' }, { id: 'variable', label: 'Variable / bonus', placeholder: '₹0.8 L' },
        { id: 'joining', label: 'Joining month', placeholder: 'Jul 2026' }, { id: 'loc', label: 'Location', placeholder: 'Ahmedabad' },
      ]}
      onSubmit={(v) => {
        saveSalary(index, { ctc: v.ctc || '₹—', fixed: v.fixed, variable: v.variable }, v.joining, v.loc)
        closeModal()
      }}
    />
  )
}
