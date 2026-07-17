import { TOTAL } from '@/data/mock/departments'

const STATS = [
  { value: TOTAL.toLocaleString('en-IN'), label: 'Registered students' },
  { value: '8', label: 'Departments' },
  { value: '312', label: 'Hiring partners' },
  { value: '₹6.4L', label: 'Average package' },
]

export function StatsStrip() {
  return (
    <div className="bg-navy text-white">
      <div className="mx-auto flex max-w-[1180px] flex-wrap justify-around gap-5 px-[30px] py-[22px]">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <b className="tnum block font-serif text-[28px]">{s.value}</b>
            <span className="text-[11px] uppercase tracking-[.1em] text-[#B9C4D8]">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
