import { useNavigate } from 'react-router-dom'
import { Icon } from '@/components/icons/Icon'
import { Button } from '@/components/ui/Button'
import { Stat } from '@/components/ui/Stat'
import { Pill, ColorPill } from '@/components/ui/Pill'
import { Card } from '@/components/ui/Card'
import { Donut } from '@/components/ui/Donut'
import { PageHead } from '@/components/shared/PageHead'
import { SectionTitle } from '@/components/shared/SectionCard'
import { ListRow } from '@/components/shared/ListRow'
import { Banner } from '@/components/shared/Banner'
import { useModal } from '@/context/ModalContext'
import { ApplyJobModal } from '@/components/modals/ApplyJobModal'
import { usePortalData } from '@/context/PortalDataContext'
import { JOBS, matchScore } from '@/data/mock/jobs'
import { cvScoreOf } from '@/data/mock/cvParams'
import { initials } from '@/lib/text'

export default function StudentDashboardPage() {
  const navigate = useNavigate()
  const { openModal } = useModal()
  const { me, apps, notifs, train, cvParams } = usePortalData()

  const offer = apps.find((a) => a.outcome === 'Offer')
  const interview = apps.find((a) => a.outcome === 'Interview')
  const enrolled = train.filter((t) => t.enrolled)

  return (
    <div>
      <PageHead
        title="Welcome back, Aarav"
        description={<>Computer Science &amp; Applications · Batch 2022–26 · CGPA 8.6 · <Pill status={me.status} /></>}
        actions={<Button variant="gold" onClick={() => navigate('/student/cv')}><Icon name="spark" /> Open AI CV Studio</Button>}
      />

      {offer && (
        <Banner
          icon={<Icon name="check" className="text-green" />}
          title={<>You have an offer from {offer.co}</>}
          subtitle={offer.note}
          action={<Button size="sm" onClick={() => navigate('/student/apps')}>Review offer</Button>}
        />
      )}
      {interview && (
        <Banner
          variant="gold"
          icon={<Icon name="cal" className="text-gold" />}
          title={<>Upcoming interview · {interview.co}</>}
          subtitle={interview.note}
          action={<Button variant="ghost" size="sm" onClick={() => navigate('/student/apps')}>Details</Button>}
        />
      )}

      <div className="mb-[18px] grid grid-cols-4 gap-4 max-lg:grid-cols-2">
        <Stat label="Applications" value={apps.length} sub="3 active this week" />
        <Stat label="Shortlists" value={3} sub={<><b className="text-green">+2</b> since last week</>} />
        <Stat label="Interviews" value={1} sub="Amazon · 14 Jul" />
        <Stat label="CV Score" value={cvScoreOf(cvParams)} sub="Good — 3 fixes to raise it" />
      </div>

      <div className="mb-4 flex gap-4 max-lg:flex-col">
        <Card pad className="flex-[1.5]">
          <SectionTitle title="Recommended for you" action={<Button variant="ghost" size="sm" onClick={() => navigate('/student/jobs')}>View all</Button>} />
          {JOBS.slice(0, 3).map((j) => (
            <ListRow
              key={j.id}
              icon={<b>{initials(j.co)}</b>}
              title={j.role}
              subtitle={`${j.co} · ${j.loc} · ${j.ctc}`}
              trailing={
                <div className="flex items-center gap-2.5">
                  <ColorPill color={matchScore(j) >= 75 ? 'green' : 'navy'}>{matchScore(j)}%</ColorPill>
                  <Button size="sm" onClick={() => openModal(`Apply — ${j.role}`, <ApplyJobModal role={j.role} co={j.co} />)}>Apply</Button>
                </div>
              }
            />
          ))}
        </Card>
        <Card pad className="flex-1">
          <SectionTitle title="Notifications" action={<Button variant="ghost" size="sm" onClick={() => navigate('/student/notifs')}>All</Button>} />
          {notifs.slice(0, 4).map((n, i) => (
            <ListRow key={i} icon={<Icon name={n.ic} />} title={<span className="text-[12.5px] font-semibold">{n.type}</span>} subtitle={n.title.slice(0, 44) + '…'} />
          ))}
        </Card>
      </div>

      <div className="flex gap-4 max-lg:flex-col">
        <Card pad className="flex-1">
          <SectionTitle title="Profile completeness" />
          <div className="flex items-center gap-[22px]">
            <Donut pct={me.completeness} size={116} stroke={13} label="COMPLETE" />
            <div className="flex-1">
              <p className="mb-2.5 text-[13px] text-muted">A complete, verified profile ranks higher with recruiters.</p>
              <Button variant="ghost" size="sm" onClick={() => navigate('/student/profile')}>Complete profile <Icon name="arrow" /></Button>
            </div>
          </div>
        </Card>
        <Card pad className="flex-1">
          <SectionTitle title="Training progress" action={<Button variant="ghost" size="sm" onClick={() => navigate('/student/training')}>Open</Button>} />
          {enrolled.map((t) => (
            <div key={t.name} className="my-2.5 flex items-center gap-3">
              <div className="w-[150px] flex-none text-[12.5px] text-[#3a3833]">{t.name}</div>
              <div className="h-[9px] flex-1 overflow-hidden rounded-full bg-line">
                <div className="h-full rounded-full bg-navy" style={{ width: `${t.prog}%` }} />
              </div>
              <div className="tnum w-[42px] text-right text-xs font-bold text-navy">{t.prog}%</div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  )
}
