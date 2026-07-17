import { Icon } from '@/components/icons/Icon'
import { Card } from '@/components/ui/Card'
import { SectionHead } from '@/components/landing/SectionHead'
import { CONTACT } from '@/data/mock/about'

export function ContactSection() {
  return (
    <section id="contact" className="px-[30px] pb-[52px] max-lg:px-4 max-lg:pb-[38px]">
      <SectionHead
        eyebrow="Get in touch"
        title="Contact us"
        description="Reach the Gujarat University Placement Cell for recruitment, partnerships, and student queries."
      />
      <div className="grid grid-cols-2 gap-4 max-lg:grid-cols-1">
        <Card pad>
          <h3 className="mb-3 text-[15px] text-navy">{CONTACT.office}</h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-2.5">
              <Icon name="mail" className="mt-0.5 h-[15px] w-[15px] flex-none" />
              <div>
                <a href={`mailto:${CONTACT.email}`} className="text-[13px] font-semibold text-navy">{CONTACT.email}</a>
                <div className="mt-0.5 text-xs text-muted">
                  <a href={`mailto:${CONTACT.altEmail}?subject=Gujarat%20University`} className="text-muted">{CONTACT.altEmail}</a>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Icon name="build" className="mt-0.5 h-[15px] w-[15px] flex-none" />
              <div className="text-[13px] leading-[1.6] text-[#46443d]">
                <b>{CONTACT.addr1}</b><br />{CONTACT.addr2}<br />{CONTACT.addr3}
              </div>
            </div>
          </div>
        </Card>
        <Card pad>
          <h3 className="mb-3 text-[15px] text-navy">Address</h3>
          <div className="text-[13px] leading-[1.75] text-[#46443d]">
            {CONTACT.addr1}<br />{CONTACT.addr2}<br />{CONTACT.addr3}
          </div>
          <div className="mt-3.5 border-t border-line-2 pt-3.5">
            <a
              href={`mailto:${CONTACT.altEmail}?subject=GU-Alumni`}
              className="inline-flex items-center gap-1.5 rounded-md bg-gold px-3 py-1.5 text-xs font-semibold text-white"
            >
              <Icon name="mail" className="h-4 w-4" /> Email the Placement Cell
            </a>
          </div>
        </Card>
      </div>
    </section>
  )
}
