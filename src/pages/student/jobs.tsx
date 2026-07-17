import { useMemo, useState } from 'react'
import { Icon } from '@/components/icons/Icon'
import { Button } from '@/components/ui/Button'
import { Stat } from '@/components/ui/Stat'
import { ColorPill } from '@/components/ui/Pill'
import { MetaRow, MetaTag } from '@/components/shared/MetaTag'
import { PageHead } from '@/components/shared/PageHead'
import { useModal } from '@/context/ModalContext'
import { ApplyJobModal } from '@/components/modals/ApplyJobModal'
import { JOBS, kindOf, matchScore } from '@/data/mock/jobs'
import { initials } from '@/lib/text'

const DEPT_TAGS = ['All', 'CS', 'Commerce', 'MBA', 'Law', 'Science']
const KINDS = ['All', 'Placement', 'Internship', 'OJT'] as const

export default function StudentJobsPage() {
  const { openModal } = useModal()
  const [kind, setKind] = useState<(typeof KINDS)[number]>('All')
  const [dept, setDept] = useState('All')

  const openCount = JOBS.filter((j) => j.status === 'Open').length
  const countFor = (k: string) => JOBS.filter((j) => j.status === 'Open' && (k === 'All' || kindOf(j) === k)).length

  const filtered = useMemo(
    () => JOBS.filter((j) => (kind === 'All' || kindOf(j) === kind) && (dept === 'All' || j.tag.includes(dept))),
    [kind, dept],
  )

  return (
    <div>
      <PageHead title="Browse opportunities" description={`Placements, internships, and on-the-job training — ${openCount} open across all three`} />

      <div className="mb-4 grid grid-cols-3 gap-4 max-lg:grid-cols-1">
        <Stat label="Placements" value={countFor('Placement')} sub="Full-time campus roles" />
        <Stat label="Internships" value={countFor('Internship')} sub="Incl. internship + PPO" />
        <Stat label="OJT" value={countFor('OJT')} sub="On-the-job training" />
      </div>

      <div className="mb-2 flex flex-wrap gap-2">
        {KINDS.map((k) => (
          <button
            key={k}
            onClick={() => setKind(k)}
            className={`rounded-full border px-3.5 py-1.5 text-[12.5px] font-semibold ${
              kind === k ? 'border-navy bg-navy text-white' : 'border-line bg-white text-[#3a3833]'
            }`}
          >
            {k}{k !== 'All' ? ` · ${countFor(k)}` : ''}
          </button>
        ))}
      </div>
      <div className="mb-[18px] flex flex-wrap gap-2">
        {DEPT_TAGS.map((t) => (
          <button
            key={t}
            onClick={() => setDept(t)}
            className={`rounded-full border px-3.5 py-1.5 text-[12.5px] font-semibold ${
              dept === t ? 'border-navy bg-navy text-white' : 'border-line bg-white text-[#3a3833]'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3.5 max-lg:grid-cols-1">
        {filtered.map((j) => {
          const m = matchScore(j)
          return (
            <div key={j.id} className="flex flex-col gap-2.5 rounded-[10px] border border-line bg-white p-[17px]">
              <div className="flex gap-3">
                <div className="grid h-11 w-11 flex-none place-items-center rounded-[9px] bg-navy-soft text-[15px] font-bold text-navy">{initials(j.co)}</div>
                <div className="flex-1"><h3 className="text-[15.5px]">{j.role}</h3><div className="text-[12.5px] text-muted">{j.co}</div></div>
                <ColorPill color={m >= 75 ? 'green' : 'navy'}>{m}% match</ColorPill>
              </div>
              <MetaRow>
                <MetaTag>{j.type}</MetaTag>
                <MetaTag>{j.loc}</MetaTag>
                <MetaTag>{j.ctc}</MetaTag>
                <MetaTag>Min CGPA {j.cgpa}</MetaTag>
              </MetaRow>
              <div className="mt-0.5 flex items-center justify-between border-t border-line-2 pt-[11px]">
                <small className="text-[11.5px] text-muted">{j.apps} applied · closes {j.deadline}</small>
                {j.status === 'Open' ? (
                  <Button size="sm" onClick={() => openModal(`Apply — ${j.role}`, <ApplyJobModal role={j.role} co={j.co} />)}>Apply now</Button>
                ) : (
                  <Button size="sm" variant="ghost" disabled className="opacity-50">Closed</Button>
                )}
              </div>
            </div>
          )
        })}
        {filtered.length === 0 && (
          <div className="col-span-2 py-8 text-center text-[13px] text-muted max-lg:col-span-1">
            <Icon name="brief" className="mx-auto mb-2 h-6 w-6" />
            No openings match these filters.
          </div>
        )}
      </div>
    </div>
  )
}
