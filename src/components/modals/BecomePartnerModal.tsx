import { Icon } from '@/components/icons/Icon'
import { Button } from '@/components/ui/Button'
import { useModal } from '@/context/ModalContext'
import { RecruiterOnboardModal } from '@/components/modals/RecruiterOnboardModal'

export function BecomePartnerModal() {
  const { openModal } = useModal()

  return (
    <div>
      <p className="mb-[18px] text-[13px] text-muted">How would you like to work with our students?</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-line bg-white p-6 text-left">
          <div className="mb-3 grid h-11 w-11 place-items-center rounded-[10px] bg-navy-soft">
            <Icon name="brief" className="h-[22px] w-[22px] text-navy" />
          </div>
          <h3 className="text-[19px]">Recruit full-time</h3>
          <p className="my-1.5 text-[13px] text-muted">Post roles and hire graduating students across departments.</p>
          <Button onClick={() => openModal('Partner with Gujarat University', <RecruiterOnboardModal kind="Full-time hiring" />)}>
            Continue <Icon name="arrow" />
          </Button>
        </div>
        <div className="rounded-xl border border-line bg-white p-6 text-left">
          <div className="mb-3 grid h-11 w-11 place-items-center rounded-[10px] bg-navy-soft">
            <Icon name="book" className="h-[22px] w-[22px] text-navy" />
          </div>
          <h3 className="text-[19px]">Offer internships</h3>
          <p className="my-1.5 text-[13px] text-muted">Bring on interns and run live projects with our students.</p>
          <Button variant="gold" onClick={() => openModal('Partner with Gujarat University', <RecruiterOnboardModal kind="Internships" />)}>
            Continue <Icon name="arrow" />
          </Button>
        </div>
      </div>
    </div>
  )
}
