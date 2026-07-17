import { SectionHead } from '@/components/landing/SectionHead'
import { DEPTS } from '@/data/mock/departments'

export function DeptGridSection() {
  return (
    <section className="px-[30px] pb-[52px] max-lg:px-4 max-lg:pb-[38px]">
      <SectionHead eyebrow="Across the university" title="Placement by department" />
      <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-2">
        {DEPTS.map((d) => {
          const pct = Math.round((d.placed / d.total) * 100)
          return (
            <div key={d.name} className="rounded-[10px] border border-line bg-white p-[15px]">
              <b className="block text-[13.5px] text-navy">{d.name}</b>
              <div className="mt-2.5 h-1.5 overflow-hidden rounded-sm bg-line">
                <div className="h-full bg-gold" style={{ width: `${pct}%` }} />
              </div>
              <small className="tnum mt-1.5 block text-[11px] text-muted">
                {pct}% placed · {d.placed}/{d.total}
              </small>
            </div>
          )
        })}
      </div>
    </section>
  )
}
