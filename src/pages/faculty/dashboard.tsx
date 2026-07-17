import { useNavigate } from 'react-router-dom'
import { Icon } from '@/components/icons/Icon'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ColorPill } from '@/components/ui/Pill'
import { Stat } from '@/components/ui/Stat'
import { PageHead } from '@/components/shared/PageHead'
import { SectionTitle } from '@/components/shared/SectionCard'
import { ListRow } from '@/components/shared/ListRow'
import { Banner } from '@/components/shared/Banner'
import { usePortalData } from '@/context/PortalDataContext'
import { initials } from '@/lib/text'

export default function FacultyDashboardPage() {
  const navigate = useNavigate()
  const { mentees } = usePortalData()
  const total = mentees.length
  const pending = mentees.filter((m) => !m.reportSubmitted).length
  const readyToEval = mentees.filter((m) => m.reportSubmitted && !m.evaluation).length
  const evaluated = mentees.filter((m) => m.evaluation).length

  return (
    <div>
      <PageHead
        title="Faculty mentor dashboard"
        description="Prof. Kavita Iyer · Computer Science & Applications · mentorship overview"
        actions={<Button variant="gold" onClick={() => navigate('/faculty/mentees')}><Icon name="users" /> My mentees ({total})</Button>}
      />

      {readyToEval > 0 && (
        <Banner
          variant="gold"
          icon={<Icon name="warn" className="text-gold" />}
          title={`${readyToEval} mentee${readyToEval > 1 ? 's' : ''} ready for evaluation`}
          subtitle="Report submitted and awaiting your grade & remarks"
          action={<Button size="sm" onClick={() => navigate('/faculty/mentees')}>Review now</Button>}
        />
      )}

      <div className="mb-[18px] grid grid-cols-4 gap-4 max-lg:grid-cols-2">
        <Stat label="Assigned mentees" value={total} />
        <Stat label="Report pending" value={pending} />
        <Stat label="Ready to evaluate" value={readyToEval} />
        <Stat label="Evaluated" value={evaluated} />
      </div>

      <Card pad>
        <SectionTitle title="Your mentees at a glance" action={<Button variant="ghost" size="sm" onClick={() => navigate('/faculty/mentees')}>View all</Button>} />
        {mentees.map((m) => (
          <ListRow
            key={m.en}
            icon={<b>{initials(m.name)}</b>}
            title={m.name}
            subtitle={`${m.co} · ${m.role}`}
            trailing={m.evaluation ? <ColorPill color="green">Evaluated</ColorPill> : m.reportSubmitted ? <ColorPill color="gold">Ready to evaluate</ColorPill> : <ColorPill color="gold">Awaiting report</ColorPill>}
          />
        ))}
      </Card>
      <p className="mt-3 text-[12.5px] text-muted">The Department Coordinator issues the College Approval Letter and assigns mentorship; from there, ongoing monitoring and evaluation is yours as the assigned faculty mentor.</p>
    </div>
  )
}
