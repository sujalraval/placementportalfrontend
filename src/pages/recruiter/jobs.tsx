import { useState } from 'react'
import { Icon } from '@/components/icons/Icon'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Pill, ColorPill } from '@/components/ui/Pill'
import { PageHead } from '@/components/shared/PageHead'
import { SectionTitle } from '@/components/shared/SectionCard'
import { InfoGrid } from '@/components/shared/InfoGrid'
import { IconControlButton } from '@/components/shared/IconControls'
import { useModal } from '@/context/ModalContext'
import { PostJobModal } from '@/components/modals/PostJobModal'
import { ReviewCandModal } from '@/components/modals/ReviewCandModal'
import { useRecruiterData } from '@/context/RecruiterDataContext'
import { getCand, scoreCand } from '@/data/mock/candidates'
import type { RecJob } from '@/data/mock/recruiterJobs'

function JobDetailView({ index, job, onBack }: { index: number; job: RecJob; onBack: () => void }) {
  const { openModal } = useModal()
  const { setAppStage, publishJob } = useRecruiterData()
  const apps = (job.applicants || [])
    .map((a) => { const c = getCand(a.en); return c ? { a, c, sc: scoreCand(job, c) } : null })
    .filter((x): x is NonNullable<typeof x> => x !== null)
    .sort((x, y) => y.sc.overall - x.sc.overall)

  return (
    <div>
      <div className="mb-[22px] flex flex-wrap items-end justify-between gap-4">
        <div>
          <Button variant="ghost" size="sm" onClick={onBack}>← Back to postings</Button>
          <h1 className="mt-2 text-[26px]">{job.role}</h1>
          <p className="mt-[3px] text-[13.5px] text-muted">{job.type} · {job.sector || '—'} · {job.loc} · {job.ctc}</p>
        </div>
        <div className="flex items-center gap-2">
          <Pill status={job.status} />
          {(job.status === 'Draft' || job.status === 'Pending approval') && (
            <Button onClick={() => publishJob(index)}>Publish</Button>
          )}
          <Button variant="ghost" onClick={() => openModal('Edit posting', <PostJobModal index={index} job={job} />)}>Edit</Button>
        </div>
      </div>

      <div className="flex gap-4 max-lg:flex-col">
        <Card pad className="flex-[1.4]">
          <SectionTitle title="Posting details" />
          <InfoGrid items={[
            ['Employment type', job.type], ['Sector', job.sector || '—'], ['CTC / Stipend', job.ctc], ['Location', job.loc],
            ['Openings', job.openings || '—'], ['Minimum CGPA', job.cgpa], ['Eligible departments', job.depts], ['Batch', job.batch],
            ['Application deadline', job.deadline], ['Service agreement', job.bond || 'None'],
          ]} />
          <div className="mt-4">
            <SectionTitle title="Required skills" />
            <div className="flex flex-wrap gap-1.5">
              {job.skills.length ? job.skills.map((s) => <span key={s} className="rounded-full border border-line bg-paper px-2.5 py-1 text-xs font-semibold text-[#3a3833]">{s}</span>) : <span className="text-[13px] text-muted">None specified</span>}
            </div>
          </div>
          <div className="mt-4">
            <SectionTitle title="Job description" />
            <p className="text-[13.5px] leading-[1.6] text-[#333]">{job.jd || '—'}</p>
          </div>
        </Card>
        <Card pad className="flex-1">
          <SectionTitle title="Selection process" />
          {job.rounds.length ? job.rounds.map((r, k) => (
            <div key={r} className="flex items-center gap-3 border-b border-line-2 py-2.5 last:border-b-0">
              <div className="grid h-[34px] w-[34px] flex-none place-items-center rounded-[7px] bg-navy-soft font-bold text-navy">{k + 1}</div>
              <b className="text-[13px]">{r}</b>
            </div>
          )) : <p className="text-[13px] text-muted">No rounds configured</p>}
          <div className="mt-3.5 rounded-[10px] border border-line bg-white p-4">
            <div className="text-[10.5px] font-bold uppercase tracking-[.12em] text-muted">Total applicants</div>
            <div className="tnum mt-1.5 font-serif text-[30px] font-semibold text-navy">{job.apps}</div>
            <div className="mt-1.5 text-[11.5px] text-muted">{apps.length} auto-ranked below</div>
          </div>
        </Card>
      </div>

      <div className="mb-3.5 mt-5 flex items-center gap-2.5">
        <h3 className="text-base">Applications for this post</h3>
        <div className="h-px flex-1 bg-line" />
        <ColorPill color="navy">Auto-scored: skills · CGPA · department · batch · backlogs</ColorPill>
      </div>
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse text-[13px]">
          <thead>
            <tr>{['Candidate', 'Dept', 'CGPA', 'Match score', 'Skills', 'Stage', ''].map((h) => <th key={h} className="border-b border-line bg-paper px-3.5 py-2.5 text-left text-[10.5px] font-bold uppercase tracking-[.1em] text-muted">{h}</th>)}</tr>
          </thead>
          <tbody>
            {apps.length ? apps.map(({ a, c, sc }) => (
              <tr key={a.en}>
                <td className="border-b border-line-2 px-3.5 py-3"><b className="text-[13.5px]">{c.name}</b><small className="tnum block text-muted">{c.en}</small></td>
                <td className="border-b border-line-2 px-3.5 py-3">{c.dept}</td>
                <td className="tnum border-b border-line-2 px-3.5 py-3">{c.cgpa}</td>
                <td className="border-b border-line-2 px-3.5 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-[72px] overflow-hidden rounded-full bg-line"><div className="h-full" style={{ width: `${sc.overall}%`, background: sc.overall >= 75 ? 'var(--color-green)' : sc.overall >= 55 ? 'var(--color-gold)' : 'var(--color-red)' }} /></div>
                    <b className="tnum text-[12.5px] text-navy">{sc.overall}%</b>
                  </div>
                </td>
                <td className="border-b border-line-2 px-3.5 py-3 text-xs text-[#46443d]">{sc.skillOverlap}/{sc.reqCount}</td>
                <td className="border-b border-line-2 px-3.5 py-3"><Pill status={a.stage} /></td>
                <td className="border-b border-line-2 px-3.5 py-3 text-right">
                  <div className="flex justify-end gap-1.5">
                    <IconControlButton onClick={() => openModal(`Candidate review · ${c.name}`, <ReviewCandModal jobIndex={index} job={job} cand={c} />)}>Review</IconControlButton>
                    {a.stage !== 'Rejected' && <IconControlButton onClick={() => setAppStage(index, c.en, 'Shortlisted')}>Shortlist</IconControlButton>}
                  </div>
                </td>
              </tr>
            )) : <tr><td colSpan={7} className="p-4 text-[13px] text-muted">No applications yet.</td></tr>}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

export default function RecruiterJobsPage() {
  const { recJobs, publishJob, closeJob, deleteJob } = useRecruiterData()
  const { openModal } = useModal()
  const [view, setView] = useState<number | null>(null)

  if (view !== null && recJobs[view]) {
    return <JobDetailView index={view} job={recJobs[view]} onBack={() => setView(null)} />
  }

  return (
    <div>
      <PageHead
        title="Jobs & postings"
        description="Draft, publish, and manage every posting · click a row to view the post & its applications"
        actions={<Button variant="gold" onClick={() => openModal('New posting', <PostJobModal index={-1} />)}><Icon name="brief" /> New posting</Button>}
      />
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse text-[13px]">
          <thead>
            <tr>{['Role', 'Type', 'Eligibility', 'Applicants', 'Status', ''].map((h) => <th key={h} className="border-b border-line bg-paper px-3.5 py-2.5 text-left text-[10.5px] font-bold uppercase tracking-[.1em] text-muted">{h}</th>)}</tr>
          </thead>
          <tbody>
            {recJobs.map((j, i) => (
              <tr key={j.role} onClick={() => setView(i)} className="cursor-pointer">
                <td className="border-b border-line-2 px-3.5 py-3"><b className="text-[13.5px]">{j.role}</b><small className="block text-muted">{j.loc} · {j.ctc} · {j.sector || ''}</small></td>
                <td className="border-b border-line-2 px-3.5 py-3">{j.type}</td>
                <td className="border-b border-line-2 px-3.5 py-3">{j.depts} · CGPA {j.cgpa}+ · {j.batch}</td>
                <td className="tnum border-b border-line-2 px-3.5 py-3">{j.apps}</td>
                <td className="border-b border-line-2 px-3.5 py-3"><Pill status={j.status} /></td>
                <td className="border-b border-line-2 px-3.5 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-end gap-1.5">
                    <IconControlButton onClick={() => setView(i)}>View</IconControlButton>
                    {(j.status === 'Draft' || j.status === 'Pending approval') && <IconControlButton onClick={() => publishJob(i)}>Publish</IconControlButton>}
                    {j.status === 'Published' && <IconControlButton onClick={() => closeJob(i)}>Close</IconControlButton>}
                    <IconControlButton onClick={() => openModal('Edit posting', <PostJobModal index={i} job={j} />)}>Edit</IconControlButton>
                    <IconControlButton danger onClick={() => deleteJob(i)}>Delete</IconControlButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
