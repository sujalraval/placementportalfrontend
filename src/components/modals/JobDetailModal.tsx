import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { MetaRow, MetaTag } from '@/components/shared/MetaTag'
import { useModal } from '@/context/ModalContext'
import { StudentRegisterModal } from '@/components/modals/StudentRegisterModal'
import type { Job } from '@/data/mock/jobs'

interface JobDetailModalProps {
  job: Job
}

export function JobDetailModal({ job }: JobDetailModalProps) {
  const { closeModal, openModal } = useModal()
  const navigate = useNavigate()

  return (
    <div>
      <div className="mb-4">
        <MetaRow>
          <MetaTag>{job.type}</MetaTag>
          <MetaTag>{job.loc}</MetaTag>
          <MetaTag>{job.ctc}</MetaTag>
          <MetaTag>Min CGPA {job.cgpa}</MetaTag>
          <MetaTag>{job.tag}</MetaTag>
        </MetaRow>
      </div>
      <p className="mb-4 text-[13.5px] text-[#46443d]">
        {job.co} is hiring for the {job.role} role. Applications close {job.deadline}. {job.apps} students have
        applied so far. Register or sign in to apply — your eligibility is checked automatically.
      </p>
      <div className="flex gap-2.5">
        <Button onClick={() => openModal('Student registration', <StudentRegisterModal />)}>Register to apply</Button>
        <Button variant="ghost" onClick={() => { closeModal(); navigate('/student/dashboard') }}>Browse in portal</Button>
      </div>
    </div>
  )
}
