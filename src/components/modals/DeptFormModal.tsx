import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { useAdminData } from '@/context/AdminDataContext'
import { SimpleFormModal } from '@/components/shared/SimpleFormModal'
import type { Department } from '@/data/mock/departments'

export function DeptFormModal({ index, item }: { index: number; item?: Department }) {
  const { closeModal } = useModal()
  const { showToast } = useToast()
  const { saveDept } = useAdminData()

  return (
    <SimpleFormModal
      submitLabel="Save"
      initial={item ? { name: item.name, coord: item.coord, total: String(item.total), placed: String(item.placed) } : {}}
      fields={[
        { id: 'name', label: 'Department name', full: true },
        { id: 'coord', label: 'Coordinator' },
        { id: 'total', label: 'Students', type: 'number' },
        { id: 'placed', label: 'Placed', type: 'number' },
      ]}
      onSubmit={(v) => {
        if (!v.name) { showToast('Name is required'); return }
        saveDept(index, { name: v.name, coord: v.coord, total: +v.total || 0, placed: +v.placed || 0 })
        closeModal()
      }}
    />
  )
}
