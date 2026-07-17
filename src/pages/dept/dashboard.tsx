import { useNavigate } from 'react-router-dom'
import { Icon } from '@/components/icons/Icon'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Donut } from '@/components/ui/Donut'
import { Stat } from '@/components/ui/Stat'
import { PageHead } from '@/components/shared/PageHead'
import { SectionTitle } from '@/components/shared/SectionCard'
import { ListRow } from '@/components/shared/ListRow'
import { Banner } from '@/components/shared/Banner'
import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { DirectOnboardModal } from '@/components/modals/DirectOnboardModal'
import { usePortalData } from '@/context/PortalDataContext'
import { DEPTS, RATE } from '@/data/mock/departments'
import { initials } from '@/lib/text'

const AT_RISK = [
  { name: 'Meet Shah', detail: 'Readiness 52 · 0 applications' },
  { name: 'Karan Mehta', detail: 'Readiness 54 · 1 backlog' },
]

export default function DeptDashboardPage() {
  const navigate = useNavigate()
  const { openModal } = useModal()
  const { showToast } = useToast()
  const { dverify } = usePortalData()
  const dept = DEPTS[0]
  const pct = Math.round((dept.placed / dept.total) * 100)
  const pending = dverify.filter((v) => v.status === 'Pending').length

  return (
    <div>
      <PageHead
        title="Computer Science & Applications"
        description="Department coordinator console · Dr. R. Mehta · Season 2025–26"
        actions={
          <div className="flex gap-2">
            <Button variant="gold" onClick={() => navigate('/dept/verify')}><Icon name="shield" /> Verification queue ({pending})</Button>
            <Button variant="ghost" onClick={() => openModal('Directly onboard a recruiter for your department', <DirectOnboardModal scope="dept" />)}><Icon name="bolt" /> Onboard a recruiter</Button>
          </div>
        }
      />

      {pending > 0 && (
        <Banner
          variant="gold"
          icon={<Icon name="warn" className="text-gold" />}
          title={`${pending} items awaiting your verification`}
          subtitle="Profiles, documents, and status changes need approval before recruiters can see them"
          action={<Button size="sm" onClick={() => navigate('/dept/verify')}>Review now</Button>}
        />
      )}

      <div className="mb-[18px] grid grid-cols-4 gap-4 max-lg:grid-cols-2">
        <Stat label="Students" value={dept.total} />
        <Stat label="Placed" value={dept.placed} sub={`${pct}% placement rate`} />
        <Stat label="Active applications" value={214} sub={<><b className="text-green">+31</b> this week</>} />
        <Stat label="Pending verifications" value={pending} />
      </div>

      <div className="flex gap-4 max-lg:flex-col">
        <Card pad className="flex-1">
          <SectionTitle title="Department placement" />
          <div className="flex items-center gap-[22px]">
            <Donut pct={pct} size={120} stroke={14} />
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2.5 text-[12.5px]"><span className="h-[11px] w-[11px] rounded-[3px] bg-navy" />Placed · {dept.placed}</div>
              <div className="flex items-center gap-2.5 text-[12.5px]"><span className="h-[11px] w-[11px] rounded-[3px] bg-line" />Seeking · {dept.total - dept.placed}</div>
              <div className="flex items-center gap-2.5 text-[12.5px]"><span className="h-[11px] w-[11px] rounded-[3px] bg-gold" />University avg · {RATE}%</div>
            </div>
          </div>
        </Card>
        <Card pad className="flex-1">
          <SectionTitle title="At-risk students" extra={<span className="rounded-full bg-red-soft px-2.5 py-1 text-[11px] font-bold text-red">Readiness &lt; 55</span>} />
          {AT_RISK.map((s) => (
            <ListRow
              key={s.name}
              icon={<b className="text-red">{initials(s.name)}</b>}
              title={s.name}
              subtitle={s.detail}
              trailing={<Button variant="ghost" size="sm" onClick={() => showToast(`Counselling session scheduled with ${s.name}`)}>Schedule counselling</Button>}
            />
          ))}
        </Card>
      </div>
    </div>
  )
}
