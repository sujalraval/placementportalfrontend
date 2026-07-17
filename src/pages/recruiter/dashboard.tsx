import { useNavigate } from 'react-router-dom'
import { Icon } from '@/components/icons/Icon'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Pill, ColorPill } from '@/components/ui/Pill'
import { PageHead } from '@/components/shared/PageHead'
import { SectionTitle } from '@/components/shared/SectionCard'
import { ListRow } from '@/components/shared/ListRow'
import { Banner } from '@/components/shared/Banner'
import { useModal } from '@/context/ModalContext'
import { PostJobModal } from '@/components/modals/PostJobModal'
import { useRecruiterData } from '@/context/RecruiterDataContext'

const FUNNEL = [['Applied', 392], ['Shortlisted', 148], ['Interview', 46], ['Offer', 18], ['Accepted', 12]] as const

export default function RecruiterDashboardPage() {
  const navigate = useNavigate()
  const { openModal } = useModal()
  const { rec, recJobs, interviews, offers } = useRecruiterData()

  const active = recJobs.filter((j) => j.status === 'Published').length
  const apps = recJobs.reduce((a, j) => a + j.apps, 0)
  const scheduled = interviews.filter((i) => i.status === 'Scheduled')

  return (
    <div>
      <PageHead
        title={`${rec.company} · Recruiter`}
        description={<>Campus hiring at Gujarat University · <ColorPill color="navy">MOU signed</ColorPill> · ⭐ {rec.rating}</>}
        actions={<Button variant="gold" onClick={() => openModal('New posting', <PostJobModal index={-1} />)}><Icon name="brief" /> Post a job</Button>}
      />

      <Banner
        icon={<Icon name="shield" className="text-navy" />}
        title="Verified recruiter · Onboarding complete"
        subtitle={`MOU valid till ${rec.mouData.valid} · full access to the candidate pool`}
        action={<Button variant="ghost" size="sm" onClick={() => navigate('/recruiter/onboard')}>View status</Button>}
      />

      <div className="mb-[18px] grid grid-cols-5 gap-4 max-lg:grid-cols-2">
        <div className="rounded-[10px] border border-line bg-white p-4"><div className="text-[10.5px] font-bold uppercase tracking-[.12em] text-muted">Active postings</div><div className="tnum mt-1.5 font-serif text-[30px] font-semibold text-navy">{active}</div></div>
        <div className="rounded-[10px] border border-line bg-white p-4"><div className="text-[10.5px] font-bold uppercase tracking-[.12em] text-muted">Applicants</div><div className="tnum mt-1.5 font-serif text-[30px] font-semibold text-navy">{apps}</div><div className="mt-1.5 text-[11.5px] text-muted"><b className="text-green">+42</b> this week</div></div>
        <div className="rounded-[10px] border border-line bg-white p-4"><div className="text-[10.5px] font-bold uppercase tracking-[.12em] text-muted">Interviews</div><div className="tnum mt-1.5 font-serif text-[30px] font-semibold text-navy">{scheduled.length}</div><div className="mt-1.5 text-[11.5px] text-muted">Scheduled</div></div>
        <div className="rounded-[10px] border border-line bg-white p-4"><div className="text-[10.5px] font-bold uppercase tracking-[.12em] text-muted">Offers</div><div className="tnum mt-1.5 font-serif text-[30px] font-semibold text-navy">{offers.length}</div><div className="mt-1.5 text-[11.5px] text-muted">{offers.filter((o) => o.status === 'Accepted').length} accepted</div></div>
        <div className="rounded-[10px] border border-line bg-white p-4"><div className="text-[10.5px] font-bold uppercase tracking-[.12em] text-muted">Hires (season)</div><div className="tnum mt-1.5 font-serif text-[30px] font-semibold text-navy">96</div></div>
      </div>

      <div className="mb-4 flex gap-4 max-lg:flex-col">
        <Card pad className="flex-1">
          <SectionTitle title="Hiring funnel" />
          {FUNNEL.map(([label, val]) => (
            <div key={label} className="my-2.5 flex items-center gap-3">
              <div className="w-[150px] flex-none text-[12.5px] text-[#3a3833]">{label}</div>
              <div className="h-[9px] flex-1 overflow-hidden rounded-full bg-line"><div className="h-full rounded-full bg-navy" style={{ width: `${(val / 392) * 100}%` }} /></div>
              <div className="tnum w-[42px] text-right text-xs font-bold text-navy">{val}</div>
            </div>
          ))}
        </Card>
        <Card pad className="flex-1">
          <SectionTitle title="Upcoming interviews" action={<Button variant="ghost" size="sm" onClick={() => navigate('/recruiter/interviews')}>All</Button>} />
          {scheduled.slice(0, 4).map((i) => (
            <ListRow key={i.cand + i.round} icon={<b className="text-white">{i.date.split(' ')[0]}</b>} title={i.cand} subtitle={`${i.round} · ${i.slot} · ${i.mode}`} trailing={<Pill status="Scheduled" />} />
          ))}
        </Card>
      </div>

      <Card className="overflow-x-auto">
        <div className="px-[18px] pb-0 pt-[18px]"><SectionTitle title="Your postings" action={<Button variant="ghost" size="sm" onClick={() => navigate('/recruiter/jobs')}>Manage</Button>} /></div>
        <table className="w-full min-w-[500px] border-collapse text-[13px]">
          <thead>
            <tr>{['Role', 'Type', 'Applicants', 'Status', ''].map((h) => <th key={h} className="border-b border-line bg-paper px-3.5 py-2.5 text-left text-[10.5px] font-bold uppercase tracking-[.1em] text-muted">{h}</th>)}</tr>
          </thead>
          <tbody>
            {recJobs.filter((j) => j.status !== 'Closed').map((j) => (
              <tr key={j.role}>
                <td className="border-b border-line-2 px-3.5 py-3"><b className="text-[13.5px]">{j.role}</b><small className="block text-muted">{j.loc} · {j.ctc}</small></td>
                <td className="border-b border-line-2 px-3.5 py-3">{j.type}</td>
                <td className="tnum border-b border-line-2 px-3.5 py-3">{j.apps}</td>
                <td className="border-b border-line-2 px-3.5 py-3"><Pill status={j.status} /></td>
                <td className="border-b border-line-2 px-3.5 py-3 text-right"><Button variant="ghost" size="sm" onClick={() => navigate('/recruiter/cands')}>Candidates</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
