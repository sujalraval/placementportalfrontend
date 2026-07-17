import { Icon } from '@/components/icons/Icon'
import type { IconName } from '@/components/icons/icons'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { PageHead } from '@/components/shared/PageHead'
import { ReportDocument } from '@/components/shared/ReportDocument'
import { useToast } from '@/context/ToastContext'
import { useDocViewer } from '@/context/DocViewerContext'
import { usePortalData } from '@/context/PortalDataContext'
import { useAdminData } from '@/context/AdminDataContext'
import { exportRowsToExcel } from '@/lib/exportExcel'

const REPORTS: { icon: IconName; title: string; desc: string }[] = [
  { icon: 'chart', title: 'Placement summary', desc: 'Department-wise rates, packages, and offer counts' },
  { icon: 'file', title: 'NAAC / NIRF export', desc: 'Formatted placement data for accreditation' },
  { icon: 'users', title: 'Recruiter engagement', desc: 'Companies, hires, and repeat-recruiter trends' },
  { icon: 'brief', title: 'Drive outcomes', desc: 'Conversion at each round for every drive' },
  { icon: 'book', title: 'Training impact', desc: 'Enrolment vs placement correlation' },
  { icon: 'target', title: 'Skill-gap report', desc: 'In-demand skills vs student supply' },
]

function pct(a: number, b: number) {
  return b ? Math.round((a / b) * 100) + '%' : '—'
}

export default function AdminReportsPage() {
  const { showToast } = useToast()
  const { openDoc } = useDocViewer()
  const { companies, drives } = usePortalData()
  const { depts, sectors } = useAdminData()

  function rowsFor(title: string): Record<string, unknown>[] {
    if (title === 'Placement summary' || title === 'NAAC / NIRF export') {
      const rows = depts.map((d) => ({ Department: d.name, Coordinator: d.coord, Students: d.total, Placed: d.placed, 'Placement Rate': pct(d.placed, d.total) }))
      const tot = depts.reduce((a, d) => a + d.total, 0)
      const plc = depts.reduce((a, d) => a + d.placed, 0)
      rows.push({ Department: 'UNIVERSITY TOTAL', Coordinator: '', Students: tot, Placed: plc, 'Placement Rate': pct(plc, tot) })
      return rows
    }
    if (title === 'Recruiter engagement') return companies.map((c) => ({ Company: c.name, Sector: c.sector, Type: c.type || 'Employer', 'Hires (season)': c.hires, 'Avg Package (LPA)': c.pkg, Status: c.status }))
    if (title === 'Drive outcomes') return drives.map((d) => ({ Drive: d.title, Company: d.co, Date: d.date, Departments: d.depts, Rounds: d.rounds, Registered: d.reg, Status: d.status }))
    if (title === 'Skill-gap report') return sectors.map((s) => ({ Sector: s.name, 'Companies Hiring': s.companies, 'Open Positions': s.openings, Status: s.status }))
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
      <PageHead title="Reports & analytics" description="Accreditation-ready exports and custom reports" />
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
