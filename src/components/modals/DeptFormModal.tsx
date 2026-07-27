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
      initial={item ? { 
        name: item.name, 
        code: item.code || '', 
        coord: item.coord, 
        total: String(item.total), 
        placed: String(item.placed),
        contactEmail: item.contactEmail || '',
        contactPhone: item.contactPhone || '',
        coordName: item.coordName || '',
        coordEmail: item.coordEmail || '',
        coordPhone: item.coordPhone || ''
      } : {}}
      fields={[
        { id: 'name', label: 'Department name', full: true },
        { id: 'code', label: 'Department Code (e.g. CS)' },
        { id: 'contactEmail', label: 'Department Email ID' },
        { id: 'contactPhone', label: 'Department Contact No' },
        { id: 'coord', label: 'Coordinator (Legacy)' },
        { id: 'coordName', label: 'Placement Coordinator Name' },
        { id: 'coordEmail', label: 'Coordinator Email ID' },
        { id: 'coordPhone', label: 'Co-Mobile' },
        { id: 'total', label: 'Students', type: 'number' },
        { id: 'placed', label: 'Placed', type: 'number' },
      ]}
      onSubmit={(v) => {
        if (!v.name) { showToast('Name is required'); return }
        if (!v.code) { showToast('Code is required'); return }
        saveDept(index, { 
          name: v.name, 
          code: v.code.toUpperCase(), 
          coord: v.coord, 
          total: +v.total || 0, 
          placed: +v.placed || 0,
          contactEmail: v.contactEmail,
          contactPhone: v.contactPhone,
          coordName: v.coordName,
          coordEmail: v.coordEmail,
          coordPhone: v.coordPhone
        })
        closeModal()
      }}
    />
  )
}
