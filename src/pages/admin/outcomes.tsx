import { Icon } from '@/components/icons/Icon'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Pill } from '@/components/ui/Pill'
import { Stat } from '@/components/ui/Stat'
import { PageHead } from '@/components/shared/PageHead'
import { useToast } from '@/context/ToastContext'
import { useModal } from '@/context/ModalContext'
import { useAdminData } from '@/context/AdminDataContext'
import { OutcomeUpdateModal } from '@/components/modals/OutcomeUpdateModal'

export default function AdminOutcomesPage() {
  const { employmentOutcomes } = useAdminData()
  const { showToast } = useToast()
  const { openModal } = useModal()

  const counts: Record<string, number> = {}
  employmentOutcomes.forEach((e) => { counts[e.status] = (counts[e.status] || 0) + 1 })
  const retained = employmentOutcomes.filter((e) => e.status === 'Active' || e.status === 'Promoted').length
  const retentionRate = employmentOutcomes.length ? Math.round((retained / employmentOutcomes.length) * 100) : 0

  return (
    <div>
      <PageHead
        title="Employment outcomes"
        description="Post-placement monitoring — employment status beyond the hiring season, feeding NIRF/NAAC first-destination reporting"
        actions={<Button variant="gold" onClick={() => showToast('Outcomes survey sent to all placed alumni')}><Icon name="mail" /> Send check-in survey</Button>}
      />

      <div className="mb-4 grid grid-cols-5 gap-3 max-lg:grid-cols-2">
        <Stat label="Tracked" value={employmentOutcomes.length} />
        <Stat label="Active" value={counts.Active || 0} />
        <Stat label="Promoted" value={counts.Promoted || 0} />
        <Stat label="Left / moved on" value={counts.Left || 0} />
        <Stat label="Retention rate" value={`${retentionRate}%`} />
      </div>

      <Card className="overflow-x-auto">
        <table className="w-full min-w-[800px] border-collapse text-[13px]">
          <thead><tr>{['Student', 'Company · Role', 'CTC', 'Joined', 'Status', 'Last update', ''].map((h) => <th key={h} className="border-b border-line bg-paper px-3.5 py-2.5 text-left text-[10.5px] font-bold uppercase tracking-[.1em] text-muted">{h}</th>)}</tr></thead>
          <tbody>
            {employmentOutcomes.map((e, i) => (
              <tr key={e.en}>
                <td className="border-b border-line-2 px-3.5 py-3"><b className="text-[13.5px]">{e.name}</b><small className="tnum block text-muted">{e.en}</small></td>
                <td className="border-b border-line-2 px-3.5 py-3">{e.co} · {e.role}</td>
                <td className="tnum border-b border-line-2 px-3.5 py-3">{e.ctc}</td>
                <td className="tnum border-b border-line-2 px-3.5 py-3">{e.joinedOn}</td>
                <td className="border-b border-line-2 px-3.5 py-3"><Pill status={e.status} /></td>
                <td className="border-b border-line-2 px-3.5 py-3 text-xs text-muted">{e.lastUpdate}</td>
                <td className="border-b border-line-2 px-3.5 py-3 text-right">
                  <Button variant="ghost" size="sm" onClick={() => openModal(`Record outcome update · ${e.name}`, <OutcomeUpdateModal index={i} item={e} />)}>Record update</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <p className="mt-3 text-[12.5px] text-muted">Feeds directly into the university's first-destination survey and long-term placement-outcome reporting for accreditation.</p>
    </div>
  )
}
