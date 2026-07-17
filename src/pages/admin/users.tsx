import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Chip } from '@/components/ui/Chip'
import { Pill } from '@/components/ui/Pill'
import { Stat } from '@/components/ui/Stat'
import { PageHead } from '@/components/shared/PageHead'
import { IconControlButton } from '@/components/shared/IconControls'
import { useModal } from '@/context/ModalContext'
import { useAdminData } from '@/context/AdminDataContext'
import { UserFormModal } from '@/components/modals/UserFormModal'

const ROLE_COUNTS = ['Student', 'Coordinator', 'Recruiter', 'Placement Officer'] as const

export default function AdminUsersPage() {
  const { users, approveUser, deleteUser } = useAdminData()
  const { openModal } = useModal()

  return (
    <div>
      <PageHead
        title="Users & roles"
        description="Manage every account across the university"
        actions={<Button variant="gold" onClick={() => openModal('Add user', <UserFormModal index={-1} />)}>Add user</Button>}
      />

      <div className="mb-4 grid grid-cols-4 gap-4 max-lg:grid-cols-2">
        {ROLE_COUNTS.map((r) => (
          <Stat key={r} label={`${r}s`} value={`${users.filter((u) => u.role === r).length}${r === 'Student' ? '+' : ''}`} />
        ))}
      </div>

      <Card className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse text-[13px]">
          <thead><tr>{['Name', 'Role', 'Department', 'Email', 'Status', ''].map((h) => <th key={h} className="border-b border-line bg-paper px-3.5 py-2.5 text-left text-[10.5px] font-bold uppercase tracking-[.1em] text-muted">{h}</th>)}</tr></thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u.name}>
                <td className="border-b border-line-2 px-3.5 py-3"><b className="text-[13.5px]">{u.name}</b></td>
                <td className="border-b border-line-2 px-3.5 py-3"><Chip>{u.role}</Chip></td>
                <td className="border-b border-line-2 px-3.5 py-3">{u.dept}</td>
                <td className="border-b border-line-2 px-3.5 py-3 text-muted">{u.email}</td>
                <td className="border-b border-line-2 px-3.5 py-3"><Pill status={u.status} /></td>
                <td className="border-b border-line-2 px-3.5 py-3 text-right">
                  <div className="flex justify-end gap-1.5">
                    {u.status === 'Pending' && <IconControlButton onClick={() => approveUser(i)}>Approve</IconControlButton>}
                    <IconControlButton onClick={() => openModal('Edit user', <UserFormModal index={i} item={u} />)}>Edit</IconControlButton>
                    <IconControlButton danger onClick={() => deleteUser(i)}>Delete</IconControlButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
