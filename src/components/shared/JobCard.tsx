import { Pill } from '@/components/ui/Pill'
import { Button } from '@/components/ui/Button'
import { MetaRow, MetaTag } from '@/components/shared/MetaTag'
import { useModal } from '@/context/ModalContext'
import { JobDetailModal } from '@/components/modals/JobDetailModal'
import { kindOf, type Job } from '@/data/mock/jobs'
import { monogram } from '@/lib/text'

interface JobCardProps {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  const { openModal } = useModal()

  return (
    <div className="flex flex-col gap-2.5 rounded-[10px] border border-line bg-white p-[17px]">
      <div className="flex gap-3">
        <div className="grid h-11 w-11 flex-none place-items-center rounded-[9px] bg-navy-soft text-[15px] font-bold text-navy">
          {monogram(job.co)}
        </div>
        <div className="flex-1">
          <h3 className="text-[15.5px]">{job.role}</h3>
          <div className="text-[12.5px] text-muted">{job.co}</div>
        </div>
        <Pill status={job.status} />
      </div>
      <MetaRow>
        <MetaTag emphasis>{kindOf(job)}</MetaTag>
        <MetaTag>{job.type}</MetaTag>
        <MetaTag>{job.loc}</MetaTag>
        <MetaTag>{job.ctc}</MetaTag>
        <MetaTag>Min CGPA {job.cgpa}</MetaTag>
      </MetaRow>
      <div className="mt-0.5 flex items-center justify-between border-t border-line-2 pt-[11px]">
        <small className="text-[11.5px] text-muted">{job.apps} applied · closes {job.deadline}</small>
        <Button size="sm" onClick={() => openModal(`${job.role} · ${job.co}`, <JobDetailModal job={job} />)}>
          View &amp; apply
        </Button>
      </div>
    </div>
  )
}
