import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { useAdminData } from '@/context/AdminDataContext'
import { SimpleFormModal } from '@/components/shared/SimpleFormModal'
import type { Sector } from '@/data/mock/sectors'

export function SectorFormModal({ index, item }: { index: number; item?: Sector }) {
  const { closeModal } = useModal()
  const { showToast } = useToast()
  const { saveSector } = useAdminData()

  return (
    <SimpleFormModal
      submitLabel="Save"
      initial={item ? { name: item.name, companies: String(item.companies), openings: String(item.openings), status: item.status } : { status: 'Active' }}
      fields={[
        { id: 'name', label: 'Sector name', full: true },
        { id: 'companies', label: 'Companies', type: 'number' },
        { id: 'openings', label: 'Open positions', type: 'number' },
        { id: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] },
      ]}
      onSubmit={(v) => {
        if (!v.name) { showToast('Name is required'); return }
        saveSector(index, { name: v.name, companies: +v.companies || 0, openings: +v.openings || 0, status: v.status as Sector['status'] })
        closeModal()
      }}
    />
  )
}
