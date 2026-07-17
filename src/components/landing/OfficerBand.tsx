import { Icon } from '@/components/icons/Icon'
import { TPO } from '@/data/mock/team'
import { initials } from '@/lib/text'

export function OfficerBand() {
  return (
    <section id="officer" className="px-[30px] pb-0 pt-[52px] max-lg:px-4">
      <div className="flex flex-wrap items-center gap-5 rounded-lg border border-line border-l-4 border-l-gold bg-white p-[18px]">
        <div className="grid h-[84px] w-[84px] flex-none place-items-center rounded-full bg-navy text-[26px] font-bold text-white">
          {initials(TPO.name)}
        </div>
        <div className="min-w-[240px] flex-1">
          <span className="eyebrow">Placement Officer</span>
          <h2 className="my-0.5 text-[23px]">{TPO.name}</h2>
          <div className="text-[13px] font-bold text-gold">{TPO.role} · Gujarat University</div>
          <p className="my-2.5 text-[13px] leading-[1.55] text-[#46443d]">{TPO.bio}</p>
          <a href={`mailto:${TPO.email}`} className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-navy">
            <Icon name="mail" /> {TPO.email}
          </a>
        </div>
      </div>
    </section>
  )
}
