import { Pill } from '@/components/ui/Pill'
import { SectionHead } from '@/components/landing/SectionHead'
import { DRIVES } from '@/data/mock/drives'

export function DrivesSection() {
  const upcoming = DRIVES.filter((d) => d.status !== 'Completed')

  return (
    <section id="drives" className="px-[30px] pb-[52px] max-lg:px-4 max-lg:pb-[38px]">
      <SectionHead
        eyebrow="Campus calendar"
        title="Upcoming campus drives"
        description="Register early — slots and eligibility are checked automatically."
      />
      <div className="grid grid-cols-3 gap-3.5 max-lg:grid-cols-1">
        {upcoming.map((d) => {
          const [day, month] = d.date.split(' ')
          return (
            <div key={d.co} className="flex flex-col overflow-hidden rounded-xl border border-line bg-white">
              <div className="flex items-center gap-3.5 p-4">
                <div className="flex h-[52px] w-[52px] flex-none flex-col items-center justify-center rounded-[10px] bg-navy text-white">
                  <b className="tnum font-serif text-xl">{day}</b>
                  <span className="text-[9px] uppercase tracking-[.1em] text-[#B9C4D8]">{month}</span>
                </div>
                <div>
                  <h3 className="text-[16px]">{d.co}</h3>
                  <div className="text-xs text-muted">{d.depts} · {d.reg} registered</div>
                </div>
              </div>
              <div className="mt-auto flex items-center justify-between border-t border-line-2 p-4">
                <span className="text-[11.5px] text-[#46443d]">{d.rounds}</span>
                <Pill status={d.status} />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
