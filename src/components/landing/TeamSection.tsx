import { SectionHead } from '@/components/landing/SectionHead'
import { StaffCard } from '@/components/landing/StaffCard'
import { STAFF } from '@/data/mock/team'

export function TeamSection() {
  return (
    <section id="team" className="px-[30px] py-[52px] max-lg:px-4 max-lg:py-[38px]">
      <SectionHead
        eyebrow="Meet the cell"
        title="Placement officer & staff"
        description="The team coordinating every drive, offer, and student journey at Gujarat University."
      />
      <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-1">
        {STAFF.map((s) => (
          <StaffCard key={s.name} name={s.name} role={s.role} bio={s.bio} email={s.email} />
        ))}
      </div>
    </section>
  )
}
