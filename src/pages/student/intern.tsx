import { useMemo, useState } from 'react'
import { Icon } from '@/components/icons/Icon'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Pill, ColorPill } from '@/components/ui/Pill'
import { MetaRow, MetaTag } from '@/components/shared/MetaTag'
import { PageHead } from '@/components/shared/PageHead'
import { Tabs } from '@/components/shared/Tabs'
import { Stepper } from '@/components/shared/Stepper'
import { useModal } from '@/context/ModalContext'
import { useDocViewer } from '@/context/DocViewerContext'
import { InternReportModal } from '@/components/modals/InternReportModal'
import { CollegeApprovalLetter, ExperienceLetterNOC, InternshipReportDoc } from '@/components/shared/InternshipDocuments'
import { usePortalData } from '@/context/PortalDataContext'
import { internEligibleDate, weeksElapsed, fmtDate, type Internship, type MyInternship } from '@/data/mock/internships'
import { initials } from '@/lib/text'

const FILTERS = ['All', 'Paid', 'Free', 'With College', 'Independent']
const TABS = ['Browse internships', 'My internship']
const STAGES = ['Applied', 'Selected', 'Approval Requested', 'Approved', 'Completed']

function InternCard({ x, onApply }: { x: Internship; onApply: (id: number) => void }) {
  return (
    <div className="flex flex-col gap-2.5 rounded-[10px] border border-line bg-white p-[17px]">
      <div className="flex gap-3">
        <div className="grid h-11 w-11 flex-none place-items-center rounded-[9px] bg-navy-soft text-[15px] font-bold text-navy">{initials(x.co)}</div>
        <div className="flex-1"><h3 className="text-[15.5px]">{x.role}</h3><div className="text-[12.5px] text-muted">{x.co}</div></div>
        <Pill status={x.status} />
      </div>
      <MetaRow>
        <ColorPill color={x.type === 'Paid' ? 'green' : 'gold'}>{x.type === 'Paid' ? `Paid · ${x.stipend}` : 'Free / Unpaid'}</ColorPill>
        <MetaTag>{x.mode}</MetaTag>
        <MetaTag>{x.affiliation}</MetaTag>
        <MetaTag>Min {x.minWeeks} weeks</MetaTag>
      </MetaRow>
      <p className="my-1 text-[12.5px] text-[#46443d]">{x.desc}</p>
      <div className="mt-0.5 flex items-center justify-between border-t border-line-2 pt-[11px]">
        <small className="text-[11.5px] text-muted">{x.depts} · CGPA {x.cgpa}+ · closes {x.deadline}</small>
        <Button size="sm" onClick={() => onApply(x.id)}>Apply</Button>
      </div>
    </div>
  )
}

function InternTracker({ mi, index }: { mi: MyInternship; index: number }) {
  const idx = STAGES.indexOf(mi.stage)
  const eligible = internEligibleDate(mi)
  const elapsed = weeksElapsed(mi.approvedOn)
  const remaining = eligible ? Math.max(0, Math.ceil(mi.minWeeks - elapsed)) : null
  const { openModal } = useModal()
  const { openDoc } = useDocViewer()
  const { me, requestInternshipApproval } = usePortalData()

  return (
    <div className="mb-3 rounded-[10px] border border-line bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 flex-none place-items-center rounded-lg bg-navy-soft font-bold text-navy">{initials(mi.co)}</div>
        <div className="flex-1">
          <b className="text-[15px]">{mi.role}</b>
          <div className="text-[12.5px] text-muted">{mi.co} · {mi.type === 'Paid' ? mi.stipend : 'Unpaid'} · {mi.affiliation} · min {mi.minWeeks} weeks</div>
        </div>
        <Pill status={mi.stage} />
      </div>

      <Stepper stages={STAGES} currentIndex={idx} />

      <div className="mt-3 flex flex-wrap gap-2 border-t border-line-2 pt-3">
        {mi.stage === 'Selected' && (
          <Button variant="gold" size="sm" onClick={() => requestInternshipApproval(index)}>Request college approval letter</Button>
        )}
        {mi.stage === 'Approval Requested' && (
          <span className="self-center text-[12.5px] text-muted">Awaiting department approval — you'll be notified once issued.</span>
        )}
        {(mi.stage === 'Approved' || mi.stage === 'Completed') && (
          <Button variant="ghost" size="sm" onClick={() => openDoc('Letter of College Approval · Internship', 'Gujarat University · Training & Placement Cell', <CollegeApprovalLetter mi={mi} me={me} />, `${me.name}_College_Approval_Letter`)}>
            <Icon name="file" /> College approval letter
          </Button>
        )}
        {mi.stage === 'Approved' && !mi.reportText && (
          <Button size="sm" onClick={() => openModal(`Submit internship report · ${mi.role}`, <InternReportModal index={index} />)}>Submit internship report</Button>
        )}
        {mi.reportText && (
          <Button variant="ghost" size="sm" onClick={() => openDoc(`Internship Completion Report · ${mi.role}`, mi.co, <InternshipReportDoc mi={mi} me={me} />, `${me.name}_Internship_Report`)}>
            View submitted report
          </Button>
        )}
        {mi.certificateIssued && (
          <Button variant="gold" size="sm" onClick={() => openDoc(`Experience Letter & NOC · ${mi.co}`, mi.co, <ExperienceLetterNOC mi={mi} me={me} />, `${me.name}_Experience_Letter_NOC`)}>
            <Icon name="check" /> Download Experience Letter &amp; NOC
          </Button>
        )}
      </div>

      {mi.mentor && <p className="mt-2.5 text-xs text-muted">Faculty mentor: <b className="text-navy">{mi.mentor}</b></p>}
      {mi.stage === 'Approved' && eligible && (
        <p className="mt-1.5 text-xs text-muted">
          Minimum-duration compliance: eligible for completion from <b className="text-navy">{fmtDate(eligible)}</b>
          {remaining && remaining > 0 ? <> · <b className="text-gold">{remaining} week(s) remaining</b></> : <> · <b className="text-green">requirement met</b></>}
        </p>
      )}
      {mi.credits && (
        <div className="mt-2.5 flex items-center gap-3.5 rounded-[10px] border border-[#BFE0CE] bg-green-soft p-3">
          <div className="grid h-9 w-9 flex-none place-items-center rounded-lg bg-white"><Icon name="grad" /></div>
          <div><b className="text-sm">Academic credits mapped</b><small className="block text-xs text-[#46443d]">{mi.credits.course} · {mi.credits.count} credits · Evaluation: {mi.credits.evalBasis}</small></div>
        </div>
      )}
    </div>
  )
}

export default function StudentInternPage() {
  const [tab, setTab] = useState(0)
  const [filter, setFilter] = useState('All')
  const { internships, myInterns, applyInternship } = usePortalData()

  const filtered = useMemo(
    () => internships.filter((x) => filter === 'All' || `${x.type} ${x.affiliation}`.includes(filter)),
    [internships, filter],
  )

  return (
    <div>
      <PageHead title="Internships" description="A separate track from placements — paid & free, fixed & flexible timing, with-college & independent" />
      <Tabs tabs={TABS} active={tab} onChange={setTab} />

      {tab === 0 && (
        <div>
          <div className="mb-[18px] flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full border px-3.5 py-1.5 text-[12.5px] font-semibold ${
                  filter === f ? 'border-navy bg-navy text-white' : 'border-line bg-white text-[#3a3833]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3.5 max-lg:grid-cols-1">
            {filtered.map((x) => <InternCard key={x.id} x={x} onApply={applyInternship} />)}
          </div>
        </div>
      )}

      {tab === 1 && (
        myInterns.length ? myInterns.map((mi, i) => <InternTracker key={mi.internId} mi={mi} index={i} />)
          : <Card pad><p className="text-[13px] text-muted">You haven't applied to an internship yet. Browse open internships in the first tab.</p></Card>
      )}
    </div>
  )
}
