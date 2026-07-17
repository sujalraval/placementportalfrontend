import { useNavigate } from 'react-router-dom'
import { Icon } from '@/components/icons/Icon'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Donut } from '@/components/ui/Donut'
import { AreaChart } from '@/components/ui/AreaChart'
import { Stat } from '@/components/ui/Stat'
import { PageHead } from '@/components/shared/PageHead'
import { SectionTitle } from '@/components/shared/SectionCard'
import { ListRow } from '@/components/shared/ListRow'
import { useAdminData } from '@/context/AdminDataContext'
import { usePortalData } from '@/context/PortalDataContext'
import { initials } from '@/lib/text'

const MONTH_TREND = [42, 48, 51, 55, 60, 63, 67, 70, 72, 74]

export default function AdminDashboardPage() {
  const navigate = useNavigate()
  const { depts } = useAdminData()
  const { companies } = usePortalData()

  const total = depts.reduce((a, d) => a + d.total, 0)
  const placed = depts.reduce((a, d) => a + d.placed, 0)
  const rate = total ? Math.round((placed / total) * 100) : 0
  const topRecruiters = [...companies].sort((a, b) => b.hires - a.hires).slice(0, 5)

  return (
    <div>
      <PageHead
        title="Placement Cell — overview"
        description="University-wide, live across all 8 departments · Season 2025–26"
        actions={<Button variant="gold" onClick={() => navigate('/admin/reports')}><Icon name="chart" /> Generate report</Button>}
      />

      <div className="mb-[18px] grid grid-cols-4 gap-4 max-lg:grid-cols-2">
        <Stat label="Placement rate" value={`${rate}%`} sub={<><b className="text-green">+6%</b> vs last year</>} />
        <Stat label="Students placed" value={placed.toLocaleString('en-IN')} sub={`of ${total.toLocaleString('en-IN')} registered`} />
        <Stat label="Highest package" value="₹24L" sub="Amazon · CS" />
        <Stat label="Avg package" value="₹6.4L" sub="Across departments" />
      </div>

      <div className="mb-4 flex gap-4 max-lg:flex-col">
        <Card pad className="flex-[.9]">
          <SectionTitle title="Overall placement" />
          <div className="flex items-center gap-[22px]">
            <Donut pct={rate} />
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2.5 text-[12.5px]"><span className="h-[11px] w-[11px] rounded-[3px] bg-navy" />Placed · {placed.toLocaleString('en-IN')}</div>
              <div className="flex items-center gap-2.5 text-[12.5px]"><span className="h-[11px] w-[11px] rounded-[3px] bg-line" />Seeking · {(total - placed).toLocaleString('en-IN')}</div>
              <div className="flex items-center gap-2.5 text-[12.5px]"><span className="h-[11px] w-[11px] rounded-[3px] bg-gold" />Highest ₹24L · Avg ₹6.4L</div>
            </div>
          </div>
        </Card>
        <Card pad className="flex-[1.3]">
          <SectionTitle title="Placement trend" extra={<span className="rounded-full bg-green-soft px-2.5 py-1 text-[11px] font-bold text-green">Season progress</span>} />
          <AreaChart data={MONTH_TREND} />
          <div className="mt-1.5 flex justify-between text-[10.5px] text-muted">
            <span>Sep</span><span>Nov</span><span>Jan</span><span>Mar</span><span>May</span><span>Now</span>
          </div>
        </Card>
      </div>

      <div className="flex gap-4 max-lg:flex-col">
        <Card pad className="flex-[1.3]">
          <SectionTitle title="Placement by department" />
          {depts.map((d) => {
            const p = Math.round((d.placed / d.total) * 100)
            return (
              <div key={d.name} className="my-2.5 flex items-center gap-3">
                <div className="w-[180px] flex-none truncate text-[12.5px] text-[#3a3833]">{d.name}</div>
                <div className="h-[9px] flex-1 overflow-hidden rounded-full bg-line"><div className="h-full rounded-full bg-navy" style={{ width: `${p}%` }} /></div>
                <div className="tnum w-[42px] text-right text-xs font-bold text-navy">{p}%</div>
              </div>
            )
          })}
        </Card>
        <Card pad className="flex-1">
          <SectionTitle title="Top recruiters" />
          {topRecruiters.map((c) => (
            <ListRow key={c.name} icon={<b>{initials(c.name)}</b>} title={c.name} subtitle={c.sector} trailing={<b className="tnum text-navy">{c.hires}</b>} />
          ))}
        </Card>
      </div>
    </div>
  )
}
