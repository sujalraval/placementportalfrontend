import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Pill } from '@/components/ui/Pill'
import { PageHead } from '@/components/shared/PageHead'
import { useToast } from '@/context/ToastContext'
import { useAdminData } from '@/context/AdminDataContext'
import { STUDENTS } from '@/data/mock/students'

export default function AdminStudentsPage() {
  const { showToast } = useToast()
  const { depts } = useAdminData()
  const total = depts.reduce((a, d) => a + d.total, 0)

  return (
    <div>
      <PageHead
        title="Students"
        description={`${total.toLocaleString('en-IN')} registered across 8 departments`}
        actions={
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => showToast('Importing from University ERP…')}>Import from ERP</Button>
            <Button onClick={() => showToast('Exported 2,240 records')}>Export</Button>
          </div>
        }
      />
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse text-[13px]">
          <thead><tr>{['Enrolment', 'Name', 'Department', 'CGPA', 'Status', 'Package'].map((h) => <th key={h} className="border-b border-line bg-paper px-3.5 py-2.5 text-left text-[10.5px] font-bold uppercase tracking-[.1em] text-muted">{h}</th>)}</tr></thead>
          <tbody>
            {STUDENTS.map((s) => (
              <tr key={s.en}>
                <td className="tnum border-b border-line-2 px-3.5 py-3 text-muted">{s.en}</td>
                <td className="border-b border-line-2 px-3.5 py-3"><b className="text-[13.5px]">{s.name}</b></td>
                <td className="border-b border-line-2 px-3.5 py-3">{s.dept}</td>
                <td className="tnum border-b border-line-2 px-3.5 py-3">{s.cgpa}</td>
                <td className="border-b border-line-2 px-3.5 py-3"><Pill status={s.status} /></td>
                <td className="tnum border-b border-line-2 px-3.5 py-3">{s.pkg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <p className="mt-3 text-xs text-muted">Showing {STUDENTS.length} of {total.toLocaleString('en-IN')} — sample records.</p>
    </div>
  )
}
