import { SectionHead, SubHead } from '@/components/landing/SectionHead'
import { PartnerTile } from '@/components/landing/PartnerTile'
import { PARTNERS, INTERN_PARTNERS } from '@/data/mock/partners'

export function PartnersSection() {
  return (
    <section id="partners" className="px-[30px] pb-[52px] max-lg:px-4 max-lg:pb-[38px]">
      <SectionHead
        eyebrow="Our network"
        title="Company & internship partners"
        description="312 organisations recruit and offer internships across Gujarat University's departments."
      />
      <SubHead title="Company partners" tag="Full-time recruiters" />
      <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-2">
        {PARTNERS.map((p) => <PartnerTile key={p.n} partner={p} />)}
      </div>
      <SubHead title="Internship partners" tag="Internships & live projects" />
      <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-2">
        {INTERN_PARTNERS.map((p) => <PartnerTile key={p.n} partner={p} />)}
      </div>
    </section>
  )
}
