import type { RecruiterProfile } from '@/data/mock/recruiter'
import type { Offer } from '@/data/mock/offers'

function DocSectionTitle({ children }: { children: string }) {
  return (
    <h3 className="mb-2.5 border-b border-line pb-1.5 font-sans text-[11.5px] font-extrabold uppercase tracking-[.14em] text-navy">
      {children}
    </h3>
  )
}

export function MouDocument({ mou }: { mou: RecruiterProfile['mouData'] }) {
  return (
    <div>
      <div className="text-center">
        <div className="text-[11px] font-extrabold uppercase tracking-[.14em] text-gold">Gujarat University · Training &amp; Placement Cell</div>
        <div className="mt-1.5 font-serif text-[26px] font-semibold text-navy">Memorandum of Understanding</div>
      </div>
      <div className="my-[15px] h-0.5 bg-navy" />

      <div className="mt-[19px]">
        <DocSectionTitle>Parties</DocSectionTitle>
        <p className="text-[12.5px] leading-[1.6] text-[#333]">
          This Memorandum of Understanding ("MoU") is entered into between <b>Gujarat University</b>, Ahmedabad, acting
          through its Training &amp; Placement Cell, and <b>{mou.company}</b> ("the Company").
        </p>
      </div>
      <div className="mt-[19px]">
        <DocSectionTitle>Purpose</DocSectionTitle>
        <p className="text-[12.5px] leading-[1.6] text-[#333]">
          To establish a framework of cooperation for campus recruitment, internships and industry engagement for the
          benefit of the University's students across all departments.
        </p>
      </div>
      <div className="mt-[19px]">
        <DocSectionTitle>Scope of collaboration</DocSectionTitle>
        <div className="relative my-0.5 pl-[15px] text-[12.5px] leading-[1.55] text-[#333] before:absolute before:left-0 before:text-gold before:content-['▸']">The Company may conduct on-campus, off-campus and virtual recruitment drives.</div>
        <div className="relative my-0.5 pl-[15px] text-[12.5px] leading-[1.55] text-[#333] before:absolute before:left-0 before:text-gold before:content-['▸']">Indicative hiring commitment: <b>{mou.commit}</b> positions per academic year.</div>
        <div className="relative my-0.5 pl-[15px] text-[12.5px] leading-[1.55] text-[#333] before:absolute before:left-0 before:text-gold before:content-['▸']">The University will facilitate access to eligible, verified candidate pools.</div>
        <div className="relative my-0.5 pl-[15px] text-[12.5px] leading-[1.55] text-[#333] before:absolute before:left-0 before:text-gold before:content-['▸']">Both parties will coordinate schedules to avoid conflicts with the academic calendar.</div>
      </div>
      <div className="mt-[19px]">
        <DocSectionTitle>Terms</DocSectionTitle>
        <p className="text-[12.5px] leading-[1.6] text-[#333]">{mou.terms}</p>
      </div>
      <div className="mt-[19px]">
        <DocSectionTitle>Validity</DocSectionTitle>
        <p className="text-[12.5px] leading-[1.6] text-[#333]">This MoU is valid until <b>{mou.valid}</b> and may be renewed by mutual written consent.</p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-x-[26px]">
        <div className="border-t border-[#333] pt-1.5 text-[12.5px]"><b>For Gujarat University</b><br />Training &amp; Placement Officer</div>
        <div className="border-t border-[#333] pt-1.5 text-[12.5px]"><b>For {mou.company}</b><br />{mou.signatory}</div>
      </div>
    </div>
  )
}

export function OfferLetterDocument({ offer, company, address, hrHead }: {
  offer: Offer
  company: string
  address: string
  hrHead: { name: string; desig: string }
}) {
  return (
    <div>
      <div className="flex items-start justify-between">
        <div>
          <div className="font-serif text-2xl font-semibold text-navy">{company}</div>
          <div className="text-xs text-[#666]">{address}</div>
        </div>
        <div className="text-right text-[11.5px] text-[#666]">Date: 08 Jul 2026<br />Ref: {company}/CAMPUS/2026</div>
      </div>
      <div className="my-[15px] h-0.5 bg-navy" />

      <div className="mt-[19px]">
        <DocSectionTitle>Letter of offer</DocSectionTitle>
        <p className="text-[12.5px] leading-[1.6] text-[#333]">Dear {offer.cand},</p>
        <p className="mt-2 text-[12.5px] leading-[1.6] text-[#333]">
          We are pleased to offer you the position of <b>{offer.role}</b> at {company}, following your successful
          selection through the Gujarat University campus placement process. The key details of your offer are set out below.
        </p>
      </div>
      <div className="mt-[19px]">
        <DocSectionTitle>Offer details</DocSectionTitle>
        <div className="grid grid-cols-2 gap-x-[26px]">
          <div className="text-[12.5px] leading-[1.55] text-[#333]">Role: {offer.role}</div>
          <div className="text-[12.5px] leading-[1.55] text-[#333]">Compensation (CTC): {offer.ctc}</div>
          <div className="text-[12.5px] leading-[1.55] text-[#333]">Location: {offer.loc}</div>
          <div className="text-[12.5px] leading-[1.55] text-[#333]">Expected joining: {offer.joining}</div>
        </div>
      </div>
      <div className="mt-[19px]">
        <DocSectionTitle>Terms</DocSectionTitle>
        <p className="text-[12.5px] leading-[1.6] text-[#333]">
          This offer is subject to successful completion of your degree, verification of documents, and the Company's
          standard terms of employment. Please confirm your acceptance by the response date communicated by the
          Placement Cell.
        </p>
      </div>

      <div className="mt-[30px] text-[12.5px]">
        <p>Warm regards,</p>
        <div className="mt-6 w-[230px] border-t border-[#333] pt-1.5"><b>{hrHead.name}</b><br />{hrHead.desig}, {company}</div>
      </div>
    </div>
  )
}
