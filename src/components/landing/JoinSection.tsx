import { Icon } from '@/components/icons/Icon'
import { Button } from '@/components/ui/Button'
import { useModal } from '@/context/ModalContext'
import { StudentRegisterModal } from '@/components/modals/StudentRegisterModal'
import { RecruiterOnboardModal } from '@/components/modals/RecruiterOnboardModal'

const PARTNER_ROWS = [
  'One posting reaches all eligible students',
  'AI candidate matching & shortlisting',
  'On-campus, off-campus & virtual drives',
  'Dedicated placement-cell coordinator',
]

export function JoinSection() {
  const { openModal } = useModal()
  const openOnboard = (kind: 'Full-time hiring' | 'Internships') =>
    openModal('Partner with Gujarat University', <RecruiterOnboardModal kind={kind} />)
  const openRegister = () => openModal('Student registration', <StudentRegisterModal />)

  return (
    <section id="join" className="px-[30px] pb-[52px] max-lg:px-4 max-lg:pb-[38px]">
      <div className="grid grid-cols-[1.3fr_1fr] gap-9 rounded-2xl bg-navy p-[38px] text-white max-lg:grid-cols-1">
        <div>
          <span className="eyebrow">For employers</span>
          <h2 className="mt-2 text-[30px] text-white">Become a placement partner</h2>
          <p className="mt-2.5 max-w-[56ch] text-sm text-[#C9D4E6]">
            Hire from a verified, AI-ranked pool of Gujarat University talent across eight departments. Post jobs,
            run drives, and manage offers — free for campus recruiters.
          </p>
          <div className="mt-[18px] flex flex-wrap gap-2.5">
            <Button variant="gold" onClick={() => openOnboard('Full-time hiring')}>
              Onboard as recruiter <Icon name="arrow" />
            </Button>
            <button
              onClick={() => openOnboard('Internships')}
              className="inline-flex items-center gap-1.5 rounded-md border border-white/40 bg-transparent px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-white/10"
            >
              Offer internships
            </button>
          </div>
        </div>
        <div className="rounded-xl border border-white/[.14] bg-white/[.06] p-[22px]">
          {PARTNER_ROWS.map((row, i) => (
            <div
              key={row}
              className={`flex items-center gap-2.5 py-2.5 text-[13px] ${i !== PARTNER_ROWS.length - 1 ? 'border-b border-white/10' : ''}`}
            >
              <Icon name="check" className="h-[17px] w-[17px] flex-none text-gold" />
              {row}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 max-lg:grid-cols-1">
        <div className="rounded-xl border border-line bg-white p-6">
          <div className="mb-3 grid h-11 w-11 place-items-center rounded-[10px] bg-navy-soft">
            <Icon name="user" className="h-[22px] w-[22px] text-navy" />
          </div>
          <h3 className="text-[19px]">Students — register free</h3>
          <p className="my-1.5 text-[13px] text-muted">
            Create your profile, build an AI résumé, and start applying across every department.
          </p>
          <Button onClick={openRegister}>Student registration <Icon name="arrow" /></Button>
        </div>
        <div className="rounded-xl border border-line bg-white p-6">
          <div className="mb-3 grid h-11 w-11 place-items-center rounded-[10px] bg-navy-soft">
            <Icon name="build" className="h-[22px] w-[22px] text-navy" />
          </div>
          <h3 className="text-[19px]">Recruiters — onboard your company</h3>
          <p className="my-1.5 text-[13px] text-muted">
            Get verified, post roles, and access the candidate pool in one working day.
          </p>
          <Button variant="gold" onClick={() => openOnboard('Full-time hiring')}>
            Recruiter onboarding <Icon name="arrow" />
          </Button>
        </div>
      </div>
    </section>
  )
}
