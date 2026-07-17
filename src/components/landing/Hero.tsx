import { Icon } from '@/components/icons/Icon'
import { Button } from '@/components/ui/Button'
import { useModal } from '@/context/ModalContext'
import { StudentRegisterModal } from '@/components/modals/StudentRegisterModal'
import { BecomePartnerModal } from '@/components/modals/BecomePartnerModal'
import { PLACED, RATE } from '@/data/mock/departments'

export function Hero() {
  const { openModal } = useModal()

  return (
    <section className="grid grid-cols-[1.15fr_.85fr] items-center gap-10 px-[30px] pb-10 pt-[54px] max-lg:grid-cols-1 max-lg:px-4 max-lg:pt-[34px]">
      <div>
        <span className="eyebrow">Training &amp; Placement Cell · Est. 1949</span>
        <h1 className="mt-2 text-[46px] tracking-[-.5px] max-lg:text-[36px]">
          Where Gujarat University talent meets <em className="not-italic text-gold">opportunity.</em>
        </h1>
        <p className="my-[18px] max-w-[44ch] text-base text-[#44423b]">
          One platform for every department — students build AI-assisted résumés, recruiters run campus drives,
          and the placement cell sees it all in real time.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button variant="gold" onClick={() => openModal('Student registration', <StudentRegisterModal />)}>
            Register as student <Icon name="arrow" />
          </Button>
          <Button variant="ghost" onClick={() => openModal('Partner with Gujarat University', <BecomePartnerModal />)}>
            Onboard your company
          </Button>
        </div>
      </div>
      <div className="rounded-[14px] border border-line bg-white p-1.5 shadow-[0_20px_50px_-30px_rgba(20,49,94,.5)]">
        <div className="rounded-[10px] bg-navy p-[22px] text-white">
          <span className="eyebrow">Placement Season 2025–26</span>
          <div className="mt-3.5 grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-white/[.14]">
            <div className="bg-navy p-3.5">
              <div className="tnum font-serif text-[26px] font-semibold">{RATE}%</div>
              <div className="mt-0.5 text-[10.5px] uppercase tracking-[.1em] text-[#B9C4D8]">Placement rate</div>
            </div>
            <div className="bg-navy p-3.5">
              <div className="tnum font-serif text-[26px] font-semibold">312</div>
              <div className="mt-0.5 text-[10.5px] uppercase tracking-[.1em] text-[#B9C4D8]">Recruiters</div>
            </div>
            <div className="bg-navy p-3.5">
              <div className="tnum font-serif text-[26px] font-semibold">₹24L</div>
              <div className="mt-0.5 text-[10.5px] uppercase tracking-[.1em] text-[#B9C4D8]">Highest package</div>
            </div>
            <div className="bg-navy p-3.5">
              <div className="tnum font-serif text-[26px] font-semibold">{PLACED.toLocaleString('en-IN')}</div>
              <div className="mt-0.5 text-[10.5px] uppercase tracking-[.1em] text-[#B9C4D8]">Offers made</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
