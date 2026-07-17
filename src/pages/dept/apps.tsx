import { Card } from '@/components/ui/Card'
import { Pill } from '@/components/ui/Pill'
import { PageHead } from '@/components/shared/PageHead'

const DEPT_APPS = [
  { student: 'Ananya Rao', role: 'Software Engineer · TCS', applied: '28 Jun', stage: 'Interview' },
  { student: 'Aarav Shah', role: 'Cloud Engineer · Amazon', applied: '02 Jul', stage: 'Interview' },
  { student: 'Riya Sen', role: 'Software Engineer · TCS', applied: '29 Jun', stage: 'Shortlisted' },
  { student: 'Meet Shah', role: 'Data Analyst · Deloitte', applied: '25 Jun', stage: 'Applied' },
  { student: 'Karan Mehta', role: 'QA Engineer · TCS', applied: '20 Jun', stage: 'Rejected' },
] as const

export default function DeptAppsPage() {
  return (
    <div>
      <PageHead title="Department applications" description="Every application by your students, across all postings" />

      <div className="mb-5 grid grid-cols-4 gap-3 max-lg:grid-cols-2">
        {[['Applied', 214, 'text-muted'], ['Shortlisted', 88, 'text-navy'], ['Interview', 31, 'text-gold'], ['Offer', 12, 'text-green']].map(([label, value, color]) => (
          <div key={label as string} className="relative overflow-hidden rounded-[10px] border border-line bg-white p-[15px]">
            <span className={`absolute inset-y-0 left-0 w-[3px] bg-current ${color}`} />
            <div className="font-serif text-[27px] font-semibold text-navy">{value}</div>
            <div className="mt-0.5 text-[10.5px] font-bold uppercase tracking-[.06em] text-muted">{label}</div>
          </div>
        ))}
      </div>

      <Card className="overflow-x-auto">
        <table className="w-full min-w-[500px] border-collapse text-[13px]">
          <thead><tr>{['Student', 'Role · Company', 'Applied', 'Stage'].map((h) => <th key={h} className="border-b border-line bg-paper px-3.5 py-2.5 text-left text-[10.5px] font-bold uppercase tracking-[.1em] text-muted">{h}</th>)}</tr></thead>
          <tbody>
            {DEPT_APPS.map((a) => (
              <tr key={a.student}>
                <td className="border-b border-line-2 px-3.5 py-3"><b className="text-[13.5px]">{a.student}</b></td>
                <td className="border-b border-line-2 px-3.5 py-3">{a.role}</td>
                <td className="tnum border-b border-line-2 px-3.5 py-3 text-muted">{a.applied}</td>
                <td className="border-b border-line-2 px-3.5 py-3"><Pill status={a.stage} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
