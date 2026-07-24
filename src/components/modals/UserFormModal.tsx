import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { useAdminData } from '@/context/AdminDataContext'
import { SimpleFormModal } from '@/components/shared/SimpleFormModal'
import type { AdminUser } from '@/data/mock/users'

const STATUSES = ['Active', 'Pending', 'Suspended']

export function UserFormModal({ index, item }: { index: number; item?: AdminUser }) {
  const { closeModal } = useModal()
  const { showToast } = useToast()
  const { saveUser, depts } = useAdminData()

  const fields: any[] = [
    { id: 'name', label: 'Name', full: true },
    { id: 'role', label: 'Role', type: 'select', options: index < 0 ? ['Admin', 'Coordinator', 'Faculty'] : ['Student', 'Coordinator', 'Faculty', 'Admin'] },
    { id: 'status', label: 'Status', type: 'select', options: STATUSES },
    { id: 'dept', label: 'Department', type: 'select', options: ['—', ...depts.map(d => d.name)] },
    { id: 'email', label: 'Email' },
  ]
  
  if (index < 0) {
    fields.push({ id: 'password', label: 'Password', type: 'password' })
  }

  return (
    <SimpleFormModal
      submitLabel="Save"
      initial={item ? { name: item.name, role: item.role, status: item.status, dept: item.dept, email: item.email } : { role: 'Coordinator', status: 'Active', dept: '—' }}
      fields={fields}
      onSubmit={(v) => {
        if (!v.name) { showToast('Name is required'); return }
        if (!v.email) { showToast('Email is required'); return }
        if (index < 0 && !v.password) { showToast('Password required'); return }
        if (v.password && v.password.length < 8) { showToast('Password must be at least 8 characters'); return }
        if (['Coordinator', 'Faculty'].includes(v.role) && (!v.dept || v.dept === '—')) { showToast('Department is required for this role'); return }
        if (v.role === 'Admin' && v.dept && v.dept !== '—') { showToast('Admins cannot have a department'); return }
        saveUser(index, { name: v.name, role: v.role as AdminUser['role'], status: v.status as AdminUser['status'], dept: v.dept === '—' ? '' : v.dept, email: v.email }, v.password)
        closeModal()
      }}
    />
  )
}
