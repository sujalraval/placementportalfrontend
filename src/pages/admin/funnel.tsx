import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { PageHead } from '@/components/shared/PageHead'
import { SectionTitle } from '@/components/shared/SectionCard'
import { useToast } from '@/context/ToastContext'
import { adminApi } from '@/api/admin'

function pct(a: number, b: number) {
  return b ? Math.round((a / b) * 100) + '%' : '—'
}

export default function AdminFunnelPage() {
  const { showToast } = useToast()
  const [rows, setRows] = useState<any[]>([])

  useEffect(() => {
    adminApi.getSelectionFunnel().then(res => {
      setRows(res.data.data || [])
    }).catch(err => {
      console.error(err)
      showToast('Failed to load funnel data')
    })
  }, [])

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
