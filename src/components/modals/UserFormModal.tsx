import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { useAdminData } from '@/context/AdminDataContext'
import { SimpleFormModal } from '@/components/shared/SimpleFormModal'
import type { AdminUser } from '@/data/mock/users'

const ROLES = ['Student', 'Coordinator', 'Placement Officer', 'Recruiter', 'Admin']
const STATUSES = ['Active', 'Pending', 'Suspended']

export function UserFormModal({ index, item }: { index: number; item?: AdminUser }) {
  const { closeModal } = useModal()
  const { showToast } = useToast()
  const { saveUser } = useAdminData()

  return (
    <SimpleFormModal
      submitLabel="Save"
      initial={item ? { name: item.name, role: item.role, status: item.status, dept: item.dept, email: item.email } : { role: ROLES[0], status: STATUSES[0] }}
      fields={[
        { id: 'name', label: 'Name', full: true },
        { id: 'role', label: 'Role', type: 'select', options: ROLES },
        { id: 'status', label: 'Status', type: 'select', options: STATUSES },
        { id: 'dept', label: 'Department' },
        { id: 'email', label: 'Email' },
      ]}
      onSubmit={(v) => {
        if (!v.name) { showToast('Name is required'); return }
        saveUser(index, { name: v.name, role: v.role as AdminUser['role'], status: v.status as AdminUser['status'], dept: v.dept, email: v.email })
        closeModal()
      }}
    />
  )
}
