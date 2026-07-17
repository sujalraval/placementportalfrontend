import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Pill } from '@/components/ui/Pill'
import { PageHead } from '@/components/shared/PageHead'
import { useToast } from '@/context/ToastContext'
import { useDocViewer } from '@/context/DocViewerContext'
import { usePortalData } from '@/context/PortalDataContext'
import { CvDocument } from '@/components/shared/CvDocument'
import { CAND_POOL } from '@/data/mock/candidates'

export default function DeptStudentsPage() {
  const { showToast } = useToast()
  const { openDoc } = useDocViewer()
  const { me } = usePortalData()
  const students = CAND_POOL.filter((c) => c.tag === 'CS' || c.tag === 'IT')

  const viewCV = (en: string, name: string, dept: string, cgpa: number) => {
    const doc = { ...me, name, en, dept, cgpa: String(cgpa) }
    openDoc(`Curriculum Vitae · ${name}`, 'Generated from student profile', <CvDocument profile={doc} />, `${name}_CV`)
  }

  return (
    <div>
      <PageHead
        title="Department students"
        description="Batch 2026 · readiness and placement status"
        actions={
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => showToast('Exported department roster')}>Export</Button>
            <Button onClick={() => showToast('Broadcast sent to department students')}>Message batch</Button>
          </div>
        }
      />
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse text-[13px]">
          <thead>
            <tr>{['Student', 'CGPA', 'Backlogs', 'Readiness', 'Applications', 'Status', ''].map((h) => <th key={h} className="border-b border-line bg-paper px-3.5 py-2.5 text-left text-[10.5px] font-bold uppercase tracking-[.1em] text-muted">{h}</th>)}</tr>
          </thead>
          <tbody>
            {students.map((c) => {
              const r = Math.min(96, Math.round(c.cgpa * 8 + c.skills.length * 4))
              return (
                <tr key={c.en}>
                  <td className="border-b border-line-2 px-3.5 py-3"><b className="text-[13.5px]">{c.name}</b><small className="tnum block text-muted">{c.en}</small></td>
                  <td className="tnum border-b border-line-2 px-3.5 py-3">{c.cgpa}</td>
                  <td className="tnum border-b border-line-2 px-3.5 py-3">{c.backlogs}</td>
                  <td className="border-b border-line-2 px-3.5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-[7px] w-[60px] overflow-hidden rounded-full bg-line"><div className="h-full" style={{ width: `${r}%`, background: r >= 70 ? 'var(--color-green)' : r >= 55 ? 'var(--color-gold)' : 'var(--color-red)' }} /></div>
                      <b className="tnum text-xs text-navy">{r}</b>
                    </div>
                  </td>
                  <td className="tnum border-b border-line-2 px-3.5 py-3">{2 + (c.name.length % 4)}</td>
                  <td className="border-b border-line-2 px-3.5 py-3"><Pill status={c.en === 'GU21CS118' ? 'Placed' : 'Available'} /></td>
                  <td className="border-b border-line-2 px-3.5 py-3 text-right">
                    <Button variant="ghost" size="sm" onClick={() => viewCV(c.en, c.name, c.dept, c.cgpa)}>CV</Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
