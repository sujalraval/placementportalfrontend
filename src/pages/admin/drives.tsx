import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Pill } from '@/components/ui/Pill'
import { PageHead } from '@/components/shared/PageHead'
import { useToast } from '@/context/ToastContext'
import { usePortalData } from '@/context/PortalDataContext'

export default function AdminDrivesPage() {
  const { drives } = usePortalData()
  const { showToast } = useToast()

  return (
    <div>
      <PageHead
        title="Campus drives"
        description="Scheduling across departments with clash detection"
        actions={<Button variant="gold" onClick={() => showToast('New drive — pick company & date')}>Schedule drive</Button>}
      />
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse text-[13px]">
          <thead><tr>{['Drive', 'Date', 'Departments', 'Rounds', 'Registered', 'Status'].map((h) => <th key={h} className="border-b border-line bg-paper px-3.5 py-2.5 text-left text-[10.5px] font-bold uppercase tracking-[.1em] text-muted">{h}</th>)}</tr></thead>
          <tbody>
            {drives.map((d) => (
              <tr key={d.co}>
                <td className="border-b border-line-2 px-3.5 py-3"><b className="text-[13.5px]">{d.title}</b><small className="block text-muted">{d.co}</small></td>
                <td className="tnum border-b border-line-2 px-3.5 py-3">{d.date}</td>
                <td className="border-b border-line-2 px-3.5 py-3">{d.depts}</td>
                <td className="border-b border-line-2 px-3.5 py-3 text-muted">{d.rounds}</td>
                <td className="tnum border-b border-line-2 px-3.5 py-3">{d.reg}</td>
                <td className="border-b border-line-2 px-3.5 py-3"><Pill status={d.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
