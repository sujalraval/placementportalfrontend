import { Icon } from '@/components/icons/Icon'
import { Card } from '@/components/ui/Card'
import { Donut } from '@/components/ui/Donut'
import { AreaChart } from '@/components/ui/AreaChart'
import { ColorPill } from '@/components/ui/Pill'
import { PageHead } from '@/components/shared/PageHead'
import { SectionTitle } from '@/components/shared/SectionCard'
import { usePortalData } from '@/context/PortalDataContext'
import { grade } from '@/data/mock/cvParams'
import { readinessParts, readinessScore } from '@/lib/readiness'
import { BADGES } from '@/data/mock/readiness'

export default function StudentReadinessPage() {
  const { me, cvParams } = usePortalData()
  const score = readinessScore(me, cvParams)
  const [gradeLabel, gradeColor] = grade(score)
  const parts = readinessParts(me, cvParams)
  const points = BADGES.filter((b) => b.got).length * 150 + me.completeness * 3

  return (
    <div>
      <PageHead title="Career readiness index" description="Your employability score, tracked semester over semester — benchmarked to your branch" />

      <div className="mb-[18px] flex gap-4 max-lg:flex-col">
        <Card pad className="flex-[.9]">
          <SectionTitle title="Readiness score" />
          <div className="flex items-center gap-[22px]">
            <div className="flex flex-col items-center gap-2">
              <Donut pct={score} size={140} stroke={16} color={gradeColor} label="READY" />
              <ColorPill color={gradeColor.includes('green') ? 'green' : gradeColor.includes('gold') ? 'gold' : 'red'}>{gradeLabel}</ColorPill>
            </div>
            <div className="flex-1">
              <p className="text-[13px] text-muted">
                Branch average: <b className="tnum text-navy">68</b> · You are <b className="text-green">+{Math.max(0, score - 68)} above</b> the Computer Science average.
              </p>
              <p className="mt-2 text-[12.5px] text-muted">Biggest lever: raise <b>Certifications</b> — one relevant certification adds ~3 points.</p>
            </div>
          </div>
        </Card>
        <Card pad className="flex-1">
          <SectionTitle title="Score breakdown" />
          {parts.map((p) => (
            <div key={p.n} className="my-2.5 flex items-center gap-3">
              <div className="w-[170px] flex-none text-[13px]">{p.n}<br /><span className="text-[10.5px] text-muted">{p.d}</span></div>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-line"><div className="h-full rounded-full bg-navy" style={{ width: `${p.v}%` }} /></div>
              <div className="tnum w-[38px] text-right text-xs font-bold text-navy">{p.v}</div>
              <span className="w-[34px] text-right text-[10.5px] text-muted">×{p.w}%</span>
            </div>
          ))}
        </Card>
      </div>

      <div className="flex gap-4 max-lg:flex-col">
        <Card pad className="flex-1">
          <SectionTitle title="Semester trajectory" />
          <AreaChart data={[48, 54, 58, 63, 66, 70, 74, score]} />
          <div className="mt-1.5 flex justify-between text-[10.5px] text-muted">
            <span>Sem 1</span><span>Sem 3</span><span>Sem 5</span><span>Now</span>
          </div>
        </Card>
        <Card pad className="flex-1">
          <SectionTitle title="Achievements & points" extra={<ColorPill color="gold">{points} pts · Rank #14 in CS</ColorPill>} />
          <div className="grid grid-cols-2 gap-2.5">
            {BADGES.map((b) => (
              <div key={b.n} className={`flex items-center gap-2.5 rounded-[9px] border border-line p-2.5 ${b.got ? '' : 'opacity-45'}`}>
                <div className={`grid h-8 w-8 flex-none place-items-center rounded-lg ${b.got ? 'bg-gold-soft text-[#8a6015]' : 'bg-[#ECEAE3] text-[#999]'}`}>
                  <Icon name="star" className="h-4 w-4" />
                </div>
                <div><b className="text-[12.5px]">{b.n}</b><small className="block text-[10.5px] text-muted">{b.d}</small></div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
