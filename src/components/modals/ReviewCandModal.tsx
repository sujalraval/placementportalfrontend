import { Icon } from '@/components/icons/Icon'
import { Button } from '@/components/ui/Button'
import { useModal } from '@/context/ModalContext'
import { useDocViewer } from '@/context/DocViewerContext'
import { useRecruiterData } from '@/context/RecruiterDataContext'
import { scoreCand, type CandPoolMember } from '@/data/mock/candidates'
import type { RecJob } from '@/data/mock/recruiterJobs'
import { CvDocument } from '@/components/shared/CvDocument'
import { usePortalData } from '@/context/PortalDataContext'
import { initials } from '@/lib/text'

interface ReviewCandModalProps {
  jobIndex: number
  job: RecJob
  cand: CandPoolMember
}

export function ReviewCandModal({ jobIndex, job, cand }: ReviewCandModalProps) {
  const { closeModal } = useModal()
  const { openDoc } = useDocViewer()
  const { setAppStage } = useRecruiterData()
  const { me } = usePortalData()
  const sc = scoreCand(job, cand)
  const req = job.skills || []
  const have = cand.skills.map((s) => s.toLowerCase())
  const matched = req.filter((s) => have.includes(s.toLowerCase()))
  const missing = req.filter((s) => !have.includes(s.toLowerCase()))
  const color = sc.overall >= 75 ? 'text-green' : sc.overall >= 55 ? 'text-gold' : 'text-red'

  const decide = (stage: 'Shortlisted' | 'Interview' | 'Rejected') => { setAppStage(jobIndex, cand.en, stage); closeModal() }

  const viewCV = () => {
    closeModal()
    // The candidate pool's own CV data — reuse the student's document renderer for demo purposes.
    const doc = { ...me, name: cand.name, en: cand.en, dept: cand.dept, cgpa: String(cand.cgpa) }
    openDoc(`Curriculum Vitae · ${cand.name}`, 'Generated from student profile', <CvDocument profile={doc} />, `${cand.name}_CV`)
  }

  return (
    <div>
      <div className="mb-1.5 flex items-center gap-3.5">
        <div className="grid h-[46px] w-[46px] flex-none place-items-center rounded-lg bg-navy-soft font-bold text-navy">{initials(cand.name)}</div>
        <div className="flex-1">
          <b className="text-[15px]">{cand.name}</b>
          <div className="text-[12.5px] text-muted">{cand.dept} · Batch {cand.batch} · CGPA {cand.cgpa} · {cand.backlogs} backlogs · {cand.en}</div>
        </div>
        <div className="text-right">
          <div className={`font-serif text-[28px] font-semibold ${color}`}>{sc.overall}%</div>
          <div className="text-[10px] uppercase tracking-[.08em] text-muted">Match</div>
        </div>
      </div>

      <div className="mb-2.5 mt-4 border-t border-line pt-3.5 text-[11px] font-extrabold uppercase tracking-[.1em] text-navy">Score breakdown by criteria</div>
      {sc.parts.map((p) => (
        <div key={p.label} className="flex items-center gap-3 py-1.5">
          <div className="w-[150px] flex-none text-[13px]">{p.label}<br /><span className="text-[10.5px] text-muted">{p.detail}</span></div>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-line"><div className="h-full rounded-full bg-navy" style={{ width: `${p.pct}%` }} /></div>
          <div className="tnum w-8 text-right text-xs font-bold text-navy">{p.pct}</div>
          <span className="w-9 text-right text-[10.5px] text-muted">×{p.w}%</span>
        </div>
      ))}

      <div className="mb-2.5 mt-4 border-t border-line pt-3.5 text-[11px] font-extrabold uppercase tracking-[.1em] text-navy">Skills</div>
      <div className="mb-1 flex flex-wrap gap-1.5">
        {matched.map((s) => <span key={s} className="rounded-full border border-[#BFE0CE] bg-green-soft px-2.5 py-1 text-xs font-semibold text-green">✓ {s}</span>)}
        {missing.map((s) => <span key={s} className="rounded-full border border-line bg-paper px-2.5 py-1 text-xs font-semibold text-muted">✕ {s}</span>)}
      </div>

      <div className="mb-2.5 mt-4 border-t border-line pt-3.5 text-[11px] font-extrabold uppercase tracking-[.1em] text-navy">Decision</div>
      <div className="flex flex-wrap gap-2">
        <Button variant="ghost" onClick={viewCV}><Icon name="file" /> View CV</Button>
        <Button onClick={() => decide('Shortlisted')}>Shortlist</Button>
        <Button variant="gold" onClick={() => decide('Interview')}>Move to interview</Button>
        <Button variant="ghost" className="!text-red !border-red" onClick={() => decide('Rejected')}>Reject</Button>
      </div>
    </div>
  )
}
