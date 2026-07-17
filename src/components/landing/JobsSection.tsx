import { Icon } from '@/components/icons/Icon'
import { Button } from '@/components/ui/Button'
import { SectionHead } from '@/components/landing/SectionHead'
import { JobCard } from '@/components/shared/JobCard'
import { useModal } from '@/context/ModalContext'
import { StudentRegisterModal } from '@/components/modals/StudentRegisterModal'
import { JOBS } from '@/data/mock/jobs'

export function JobsSection() {
  const { openModal } = useModal()
  const openJobs = JOBS.filter((j) => j.status === 'Open').slice(0, 4)

  return (
    <section id="jobs" className="px-[30px] pb-[52px] max-lg:px-4 max-lg:pb-[38px]">
      <SectionHead
        eyebrow="Now hiring"
        title="New job openings"
        description="Fresh roles posted by recruiters this week — register to apply in one click."
      />
      <div className="grid grid-cols-2 gap-3.5 max-lg:grid-cols-1">
        {openJobs.map((j) => <JobCard key={j.id} job={j} />)}
      </div>
      <div className="mt-6 text-center">
        <Button onClick={() => openModal('Student registration', <StudentRegisterModal />)}>
          See all openings — register <Icon name="arrow" />
        </Button>
      </div>
    </section>
  )
}
