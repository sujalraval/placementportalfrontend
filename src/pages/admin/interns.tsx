import { Card } from '@/components/ui/Card'
import { Stat } from '@/components/ui/Stat'
import { Pill } from '@/components/ui/Pill'
import { PageHead } from '@/components/shared/PageHead'
import { usePortalData } from '@/context/PortalDataContext'

export default function AdminInternsPage() {
  const { internships } = usePortalData()
  const paid = internships.filter((x) => x.type === 'Paid').length
  const free = internships.filter((x) => x.type === 'Free').length
  const wc = internships.filter((x) => x.affiliation === 'With College').length
  const ind = internships.filter((x) => x.affiliation === 'Independent').length

  return (
    <div>
      <PageHead title="Internships — university view" description="Aggregate monitoring across paid/free, with-college/independent, and completion" />

      <div className="mb-4 grid grid-cols-4 gap-4 max-lg:grid-cols-2">
        <Stat label="Paid postings" value={paid} />
        <Stat label="Free postings" value={free} />
        <Stat label="With college" value={wc} />
        <Stat label="Independent" value={ind} />
      </div>

      <Card className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse text-[13px]">
          <thead><tr>{['Role', 'Company', 'Type', 'Affiliation', 'Min duration', 'Applicants', 'Status'].map((h) => <th key={h} className="border-b border-line bg-paper px-3.5 py-2.5 text-left text-[10.5px] font-bold uppercase tracking-[.1em] text-muted">{h}</th>)}</tr></thead>
          <tbody>
            {internships.map((x) => (
              <tr key={x.id}>
                <td className="border-b border-line-2 px-3.5 py-3"><b className="text-[13.5px]">{x.role}</b></td>
                <td className="border-b border-line-2 px-3.5 py-3">{x.co}</td>
                <td className="border-b border-line-2 px-3.5 py-3">{x.type}</td>
                <td className="border-b border-line-2 px-3.5 py-3">{x.affiliation}</td>
                <td className="tnum border-b border-line-2 px-3.5 py-3">{x.minWeeks}w</td>
                <td className="tnum border-b border-line-2 px-3.5 py-3">{x.applicants.length}</td>
                <td className="border-b border-line-2 px-3.5 py-3"><Pill status={x.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <p className="mt-3 text-[12.5px] text-muted">Pending college-approval requests are managed by department coordinators under Internship approvals.</p>
    </div>
  )
}
