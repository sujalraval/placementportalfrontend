import { Icon } from '@/components/icons/Icon'
import type { IconName } from '@/components/icons/icons'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { PageHead } from '@/components/shared/PageHead'
import { ReportDocument } from '@/components/shared/ReportDocument'
import { useToast } from '@/context/ToastContext'
import { useDocViewer } from '@/context/DocViewerContext'
import { usePortalData } from '@/context/PortalDataContext'
import { exportRowsToExcel } from '@/lib/exportExcel'
import { CAND_POOL } from '@/data/mock/candidates'

const REPORTS: { icon: IconName; title: string; desc: string }[] = [
  { icon: 'chart', title: 'Placement summary — CS', desc: 'Rates, packages, and offers for your students' },
  { icon: 'users', title: 'Batch readiness report', desc: 'Readiness index distribution and at-risk list' },
  { icon: 'file', title: 'Verification log', desc: 'All approvals/rejections with timestamps' },
  { icon: 'brief', title: 'Application funnel', desc: 'Stage conversion for department applications' },
  { icon: 'book', title: 'Training participation', desc: 'Enrolment and attendance by course' },
  { icon: 'target', title: 'Skill-demand match', desc: 'Department skills vs recruiter demand' },
]

export default function DeptReportsPage() {
  const { showToast } = useToast()
  const { openDoc } = useDocViewer()
  const { dverify } = usePortalData()
  const deptCands = CAND_POOL.filter((c) => c.tag === 'CS' || c.tag === 'IT')

  // Training participation / Skill-demand match need admin-level TRAININGS/SECTORS
  // datasets that don't exist yet — they'll populate once the Admin phase adds them.
  function rowsFor(title: string): Record<string, unknown>[] {
    if (title === 'Placement summary — CS') return deptCands.map((c) => ({ Student: c.name, Enrollment: c.en, CGPA: c.cgpa, Backlogs: c.backlogs, Skills: c.skills.join(', ') }))
    if (title === 'Batch readiness report') return deptCands.map((c) => ({ Student: c.name, Enrollment: c.en, CGPA: c.cgpa, 'Skill Count': c.skills.length, Backlogs: c.backlogs }))
    if (title === 'Verification log') return dverify.map((v) => ({ Student: v.name, Enrollment: v.en, Item: v.item, Type: v.type, Date: v.date, Status: v.status }))
    if (title === 'Application funnel') return [{ Stage: 'Applied', Count: 214 }, { Stage: 'Shortlisted', Count: 88 }, { Stage: 'Interview', Count: 31 }, { Stage: 'Offer', Count: 12 }]
    return []
  }

  const previewPdf = (r: (typeof REPORTS)[number]) => {
    openDoc(r.title, 'Gujarat University · Placement report', <ReportDocument title={r.title} desc={r.desc} />, r.title)
    showToast('Report ready — use Download PDF to save')
  }

  const downloadExcel = async (r: (typeof REPORTS)[number]) => {
    const result = await exportRowsToExcel(r.title, rowsFor(r.title))
    showToast(`${result.filename} downloaded — ${result.rowCount} row(s)`)
  }

  return (
    <div>
      <PageHead title="Department reports" description="Ready-to-share exports for your department" />
      <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-1">
        {REPORTS.map((r) => (
          <Card pad key={r.title}>
            <div className="mb-3 grid h-10 w-10 place-items-center rounded-[9px] bg-navy-soft text-navy"><Icon name={r.icon} /></div>
            <h3 className="text-base">{r.title}</h3>
            <p className="my-1.5 text-[12.5px] text-muted">{r.desc}</p>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => downloadExcel(r)}>Excel</Button>
              <Button size="sm" variant="ghost" onClick={() => previewPdf(r)}>PDF</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
