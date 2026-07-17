import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { PageHead } from '@/components/shared/PageHead'
import { SectionTitle } from '@/components/shared/SectionCard'
import { useToast } from '@/context/ToastContext'
import { useRecruiterData } from '@/context/RecruiterDataContext'
import { funnelCounts } from '@/data/mock/candidates'

const OTHER_ROWS = [
  { label: 'Deloitte · Data Analyst', data: { applied: 142, appeared: 118, tech: 64, hr: 31, offer: 14, joined: 11 } },
  { label: 'HDFC Bank · Mgmt Trainee', data: { applied: 210, appeared: 176, tech: 92, hr: 48, offer: 20, joined: 17 } },
  { label: 'Amazon · Cloud Engineer', data: { applied: 97, appeared: 80, tech: 34, hr: 18, offer: 9, joined: 0 } },
]

function pct(a: number, b: number) {
  return b ? Math.round((a / b) * 100) + '%' : '—'
}

export default function AdminFunnelPage() {
  const { recCands } = useRecruiterData()
  const { showToast } = useToast()
  const f = funnelCounts(recCands)
  const rows = [{ label: 'TCS · Software Engineer', data: f }, ...OTHER_ROWS]

  return (
    <div>
      <PageHead
        title="Selection funnel — institution view"
        description="Applied → appeared → technical → HR → offers → joined · live per company for monitoring & transparency"
        actions={<Button variant="gold" onClick={() => showToast('Funnel report exported (Excel)')}>Export report</Button>}
      />

      <Card className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse text-[13px]">
          <thead><tr>{['Company · Role', 'Applied', 'Appeared', 'Technical', 'HR', 'Offers', 'Joined', 'Join rate'].map((h) => <th key={h} className="border-b border-line bg-paper px-3.5 py-2.5 text-left text-[10.5px] font-bold uppercase tracking-[.1em] text-muted">{h}</th>)}</tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label}>
                <td className="border-b border-line-2 px-3.5 py-3"><b className="text-[13.5px]">{r.label}</b></td>
                <td className="tnum border-b border-line-2 px-3.5 py-3">{r.data.applied}</td>
                <td className="tnum border-b border-line-2 px-3.5 py-3">{r.data.appeared}</td>
                <td className="tnum border-b border-line-2 px-3.5 py-3">{r.data.tech}</td>
                <td className="tnum border-b border-line-2 px-3.5 py-3">{r.data.hr}</td>
                <td className="tnum border-b border-line-2 px-3.5 py-3">{r.data.offer}</td>
                <td className="tnum border-b border-line-2 px-3.5 py-3">{r.data.joined}</td>
                <td className="tnum border-b border-line-2 px-3.5 py-3 font-bold text-navy">{pct(r.data.joined, r.data.offer)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card pad className="mt-4">
        <SectionTitle title="Why this matters" />
        <p className="text-[13px] leading-[1.6] text-[#46443d]">
          Round-wise conversion shows exactly where students drop off — feeding training priorities (e.g., low
          technical-round conversion → more DSA prep) and giving the university a transparent, auditable record of
          every company's process from application to joining.
        </p>
      </Card>
    </div>
  )
}
