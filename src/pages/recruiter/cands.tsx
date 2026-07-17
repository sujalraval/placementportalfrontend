import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Pill, ColorPill } from '@/components/ui/Pill'
import { PageHead } from '@/components/shared/PageHead'
import { IconControlButton } from '@/components/shared/IconControls'
import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { useDocViewer } from '@/context/DocViewerContext'
import { usePortalData } from '@/context/PortalDataContext'
import { useRecruiterData } from '@/context/RecruiterDataContext'
import { MarkEvaluationModal } from '@/components/modals/MarkEvaluationModal'
import { FinalizeSalaryModal } from '@/components/modals/FinalizeSalaryModal'
import { CvDocument } from '@/components/shared/CvDocument'
import { funnelCounts } from '@/data/mock/candidates'

export default function RecruiterCandsPage() {
  const { recCands, markJoined, rejectCand } = useRecruiterData()
  const { me } = usePortalData()
  const { openModal } = useModal()
  const { showToast } = useToast()
  const { openDoc } = useDocViewer()

  const f = funnelCounts(recCands)
  const pct = (a: number, b: number) => (b ? Math.round((a / b) * 100) + '%' : '—')
  const stats = [
    ['Applied', f.applied, ''], ['Appeared', f.appeared, pct(f.appeared, f.applied)],
    ['Technical done', f.tech, pct(f.tech, f.appeared)], ['HR done', f.hr, pct(f.hr, f.tech)],
    ['Offers', f.offer, pct(f.offer, f.hr)], ['Joined', f.joined, pct(f.joined, f.offer)],
  ] as const

  const viewCV = (name: string, en: string, dept: string, cgpa: string) => {
    const doc = { ...me, name, en, dept, cgpa }
    openDoc(`Curriculum Vitae · ${name}`, 'Generated from student profile', <CvDocument profile={doc} />, `${name}_CV`)
  }

  return (
    <div>
      <PageHead
        title="Candidate evaluation · Software Engineer"
        description="Round-wise marking → salary finalization → joining — the full selection record lives here"
        actions={<Button variant="gold" onClick={() => showToast('Top 20 shortlisted by AI match')}>Shortlist top 20</Button>}
      />

      <div className="mb-4 grid grid-cols-6 gap-3 max-lg:grid-cols-3">
        {stats.map(([label, value, conv]) => (
          <div key={label} className="rounded-[10px] border border-line bg-white p-[15px]">
            <div className="text-[10.5px] font-bold uppercase tracking-[.12em] text-muted">{label}</div>
            <div className="tnum mt-1.5 font-serif text-[27px] font-semibold text-navy">{value}</div>
            <div className="tnum mt-1 text-[11.5px] text-muted">{conv ? `${conv} conversion` : ''}</div>
          </div>
        ))}
      </div>

      <Card className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse text-[13px]">
          <thead>
            <tr>{['Candidate', 'Match', 'Aptitude', 'Technical', 'HR', 'Stage', ''].map((h) => <th key={h} className="border-b border-line bg-paper px-3.5 py-2.5 text-left text-[10.5px] font-bold uppercase tracking-[.1em] text-muted">{h}</th>)}</tr>
          </thead>
          <tbody>
            {recCands.map((c, i) => {
              const mk = (r: number | null) => r != null ? <b className={`tnum ${r >= 60 ? 'text-green' : 'text-red'}`}>{r}</b> : <span className="text-muted">—</span>
              return (
                <tr key={c.en}>
                  <td className="border-b border-line-2 px-3.5 py-3"><b className="text-[13.5px]">{c.name}</b><small className="tnum block text-muted">{c.en} · CGPA {c.cgpa}</small></td>
                  <td className="tnum border-b border-line-2 px-3.5 py-3 font-bold text-navy">{c.match}%</td>
                  <td className="border-b border-line-2 px-3.5 py-3">{mk(c.marks.apt)}</td>
                  <td className="border-b border-line-2 px-3.5 py-3">{mk(c.marks.tech)}</td>
                  <td className="border-b border-line-2 px-3.5 py-3">{mk(c.marks.hr)}</td>
                  <td className="border-b border-line-2 px-3.5 py-3">{c.joined ? <ColorPill color="green">Joined</ColorPill> : <Pill status={c.stage} />}</td>
                  <td className="border-b border-line-2 px-3.5 py-3 text-right">
                    <div className="flex justify-end gap-1.5">
                      <IconControlButton onClick={() => viewCV(c.name, c.en, c.dept, c.cgpa)}>CV</IconControlButton>
                      {c.stage !== 'Rejected' && <IconControlButton onClick={() => openModal(`Round evaluation · ${c.name}`, <MarkEvaluationModal index={i} />)}>Evaluate</IconControlButton>}
                      {c.stage !== 'Rejected' && c.marks.hr != null && c.stage !== 'Offer' && (
                        <IconControlButton onClick={() => openModal(`Finalize salary · ${c.name}`, <FinalizeSalaryModal index={i} />)}>Finalize salary</IconControlButton>
                      )}
                      {c.stage === 'Offer' && !c.joined && <IconControlButton onClick={() => markJoined(i)}>Mark joined</IconControlButton>}
                      {c.stage !== 'Rejected' && c.stage !== 'Offer' && <IconControlButton danger onClick={() => rejectCand(i)}>Reject</IconControlButton>}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Card>
      <p className="mt-3 text-[12.5px] text-muted">Marks below 60 are flagged red. Salary can be finalized only after the HR round is marked — the institution sees this funnel live for transparency.</p>
    </div>
  )
}
